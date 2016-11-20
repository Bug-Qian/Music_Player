/**
 * Created by CesyZhao on 2016/10/12.
 *canvas for time progress and volume
 */
window.onload = function(){
    drawBg("progress_time",3,2,453,2);
    drawBg("volume",3,2,103,2)
};
// draw progress background
function drawBg(id,x1,y1,x2,y2){
    var time = document.getElementById(id);
    var cxt = time.getContext("2d");
    cxt.lineWidth = 4;
    cxt.strokeStyle = "#cccccc";
    cxt.beginPath();
    cxt.lineCap = "round";
    cxt.moveTo(x1,y1);
    cxt.lineTo(x2,y2);
    cxt.stroke();
}
// draw progressbar
function drawPg(curTime,duration){
    var time = document.getElementById("progress_time");
    var cxt = time.getContext("2d");
    cxt.strokeStyle = "darkred";
    cxt.lineCap = "round";
    cxt.lineWidth = 4;
    var cur = curTime/duration * 450;
    cxt.beginPath();
    cxt.moveTo(3,2);
    cxt.lineTo(cur,2);
    cxt.stroke();
    cxt.closePath();
}
//draw volume
function drawVl(curVolume){
    var volume = document.getElementById("volume");
    var cxt = volume.getContext("2d");
    cxt.strokeStyle = "darkred";
    cxt.lineCap = "round";
    cxt.lineWidth = 4;
    var cur = curVolume*100;
    cxt.beginPath();
    cxt.moveTo(3,2);
    cxt.lineTo(cur,2);
    cxt.stroke();
    cxt.closePath();
}
