//ステータスクラス
var Status = function () {
    this.gameover_flag = false;
    this.gameover_time = 0;
    this.gamestart_flag = true;
    this.gamestart_time = 0;

    this.x = GAME_WIDTH + 32 + 12;
    this.y = 10;
    this.point = 0;
    this.point_visual = 0;  //見た目上の得点
    this.frame_point = 0; //１フレームあたりの得点
    this.point_size = 1.0;    //得点文字の大きさ
    this.left_poi = 4;  //ポイの残り数
    this.left_time_max = 20 * 30;   //のこり時間
    this.left_time = this.left_time_max;   //のこり時間

    this.captured_fish = 0; //捕まえた金魚の数
    this.captured_fish_x = GAME_WIDTH + 32 + 12;
    this.captured_fish_y = 180;

    this.combo_alpha = 1.0;
    this.combo_size = 1.0;

    this.combo_point = 0; //コンボ時の得点
    this.combo_point_x = 120;
    this.combo_point_y = 20;

    this.combo_num = 0;   //コンボ数
    this.combo_anime_time = 0;
    this.combo_x = 100; //GAME_WIDTH + 32 + 72;   //コンボ数表示座標
    this.combo_y = 20;

};

//ステータス・moveメソッド
Status.prototype.move = function () {


    this.combo_anime_time--;
    if (this.combo_anime_time < 0) this.combo_anime_time = 0;

    var tempsize = 1.0;
    if (this.combo_anime_time < 40) tempsize = 0.0;
    else tempsize = this.combo_anime_time - 40.0;
    this.combo_size = 1.0 + tempsize;

    if (this.combo_anime_time < 43 && this.combo_anime_time >= 33) {
        this.point_visual += this.frame_point;
        if (this.combo_anime_time == 33) this.point_visual = this.point;
    }

    if (this.combo_anime_time < 43 && this.combo_anime_time >= 40) {
        this.point_size += 0.2;
        if (this.combo_anime_time == 40) this.point_size = 1.6;
    }

    if (this.combo_anime_time < 33 && this.combo_anime_time >= 30) {
        this.point_size -= 0.2;
        if (this.combo_anime_time == 28) this.point_size = 1.0;
    }

    /*
    //残り時間減少
    this.left_time--;
    if (this.left_time < 0) this.left_time = 0;
    */

};

//ステータス・drawメソッド
Status.prototype.draw = function () {

    if (this.combo_anime_time > 0) {
        context.save();
        context.globalAlpha = 0.3;
        context.fillStyle = "rgb(100,255,100)";
        context.fillRect(100, 20, 165 * this.combo_size, 20 * this.combo_size);
        context.restore();
    }

    //ステータス画面背景描画
    // context.save();
    // context.fillStyle = "rgb(70,70,70)";
    // context.fillRect(GAME_WIDTH, 0, SCREEN_WIDTH - GAME_WIDTH, SCREEN_HEIGHT);
    // context.fillStyle = "rgb(100,100,100)";
    // context.fillRect(GAME_WIDTH + 2, 2, SCREEN_WIDTH - GAME_WIDTH - 4, SCREEN_HEIGHT - 4);
    // context.restore();

    //得点表示
    context.save();
    context.drawImage(picture, 32, 160, 48, 32, this.x - 38, this.y, 30, 22);
    context.restore();

    var temp_point = this.point_visual;    //計算用変数
    var top_zero_flag = true;   //最上位が０の場合は表示しない
    for (var i = 6; i >= 0; i--) {
        var num = Math.floor(temp_point / Math.pow(10, i));
        if (num != 0 && top_zero_flag == true) {
            top_zero_flag = false;
        }

        if (top_zero_flag == false || num != 0 || i == 0) {
            context.save();
            context.drawImage(picture, 32 * num, 128, 32, 32, this.x - 35 + 11 - ((22 * this.point_size) / 2), this.y + 10 + 16 * (6 - i) + 11 - ((22 * this.point_size) / 2), 22 * this.point_size, 22 * this.point_size);
            context.restore();
        }
        temp_point -= num * Math.pow(10, i);
    }

    context.save();
    context.drawImage(picture, 0, 160, 32, 32, this.x - 35, this.y + 16 + 16 * 7, 22, 22);
    context.restore();

    //金魚数表示
    context.save();
    context.drawImage(picture, 208, 160, 48, 32, this.captured_fish_x - 38, this.captured_fish_y, 30, 22);
    context.restore();

    var temp_point = this.captured_fish;    //計算用変数
    var top_zero_flag = true;   //最上位が０の場合は表示しない
    for (var i = 3; i >= 0; i--) {
        var num = Math.floor(temp_point / Math.pow(10, i));
        if (num != 0 && top_zero_flag == true) {
            top_zero_flag = false;
        }

        if (top_zero_flag == false || num != 0 || i == 0) {
            context.save();
            context.drawImage(picture, 32 * num, 128, 32, 32, this.captured_fish_x - 35 + 11 - ((22 * this.point_size) / 2), this.captured_fish_y + 10 + 16 * (3 - i) + 11 - ((22 * this.point_size) / 2), 22 * this.point_size, 22 * this.point_size);
            context.restore();
        }
        temp_point -= num * Math.pow(10, i);
    }

    context.save();
    context.drawImage(picture, 256, 160, 32, 32, this.captured_fish_x - 35, this.captured_fish_y + 16 + 16 * 4, 22, 22);
    context.restore();


    if (this.combo_anime_time > 0) {


        //コンボ得点表示
        if (this.combo_point > 0) {

            var temp_point = this.combo_point;    //計算用変数
            var top_zero_flag = true;   //最上位が０の場合は表示しない

            for (var i = 5; i >= 0; i--) {
                var num = Math.floor(temp_point / Math.pow(10, i));
                if (num != 0 && top_zero_flag == true) {
                    top_zero_flag = false;
                }

                if (top_zero_flag == false || num != 0 || i == 0) {
                    context.save();
                    context.drawImage(picture, 32 * num, 128, 32, 32, this.combo_point_x + 10 + 18 * (5 - i), this.combo_point_y, 22 * this.combo_size, 22 * this.combo_size);
                    context.restore();
                }
                temp_point -= num * Math.pow(10, i);
            }

            context.save();
            context.drawImage(picture, 0, 160, 32, 32, this.combo_point_x + 10 + 18 * (5 - i), this.combo_point_y, 22 * this.combo_size, 22 * this.combo_size);
            context.restore();
        }

        //コンボ数表示
        var temp_combo = this.combo_num;    //計算用変数
        if (temp_combo > 1) {
            if (temp_combo < 10) {
                context.save();
                context.drawImage(picture, 32 * temp_combo, 128, 32, 32, this.combo_x, this.combo_y - 3, 25 * this.combo_size, 25 * this.combo_size);
                context.restore();
            } else if (temp_combo == 10) {
                context.save();
                context.drawImage(picture, 176, 160, 32, 32, this.combo_x, this.combo_y - 3, 25 * this.combo_size, 25 * this.combo_size);
                context.restore();
            }
            context.save();
            context.drawImage(picture, 128, 160, 48, 32, this.combo_x + 26, this.combo_y, 30 * this.combo_size, 22 * this.combo_size);
            context.restore();
        }
    }

    /*
    //残りポイ表示  
    for (var i = 0; i < this.left_poi; i++) {
    context.save();
    context.drawImage(picture, 128, 0, 32, 32, this.x - 35,  330 - 18 * i, 22, 22);
    context.restore();
    }
    */

    /*
    //時間表示
    context.save();
    context.drawImage(picture, 80, 192, 48, 32, 10, 330, 30, 22);

    context.fillStyle = "rgb(30,200,30)";
    context.fillRect(50, 335, 220 * (this.left_time / this.left_time_max), 12);
    context.restore();
    */

};


//マウスステータスクラス
var Mouse_status = function () {
    this.x = 0;
    this.y = 0;
    this.click_x = 0;
    this.click_y = 0;
    this.drag_flag = false;
    this.tap_flag = false;
    this.tapped_flag = false;
}

//パーティクルクラス
var Particle = function () {
    this.x = poi.x - 50;
    this.y = poi.y - 50;
    this.speed = 6.0 + 10.0 * Math.random();
    this.angle = Math.floor(360 * Math.random());
    this.alpha = 0.7;
    this.exist = true;
    this.scale = 0.5 + 0.5 * Math.random();
    this.r = 200; //Math.floor(255 * Math.random());
    this.g = 200; //Math.floor(255 * Math.random());
    this.b = 255; //Math.floor(255 * Math.random());
    this.time = 0;
};

//パーティクル・moveメソッド
Particle.prototype.move = function () {
    this.scale -= 0.06;
    this.x += get_cos(this.angle) * this.speed;
    this.y += get_sin(this.angle) * this.speed;
    if (this.scale < 0.1) this.exist = false;
    this.time++;
};

//パーティクル・drawメソッド
Particle.prototype.draw = function () {

    context.save();
    context.beginPath();
    context.fillStyle = "rgb("+this.r+","+this.g+","+this.b+")";
    context.globalAlpha = this.alpha;
    context.arc(this.x, this.y, 20*this.scale , 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
    context.globalAlpha = 1.0;
};

//パーティクル生成メソッド
Create_particle = function () {
    for (var i = 0; i < particle.length; i++) {
        if (particle[i] == undefined || particle[i].exist == false) {
            particle[i] = undefined;
            particle[i] = new Particle();
            return particle[i];
        }
    }

}