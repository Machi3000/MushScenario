// ==UserScript==
// @name       MushScenario
// @version    0.1
// @description  Légères modifications d'interface pour scénario en casting
// @match      http://mush.vg/*
// @match      http://mush.vg/#
// @copyright  2012+, Ma c'hi
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
var $ = unsafeWindow.jQuery;

var ms_charNames = {
    'Chao':'CHA',
    'Chun':'CHU',
    'Eleesha':'ELE',
    'Finola':'FIN',
    'Frieda':'FRI',
    'Hua':'HUA',
    'Ian':'PLOP',
    'Janice':'JAN',
    'Jin Su':'JIN',
    'Kuan Ti':'KUA',
    'Gioele':'GIO',
    'Paola':'PAO',
    'Raluca':'RAL',
    'Roland':'ROL',
    'Stephen':'STE',
    'Terrence':'TER',
    'NERON':'NEZ ROND',
    'Schrödinger':'SCH'
};

function ms_replaceCharName() {
    var thisCharName = $(this).text().trim();
    if(ms_charNames[thisCharName]) {
    	$(this).text(ms_charNames[thisCharName]);
    } else if(thisCharName.substr(-2)==' :') {
        console.log(thisCharName+'=>'+thisCharName.substr(0,thisCharName.length-2));
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

function ms_init() {
    ms_replaceCharNames();
}

window.addEventListener('load', ms_init, false);
