var SCENE_GAME = 1;
var SCENE_GAMEOVER = 2;
var scene = SCENE_GAME;  //シーン番号
var context;
var picture = new Image();
//var picture_bg = new Image();
var mouse_status = new Mouse_status();
var time = 0;   //ゲーム内時間
var MOVE_NOMAL = 0; //何もなし
var MOVE_AVOIDWALL = 1; //壁回避中
var MOVE_AVOIDFISH = 2; //金魚回避中
var MOVE_CAPTURED = 3;  //ポイに捕まっている
var GAME_WIDTH =320;
var GAME_HEIGHT = 320; ;
var SCREEN_WIDTH = 320;
var SCREEN_HEIGHT = 320;
var timerID;
// var GAME_WIDTH =window.screen.width; 
// var GAME_HEIGHT = window.screen.height; //356;
// var SCREEN_WIDTH = window.screen.width; 
// var SCREEN_HEIGHT = window.screen.height; //356;

// var GAME_WIDTH =500; 
// var GAME_HEIGHT = 500; //356;
// var SCREEN_WIDTH = 500; 
// var SCREEN_HEIGHT = 500; //356;

//メモ：iphone解像度320*356

function game_init() {
	console.log(GAME_HEIGHT);
    //インスタンス宣言
    kingyo = new Array(1);
    for (var i = 0; i < kingyo.length; i++) {
        Create_kingyo();
    }
    poi = new Poi();
    sara = new Sara();
    game_status = new Status();
    particle = new Array(50);
    for (var i = 0; i < particle.length; i++) {
        particle[i] = undefined;
        //Create_particle();
    }

    for (var j = 0; j < 100; j++) {
        for (var i = 0; i < kingyo.length; i++) {
            kingyo[i].move();
        }
    }
}


//ゲームループ
function gameloop() {
    switch (scene) {
        case SCENE_GAME:
            game_run();
            break;
    }
}

//ゲーム内容
function game_run() {

    //背景塗りつぶし
    context.save();
    //context.drawImage(picture_bg,0, 0);

    context.fillStyle = "#287BE6";
    context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    context.restore();

    if (game_status.gameover_flag == false && game_status.gamestart_flag == false) {
        //ポイの移動
        poi.move();
    }

    //金魚の移動
    for (var i = 0; i < kingyo.length; i++) {
        kingyo[i].move();
    }

    //皿の移動
    sara.move();

    //得点関連の描画
    game_status.move();

    //ポイの描画(水中時)
    if (poi.down_flag == true) poi.draw();

    //金魚の描画(水中時)
    for (var i = 0; i < kingyo.length; i++) {
        if (kingyo[i].movestat != MOVE_CAPTURED) {
            kingyo[i].draw();
        }
    }

    //皿の描画
    sara.draw();

    //ポイの描画(空中時)
    if (poi.down_flag == false) poi.draw();

    //金魚の移動・描画(空中時)
    for (var i = 0; i < kingyo.length; i++) {
        if (kingyo[i].movestat == MOVE_CAPTURED) {
            kingyo[i].draw();
        }
    }

    for (var i = 0; i < particle.length; i++) {
        if (particle[i] != undefined && particle[i].exist == true) {
            particle[i].move();
            particle[i].draw();
        }
    }

    game_status.draw();

    if (game_status.gameover_flag == true) {
       // gameover_move();
       console.log("start redirect");
      clearInterval(timerID);
      	location.href="garden.html";
      	return false;
      	console.log("end redirect");
      // window.location.href="http://114.215.126.45:8011/fishing/garden.html";return false;
        //gameover_draw();
    }

    if (game_status.gamestart_flag == true) {
        gamestart_move();
        //gamestart_draw();
    }

    time++;

}


function init() {

    //描画コンテキスト表示
    canvas = document.getElementById('id_canvas');
    if (!canvas || !canvas.getContext) {
        alert("本ページの閲覧はHTML5対応ブラウザで行ってください");
        return false;
    }

    //コンテキスト取得
    context = canvas.getContext('2d');


    //テーブルセットアップ
    criate_sin_table();
    criate_cos_table();

    game_init();

    //画像ファイル読み込み
    picture.src = "kingyo.png?" + new Date().getTime();
    // picture_bg.src = "water.png?" + new Date().getTime();


    picture.onload = function () {
        //インターバルタイマ関数の登録
         timerID = setInterval('gameloop()', 50);    //50
    }
  
  
    //各種イベント追加
    var lasttouchx, lasttouchy;
    touchdev = false;
    if (navigator.userAgent.indexOf('iPhone') > 0
	        || navigator.userAgent.indexOf('iPod') > 0
	        || navigator.userAgent.indexOf('iPad') > 0
	        || navigator.userAgent.indexOf('Android') > 0) {
        touchdev = true;
    }
    if (touchdev == false) {
        canvas.addEventListener('mousemove', mousemovefunc, true);
        canvas.addEventListener('mousedown', mousedownfunc, true);
        canvas.addEventListener('mouseup', mouseupfunc, true);
    } else {
        canvas.addEventListener("touchstart", touchstart, true);
        canvas.addEventListener("touchmove", touchmove, true);
        canvas.addEventListener("touchend", touchend, true);
    }

    function touchstart(event) {

        var x = event.touches[0].pageX;
        var y = event.touches[0].pageY;
        mouse_status.click_x = x;
        mouse_status.click_y = y;
        mouse_status.x = x;
        mouse_status.y = y;
        mouse_status.tap_flag = true;
        mouse_status.tapped_flag = true;

    }

    function touchmove(event) {
        //var rect = event.target.getBoundingClientRect();
        var x = event.touches[0].pageX;
        var y = event.touches[0].pageY;
        mouse_status.x = x;
        mouse_status.y = y;
        mouse_status.tapped_flag = false;
    }

    function touchend(event) {
        mouse_status.tapped_flag = false;
        mouse_status.tap_flag = false;
    }

    function mousemovefunc(event) {
        mouse_status.x = event.clientX;
        mouse_status.y = event.clientY;
        mouse_status.tapped_flag = false;
    }

    function mousedownfunc(event) {
        mouse_status.x = event.clientX;
        mouse_status.y = event.clientY;
        mouse_status.tap_flag = true;
        mouse_status.tapped_flag = true;

        // if (game_status.gameover_time > 25) {
            // //リトライ
            // //if (location.hostname == 'r.jsgames.jp') {
                // var id = location.pathname.match(/^\/games\/(\d+)/)[1];
                // location.replace([
                        // 'http://9leap.net/games/89/result', //'http://9leap.net/games/',id,'/result',
                        // '?score=',encodeURIComponent(game_status.point),
                        // '&result=',encodeURIComponent('得点:' + game_status.point + '点,金魚:'
                                                           // + game_status.captured_fish + '匹捕まえたよ！')
                    // ].join(''));
            // //}
//             
        // }

    }
    function mouseupfunc(event) {
        mouse_status.tap_flag = false;
        mouse_status.tapped_flag = false;
    }

};