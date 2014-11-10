//僥僋僗僠儍僋儔僗
var Texture = function () {
    this.x = 0;
    this.y = 0;
    this.width = 80;
    this.height = 64;
    this.srcx = 0;
    this.srcy = 0;
    this.exist = true;
    this.time = 0;
    this.size = 1.0;
    this.angle = 0.0;
    this.cx = (this.width * this.size) / 2;
    this.cy = (this.height * this.size) / 2;
    this.alpha = 1.0;
};

//僥僋僗僠儍丒draw儊僜僢僪
Texture.prototype.draw = function () {
    //context.grobalAlpha = 0.5;
    context.save();
   
    context.translate(this.x, this.y);
    
    //context.translate(this.x - this.cx, this.y - this.cy);
    //context.translate(this.cx, this.cy);
    
    context.rotate(this.angle);
    context.translate(-this.cx, -this.cy);
    // context.rotate(this.angle);
    // context.translate(-this.cx, -this.cy);

    context.globalAlpha = this.alpha;
    context.drawImage(picture, this.srcx, this.srcy, this.width, this.height, 0, 0, this.width * this.size, this.height * this.size);
    context.restore();

};

//僥僋僗僠儍丒setTex儊僜僢僪
Texture.prototype.setTex = function (srcx, srcy, width, height) {
    this.width = width;
    this.height = height;
    this.srcx = srcx;
    this.srcy = srcy;
};