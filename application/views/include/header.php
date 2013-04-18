<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>

<meta content="text/html; charset=utf8" http-equiv="Content-Type">
<title>Benefits.gov - Benefit Finder</title>

<?php if(strlen(config_item('app_url')) > 0): ?>
<base href="<?php echo config_item('app_url')?>" />
<?php endif;?>

<link type="image/x-icon" href="./assets/benefits.ico" rel="shortcut icon">
<link href="./assets/apple-touch-icon.png" rel="apple-touch-icon">

<link type="text/css" href="./assets/css.css" rel="stylesheet">

<link media="print" type="text/css" href="./assets/print.css" rel="stylesheet">
<!--[if IE 7]><link rel="stylesheet" href="./static-dev/benefits/en/css/ie7.css" type="text/css" /><![endif]-->

<script type="text/javascript" async="" src="https://www.google-analytics.com/ga.js"></script><script src="./assets/jquery.min.js" type="text/javascript"></script>
<script src="./assets/benefits-1.0.js" type="text/javascript"></script>

<meta content="EgJ6rkU0KZuXB19VI_x8s-K4_ler9CVs4hi0PQwx5ic" name="google-site-verification">
<meta content="9D8362E06B89356F791992F1447E4E87" name="msvalidate.01">
<meta content="Benefits.gov is a partnership of many Federal agencies and organizations with a shared vision - to provide improved, personalized access to government benefit programs." name="description">

<?php if(!empty($step)): ?>
<style type="text/css">.benefits-logo {height:80px; position:relative; top:-999px; left:-999px; visibility:hidden; } </style>
<?php endif;?>

<script type="text/javascript" src="./assets/jquery-ui.js"></script>
<script type="text/javascript" src="./assets/jquery.questionnaire-1.0.js"></script>
<link type="text/css" href="./assets/questionnaire.css" rel="stylesheet">

<script src="./assets/analytics.js" type="text/javascript"></script>
<script type="text/javascript" src="https://search.usa.gov/javascripts/stats.js"></script></head>

<script type="text/javascript">
function loadUrl(newLocation)
{
  window.location.href = newLocation;
}
</script>

<body style="overflow: auto;">

<a class="skip-to-content" href="#skip-to-content">Skip to Content</a>

<div class="site-border">
  <div class="warning" style="border: 1px solid #F3B94C; display: block;">
    <h4>This site is a mockup intended to demonstrate integration between Benefits.gov and MyUSA.  The results provided by this site are for demonstration purposes only, and may not reflect actual available benefits.</h4>
    <p>For federal benefits information, visit <a href="http://benefits.gov">Benefits.gov</a>.  For more information on MyUSA, visit <a href="https://my.usa.gov/">MyUSA</a>.
  </div>
	<div class="main-nav">
		<ul id="language">
			<li><a href="./">Home</a></li>
			<li id="last-child"><a class="languageSwitch" href="http://es.benefits.gov/benefits/benefit-finder/#benefits&amp;qc=cat_1">En Español</a></li>
		</ul>
		
		<ul class="nav-menu sf-js-enabled sf-shadow">
			<?php if(empty($user)) { ?>
			<li id="last-child"><a href="./login?origin=<?php echo current_url(); ?>" id="last-child" class="login_button">MyGov Login</a></li>
			<?php } else { ?>
				
				<li id="last-child"><a href="#">Logged in with MyUSA</a></li>
				<li id="last-child"><a href="./logout" id="last-child" class="login_button">Log Out</a></li>
				
			<?php }?>
		</ul>		
		
		<ul class="nav-menu sf-js-enabled sf-shadow">
			<li id="last-child"><a href="http://addthis.com/bookmark.php?v=250&amp;username=xa-4bb60b8d5a4d2e30" id="last-child" class="addthis_button" target="_blank"><img title="Bookmark and Share" alt="Bookmark and Share" src="./assets/addThis.gif"></a></li>
		</ul>
				

		 
	<ul class="nav-menu sf-js-enabled sf-shadow">
		<li class="current"><a class="navId51 sf-with-ul" href="./benefits">Benefits<span class="sf-sub-indicator"> »</span></a><ul style="display: none; visibility: hidden;">
			<li><a class="navId51" href="./benefits/benefit-finder">Benefit Finder</a></li>
			<li><a class="navId51" href="./benefits/browse-by-state">By State</a></li>
			<li><a class="navId51" href="./benefits/browse-by-category">By Category</a></li>
			<li><a class="navId51" href="./benefits/browse-by-federal-agency">By Federal Agency</a></li>
			<li><a class="navId51" href="./benefits/other-resources">Other Resources</a></li></ul></li>
		<li><a class="navId66 sf-with-ul" href="./news">Newsroom<span class="sf-sub-indicator"> »</span></a><ul style="display: none; visibility: hidden;">
			<li><a class="navId66" href="./news/news-articles">News Articles</a></li>
			<li><a class="navId66" href="./news/newsletter">eNewsletter</a></li>
			<li><a class="navId66" href="./news/press-releases">Press Releases</a></li></ul></li>
		<li><a class="navId74 sf-with-ul" href="./advocates">Advocates<span class="sf-sub-indicator"> »</span></a><ul style="display: none; visibility: hidden;">
			<li><a class="navId74" href="./advocates/community-advocates">Community Advocates</a></li>
			<li><a class="navId74" href="./advocates/partners">Partners</a></li></ul></li>
		<li><a class="navId64 sf-with-ul" href="./about-us">About<span class="sf-sub-indicator"> »</span></a><ul style="display: none; visibility: hidden;">
			<li><a class="navId64" href="./about-us/overview">Overview</a></li>
			<li><a class="navId64" href="./about-us/link-to-us">Link to Us</a></li></ul></li>
		<li><a class="navId79 sf-with-ul" href="./help">Help<span class="sf-sub-indicator"> »</span></a><ul style="display: none; visibility: hidden;">
			<li><a class="navId79" href="./help/faqs">FAQs</a></li>
			<li><a class="navId79" href="./email/contact-us">Contact Us</a></li></ul></li>
	</ul>
	</div>
    
    <div class="header">
		<span class="benefits-logo">
			<a href="./"><img title="Benefits.gov - Your Path to Government Benefits" alt="Benefits.gov - Your Path to Government Benefits" src="./assets/benefits-logo.jpg" class="benefits-logo-img"></a>
		</span>
		<span class="site-search">

        	  <form onsubmit="_gaq.push(['_linkByPost', this]);" name="search" method="get" id="search_form" action="https://search.usa.gov/search" accept-charset="UTF-8"><div style="margin:0;padding:0;display:inline"><input type="hidden" value="?" name="utf8"></div>
            <input type="hidden" value="govbenefits" name="affiliate" id="affiliate">
        	<span class="magnifying-glass"><img title="This image depicts a magnifying glass for searching" alt="This image depicts a magnifying glass for searching" src="./assets/magnifying-glass.gif" class="magnifying-glass-img"></span>
			<span class="search">
				<input type="text" autocomplete="off" name="query" alt="Search" title="Search" id="query" class="usagov-search-autocomplete search-input ac_input">
			</span>

            <span class="search-submit">
            	<a href="javascript: document.search.submit();" class="button"><span>Search</span></a>
			</span>
<div class="advanced-search"><a onclick="_gaq.push(['_link', 'https://search.usa.gov/search/advanced?affiliate=govbenefits&amp;locale=en&amp;m=false&amp;filter=moderate&amp;page=1&amp;per_page=10&amp;query=']); return false;" href="https://search.usa.gov/search/advanced?affiliate=govbenefits&amp;locale=en&amp;m=false&amp;filter=moderate&amp;page=1&amp;per_page=10&amp;query=">Advanced Search</a></div>

            </form>  
		</span>
	</div>

  
