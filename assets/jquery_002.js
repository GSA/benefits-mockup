/*===========================================

jQuery Plugable Framework for Benefits.Gov 
How to use this plugin:
In your HTML file add this:

<div id="example-id"></div>
<script type="text/javascript>
$("#questionnaire-id").questionnaire();
</script>

=============================================*/
//This line ensure that '$' variable will not conflict with other libraries/frameworks
(function($) {
	if(!MessageTags)
		var MessageTags = {};	  
	var Constants =  {
		 
		DEBUG:						1,
		DEFAULT_CATEGORY:			1,
		SHOW_COUNTER_NOW : 			1,
		QUESTIONS_PER_PAGE : 		10,
		APPLICATION_ID : 			'benefits',
		LOAD_IMG :					"/static-dev/benefits/common/images/ajax-loader.gif",
		INCREASING_COUNTER :		'decreasingCounter',
		
		// Questionnaire tabs
		QUESTIONNAIRE_TAB:			"Answer Questions",
		RESULTS_TAB:				"View Benefits Results",
		FAVORITES_TAB:				"Your Favorites",		

		// Action labels
		REMOVE_BENEFIT_LABEL:		"Remove from Favorites",
		ADD_BENEFIT_LABEL:			"Add to Favorites",
		READ_MORE_LABEL:			"Read More",
		NEXT_BUTTON:				"Next",
		PREVIOUS_BUTTON:			"Previous",
		REVIEW_ANSWERS_LABEL:		"Review Your Answers",
		PRINT_PAGE_LABEL:			"Print Page",
		EDIT_ANSWERS_LABEL:			"Edit Answers",
		
		// Static answers
		YES_LABEL:					"Yes",
		NO_LABEL:					"NO",
		NO_ANSWER_LABEL:			"No Answer",
		GO_BACK_LABEL:				"Go Back",
		
		// Benefit Results/Details pages
		MANAGING_ORG_LABEL:			"Managing Organization",
		DESCRIPTION_LABEL:			"Description",
		GENERAL_REQUIREMENTS_LABEL:	"General Program Requirements",
		NEXT_STEPS_LABEL:			"Your Next Steps",
		APPLICATION_PROCESS_LABEL:	"Application Process",
		POC_INFO_LABEL:				"Program Contact Information",
		ORG_DESCRIPTION_LABEL:		"Organization Description",
		
		// Message tags
		RESULTS_TITLE: 				"Your Benefit Results",
		RESULTS_HELP_TEXT:			"Read full benefit description.<br/>You may answer more questions to narrow down your results.",
		NO_RESULTS_AVALIABLE:		"You have no available benefits, please answer more questions.",
		FAVORITES_TITLE:			"Your favorites",
		FAVORITES_HELP_TEXT:		"This is your favorites list",	
		NO_FAVORITES_AVAILABLE:		"You have no benefits in your favorite list.",
		BENEFITS_ELIGIBLE_FOR_LABEL:"Benefits You May be Eligible For:",
		
		
		INVALID_ANSWER_TITLE:		"Invalid Answer",
		ANSWERS_TITLE:				"Review Your Answers",
		ANSWERS_HELP_TEXT:			"Review your answers for the Find Benefits questions.<br/>Click a question to return to the questionnaire and modify your answers.",
		NO_ANSWERS_AVAILABLE:		"No answers available, please go back to 'Find Benefits' and answer questions",
		NO_QUESTIONS_AVAILABLE:		"No questions are available in this category based on your previous answers",
		GO_TO_RESULTS:				"You can view your results at any time by clicking <a href='#results'>View Benefit Results</a> tab",
		
		BENEFITS_FINDER_LABEL:		"Reset All Answers",
		RESET_ANSWERS_CONFIRMATION:	"Are you sure you want to reset all your answers?",
		RESET_SINGLE_QUESTION_BUTTON:"Reset Answer(s)",
		RESET_ANSWERS_DIALOG_TITLE:	"Clear Answers",
		RESET_ANSWERS_CONFIRM_BUTTON: "Clear All Answers",
		CANCEL_BUTTON:				"Cancel",
		
		SESSION_TIMEOUT_MESSAGE:	"It appears that you have been inactive on Benefits.gov for 30 minutes. Your session will end in 10 minutes and you will be redirected to the homepage. If your session ends, any answers you have provided, your Benefits Results List and \"Your Favorites\" list will all be cleared. If you would like to continue your current session, please click \"Okay\"",
		SESSION_EXPIRATION_TITLE:	"Inactivity Alert",
		KEEP_SESSION_ALIVE:			"Okay",
		LOADING_TITLE:				"Please Wait Loading",
		analytics_default_event_action_label:	"Other",
		
		NUMERIC_ERROR_MSG:			"Only numeric characters are allowed. Example: 1234",
		INVALID_DATE_MSG:			"Invalid date entered, please use mm/dd/yyyy format.",
		DECIMAL_ERROR_MSG:			"Only decimal number characters values are allowed. Example: 2.34",
		CORE_IS_NOT_COMPLETED_TITLE:"Required Questions Not Completed",
		CORE_IS_NOT_COMPLETED_ERROR_MSG:"Please complete all required questions in Core section",
		benefit_finder:				"<a href='/benefits/benefit-finder'><img class='benefit-finder-logo-img' src='/static-dev/benefits/en/images/benefit-finder.png' alt='Benefit Finder' title='Benefit Finder' /></a>"
	};
	
	 
		// API Request Mapping
	var Requests = {
		HOME:						"/",
		START_SESSION : 			"/api/session/start",
		RESET_SESSION:				"/api/session/end",
		SESSION_ALIVE:				"/api/session/alive",
		// Benefit finder (questionnaire) tab requests
		GET_QUESTIONNAIRE: 			"/api/questionnaire/get",
		GET_NEXT_QUESTIONNAIRE:		"/api/questionnaire/next",
		GET_PREVIOUS_QUESTIONNAIRE:	"/api/questionnaire/previous",
		QUESTIONNAIRE_CATEGORIES: 	"/api/questionnaire/categories",
		SEND_ANSWER:		 		"/api/questionnaire/send",
		QUESTIONNAIRE_ANSWERS: 		"/api/questionnaire/answers",
		QUESTION_COUNT: 			"/api/questionnaire/count",
		// Benefits tab requests
		BENEFIT_RESULTS: 			"/api/benefits/results",
		GET_BENEFIT:				"/api/benefits/get",
		BENEFIT_COUNT:				"/api/benefits/count",
		// Favorites tab requests
		ADD_BENEFIT:				"/api/favorites/add",
		REMOVE_BENEFIT:				"/api/favorites/remove",
		GET_FAVORITES:				"/api/favorites/get",
		TOGGLE_FAVORITES_VIEW:		"/api/favorites/toggle"
	};
	// Question Group array
	var Categories = new Array();
	//Queue which store answers before they are submitted.
	var AnswerQueue = new Array();
	//This is a flag that does not allow multiple answers to be submitted at 
	//the same time, which would cause race condition in RulesEngine.
	var canSendAnswer = true;
	var nextDelegate = null; 
	// Allows data to be logged to the javascript console
	function debug(s){if(Constants.DEBUG)log(s)};
	function log(){
		if (window.console && window.console.log)
		window.console.log('[Questionnaire] ' + Array.prototype.join.call(arguments,' '));
	}
	// Questionnaire Plugin Code
	jQuery.fn.questionnaire = function(options) {
		Constants = jQuery.extend(Constants,	options);
		var settings = jQuery.extend(
					{
						id: this.selector.replace("#",''),
						tabs: {
							   "benefits":Constants.QUESTIONNAIRE_TAB,
							   "results": Constants.RESULTS_TAB,
							   "mybenefits": Constants.FAVORITES_TAB
								},
						tabTemplate: '<li class="mainTabs"><a href="#{href}">#{label}</a></li>', 
						bcWidth:155,
						self:this 
					},
					options);
		
		// ----------------------------------------------------------------
			// Start Plugin
		// ----------------------------------------------------------------
			$.init(settings);
		 	$('.ui-widget').css({'font-size':'12px'});
			$(this.selector).css({'margin':'50px auto 0 auto','width':"100%","float":"left",'padding':"0 15px"});
			$(document).sessionTimeout();
		
	}; // <----------------------jQuery Plugin ends here
	
	$.extend({
			 /*------------------------------------------------
			Private functions related to questionnaire plugin
			They are written as  jQuery Extension
			--------------------------------------------------*/
/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** UI View Creation Functions *******************
 * ****************** ******************* ****************** *******************
 ******************************************************************************/
			init : function(o){
				$.startSession();// this needs more work bc session might
				o.self.html('');
				$.addLocationListener(o);
				$.createQuestionnaireTabs(o);
				$.createQuestionnaireCategoryTabs(o);
				$.createBenefitCount(o);
				
			},
			
			/*------------------------------------------------
			Function builds main navigation tabs for application states
			--------------------------------------------------*/
			 createQuestionnaireTabs : function(o){
				var mtid = "mtid";
				var ll = document.createElement('input'); 
				ll.type = 'hidden';
				ll.id = 'loadLevel';
				ll.value = 0;
				o.self.append(Constants.benefit_finder+"<div id='"+mtid+"' ><ul class='mtabs'></ul></div>");
				o.self.append(ll);
				$("#"+mtid).tabs({
					tabTemplate: o.tabTemplate,
					// Select Function executed
					select: function(event, ui) {
						// hide the content to allow fadeIn to work correctly
						if($(ui.tab.hash+"-inner-page"))
							$(ui.tab.hash+"-inner-page").css({'display':'none'});
						else
						 $(ui.tab.hash).css({'display':'none'});
						 // Change URL
						$.locationHasChanged({'hash':ui.tab.hash});
					}	
				});	
				 // Create Each Tab based on options
				for(var hashKey in o.tabs){
		 			var cHash = '#'+hashKey;
					$("#"+mtid).tabs('add',cHash , o.tabs[hashKey]); 
	 			}
				$(".ui-tabs-panel").removeClass('ui-corner-bottom');
			 },
			 
			 /*------------------------------------------------
			Function builds sub navigation tabs for questionnaire categories
			--------------------------------------------------*/
			 createQuestionnaireCategoryTabs:function(o){
				$.API(Requests.QUESTIONNAIRE_CATEGORIES,{},
					function(data){
						$("#benefits").html('').css({'position':'relative','display':'none'});
						$("#benefits").append("<div id='cth'><ul  id='ctl'></ul></div>");
						$("#cth").tabs({
								tabTemplate: '<li><a href="#{href}"><div>#{label}</div></a></li>',
								// INITIAL View is set
								add: function(event, ui) {
									// $.updateQuestionnaireCategoryView(ui.tab.hash.replace("#",''));
								},
								// Select Function executed
								select: function(event, ui) {
									$(ui.tab.hash).css({'display':'none'});
									$.locationHasChanged({'qc':ui.tab.hash.replace('#','')});
								}
						});	
						data.categories.sort($.sortOrder);
						for(var cKey in data.categories){
							if(cKey.length){
								Categories.push("cat_"+ data.categories[cKey].id);
								debug('Adding Questionnaire Category Tab for:' + data.categories[cKey].name+
									 '  and ID:'+ data.categories[cKey].id);
								$("#cth").tabs('add',"#cat_"+ data.categories[cKey].id , data.categories[cKey].name); 
								$("#"+cKey).css({'width':'530px','float':'right','position':'relative'});
							}
						}
						$("#ctl").removeClass("ui-tabs-nav");// .css({'width':'200px','float':'left','position':'relative'});
						// $("#ctl li a
						// div").css({'width':'200px','height':'25px'});
						$("#ctl .ui-corner-top").removeClass("ui-corner-all ui-corner-top");
						$("#cth").tabs('select',0);
						$("#benefits").fadeIn(1000);
						$.updateCurrentView();
						if(data.ready)
							$.updateBenefitsCount(data);
					},true);
			 },
			  /*---------------------------------------------------------------------------
			 	 function create left side benefit counter
			 ------------------------------------------------------------------------------*/
			createBenefitCount: function(o){
				 $("#mtid").append("<div id='bcid'><div id='bcid-inner' class='ui-benefits-count-bg'></div></div>");
				 		
						$("#bcid-inner").append('<a href="#results"><div class="ui-benefit-total">'+Constants.BENEFITS_ELIGIBLE_FOR_LABEL+' <div id="bc-value"> 0 </div></div></a>').append('<div id="bcth"></div>');
						$("#bcid").addClass('ui-benefits-count').css({'display':'none'}); 
						
				// $.updateBenefitsCount(o);
	// $.updateBenefitsCountBoxHeight();
			 },
			 
			 updateBenefitsCountBoxHeight: function(id){
			/*	 // this needs to be updated per view/
				var h1 = 0;
				var h2 = $("#bcth").height()+60;
				var h = 0; 
				if(id){
					h1 = $(id).height();
				}else{
					h1 = $('#cth').height();
				}
				h = (h1>h2) ? h1:h2;
				var urlParams = $.getUrlVars();
				//if(urlParams['qc'] !=  'cat_'+Constants.DEFAULT_CATEGORY ){
					if(id && h1<h2) $(id).css({'height':h});
					else $('#cth').css({'height':h});
					$("#bcid").css({'height':h});
					$("#bcid-inner").css({'height':h});
				//}
				debug("Counter Box Height Was updated to: "+h);
				*/
			 },
			 /*
				 * =================================================================================
				 * Create next/previous buttons for any category.
				 * ===================================================================================
				 */
			 createPageNavigationButtons: function (pageNumber,container){
				 	var nextId = container.replace("#","")+"_nextButton";
					var previousId = container.replace("#","")+"_previousButton";
					
				 	var navHolder = document.createElement('div');
					$(container).append(navHolder);
					navHolder.className= 'ui-nav-buttons';
					
					$(navHolder).append("<button style='background-image:none;width:100px;' class='nextButton' id='"+nextId+"'>"+Constants.NEXT_BUTTON+"</button>");
					$("#"+nextId).click($.nextQuestionnaireCategoryView);
					var previous ="";
					if(pageNumber && pageNumber >0){
						$(navHolder).append("<button style='background-image:none;width:100px;' class='previousButton' id='"+previousId+"'>"+Constants.PREVIOUS_BUTTON+"</button>");
						$("#"+previousId).click($.previousQuestionnaireCategoryView);
						$("#"+previousId).button({icons: {primary: 'ui-icon-circle-triangle-w'}});
					}
					$("#"+nextId).button({icons: {secondary: 'ui-icon-circle-triangle-e'}});
			 },
			 /*-------------------------------------------------------
			 Function disables all interations with questionnaire 
			 utill all core questions are answered
			 -------------------------------------------------------*/
			 enableNavigation: function(data){
				
				if(data && data.ready == false){
					// Enable Main Questionnaire Tabs
					$("#mtid").tabs('select',0).tabs({ disabled: [1, 2] });
					// Disable Question Category Tabs
					var categories = new Array();
					for(var i =1; i < Categories.length;i++){
						categories.push(i);	
					}
					$("#cth").tabs('select',0).tabs({disabled:categories});
				}else if(data.ready == true){
					// Enable Main Questionnaire Tabs
					$("#mtid").tabs( "option", "disabled", false );
					$("#cth").tabs( "option", "disabled", false );
				}
			 },
/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** Action Functions which require user interation for
 * execution ******************* ****************** Function use $.API extetion
 * ******************* ****************** *******************
 ******************************************************************************/
				/*--------------------------------------------------
				Functions starts session for questionnaire based on provided 
				application id
			----------------------------------------------------*/
			startSession : function(callback) {
				$.API(Requests.START_SESSION, {
					'app_id' : Constants.APPLICATION_ID,
					'counterType' : Constants.INCREASING_COUNTER
				}, callback, false);
			},
			/*--------------------------------------------------
				Functions resets questionnaire session and wippes 
				all data assosiated with questionnaire
			----------------------------------------------------*/
			resetSession: function (){
				
				var modal = "<div id='reset_pop'><p>" +Constants.RESET_ANSWERS_CONFIRMATION+"</p></div>";
				
				var ok = Constants.RESET_ANSWERS_CONFIRM_BUTTON;
				var cancel = Constants.CANCEL_BUTTON
				var json = {};
				json[ok] =function() { $("#bcid").fadeOut(1000); 	
												$.API(Requests.RESET_SESSION, {},
												   function(data){
													$.updateCurrentView();
								   					//$.updateBenefitsCount();
												   },true);
												$(this).dialog('close');
											};
				json[cancel]=function() {$(this).dialog('close');}
				
				   $(modal).dialog({
								title:Constants.RESET_ANSWERS_DIALOG_TITLE,
								resizable: false,
								modal: true,
								buttons: json
							});
				
			},
			  /*------------------------------------------------
				Function is used to submit answers to Rules Engine
			 --------------------------------------------------*/
			onSubmitAnswer: function (){
				
				
				//setTimeout("alert('hello1')", 1000);
					var questionId = $(this).attr('name');
					var variableId = $(this).attr('id');
					var value = 	 $(this).val();
					var checked = 	 $(this).attr('checked');
					var type = 		$(this).attr('type');
					
					
					if(type == 'radio'){
						// IE 7 & 6 fixes
						$("input[name='"+questionId+"']:checked").attr('checked', '');
						$(this).attr('checked', 'checked');
						checked = 'true';
					}
			
					$.submitAnswer(questionId, variableId, value, checked, type);
					//Toggle clear button
					if($(this).parent().attr('class')=="ui-question-answer"){
						$.toogleClearQuestionAnswers($(this).parent().parent());
					}else if($(this).parent().parent().attr('class')=="ui-question-answer"){
						$.toogleClearQuestionAnswers($(this).parent().parent().parent());
					}
					
			},
			 /*-------------------------------------------------------
			 Function is used to submit select dropdown 
			 ---------------------------------------------------------*/
			submitAnswer: function (questionId, variableId, value, checked, type){
				
				variableId=variableId.replace('_y','' ).replace('_na','' ).replace('_n','' );
				questionId=questionId.replace('_name','' );
				var urlParams = $.getUrlVars();
				var evaluate = (urlParams['qc']=='cat_'+Constants.DEFAULT_CATEGORY)? false: true;
				
				var answerObject  = {'questionId':questionId,
						'variableId':variableId,
						'value': value?value:"", 
						'checked': checked,
						'type': type,
						'evaluate':evaluate};
				
				$.addAnswerToQueue(answerObject);
				if(canSendAnswer){
					//setTimeout("alert('hello0')", 1000);
					$.sendAnswerFromQueue();
					
				}	
				
			},
			/*--------------------------------------------------------
			 * Function adds an answer to the queue if previous answer has not 
			 * yet been recorded by the rules engine.
			 * -----------------------------------------------------------
			 */
			addAnswerToQueue: function(answer){
				
				AnswerQueue.push(answer);
			},
			/*----------------------------------------------------------
			 * Function send a next question from the queue to the servers
			 * 
			 * Late version should send entire queue at once.
			 *------------------------------------------------------------*/
			sendAnswerFromQueue: function(){
				if(AnswerQueue.length>0){
					canSendAnswer = false;
					var nextAnswer = AnswerQueue.pop();
					
					$.API(Requests.SEND_ANSWER, 
							nextAnswer,
							   function(data){
							
									if(data != null && data.success == "0"){
										var value = $("#"+data.variableId).val();
										$("#"+data.variableId).val(value.substring(0,value.length-1));
										$("#"+data.variableId).warn(data.message);
									}
									if(AnswerQueue.length > 0){
										
										$.sendAnswerFromQueue();
									}else{
										canSendAnswer = true;
										if(nextDelegate!=null){
											//Kick off nextCategoryQuestions
											nextDelegate();
											$.loadingEnded();
											nextDelegate = null;
										}else{
											$.updateBenefitsCount();
										}
									}
								},false);
				}
				
			},
			
			/*-------------------------------------------------------
				Function adds a benefit to Favorites list
			----------------------------------------------------------*/
			 addBenefit: function(){
				var id = $(this).attr('id');
				var benefitId = id.replace("add_","");
				var newId = id.replace("add_","remove_");
				if(id){
					$(this).parent().parent().toggleClass('ui-in-cart',100);
					$(this).attr('id',newId).html(Constants.REMOVE_BENEFIT_LABEL)
					.removeClass("ui-add-button").addClass('ui-remove-button')
					.unbind('click').click($.removeBenefit).blur();
					 $.API(Requests.ADD_BENEFIT, 
					   {'id': benefitId },
					   function(data){
						 
						},false);
				}
				return false;
			 },
			/*-------------------------------------------------------
				Function remove a benefit from Favorites list
			----------------------------------------------------------*/
			  removeBenefit: function(){
				  	var id =$(this).attr('id');
					var newId = id.replace("remove_","add_");
					var benefitId = id.replace("remove_","");
				if(id){
					$(this).parent().parent().toggleClass('ui-in-cart',100);
					$(this).attr('id',newId)
					.removeClass("ui-remove-button").addClass('ui-add-button')
					.html(Constants.ADD_BENEFIT_LABEL)
					.unbind('click').click($.addBenefit).blur();
					
					 $.API(Requests.REMOVE_BENEFIT, 
					   {'id': benefitId },
					   function(data){
						 
						},false);
				}
				return false;
			 },
			 	/*-------------------------------------------------------
				Function remove a benefit from Favorites list 
			----------------------------------------------------------*/
			  removeAndDeleteBenefit: function(){
				var id =$(this).attr('id');
				var benefitId = id.replace("favorites_remove_","");
				if(id){
					$(this).parent().parent().effect('explode');
					 $.API(Requests.REMOVE_BENEFIT, 
					   {'id': benefitId },
					   function(data){
						$.updateBenefitsCount();
						},false);
				}
				return false;
			 },
			 
			 /*-----------------------------------------------------------------
			 Function updates view type for favorites section
			 ------------------------------------------------------------------*/
			 toggleFavoritesView:function(){
				
				if($(this).attr('checked')==true){
				 $.API(Requests.TOGGLE_FAVORITES_VIEW, 
					   {},
					   function(data){
						   if(data.success == "1"){
						  	 	$.updateMyBenefitsView();
						   }
					},true);
				}
			 },
			 
			 openNextQuestionCategory: function(){
				  var urlParams = $.getUrlVars();
				 var currentCat = urlParams['qc'];
				var nextCat ="";
				 for(var i =0; i< Categories.length; i++){
					 if(currentCat==Categories[i]){
						 nextCat = Categories[++i];
						 break;
					 }
				 }
				if(nextCat && nextCat.length>0)
					 $("#cth").tabs('select',"#"+nextCat);
				else
					$("#mtid").tabs('select',"#results");
			 },
			 
/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** UI View Update Functions *******************
 * ****************** Function use $.API extetion *******************
 * ****************** *******************
 ******************************************************************************/
			  /*------------------------------------------------
				Function is used to keep track of application states and is used to change Views
			 --------------------------------------------------*/
			  updateCurrentView: function(o){
				 var urlParams = $.getUrlVars();
				 // Select main tab based on application state (hash value)
				 $("#mtid").tabs('select', urlParams['hash']);
				
				  switch(urlParams['hash']){
						case "#results":
							if(urlParams['bid']){
								debug("UPDATECURRENTVIEW> Application results change to benefit ["+ urlParams["bid"]+"]");
								//$("#results").fadeIn(0);	
								//$("#results-inner-page").fadeOut(0);
								$.updateSingleBenefitView(urlParams["bid"]);
							}else if(urlParams['answers']){
								$.updateAnswersView(o);
							}else{
								$.updateBenefitResultsView(urlParams['rc']);
							}
						break;	
						case "#mybenefits":
						  $.updateMyBenefitsView(o);
						break;
						case "#benefits":
						default:
							$("#benefits").fadeIn(500);
							$("#mtid").tabs('select',0);
							if(urlParams['qc'] && urlParams['qc'].length>0){
								// select appropriate question category based on
								// 'qc'
								$("#cth").tabs('select',"#"+urlParams['qc']);  
								// Load data into the view
								$.updateQuestionnaireCategoryView(urlParams['qc'].replace("cat_",""));
								debug("UPDATECURRENTVIEW> Application sub-view change to ["+ urlParams["qc"]+"]");
							}else{
								// NO category selected, select first one
								// $("#cth").tabs('select',0);
								// This tab ID cloud change to actual category
								// ID
							// $.updateQuestionnaireCategoryView("0");
						
								$.locationHasChanged({'hash':'#benefits','qc':'cat_'+Constants.DEFAULT_CATEGORY});
								
							}	
						break;
				  }
				debug("UPDATECURRENTVIEW> Application state change to ["+ urlParams['hash']+"]");
			 },
			 	 /*-----------------------------------------------------------------------------
			 Function updates answers view page
			 ------------------------------------------------------------------------------*/
			 updateAnswersView: function(o){
				 	$.API(Requests.QUESTIONNAIRE_ANSWERS,{},
					   function(data){
						   $.updateAnswersView_Callback(data);
						   debug('updateAnswersView> Callback function executed with data:'+ data);
						},true);
			 },
			 
			 
			 /*-----------------------------------------------------------------------------
			 Function updates results view page
			 ------------------------------------------------------------------------------*/
			 updateMyBenefitsView: function(o){
				
				 $.API(Requests.GET_FAVORITES,{},
					   function(data){
						   $.updateMyBenefitsView_Callback(data);	
						   debug('updateMyBenefitsView> Callback function executed with data:'+ data);
						},true);
			 },
			 
			 /*-----------------------------------------------------------------------------
			 Function updates results view page
			 ------------------------------------------------------------------------------*/
			 updateBenefitResultsView: function(categoryId){
				 if(!categoryId){
				 $.API(Requests.BENEFIT_RESULTS,{},
					   function(data){
						   $.updateBenefitResultsView_Callback(data);	
						   debug('updateBenefitResultsView> Callback function executed with data:'+ data);
						},true);
				 }else{
				 	 $.API(Requests.BENEFIT_RESULTS,{id:categoryId},
					   function(data){
						   $.updateBenefitCategoryResultsView_Callback(data);	
						   debug('updateBenefitResultsView> Callback function executed with data:'+ data);
						},true);
				 }
			 },
			 
			 /*-----------------------------------------------------------------------------
			 Function updates single benefit view page
			 ------------------------------------------------------------------------------*/
			 updateSingleBenefitView: function(o){
				 $.API(Requests.GET_BENEFIT,{id:o},
					   function(data){
						   $.updateSingleBenefitView_Callback(data);	
						   debug('updateSingleBenefitView> Callback function executed with data:'+ data);
						},true);
			 },
			 
			 
			 /*---------------------------------------------------------------------------
			 	 Function performs api call to retrive new benefit count and displays 
				 them in the left hand nav;
			 ------------------------------------------------------------------------------*/
			 updateBenefitsCount: function(o){
				 var urlParams = $.getUrlVars();
				var evaluate = (urlParams['qc']!='cat_'+Constants.DEFAULT_CATEGORY)? true: false;
				if(evaluate){
				 $.API(Requests.BENEFIT_COUNT,{},
					function(data){
						 debug('updateBenefitsCount> Callback function executed with data:'+ data);
						$.updateBenefitsCount_Callback(data);
					}, false);
				}
			 },
			 /***************************************************************
				 * Function loads the content of questionnaire tab based on
				 * category
				 * --------------------------------------------------------
				 */
			 updateQuestionnaireCategoryView: function (cat){
				 var catId = cat.replace("cat_",'');
				 debug('updateQuestionnaireCategoryView> Entered updateQuestionnaireCategoryView: ['+catId+']');
				
				 	$.API(Requests.GET_QUESTIONNAIRE,{'category':catId},
					  function(data){
						  debug('updateQuestionnaireCategoryView> Callback function executed with data:'+ data);
						    var catId = Categories[0].replace("cat_",'');
							if(data.category && catId == data.category.id){
								data.firstPage = true;	
							}
						  $.updateQuestionnaireCategoryView_Callback(data);	
					//	  $.updateBenefitsCountBoxHeight("#benefits");
					  },true); 
				 
			 },
			/*-------------------------------------------------------------------
				function returns next set of questions.
			---------------------------------------------------------------------*/		
			 nextQuestionnaireCategoryView: function (cat){
				 
				 
				 if(!canSendAnswer){
					nextDelegate = $.nextQuestionnaireCategoryView;
					$.loadingStarted(Constants.LOADING_MESSAGE_LABEL);
					return;
				 }
				 var urlParams = $.getUrlVars();
				 var catId = urlParams['qc'].replace("cat_",'');
				  debug('nextQuestionnaireCategoryView>');
				  $.API(Requests.GET_NEXT_QUESTIONNAIRE,{'category':catId},
					  function(data){
						  debug('updateQuestionnaireCategoryView_Callback> Callback function executed with data:'+ data);
						  data.next = true; 
						  if(!data.ready){
							  if(data.error){
								  $.previousQuestionnaireCategoryView();
							  }else{
								  if(data.unanswered && data.unanswered.length>0){
										$.highlightQuestions(data.unanswered);
									}
								  //$.updateCurrentView();
							  }
							  
						  	$("<div>"+Constants.CORE_IS_NOT_COMPLETED_ERROR_MSG+"</div>").dialog({
						  		modal:true,
						  		title:Constants.CORE_IS_NOT_COMPLETED_TITLE,
								buttons: {
								Ok: function() {
									$(this).dialog('close');
								}
						  		}});
							$('.ui-dialog').css('top','300px');	
						  }else{
						  		$.updateQuestionnaireCategoryView_Callback(data);														 
						  }
						  
					  },true); 
			 },
			previousQuestionnaireCategoryView: function (cat){
				 var urlParams = $.getUrlVars();
				 var catId = urlParams['qc'].replace("cat_",'');
				  debug('previousQuestionnaireCategoryView>');
				  $.API(Requests.GET_PREVIOUS_QUESTIONNAIRE,{'category':catId},
					  function(data){
						  debug('updateQuestionnaireCategoryView_Callback> Callback function executed with data:'+ data);
						  $.updateQuestionnaireCategoryView_Callback(data);														 
					  },true); 
			 },
		

/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** API Callback functions that update *******************
 * ****************** ******************* ****************** *******************
 ******************************************************************************/
			 /*-------------------------------------------------
			 Call back for Questionnaire information
			 --------------------------------------------------*/
			  updateAnswersView_Callback : function (data){
				 if(data.success == "1"){
						var cid = "#results-inner-page";
						$("#results").html('<div id="results-inner-page"></div>');
						$.buildPageHeader({
								  container:  	cid,
								  title: 		Constants.ANSWERS_TITLE,
								  helpText:    	Constants.ANSWERS_HELP_TEXT,
								  backButton:	1,
								  print: 1
								  });
						
						if(data.answers && data.answers.length>0){
							var div = document.createElement('div');
							$(cid).append(div);
							div.className = "ui-question-answer ui-accordion ui-widget ui-helper-reset";
							var answersByCategory = new Array();
							data.answers.sort($.sortOrder);
							for(var i in data.answers){
								var answer = data.answers[i];
								if(!answersByCategory[answer.questionGroupId])
									answersByCategory[answer.questionGroupId] = new Array();
								answersByCategory[answer.questionGroupId].push(answer);	
							}
							$.buildAnswerList({'answers':answersByCategory,'div':div});
							$(cid).fadeIn(1000);
							
							$('.ui-accordion .ui-accordion-header').click(function() {
								$(this).next().toggle('slow');
								$(this).find('span').toggleClass('ui-icon-circle-plus').toggleClass('ui-icon-circle-minus');
								return false;
							}).next().hide();
							$('.ui-accordion .first').next().show();
						}else{
						$(cid).append("<center class='ui-no-results'>"+Constants.NO_ANSWERS_AVAILABLE+"</center>");	
						}
				 }
	//				$.updateBenefitsCountBoxHeight("#results");
			 },
			
			
		 /*-------------------------------------------------
			 Call back for Questionnaire information
			 --------------------------------------------------*/
			  updateMyBenefitsView_Callback : function (data){
				if(data.success == "1"){
					var cid = "#mybenefits-inner-page";
					$('#mybenefits').html('<div id="'+cid.replace("#","")+'"></div>');
					$.buildMyBenefitList({'benefits':data.benefits,'container':cid, fullview:data.fullview});
				}
				$(cid).fadeIn(1000);
//				$.updateBenefitsCountBoxHeight("#mybenefits");
			 },
			 /*-------------------------------------------------
			 Call back for Questionnaire information
			 --------------------------------------------------*/
			  updateQuestionnaireCategoryView_Callback : function (data){
				  if(data.questions &&  data.count){
						var cid = '#cat_'+data.category.id;
						$(cid).html('').css({'display':'none'});
						$.buildPageHeader({
								  container:  '#cat_'+data.category.id,
								  title: 		data.category.title,
								  helpText: data.category.helpText,
								  firstPage: data.firstPage
							
								  });
						data.questions.sort($.sortOrder);
						for(var q in data.questions){
							$.buildSingleQuestion({'question':data.questions[q],'cid':cid});	
						}
						
						$.createPageNavigationButtons(data.pageNumber,cid);
						$(cid).fadeIn(1000);	
				  }else{
					  // No more questions available for this category
					  // go to the next category
					  if(data.next){
						  $.openNextQuestionCategory();
					  }else{
						   var urlParams = $.getUrlVars();
						   $("#"+urlParams['qc']).html("<center class='ui-no-results'>"+Constants.NO_QUESTIONS_AVAILABLE+"<br/>"+
													   Constants.GO_TO_RESULTS+"</center>");	
						   $("#"+urlParams['qc'] ).fadeIn(1000);	
					  }
				  }
				  $.updateBenefitsCount();	
			 },
			 updateSingleBenefitView_Callback: function (data){
				if(data.success == "1"){
					$("#results").html('<div id="results-inner-page"></div>');
					
					$.buildPageHeader({
								  container:  "#results-inner-page",
								  title: 		Constants.RESULTS_TITLE,
								  helpText: Constants.RESULTS_HELP_TEXT,
								  backButton : 1,
								  print: 1,
								  benefits: data.benefits
								  });
					$.buildSingleBenefit({'b':data.benefits, 'container': "#results-inner-page",'type':'result'});
					$('#qemailPOC').fancybox({
						'width'                    : 600,
						'height'                   : 520,
						'padding'                  : 0,
						'autoDimensions'     	   : true,
						'scrolling'     	       : 'no',
						'autoScale'                : false,
						'transitionIn'             : 'none',
						'transitionOut'            : 'fade',
						'overlayOpacity'		   : '0.2',
						'type'                     : 'iframe'
						});
					
					$(".benefit-full").css({'padding':"10px",'margin':"10px 0px"});
				}
				//	$("#results").fadeIn(1000);
	//				$.updateBenefitsCountBoxHeight("#results");
			 },
			 
			 /*----------------------------------------------------------------------
			  	function is executed when updateBenefitsCount request is returned
			 ------------------------------------------------------------------------*/
			 updateBenefitsCount_Callback : function (data){
				if(data.success == "1" && data.total >0){
					$("#bc-value").html(data.total);
					$("#bcth").html('');
					for(var t in data.benefits){
						
						var category = data.benefits[t];
						var line = $.buildBenefitCountLine(category);
						$("#bcth").append(line);
					}
					$("#bcid").fadeIn(1000); 
				}else{
					$("#bcid").fadeOut(1000); 	
				}
			 },
			 
			  /*----------------------------------------------------------------------
			  	Function is executed when updateBenefitResultsView request is returned
			 ------------------------------------------------------------------------*/
			 updateBenefitResultsView_Callback: function(data){
				 if(data.success == "1"){
					$("#results").html('<div id="results-inner-page"></div>');
					$.buildPageHeader({
								  container:  "#results-inner-page",
								  title: 		Constants.RESULTS_TITLE,
								  helpText: Constants.RESULTS_HELP_TEXT,
								  results: 1,
								  print:1,
								  benefits: data.benefits
								  });
					$.buildBenefitShortDescriptionList({
								container: "#results-inner-page",
								benefits: data.benefits
													 	});
					
						$("#results").fadeIn(1000);
						$.updateBenefitsCountBoxHeight("#results");
				 }
			 },
			   /*----------------------------------------------------------------------
			  	Function is executed when updateBenefitResultsView request is returned
			 ------------------------------------------------------------------------*/
			 updateBenefitCategoryResultsView_Callback: function(data){
				 if(data.success == "1"){
					$("#results").html('<div id="results-inner-page"></div>');
					var catTitle = (data.benefits.length>0)?data.benefits[0].category:Constants.RESULTS_TITLE;
					$.buildPageHeader({
								  container:  "#results-inner-page",
								  title: 		catTitle,
								  helpText: Constants.RESULTS_HELP_TEXT,
								  results: 1,
								   backButton : 1,
								  print:1
								  });
					$.buildBenefitShortDescriptionList({
								container: "#results-inner-page",
								benefits: data.benefits
								});
					
						$("#results").fadeIn(1000);
						$.updateBenefitsCountBoxHeight("#results");
				 }
			 },
			 
			 
/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** UI Helper functions to build HTML *******************
 * ****************** ******************* ****************** *******************
 ******************************************************************************/


			buildPageHeader: function(o){
				var urlParams = $.getUrlVars();
				var bids ="";
				if(o.benefits || o.print){
					$actionButtons = $('<div class="action-buttons"></div>');
					if(o.benefits){
						if(o.benefits.length>0){
							for(var i in o.benefits){
								
									var  b = o.benefits[i];
									if(bids!="")bids+="-";
									bids+=b.benefitId;
								
							}
						}else{
							bids=o.benefits.benefitId;	
						}
						var emailUrl = "/email/email-popup?title="+escape(o.title)+"&emailURL=/benefits/benefit-details/"+bids;
						$('.email-btn').click(function(e){
							e.preventDefault(); 
							window.location = emailUrl;
							
						});
					
						if(o.container.indexOf("mybenefit") != -1)
							$actionButtons.append('<a id="emailPOP" class="email-btn" href="'+emailUrl+'">'+Constants.benefits_email_page+'</a>');	
						else
							$actionButtons.append('<a id="emailFAV" class="email-btn" href="'+emailUrl+'">'+Constants.benefits_email_page+'</a>');	

						
					}
					
					if(o.print){
						$actionButtons.append('<a class="print-btn last-child" href="'+urlParams['hash']+'">'+Constants.benefits_print_page+'</a>');
					}
					$(o.container).append($actionButtons);
				}
				$('#emailPOP').fancybox({
						'width'                    : 600,
						'height'                   : 520,
						'padding'                  : 0,
						'autoDimensions'     	   : true,
						'scrolling'     	       : 'no',
						'autoScale'                : false,
						'transitionIn'             : 'none',
						'transitionOut'            : 'fade',
						'overlayOpacity'		   : '0.2',
						'type'                     : 'iframe'
						});
				$('#emailFAV').fancybox({
					'width'                    : 600,
					'height'                   : 520,
					'padding'                  : 0,
					'autoDimensions'     	   : true,
					'scrolling'     	       : 'no',
					'autoScale'                : false,
					'transitionIn'             : 'none',
					'transitionOut'            : 'fade',
					'overlayOpacity'		   : '0.2',
					'type'                     : 'iframe'
					});
					
				$(o.container).append('<h2>'+o.title+'</h2><br/>');
				// Display Review Answers Button Only for Results View;
				if(o.results){
					$(o.container).append("<div class='ui-button-review-answers'>"+Constants.REVIEW_ANSWERS_LABEL+"</div>");
					$('.ui-button-review-answers').click(function (){
									$.locationHasChanged({hash:'#results',answers:'true'});
					});
				}
				if(o.backButton){
					$(o.container).append('<button id="goBack">'+Constants.GO_BACK_LABEL+'</button><br/><br/>');
					$('#goBack').button({icons: {primary: 'ui-icon-arrowreturnthick-1-w'}}).click(function(){history.go(-1);});
				}
				$(o.container).append('<p><i>'+o.helpText+'</i></p>');
				
				$('.print-btn').click(function(){ window.print(); return false; });
			
				// Display Full/Short view toggle buttons ONLY for Favorites
				// section
				if(o.favorites){
					var short = (o.fullview)? "": ' checked="checked" '	;
					var full = (o.fullview)? ' checked="checked" ': ''	;
					
					$(o.container).append("<form style='height:30px;'><div id='viewToggle'><input type='radio' id='shortview' name='viewtoggle' "+short+" /><label for='shortview'>"+Constants.benefits_collapse_all+"</label><input type='radio' id='fullview'  name='viewtoggle' "+full+"/><label for='fullview'>"+Constants.benefits_expand_all+"</label></div></form>");
					$("#viewToggle").buttonset();
					$("#shortview").change($.toggleFavoritesView);
					$("#fullview").change($.toggleFavoritesView);
					
				}
				// Display Reset All Answers for First page on first question
				// tab
				if(o.firstPage){
					$(o.container).append("<button style='width:160px;' id='resetButton' >"+Constants.BENEFITS_FINDER_LABEL+"</button>");
					$("#resetButton").button({icons: {secondary: 'ui-icon-trash'}}).click($.resetSession);
				}
				
			},
			
			buildAnswerList: function (o){
				var div = o.div;
				var  first = 'first ';
				var active = " ui-state-active";
				var uiIcon =" ui-icon-circle-minus";
				for(var questionGroupId in o.answers){
					var  answers = o.answers[questionGroupId];
					$h3 = $('<h3></h3>').attr('class',first + "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"+active);
					first ="";
					$(div).append($h3);
					$edit = $("<span class='ui-icon-review-answers'><a href='#benefits&qc=cat_"+questionGroupId+"'>"+Constants.EDIT_ANSWERS_LABEL+"</a></span>");
					
					$h3.append("<span class='ui-icon "+uiIcon+"'></span><a href='#answers' style='padding-left:30px;' >"+answers[0].questionGroup+" ("+answers.length+")</a>");
					$h3.append($edit);
					uiIcon = " ui-icon-circle-plus";
					
					
					var d = document.createElement('div');
					d.className = "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom";
					for(a in answers){
						var alist = "";
						for(k in answers[a].answers){
							if(Constants[answers[a].answers[k]])
								alist += Constants[answers[a].answers[k]]+"<br>"	;
							else
								alist += answers[a].answers[k]+"<br>"	;
						}
						$(d).append("<div class='ui-qa-line'><strong style='float:left;'>Q:</strong><div class='ui-qa-q'>"+answers[a].question +"</div>"+
									"<div class='ui-qa-a'>" + alist+"</div><strong style='float:right;'>A:</strong></div>");
					}
					$(div).append(d);
					$edit.find(':first-child').click(function(){
						window.location = $(this).attr('href');
						//$.locationHasChanged({hash:"#benefits",qc:"cat_"+questionGroupId});
						//funciton (){
						//		if($(this).attr('href'))window.location  = $(this).attr('href');
						//}
					});
				}
			},
			/*--------------------------------------------------------------------------------------------
				Function builds a list of benefits view using buildSingleBenefit funciton
			--------------------------------------------------------------------------------------------*/
			buildMyBenefitList: function (o){
			
				$.buildPageHeader({
								  container: o.container,
								  title: 		Constants.FAVORITES_TITLE,
								  helpText: Constants.FAVORITES_HELP_TEXT,
								  favorites:1,
								  fullview: o.fullview,
								  print: 1,
								  benefits:o.benefits
								  });
				
				if(o.benefits && o.benefits.length >0){
					o.benefits.sort($.sortOrder);
					if(o.fullview){
						for(var i in o.benefits){
							var  b = o.benefits[i];
							$.buildSingleBenefit({'b':b,'container':o.container,'type':'mybenefits',favorites:1});
							$('#qemailPOC').fancybox({
								'width'                    : 600,
								'height'                   : 520,
								'padding'                  : 0,
								'autoDimensions'     	   : true,
								'scrolling'     	       : 'no',
								'autoScale'                : false,
								'transitionIn'             : 'none',
								'transitionOut'            : 'fade',
								'overlayOpacity'		   : '0.2',
								'type'                     : 'iframe'
								});
						}
					}else{
						$.buildBenefitShortDescriptionList({
							container: o.container,
							benefits: o.benefits,
							favorites:1
						});
					}
				}else{
					$(o.container).append("<center class='ui-no-results'>"+Constants.NO_FAVORITES_AVAILABLE+"</center>");	
				}
			},
			/*******************************************************************
			 * Function builds HTML representation of full benefit view
			 ******************************************************************/

			buildSingleBenefit :function (o){
				var b = o.b;
				var actions = "";
				var inCart =""
				var benefitList = new Array();
				benefitList.push(b.benefitId);
				var add_bid = "add_"+b.benefitId;
				var remove_bid ="remove_"+b.benefitId;
				
				var href ="";
				if(o.favorites){
					href = "#mybenefits";
					remove_bid ="favorites_"+remove_bid;
				}else{
					href = "#results&bid="+b.benefitId;
				}
				if(!window.location.host.match(/^es\./))
					actions+="<a title=\"Subscribe to Adoption Assistance e-mail updates\" alt=\"Subscribe to Adoption Assistance e-mail updates\" class=\"subscribe-btn\" href=\"javascript: subscribeLink("+b.benefitId+")\">"+Constants.benefits_subscribe_link+"</a>&nbsp;&nbsp;";
				if(b.inCart){
					inCart=" ui-in-cart";
					actions +="<a class='ui-remove-button'  href='"+href+
					"' id='"+remove_bid+"'>"+Constants.REMOVE_BENEFIT_LABEL+"</a>";
				}else{
					actions +="<a class='ui-add-button'  href='"+href+
					"' id='"+add_bid+"'>"+Constants.ADD_BENEFIT_LABEL+"</a>";
				}

				var parentOrgLabelString = ""+(b.parentOrgName?new String(b.parentOrgName):Constants.analytics_default_event_action_label);
				var parentFundingOrgLabelString = ""+(b.fundingOrgName?new String(b.fundingOrgName):Constants.analytics_default_event_action_label);
				var nameAttr = "<a name='"+parentFundingOrgLabelString+" || "+parentOrgLabelString+"'";
				var loanContent = (b.loan)?b.loan.replace(/<a /gi, nameAttr):null;
				var bName = b.benefitLabel.replace(/,/g, '');
				$(o.container).append("<div class='ui-benefit-full ui-corner-all ui-widget-content ui-widget "+inCart+"'>" + 
							"<div class='ui-benefit-action ui-corner-top'>"+actions+"</div>"+
							"<div class='ui-header'><h3>"+b.name+"</h3>"+
							"<div style='color: #8E8E79;'><strong>"+Constants.MANAGING_ORG_LABEL+"</strong><br/>"+b.orgName+
							"<br/><a href='"+b.orgURL+"' target='_blank' name='"+parentFundingOrgLabelString+" || "+parentOrgLabelString+"'>"+b.orgURL+"</a></div></div>"+
							$.buildBenefitDescriptionLine(Constants.DESCRIPTION_LABEL,(b.description?b.description.replace(/<a /gi, nameAttr):""))+
							$.buildBenefitDescriptionLine(Constants.GENERAL_REQUIREMENTS_LABEL,(b.criteria?b.criteria.replace(/<a /gi, nameAttr):""))+
							$.buildBenefitDescriptionLine(Constants.govbenefits_common_benefitReport_loanTerms,loanContent)+
							$.buildBenefitDescriptionLine(Constants.govbenefits_common_benefitReport_nextStepsHeader,Constants.govbenefits_common_benefitReport_nextStepsIntro)+
							$.buildBenefitDescriptionLine(Constants.NEXT_STEPS_LABEL,(b.nextSteps?b.nextSteps.replace(/<a /gi, nameAttr):""))+'<div class="next-steps-section">'+
							$.buildBenefitDescriptionLine(Constants.APPLICATION_PROCESS_LABEL,(b.applicationProcess?b.applicationProcess.replace(/<a /gi, nameAttr):""),Constants.govbenefits_common_benefitReport_appProcess)+
							$.buildBenefitPOCLine(Constants.POC_INFO_LABEL, b.contacts, b, nameAttr)+
							"</div></div>");
			
				$("#"+add_bid).click($.addBenefit);
				if(o.favorites){
				
					$("#"+remove_bid).click($.removeAndDeleteBenefit);
				}else{
					$("#"+remove_bid).click($.removeBenefit);
				}
				$.trackAnalytics(benefitList, parentOrgLabelString, parentFundingOrgLabelString, bName);
			},
			
			buildBenefitDescriptionLine: function (title, description, default_desc){
				var html = "";
				if(title && description != "DO_NOT_DISPLAY") {
					if(!description)
						description = default_desc;
					if(description)
						html += "<div class='ui-title'>"+title+"</div><div class='ui-full-description'>"+description+"</div>";
				}
				return html;
			},
			buildBenefitPOCLine: function (title, poc, benefit, name){
				var html = "<div class='ui-title'>"+title+"</div>";
				
				if(title && poc) {
					for(var i =0; i< poc.length; i++){
						var contact = poc[i];
						var notes = new String(contact.content.notes);
						notes = ""+notes.replace(/<a /gi, name);
						
						html+='<div class="benefit-detail-poc" style="padding-left:20px;">';
						html+="<span class=\"benefit-detail-poc-item\">"+notes+"</span>";
						if(contact.firstName || contact.prefix || contact.lastName){
							html+='<span class="benefit-detail-poc-item">'+
							(contact.prefix?new String(contact.prefix):"")+" "+
							(contact.firstName?new String(contact.firstName):"")+" "+
							(contact.lastName?new String(contact.lastName):"");
							//html+= (contact.suffix)?", "+contact.suffix:"";
							html +='</span>';
						}
						if(contact.addressLine1){
							if(contact.addressLine1)
							html +='<span class="benefit-detail-poc-item">'+new String(contact.addressLine1)+'</span>';
							if(contact.addressLine2)
							html +='<span class="benefit-detail-poc-item">'+new String(contact.addressLine2)+'</span>';
							
							html +='<span class="benefit-detail-poc-item">'+
							(contact.city?new String(contact.city):"");
							html += (contact.state)?','+new String(contact.state):''
							html += " "+(contact.zip?new String(contact.zip):"")+"</span>";
						}
						if(contact.phones && contact.phones.length>0){
							html += "<span class=\"benefit-detail-poc-item\">";
							for(var j=0; j <contact.phones.length; j++){
								var phoneItem = contact.phones[j];
								html+=new String(phoneItem.number);
								html+= (phoneItem.extension)? "x"+new String(phoneItem.extension) :"<br>";
							}
							html += "</span>";
						}
						
						if(contact.emails){
							for(var k=0; k < contact.emails.length; k++){
								var emailItem = contact.emails[k];
								if(emailItem){
									html +='<span class="benefit-detail-poc-item">';
										var formId = "email"+emailItem.address;
										var onclick = "/email/email-popup?title="+benefit.name+"&emailTo="+emailItem.address+"&backPOCUrl=/benefits/benefit-details/"+benefit.benefitId+"/";
										html +='<form id="'+formId+'" name="'+formId+'" action="" method="get" >';
								        html +=' <input type="hidden" name="title" value="'+benefit.name+'"/>';
								        html +=' <input type="hidden" name="emailTo" value="'+emailItem.address+'"/>';
								        html +=' <input type="hidden" name="backPOCUrl" value="/benefits/benefit-details/'+benefit.benefitId+'/"/>';
								        html +=' <a id="qemailPOC" href="'+onclick+'" >'+emailItem.address+'</a><br/>';
								        html +=' </form>';
									html += '</span>';
								}
							}
						}
						
						var parentOrgLabelString2 = ""+(benefit.parentOrgName?new String(benefit.parentOrgName):Constants.analytics_default_event_action_label);
						var parentFundingOrgLabelString2 = ""+(benefit.fundingOrgName?new String(benefit.fundingOrgName):Constants.analytics_default_event_action_label);
						if(contact.url)
						html+= "<span class='benefit-detail-poc-item'><a href='"+contact.url+"' name='"+parentFundingOrgLabelString2+" || "+parentOrgLabelString2+"'>"+contact.url+"</a></span>";
						html +='</div>';
						
					}
					
				}
				return html;
			},
			
			
			buildBenefitShortDescriptionList: function(o){
				if(o.benefits && o.benefits.length>0){
					o.benefits.sort($.sortOrder);
					var benefitList = new Array();
					for(var i in  o.benefits){
						var b =  o.benefits[i];
						var inCart = "";
						var actions = "";
						benefitList.push(b.benefitId);
						var add_bid = "add_"+b.benefitId;
						var remove_bid ="remove_"+b.benefitId;
						var href ="";
						if(o.favorites){
							href = "#mybenefits";
							remove_bid ="favorites_"+remove_bid;
						}else{
							href = "#results&bid="+b.benefitId;
						}
						
						if(b.inCart){
							inCart=" ui-in-cart";
							actions +="<a class='ui-remove-button'  href='"+href+
							"' id='"+remove_bid+"'>"+Constants.REMOVE_BENEFIT_LABEL+"</a>";
						}else{
							actions +="<a class='ui-add-button'  href='"+href+
							"' id='"+add_bid+"'>"+Constants.ADD_BENEFIT_LABEL+"</a>";
						}
						$(o.container)
						.append("<div class='ui-benefit-short ui-corner-all "+inCart+"'>" + 
						 "<a class='ui-title' href='#results&bid="+b.benefitId+"'>"+b.name+"</a>"+
						 "<div>"+b.description+"</div>"+
						 "<p class='ui-corner-bottom bottom'>"+
						 "<a href='#results&bid="+b.benefitId+"'>"+
						 Constants.READ_MORE_LABEL+
						 "</a>&nbsp;&nbsp;|&nbsp;&nbsp;"+
						 actions+
						 "</p>"+
						 "</div>");
						$("#"+add_bid).click($.addBenefit);
					
						if(o.favorites){
							$("#"+remove_bid).click($.removeAndDeleteBenefit);
						}else{
							$("#"+remove_bid).click($.removeBenefit);
						}
					}
					//$.trackAnalytics(benefitList, Constants.analytics_default_event_action_label, Constants.analytics_default_event_action_label, Constants.analytics_default_event_action_label);
				}else{
					$(o.container).append("<center  class='ui-no-results'>"+Constants.NO_RESULTS_AVALIABLE+"</center>")	;
				}
				
			},
			/*-------------------------------------------------
			 Function clears the benefit counter view and inserts update 
			 information that is passed in
			 --------------------------------------------------*/
			 buildBenefitCountLine: function(category){
				 // clear HTML inside the tab
						var div = document.createElement('div');
						div.className ="ui-benefit-category";
						$(div).append("<a href='#results&rc="+category.categoryId+"'>"+category.text+"</a>");
						$(div).append("<div>"+category.count+"</div>");
						return div;
				 
			 },
			 /*---------------------------------------------------
			 Generate HTML for each question and inserts it into 
			 the appropriate category question list
			 ----------------------------------------------------*/
			  buildSingleQuestion : function(o){
				
				var c = o.cid;
				var q = o.question;
				var qid =c+"_"+q.id;
				var cid = c.replace('#','');
				var helpId  = cid+'_qh_'+q.id;
				var helpContentId = cid+'_help_'+q.id;
				var helpIcon = (q.helpText && jQuery.trim(q.helpText).length>0)?'<span id="'+helpId+'" class="ui-icon-question-help"></span>':'';	
				
				$questionHolder = $('<div id="'+c.replace('#','')+'_'+q.id+'"></div>');
				$questionText = $('<div class="ui-question-text" id="qid_'+q.id+'"><span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">'+
						q.questionNumber+'</strong>&nbsp;&nbsp;&nbsp;'+q.question+'</span>'+helpIcon+'</span></div>');
				$(c).append($questionHolder.append($questionText));
				if(q.helpText && jQuery.trim(q.helpText).length>0){
					//$questionText.append('<span id="'+helpId+'" class="ui-icon-question-help"></span><br/>');
					$(qid).append('<div class="ui-question-help-content" id="'+helpContentId+
								  '" title="Question Help Text"><p>'+q.helpText+'</p><span class="ui-icon-help-close"></span></div> '); 		
					$("#"+helpContentId).hide().click(function(){$(this).toggle('slow');$('#'+helpId).toggle('slow');});;
					$('#'+helpId).click(function(ev){$("#"+helpContentId).toggle('slow');$('#'+helpId).toggle('slow');return false;});
					
				}
				$clear_q = $("<button class='ui-clear-question' >"+Constants.RESET_SINGLE_QUESTION_BUTTON+"</button>");
				
				$clear_q.button({text:true}).click(function(){
					
								$.clearFormInput($(this).parent());
								$.toogleClearQuestionAnswers($(this).parent());
					
				}).hide().css({'background-color':'#FFF','border':'none'}).removeClass('ui-corner-all');
				$(qid).append($clear_q);
				if( q.type == 'radio' && q.options.length > 10 ){
					q.type = 'dropdown';
					
				}
				q.options.sort($.sortOrder);
				var name = q.id +"_name";
				switch(q.type){
						case 'checkbox':
							var i =0;
						
							for(var key in q.options){
								var variable = q.options[i];
								$holder = $('<div/>').attr('class',"ui-question-answer");
								$input =	$("<input />").attr({
													name: name,
													id: variable.id,
													type :"checkbox",
													checked:(variable.value && variable.value== "Y"),
													value:variable.name
													}).click($.onSubmitAnswer);
								$holder.append($("<label></label>").attr('for',variable.id).append($input).append(variable.text));
								//$label = $("<label>"+variable.text+"</label>").attr('for',variable.id);
								//$holder.append($input).append($label);
								$(qid).append($holder);
								// IE fix for checkin or unckecking input after
								// append
								$input.attr('checked',(variable.value && variable.value == "Y"));
								i++;
							}
							
						break;
						case 'boolean':
							var variable =q.options[0];
							$holder = $('<div/>').attr('class',"ui-question-answer");
							$labelYes = $('<label>'+Constants.YES_LABEL+"</label>").attr('for',variable.id+"_y");
							$labelNo = $('<label>'+Constants.NO_LABEL+"</label>").attr('for',variable.id+"_n");
							$labelNA = $('<label>'+Constants.NO_ANSWER_LABEL+"</label>").attr('for',variable.id+"_na");
							$radioYES = $('<input/>').attr({
														   type:'radio',
														   id:variable.id+"_y",
														   name:name,
														   value:"1",
														   checked:(variable.value && variable.value == "Y")
														   });
							$radioNO = $('<input/>').attr({
														  type:'radio',
														  id:variable.id+"_n",
														  name:name,
														  value:"0",
														  checked:(variable.value && variable.value == "N")
														  });
							$radioNA = $('<input/>').attr({
														  type:'radio',
														  id:variable.id+"_na",
														  name:name,
														  value:"-1", 
														 checked:(!variable.value || variable.value == "")
														  });
						
							$holder.append($radioYES).append($labelYes).append($radioNO).append($labelNo);
						
							if(parseInt(q.questionGroupId) != parseInt(Constants.DEFAULT_CATEGORY)){
								$holder.append($radioNA).append($labelNA);
								
							}
							$(qid).append($holder);
							// IE fix for checkin or unckecking input after
							// append
							$radioYES.attr('checked',(variable.value && variable.value == "Y")).click($.onSubmitAnswer);
							$radioNO.attr('checked',(variable.value && variable.value == "N")).click($.onSubmitAnswer);
							
							$radioNA.click($.onSubmitAnswer);
							break;
						case 'radio':
							var i =0;
							
							for(var key in q.options){
								var variable = q.options[i];
								$holder = $('<div/>').attr('class',"ui-question-answer");
								$radio = $('<input/>').attr({
															type:'radio',
															name:name,
															id:variable.id,
															value:variable.name,
															checked:(variable.value && variable.value == "Y")
															}).click($.onSubmitAnswer);
								
								$label = $('<label></label>').attr('for',variable.id).css({'max-width':'450px'}).append($radio).append(variable.text);
								$holder.append($label);
								$(qid).append($holder);
								// IE Fix to reselect checkbox
								$radio.attr('checked',(variable.value && variable.value == "Y"));
								
								i++;
							}
						break;
						case 'dropdown':
							$holder = $('<div/>').attr('class',"ui-question-answer");
							var select = document.createElement( 'select');
							select.name = name;
							select.id = name;
							select.options[select.length] =	new Option("","",true);
								select.options[select.length-1].id="";
							for(var key in  q.options){
								var selected = false;
								if(q.options[key].value &&  q.options[key].value == "Y" || q.options[key].value== q.options[key].name){
									selected = true;	
								}
								select.options[select.length] = 
								new Option(q.options[key].text,q.options[key].name,selected,selected);
								select.options[select.length-1].id=q.options[key].id;
							}
						
							$(select).change(function (){
								$(this).children().each(function(i, selected){
									if($(selected).attr('selected')){
										$.submitAnswer($(this).parent().attr('id'),$(selected).attr('id'), $(selected).val(), true, 'dropdown');
										$.toogleClearQuestionAnswers($(this).parent().parent().parent());
										}
									
										});
								
							 });
							$holder.append( select);
							$(qid).append($holder);
						break;
						case 'text':
							var option = q.options[0];
							var holder = document.createElement('div');
							holder.className = "ui-question-answer";
							var inputBox = document.createElement('input');
							inputBox.name = name;
							inputBox.id = option.id;
							if(option.value)
								inputBox.value =option.value;
							$(holder).append( inputBox);
							$(qid).append(holder);
							switch(option.format){
								case 'INT':	
									$(inputBox).numeric({errorMsg:Constants.NUMERIC_ERROR_MSG});
									break;
								case 'FLT':
									$(inputBox).float({errorMsg: Constants.DECIMAL_ERROR_MSG});
									break;
								
							}
					//changed keyup  to change to fix digit cut off problem 12.12.2011
						$(inputBox).change($.onSubmitAnswer);
						break;
						case 'datefield':
							var option = q.options[0];
							$holder = $('<div/>').attr('class',"ui-question-answer");
							$inputBox = $('<input />').attr({name:name,value:option.value,id:option.id});
							$(qid).append($holder.append($inputBox));
							$inputBox.datepicker({yearRange:'1900:c,',changeMonth: true,changeYear: true,onSelect: $.onSubmitAnswer}).draggable();
							$inputBox.datefield();
							$inputBox.bind('blur',$.onSubmitAnswer);
						break;
						
					
				} 
				$(qid).addClass('ui-question');
				$.toogleClearQuestionAnswers(qid);
			 },
/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** Utility function that help Questionair plugin
 * ******************* ****************** ******************* ******************
 * *******************
 ******************************************************************************/
			 /*--------------------------------------------------------
			  * 
			  * Function clears all answers in the <input /> fields 
			  * 
			  --------------------------------------------------------*/
			 clearFormInput : function (ele){
				 $(ele).find(':input').each(function() {
					 var cleared = false;
				        switch(this.type) {
				            case 'password':
				            case 'select-multiple':
				            case 'select-one':
				            case 'text':
				            case 'textarea':
				            	if($(this).val()!=''){
					                $(this).val('');
					                cleared= true;
				        		}
				                break;
				            case 'checkbox':
				            case 'radio':
				            	if(this.checked){
					            	cleared = true;
					                this.checked = false;
				            	}
				            	break;
				        }
				        $(ele).find('select').children().each(function(i, selected){
							if($(selected).attr('selected') && $(selected).val()!=""){
								$.submitAnswer($(selected).parent().attr('id'), 
										$(selected).attr('id'), $(selected).val(), false, 'dropdown');
								$(selected).attr('selected',false);
							}
						});
				        if(cleared){
					        var questionId = $(this).attr('name');
							var variableId = $(this).attr('id');
							var value = 	 $(this).val();
							var checked = 	 $(this).attr('checked');
							var type = 		$(this).attr('type');
							$.submitAnswer(questionId, variableId, value, checked, type);
				        }
				    });
				 
			 },
			 isQuestionAnswered: function(elem){
				 var txtIn= $(elem).find('input[type="text"][value!=""]').length;
				 var checkIn =  $(elem).find('input:checked').length;
				 var selectIn = $(elem).find('select option:selected');
				 
				 return ( txtIn > 0 || checkIn > 0 || (selectIn.length > 0 && selectIn[0].value!=""));
			 },
			 /*--------------------------------------------------------
			  * Function toggle clear button for question answers
			  * 
			  --------------------------------------------------------*/
			toogleClearQuestionAnswers: function(elem){
				var visible = $(elem).find(':button').is(":visible");
				var answered = $.isQuestionAnswered(elem);
				if(answered && !visible){
					$(elem).find(':button').show('blind');
					$(elem).removeClass('ui-state-highlight');
				}else if(!answered && visible){
					$(elem).find(':button').hide('blind');
				}
			},
			 
			/*--------------------------------------------------------
			 Function takes two arguments and compares their 'order' values.
			 This function should be passed into Array.sort function 
			 ----------------------------------------------------------*/
			sortOrder: function (a, b){
				 if(parseInt(a.order) && parseInt(b.order))
					 return (parseInt(a.order) > parseInt(b.order))?1:(parseInt(a.order) < parseInt(b.order))?-1:0;
				 else
					 return (parseInt(a.sortOrder) > parseInt(b.sortOrder))?1:(parseInt(a.sortOrder) < parseInt(b.sortOrder))?-1:0;
			},
			/*--------------------------------------------------------
			 Function takes care of parsing URL after the hash
			 and returns an assosiative array with Key => Value  map
			 ----------------------------------------------------------*/
			 getUrlVars : function (){
				var vars = [], hash;
				var hashes = location.href.slice(location.href.indexOf('#')).split('&');
				for(var i = 1; i < hashes.length; i++)
				{
				  hash = hashes[i].split('=');
				  vars[hash[0]] = hash[1];
				}
				vars['hash'] =  hashes[0];
				return vars;
			 },
			 /*-------------------------------------------------------
			 Function uses getUrlVars to get a specific value using 
			 'name' as key
			 --------------------------------------------------------*/
			 getUrlVar : function (name){
				  return $.getUrlVars()[name];
			 },
			 	 /*------------------------------------------------
			  Loading process started icon is displayed 
			 -------------------------------------------------*/
			  loadingStarted : function(m){
				// Close previous loading icon
				if( $("#loadLevel").val() <= 0 ){
				//scroll to the top of the page
					$("body").css("overflow", "hidden");
					//$("#questionnaire").append('<center id="loading-icon"><img src="'+Constants.LOAD_IMG+'" alt="In Process" /><p>'+m+'</p></center>');
					
					$('<center id="loading-icon"><img src="'+Constants.LOAD_IMG+'" alt="In Process" /><p>'+m+'</p></center>').dialog(
							{	
								title:Constants.LOADING_TITLE,
								closeOnEscape: false,
								open: function(event, ui) {
									$(".ui-dialog-titlebar-close").hide(); 
								}
							});
					}
				$("#loadLevel").val(parseInt($("#loadLevel").val()) +1) ;
			 },
			 /*-------------------------------------------------
			 Loading process icon is removed
			 -------------------------------------------------:*/
			  loadingEnded : function (){
				if(parseInt($("#loadLevel").val()) <= 1 && $('#loading-icon').html()){
					$("body").css("overflow", "auto");

					$('#loading-icon').remove();
					$('html, body').animate({scrollTop: 0}, 500);	

				}
				$("#loadLevel").val(parseInt($("#loadLevel").val())-1);
			 },
			 
			  /*------------------------------------------------------
			 Function binds listener to a hashchange event 
			 and calls $.updateViews function when event is executed.
			 This function also adds an event listener for onbeforeunload
			 to monitor when user is leaving the webpage
			 ***********************NOTICE****************************
			 This function requeries jquery.bbq.js plugin to 
			 work correctly in IE6 & IE7 since they do not have 
			 'hashchange' event implemented
			 --------------------------------------------------------*/
			 addLocationListener: function(o){
				 
				$(window).bind('hashchange', function(e){
					debug("---=EVENT_HASHCHENGED=---");
					$.updateCurrentView();							  
				 });
				/*
				 * window.onbeforeunload = function (e) { var e = e ||
				 * window.event; var msg = "If you leave this page you will
				 * loose all the answers you have provided on qunestionnaire!"; //
				 * For IE and Firefox if (e) { e.returnValue =msg; } // For
				 * Safari return msg; };
				 * 
				 */
			 },
			 /*------------------------------------------------
				Function is used to keep track of application states and is used to change URL
			 --------------------------------------------------*/
			  locationHasChanged: function(o){
				var urlParams = $.getUrlVars(); 
				var newHash = "";
				
			   // Overwrite current state or open view
				for(var key in o){
					 if(key)
						urlParams[key] = o[key]; 
				} 
				// Make Sure BID/RC/RO are only present during results state
				 if(urlParams.hash != "#results"){
					urlParams.bid = "";
					urlParams.o ="";
					urlParams.rc="";
					urlParams.answers= "";
				 }
				for(var key in urlParams){
					switch(key){
						case 'hash':  
							newHash = urlParams['hash']+newHash;  
						 break;
						default:
						if(key.length>0 && urlParams[key].length>0)
							newHash += "&"+key+"="+urlParams[key];
						break;
					}
				}
				var oldHash = location.hash;
				location.hash = newHash;
				debug('Location has changed from: '+oldHash +" to: "+newHash);
			 },
			 highlightQuestions: function (data){
				 $(".ui-state-highlight").removeClass("ui-state-highlight");
				 for(var i=0; i<data.length;i++){
					 $("#qid_"+data[i]).parent().addClass('ui-state-highlight');
				 }
			 },
			 /********************************************************************
			  * Function is used to update Webtrands statistics 
			  ********************************************************************/
			 trackAnalytics: function (bids, parentOrgLabel, parentFundingOrgLabel, name){
				 	 var urlParams = $.getUrlVars();
					 var bidList = "";
					 for(i in bids){
						 if(bidList.length > 0 ){
							 bidList += ",";	 
						 }
						 bidList += bids[i];
					 }
					 
					 // add analytics tracking to Benefit Details page only
					 if(bids.length == 1 && urlParams['hash'] == '#results'){
						 // send benefits detail page view metrics to GA
						 var bidStr = ""+parentOrgLabel+' || '+name;
						 _gaq.push(['_trackEvent', 'Benefit Detail Page Views', parentFundingOrgLabel, bidStr]);
						 
					 }
		 },
			 
			 
/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** API functions that communicate with Benefits.gov
 * ******************* ****************** ******************* ******************
 * *******************
 ******************************************************************************/
			 /*-----------------------------------------------------------------
			 Function is responsible for all AJAX communications with Benefits.gov
			 Servers. Requests are sent through cache and can be retrieved from 
			 cache without going to the server while cache is valid. 
			 
			 Sample api request :
			 	$.API({'request': 'getQuestionnaireCategories'}, callbackFunction);
			 -------------------------------------------------------------------*/
			 API: function (request, json, callback, notify){
				if(notify)
					$.loadingStarted(Constants.LOADING_MESSAGE_LABEL); 

				debug('API> API request <'+request+'> was recieved ');
				debug("API> Cache lookup for KEY: "+ request);
				var cData = $.cache({"key":request});
				if(cData){
					debug("API> Cached object found!!!");
					if(typeof callback == 'function'){
							callback(cData);
							if(notify)
								$.loadingEnded();
					}
				}else{
					json.token = new Date().getTime(); 
					debug("API> Cache empty performning request: "+request);
					$.getJSON(request, json, function (data){
						debug("API> Data recieved: ");
						if(data){
							$.enableNavigation(data);
							// Cache returned object using URL as cache key if
							// it exists
							if(data.url)
								$.cache({"key":data.url,"value":data});		
							// execute call back function that was passed into
							// API function
							if(typeof callback == 'function'){
								callback(data);
							} 
						}
						if(notify)
							$.loadingEnded();
					});
					
				}
				
			 },
/*******************************************************************************
 * ****************** ******************* ****************** *******************
 * ****************** CACHE FUNCTION Dependent on $.jCache Plugin
 * ******************* ****************** ******************* ******************
 * *******************
 ******************************************************************************/
			 /*--------------------------------------------------------------------
			 Function is responsible for caching requests going to Benefits.gov servers
			 and also caching already build HTML. 
			 
			 Requests are cached using url as the cache key and are invalidated based on 
			 changes to the questionnaire answers.
			 
			 HTML is detached from DOM object and placed into cache with 
			 corresponding view name as the key. Views are invalidated based on 
			 questionnaire changes.
			 
			 If key is passed into the function, it returns a cached Object that 
			 corresponds to the key. If cache is empty it returns null, and API 
			 request should be executed and stored in the cache.
			 Performing cache look up request:
			 	$.cache({key:"?action=benefitCount", type:"request"});
 			 Performing cache fill in request:
				$.cahce({key:"?action?=benefitCount",value:[sampleObject], type:"request"});
			 
			 ----------------------------------------------------------------------*/
			 cache: function(o){
				 if(o.value && o.key){
					 debug("CACHE> Item with key ["+o.key+"] was stored!");
				 	 return $.jCache.setItem(o.key, o.value);
				 }else if(o.key){
					 debug("CACHE> Item with key ["+o.key+"] was accessed!");
					 return $.jCache.getItem(o.key);
				 }
				 
				 return null;
			 },
			 cachekey: function(request, data){
				 request+="?";
				 for(key in data){
				 	request+= "&"+key+"="+data[key];
				 }
				 return request;
			 }
			 
		 });  // <------------------------ End of jQuery Extention
	/*
	 * =========================================================================================
	 * Session expiration plug-in is extended on jQuery framework
	 * ============================================================================================
	 */
	$.fn.sessionTimeout = function(options) {
 	   var defaults = {
			inactivity: 1800000, // 30 Minutes
			noconfirm: 600000, // 10 Minutes
			sessionAlive: 300000, // 5 Minutes
			redirect_url: Requests.HOME,
			click_reset: true,
			alive_url: Requests.SESSION_ALIVE,
			logout_url: Requests.RESET_SESSION,
			message: Constants.SESSION_TIMEOUT_MESSAGE,
			title: Constants.SESSION_EXPIRATION_TITLE
		};
    // overwrite
    var opts = $.extend(defaults, options);
    var liveTimeout, confTimeout, sessionTimeout;
    var modal = "<div id='modal_pop'><p>" +opts.message+"</p></div>";
    // ##############################
    // ## Private Functions
    // ##############################
    var start_liveTimeout = function()
    {
      clearTimeout(liveTimeout);
      clearTimeout(confTimeout);
      liveTimeout = setTimeout(logout, opts.inactivity);
      
      if(opts.sessionAlive)
      {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(keep_session, opts.sessionAlive);
      }
    };
    
    var logout = function()
    {
      
     confTimeout = setTimeout(redirect, opts.noconfirm);
	
      $(modal).dialog({
	    buttons: {"Okay" :  function(){
          $(this).dialog('close');
          stay_logged_in();
        }},
        modal: true,
      	title:opts.title
	  });
      
    };
    
    var redirect = function()
    {
      if(opts.logout_url)
      {
        $.get(opts.logout_url);
      }
      window.location.href = opts.redirect_url;
    };
    
    var stay_logged_in = function(el)
    {
      start_liveTimeout();
      if(opts.alive_url)
      {
        $.get(opts.alive_url);
      }
    }
    
    var keep_session = function()
    {
      $.get(opts.alive_url);
      clearTimeout(sessionTimeout);
      sessionTimeout = setTimeout(keep_session, opts.sessionAlive);
    } 
    
    // ###############################
    // Build & Return the instance of the item as a plugin
    // This is basically your construct.
    // ###############################
    return this.each(function() {
      obj = $(this);
      start_liveTimeout();
      if(opts.click_reset)
      {
        $(document).bind('click', start_liveTimeout);
      }
      if(opts.sessionAlive)
      {
        keep_session();
      }
    }); 
 };
 /*---------------------------------------------------------------------
  * Client side answer validation
  * --------------------------------------------------------------------*/
 $.fn.alphanumeric = function(p,callback) { 

		p = $.extend({
			callback: null,
			ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.- ",
			nchars: "",
			allow: "",
			decimal: false,
			errorMsg:""
		  }, p);	

		return this.each
			(
				function() 
				{

					if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";
					
					s = p.allow.split('');
					for ( i=0;i<s.length;i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
					p.allow = s.join('|');
				
					var reg = new RegExp(p.allow,'gi');
					var ch = p.ichars + p.nchars;
					ch = ch.replace(reg,'');

					$(this).keypress
						(
							function (e)
								{
									var errorOccured = false;
									if (!e.charCode) k = String.fromCharCode(e.which);
										else k = String.fromCharCode(e.charCode);

									if(e.charCode != 0){ // Not a Delete key
										if (ch.indexOf(k) != -1 || e.ctrlKey&&k=='v' ){
											errorOccured = true;	
										}else if(p.decimal && ($(this).val()+k).replace(/\d*\.?\d*/,'') != ""){
											errorOccured = true;
										}
									}
									
									if(errorOccured){
										e.preventDefault();	
										$(this).warn(p.errorMsg);
										if( typeof p.callback == 'function')
														p.callback($(this));
									}	
								}
								
						);
						
					$(this).bind('contextmenu',function () {return false});
									
				}
			);

	};
	$.fn.datefield = function(){
		$(this).blur(
			function(e){
				var value = $(this).val() ;
				if(!value || value.length==0) return true;
				if(value && value.length>0 && /Invalid|NaN/.test(new Date(value))){
					$(this).val('');
					$(this).warn(Constants.INVALID_DATE_MSG);
				}else if (value && value.length>0 && !value.match(/^\d{2}\/\d{2}\/\d{4}$/)){
					$(this).val('');
					$(this).warn(Constants.INVALID_DATE_MSG);
				}else{
				    var arrayDate = value.split("/"); 
				    //create a lookup for months not equal to Feb.
				    var arrayLookup = { '01' : '31','03' : '31', 
				                        '04' : '30','05' : '31',
				                        '06' : '30','07' : '31',
				                        '08' : '31','09' : '30',
				                        '10' : '31','11' : '30','12' : '31'}
				    var intDay = parseInt(arrayDate[1],10); 
				    var intYear = parseInt(arrayDate[2],10); 
				    
				    //checks year and makes sure its after 1892 for rules engine validation
				    if(intYear<1892)
				    {
				    	$(this).val('');
				    	$(this).warn("Please enter a date after 01/01/1892");
				    }
				    	
				    if(arrayLookup[arrayDate[0]] != null) {
				        if(intDay <= arrayLookup[arrayDate[0]] && intDay != 0)
				          return true; //found in lookup table, good date
				    }
				    var intMonth = parseInt(arrayDate[0],10);
				    if (intMonth == 2) { 
				        var intYear = parseInt(arrayDate[2]);
				        if (intDay > 0 && intDay < 29) {
				            return true;
				        }
				        else if (intDay == 29) {
				          if ((intYear % 4 == 0) && (intYear % 100 != 0) || 
				              (intYear % 400 == 0)) {
				               // year div by 4 and ((not div by 100) or div by 400) ->ok
				              return true;
				          }   
				        }
				     }
				    $(this).val('');
					$(this).warn(Constants.INVALID_DATE_MSG);
				}
				
				
			}
			
	
		);
		$(this).bind('contextmenu',function () {return false});
	};
	$.fn.numeric = function(p) {
	
		var az = "abcdefghijklmnopqrstuvwxyz";
		az += az.toUpperCase();

		p = $.extend({
			nchars: az
		  }, p);	
		  	
		return this.each (function()
			{
				$(this).alphanumeric(p);
			}
		);
			
	};
	
	$.fn.alpha = function(p) {

		var nm = "1234567890";

		p = $.extend({
			nchars: nm
		  }, p);	

		return this.each (function()
			{
				$(this).alphanumeric(p);
			}
		);
			
	};
	
	$.fn.float = function(p) {

		var az = "abcdefghijklmnopqrstuvwxyz";
		az += az.toUpperCase();
		
		p = $.extend({
			nchars: az,
			allow:'.',
			decimal: true
		  }, p);	

		return this.each (function()
			{
				$(this).alphanumeric(p);
			}
		);
			
	};	
	
	$.fn.warn = function(msg){
		var id = "#"+$(this).attr('id')+"_error";
		if($(id).html()){
			$(id).show().delay(2000).fadeOut(500);
		}else{
			$(this).parent().parent().append('<div id="'+id.replace('#','')+'"  class="ui-state-error ui-corner-all"><p><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span><strong>Alert:&nbsp;&nbsp;</strong>'+msg+'</p></div>');
			$(id).delay(2000).fadeOut(500);
		}
		
	};
		
})(jQuery);



/*----------------------------------------
jCache
-------------------------------------------*/
(function(jQuery){this.version='(beta)(0.0.1)';this.maxSize=20;this.keys=new Array();this.cache_length=0;this.items=new Array();this.setItem=function(pKey,pValue)
{if(typeof(pValue)!='undefined')
{if(typeof(this.items[pKey])=='undefined')
{this.cache_length++;}
this.keys.push(pKey);this.items[pKey]=pValue;if(this.cache_length>this.maxSize)
{this.removeOldestItem();}}
return pValue;}
this.removeItem=function(pKey)
{var tmp;if(typeof(this.items[pKey])!='undefined')
{this.cache_length--;var tmp=this.items[pKey];delete this.items[pKey];}
return tmp;}
this.getItem=function(pKey)
{return this.items[pKey];}
this.hasItem=function(pKey)
{return typeof(this.items[pKey])!='undefined';}
this.removeOldestItem=function()
{this.removeItem(this.keys.shift());}
this.clear=function()
{var tmp=this.cache_length;this.keys=new Array();this.cache_length=0;this.items=new Array();return tmp;}
jQuery.jCache=this;return jQuery;})(jQuery);

/*
 *hashchange event
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
