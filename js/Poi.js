//億僀僋儔僗
var Poi = function () {
    this.x = 0;
    this.y = 0;

    this.old_x = 0; //侾僼儗乕儉慜偺嵗昗
    this.old_y = 0; //侾僼儗乕儉慜偺嵗昗

    this.speed = 0; //億僀偺摦偐偡僗僺乕僪

    this.offset_x = -56;
      //this.offset_x = 0;
    this.offset_y = -48;
    // this.collision_size = 15;
     this.collision_size = 0;
    this.visible = false;
    this.down_flag = false; //億僀偑悈拞偵偁傞偐丠
    this.dist = 0;  //媎偄帪偺堏摦嫍棧
    this.up_time = 5;   //嫇偘偰偐傜偺帪娫
    this.waku = new Texture();  //榞
    this.waku.setTex(32, 64, 96, 96);
    this.waku.size = 1.0;
     //this.waku.size = 2.0;
    this.waku.x = 0;
    this.waku.y = 0;
    this.kami = new Texture(); //巻
    this.kami.setTex(0, 64, 64, 64);
    this.kami.angle = 2.0 * Math.PI * Math.random();
    this.kami.cx = this.kami.width / 2;
    this.kami.cy = this.kami.height / 2;
    this.capture_num = 0; //曔傑偊偨悢
    this.durability = 2000;    //懴媣椡
    this.inwater_time = 0;  //悈偵擖偭偰偄傞帪娫


    /*
    this.break_path_x = new Array(16);  //攋傟昞尰僷僗X嵗昗
    this.break_path_y = new Array(16);  //攋傟昞尰僷僗Y嵗昗

    for (var i = 0; i < this.break_path_x.length; i++) {
    this.break_path_x[i] = (10 + 20 * Math.random()) * Math.cos(0.3 - 0.6 * Math.random() + ((16 * i) / Math.PI * 2));
    this.break_path_y[i] = (10 + 20 * Math.random()) * Math.sin(0.3 - 0.6 * Math.random() + ((16 * i) / Math.PI * 2));
    }
    //this.break_path_x.sort();
    //this.break_path_y.sort();
    */
};

//億僀丒move儊僜僢僪
Poi.prototype.move = function () {


    if (mouse_status.tap_flag == true) {

        this.old_x = this.x; this.old_y = this.y;   //慜僼儗乕儉偺嵗昗傪庢摼
        this.x = mouse_status.x; this.y = mouse_status.y;

        if (this.x < 50) this.x = 50;
        if (this.y < 50) this.y = 50;

        //墴偝傟偨弖娫側傜
        if (mouse_status.tapped_flag == true) {
            this.dist = 0;
            this.up_time = 5;   //嫇偘偨帪娫偼嵟戝偵屌掕
            this.old_x = this.x;
            this.old_y = this.y;
            this.speed = 0;
        }

        //懍搙偺俀忔傪庢摼乮儖乕僩偺寁嶼偼徣偔乯
        this.speed = (this.x - this.old_x) * (this.x - this.old_x) + (this.y - this.old_y) * (this.y - this.old_y);

        //嬻拞偵偁傞偲偒丄嬥嫑偑忔偭偰偄側偔丄僗僺乕僪15.0埲忋偱媎偆摦嶌
        if (this.down_flag == false && this.capture_num == 0) {
            if (this.speed > 15.0) {
                this.dist += this.speed;
                if (this.dist > 900) {
                    this.down_flag = true;    //900=30^2
                    this.inwater_time = 0;
                }
            } else {
                this.dist = 0;
                this.down_flag = false;
            }
        }
        //悈拞偵偁傞偲偒丄僗僺乕僪3.0埲壓偱梘偘傞摦嶌
        if (this.down_flag == true && this.speed < 3.0) {
            this.down_flag = false;
            this.dist = 0;
            this.up_time = 0;
            this.inwater_time = 0;

        }

//把鱼捞在网内的时候，鱼和网的位移关系
        this.waku.x = this.x - 50; 
        this.waku.y = this.y - 50;
       
        if (this.down_flag == true) {
            this.inwater_time += 1;
            this.up_time = 0;
        } else {
            this.up_time++;
        }


        //億僀偲嬥嫑偺摉偨傝敾掕
        for (var i = 0; i < kingyo.length; i++) {
            if (kingyo[i] != undefined && this.down_flag == true && kingyo[i].movestat != MOVE_CAPTURED) {

                if ((this.x - this.collision_size + this.offset_x < kingyo[i].x + kingyo[i].collision_size) &&
                (this.x + this.collision_size + this.offset_x > kingyo[i].x - kingyo[i].collision_size) &&
                (this.y - this.collision_size + this.offset_y < kingyo[i].y + kingyo[i].collision_size) &&
                (this.y + this.collision_size + this.offset_y > kingyo[i].y - kingyo[i].collision_size)) {

                    kingyo[i].cap_x = -this.waku.x + kingyo[i].x + this.offset_x + 4;
                    kingyo[i].cap_y = -this.waku.y + kingyo[i].y + this.offset_y - 2;

                    kingyo[i].round_angle = 0;
                    kingyo[i].speed_rate = 2.5;
                    kingyo[i].escape_time = 15 + 20 * Math.random();

                    kingyo[i].movestat = MOVE_CAPTURED;
                    this.capture_num++;
                }
            }
        }

        //億僀偑悈拞偵偁傞応崌丄嶮偲傇偮偐傞偲嬥嫑偑摝偘傞
        
        if (this.down_flag == true) {


            if ((this.x - this.collision_size + this.offset_x < sara.x + sara.collision_size) &&
                (this.x + this.collision_size + this.offset_x > sara.x - sara.collision_size) &&
                (this.y - this.collision_size + this.offset_y < sara.y + sara.collision_size) &&
                (this.y + this.collision_size + this.offset_y > sara.y - sara.collision_size)) {

                    this.down_flag = false;
                    this.dist = 0;

// console.log("here");
               // for (var i = 0; i < kingyo.length; i++) {
                    // if (kingyo[i] != undefined && kingyo[i].movestat == MOVE_CAPTURED) {
                    // // console.log(i);
                    // kingyo[i].movestat = MOVE_NOMAL;
                    // kingyo[i].speed_rate = 2.5;
                    // kingyo[i].escape_time = 15 + 20 * Math.random();
                    // }
// 
                // }

            }
        }


        //僟儊乕僕敾掕
        var damage = 0.0;

        //億僀悈拞摦嶌拞偺僟儊乕僕敾掕
        damage = 0.0;
        if (this.down_flag == true) {
            this.durability -= this.inwater_time;
        }


        //嬥嫑傪嵹偣偰偄傞偲偒偺僟儊乕僕敾掕
        damage = 0.0;
        if (this.capture_num != 0) {
            for (var i = 0; i < kingyo.length; i++) {
                if (kingyo[i] != undefined && kingyo[i].movestat == MOVE_CAPTURED) {
                    damage += (kingyo[i].head.size / 0.6) * 1.3;
                }
            }
            this.durability -= damage;
        }

    }

    if (mouse_status.tap_flag == false || game_status.gameover_time > 0) {

        //嶮偺忋偱棧偟偨応崌丄嬥嫑偺夞廂敾掕
        if (this.capture_num > 0 && this.down_flag == false) {

            var temp_point = 0; //椵愊揰
            var temp_bairitsu = 0;  //攞棪
            for (var i = 0; i < kingyo.length; i++) {
                if (kingyo[i] != undefined && kingyo[i].movestat == MOVE_CAPTURED) {


                    if ((sara.x - sara.collision_size < kingyo[i].x + kingyo[i].collision_size) &&
                    (sara.x + sara.collision_size > kingyo[i].x - kingyo[i].collision_size) &&
                    (sara.y - sara.collision_size < kingyo[i].y + kingyo[i].collision_size) &&
                    (sara.y + sara.collision_size > kingyo[i].y - kingyo[i].collision_size)) {
                        //嬥嫑夞廂

                        //僷乕僥傿僋儖惗惉
                        for (var j = 0; j < 5; j++) {
                            Create_particle();
                        }

                        //摼揰寁嶼

                        temp_point += Math.round(200 + (kingyo[i].head.size / 0.6) * 200);
                        temp_bairitsu += 1;
                        game_status.captured_fish++;

                        //嬥嫑徚嫀偲惗惉
                        kingyo[i] = undefined;
                        kingyo.splice(i,1);
                        if(kingyo.length==0){
                        	 game_status.gameover_flag = true;
                        }
                        // var temp_kingyo;
                        // temp_kingyo = Create_kingyo();
// 
                        // if (Math.random() > 0.5) {
                            // var temp_x = 20 - 40 * Math.random();
                            // var temp_y = GAME_HEIGHT * Math.random();
                            // if (temp_x > 0) {
                                // temp_kingyo.x = GAME_WIDTH + temp_x;
                            // } else {
                                // temp_kingyo.x = temp_x;
                            // }
                            // temp_kingyo.y = temp_y;
                        // } else {
                            // var temp_x = GAME_WIDTH * Math.random();
                            // var temp_y = 20 - 40 * Math.random();
                            // if (temp_y > 0) {
                                // temp_kingyo.y = GAME_HEIGHT + temp_y;
                            // } else {
                                // temp_kingyo.y = temp_y;
                            // }
                            // temp_kingyo.x = temp_x;
                        // }

                    } else {

                        //嶮埲奜偺偲偙傠偱棧偡偲摝偘傞
                        kingyo[i].movestat = MOVE_NOMAL;
                    }

                }
            }


            // if (temp_point * temp_bairitsu != 0) {
                // game_status.combo_anime_time = 3 + 40;
                // game_status.combo_num = temp_bairitsu;
                // game_status.combo_point = temp_point * temp_bairitsu;
            // }
            // game_status.point_visual = game_status.point;
            // game_status.point += temp_point * temp_bairitsu;
            // game_status.frame_point = (game_status.point - game_status.point_visual) / 10;
            // this.capture_num = 0;

        }

    }

    
    
    //僎乕儉僆乕僶乕張棟
    if (this.durability < 0) {

        this.dist = 0
        this.down_flag = false;

        game_status.gameover_time++;

    }

    if (game_status.gameover_time > 25) {
        game_status.gameover_flag = true;
    }


};

//億僀丒draw儊僜僢僪
Poi.prototype.draw = function () {
    if (mouse_status.tap_flag == true && game_status.gameover_flag == false && game_status.gamestart_flag == false) {

        //this.waku.draw();

        //(僥僗僩)億僀傪恾宍偱彂偔
        var temp_dist = this.dist;
        var temp_up_time = this.up_time;
        if (temp_dist < 450) temp_dist = 0;
        if (temp_dist > 900) temp_dist = 900;
        if (temp_up_time > 5) temp_up_time = 5;
        var color_depth = 5 + 5 * (1.0 - (temp_dist / 900.0));
        color_depth /= 10;
        var color_depth2 = 0.5 + (temp_up_time * 0.1);

        if (color_depth2 < color_depth) color_depth = color_depth2;

        context.save();
        context.strokeStyle = "rgba( 255, 255, 0, " + color_depth + ")"; //"rgba( 255, 255, 0, 1.0)";
        context.beginPath();
        context.arc(this.x + this.offset_x, this.y + this.offset_y, 30, 0, 2 * Math.PI, true);
        context.closePath();
        context.lineWidth = 2;
        context.stroke();
        context.restore();

        context.save();
        context.strokeStyle = "rgba(255, 255, 0," + color_depth + ")";
        context.beginPath();
        context.moveTo(this.x + 10, this.y + 10);
        context.lineTo(this.x + this.offset_x + 20, this.y + this.offset_y + 20);
        context.closePath();
        context.lineWidth = 4;
        context.lineCap = "round";
        context.stroke();
        context.restore();


        var kami_color_depth = color_depth - 0.2;
        /*
        context.strokeStyle = "rgba( 214, 214, 255," + kami_color_depth + ")";
        context.fillStyle = "rgba( 214, 214, 255, " + kami_color_depth + ")";
        */
        //億僀偺巻
        this.kami.alpha = kami_color_depth;
        this.kami.x = this.x - 56;
        this.kami.y = this.y - 48;

        if (this.durability < 0) this.kami.setTex(256, 64, 64, 64);
        else if (this.durability < 200) this.kami.setTex(192, 64, 64, 64);
        else if (this.durability < 600) this.kami.setTex(128, 64, 64, 64);
        else if (this.durability < 1200) this.kami.setTex(64, 64, 64, 64);
        else this.kami.setTex(0, 64, 64, 64);

        this.kami.draw();

        /*
        context.beginPath();
        context.arc(this.x + this.offset_x, this.y + this.offset_y, 29, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();

        //(僥僗僩)億僀偺攋傟
        context.strokeStyle = 'rgba(50, 50, 255, 0.0)';
        context.fillStyle = 'rgba(50, 50, 255, 0.8)';
        context.beginPath();
        context.moveTo(this.x + this.break_path_x[0] + this.offset_x, this.y + this.break_path_y[0] + this.offset_y);
        for (var i = 1; i < this.break_path_x.length; i++) {
        context.lineTo(this.x + this.offset_x + this.break_path_x[i], this.y + this.offset_y + this.break_path_y[i]);
        }
        context.fill();
        context.stroke();
        */

        /*
        //(僨僶僢僌)摉偨傝敾掕昞帵
        context.strokeStyle = 'rgb(155, 187, 89)'; // 椢
        context.beginPath();
        context.strokeRect(this.x - this.collision_size + this.offset_x, this.y - this.collision_size + this.offset_y, this.collision_size * 2, this.collision_size * 2);
        context.closePath();
        context.stroke();
        */

    }
};