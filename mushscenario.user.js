// ==UserScript==
// @name       MushScenario
// @version    1.2.1
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
// @copyright  2012-2014+, Ma c'hi
// @updateurl  https://raw.github.com/Machi3000/MushScenario/master/mushscenario.user.js
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
var $ = unsafeWindow.jQuery;
var Main = unsafeWindow.Main;

var version = '1.2.1';

/**
 * Userscript global tools
 **/

function m_userscriptInit() {
	if($('#m_userscriptArea').size()<1) {
		var html = '<div id="m_userscriptArea">'
		+'<h2>UserScripts</h2>'
		+'<div class="m_tabs">'
		+'<ul>'
        +'<li data-id="m_tabs_reduced"><img src="http://mush.vg/img/icons/ui/up.png" alt="reduced" title="Réduire ce cadre" /></li>'
		+'<li data-id="m_tabs_warning" class="active"><img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" alt="warning" title="Information sur les userscripts" /></li>'
		+'</ul>'
		+'<div id="m_tabs_warning">'
		+'<p>Vous utilisez actuellement un (ou plusieurs) UserScript(s) : veuillez le(s) désactiver avant tout rapport de bug aux créateurs du jeu.<br /><a href="http://mush.blablatouar.com/help.php" target="_blank">+ d\'infos</a></p>'
		+'</div>'
        +'<div id="m_tabs_reduced"></div>'
		+'</div>'
		+'</div>';
		$('body').append(html);
	}
	
	var css = ' '
    +'#m_userscriptArea { position:absolute; top: 45px; background-color: #171C56; border: 1px solid #213578; font-size: 0.7em; padding:4px; width: 300px; right:10px; box-shadow: 0px 0px 5px #000000; overflow:hidden; }'
    +'#m_userscriptArea h2 { font-size: 1em; background: url(http://www.hordes.fr/img/icons/r_repair.gif) 1px 0px no-repeat; margin: 0px 0px 8px 0px; padding-left:20px; }'
    +'#m_userscriptArea .m_tabs ul { float:right;margin-top: -24px; }'
    +'#m_userscriptArea .m_tabs ul li { opacity: 0.6; background: #213578; padding:4px 4px 4px 4px; cursor: pointer; display:inline-block; margin: 0px 2px 0px 2px; height:16px; vertical-align:middle;  }'
    +'#m_userscriptArea .m_tabs ul li.active, #m_userscriptArea .m_tabs ul li:hover { opacity: 1; }'
    +'#m_userscriptArea .m_tabs { padding: 0px; } '
    +'#m_userscriptArea .m_tabs div { padding: 4px; background: #213578; }'
    +'#m_userscriptArea .m_tabs div h3 { font-size: 1em; border-bottom: 1px dotted #CCCCCC; margin-bottom: 2px; }'
    +'#m_userscriptArea .m_tabs div img { margin-bottom:-3px; }'
    +''
    +'#m_tabs_reduced { margin-bottom:-15px; visibility:hidden; display:none; }'
    +''
    +'#m_userscriptPopin { position:absolute; top: 140px; background-color: #171C56; border: 1px solid #213578; font-size: 1em; padding:4px; width: 800px; right:0px; left:0px; margin: auto; box-shadow: 0px 0px 5px #000000; }'
    +'#m_userscriptPopin h2 { font-size: 0.7em; background: url(http://www.hordes.fr/img/icons/r_repair.gif) 1px 0px no-repeat; margin: 0px 0px 3px 0px; padding-left:20px; }'
    +'#m_userscriptPopin #m_userscriptPopinContent { padding: 4px; background: #213578; }'
    +'#m_userscriptPopin #m_userscriptPopinContent h4 { margin:4px; }'
    +'#m_userscriptPopin #m_userscriptPopinContent p { margin: 4px 4px 4px 8px; font-size:0.9em;  }'
    +'#m_userscriptPopin #m_userscriptPopinContent a.m_userscriptPopinClose { display:block; width: 100px; margin: 15px auto 5px; background-color: #102B83; border: 1px solid #171C56; color: #CCCCCC; text-decoration: none; text-align:center;  box-shadow: 0px 0px 5px #000000; }'
    +'#m_userscriptPopin #m_userscriptPopinContent a.m_userscriptPopinClose:hover { color: #FFFFFF; box-shadow: 0px 0px 3px #000000; }'
	+' ';
    $('head').append('<style type="text/css">'+css+'</style>');
    
    $('#m_userscriptArea .m_tabs ul li').click(function() {
        $('#m_userscriptArea .m_tabs div').slideUp();
        $('#'+$(this).attr('data-id')).slideDown();
        $('#m_userscriptArea .m_tabs ul li').removeClass('active');
        $(this).addClass('active');
        localStorage['m_currentTab']=name;
    });
    
}

function m_userscriptAfterInit() {
    if(localStorage['m_currentTab']) {
        $('#m_userscriptArea .m_tabs div').slideUp();
        $('#m_tabs_'+localStorage['m_currentTab']).slideDown();
        $('#m_userscriptArea .m_tabs ul li').removeClass('active');
        $('#m_userscriptArea .m_tabs ul li[data-id="m_tabs_'+localStorage['m_currentTab']+'"]').addClass('active');
    }
}

function m_updateTab(name,content) {
    $('#m_tabs_'+name).html(content);
}

function m_addTab(name,icon,content,title) {
    if($('#m_tabs_'+name).size()<1) {
       var li = '<li data-id="m_tabs_'+name+'"><img src="'+icon+'" alt="'+name+'" title="'+title+'" /></li>';
       $('#m_userscriptArea .m_tabs ul').append(li);
        var tab = '<div id="m_tabs_'+name+'" style="display:none;"></div>';
       $('#m_userscriptArea .m_tabs').append(tab);
    }
    
    $('#m_userscriptArea .m_tabs ul li[data-id="m_tabs_'+name+'"]').click(function() {
        $('#m_userscriptArea .m_tabs div').slideUp();
        $('#'+$(this).attr('data-id')).slideDown();
        $('#m_userscriptArea .m_tabs ul li').removeClass('active');
        $(this).addClass('active');
        localStorage['m_currentTab']=name;
    });
    
    m_updateTab(name,content);
}

function m_popin(title,message,button) {
    if($('#m_userscriptPopin').size()<1) {
        var html = '<div id="m_userscriptPopin"><h2>UserScripts</h2><div id="m_userscriptPopinContent"></div></div>';
        $('body').append(html);
    }
    
    $('#m_userscriptPopinContent').html('<h4>'+title+'</h4><p>'+message+'</p><a href="#" class="m_userscriptPopinClose">'+button+'</a>');    
    
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
    if(!$(this).hasClass('ms_parsed')) {
        $(this).addClass('ms_parsed');
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
                    $(this).html($(this).html().replace(new RegExp(charname+'(?!\.png)','gi'),'<span class="ms_replaced" title="'+charname+'">'+sc[e]+'</span>'));
                }
            }
            if(e.indexOf('item_')==0) {
                
            }
            if(e.indexOf('search_')==0) {
                
            }
            if(e.indexOf('project_')==0) {
                
            }
            if(e.indexOf('m_')==0) {
                
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
    var html = ''
    +'<p style="float:right;opacity:0.4;"><a href="http://mush.blablatouar.com/scenario/index.php" target="_blank">v '+version+'</a></p>'
    +'<h3><img src="http://mush.vg/img/icons/ui/book.png" /> MushScénario</h3>'
    +'<span id="m_scenario_details"></span>'
    +'';
    m_addTab('scenario','http://mush.vg/img/icons/ui/book.png',html,'Mush Scénario');
        
    var ms_code = localStorage['ms_scenarioCode']; 
    if(ms_code!=''&&ms_code!=undefined) {
        $('#m_scenario_details').html('<strong>Scénario en cours :</strong><br />'
                                      +'<span id="m_scenario_title"><em>Chargement...</em></span>'
                                      +'<span><img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" /> <a href="#" class="rulesScenario">Règles</a></span>'
                                      +'<span><img src="http://data.hordes.fr/gfx/icons/item_rp_twin.gif" /> <a href="#" class="introScenario">Introduction</a></span>'
                                      +'<span><img src="http://mush.vg/img/icons/ui/unsociable.png" /> <a href="#" class="leaveScenario">Quitter scénario</a></span>'
                                      +'<span><img src="http://www.hordes.fr/gfx/forum/smiley/h_plan.gif" /> <a href="http://mush.blablatouar.com/scenario/create.php" target="_blank">Créer scénario</a></span>');
    	m_applyScenario();
    } else {
        $('#m_scenario_details').html('Aucun scénario en cours<br />'
                                      +'<span class="solo"><img src="http://www.hordes.fr/gfx/forum/smiley/h_hunter.gif" /> <a href="#" class="joinScenario">Rejoindre un scénario</a></span>'
                                      +'<span class="solo"><img src="http://www.hordes.fr/gfx/forum/smiley/h_plan.gif" /> <a href="http://mush.blablatouar.com/scenario/create.php" target="_blank">Créer un scénario</a></span>');
    }
    $('.joinScenario').click(function(){ m_joinScenario(); });
    $('.leaveScenario').click(function(){ if(confirm('MushScénario\n-------------------------\nVous allez quitter ce scénario. En êtes-vous sûr ?')) m_leaveScenario(); });

    var css = '#m_scenario_details span#m_scenario_title { display:block; width:100%; padding-left:10px; }'
    + '#m_scenario_details span { display: inline-block; width: 114px; text-align:left; }'
    + '#m_scenario_details span.solo { width: 100%; }'
    + '.ms_replaced { cursor: help; }';
    $('head').append('<style type="text/css">'+css+'</style>');
}


/**
 * Userscript init
 **/
function m_init() {
    m_userscriptInit();
    m_thisInit();
    m_userscriptAfterInit();
}
window.addEventListener('load', m_init, false);
