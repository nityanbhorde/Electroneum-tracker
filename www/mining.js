/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var storage;
var base_api = "https://api.etn.spacepools.org/v1/stats/address/";


function init() {
    document.addEventListener("deviceready",onDeviceReady,false);
    storage = window.localStorage;
}

function onDeviceReady(){
    var node = document.createElement('link');
    
    node.setAttribute('rel','stylesheet');
    node.setAttribute('type','text/css');
    node.setAttribute('href','style.css');
    
    document.getElementsByTagName('head')[0].appendChild(node);
}
// on etn submit handler
function processForm(){
    var info = document.getElementById("info");
    var url = base_api.concat(info.value);
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onload = function(){
        var data = JSON.parse(request.responseText);
        console.log(data);
        //console.log(data.charts.hashrate["0"]);
        calc_avg_hash(data);
    };
    request.send();
}
// calculate average hash rate from past 10 instances
function calc_avg_hash(data){
    var array_length = data.charts.hashrate.length;
    var i = array_length -1;
    var accum = 0;
    while(i > array_length -11){
        accum += data.charts.hashrate[i]["1"];
        i--;
    }
    accum /= 10;
    var space = document.getElementById("inserting");
    var htmlString = "";
    htmlString = "<p> Your average hash rate is " + accum + "! </p>";
    space.insertAdjacentHTML('beforeend',htmlString);
}