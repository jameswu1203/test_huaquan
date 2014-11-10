//嬥嫑僋儔僗
var Kingyo = function () {

    this.head = new Texture();  //摢
    this.body = new Texture();  //摲
    this.body2 = new Texture();  //摲2
    this.tail = new Texture();  //旜傃傟
    //this.tail_bottom = new Texture(); //旜傃傟2
    //this.head.setTex(0, 0, 128, 64);   //(僥僗僩梡)慡懱

    if (Math.random() < 0.7) {  //晛捠
        this.head.setTex(161, 1, 76, 60);
        this.body.setTex(240, 0, 32, 32);
        this.body2.setTex(240, 32, 32, 32);
        this.tail.setTex(272, 0, 32, 32);
    } else {    //弌栚嬥
        this.head.setTex(1, 1, 76, 60);
        this.body.setTex(80, 0, 32, 32);
        this.body2.setTex(80, 32, 32, 32);
        this.tail.setTex(112, 0, 32, 32);
    }
    //this.tail_bottom.setTex(272, 0, 32, 32);
    this.movestat = 0;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2.0;
    this.speed_rate = 1.0;   //僗僺乕僪攞棪(摝偘傞偲偒側偳偵巊梡)
    this.escape_time = 0;   //摝偘傞帪娫
    this.round_angle = 0.0; //慁夞妏搙
    this.random_time = 0;   //儔儞僟儉僂僅乕僋偺帪娫
    this.sight_length = 96 * 1.3;
    this.sight_x = 0; //帇奅偺尷奅X嵗昗
    this.sight_y = 0; //帇奅偺尷奅Y嵗昗
    this.collision_size = 25;    
   // this.collision_size = 0; 
    this.tail_cnt = 0;
    this.cap_x = 0; //曔傑偭偨帪偺嵗昗(僆僼僙僢僩)
    this.cap_y = 0; //曔傑偭偨帪偺嵗昗(僆僼僙僢僩)

};


//嬥嫑丒move儊僜僢僪
Kingyo.prototype.move = function () {


    //億僀偵曔傑偭偰偄偨傜
    if (this.movestat == MOVE_CAPTURED) {

        //偲傝偁偊偢嬥嫑懁偵傕億僀偐傜摝偘傞儘僕僢僋傪
        if (mouse_status.tap_flag == false) this.movestat = MOVE_NOMAL;

        this.x = poi.x + this.cap_x;
        this.y = poi.y + this.cap_y;

        this.angle += this.round_angle;

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);


        //妏搙偐傜儀僋僩儖峏怴
        this.vx = get_cos(this.angle);
        this.vy = get_sin(this.angle);
        this.head.x = this.x;
        this.head.y = this.y;
        this.head.angle = this.angle + (5.0 * Math.PI / 180.0) * get_cos(this.tail_cnt * 3.0);

        this.body.x = this.x - 16 * this.head.size * this.vx;
        this.body.y = this.y - 16 * this.head.size * this.vy;
        this.body.angle = this.head.angle;
        this.body2.x = this.body.x - 25 * this.head.size * get_cos(this.body.angle);
        this.body2.y = this.body.y - 25 * this.head.size * get_sin(this.body.angle);
        this.body2.angle = this.head.angle;
        this.tail.x = this.body2.x - 15 * this.head.size * get_cos(this.body.angle);
        this.tail.y = this.body2.y - 15 * this.head.size * get_sin(this.body.angle);
        this.tail.angle = this.head.angle;

        /*
        this.tail_bottom.x = this.tail.x;
        this.tail_bottom.y = this.tail.y;
        this.tail_bottom.angle = this.body.angle;
        */

        //帇奅敾掕
        this.sight_x = this.x + this.vx * this.sight_length;
        this.sight_y = this.y + this.vy * this.sight_length;

    } else {
        //曔傑偭偰偄側偐偭偨傜


        //摝偘傞嵺偺僗僺乕僪儗乕僩曄峏

        if (this.escape_time <= 5) {
            this.speed_rate -= 0.2;
        }
        if (this.escape_time < 0) {
            this.speed_rate = 1.0;
        }


        //妏搙偺揱攄
        this.body2.angle = this.body.angle;
        this.tail.angle = this.body2.angle;

        this.x += this.speed * this.vx * this.speed_rate;
        this.y += this.speed * this.vy * this.speed_rate;
        this.angle += this.round_angle;

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        //妏搙偐傜儀僋僩儖峏怴
        //this.vx = Math.cos(this.angle);
        //this.vy = Math.sin(this.angle);
        this.vx = get_cos(this.angle);
        this.vy = get_sin(this.angle);
        this.head.x = this.x;
        this.head.y = this.y;
        this.head.angle = this.angle;

 this.body.x = this.x - 16 * this.head.size * this.vx;
        //this.body.x = this.x - 16 * this.head.size * this.vx;
        this.body.y = this.y - 16 * this.head.size * this.vy;
        this.body.angle = this.round_angle + this.angle + (10.0 * Math.PI / 180.0) * get_cos(this.tail_cnt * 0.50);
        this.body2.x = this.body.x - 25 * this.head.size * get_cos(this.body.angle);
        this.body2.y = this.body.y - 25 * this.head.size * get_sin(this.body.angle);
        this.tail.x = this.body2.x - 15 * this.head.size * get_cos(this.body2.angle);
        this.tail.y = this.body2.y - 15 * this.head.size * get_sin(this.body2.angle);

        /*
        this.tail_bottom.x = this.tail.x;
        this.tail_bottom.y = this.tail.y;
        this.tail_bottom.angle = this.tail.angle + (10.0 * Math.PI / 180.0) * get_cos(this.tail_cnt * 0.55);
        */

        //帇奅敾掕
        this.sight_x = this.x + this.vx * this.sight_length;
        this.sight_y = this.y + this.vy * this.sight_length;


        var cx = (this.head.width * this.head.size) / 2;
        var cy = (this.head.height * this.head.size) / 2;

        //儔儞僟儉僂僅乕僋

        if (this.movestat != MOVE_AVOIDWALL) {
            if (this.random_time < 0 && Math.random() < 0.3) {
                this.round_angle = 0.05 - 0.1 * Math.random();
                this.random_time = 5 + 10 * Math.random();
                this.speed = 1.5 + 2.0 * Math.random();
            }
            if (this.random_time < 0) this.round_angle = 0.0;
        }

        //帇奅偺愭偑夋柺抂偩偭偨傜
        //夋柺抂夞旔
        if (this.sight_x > GAME_WIDTH - cx || this.sight_x < 0 + cx || this.sight_y > GAME_HEIGHT - cy || this.sight_y < 0 + cy) {

            if (this.movestat != MOVE_AVOIDWALL) {


                var wall_vx = 0.0; var wall_vy = 0.0;

                if (this.sight_x + 100 > GAME_WIDTH - cx) { wall_vy = 1.0; }
                if (this.sight_x - 100 < 0 + cx) { wall_vy = -1.0; }
                if (this.sight_y + 100 > GAME_HEIGHT - cy) { wall_vx = -1.0; }
                if (this.sight_y - 100 < 0 + cy) { wall_vx = 1.0; }


                // var abs = Math.sqrt(wall_vx * wall_vx + wall_vy * wall_vy);
                // wall_vx /= abs;
                // wall_vy /= abs;


                var th = get_cos(this.angle) * wall_vx + get_sin(this.angle) * wall_vy;
                // this.movestat = MOVE_AVOIDWALL;
                // if(Math.random()>0.5){
                	 // this.round_angle = 0.13;
                // }else{
                	 // this.round_angle = -0.13;
                // }
                   
                if (th > 0.0) {
                    //夞旔峴摦
                    this.movestat = MOVE_AVOIDWALL;
                    this.round_angle = 0.13;
                } else if (th < 0.0) {
                    this.movestat = MOVE_AVOIDWALL;
                    this.round_angle = -0.13;
                } else {
                    this.movestat = MOVE_AVOIDWALL;
                    if (Math.random() > 0.5) this.round_angle = 0.13;
                    else this.round_angle = -0.13;
                }

            }
        } else {
            this.movestat = MOVE_NOMAL;
        }
    }

    this.tail_cnt++;
    this.random_time -= 1;
    this.escape_time -= 1;

};

//嬥嫑丒draw儊僜僢僪
Kingyo.prototype.draw = function () {
    this.head.draw();
    this.body.draw();
    this.body2.draw();
    //this.tail_bottom.draw();
    this.tail.draw();


    /*
    //(僨僶僢僌梡)帇奅昞帵
    context.strokeStyle = 'rgb(155, 187, 89)'; // 椢
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.sight_x, this.sight_y);
    context.closePath();
    context.stroke();

    //(僨僶僢僌)嬥嫑摉偨傝敾掕昞帵
    context.strokeStyle = 'rgb(155, 187, 89)'; // 椢
    context.beginPath();
    context.strokeRect(this.x - this.collision_size, this.y - this.collision_size, this.collision_size * 2, this.collision_size * 2);
    context.closePath();
    context.stroke();
    */
};

//嬥嫑惗惉儊僜僢僪
Create_kingyo = function () {
    for (var i = 0; i < kingyo.length; i++) {
        if (kingyo[i] == undefined || kingyo[i].exist == false) {
            kingyo[i] = undefined;
            kingyo[i] = new Kingyo();
            kingyo[i].x = GAME_WIDTH / 2;
            kingyo[i].y = GAME_HEIGHT / 2;
            kingyo[i].angle = 2.0 * Math.PI * Math.random();
            kingyo[i].vx = Math.cos(kingyo[i].angle);
            kingyo[i].vy = Math.sin(kingyo[i].angle);
            size = 0.3 + 0.3 * Math.random();
            kingyo[i].head.size = size;
            kingyo[i].body.size = size;
            kingyo[i].body2.size = size;
            kingyo[i].tail.size = size;
            //kingyo[i].tail_bottom.size = size;
            kingyo[i].sight_length = size * 96 * 1.5; //帇奅偺挿偝(1.5旵暘愭)
            kingyo[i].collision_size = size * 20;
            kingyo[i].head.cx = (kingyo[i].head.width * size) / 2;
            kingyo[i].head.cy = (kingyo[i].head.height * size) / 2;
            kingyo[i].body.cx = (kingyo[i].body.width * size);
            kingyo[i].body.cy = (kingyo[i].body.height * size) / 2;
            kingyo[i].body2.cx = (kingyo[i].body2.width * size);
            kingyo[i].body2.cy = (kingyo[i].body2.height * size) / 2;
            kingyo[i].tail.cx = (kingyo[i].tail.width * size);
            kingyo[i].tail.cy = (kingyo[i].tail.height * size) / 2;
            //kingyo[i].tail_bottom.cx = (kingyo[i].tail_bottom.width * size);
            //kingyo[i].tail_bottom.cy = (kingyo[i].tail_bottom.height * size) / 2;

            kingyo[i].tail_cnt = 360 * Math.random();
            kingyo[i].head.alpha = 1.0;

            return kingyo[i];
        }
    }

}