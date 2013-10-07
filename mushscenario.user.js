// ==UserScript==
// @name       MushScenario
// @version    1.1.8
// @description  Modifications de Mush.vg pour parties scénarisées
// @grant      GM_xmlhttpRequest
// @match      http://mush.vg
// @match      http://mush.vg/*
// @match      http://mush.vg/#
// @exclude    http://mush.vg/g/*
// @exclude    http://mush.vg/gold/*
// @exclude    http://mush.vg/group/*
// @exclude    http://mush.vg/help
// @exclude    http://mush.vg/help*
// @exclude    http://mush.vg/me
// @exclude    http://mush.vg/ranking
// @exclude    http://mush.vg/theEnd/*
// @exclude    http://mush.vg/tid/*
// @exclude    http://mush.vg/u/*
// @copyright  2012+, Ma c'hi
// @updateurl  https://raw.github.com/Machi3000/MushScenario/master/mushscenario.user.js
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
var $ = unsafeWindow.jQuery;
var Main = unsafeWindow.Main;

var version = '1.1.8';

/**
 * Userscript global tools
 **/

function m_userscriptInit() {
    if($('#m_userscriptNotif').size()<1) {
        var html = '<div id="m_userscriptNotif" style="position:absolute; top:50px; right:0px;">'
        +'<div id="m_userscriptWarning" class=\'tiptop\' style="margin-bottom:10px;" >'
        +'<div class=\'tipbottom\'>'
        +'<div class=\'tipbg\' style="min-height:0px;">'
        +'<div class=\'tipcontent\'>'
        +'<p style="float:right;"><a href="http://mush.blablatouar.com/help.php" target="_blank">+ d\'infos</a></p>'
        +'<h1 style="background:url(\'http://www.hordes.fr/img/icons/r_repair.gif\') 0px 1px no-repeat;padding-left:18px;">UserScripts</h1>'
        +'<span style="display:none">Vous utilisez actuellement un (ou plusieurs) UserScript(s) : veuillez le(s) désactiver avant tout rapport de bug aux créateurs du jeu.</span>'
        +'</div></div></div></div></div>';
        $('body').append(html);
        
        if(localStorage['m_userscriptWarning']!=version) {
           	$('#m_userscriptWarning span').slideDown();
            setTimeout(function(){ 
            	$('#m_userscriptWarning span').slideUp();
                localStorage['m_userscriptWarning'] = version;
            },5000);
        }
        $('#m_userscriptWarning').mouseenter(function() { $('#m_userscriptWarning span').slideDown('fast'); });
        $('#m_userscriptWarning').mouseleave(function() { $('#m_userscriptWarning span').slideUp('fast'); });
        
        var css = '@media all and (max-width: 1600px) { '
        +'.mainmenu ul#menuBar { width: 500px; margin: 0px auto; }'
        +'body.start .mainmenu ul#menuBar { width: 500px; margin: 0px auto; }'
        +'}'
        +'@media only screen and (max-width: 1000px) {'
        +'.mainmenu ul#menuBar { width: 500px !important; margin: 0px auto; text-align:center; }'
		+'}';
        
        $('head').append('<style type="text/css">'+css+'</style>');
    }
}

function m_popin(title,message,button) {
    if($('#m_userscriptPopin').size()<1) {
        var html = '<div id="m_userscriptPopin" style="position:absolute;top:200px;width:100%;"><div class="poptop" style="margin:0px auto;"><div class="popbottom"><div class="popbg" id="m_userscriptPopinContent"></div></div></div>';
        $('body').append(html);
    }
    
    $('#m_userscriptPopinContent').html('<img src="img/design/neron.png" class="stamp" /><h4 style="margin-top:0px;">'+title+'</h4><p style="padding-left:76px;">'+message+'</p><div class="but"><div class="butright"><div class="butbg"><a href="#" class="m_userscriptPopinClose">'+button+'</a></div></div></div>');    
    $('#m_userscriptPopin').fadeIn();
    $('.m_userscriptPopinClose').click(function(){ $('#m_userscriptPopin').fadeOut(); });
}

/**
 * Userscript specific code
 **/
var sc;

function m_joinScenario() {
    var newScenarioCode = prompt('MushScénario\n---------------\nVeuillez saisir le code du scénario à utiliser :');
    if(newScenarioCode==false||newScenarioCode==undefined) return false;
    
    m_loadScenario(newScenarioCode);
}

function m_loadScenario(scenarioCode) {
    var data = 'code='+scenarioCode;
    localStorage['ms_scenarioCode']=scenarioCode;
    setTimeout(function() { GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://mush.blablatouar.com/scenario/api.php?'+data,
        headers:{"Accept": "text/json"},
        onload: function(responseDetails) {
            if(responseDetails.responseText!='null') {
                localStorage['ms_scenarioData']=responseDetails.responseText;
                localStorage['ms_scenarioIntro']=true;
        		document.location.reload(true);
            } else {
                alert('MushScénario\n---------------\nScénario introuvable.');
                delete localStorage['ms_scenarioData'];
    			delete localStorage['ms_scenarioCode'];
            }
        },
        onabort: function(responseDetails) {
            alert('MushScénario\n---------------\nChargement du scénario annulé.');
            delete localStorage['ms_scenarioData'];
            delete localStorage['ms_scenarioCode'];
        },
        onerror: function(responseDetails) {
            alert('MushScénario\n---------------\nErreur lors du chargement du scénario.\n('+responseDetails.statusText+')');
            delete localStorage['ms_scenarioData'];
            delete localStorage['ms_scenarioCode'];
        }
    }); },0);
}

function m_leaveScenario() {
    delete localStorage['ms_scenarioCode'];
    delete localStorage['ms_scenarioData'];
    $('#m_scenario_details').html('<em>Veuillez actualiser la page ...</em>');
    document.location.reload(true);
}

function m_replaceThisName() {
    console.log('> '+$(this).text().toLowerCase());
    for(e in sc) {
        if(e.indexOf('char_')==0) {
            var charname = e.substr(5);
            if(charname=='kuanti') { 
                charname='kuan ti';
            } else if(charname=='jinsu') { 
                charname='jin su'; 
            } else if(charname=='schrodinger') { 
                charname='schrödinger'; 
            }
            
            if($(this).text().toLowerCase().indexOf(charname)>=0) {
            	$(this).html($(this).html().replace(new RegExp(charname+'(?!\.png)','gi'),sc[e]));
            }
        }
    }
}

function m_replaceNames() {
    $('#chat_col span.buddy').each(m_replaceThisName);
    $('#chat_col strong').each(m_replaceThisName);
    $('#chat_col .objective p').each(m_replaceThisName);
    $('h1.who').each(m_replaceThisName); 
}

function m_applyScenario() {
    sc = $.parseJSON(localStorage['ms_scenarioData']);
    if(!sc) {
        console.log(sc);
        alert('MushScénario\n---------------\nUne erreur s\'est produite lors du chargement du scénario...');
        m_leaveScenario();
        return false;
    }
    $('#m_scenario_title').html(sc.title);
    $('.introScenario').click(function() { m_popin(sc.title,'<em>'+sc.intro.replace(/(\n)/g,'<br />')+'</em>','Fermer'); });
    if(sc.rules.length>0) {
    	$('.rulesScenario').click(function() { m_popin('Règles de la partie',sc.rules.replace(/(\n)/g,'<br />'),'Fermer'); });
    } else {
    	$('.rulesScenario').click(function() { m_popin('Règles de la partie','Pas de règle spécifique au scénario.<br />Pensez tout de même à respecter le <a href="http://mush.vg/help?cat=general&scat=rule" target="_blank">règlement</a> ainsi que les <a href="http://twinoid.com/support/cgu" target="_blank">C.G.U.</a> du jeu !','Fermer'); });
    }
    
    // Display Intro
    if(localStorage['ms_scenarioIntro']!=undefined) {
        m_popin(sc.title,'<em>'+sc.intro.replace(/(\n)/g,'<br />')+'</em>','Fermer');
        delete localStorage['ms_scenarioIntro'];
    }
    
    // Replace characters names
    m_replaceNames(sc);
    
    // Handle ajax updates
    var ms_mainUpdateContent = Main.updateContent;
    Main.updateContent = function(url,seek,dest,cb) {
        ms_mainUpdateContent(url,seek,dest,cb);
        setTimeout(m_replaceNames,3000);
    }
    
    var ms_mainLoadMoreWall = Main.loadMoreWall;
    Main.loadMoreWall = function(jq) {
        ms_mainLoadMoreWall(jq);
        setTimeout(m_replaceNames,2000);
    }
}

function m_thisInit() {
    var html = '<div id="m_scenario" class=\'tiptop\' style="margin-bottom:10px;" >'
    +'<div class=\'tipbottom\'>'
    +'<div class=\'tipbg\' style="min-height:0px;">'
    +'<div class=\'tipcontent\'>'
    +'<p style="float:right;opacity:0.4;"><a href="http://mush.blablatouar.com/scenario/index.php" target="_blank">v '+version+'</a></p>'
    +'<h1 style="background:url(\'http://mush.vg/img/icons/ui/book.png\') 0px 1px no-repeat;padding-left:18px;">MushScénario</h1>'
    +'<span id="m_scenario_details"></span>'
    +'</div></div></div></div>';
    $('#m_userscriptNotif').append(html);
    
    var ms_code = localStorage['ms_scenarioCode']; 
    if(ms_code!=''&&ms_code!=undefined) {
        $('#m_scenario_details').html('<strong>Scénario en cours :</strong><br />'
                                      +'<span id="m_scenario_title"><em>Chargement...</em></span><br />'
                                      +'<img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" /> <a href="#" class="rulesScenario">Règles</a><br />'
                                      +'<img src="http://data.hordes.fr/gfx/icons/item_rp_twin.gif" /> <a href="#" class="introScenario">Introduction</a><br />'
                                      +'<img src="http://mush.vg/img/icons/ui/unsociable.png" /> <a href="#" class="leaveScenario">Quitter le scénario</a><br />'
                                      +'<img src="http://www.hordes.fr/gfx/forum/smiley/h_plan.gif" /> <a href="http://mush.blablatouar.com/scenario/create.php" target="_blank">Créer un scénario</a>');
    	m_applyScenario();
    } else {
        $('#m_scenario_details').html('Aucun scénario en cours<br />'
                                      +'<img src="http://www.hordes.fr/gfx/forum/smiley/h_hunter.gif" /> <a href="#" class="joinScenario">Rejoindre un scénario</a><br />'
                                      +'<img src="http://www.hordes.fr/gfx/forum/smiley/h_plan.gif" /> <a href="http://mush.blablatouar.com/scenario/create.php" target="_blank">Créer un scénario</a>');
    }
    $('.joinScenario').click(function(){ m_joinScenario(); });
    $('.leaveScenario').click(function(){ if(confirm('MushScénario\n-------------------------\nVous allez quitter ce scénario. En êtes-vous sûr ?')) m_leaveScenario(); });
}


/**
 * Userscript init
 **/
function m_init() {
    m_userscriptInit();
    m_thisInit();
}
window.addEventListener('load', m_init, false);
