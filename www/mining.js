/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var storage;
var base_api = "https://api.etn.spacepools.org/v1/stats/address/"

function init() {
    document.addEventListener("deviceready",onDeviceReady,false);
    storage = window.localStorage;
}

function onDeviceReady(){
    var node = document.createElement('link');
    node.setAttribute('rel','stylesheet');
    node.setAttribute('type','text/css');
    if(cordova.platformID == 'ios'){
        node.setAttribute('href','iosMining.css');  
    }
    else{
        node.setAttribute('href','androidMining.css');
    }
    document.getElementsByTagName('head')[0].appendChild(node);
}

function processForm(){
    var info = document.getElementById("info");
    var url = base_api.concat(info.value);
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onload = function(){
        var data = JSON.parse(request.responseText);
        console.log(data);
    };
    request.send();
}