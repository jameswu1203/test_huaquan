//嶮僋儔僗
var Sara = function () {
    this.x = 20;
    this.y = 20;
    this.collision_size = 55;
};

//嶮丒move儊僜僢僪
Sara.prototype.move = function () {

};

//嶮丒draw儊僜僢僪
Sara.prototype.draw = function () {

    context.save();
    // context.drawImage(picture, 0, 192, 112, 112, -30, -30, 112, 112);
    context.drawImage(picture, 0, 192, 112, 112, -30, -30, 112, 112);
    context.restore();
    /*
    context.save();
    context.beginPath();
    context.fillStyle = "rgb(100,220,100)";
    context.arc(this.x, this.y, 70, 0, 2 * Math.PI, false);
    context.fill();
    context.beginPath();
    context.fillStyle = "rgb(150,150,240)";
    context.arc(this.x, this.y, 60, 0, 2 * Math.PI, false);
    context.fill();
    context.beginPath();
    context.fillStyle = "rgb(120,120,240)";
    context.arc(this.x, this.y, 30, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
    */


    //(僨僶僢僌)摉偨傝敾掕昞帵
    /*
    context.strokeStyle = 'rgb(155, 187, 89)'; // 椢
    context.beginPath();
    context.strokeRect(this.x - this.collision_size, this.y - this.collision_size, this.collision_size * 2, this.collision_size * 2);
    context.closePath();
    context.stroke();
    */
};