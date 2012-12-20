/* hoverIntent by Brian Cherne */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/* Superfish v1.4.8 - jQuery menu widget Copyright (c) 2008 Joel Birch Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php	http://www.gnu.org/licenses/gpl.html */
(function($){$.fn.superfish=function(op){var sf=$.fn.superfish,c=sf.c,$arrow=$(['<span class="',c.arrowClass,'"> &#187;</span>'].join("")),over=function(){var $$=$(this),menu=getMenu($$);clearTimeout(menu.sfTimer);$$.showSuperfishUl().siblings().hideSuperfishUl();},out=function(){var $$=$(this),menu=getMenu($$),o=sf.op;clearTimeout(menu.sfTimer);menu.sfTimer=setTimeout(function(){o.retainPath=($.inArray($$[0],o.$path)>-1);$$.hideSuperfishUl();if(o.$path.length&&$$.parents(["li.",o.hoverClass].join("")).length<1){over.call(o.$path);}},o.delay);},getMenu=function($menu){var menu=$menu.parents(["ul.",c.menuClass,":first"].join(""))[0];sf.op=sf.o[menu.serial];return menu;},addArrow=function($a){$a.addClass(c.anchorClass).append($arrow.clone());};return this.each(function(){var s=this.serial=sf.o.length;var o=$.extend({},sf.defaults,op);o.$path=$("li."+o.pathClass,this).slice(0,o.pathLevels).each(function(){$(this).addClass([o.hoverClass,c.bcClass].join(" ")).filter("li:has(ul)").removeClass(o.pathClass);});sf.o[s]=sf.op=o;$("li:has(ul)",this)[($.fn.hoverIntent&&!o.disableHI)?"hoverIntent":"hover"](over,out).each(function(){if(o.autoArrows){addArrow($(">a:first-child",this));}}).not("."+c.bcClass).hideSuperfishUl();var $a=$("a",this);$a.each(function(i){var $li=$a.eq(i).parents("li");$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});});o.onInit.call(this);}).each(function(){var menuClasses=[c.menuClass];if(sf.op.dropShadows&&!($.browser.msie&&$.browser.version<7)){menuClasses.push(c.shadowClass);}$(this).addClass(menuClasses.join(" "));});};var sf=$.fn.superfish;sf.o=[];sf.op={};sf.IE7fix=function(){var o=sf.op;if($.browser.msie&&$.browser.version>6&&o.dropShadows&&o.animation.opacity!=undefined){this.toggleClass(sf.c.shadowClass+"-off");}};sf.c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",arrowClass:"sf-sub-indicator",shadowClass:"sf-shadow"};sf.defaults={hoverClass:"sfHover",pathClass:"overideThisToUse",pathLevels:1,delay:800,animation:{opacity:"show"},speed:"normal",autoArrows:true,dropShadows:true,disableHI:false,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}};$.fn.extend({hideSuperfishUl:function(){var o=sf.op,not=(o.retainPath===true)?o.$path:"";o.retainPath=false;var $ul=$(["li.",o.hoverClass].join(""),this).add(this).not(not).removeClass(o.hoverClass).find(">ul").hide().css("visibility","hidden");o.onHide.call($ul);return this;},showSuperfishUl:function(){var o=sf.op,sh=sf.c.shadowClass+"-off",$ul=this.addClass(o.hoverClass).find(">ul:hidden").css("visibility","visible");sf.IE7fix.call($ul);o.onBeforeShow.call($ul);$ul.animate(o.animation,o.speed,function(){sf.IE7fix.call($ul);o.onShow.call($ul);});return this;}});})(jQuery);

/* jsessionID */
function addJSessionIdToLink(a,b){var c;if(a.indexOf("#")==-1&&a.indexOf("ExternalLinkPageFlow")==-1&&a.indexOf("http")==-1){var d=window.location.href;if(d.indexOf(";jsessionid")!=-1){var e=d.split(";jsessionid=");if(e.length>=2){var f=e[1]}c=a+";jsessionid="+f}else if(d.indexOf(";jsessionid")==-1){c=a+";jsessionid="+b}}else{c=a}return c}

/* benefits.gov */
function quickSubscribe() {
    window.open("http://service.govdelivery.com/service/multi_subscribe.html?code=USGOVBENEFITS_1&login=" + document.govdelivery.email.value + "&origin=" + window.location.href, "_self", 'resizable, width=1000,height=480,scrollbars=yes,left=10,top=10');
}

function subscribeLink(id) {
    window.open("https://public.govdelivery.com/accounts/USGOVBENEFITS/subscriber/new?topic_id=USGOVBENEFITS_" + id, "_blank", 'resizable, width=1000,height=480,scrollbars=yes,left=10,top=10');
}


function collapseExpand(strExpand, strCollapse, rowId, buttonId){
	var button = document.getElementById(buttonId);
	var loanDetails = document.getElementById(rowId);
	
	if (loanDetails.className == 'result-list-row'){
		loanDetails.className = 'program-detail-collapsed';
		button.className = "program-detail-expand-btn";
		button.firstChild.innerHTML = strExpand;
	}else{
		loanDetails.className = 'result-list-row';
		button.className = "program-detail-collapse-btn";
		button.firstChild.innerHTML = strCollapse;
	}	
}

function printPage() {
	window.print() ; 
}

function emailBoxReset(){
	clearErrorText();
	document.emailFormImpl.reset();
}

function emailBoxValidation(formType) {
	clearErrorText();
	checkForm(formType);
}

function clearErrorText() {
	$('span#emailBox-name').text('');
	$('span#emailBox-email').text('');
}

function checkForm(formType) {
	var path=window.location.href;
	var email = document.getElementById("recipient").value;
	if (formType == 'poc'){
		var email = document.getElementById("sender").value;
	} else {
		var name = document.getElementById("sender").value;
	}
	var comments = document.getElementById("emailComments").value;
	var submit = true;
	
	if( name == "" && formType != 'poc'){
		if(path.match(/^http:\/\/es\./))
			var emailNameMsg = $('span#emailBox-name').text('Ingrese Su Nombre');
		else
			var emailNameMsg = $('span#emailBox-name').text('Please enter Your Name');
		emailNameMsg.fadeIn(1000);
      	submit = false;
    }
	if( email == "" ){
		if(path.match(/^http:\/\/es\./))
			var emailReqMsg = $('span#emailBox-email').text('Ingrese Su Correo Electronico');
		else
			var emailReqMsg = $('span#emailBox-email').text('Please enter Your Email');
		emailReqMsg.fadeIn(1000);
	  	submit = false;
    }
    if( email != ""){
        var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(filter.test(email) == false){
        	if(path.match(/^http:\/\/es\./))
        		var emailValidMsg = $('span#emailBox-email').text('Este correo electronico no es valida');
        	else
        		var emailValidMsg = $('span#emailBox-email').text('Email address must be valid');
        	emailValidMsg.fadeIn(1000);
        	submit = false;
        }
    }
    if (submit == true)
    	document.emailFormImpl.submit();
    
  }


$(document).ready(function() {





  $('#emailPOP').fancybox({
		'width'                    : 600,
		'height'                   : 520,
		'padding'                  : 0,
		'scrolling'                : 'no',
		'autoDimensions'     	   : true,
		'autoScale'                : false,
		'transitionIn'             : 'none',
		'transitionOut'            : 'fade',
		'overlayOpacity'		   : '0.2',
		'type'                     : 'iframe'
		});
  
  $('#emailPOC').fancybox({
		'width'                    : 600,
		'height'                   : 520,
		'padding'                  : 0,
		'scrolling'                : 'no',
		'autoDimensions'     	   : true,
		'autoScale'                : false,
		'transitionIn'             : 'none',
		'transitionOut'            : 'fade',
		'overlayOpacity'		   : '0.2',
		'type'                     : 'iframe'
		});
  	
	
    //addthis
    $('a.addthis_button').attr('target', '_blank');
    
	$('ul.nav-menu').superfish({ 
		pathClass:  'current',
		pathLevels:    0,
		animation:   {opacity:'show', filter: 'none'}
	}); 

	//Take care of language transition
	var url = (window.location.href.match(/confirm-email/))?window.location.href.replace('/email/confirm-email/',''):window.location.href;
	if(url.match(/^http:\/\/es\./)) {
		//Spanish
		if(url.match(/^http:\/\/es\.production/) || url.match(/^http:\/\/es\.staging/)  || url.match(/^http:\/\/es\.preview/) || url.match(/^http:\/\/es\.test/) || url.match(/^http:\/\/es\.dev/) || url.match(/^http:\/\/es\.origin/))
			$('.languageSwitch').html("In English").attr('href',url.replace("http://es.","http://"));
		else
			$('.languageSwitch').html("In English").attr('href',url.replace("http://es.","http://www."));
		
	}
	else{
		//English 
		if(url.match(/^http:\/\/(en|www)\./)){
			$('.languageSwitch').html("En Espa\u00f1ol").attr('href',url.replace(/^http:\/\/\w{2,3}\./,"http://es."));
		}else{
			$('.languageSwitch').html("En Espa\u00f1ol").attr('href',url.replace("http://","http://es."));
		}	
	}
	
	//Attach a jsession id to all links, if cookies are disabled
	  if(!navigator.cookieEnabled){
		$.get("/api/session/start", function(data){	
		        //Adding jsession id to anchor tags
		       $("a").each(function() {
			            var newLink = addJSessionIdToLink($(this).attr('href'), data.jsessionid);
			            $(this).attr('href', newLink);});
		       //Adding jsession id to form tags
		       $("form").each(function() {
		           		var newLink = addJSessionIdToLink($(this).attr('action'), data.jsessionid);
		            	$(this).attr('action', newLink);});
		       //Adding jsession id to area tags
		       $("area").each(function() {
		           		var newLink = addJSessionIdToLink($(this).attr('href'), data.jsessionid);
		            	$(this).attr('href', newLink);});
		    
		});
	  }
	// Google Analytics Outbound Link Metrics
	$("body").delegate("a", "click", function(){
        var $a = $(this);
        var href = ""+$a.attr('href');

		// remove external link handler if needed
        if (href.match(/\/ExternalLinkPageFlow/)) {
        	var href1 = href.split('url=');
        	var url = href1[1];
        } else {
        	var url = href;
        }

        // get site root domain
        var sourceDomain = document.domain;
        //var sourceDomain = "en.benefits.dev";   // debug
        var domains = sourceDomain.split('.');
        var end = domains.length;
        var start = end - 2;
        var rootDomain = domains.slice(start, end).join('.');
        var domain = new RegExp(rootDomain, 'i');

        // if url is external submit metrics
        if (!url.match(domain) && url.match(/^http/)){
			var name = ""+$a.attr('name');
			var otherStr = "Other";
			var org = "";
			//var class = ""+$a.attr('class');
			if (name != ""){
				if (name.match(/\|\|/)) {
					var names = name.split('||');
					var agency = $.trim(""+names[1]);
					if (agency == "")
						agency = otherStr;
					org += names[0];
					org = $.trim(org);
					url = agency + ' || ' + $.trim(url);
				} else {
				org = $.trim(name);
				url = otherStr + ' || ' + $.trim(url);
				}
			} else {
				org = otherStr;
				url = otherStr + ' || ' + $.trim(url);
			}
			if (org == "")
				org = otherStr;
			
			// open link in new window
			if($a.attr('target').length==0)
			$a.attr('target', '_blank');
			
			// submit metrics
			_gaq.push(['_trackEvent', 'Outbound Links', org, url]);
			//alert('link: '+url+'\norg: '+org+'\ndomain: '+domain);
        }
    });
}); 

//<![CDATA[
var usagov_sayt_url = "http://search.usa.gov/sayt?aid=13";
//]]>
