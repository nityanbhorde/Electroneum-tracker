

//globals
var storage;
var average =0;
var data;


function init() {
    storage = window.localStorage;
    document.addEventListener("deviceready",onDeviceReady,false);
}
function onDeviceReady(){
  ;
}
// on etn submit handler
function processForm(){
    var base_api = "https://api.etn.spacepools.org/v1/stats/address/";
    var info = document.getElementById("info");
    url = base_api.concat(info.value);
    requestData();
    setTimeout(printAverage,2000);
}
// calculate average hash rate from past 10 instances
function calc_avg_hash(){
    var array_length = data.charts.hashrate.length;
    var i = array_length -1;
    while(i > array_length -11){
        average += data.charts.hashrate[i]["1"];
        i--;
    }
    average /= 10;
}
function printAverage(){
    var space = document.getElementById("inserting");
    var htmlString = "";
    htmlString = "<p> Your average hash rate is " + average + "! </p>";
    space.insertAdjacentHTML('beforeend',htmlString);
}
//requests data from api every ten minutes, makes sure rate has not dropped
function requestData(){
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onload = function(){
        data = JSON.parse(request.responseText);
        var curr = data.charts.hashrate.length -1;
        if(data.charts.hashrate[curr]["1"] < average){
            notify(); //send notification here
        }
       calc_avg_hash();
    };
    request.send();
        
    setTimeout(requestData,600000); //10m
}
//sends notification
function notify(){
    cordova.plugins.notification.local.schedule({
        id         : 1,
        title      : 'Your hash rate has dropped!',
        text       : 'Go find out what went wrong',
    });
}
