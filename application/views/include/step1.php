<div id="benefits" class="ui-tabs-panel ui-widget-content" style="position: relative;">
	<div id="cth" class="ui-tabs ui-widget ui-widget-content ui-corner-all">
		<ul id="ctl" class="ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
			<li class="ui-state-default ui-tabs-selected ui-state-active">
				<a href="#cat_1">
					<div>
						Core
					</div>					
				</a>
			</li>
			<li class="ui-state-default">
				<a href="#cat_2">
					<div>
						General
					</div>					
				</a>
			</li>
			<li class="ui-state-default">
				<a href="#cat_3">
					<div>
						Household
					</div>					
				</a>
			</li>
			<li class="ui-state-default">
				<a href="#cat_4">
					<div>
						Education
					</div>					
				</a>
			</li>
			<li class="ui-state-default">
				<a href="#cat_5">
					<div>
						Health
					</div>					
				</a>
			</li>
			<li class="ui-state-default">
				<a href="#cat_6">
					<div>
						Income &amp; Assistance
					</div>					
				</a>
			</li>
			<li class="ui-state-default">
				<a href="#cat_7">
					<div>
						Work Experience
					</div>					
				</a>
			</li>
		</ul>
		<div id="cat_1" class="ui-tabs-panel ui-widget-content ui-corner-bottom" style="">
			<h2>
				Core Questions
			</h2><br>
			<p>
				<i>All of the questions in this section must be answered in order to obtain an initial list of benefit results and to move on to the next sections of the Benefit Finder. Providing additional information will further increase the accuracy of your results. When you are done with this section, click "Next." Please answer the questions as accurately as possible for the best results. After this section is complete, you may click the "View Benefit Results" tab at any time to see a listing of programs that you may be eligible to receive.</i>
			</p>
			
			<p>
				<img src="./assets/mygov-logo.png" alt="MyUSA Logo" style="display:block; margin-left: 150px;" />
				<?php if(empty($user)) : ?>
				You can use your MyUSA account to help you fill out this form and keep track of your benefits afterward. If you already have a MyUSA account, just log in to make Benefits.gov even better.
				<div style="font-size: 18px; text-align: center;"><a href="./login?origin=<?php echo current_url(); ?>">Login with MyUSA</a></div>
				<?php else: ?>
				Since you're logged in to your MyUSA account some of these fields may be filled in automatically. Those fields will by highlighted indicating they were filled in with MyUSA, but you can still edit them if needed.
				<?php endif; ?>	
			</p>
			
			<!--
			<button id="resetButton" style="width:160px;" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon" role="button" aria-disabled="false"><span class="ui-button-text">Clear All Your Answers</span></button> -->
			<div id="cat_1_2225" class="ui-question">
				<div id="qid_2225" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">1</strong>&nbsp;&nbsp;&nbsp;What type of benefits are you looking for?</span></span>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<label for="CDA"><input type="checkbox" name="2225_name" id="CDA" value="CDA">Career Development Assistance</label>
				</div>
				<div class="ui-question-answer">
					<label for="CHI"><input type="checkbox" name="2225_name" id="CHI" value="CHI">Child Care/Child Support</label>
				</div>
				<div class="ui-question-answer">
					<label for="COU"><input type="checkbox" name="2225_name" id="COU" value="COU">Counsel/Counseling</label>
				</div>
				<div class="ui-question-answer">
					<label for="DIA"><input type="checkbox" name="2225_name" id="DIA" value="DIA">Disability Assistance</label>
				</div>
				<div class="ui-question-answer">
					<label for="DIR"><input type="checkbox" name="2225_name" id="DIR" value="DIR">Disaster Relief</label>
				</div>
				<div class="ui-question-answer">
					<label for="EDU"><input type="checkbox" name="2225_name" id="EDU" value="EDU">Education/Training</label>
				</div>
				<div class="ui-question-answer">
					<label for="ENA"><input type="checkbox" name="2225_name" id="ENA" value="ENA">Energy Assistance</label>
				</div>
				<div class="ui-question-answer">
					<label for="ESC"><input type="checkbox" name="2225_name" id="ESC" value="ESC">Environmental Sustainability/Conservation</label>
				</div>
				<div class="ui-question-answer">
					<label for="FOO"><input type="checkbox" name="2225_name" id="FOO" value="FOO">Food/Nutrition</label>
				</div>
				<div class="ui-question-answer">
					<label for="GRA"><input type="checkbox" name="2225_name" id="GRA" value="GRA">Grants/Scholarships/Fellowships</label>
				</div>
				<div class="ui-question-answer">
					<label for="HEA"><input type="checkbox" name="2225_name" id="HEA" value="HEA">Healthcare</label>
				</div>
				<div class="ui-question-answer">
					<label for="HOU"><input type="checkbox" name="2225_name" id="HOU" value="HOU">Housing</label>
				</div>
				<div class="ui-question-answer">
					<label for="INS"><input type="checkbox" name="2225_name" id="INS" value="INS">Insurance</label>
				</div>
				<div class="ui-question-answer">
					<label for="LVA"><input type="checkbox" name="2225_name" id="LVA" value="LVA">Living Assistance</label>
				</div>
				<div class="ui-question-answer">
					<label for="LOA"><input type="checkbox" name="2225_name" id="LOA" value="LOA">Loan/Loan Repayment</label>
				</div>
				<div class="ui-question-answer">
					<label for="MED"><input type="checkbox" name="2225_name" id="MED" value="MED">Medicaid/Medicare</label>
				</div>
				<div class="ui-question-answer">
					<label for="SOC"><input type="checkbox" name="2225_name" id="SOC" value="SOC">Social Security</label>
				</div>
				<div class="ui-question-answer">
					<label for="TXA"><input type="checkbox" name="2225_name" id="TXA" value="TXA">Tax Assistance</label>
				</div>
				<div class="ui-question-answer">
					<label for="VAD"><input type="checkbox" name="2225_name" id="VAD" value="VAD">Veterans - Active Duty</label>
				</div>
				<div class="ui-question-answer">
					<label for="VOL"><input type="checkbox" name="2225_name" id="VOL" value="VOL">Volunteer Opportunities</label>
				</div>
				<div class="ui-question-answer">
					<label for="OTHER"><input type="checkbox" name="2225_name" id="OTHER" value="OTHER">Other</label>
				</div>
			</div>
			<div id="cat_1_1001" class="ui-question">
				<div id="qid_1001" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">2</strong>&nbsp;&nbsp;&nbsp;What is your date of birth? (Enter date in mm/dd/yyyy format.)</span><span class="ui-icon-question-help" id="cat_1_qh_1001"></span></span>

				<?php if (!empty($user['date_of_birth'])):?>	
				<div class="highlight-prefill">This field was pre-filled from your MyUSA Profile</div>
				<?php endif;?>
				</div>

				<div title="Question Help Text" id="cat_1_help_1001" class="ui-question-help-content" style="display: none;">
					<p>
						Enter your date of birth as a 2-digit month, a 2-digit day and a 4-digit year. For example, if you were born on July 5, 1935 enter 07/05/1935.
					</p>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<input name="1001_name" id="549" class="hasDatepicker ui-draggable" style="position: relative;" <?php if (!empty($user['date_of_birth'])) echo 'value="' . date('m/d/Y', strtotime($user['date_of_birth'])) . '"'; ?>>
				</div>
			</div>
			<div id="cat_1_2014" class="ui-question">
				<div id="qid_2014" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">3</strong>&nbsp;&nbsp;&nbsp;Where do you live?</span><span class="ui-icon-question-help" id="cat_1_qh_2014"></span></span>

					<?php if (!empty($user['state'])):?>	
					<div class="highlight-prefill">This field was pre-filled from your MyUSA Profile</div>
					<?php endif;?>
				</div>
				<div title="Question Help Text" id="cat_1_help_2014" class="ui-question-help-content" style="display: none;">
					<p>
						Only people who live in the U.S. or the Northern Mariana Islands can receive SSI. People who are not U.S. citizens may not be able to receive Social Security benefits unless they live in the U.S., the Northern Mariana Islands, Puerto Rico, Guam, American Samoa or the U.S. Virgin Islands. Choose the option that describes where you live. If you live somewhere other than the places listed, choose "Other".
					</p>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<label for="636" style="max-width: 450px;"><input type="radio" name="2014_name" id="636" value="LIVE_IN_US_STATE"  <?php if(!empty($user['state'])) echo 'checked="checked"' ?>>One of the 50 states or the District of Columbia</label>
				</div>
				<div class="ui-question-answer">
					<label for="637" style="max-width: 450px;"><input type="radio" name="2014_name" id="637" value="LIVE_IN_US_TERRITORY">Puerto Rico, Guam, American Samoa, the Northern Mariana Islands or the U.S. Virgin Islands</label>
				</div>
				<div class="ui-question-answer">
					<label for="638" style="max-width: 450px;"><input type="radio" name="2014_name" id="638" value="LIVE_IN_OTHER">Other</label>
				</div>
			</div>
			<div id="cat_1_1124" class="ui-question">
				<div id="qid_1124" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">4</strong>&nbsp;&nbsp;&nbsp;In which U.S. State do you live?</span><span class="ui-icon-question-help" id="cat_1_qh_1124"></span></span>
					<?php if (!empty($user['state'])):?>	
					<div class="highlight-prefill">This field was pre-filled from your MyUSA Profile</div>
					<?php endif;?>					
				</div>
				<div title="Question Help Text" id="cat_1_help_1124" class="ui-question-help-content" style="display: none;">
					<p>
						Choose the state where you live from the drop-down list.
					</p>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<select name="1124_name" id="1124_name">
						<option value="" selected id="">
							</option>
						<option value="STATE_RESIDENCE_NOT_APP" id="1079">
							Not applicable
						</option>
						<option value="STATE_OF_RESIDENCE_AL" id="265" <?php if(!empty($user['state']) && $user['state'] == 'AL') echo 'selected'?>>
							Alabama
						</option>
						<option value="STATE_OF_RESIDENCE_AK" id="264" <?php if(!empty($user['state']) && $user['state'] == 'AK') echo 'selected'?>>
							Alaska
						</option>
						<option value="STATE_OF_RESIDENCE_AZ" id="269" <?php if(!empty($user['state']) && $user['state'] == 'AZ') echo 'selected'?>>
							Arizona
						</option>
						<option value="STATE_OF_RESIDENCE_AR" id="267" <?php if(!empty($user['state']) && $user['state'] == 'AR') echo 'selected'?>>
							Arkansas
						</option>
						<option value="STATE_OF_RESIDENCE_CA" id="270" <?php if(!empty($user['state']) && $user['state'] == 'CA') echo 'selected'?>>
							California
						</option>
						<option value="STATE_OF_RESIDENCE_CO" id="272" <?php if(!empty($user['state']) && $user['state'] == 'CO') echo 'selected'?>>
							Colorado
						</option>
						<option value="STATE_OF_RESIDENCE_CT" id="273" <?php if(!empty($user['state']) && $user['state'] == 'CT') echo 'selected'?>>
							Connecticut
						</option>
						<option value="STATE_OF_RESIDENCE_DE" id="275" <?php if(!empty($user['state']) && $user['state'] == 'DE') echo 'selected'?>>
							Delaware
						</option>
						<option value="STATE_OF_RESIDENCE_DC" id="274" <?php if(!empty($user['state']) && $user['state'] == 'DC') echo 'selected'?>>
							District of Columbia
						</option>
						<option value="STATE_OF_RESIDENCE_FL" id="276" <?php if(!empty($user['state']) && $user['state'] == 'FL') echo 'selected'?>>
							Florida
						</option>
						<option value="STATE_OF_RESIDENCE_GA" id="277" <?php if(!empty($user['state']) && $user['state'] == 'GA') echo 'selected'?>>
							Georgia
						</option>
						<option value="STATE_OF_RESIDENCE_HI" id="280" <?php if(!empty($user['state']) && $user['state'] == 'HI') echo 'selected'?>>
							Hawaii
						</option>
						<option value="STATE_OF_RESIDENCE_ID" id="282" <?php if(!empty($user['state']) && $user['state'] == 'ID') echo 'selected'?>>
							Idaho
						</option>
						<option value="STATE_OF_RESIDENCE_IL" id="283" <?php if(!empty($user['state']) && $user['state'] == 'IL') echo 'selected'?>>
							Illinois
						</option>
						<option value="STATE_OF_RESIDENCE_IN" id="284" <?php if(!empty($user['state']) && $user['state'] == 'IN') echo 'selected'?>>
							Indiana
						</option>
						<option value="STATE_OF_RESIDENCE_IA" id="281" <?php if(!empty($user['state']) && $user['state'] == 'IA') echo 'selected'?>>
							Iowa
						</option>
						<option value="STATE_OF_RESIDENCE_KS" id="285" <?php if(!empty($user['state']) && $user['state'] == 'KS') echo 'selected'?>>
							Kansas
						</option>
						<option value="STATE_OF_RESIDENCE_KY" id="286" <?php if(!empty($user['state']) && $user['state'] == 'KY') echo 'selected'?>>
							Kentucky
						</option>
						<option value="STATE_OF_RESIDENCE_LA" id="287" <?php if(!empty($user['state']) && $user['state'] == 'LA') echo 'selected'?>>
							Louisiana
						</option>
						<option value="STATE_OF_RESIDENCE_ME" id="292" <?php if(!empty($user['state']) && $user['state'] == 'ME') echo 'selected'?>>
							Maine
						</option>
						<option value="STATE_OF_RESIDENCE_MD" id="291" <?php if(!empty($user['state']) && $user['state'] == 'MD') echo 'selected'?>>
							Maryland
						</option>
						<option value="STATE_OF_RESIDENCE_MA" id="288" <?php if(!empty($user['state']) && $user['state'] == 'MA') echo 'selected'?>>
							Massachusetts
						</option>
						<option value="STATE_OF_RESIDENCE_MI" id="293" <?php if(!empty($user['state']) && $user['state'] == 'MI') echo 'selected'?>>
							Michigan
						</option>
						<option value="STATE_OF_RESIDENCE_MN" id="295" <?php if(!empty($user['state']) && $user['state'] == 'MN') echo 'selected'?>>
							Minnesota
						</option>
						<option value="STATE_OF_RESIDENCE_MS" id="297" <?php if(!empty($user['state']) && $user['state'] == 'MS') echo 'selected'?>>
							Mississippi
						</option>
						<option value="STATE_OF_RESIDENCE_MO" id="296" <?php if(!empty($user['state']) && $user['state'] == 'MO') echo 'selected'?>>
							Missouri
						</option>
						<option value="STATE_OF_RESIDENCE_MT" id="298" <?php if(!empty($user['state']) && $user['state'] == 'MT') echo 'selected'?>>
							Montana
						</option>
						<option value="STATE_OF_RESIDENCE_NE" id="301" <?php if(!empty($user['state']) && $user['state'] == 'NE') echo 'selected'?>>
							Nebraska
						</option>
						<option value="STATE_OF_RESIDENCE_NV" id="305" <?php if(!empty($user['state']) && $user['state'] == 'NV') echo 'selected'?>>
							Nevada
						</option>
						<option value="STATE_OF_RESIDENCE_NH" id="302" <?php if(!empty($user['state']) && $user['state'] == 'NH') echo 'selected'?>>
							New Hampshire
						</option>
						<option value="STATE_OF_RESIDENCE_NJ" id="303" <?php if(!empty($user['state']) && $user['state'] == 'NJ') echo 'selected'?>>
							New Jersey
						</option>
						<option value="STATE_OF_RESIDENCE_NM" id="304" <?php if(!empty($user['state']) && $user['state'] == 'NM') echo 'selected'?>>
							New Mexico
						</option>
						<option value="STATE_OF_RESIDENCE_NY" id="306" <?php if(!empty($user['state']) && $user['state'] == 'NY') echo 'selected'?>>
							New York
						</option>
						<option value="STATE_OF_RESIDENCE_NC" id="299" <?php if(!empty($user['state']) && $user['state'] == 'NC') echo 'selected'?>>
							North Carolina
						</option>
						<option value="STATE_OF_RESIDENCE_ND" id="300" <?php if(!empty($user['state']) && $user['state'] == 'ND') echo 'selected'?>>
							North Dakota
						</option>
						<option value="STATE_OF_RESIDENCE_OH" id="307" <?php if(!empty($user['state']) && $user['state'] == 'OH') echo 'selected'?>>
							Ohio
						</option>
						<option value="STATE_OF_RESIDENCE_OK" id="308" <?php if(!empty($user['state']) && $user['state'] == 'OK') echo 'selected'?>>
							Oklahoma
						</option>
						<option value="STATE_OF_RESIDENCE_OR" id="309" <?php if(!empty($user['state']) && $user['state'] == 'OR') echo 'selected'?>>
							Oregon
						</option>
						<option value="STATE_OF_RESIDENCE_PA" id="310" <?php if(!empty($user['state']) && $user['state'] == 'PA') echo 'selected'?>>
							Pennsylvania
						</option>
						<option value="STATE_OF_RESIDENCE_RI" id="313" <?php if(!empty($user['state']) && $user['state'] == 'RI') echo 'selected'?>>
							Rhode Island
						</option>
						<option value="STATE_OF_RESIDENCE_SC" id="314" <?php if(!empty($user['state']) && $user['state'] == 'SC') echo 'selected'?>>
							South Carolina
						</option>
						<option value="STATE_OF_RESIDENCE_SD" id="315" <?php if(!empty($user['state']) && $user['state'] == 'SD') echo 'selected'?>>
							South Dakota
						</option>
						<option value="STATE_OF_RESIDENCE_TN" id="316" <?php if(!empty($user['state']) && $user['state'] == 'TN') echo 'selected'?>>
							Tennessee
						</option>
						<option value="STATE_OF_RESIDENCE_TX" id="317" <?php if(!empty($user['state']) && $user['state'] == 'TX') echo 'selected'?>>
							Texas
						</option>
						<option value="STATE_OF_RESIDENCE_UT" id="318" <?php if(!empty($user['state']) && $user['state'] == 'UT') echo 'selected'?>>
							Utah
						</option>
						<option value="STATE_OF_RESIDENCE_VT" id="321" <?php if(!empty($user['state']) && $user['state'] == 'VT') echo 'selected'?>>
							Vermont
						</option>
						<option value="STATE_OF_RESIDENCE_VA" id="319" <?php if(!empty($user['state']) && $user['state'] == 'VA') echo 'selected'?>>
							Virginia
						</option>
						<option value="STATE_OF_RESIDENCE_WA" id="322" <?php if(!empty($user['state']) && $user['state'] == 'WA') echo 'selected'?>>
							Washington
						</option>
						<option value="STATE_OF_RESIDENCE_WV" id="324" <?php if(!empty($user['state']) && $user['state'] == 'AL') echo 'selected'?>>
							West Virginia
						</option>
						<option value="STATE_OF_RESIDENCE_WI" id="323" <?php if(!empty($user['state']) && $user['state'] == 'WI') echo 'selected'?>>
							Wisconsin
						</option>
						<option value="STATE_OF_RESIDENCE_WY" id="325" <?php if(!empty($user['state']) && $user['state'] == 'WY') echo 'selected'?>>
							Wyoming
						</option>
					</select>
				</div>
			</div>
			<div id="cat_1_1012" class="ui-question">
				<div id="qid_1012" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">5</strong>&nbsp;&nbsp;&nbsp;Choose the option that best describes your citizenship status:</span><span class="ui-icon-question-help" id="cat_1_qh_1012"></span></span>
				</div>
				<div title="Question Help Text" id="cat_1_help_1012" class="ui-question-help-content" style="display: none;">
					<p>
						Some benefits are only available to U.S. citizens or certain non-citizens who have been lawfully admitted to the U.S.
					</p>
					<p>
						Choose the option that describes your U.S. citizenship or non-citizen status.
					</p>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<label for="66" style="max-width: 450px;"><input type="radio" name="1012_name" id="66" value="CITIZENSHIP_STATUS_US">U.S. Citizen</label>
				</div>
				<div class="ui-question-answer">
					<label for="67" style="max-width: 450px;"><input type="radio" name="1012_name" id="67" value="CITIZENSHIP_STATUS_US_NATIONAL">U.S. National</label>
				</div>
				<div class="ui-question-answer">
					<label for="822" style="max-width: 450px;"><input type="radio" name="1012_name" id="822" value="CITIZENSHIP_STATUS_NON_CITIZEN_LEGAL">Non-Citizen legally admitted to the U.S</label>
				</div>
				<div class="ui-question-answer">
					<label for="823" style="max-width: 450px;"><input type="radio" name="1012_name" id="823" value="CITIZENSHIP_STATUS_AMERICAN_INDIAN">American Indian</label>
				</div>
				<div class="ui-question-answer">
					<label for="64" style="max-width: 450px;"><input type="radio" name="1012_name" id="64" value="CITIZENSHIP_STATUS_OTHER">Other</label>
				</div>
			</div>
			<div id="cat_1_1006" class="ui-question">
				<div id="qid_1006" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">6</strong>&nbsp;&nbsp;&nbsp;What is your current employment status?</span></span>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<label for="41" style="max-width: 450px;"><input type="radio" name="1006_name" id="41" value="EMPLOYMENT_STATUS_FULL_TIME">Employed (full-time)</label>
				</div>
				<div class="ui-question-answer">
					<label for="42" style="max-width: 450px;"><input type="radio" name="1006_name" id="42" value="EMPLOYMENT_STATUS_PART_TIME">Employed (part-time or seasonal)</label>
				</div>
				<div class="ui-question-answer">
					<label for="43" style="max-width: 450px;"><input type="radio" name="1006_name" id="43" value="EMPLOYMENT_STATUS_UNDER_EMPLOYED">Under-employed (working for very low wages)</label>
				</div>
				<div class="ui-question-answer">
					<label for="44" style="max-width: 450px;"><input type="radio" name="1006_name" id="44" value="EMPLOYMENT_STATUS_UNEMPLOYED_OR_JUST_ABOUT">Unemployed or about to become unemployed</label>
				</div>
			</div>
			<div id="cat_1_1016" class="ui-question">
				<div id="qid_1016" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">7</strong>&nbsp;&nbsp;&nbsp;How many people live in your household? <i>Example: 5</i></span></span>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<input name="1016_name" id="562">
				</div>
			</div>
			<div id="cat_1_1017" class="ui-question">
				<div id="qid_1017" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">8</strong>&nbsp;&nbsp;&nbsp;What is your household's annual income before taxes? <i>Example: 25000</i></span></span>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<input name="1017_name" id="551">
				</div>
			</div>
			<div id="cat_1_2021" class="ui-question">
				<div id="qid_2021" class="ui-question-text">
					<span style="float:left;line-height:25px;"><span style="float:left;"><strong style="float:left;line-height:25px;">9</strong>&nbsp;&nbsp;&nbsp;Are you currently married?</span><span class="ui-icon-question-help" id="cat_1_qh_2021"></span></span>
					<?php if (!empty($user['marital_status']) && $user['marital_status'] !== 'domestic_partnership'):?>	
					<div class="highlight-prefill">This field was pre-filled from your MyUSA Profile</div>
					<?php endif;?>					
				</div>
				<div title="Question Help Text" id="cat_1_help_2021" class="ui-question-help-content" style="display: none;">
					<p>
						If you are married, you may be entitled for benefits based on your spouse's work. On the other hand, if you are eligible for Social Security retirement or disability benefits, your spouse also may be eligible. Your marital status also will help us determine if you could get certain Social Security survivor's benefits.
					</p>
					<p>
						If you are currently married, choose the "Yes" option; otherwise, choose the "No" option.
					</p>
				</div><button class="ui-clear-question ui-button ui-widget ui-state-default ui-button-text-only" role="button" aria-disabled="false" style="display: block; background-color: rgb(255, 255, 255); border: medium none;"><span class="ui-button-text">Reset Answer(s)</span></button>
				<div class="ui-question-answer">
					<input type="radio" id="763_y" name="2021_name" value="1" <?php if(!empty($user['marital_status']) && $user['marital_status'] == 'married') echo 'checked="checked"'?>><label for="763_y">Yes</label><input type="radio" id="763_n" name="2021_name" value="0" <?php if(!empty($user['marital_status']) && $user['marital_status'] !== 'married' &&  $user['marital_status'] !== 'domestic_partnership') echo 'checked="checked"'?>><label for="763_n">No</label>
				</div>
			</div>
			<div class="ui-nav-buttons">
				<button id="cat_1_nextButton" class="nextButton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon" style="background-image:none;width:100px;" role="button" aria-disabled="false" onclick="window.location.href = './benefits/benefit-finder/step2'"><span class="ui-button-text">Next</span></button>
			</div>
		</div>
		<div id="cat_2" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"></div>
		<div id="cat_3" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"></div>
		<div id="cat_4" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"></div>
		<div id="cat_5" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"></div>
		<div id="cat_6" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"></div>
		<div id="cat_7" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"></div>
	</div>
</div>
<div id="results" class="ui-tabs-panel ui-widget-content ui-tabs-hide"></div>
<div id="mybenefits" class="ui-tabs-panel ui-widget-content ui-tabs-hide"></div>
<div id="bcid" class="ui-benefits-count" style="display: none;">
	<div class="ui-benefits-count-bg" id="bcid-inner">
		<a href="#results"></a>
		<div class="ui-benefit-total">
			Benefits You May be Eligible For:
			<div id="bc-value">
				0
			</div>
		</div>
		<div id="bcth"></div>
	</div>
</div>
<input type="hidden" id="loadLevel" value="0">

