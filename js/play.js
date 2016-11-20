/**
 * Created by CesyZhao on 2016/10/12.
 * player controller
 *
 */
var lrc = {
    "00:02":"Friday night, date night",
    "00:11":"I say \"Pick out what you like.\"",
    "00:14":"I don't care as long as you're here.",
    "00:18":"Surprise, surprise. Ain't that nice.",
    "00:20":"Same old chick flick, Eighteenth time.",
    "00:24":"You know the one with that guy.",
    "00:28":"Half way through, look at you",
    "00:29":"Smiling like you always do",
    "00:32":"And I can't help but just stare",
    "00:36":"Cause suddenly, it hits me",
    "00:39":"As I watch you make believe",
    "00:41":"I want to make this your reality",
    "00:45":"nd if you'll be my leading lady,",
    "00:50":"Even though I may look crazy",
    "00:54":"I'll grab your hand, ask you to dance",
    "00:58":"In the middle of the street",
    "00:59":"Learn to sign, cheesy lines",
    "01:00":"Like \"Baby, you complete me.\"",
    "01:04":"And in case you forget",
    "01:05":"Where we've been and what we did",
    "01:07":"I'll write it all down, read it out loud",
    "01:09":"Again and again.",
    "01:12":"I promise if you let me",
    "01:16":"I'll love you like the movies.",
    "01:23":"Now I've never been one of them",
    "01:24":"Guys who could be leading men",
    "01:26":"Just never seemed all that real.",
    "01:28":"(\"Well you're like 5-6.\" \"So was Tom Cruise.\" \"True.\")",
    "01:31":"But here right now",
    "01:32":"With you somehow",
    "01:33":"The kind of love they write about",
    "01:35":"Is the kind of love that I'm starting to feel",
    "01:39":"So I grab your hand, ask you to dance",
    "01:41":"In the middle of the street",
    "01:43":"Learn to sign, cheesy lines",
    "01:46":"Like \"Baby, you complete me.\"",
    "01:49":"And in case you forget",
    "01:50":"Where we've been and what we did",
    "01:53":"I'll write it all down, read it out loud",
    "01:55":"Again and again.",
    "01:58":"I promise if you let me (\"Whatcha gonna do?\")",
    "02:01":"I'll love you like the movies.",
    "02:04":"I'll never let go, Jack. I'll never let go.",
    "02:08":"If you're a bird, I'm a bird.",
    "02:10":"You had me at hello.",
    "02:12":"Like Noah loved Allie",
    "02:14":"Like Harry loved Sally",
    "02:16":"Like Richard loved Julia (\"Twice!\")",
    "02:18":"Like Tom loved Meg",
    "02:21":"And the way he loved that volleyball (\"WILSON!\")",
    "02:25":"The way Demi Moore loved that ghost. (\"Weird.\")",
    "02:27":"The way Jack loved Rose (\"What?\")",
    "02:30":"I'll never let it go, never let it go (\"Was he talking about a ghost?\")",
    "02:33":"Never let it go!",
    "02:34":"I'll never let go!",
    "02:43":"(\"Dude, you alright?\" \"I think so.\")",
    "02:47":"Uh, if you'll be my leading lady",
    "02:49":"(\"It just seemed like it hurt.\")",
    "02:50":"Even though I may look crazy",
    "02:51":"(\"It's very high.\" \"It did a little.\")",
    "02:52":"(\"Key change?\" \"Nah, I don't want to.\")",
    "02:57":"(\"I feel like we should do a key chan-\" \"Okay.\")",
    "02:59":"I grab your hand, ask you to dance",
    "03:00":"In the middle of the street",
    "03:03":"Learn to sign, cheesy lines",
    "03:05":"Like \"Baby, you complete me.\"",
    "03:08":"And in case you forget",
    "03:10":"Where we've been and what we did",
    "03:12":"I'll write it all down, read it out loud",
    "03:13":"Again and again.",
    "03:17":"Close your eyes, arms out wide",
    "03:18":"\"I'm the king of the world.\"",
    "03:21":"Carpet ride, starry nights",
    "03:23":"There's no way I don't kiss the girl",
    "03:26":"And in case you forget",
    "03:28":"Where we've been and what we did",
    "03:30":"I'll write it all down, read it out loud",
    "03:32":"Again and again.",
    "03:35":"I promise if you let me",
    "03:37":"(\"Here's looking at you kid.\")",
    "03:39":"(\"Frankly my dear,\")",
    "03:43":"I'll love you like the movies.",
};
$(function(){
    var player = $("#musicPlayer")[0];
    //play button click-play or pause
    (function play(){
       $(".playBtn").off("click");
       $(".playBtn").on("click",function(){
          switch (this.className){
              case "playBtn play":
                  if(player.paused){
                      player.play();
                      $(".img i").addClass("active");
                      $(this).find("i").attr("class","icon glyphicon glyphicon-pause");
                  }else{
                      player.pause();
                      $(".img i").removeClass("active");
                      $(this).find("i").attr("class","icon glyphicon glyphicon-play");
                  }
          }
       });
   })();
    //update the progress bar while music playing
    (function progress(){
        player.onplaying = function(){
            updVolume(1050,player);
            setInterval(function(){
                var curTime  =Math.round(player.currentTime);
                var duration  = Math.round(player.duration);
                drawPg(curTime,duration);
                $(".timeNow").text(formatSeconds(curTime));
                $(".timeTotal").text(formatSeconds(duration));
                $(".lrc h1").text(lrc[formatSeconds(Math.round(player.currentTime))]);
            },1000);
            $(".img i").addClass("active");
            //console.log(lrc["00:10"]);
            //console.log($(".lrc"));

        };
        player.onended = function(){
            rest();
            player.currentTime  = 0;
            $(".img i").removeClass("active");
            $($(".playBtn")[1]).find("i").attr("class","icon glyphicon glyphicon-play");
        }
        $("#progress_time").on("click",function(e){
            updProgress(e.pageX,player);
        });
        $("#volume").on("click",function(e){
            updVolume(e.pageX,player);
        });
    })();
    $("tbody").on("dblclick","tr",function(){
       $("#musicPlayer")[0].src =  $(this).attr("value");
        $(".info_detail p").eq(0).text($(this).find("td").eq(1).text());
        $(".info_detail p small").eq(1).text($(this).find("td").eq(2).text());
        rest();
        player.play();

    });
});
//update progress when clicked
function updProgress(x,player){
    var length = x-$("#progress_time").offset().left;
    length = Math.round(length);
    player.currentTime = length/450*Math.round(player.duration);
    var cxt = $("canvas")[0].getContext("2d");
    cxt.clearRect(0,0,460,4);
    drawBg("progress_time",3,2,453,2);
    drawPg(player.currentTime,player.duration);
}
//update the volume
function updVolume(x,player){
    console.log(x);
    var length = x-$("#volume").offset().left;
    length = Math.round(length);
    player.volume = length/100;
    var cxt = $("canvas")[1].getContext("2d");
    cxt.clearRect(0,0,110,4);
    drawBg("volume",3,2,103,2);
    drawVl(player.volume);
}
//transform sec into min
function formatSeconds(value) {
    value = parseInt(value);
    var time;
    if (value > -1) {
        min = Math.floor(value / 60) % 60;
        sec = value % 60;
        if (min < 10) {
            time = "0";
        }
        time += min + ":";
        if (sec < 10) {
            time += "0";
        }
        time += sec;
    }
    return time;
}
function rest(){
    var player = $("#musicPlayer")[0];
    var cxt = $("canvas")[0].getContext("2d");
    cxt.clearRect(0,0,460,4);
    drawBg("progress_time",3,2,453,2);
    drawPg(0,player.duration);
    $($(".playBtn")[1]).find("i").attr("class","icon glyphicon glyphicon-pause");

}