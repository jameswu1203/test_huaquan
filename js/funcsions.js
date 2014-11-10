
//sin,cosテーブル作成
function criate_sin_table() {
    sin_t = new Array(360);
    for (var i = 0; i < 360; i++) {
        sin_t[i] = Math.sin((i / 180.0) * Math.PI);
    }
}

function criate_cos_table() {
    cos_t = new Array(360);
    for (var i = 0; i < 360; i++) {
        cos_t[i] = Math.cos((i / 180.0) * Math.PI);
    }
}

function get_sin(th) {
    var ret = (th * 180.0) / Math.PI;   //ラジアンを角度に変換
    ret = Math.round(ret) % 360;
    if (ret < 0) {
        ret *= -1;
        return -sin_t[ret];
    } else {
        return sin_t[ret];
    }
}

function get_cos(th) {
    var ret = (th * 180.0) / Math.PI;   //ラジアンを角度に変換
    ret = Math.round(ret) % 360;
    if (ret < 0) {
        ret *= -1;
        return cos_t[ret];
    } else {
        return cos_t[ret];
    }
}