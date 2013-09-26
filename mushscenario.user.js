// ==UserScript==
// @name       MushScenario
// @version    1.0.1
// @description  Légères modifications d'interface pour scénario en casting
// @match      http://mush.vg/*
// @match      http://mush.vg/#
// @copyright  2012+, Ma c'hi
// @updateurl  https://raw.github.com/Machi3000/MushScenario/master/mushscenario.user.js
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
var $ = unsafeWindow.jQuery;
var Main = unsafeWindow.Main;

var ms_title = 'La secte du Grumpy Cat';

var ms_charNames = {
    'Chao':'Psychopathe',
    'Chun':'Cobaye',
    'Eleesha':'Curieuse',
    'Finola':'Laborantine',
    'Frieda':'Vieille',
    'Hua':'Bertha',
    'Ian':'Drogué',
    'Janice':'Geek',
    'Jin Su':'Arriviste',
    'Kuan Ti':'Bidouilleur',
    'Gioele':'Parano',
    'Paola':'Pipelette',
    'Raluca':'Asociale',
    'Roland':'Pilote',
    'Stephen':'Opportuniste',
    'Terrence':'Handicapable',
    'NERON':'NEZ ROND',
    'Schrödinger':'Grumpy Cat'
};

function ms_replaceCharName() {
    var thisCharName = $(this).text().trim();
    if(ms_charNames[thisCharName]) {
    	$(this).text(ms_charNames[thisCharName]);
    } else if(thisCharName.substr(-2)==' :') {
		thisCharName = thisCharName.substr(0,thisCharName.length-2);
        if(ms_charNames[thisCharName]) {
            $(this).text(ms_charNames[thisCharName]+' :');
        }
    }
}

function ms_replaceCharNames() {
    $('#chat_col span.buddy').each(ms_replaceCharName);
    $('#chat_col strong').each(ms_replaceCharName);
    $('h1.who').each(ms_replaceCharName);
}

var ms_mainUpdateContent = Main.updateContent;
Main.updateContent = function(url,seek,dest,cb) {
    ms_mainUpdateContent(url,seek,dest,cb);
    setTimeout(ms_replaceCharNames,5000);
}

var ms_mainLoadMoreWall = Main.loadMoreWall;
Main.loadMoreWall = function(jq) {
    ms_mainLoadMoreWall(jq);
    setTimeout(ms_replaceCharNames,2000);
}

function ms_init() {
    ms_replaceCharNames();
    $('ul#menuBar').after('<p style="text-align:center;margin-top:20px; margin-bottom:-20px;" id="ms_info">MushScénario : <strong>'+ms_title+'</strong> <img src="/img/icons/ui/infoalert.png" class="repre"></p>');
    $('#ms_info').mouseover(function(){
        Main.showTip(this,'<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>UserScript MushScénario</h1>Vous utilisez actuellement un UserScript : veuillez le désactiver avant tout rapport de bug aux créateurs de Mush.<br /><em>Créé par Ma c\'hi</em></div></div></div></div>');
    });
    $('#ms_info').mouseout(function(){
        Main.hideTip(); 
    });
}


window.addEventListener('load', ms_init, false);
