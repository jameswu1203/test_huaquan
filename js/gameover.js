
function gameover_move() {

    game_status.gameover_time++;

    if (mouse_status.tap_flag == true && mouse_status.tapped_flag == true) {

        game_status.gameover_flag = true;
        mouse_status.tap_flag = false;
        mouse_status.tapped_flag = false;
      
    }

}

function gameover_draw(){
window.location.href="garden.html";return false;
	//document.location.href="garden.html";return false;
}

function gameover_draw_orig() {


    var back_brack_alpha = (game_status.gameover_time - 25) / 20.0;
    if (back_brack_alpha > 0.5) back_brack_alpha = 0.5;

    //ゲーム画面ブラックアウト
    context.save();
    context.fillStyle = "rgba(0,0,0," + back_brack_alpha + ")";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.restore();

    //枠の背景
    context.save();
    context.fillStyle = "rgba(144,144,144," + (back_brack_alpha + 0.2) + ")";
    context.fillRect(30, 30, SCREEN_WIDTH - 60, SCREEN_HEIGHT - 60);
    context.restore();

    //枠
    context.save();
    context.strokeStyle = "rgba(165,165,0," + (back_brack_alpha + 0.5) + ")";
    context.lineWidth = 3;
    context.beginPath();
    context.strokeRect(30, 30, SCREEN_WIDTH - 60, SCREEN_HEIGHT - 60);
    context.closePath();
    context.stroke();
    context.restore();

    //文字類

    context.save();
    context.font = "23px 'MS Gothic'";
    context.fillStyle = "rgba(220,220,100," + (back_brack_alpha + 0.5) + ")";
    context.strokeStyle = "rgba(165,165,0," + (back_brack_alpha + 0.5) + ")";

    context.fillText("結果", 130, 70);
    context.strokeText("結果", 130, 70);

    context.fillText("点数", 50, 110);
    context.strokeText("点数", 50, 110);

    context.fillText(game_status.point + "点", 50, 140);
    context.strokeText(game_status.point + "点", 50, 140);

    context.fillText("捕まえた金魚", 50, 180);
    context.strokeText("捕まえた金魚", 50, 180);
    context.fillText(game_status.captured_fish + "匹", 50, 210);
    context.strokeText(game_status.captured_fish + "匹", 50, 210);
    context.restore();

    context.save();
    context.font = "20px 'MS Gothic'";
    if (touchdev == true) {
        context.fillText("画面にタッチ！", 100, 250);
    } else {
        context.fillText("画面をクリック！", 90, 250);
    }
    context.restore();

    /*
    //リトライする
    context.save();
    context.font = "20px 'MS Gothic'";
    context.fillStyle = "rgba(220,220,100," + (back_brack_alpha + 0.5) + ")";
    context.fillText("もう一度", 120, 250);
    context.restore();

    //ツイッターでつぶやく
    context.save();
    context.font = "20px 'MS Gothic'";
    context.fillStyle = "rgba(220,220,100," + (back_brack_alpha + 0.5) + ")";
    context.fillText("Twitterで結果をつぶやく", 45, 280);
    context.restore();
    */

}


function gamestart_move() {

    game_status.gamestart_time++;


    if (mouse_status.tap_flag == true && mouse_status.tapped_flag == true) {

        game_status.gamestart_flag = false;
        mouse_status.tap_flag = false;
        mouse_status.tapped_flag = false;
    }


}

function gamestart_draw() {



    //ゲーム画面ブラックアウト
    context.save();
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.restore();

    //文字類

    context.save();
    context.font = "25px 'MS Gothic'";
    context.fillStyle = "rgba(220,220,100,1.0)";
    context.strokeStyle = "rgba(165,165,0,1.0)";

    context.save();
    context.drawImage(picture, 128, 192, 176, 112, 60, 60, 176, 112);
    context.restore();

    context.font = "20px 'MS Gothic'";

    if (touchdev == true) {
        context.fillText("画面にタッチでスタート！", 40, 250);
    } else {
        context.fillText("画面をクリックでスタート！", 30, 250);
    }

}
