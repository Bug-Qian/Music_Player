/**
 * Created by CesyZhao on 2016/10/13.
 * musics information storage
 */
var song = {
    name:"one call away",
    singer:"Charlie Puth",
    ablum:"love you",
    duration:"03:12",
    src:"resources/music/Charlie%20Puth%20-%20One%20Call%20Away.mp3"
};
function init(){
    var request = window.indexedDB.open("musics");
    request.onupgradeneeded = function(){
        var db = this.result;
        if(db.objectStoreNames.contains("musics")){
            db.deleteObjectStore("musics");
        }
        db.createObjectStore("musics",{
            keyPath:"id",
            autoIncrement:true
        });
        if(db.objectStoreNames.contains("iLikes")){
            db.deleteObjectStore("iLikes");
        }
        db.createObjectStore("iLikes",{
            keyPath:"id",
            autoIncrement:true
        });
    }
}
init();
function getStore(storeName,handler){
    var request = window.indexedDB.open("musics");
    request.onsuccess = function(){
        var db = this.result;
        var trans = db.transaction(storeName,"readwrite");
        var store = trans.objectStore(storeName);
        handler(store);
    }
}
getStore("musics",function (store) {

});
(function saveMusic(){
    getStore("musics",function (store) {
        store.clear();
        store.put(song);
    });
})();
function getMusic(handler){
    getStore("musics",function (store) {
        var result = store.getAll();
        result.onsuccess = function(event){
            handler(event);
        };
    });
};
(function showMusic(){
    getMusic(function(event){
        var result = event.target.result;
        console.log(result);
    })
})();