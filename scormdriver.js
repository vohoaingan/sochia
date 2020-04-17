/* Copyright � 2003-2011 Rustici Software, LLC  All Rights Reserved. www.scorm.com - See LICENSE.txt for usage restrictions */
var VERSION="3.9.5";var PREFERENCE_DEFAULT=0;var PREFERENCE_OFF=-1;var PREFERENCE_ON=1;var LESSON_STATUS_PASSED=1;var LESSON_STATUS_COMPLETED=2;var LESSON_STATUS_FAILED=3;var LESSON_STATUS_INCOMPLETE=4;var LESSON_STATUS_BROWSED=5;var LESSON_STATUS_NOT_ATTEMPTED=6;var ENTRY_REVIEW=1;var ENTRY_FIRST_TIME=2;var ENTRY_RESUME=3;var MODE_NORMAL=1;var MODE_BROWSE=2;var MODE_REVIEW=3;var MAX_CMI_TIME=36002439990;var NO_ERROR=0;var ERROR_LMS=1;var ERROR_INVALID_PREFERENCE=2;var ERROR_INVALID_NUMBER=3;var ERROR_INVALID_ID=4;var ERROR_INVALID_STATUS=5;var ERROR_INVALID_RESPONSE=6;var ERROR_NOT_LOADED=7;var ERROR_INVALID_INTERACTION_RESPONSE=8;var EXIT_TYPE_SUSPEND="SUSPEND";var EXIT_TYPE_FINISH="FINISH";var EXIT_TYPE_TIMEOUT="TIMEOUT";var EXIT_TYPE_UNLOAD="UNLOAD";var INTERACTION_RESULT_CORRECT="CORRECT";var INTERACTION_RESULT_WRONG="WRONG";var INTERACTION_RESULT_UNANTICIPATED="UNANTICIPATED";var INTERACTION_RESULT_NEUTRAL="NEUTRAL";var INTERACTION_TYPE_TRUE_FALSE="true-false";var INTERACTION_TYPE_CHOICE="choice";var INTERACTION_TYPE_FILL_IN="fill-in";var INTERACTION_TYPE_LONG_FILL_IN="long-fill-in";var INTERACTION_TYPE_MATCHING="matching";var INTERACTION_TYPE_PERFORMANCE="performance";var INTERACTION_TYPE_SEQUENCING="sequencing";var INTERACTION_TYPE_LIKERT="likert";var INTERACTION_TYPE_NUMERIC="numeric";var DATA_CHUNK_PAIR_SEPARATOR='###';var DATA_CHUNK_VALUE_SEPARATOR='$$';var APPID="";var blnDebug=true;var strLMSStandard="SCORM2004";var DEFAULT_EXIT_TYPE=EXIT_TYPE_SUSPEND;var AICC_LESSON_ID="1";var EXIT_BEHAVIOR="SCORM_RECOMMENDED";var EXIT_TARGET="goodbye.html";var LMS_SPECIFIED_REDIRECT_EVAL_STATEMENT="";var AICC_COMM_DISABLE_XMLHTTP=false;var AICC_COMM_DISABLE_IFRAME=false;var AICC_COMM_PREPEND_HTTP_IF_MISSING=true;var AICC_REPORT_MIN_MAX_SCORE=true;var SHOW_DEBUG_ON_LAUNCH=false;var DO_NOT_REPORT_INTERACTIONS=false;var SCORE_CAN_ONLY_IMPROVE=false;var REVIEW_MODE_IS_READ_ONLY=false;var AICC_RE_CHECK_LOADED_INTERVAL=250;var AICC_RE_CHECK_ATTEMPTS_BEFORE_TIMEOUT=240;var USE_AICC_KILL_TIME=true;var AICC_ENTRY_FLAG_DEFAULT=ENTRY_REVIEW;var AICC_USE_CUSTOM_COMMS=false;var FORCED_COMMIT_TIME="0";var ALLOW_NONE_STANDARD=true;var USE_2004_SUSPENDALL_NAVREQ=false;var USE_STRICT_SUSPEND_DATA_LIMITS=false;var EXIT_SUSPEND_IF_COMPLETED=false;var EXIT_NORMAL_IF_PASSED=false;var AICC_ENCODE_PARAMETER_VALUES=true;function GetQueryStringValue(strElement,strQueryString){var aryPairs;var foundValue;strQueryString=strQueryString.substring(1);aryPairs=strQueryString.split("&");foundValue=SearchQueryStringPairs(aryPairs,strElement);if(foundValue===null){aryPairs=strQueryString.split(/[\?\&]/);foundValue=SearchQueryStringPairs(aryPairs,strElement);}
if(foundValue===null){WriteToDebug("GetQueryStringValue Element '"+strElement+"' Not Found, Returning: empty string");return"";}
else{WriteToDebug("GetQueryStringValue for '"+strElement+"' Returning: "+foundValue);return foundValue;}}
function SearchQueryStringPairs(aryPairs,strElement){var i;var intEqualPos;var strArg="";var strValue="";strElement=strElement.toLowerCase();for(i=0;i<aryPairs.length;i++){intEqualPos=aryPairs[i].indexOf('=');if(intEqualPos!=-1){strArg=aryPairs[i].substring(0,intEqualPos);if(EqualsIgnoreCase(strArg,strElement)){strValue=aryPairs[i].substring(intEqualPos+1);strValue=new String(strValue)
strValue=strValue.replace(/\+/g,"%20")
strValue=unescape(strValue);return new String(strValue);}}}
return null;}
function ConvertStringToBoolean(str){var intTemp;if(EqualsIgnoreCase(str,"true")||EqualsIgnoreCase(str,"t")||str.toLowerCase().indexOf("t")==0){return true;}
else{intTemp=parseInt(str,10);if(intTemp==1||intTemp==-1){return true;}
else{return false;}}}
function EqualsIgnoreCase(str1,str2){var blnReturn;str1=new String(str1);str2=new String(str2);blnReturn=(str1.toLowerCase()==str2.toLowerCase())
return blnReturn;}
function ValidInteger(intNum){WriteToDebug("In ValidInteger intNum="+intNum);var str=new String(intNum);if(str.indexOf("-",0)==0){str=str.substring(1,str.length-1);}
var regValidChars=new RegExp("[^0-9]");if(str.search(regValidChars)==-1){WriteToDebug("Returning true");return true;}
WriteToDebug("Returning false");return false;}
function ConvertDateToIso8601TimeStamp(dtm){var strTimeStamp;dtm=new Date(dtm);var Year=dtm.getFullYear();var Month=dtm.getMonth()+1;var Day=dtm.getDate();var Hour=dtm.getHours();var Minute=dtm.getMinutes();var Second=dtm.getSeconds();Month=ZeroPad(Month,2);Day=ZeroPad(Day,2);Hour=ZeroPad(Hour,2);Minute=ZeroPad(Minute,2);Second=ZeroPad(Second,2);strTimeStamp=Year+"-"+Month+"-"+Day+"T"+Hour+":"+Minute+":"+Second;var tzoffset=-(dtm.getTimezoneOffset()/60);if(tzoffset!=0){strTimeStamp+='.0';if(tzoffset>0){if((''+tzoffset).indexOf('.')>=-1){var fraction='0'+(''+tzoffset).substr((''+tzoffset).indexOf('.'),(''+tzoffset).length);var base=(''+tzoffset).substr(0,(''+tzoffset).indexOf('.'));fraction=(fraction*60);strTimeStamp+='+'+ZeroPad(base+'.'+fraction,2);}else{strTimeStamp+='+'+ZeroPad(tzoffset,2);}}else{strTimeStamp+=ZeroPad(tzoffset,2);}}
return strTimeStamp;}
function ConvertIso8601TimeStampToDate(strTimeStamp){strTimeStamp=new String(strTimeStamp);var ary=new Array();ary=strTimeStamp.split(/[\:T+-]/);var Year=ary[0];var Month=ary[1]-1;var Day=ary[2];var Hour=ary[3];var Minute=ary[4];var Second=ary[5];return new Date(Year,Month,Day,Hour,Minute,Second,0);}
function ConvertDateToCMIDate(dtmDate){WriteToDebug("In ConvertDateToCMIDate");var strYear;var strMonth;var strDay;var strReturn;dtmDate=new Date(dtmDate);strYear=dtmDate.getFullYear()
strMonth=(dtmDate.getMonth()+1);strDay=dtmDate.getDate();strReturn=ZeroPad(strYear,4)+"/"+ZeroPad(strMonth,2)+"/"+ZeroPad(strDay,2);return strReturn;}
function ConvertDateToCMITime(dtmDate){var strHours;var strMinutes;var strSeconds;var strReturn;dtmDate=new Date(dtmDate);strHours=dtmDate.getHours();strMinutes=dtmDate.getMinutes();strSeconds=dtmDate.getSeconds();strReturn=ZeroPad(strHours,2)+":"+ZeroPad(strMinutes,2)+":"+ZeroPad(strSeconds,2);return strReturn;}
function ConvertCMITimeSpanToMS(strTime){WriteToDebug("In ConvertCMITimeSpanToMS, strTime="+strTime);var aryParts;var intHours;var intMinutes;var intSeconds;var intTotalMilliSeconds;aryParts=strTime.split(":");if(!IsValidCMITimeSpan(strTime)){WriteToDebug("ERROR - Invalid TimeSpan");SetErrorInfo(SCORM_ERROR_GENERAL,"LMS ERROR - Invalid time span passed to ConvertCMITimeSpanToMS, please contact technical support");return 0;}
intHours=aryParts[0];intMinutes=aryParts[1];intSeconds=aryParts[2];WriteToDebug("intHours="+intHours+" intMinutes="+intMinutes+" intSeconds="+intSeconds);intTotalMilliSeconds=(intHours*3600000)+(intMinutes*60000)+(intSeconds*1000);intTotalMilliSeconds=Math.round(intTotalMilliSeconds);WriteToDebug("Returning "+intTotalMilliSeconds);return intTotalMilliSeconds;}
function ConvertScorm2004TimeToMS(strIso8601Time){WriteToDebug("In ConvertScorm2004TimeToMS, strIso8601Time="+strIso8601Time);var intTotalMs=0;var strNumberBuilder;var strCurrentCharacter;var blnInTimeSection;var Seconds=0;var Minutes=0;var Hours=0;var Days=0;var Months=0;var Years=0;var MILLISECONDS_PER_SECOND=1000;var MILLISECONDS_PER_MINUTE=MILLISECONDS_PER_SECOND*60;var MILLISECONDS_PER_HOUR=MILLISECONDS_PER_MINUTE*60;var MILLISECONDS_PER_DAY=MILLISECONDS_PER_HOUR*24;var MILLISECONDS_PER_MONTH=MILLISECONDS_PER_DAY*(((365*4)+1)/48);var MILLISECONDS_PER_YEAR=MILLISECONDS_PER_MONTH*12;strIso8601Time=new String(strIso8601Time);strNumberBuilder="";strCurrentCharacter="";blnInTimeSection=false;for(var i=1;i<strIso8601Time.length;i++){strCurrentCharacter=strIso8601Time.charAt(i);if(IsIso8601SectionDelimiter(strCurrentCharacter)){switch(strCurrentCharacter.toUpperCase()){case"Y":Years=parseInt(strNumberBuilder,10);break;case"M":if(blnInTimeSection){Minutes=parseInt(strNumberBuilder,10);}
else{Months=parseInt(strNumberBuilder,10);}
break;case"D":Days=parseInt(strNumberBuilder,10);break;case"H":Hours=parseInt(strNumberBuilder,10);break;case"S":Seconds=parseFloat(strNumberBuilder);break;case"T":blnInTimeSection=true;break;}
strNumberBuilder="";}
else{strNumberBuilder+=""+strCurrentCharacter;}}
WriteToDebug("Years="+Years+"\n"+"Months="+Months+"\n"+"Days="+Days+"\n"+"Hours="+Hours+"\n"+"Minutes="+Minutes+"\n"+"Seconds="+Seconds+"\n");intTotalMs=(Years*MILLISECONDS_PER_YEAR)+
(Months*MILLISECONDS_PER_MONTH)+
(Days*MILLISECONDS_PER_DAY)+
(Hours*MILLISECONDS_PER_HOUR)+
(Minutes*MILLISECONDS_PER_MINUTE)+
(Seconds*MILLISECONDS_PER_SECOND);intTotalMs=Math.round(intTotalMs);WriteToDebug("returning-"+intTotalMs);return intTotalMs;}
function IsIso8601SectionDelimiter(str){if(str.search(/[PYMDTHS]/)>=0){return true;}
else{return false;}}
function IsValidCMITimeSpan(strValue){WriteToDebug("In IsValidCMITimeSpan strValue="+strValue);var regValid=/^\d?\d?\d?\d:\d?\d:\d?\d(.\d\d?)?$/;if(strValue.search(regValid)>-1){WriteToDebug("Returning True");return true;}
else{WriteToDebug("Returning False");return false;}}
function IsValidIso8601TimeSpan(strValue){WriteToDebug("In IsValidIso8601TimeSpan strValue="+strValue);var regValid=/^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(.\d\d?)?S)?)?$/;if(strValue.search(regValid)>-1){WriteToDebug("Returning True");return true;}
else{WriteToDebug("Returning False");return false;}}
function ConvertMilliSecondsToSCORMTime(intTotalMilliseconds,blnIncludeFraction){var intHours;var intintMinutes;var intSeconds;var intMilliseconds;var intHundredths;var strCMITimeSpan;WriteToDebug("In ConvertMilliSecondsIntoSCORMTime, intTotalMilliseconds = "+intTotalMilliseconds+", blnIncludeFraction = "+blnIncludeFraction);if(blnIncludeFraction==null||blnIncludeFraction==undefined){blnIncludeFraction=true;}
intMilliseconds=intTotalMilliseconds%1000;intSeconds=((intTotalMilliseconds-intMilliseconds)/1000)%60;intMinutes=((intTotalMilliseconds-intMilliseconds-(intSeconds*1000))/60000)%60;intHours=(intTotalMilliseconds-intMilliseconds-(intSeconds*1000)-(intMinutes*60000))/3600000;WriteToDebug("Separated Parts, intHours="+intHours+", intMinutes="+intMinutes+", intSeconds="+intSeconds+", intMilliseconds="+intMilliseconds);if(intHours==10000)
{WriteToDebug("Max intHours detected");intHours=9999;intMinutes=(intTotalMilliseconds-(intHours*3600000))/60000;if(intMinutes==100)
{intMinutes=99;}
intMinutes=Math.floor(intMinutes);intSeconds=(intTotalMilliseconds-(intHours*3600000)-(intMinutes*60000))/1000;if(intSeconds==100)
{intSeconds=99;}
intSeconds=Math.floor(intSeconds);intMilliseconds=(intTotalMilliseconds-(intHours*3600000)-(intMinutes*60000)-(intSeconds*1000));WriteToDebug("Separated Parts, intHours="+intHours+", intMinutes="+intMinutes+", intSeconds="+intSeconds+", intMilliseconds="+intMilliseconds);}
intHundredths=Math.floor(intMilliseconds/10);strCMITimeSpan=ZeroPad(intHours,4)+":"+ZeroPad(intMinutes,2)+":"+ZeroPad(intSeconds,2);if(blnIncludeFraction){strCMITimeSpan+="."+intHundredths;}
WriteToDebug("strCMITimeSpan="+strCMITimeSpan);if(intHours>9999)
{strCMITimeSpan="9999:99:99";if(blnIncludeFraction){strCMITimeSpan+=".99";}}
WriteToDebug("returning "+strCMITimeSpan);return strCMITimeSpan;}
function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds){WriteToDebug("In ConvertMilliSecondsIntoSCORM2004Time intTotalMilliseconds="+intTotalMilliseconds);var ScormTime="";var HundredthsOfASecond;var Seconds;var Minutes;var Hours;var Days;var Months;var Years;var HUNDREDTHS_PER_SECOND=100;var HUNDREDTHS_PER_MINUTE=HUNDREDTHS_PER_SECOND*60;var HUNDREDTHS_PER_HOUR=HUNDREDTHS_PER_MINUTE*60;var HUNDREDTHS_PER_DAY=HUNDREDTHS_PER_HOUR*24;var HUNDREDTHS_PER_MONTH=HUNDREDTHS_PER_DAY*(((365*4)+1)/48);var HUNDREDTHS_PER_YEAR=HUNDREDTHS_PER_MONTH*12;HundredthsOfASecond=Math.floor(intTotalMilliseconds/10);Years=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_YEAR);HundredthsOfASecond-=(Years*HUNDREDTHS_PER_YEAR);Months=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_MONTH);HundredthsOfASecond-=(Months*HUNDREDTHS_PER_MONTH);Days=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_DAY);HundredthsOfASecond-=(Days*HUNDREDTHS_PER_DAY);Hours=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_HOUR);HundredthsOfASecond-=(Hours*HUNDREDTHS_PER_HOUR);Minutes=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_MINUTE);HundredthsOfASecond-=(Minutes*HUNDREDTHS_PER_MINUTE);Seconds=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_SECOND);HundredthsOfASecond-=(Seconds*HUNDREDTHS_PER_SECOND);if(Years>0){ScormTime+=Years+"Y";}
if(Months>0){ScormTime+=Months+"M";}
if(Days>0){ScormTime+=Days+"D";}
if((HundredthsOfASecond+Seconds+Minutes+Hours)>0){ScormTime+="T";if(Hours>0){ScormTime+=Hours+"H";}
if(Minutes>0){ScormTime+=Minutes+"M";}
if((HundredthsOfASecond+Seconds)>0){ScormTime+=Seconds;if(HundredthsOfASecond>0){ScormTime+="."+HundredthsOfASecond;}
ScormTime+="S";}}
if(ScormTime==""){ScormTime="0S";}
ScormTime="P"+ScormTime;WriteToDebug("Returning-"+ScormTime);return ScormTime;}
function ZeroPad(intNum,intNumDigits){WriteToDebug("In ZeroPad intNum="+intNum+" intNumDigits="+intNumDigits);var strTemp;var intLen;var decimalToPad;var i;var isNeg=false;strTemp=new String(intNum);if(strTemp.indexOf('-')!=-1){isNeg=true;strTemp=strTemp.substr(1,strTemp.length);}
if(strTemp.indexOf('.')!=-1){strTemp.replace('.','');decimalToPad=strTemp.substr(strTemp.indexOf('.')+1,strTemp.length);strTemp=strTemp.substr(0,strTemp.indexOf('.'));}
intLen=strTemp.length;if(intLen>intNumDigits){WriteToDebug("Length of string is greater than num digits, trimming string");strTemp=strTemp.substr(0,intNumDigits);}
else{for(i=intLen;i<intNumDigits;i++){strTemp="0"+strTemp;}}
if(isNeg==true){strTemp='-'+strTemp;}
if(decimalToPad!=null&&decimalToPad!=''){if(decimalToPad.length==1){strTemp+=':'+decimalToPad+'0';}else{strTemp+=':'+decimalToPad;}}
WriteToDebug("Returning - "+strTemp);return strTemp;}
function IsValidDecimal(strValue){WriteToDebug("In IsValidDecimal, strValue="+strValue);strValue=new String(strValue);if(strValue.search(/[^.\d-]/)>-1){WriteToDebug("Returning False - character other than a digit, dash or period found");return false;}
if(strValue.search("-")>-1){if(strValue.indexOf("-",1)>-1){WriteToDebug("Returning False - dash found in the middle of the string");return false;}}
if(strValue.indexOf(".")!=strValue.lastIndexOf(".")){WriteToDebug("Returning False - more than one decimal point found");return false;}
if(strValue.search(/\d/)<0){WriteToDebug("Returning False - no digits found");return false;}
WriteToDebug("Returning True");return true;}
function IsAlphaNumeric(strValue){WriteToDebug("In IsAlphaNumeric");if(strValue.search(/\w/)<0){WriteToDebug("Returning false");return false;}
else{WriteToDebug("Returning true");return true;}}
function ReverseNameSequence(strName)
{var strFirstName;var strLastName;var intCommaLoc;if(strName=="")strName="Not Found, Learner Name";intCommaLoc=strName.indexOf(",");strFirstName=strName.slice(intCommaLoc+1);strLastName=strName.slice(0,intCommaLoc);strFirstName=Trim(strFirstName);strLastName=Trim(strLastName);return strFirstName+' '+strLastName;}
function LTrim(str){str=new String(str);return(str.replace(/^\s+/,''));}
function RTrim(str){str=new String(str);return(str.replace(/\s+$/,''));}
function Trim(strToTrim){var str=LTrim(RTrim(strToTrim));return(str.replace(/\s{2,}/g," "));}
function GetValueFromDataChunk(strID)
{var strChunk=new String(GetDataChunk());var aryPairs=new Array();var aryValues=new Array();var i;aryPairs=strChunk.split(parent.DATA_CHUNK_PAIR_SEPARATOR);for(i=0;i<aryPairs.length;i++)
{aryValues=aryPairs[i].split(parent.DATA_CHUNK_VALUE_SEPARATOR);if(aryValues[0]==strID)return aryValues[1];}
return'';}
function SetDataChunkValue(strID,strValue)
{var strChunk=new String(GetDataChunk());var aryPairs=new Array();var aryValues=new Array();var i;var blnFound=new Boolean(false);aryPairs=strChunk.split(parent.DATA_CHUNK_PAIR_SEPARATOR);for(i=0;i<aryPairs.length;i++)
{aryValues=aryPairs[i].split(parent.DATA_CHUNK_VALUE_SEPARATOR);if(aryValues[0]==strID)
{aryValues[1]=strValue;blnFound=true;aryPairs[i]=aryValues[0]+parent.DATA_CHUNK_VALUE_SEPARATOR+aryValues[1];}}
if(blnFound==true)
{strChunk=aryPairs.join(parent.DATA_CHUNK_PAIR_SEPARATOR);}
else
{if(strChunk=='')
{strChunk=strID+parent.DATA_CHUNK_VALUE_SEPARATOR+strValue;}
else
{strChunk+=parent.DATA_CHUNK_PAIR_SEPARATOR+strID+parent.DATA_CHUNK_VALUE_SEPARATOR+strValue;}}
SetDataChunk(strChunk);return true;}
function GetLastDirAndPageName(str)
{var page=new String(str);var LastSlashLocation=page.lastIndexOf("/");var SecondLastSlashLocation=page.lastIndexOf("/",LastSlashLocation-1);return page.substr(SecondLastSlashLocation+1);}
function RoundToPrecision(number,significantDigits){number=parseFloat(number);return(Math.round(number*Math.pow(10,significantDigits))/Math.pow(10,significantDigits))}
function IsAbsoluteUrl(urlStr){return urlStr!=null&&(urlStr.indexOf("http://")==0||urlStr.indexOf("https://")==0)}
var STANDARD='SCORM2004';var SCORM2004_LOGOUT="logout";var SCORM2004_SUSPEND="suspend";var SCORM2004_NORMAL_EXIT="normal";var SCORM2004_TIMEOUT="time-out";var SCORM2004_PASSED="passed";var SCORM2004_FAILED="failed";var SCORM2004_UNKNOWN="unknown";var SCORM2004_COMPLETED="completed";var SCORM2004_INCOMPLETE="incomplete";var SCORM2004_NOT_ATTEMPTED="not attempted";var SCORM2004_CREDIT="credit";var SCORM2004_NO_CREDIT="no-credit";var SCORM2004_BROWSE="browse";var SCORM2004_NORMAL="normal";var SCORM2004_REVIEW="review";var SCORM2004_ENTRY_ABINITIO="ab-initio";var SCORM2004_ENTRY_RESUME="resume";var SCORM2004_ENTRY_NORMAL="";var SCORM2004_TLA_EXIT_MESSAGE="exit,message";var SCORM2004_TLA_EXIT_NO_MESSAGE="exit,no message";var SCORM2004_TLA_CONTINUE_MESSAGE="continue,message";var SCORM2004_TLA_CONTINUE_NO_MESSAGE="continue,no message";var SCORM2004_RESULT_CORRECT="correct";var SCORM2004_RESULT_WRONG="incorrect";var SCORM2004_RESULT_UNANTICIPATED="unanticipated";var SCORM2004_RESULT_NEUTRAL="neutral";var SCORM2004_INTERACTION_TYPE_TRUE_FALSE="true-false";var SCORM2004_INTERACTION_TYPE_CHOICE="choice";var SCORM2004_INTERACTION_TYPE_FILL_IN="fill-in";var SCORM2004_INTERACTION_TYPE_LONG_FILL_IN="long-fill-in";var SCORM2004_INTERACTION_TYPE_MATCHING="matching";var SCORM2004_INTERACTION_TYPE_PERFORMANCE="performance";var SCORM2004_INTERACTION_TYPE_SEQUENCING="sequencing";var SCORM2004_INTERACTION_TYPE_LIKERT="likert";var SCORM2004_INTERACTION_TYPE_NUMERIC="numeric";var SCORM2004_NO_ERROR="0";var SCORM2004_ERROR_INVALID_PREFERENCE="-1";var SCORM2004_ERROR_INVALID_STATUS="-2";var SCORM2004_ERROR_INVALID_SPEED="-3";var SCORM2004_ERROR_INVALID_TIMESPAN="-4";var SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION="-5";var SCORM2004_ERROR_INVALID_DECIMAL="-6";var SCORM2004_ERROR_INVALID_CREDIT="-7";var SCORM2004_ERROR_INVALID_LESSON_MODE="-8";var SCORM2004_ERROR_INVALID_ENTRY="-9";var SCORM2004_TRUE="true";var SCORM2004_FALSE="false";var SCORM2004_EARLIEST_DATE=new Date("1/1/1900");var intSCORM2004Error=SCORM2004_NO_ERROR;var strSCORM2004ErrorString="";var strSCORM2004ErrorDiagnostic="";var SCORM2004_objAPI=null;var blnReviewModeSoReadOnly=false;var blnSCORM2004_SSP_Is_Supported=null;function SCORM2004_Initialize(){WriteToDebug("In SCORM2004_Initialize");var blnResult=true;SCORM2004_ClearErrorInfo();WriteToDebug("Grabbing API");try{SCORM2004_objAPI=SCORM2004_GrabAPI();}
catch(e){WriteToDebug("Error grabbing 1.2 API-"+e.name+":"+e.message);}
if(typeof(SCORM2004_objAPI)=="undefined"||SCORM2004_objAPI==null){WriteToDebug("Unable to acquire SCORM API:")
WriteToDebug("SCORM2004_objAPI="+typeof(SCORM2004_objAPI));InitializeExecuted(false,"Error - unable to acquire LMS API, content may not play properly and results may not be recorded.  Please contact technical support.");return false;}
WriteToDebug("Calling LMSInit");blnResult=SCORM2004_CallInitialize();if(!blnResult){WriteToDebug("ERROR Initializing LMS");InitializeExecuted(false,"Error initializing communications with LMS");return false;}
if(SCORM2004_GetStatus()==LESSON_STATUS_NOT_ATTEMPTED){WriteToDebug("Setting Status to Incomplete");blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_INCOMPLETE);}
blnResult=SCORM2004_CallSetValue("cmi.exit",SCORM2004_TranslateExitTypeToSCORM(DEFAULT_EXIT_TYPE))&&blnResult;if(SCORM2004_GetLessonMode()==MODE_REVIEW){if(!(typeof(REVIEW_MODE_IS_READ_ONLY)=="undefined")&&REVIEW_MODE_IS_READ_ONLY===true){blnReviewModeSoReadOnly=true;}}
WriteToDebug("Calling InitializeExecuted with parameter-"+blnResult);InitializeExecuted(blnResult,"");return;}
function SCORM2004_Finish(strExitType,blnStatusWasSet){WriteToDebug("In SCORM2004_Finish strExitType="+strExitType+", blnStatusWasSet="+blnStatusWasSet);var strStatusAfterCompletion;var blnResult=true;SCORM2004_ClearErrorInfo();if((strExitType==EXIT_TYPE_FINISH)&&!blnStatusWasSet){WriteToDebug("Getting completion status");strStatusAfterCompletion=SCORM2004_GetCompletionStatus();WriteToDebug("Setting completion status to "+strStatusAfterCompletion);blnResult=SCORM2004_CallSetValue("cmi.completion_status",strStatusAfterCompletion)&&blnResult;}
if(strExitType==EXIT_TYPE_SUSPEND&&USE_2004_SUSPENDALL_NAVREQ){WriteToDebug("Setting adl.nav.request to suspendAll");blnResult=SCORM2004_CallSetValue("adl.nav.request","suspendAll");}
WriteToDebug("Setting Exit");blnResult=SCORM2004_CallSetValue("cmi.exit",SCORM2004_TranslateExitTypeToSCORM(strExitType))&&blnResult;WriteToDebug("Calling Commit");blnResult=SCORM2004_CallCommit()&&blnResult;WriteToDebug("Calling Finish");blnResult=SCORM2004_CallTerminate()&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_CommitData(){WriteToDebug("In SCORM2004_CommitData");SCORM2004_ClearErrorInfo();return SCORM2004_CallCommit();}
function SCORM2004_GetStudentID(){WriteToDebug("In SCORM2004_GetStudentID");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.learner_id");}
function SCORM2004_GetStudentName(){WriteToDebug("In SCORM2004_GetStudentName");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.learner_name");}
function SCORM2004_GetBookmark(){WriteToDebug("In SCORM2004_GetBookmark");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.location");}
function SCORM2004_SetBookmark(strBookmark){WriteToDebug("In SCORM2004_SetBookmark strBookmark="+strBookmark);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.location",strBookmark);}
function SCORM2004_GetDataChunk(){WriteToDebug("In SCORM2004_GetDataChunk");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.suspend_data");}
function SCORM2004_SetDataChunk(strData){WriteToDebug("In SCORM2004_SetDataChunk");SCORM2004_ClearErrorInfo();if(USE_STRICT_SUSPEND_DATA_LIMITS==true){if(strData.length>4000){WriteToDebug("SCORM2004_SetDataChunk - suspend_data too large for SCORM 2004 2nd ed (4000 character limit) but will try to persist anyway.");if(strData.length>64000){WriteToDebug("SCORM2004_SetDataChunk - suspend_data too large for SCORM 2004 3rd & 4th ed (64000 character limit) so failing to persist.");return false;}else{return SCORM2004_CallSetValue("cmi.suspend_data",strData);}}else{return SCORM2004_CallSetValue("cmi.suspend_data",strData);}}else{return SCORM2004_CallSetValue("cmi.suspend_data",strData);}}
function SCORM2004_GetLaunchData(){WriteToDebug("In SCORM2004_GetLaunchData");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.launch_data");}
function SCORM2004_GetComments(){WriteToDebug("In SCORM2004_GetComments");SCORM2004_ClearErrorInfo();var intCommentCount;var strComments="";intCommentCount=SCORM2004_CallGetValue("cmi.comments_from_learner._count");for(var i=0;i<intCommentCount;i++){if(strComments.length>0){strComments+=" | ";}
strComments+=SCORM2004_CallGetValue("cmi.comments_from_learner."+i+".comment");}
return strComments;}
function SCORM2004_WriteComment(strComment){WriteToDebug("In SCORM2004_WriteComment strComment="+strComment);var intCurrentIndex;var blnResult;SCORM2004_ClearErrorInfo();if(strComment.search(/ \| /)==0){strComment=strComment.substr(3);}
strComment.replace(/\|\|/g,"|")
intCurrentIndex=SCORM2004_CallGetValue("cmi.comments_from_learner._count");blnResult=SCORM2004_CallSetValue("cmi.comments_from_learner."+intCurrentIndex+".comment",strComment);blnResult=SCORM2004_CallSetValue("cmi.comments_from_learner."+intCurrentIndex+".timestamp",ConvertDateToIso8601TimeStamp(new Date()))&&blnResult;return blnResult;}
function SCORM2004_GetLMSComments(){WriteToDebug("In SCORM2004_GetLMSComments");SCORM2004_ClearErrorInfo();var intCommentCount;var strComments="";intCommentCount=SCORM2004_CallGetValue("cmi.comments_from_lms._count");for(var i=0;i<intCommentCount;i++){if(strComments.length>0){strComments+=" \r\n";}
strComments+=SCORM2004_CallGetValue("cmi.comments_from_lms."+i+".comment");}
return strComments;}
function SCORM2004_GetAudioPlayPreference(){var intTempPreference;WriteToDebug("In SCORM2004_GetAudioPlayPreference");SCORM2004_ClearErrorInfo();intTempPreference=SCORM2004_CallGetValue("cmi.learner_preference.audio_level");if(intTempPreference==""){intTempPreference=0;}
intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference<=0){WriteToDebug("Returning Off");return PREFERENCE_OFF;}
else{WriteToDebug("Error: Invalid preference");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}}
function SCORM2004_GetAudioVolumePreference(){var intTempPreference;WriteToDebug("In SCORM2004_GetAudioVollumePreference");SCORM2004_ClearErrorInfo();intTempPreference=SCORM2004_CallGetValue("cmi.learner_preference.audio_level");WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference==""){intTempPreference=100;}
intTempPreference=parseInt(intTempPreference,10);if(intTempPreference<=0){WriteToDebug("Setting to 100");intTempPreference=100;}
if(!(intTempPreference>0&&intTempPreference<=100)){WriteToDebug("ERROR: invalid preference");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}
WriteToDebug("Returning "+intTempPreference);return intTempPreference;}
function SCORM2004_SetAudioPreference(PlayPreference,intPercentOfMaxVolume){WriteToDebug("In SCORM2004_SetAudioPreference PlayPreference="+PlayPreference+", intPercentOfMaxVolume="+intPercentOfMaxVolume);SCORM2004_ClearErrorInfo();if(PlayPreference==PREFERENCE_OFF){WriteToDebug("Setting percent to 0");intPercentOfMaxVolume=0;}
return SCORM2004_CallSetValue("cmi.learner_preference.audio_level",intPercentOfMaxVolume);}
function SCORM2004_SetLanguagePreference(strLanguage){WriteToDebug("In SCORM2004_SetLanguagePreference strLanguage="+strLanguage);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.learner_preference.language",strLanguage);}
function SCORM2004_GetLanguagePreference(){WriteToDebug("In SCORM2004_GetLanguagePreference");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.learner_preference.language");}
function SCORM2004_SetSpeedPreference(intPercentOfMax){WriteToDebug("In SCORM2004_SetSpeedPreference intPercentOfMax="+intPercentOfMax);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.learner_preference.delivery_speed",intPercentOfMax);}
function SCORM2004_GetSpeedPreference(){var intSCORMSpeed;var intPercentOfMax;WriteToDebug("In SCORM2004_GetSpeedPreference");SCORM2004_ClearErrorInfo();intSCORMSpeed=SCORM2004_CallGetValue("cmi.learner_preference.delivery_speed");WriteToDebug("intSCORMSpeed="+intSCORMSpeed);if(intSCORMSpeed==""){WriteToDebug("Detected empty string, defaulting to 100");intSCORMSpeed=100;}
intSCORMSpeed=parseInt(intSCORMSpeed,10);if(intSCORMSpeed<0){WriteToDebug("ERROR - out of range");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - out of range","intSCORMSpeed="+intSCORMSpeed);return null;}
WriteToDebug("intSCORMSpeed "+intSCORMSpeed);return intSCORMSpeed;}
function SCORM2004_SetTextPreference(intPreference){WriteToDebug("In SCORM2004_SetTextPreference intPreference="+intPreference);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.learner_preference.audio_captioning",intPreference);}
function SCORM2004_GetTextPreference(){var intTempPreference;WriteToDebug("In SCORM2004_GetTextPreference");SCORM2004_ClearErrorInfo();intTempPreference=SCORM2004_CallGetValue("cmi.learner_preference.audio_captioning");intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference==0||intTempPreference==""){WriteToDebug("Returning Default");return PREFERENCE_DEFAULT;}
else if(intTempPreference<0){WriteToDebug("Returning Off");return PREFERENCE_OFF;}
else{WriteToDebug("Error: Invalid preference");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_PREFERENCE,"Invalid text preference received from LMS","intTempPreference="+intTempPreference);return null;}}
function SCORM2004_GetPreviouslyAccumulatedTime(){var strIso8601Time;var intMilliseconds;WriteToDebug("In SCORM2004_GetPreviouslyAccumulatedTime");SCORM2004_ClearErrorInfo();strIso8601Time=SCORM2004_CallGetValue("cmi.total_time")
WriteToDebug("strIso8601Time="+strIso8601Time);if(!IsValidIso8601TimeSpan(strIso8601Time)){WriteToDebug("ERROR - Invalid Iso8601Time");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_TIMESPAN,"Invalid timespan received from LMS","strTime="+strIso8601Time);return null;}
intMilliseconds=ConvertScorm2004TimeToMS(strIso8601Time);WriteToDebug("Returning "+intMilliseconds);return intMilliseconds;}
function SCORM2004_SaveTime(intMilliSeconds){var strISO8601Time;WriteToDebug("In SCORM2004_SaveTime intMilliSeconds="+intMilliSeconds);SCORM2004_ClearErrorInfo();strISO8601Time=ConvertMilliSecondsIntoSCORM2004Time(intMilliSeconds);WriteToDebug("strISO8601Time="+strISO8601Time);return SCORM2004_CallSetValue("cmi.session_time",strISO8601Time);}
function SCORM2004_GetMaxTimeAllowed(){var strIso8601Time;var intMilliseconds;WriteToDebug("In SCORM2004_GetMaxTimeAllowed");SCORM2004_ClearErrorInfo();strIso8601Time=SCORM2004_CallGetValue("cmi.max_time_allowed")
WriteToDebug("strIso8601Time="+strIso8601Time);if(strIso8601Time==""){strIso8601Time="20Y";}
if(!IsValidIso8601TimeSpan(strIso8601Time)){WriteToDebug("ERROR - Invalid Iso8601Time");SCORM2004_SetErrorInfoManually(SCORM_ERROR_INVALID_TIMESPAN,"Invalid timespan received from LMS","strIso8601Time="+strIso8601Time);return null;}
intMilliseconds=ConvertScorm2004TimeToMS(ConvertScorm2004TimeToMS);WriteToDebug("intMilliseconds="+intMilliseconds);return intMilliseconds;}
function SCORM2004_DisplayMessageOnTimeout(){var strTLA;WriteToDebug("In SCORM2004_DisplayMessageOnTimeout");SCORM2004_ClearErrorInfo();strTLA=SCORM2004_CallGetValue("cmi.time_limit_action");WriteToDebug("strTLA="+strTLA);if(strTLA==SCORM2004_TLA_EXIT_MESSAGE||strTLA==SCORM2004_TLA_CONTINUE_MESSAGE){WriteToDebug("returning true");return true;}
else if(strTLA==SCORM2004_TLA_EXIT_NO_MESSAGE||strTLA==SCORM2004_TLA_CONTINUE_NO_MESSAGE||strTLA==""){WriteToDebug("returning false");return false;}
else{WriteToDebug("Error invalid TLA");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION,"Invalid time limit action received from LMS","strTLA="+strTLA);return null;}}
function SCORM2004_ExitOnTimeout(){var strTLA;WriteToDebug("In SCORM2004_ExitOnTimeout");SCORM2004_ClearErrorInfo();strTLA=SCORM2004_CallGetValue("cmi.time_limit_action");WriteToDebug("strTLA="+strTLA);if(strTLA==SCORM2004_TLA_EXIT_MESSAGE||strTLA==SCORM2004_TLA_EXIT_NO_MESSAGE){WriteToDebug("returning true");return true;}
else if(strTLA==SCORM2004_TLA_CONTINUE_MESSAGE||strTLA==SCORM2004_TLA_CONTINUE_NO_MESSAGE||strTLA==""){WriteToDebug("returning false");return false;}
else{WriteToDebug("ERROR invalid TLA");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION,"Invalid time limit action received from LMS","strTLA="+strTLA);return null;}}
function SCORM2004_GetPassingScore(){var fltScore;WriteToDebug("In SCORM2004_GetPassingScore");SCORM2004_ClearErrorInfo();fltScore=SCORM2004_CallGetValue("cmi.scaled_passing_score")
WriteToDebug("fltScore="+fltScore);if(fltScore==""){fltScore=0;}
if(!IsValidDecimal(fltScore)){WriteToDebug("Error - score is not a valid decimal");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_DECIMAL,"Invalid mastery score received from LMS","fltScore="+fltScore);return null;}
fltScore=parseFloat(fltScore);fltScore=fltScore*100;WriteToDebug("returning fltScore-"+fltScore);return fltScore;}
function SCORM2004_SetScore(intScore,intMaxScore,intMinScore){var blnResult;var fltNormalizedScore;WriteToDebug("In SCORM2004_SetScore intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM2004_ClearErrorInfo();fltNormalizedScore=intScore/100;RoundToPrecision(fltNormalizedScore,7);blnResult=SCORM2004_CallSetValue("cmi.score.raw",intScore);blnResult=SCORM2004_CallSetValue("cmi.score.max",intMaxScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.min",intMinScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.scaled",fltNormalizedScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_GetScore(){WriteToDebug("In SCORM2004_GetScore");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.score.raw");}
function SCORM2004_GetScaledScore(){WriteToDebug("In SCORM2004_GetScaledScore");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.score.scaled");}
function SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004InteractionType){var blnResult;var intInteractionIndex;var strResult;blnCorrect=new String(blnCorrect);SCORM2004_ClearErrorInfo();intInteractionIndex=SCORM2004_CallGetValue("cmi.interactions._count");WriteToDebug("intInteractionIndex="+intInteractionIndex);if(intInteractionIndex==""){WriteToDebug("Setting Interaction Index to 0");intInteractionIndex=0;}
if(blnCorrect==true||blnCorrect=="true"||blnCorrect==INTERACTION_RESULT_CORRECT){strResult=SCORM2004_RESULT_CORRECT;}
else if(String(blnCorrect)=="false"||blnCorrect==INTERACTION_RESULT_WRONG){strResult=SCORM2004_RESULT_WRONG;}
else if(blnCorrect==INTERACTION_RESULT_UNANTICIPATED){strResult=SCORM2004_RESULT_UNANTICIPATED;}
else if(blnCorrect==INTERACTION_RESULT_NEUTRAL){strResult=SCORM2004_RESULT_NEUTRAL;}
else{strResult="";}
WriteToDebug("strResult="+strResult);strID=CreateValidIdentifier(strID);blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".id",strID);blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".type",SCORM2004InteractionType)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".learner_response",strResponse)&&blnResult;if(strResult!=undefined&&strResult!=null&&strResult!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".result",strResult)&&blnResult;}
if(strCorrectResponse!=undefined&&strCorrectResponse!=null&&strCorrectResponse!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".correct_responses.0.pattern",strCorrectResponse)&&blnResult;}
if(strDescription!=undefined&&strDescription!=null&&strDescription!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".description",strDescription)&&blnResult;}
if(intWeighting!=undefined&&intWeighting!=null&&intWeighting!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".weighting",intWeighting)&&blnResult;}
if(intLatency!=undefined&&intLatency!=null&&intLatency!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".latency",ConvertMilliSecondsIntoSCORM2004Time(intLatency))&&blnResult;}
if(strLearningObjectiveID!=undefined&&strLearningObjectiveID!=null&&strLearningObjectiveID!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".objectives.0.id",strLearningObjectiveID)&&blnResult;}
blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".timestamp",ConvertDateToIso8601TimeStamp(dtmTime))&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordTrueFalseInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse=null;if(blnResponse){strResponse="true";}
else{strResponse="false";}
if(blnCorrectResponse==true){strCorrectResponse="true";}
else if(blnCorrectResponse==false){strCorrectResponse="false";}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_TRUE_FALSE);}
function SCORM2004_RecordMultipleChoiceInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordMultipleChoiceInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
strResponse+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_CHOICE);}
function SCORM2004_RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordFillInInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var interactionType;if(strCorrectResponse==null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>250||strResponse.length>250){interactionType=SCORM2004_INTERACTION_TYPE_LONG_FILL_IN;}
else{interactionType=SCORM2004_INTERACTION_TYPE_FILL_IN;}
if(strCorrectResponse.length>4000){strCorrectResponse=strCorrectResponse.substr(0,4000);}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,interactionType);}
function SCORM2004_RecordMatchingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordMatchingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
strResponse+=aryResponse[i].Source.Long+"[.]"+aryResponse[i].Target.Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Source.Long+"[.]"+aryCorrectResponse[i].Target.Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_MATCHING);}
function SCORM2004_RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordPerformanceInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);strResponse=new String(strResponse);if(strResponse.length>250){strResponse=strResponse.substr(0,250);}
if(strCorrectResponse==null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>250){strCorrectResponse=strCorrectResponse.substr(0,250);}
strResponse="[.]"+strResponse;strCorrectResponse="[.]"+strCorrectResponse;return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_PERFORMANCE);}
function SCORM2004_RecordSequencingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordSequencingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
strResponse+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_SEQUENCING);}
function SCORM2004_RecordLikertInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In RecordLikertInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse=response.Long;var strCorrectResponse="";if(correctResponse!=null){strCorrectResponse=correctResponse.Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_LIKERT);}
function SCORM2004_RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordNumericInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);if(strCorrectResponse!=undefined&&strCorrectResponse!=null&&strCorrectResponse!=""){strCorrectResponse=strCorrectResponse+"[:]"+strCorrectResponse;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_NUMERIC);}
function SCORM2004_GetEntryMode(){var strEntry;WriteToDebug("In SCORM2004_GetEntryMode");SCORM2004_ClearErrorInfo();strEntry=SCORM2004_CallGetValue("cmi.entry");WriteToDebug("strEntry="+strEntry);if(strEntry==SCORM2004_ENTRY_ABINITIO){WriteToDebug("Returning first time");return ENTRY_FIRST_TIME;}
else if(strEntry==SCORM2004_ENTRY_RESUME){WriteToDebug("Returning resume");return ENTRY_RESUME;}
else if(strEntry==SCORM2004_ENTRY_NORMAL){WriteToDebug("returning normal");return ENTRY_REVIEW;}
else{WriteToDebug("ERROR - invalid entry mode");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_ENTRY,"Invalid entry vocab received from LMS","strEntry="+strEntry);return null;}}
function SCORM2004_GetLessonMode(){var strLessonMode;WriteToDebug("In SCORM2004_GetLessonMode");SCORM2004_ClearErrorInfo();strLessonMode=SCORM2004_CallGetValue("cmi.mode");WriteToDebug("strLessonMode="+strLessonMode);if(strLessonMode==SCORM2004_BROWSE){WriteToDebug("Returning browse");return MODE_BROWSE;}
else if(strLessonMode==SCORM2004_NORMAL){WriteToDebug("returning normal");return MODE_NORMAL;}
else if(strLessonMode==SCORM2004_REVIEW){WriteToDebug("Returning Review");return MODE_REVIEW;}
else{WriteToDebug("ERROR - invalid lesson mode");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_LESSON_MODE,"Invalid lesson_mode vocab received from LMS","strLessonMode="+strLessonMode);return null;}}
function SCORM2004_GetTakingForCredit(){var strCredit;WriteToDebug("In SCORM2004_GetTakingForCredit");SCORM2004_ClearErrorInfo();strCredit=SCORM2004_CallGetValue("cmi.credit");WriteToDebug("strCredit="+strCredit);if(strCredit=="credit"){WriteToDebug("Returning true");return true;}
else if(strCredit=="no-credit"){WriteToDebug("Returning false");return false;}
else{WriteToDebug("ERROR - invalid credit");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_CREDIT,"Invalid credit vocab received from LMS","strCredit="+strCredit);return null;}}
function SCORM2004_SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){var intObjectiveIndex;var blnResult;var fltNormalizedScore;WriteToDebug("In SCORM2004_SetObjectiveScore, strObejctiveID="+strObjectiveID+", intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);fltNormalizedScore=intScore/100;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.raw",intScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.max",intMaxScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.min",intMinScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.scaled",fltNormalizedScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_SetObjectiveStatus(strObjectiveID,Lesson_Status){var intObjectiveIndex;var blnResult;var strSCORMSuccessStatus="";var strSCORMCompletionStatus="";WriteToDebug("In SCORM2004_SetObjectiveStatus strObjectiveID="+strObjectiveID+", Lesson_Status="+Lesson_Status);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);if(Lesson_Status==LESSON_STATUS_PASSED){strSCORMSuccessStatus=SCORM2004_PASSED;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_FAILED){strSCORMSuccessStatus=SCORM2004_FAILED;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_COMPLETED){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_BROWSED){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_INCOMPLETE){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_INCOMPLETE;}
else if(Lesson_Status==LESSON_STATUS_NOT_ATTEMPTED){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_NOT_ATTEMPTED;}
WriteToDebug("strSCORMSuccessStatus="+strSCORMSuccessStatus);WriteToDebug("strSCORMCompletionStatus="+strSCORMCompletionStatus);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".success_status",strSCORMSuccessStatus)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".completion_status",strSCORMCompletionStatus)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_SetObjectiveDescription(strObjectiveID,strObjectiveDescription){var intObjectiveIndex;WriteToDebug("In SCORM2004_SetObjectiveDescription strObjectiveID="+strObjectiveID+", strObjectiveDescription="+strObjectiveDescription);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".description",strObjectiveDescription)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_GetObjectiveScore(strObjectiveID){var intObjectiveIndex;WriteToDebug("In SCORM2004_GetObjectiveScore, strObejctiveID="+strObjectiveID);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);return SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".score.raw");}
function SCORM2004_GetObjectiveStatus(strObjectiveID){var intObjectiveIndex;var strSuccessStatus;var strCompletionStatus;WriteToDebug("In SCORM2004_GetObjectiveStatus, strObejctiveID="+strObjectiveID);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);strSuccessStatus=SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".success_status");strCompletionStatus=SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".completion_status");if(strSuccessStatus==SCORM2004_PASSED){WriteToDebug("returning Passed");return LESSON_STATUS_PASSED;}
else if(strSuccessStatus==SCORM2004_FAILED){WriteToDebug("Returning Failed");return LESSON_STATUS_FAILED;}
else if(strCompletionStatus==SCORM2004_COMPLETED){WriteToDebug("Returning Completed");return LESSON_STATUS_COMPLETED;}
else if(strCompletionStatus==SCORM2004_INCOMPLETE){WriteToDebug("Returning Incomplete");return LESSON_STATUS_INCOMPLETE;}
else if(strCompletionStatus==SCORM2004_NOT_ATTEMPTED||strCompletionStatus==SCORM2004_UNKNOWN||strCompletionStatus==""){WriteToDebug("Returning Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
else{WriteToDebug("ERROR - status not found");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_STATUS,"Invalid objective status received from LMS or initial status not yet recorded for objective","strCompletionStatus="+strCompletionStatus);return null;}}
function SCORM2004_GetObjectiveProgressMeasure(strObjectiveID){var strProgressMeasure=SCORM2004_CallGetValue("cmi.objectives."+strObjectiveID+".progress_measure");return strProgressMeasure;}
function SCORM2004_GetObjectiveDescription(strObjectiveID){var intObjectiveIndex;var strSuccessStatus;var strCompletionStatus;WriteToDebug("In SCORM2004_GetObjectiveDescription, strObejctiveID="+strObjectiveID);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);strDescription=SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".description");return strDescription;}
function SCORM2004_FindObjectiveIndexFromID(strObjectiveID){var intCount;var i;var strTempID;WriteToDebug("In SCORM2004_FindObjectiveIndexFromID");intCount=SCORM2004_CallGetValue("cmi.objectives._count");if(intCount==""){WriteToDebug("Setting intCount=0");return 0;}
intCount=parseInt(intCount,10);WriteToDebug("intCount="+intCount);for(i=0;i<intCount;i++){WriteToDebug("Checking index "+i);strTempID=SCORM2004_CallGetValue("cmi.objectives."+i+".id");WriteToDebug("ID="+strTempID);if(strTempID==strObjectiveID){WriteToDebug("Found Matching index");return i;}}
WriteToDebug("Did not find match, returning count");return intCount;}
function SCORM2004_SetFailed(){WriteToDebug("In SCORM2004_SetFailed");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.success_status",SCORM2004_FAILED);blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_COMPLETED)&&blnResult;return blnResult;}
function SCORM2004_SetPassed(){WriteToDebug("In SCORM2004_SetPassed");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.success_status",SCORM2004_PASSED);blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_COMPLETED)&&blnResult;return blnResult;}
function SCORM2004_SetCompleted(){WriteToDebug("In SCORM2004_SetCompleted");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_COMPLETED);return blnResult;}
function SCORM2004_ResetStatus(){WriteToDebug("In SCORM2004_ResetStatus");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.success_status",SCORM2004_UNKNOWN);blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_INCOMPLETE)&&blnResult;return blnResult;}
function SCORM2004_GetStatus(){var strSuccessStatus;var strCompletionStatus;WriteToDebug("In SCORM2004_GetStatus");SCORM2004_ClearErrorInfo();strSuccessStatus=SCORM2004_CallGetValue("cmi.success_status");strCompletionStatus=SCORM2004_CallGetValue("cmi.completion_status");WriteToDebug("strSuccessStatus="+strSuccessStatus);WriteToDebug("strCompletionStatus="+strCompletionStatus);if(strSuccessStatus==SCORM2004_PASSED){WriteToDebug("returning Passed");return LESSON_STATUS_PASSED;}
else if(strSuccessStatus==SCORM2004_FAILED){WriteToDebug("Returning Failed");return LESSON_STATUS_FAILED;}
else if(strCompletionStatus==SCORM2004_COMPLETED){WriteToDebug("Returning Completed");return LESSON_STATUS_COMPLETED;}
else if(strCompletionStatus==SCORM2004_INCOMPLETE){WriteToDebug("Returning Incomplete");return LESSON_STATUS_INCOMPLETE;}
else if(strCompletionStatus==SCORM2004_NOT_ATTEMPTED||strCompletionStatus==SCORM2004_UNKNOWN){WriteToDebug("Returning Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
else{WriteToDebug("ERROR - status not found");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_STATUS,"Invalid lesson status received from LMS","strCompletionStatus="+strCompletionStatus);return null;}}
function SCORM2004_GetProgressMeasure(){WriteToDebug("In SCORM2004_GetProgressMeasure");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallGetValue("cmi.progress_measure");return blnResult;}
function SCORM2004_SetProgressMeasure(numMeasure){WriteToDebug("In SCORM2004_SetProgressMeasure");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.progress_measure",numMeasure);return blnResult;}
function SCORM2004_SetObjectiveProgressMeasure(strObjectiveID,numMeasure){WriteToDebug("In SCORM2004_SetObjectiveProgressMeasure");var intObjectiveIndex;var blnResult;WriteToDebug("In SCORM2004_SetObjectiveProgressMeasure, strObejctiveID="+strObjectiveID+", numMeasure="+numMeasure);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".progress_measure",numMeasure);return blnResult;}
function SCORM2004_IsContentInBrowseMode(){var strLessonMode
WriteToDebug("In SCORM2004_IsContentInBrowseMode");strLessonMode=SCORM2004_CallGetValue("cmi.mode");WriteToDebug("SCORM2004_IsContentInBrowseMode,  strLessonMode="+strLessonMode);if(strLessonMode==SCORM2004_BROWSE){WriteToDebug("Returning true");return true;}
else{WriteToDebug("Returning false");return false;}}
function SCORM2004_TranslateExitTypeToSCORM(strExitType){WriteToDebug("In SCORM2004_TranslatgeExitTypeToSCORM strExitType-"+strExitType);if(strExitType==EXIT_TYPE_SUSPEND){WriteToDebug("Returning suspend");return SCORM2004_SUSPEND;}
else if(strExitType==EXIT_TYPE_UNLOAD){WriteToDebug("Returning Exit");return SCORM2004_NORMAL_EXIT;}
else if(strExitType==EXIT_TYPE_FINISH){WriteToDebug("Returning Logout");return SCORM2004_NORMAL_EXIT;}
else if(strExitType==EXIT_TYPE_TIMEOUT){WriteToDebug("Returning Timout");return SCORM2004_TIMEOUT;}}
function SCORM2004_GetCompletionStatus(){WriteToDebug("In SCORM2004_GetCompletionStatus");return SCORM2004_COMPLETED;}
function SCORM2004_SetPointBasedScore(intScore,intMaxScore,intMinScore){var blnResult;var fltCalculatedScore;WriteToDebug("In SCORM2004_SetPointBasedScore intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM2004_ClearErrorInfo();if(intScore>=intMinScore)
{fltCalculatedScore=intScore/intMaxScore;}else{WriteToDebug("intScore is lower than intMinScore. Overriding score with minscore for cmi.score.scaled");fltCalculatedScore=intMinScore/intMaxScore;}
fltCalculatedScore=RoundToPrecision(fltCalculatedScore,7);blnResult=SCORM2004_CallSetValue("cmi.score.raw",intScore);blnResult=SCORM2004_CallSetValue("cmi.score.max",intMaxScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.min",intMinScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.scaled",fltCalculatedScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_FindInteractionIndexFromID(strInteractionID){var intCount;var i;var strTempID;var dtmTempDate=new Date();var index;var currentIndexTimestamp=new Date("1/1/1900");WriteToDebug("In SCORM2004_FindInteractionIndexFromID");intCount=SCORM2004_CallGetValue("cmi.interactions._count");if(intCount==""){WriteToDebug("Setting intCount=0");return null;}
intCount=parseInt(intCount,10);WriteToDebug("intCount="+intCount);for(i=0;i<intCount;i++){WriteToDebug("Checking index "+i);strTempID=SCORM2004_CallGetValue("cmi.interactions."+i+".id");WriteToDebug("ID="+strTempID);if(strTempID==strInteractionID){WriteToDebug("Found Matching index: "+i);dtmTempDate=ConvertIso8601TimeStampToDate(SCORM2004_CallGetValue("cmi.interactions."+i+".timestamp"));WriteToDebug("timestamp for "+i+": "+dtmTempDate);if(dtmTempDate>currentIndexTimestamp)
{index=i;currentIndexTimestamp=dtmTempDate;}}}
if(index>=0)return index;WriteToDebug("Did not find match, returning null");return null;}
function SCORM2004_GetInteractionType(strInteractionID)
{var intInteractionIndex;WriteToDebug("In SCORM2004_GetInteractionType, strInteractionID="+strInteractionID);SCORM2004_ClearErrorInfo();intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
WriteToDebug("intInteractionIndex="+intInteractionIndex);var type=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".type");switch(type)
{case SCORM2004_INTERACTION_TYPE_FILL_IN:return INTERACTION_TYPE_FILL_IN;case SCORM2004_INTERACTION_TYPE_LONG_FILL_IN:return INTERACTION_TYPE_LONG_FILL_IN;case SCORM2004_INTERACTION_TYPE_CHOICE:return INTERACTION_TYPE_CHOICE;case SCORM2004_INTERACTION_TYPE_LIKERT:return INTERACTION_TYPE_LIKERT;case SCORM2004_INTERACTION_TYPE_MATCHING:return INTERACTION_TYPE_MATCHING;case SCORM2004_INTERACTION_TYPE_NUMERIC:return INTERACTION_TYPE_NUMERIC;case SCORM2004_INTERACTION_TYPE_PERFORMANCE:return INTERACTION_TYPE_PERFORMANCE;case SCORM2004_INTERACTION_TYPE_SEQUENCING:return INTERACTION_TYPE_SEQUENCING;case SCORM2004_INTERACTION_TYPE_TRUE_FALSE:return INTERACTION_TYPE_TRUE_FALSE;default:return"";}}
function SCORM2004_GetInteractionTimestamp(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionTimestamp, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue(ConvertIso8601TimeStampToDate("cmi.interactions."+intInteractionIndex+".timestamp"));}
function SCORM2004_GetInteractionCorrectResponses(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionCorrectResponses, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
var strType=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".type");var intCorrectResponseCount=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".correct_responses._count");if(intCorrectResponseCount==""){WriteToDebug("Setting intCorrectResponseCount=0");return 0;}
intCorrectResponseCount=parseInt(intCorrectResponseCount,10);WriteToDebug("intCorrectResponseCount="+intCorrectResponseCount);if(intCorrectResponseCount==0)return new Array();if(intCorrectResponseCount>1)WriteToDebug("SCORM Driver is not currently implemented to support multiple correct response combinations and will only return the first");var strResponse=new String(SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".correct_responses.0.pattern"));var aryResponse=strResponse.split("[,]");WriteToDebug("aryResponse.length = "+aryResponse.length);aryResponse=SCORM2004_ProcessResponseArray(strType,aryResponse);WriteToDebug("aryResponse.length = "+aryResponse.length);return aryResponse;}
function SCORM2004_GetInteractionWeighting(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionWeighting, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".weighting");}
function SCORM2004_GetInteractionLearnerResponses(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionLearnerResponses, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
var strType=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".type");var strResponse=new String(SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".learner_response"));var aryResponses=strResponse.split("[,]");WriteToDebug("aryResponses.length = "+aryResponses.length);aryResponses=SCORM2004_ProcessResponseArray(strType,aryResponses);return aryResponses;}
function SCORM2004_ProcessResponseArray(strInteractionType,aryResponses)
{WriteToDebug("Processing Response Array with "+aryResponses.length+" pieces");for(var i=0;i<aryResponses.length;i++)
{if(strInteractionType==SCORM2004_INTERACTION_TYPE_MATCHING)
{WriteToDebug("processing matching type, i="+i);aryResponses[i]=CreateMatchingResponse(aryResponses[i]);}}
return aryResponses;}
function SCORM2004_GetInteractionResult(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionResult, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".result");}
function SCORM2004_GetInteractionLatency(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionLatency, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
var strLatency=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".latency");WriteToDebug("latency returns: "+strLatency);var intLatency=ConvertScorm2004TimeToMS(strLatency);WriteToDebug("latency in milliseconds: "+intLatency);return intLatency;}
function SCORM2004_GetInteractionDescription(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionDescription, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".description");}
function SCORM2004_CreateDataBucket(strBucketId,intMinSize,intMaxSize,strPersistenceType){WriteToDebug("In SCORM2004_CreateDataBucket, strBucketId="+strBucketId+", intMinSize="+intMinSize+", intMaxSize="+intMaxSize+", course="+strPersistenceType);if(SCORM2004_DetectSSPSupport()){if(SCORM2004_DoesBucketExist(strBucketId)==true){WriteToDebug("Bucket already exists and can't be re-allocated.");return false;}
else{return SCORM2004_CallSetValue("ssp.allocate","{bucketID="+strBucketId+"}{requested="+intMaxSize+"}{minimum="+intMinSize+"}{reducible=true}{persistence="+strPersistenceType+"}")}}
else{WriteToDebug("SSP is not supported in this LMS, returning false.");return false;}}
function SCORM2004_GetDataFromBucket(strBucketId){WriteToDebug("In SCORM2004_GetDataFromBucket, strBucketId="+strBucketId);if(SCORM2004_DetectSSPSupport()){var data=SCORM2004_CallGetValue("ssp.data.{bucketID="+strBucketId+"}");return data;}
else{WriteToDebug("SSP is not supported in this LMS, returning empty string.");return"";}}
function SCORM2004_PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("In SCORM2004_PutDataInBucket, strBucketId="+strBucketId+", blnAppendToEnd="+blnAppendToEnd+", strData="+strData);if(SCORM2004_DetectSSPSupport()){if(blnAppendToEnd==true){return SCORM2004_CallSetValue("ssp.appendData","{bucketID="+strBucketId+"}"+strData);}
else{return SCORM2004_CallSetValue("ssp.data","{bucketID="+strBucketId+"}"+strData);}}
else{WriteToDebug("SSP is not supported in this LMS, returning false.");return false;}}
function SCORM2004_DetectSSPSupport(){WriteToDebug("In SCORM2004_DetectSSPSupport");if(blnSCORM2004_SSP_Is_Supported==true){WriteToDebug("Support already detected, returning true");return true;}
else if(blnSCORM2004_SSP_Is_Supported==false){WriteToDebug("Support already determined to me missing, returning false");return false;}
else{var intBucketCount=SCORM2004_CallGetValue("ssp._count");if(SCORM2004_GetLastError()==NO_ERROR){WriteToDebug("SSP data model call succeeded, SSP is supported");blnSCORM2004_SSP_Is_Supported=true;return true;}
else{WriteToDebug("SSP data model call failed, SSP is NOT supported");blnSCORM2004_SSP_Is_Supported=false;return false;}}}
function SCORM2004_GetBucketInfo(strBucketId){WriteToDebug("In SCORM2004_GetBucketInfo, strBucketId="+strBucketId);var intTotalSpace=0;var intUsedSpace=0;var strBucketState=new String(SCORM2004_CallGetValue("ssp.bucket_state.{bucketID="+strBucketId+"}"));if(strBucketState==""||strBucketState==null||strBucketState==undefined){WriteToDebug("Could not retrieve bucket state, returning 0 total size and 0 used size");return new SSPBucketSize(0,0);}
var sectionArray=strBucketState.split("{");for(var section in sectionArray){section=new String(sectionArray[section]);section=section.replace("}","");if(section.indexOf("totalSpace",0)==0){WriteToDebug("Found total space");intTotalSpace=parseInt(section.substr(11),10);WriteToDebug("total space="+intTotalSpace);}
else if(section.indexOf("used",0)==0){WriteToDebug("Found used space");intUsedSpace=parseInt(section.substr(5),10);WriteToDebug("used="+intUsedSpace);}}
var returnValue=new SSPBucketSize(intTotalSpace,intUsedSpace);return returnValue;}
function SCORM2004_DoesBucketExist(strBucketId){WriteToDebug("In SCORM2004_DoesBucketExist, strBucketId="+strBucketId);var intBucketCount=SCORM2004_CallGetValue("ssp._count");intBucketCount=parseInt(intBucketCount,10);for(var i=0;i<intBucketCount;i++){if(strBucketId==SCORM2004_CallGetValue("ssp."+i+".id")){WriteToDebug("Bucket '"+strBucketId+"' Exists");return true;}}
WriteToDebug("Bucket '"+strBucketId+"' DOES NOT Exist");return false;}
function SCORM2004_CallInitialize(){var strResult;WriteToDebug("In SCORM2004_CallInitialize");SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling Initialize");strResult=SCORM2004_objAPI.Initialize("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected failed call to initialize");SCORM2004_SetErrorInfo();WriteToDebug("Error calling Initialize:");WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM2004_CallSetValue(strElement,strValue){var strResult;WriteToDebug("SCORM2004_CallSetValue strElement="+strElement+", strValue="+strValue);if(blnReviewModeSoReadOnly===true){WriteToDebug("Mode is Review and configuration setting dictates this should be read only so exiting.");return true;}
SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling SetValue");strElement=strElement+"";strValue=strValue+"";strResult=SCORM2004_objAPI.SetValue(strElement,strValue)
strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected Failed call to SetValue");SCORM2004_SetErrorInfo();WriteToDebug("Error calling SetValue:");WriteToDebug("              strElement="+strElement);WriteToDebug("              strValue="+strValue);WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM2004_CallGetValue(strElement){var strResult
WriteToDebug("In SCORM2004_CallGetValue strElement="+strElement);SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Call GetValue");strElement=strElement+"";strResult=SCORM2004_objAPI.GetValue(strElement)+""
WriteToDebug("strResult="+strResult);intSCORM2004Error=SCORM2004_objAPI.GetLastError()
intSCORM2004Error=intSCORM2004Error+"";WriteToDebug("intSCORM2004Error="+intSCORM2004Error);if(intSCORM2004Error!=SCORM2004_NO_ERROR){WriteToDebug("Detected failed called to GetValue");SCORM2004_SetErrorInfo();WriteToDebug("Error calling LMSGetValue:");WriteToDebug("              strElement="+strElement);WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);}
WriteToDebug("Returning "+strResult);return strResult;}
function SCORM2004_CallCommit(){var strResult;WriteToDebug("In SCORM2004_CallCommit");SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling Commit");strResult=SCORM2004_objAPI.Commit("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected failed call to Commit");SCORM2004_SetErrorInfo();WriteToDebug("Error calling Commit:");WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM2004_CallTerminate(){var strResult;WriteToDebug("In SCORM2004_CallTerminate");SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling Terminate");strResult=SCORM2004_objAPI.Terminate("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected failed call to Terminate");SCORM2004_SetErrorInfo();WriteToDebug("Error calling Terminate:");WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning True");return true;}
function SCORM2004_ClearErrorInfo(){WriteToDebug("In SCORM2004_ClearErrorInfo");intSCORM2004Error=SCORM2004_NO_ERROR;strSCORM2004ErrorString="";strSCORM2004ErrorDiagnostic="";}
function SCORM2004_SetErrorInfo(){WriteToDebug("In SCORM2004_SetErrorInfo");intSCORM2004Error=SCORM2004_objAPI.GetLastError();strSCORM2004ErrorString=SCORM2004_objAPI.GetErrorString(intSCORM2004Error);strSCORM2004ErrorDiagnostic=SCORM2004_objAPI.GetDiagnostic("");intSCORM2004Error=intSCORM2004Error+"";strSCORM2004ErrorString=strSCORM2004ErrorString+"";strSCORM2004ErrorDiagnostic=strSCORM2004ErrorDiagnostic+"";WriteToDebug("intSCORM2004Error="+intSCORM2004Error);WriteToDebug("strSCORM2004ErrorString="+strSCORM2004ErrorString);WriteToDebug("strSCORM2004ErrorDiagnostic="+strSCORM2004ErrorDiagnostic);}
function SCORM2004_SetErrorInfoManually(intNum,strString,strDiagnostic){WriteToDebug("In SCORM2004_SetErrorInfoManually");WriteToDebug("ERROR-Num="+intNum);WriteToDebug("      String="+strString);WriteToDebug("      Diag="+strDiagnostic);intSCORM2004Error=intNum;strSCORM2004ErrorString=strString;strSCORM2004ErrorDiagnostic=strDiagnostic;}
function SCORM2004_GetLastError(){WriteToDebug("In SCORM2004_GetLastError");if(intSCORM2004Error==SCORM2004_NO_ERROR){WriteToDebug("Returning No Error");return NO_ERROR;}
else{WriteToDebug("Returning "+intSCORMError);return intSCORM2004Error;}}
function SCORM2004_GetLastErrorDesc(){WriteToDebug("In SCORM2004_GetLastErrorDesc, "+strSCORM2004ErrorString+"\n"+strSCORM2004ErrorDiagnostic);return strSCORM2004ErrorString+"\n"+strSCORM2004ErrorDiagnostic;}
function SCORM2004_GrabAPI(){WriteToDebug("In SCORM2004_GrabAPI");if(typeof(SCORM2004_objAPI)=="undefined"||SCORM2004_objAPI==null){WriteToDebug("Searching with Rustici Software algorithm");SCORM2004_objAPI=SCORM2004_GetAPI();}
if(typeof(SCORM2004_objAPI)=="undefined"||SCORM2004_objAPI==null||SCORM2004_objAPI==false){WriteToDebug("Searching with SearchForAPI");SCORM2004_objAPI=SCORM2004_SearchForAPI(window);}
WriteToDebug("Grab API, returning, found API = "+(SCORM2004_objAPI!=null));return SCORM2004_objAPI;}
function SCORM2004_ScanParentsForApi(win)
{var MAX_PARENTS_TO_SEARCH=500;var nParentsSearched=0;while((win.API_1484_11==null||win.API_1484_11==undefined)&&(win.parent!=null)&&(win.parent!=win)&&(nParentsSearched<=MAX_PARENTS_TO_SEARCH))
{nParentsSearched++;win=win.parent;}
return win.API_1484_11;}
function SCORM2004_GetAPI()
{var API=null;if((window.parent!=null)&&(window.parent!=window))
{API=SCORM2004_ScanParentsForApi(window.parent);}
if((API==null)&&(window.top.opener!=null))
{API=SCORM2004_ScanParentsForApi(window.top.opener);}
return API;}
function SCORM2004_SearchForAPI(wndLookIn){WriteToDebug("SCORM2004_SearchForAPI");var objAPITemp=null;var strDebugID="";strDebugID="Name="+wndLookIn.name+", href="+wndLookIn.location.href
objAPITemp=wndLookIn.API_1484_11;if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in this window - "+strDebugID);return objAPITemp;}
if(SCORM2004_WindowHasParent(wndLookIn)){WriteToDebug("Searching Parent - "+strDebugID);objAPITemp=SCORM2004_SearchForAPI(wndLookIn.parent);}
if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in a parent - "+strDebugID);return objAPITemp;}
if(SCORM2004_WindowHasOpener(wndLookIn)){WriteToDebug("Searching Opener - "+strDebugID);objAPITemp=SCORM2004_SearchForAPI(wndLookIn.opener);}
if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in an opener - "+strDebugID);return objAPITemp;}
WriteToDebug("Looking in children - "+strDebugID);objAPITemp=SCORM2004_LookInChildren(wndLookIn);if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in Children - "+strDebugID);return objAPITemp;}
WriteToDebug("Didn't find API in this window - "+strDebugID);return null;}
function SCORM2004_LookInChildren(wnd){WriteToDebug("SCORM2004_LookInChildren");var objAPITemp=null;var strDebugID="";strDebugID="Name="+wnd.name+", href="+wnd.location.href
for(var i=0;i<wnd.frames.length;i++){WriteToDebug("Looking in child frame "+i);objAPITemp=wnd.frames[i].API_1484_11;if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in child frame of "+strDebugID);return objAPITemp;}
WriteToDebug("Looking in this child's children "+strDebugID);objAPITemp=SCORM2004_LookInChildren(wnd.frames[i]);if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("API found in this child's children "+strDebugID);return objAPITemp;}}
return null;}
function SCORM2004_WindowHasOpener(wnd){WriteToDebug("In SCORM2004_WindowHasOpener");if((wnd.opener!=null)&&(wnd.opener!=wnd)&&(typeof(wnd.opener)!="undefined")){WriteToDebug("Window Does Have Opener");return true;}
else{WriteToDebug("Window Does Not Have Opener");return false;}}
function SCORM2004_WindowHasParent(wnd){WriteToDebug("In SCORM2004_WindowHasParent");if((wnd.parent!=null)&&(wnd.parent!=wnd)&&(typeof(wnd.parent)!="undefined")){WriteToDebug("Window Does Have Parent");return true;}
else{WriteToDebug("Window Does Not Have Parent");return false;}}
function SCORM2004_APIFound(obj){WriteToDebug("In SCORM2004_APIFound");if(obj==null||typeof(obj)=="undefined"){WriteToDebug("API NOT Found");return false;}
else{WriteToDebug("API Found");return true;}}
function LMSStandardAPI(strStandard){WriteToDebug("In LMSStandardAPI strStandard="+strStandard);if(strStandard==""){WriteToDebug("No standard specified, using NONE");strStandard="NONE";}
eval("this.Initialize = "+strStandard+"_Initialize");eval("this.Finish = "+strStandard+"_Finish");eval("this.CommitData = "+strStandard+"_CommitData");eval("this.GetStudentID = "+strStandard+"_GetStudentID");eval("this.GetStudentName = "+strStandard+"_GetStudentName");eval("this.GetBookmark = "+strStandard+"_GetBookmark");eval("this.SetBookmark = "+strStandard+"_SetBookmark");eval("this.GetDataChunk = "+strStandard+"_GetDataChunk");eval("this.SetDataChunk = "+strStandard+"_SetDataChunk");eval("this.GetLaunchData = "+strStandard+"_GetLaunchData");eval("this.GetComments = "+strStandard+"_GetComments");eval("this.WriteComment = "+strStandard+"_WriteComment");eval("this.GetLMSComments = "+strStandard+"_GetLMSComments");eval("this.GetAudioPlayPreference = "+strStandard+"_GetAudioPlayPreference");eval("this.GetAudioVolumePreference = "+strStandard+"_GetAudioVolumePreference");eval("this.SetAudioPreference = "+strStandard+"_SetAudioPreference");eval("this.SetLanguagePreference = "+strStandard+"_SetLanguagePreference");eval("this.GetLanguagePreference = "+strStandard+"_GetLanguagePreference");eval("this.SetSpeedPreference = "+strStandard+"_SetSpeedPreference");eval("this.GetSpeedPreference = "+strStandard+"_GetSpeedPreference");eval("this.SetTextPreference = "+strStandard+"_SetTextPreference");eval("this.GetTextPreference = "+strStandard+"_GetTextPreference");eval("this.GetPreviouslyAccumulatedTime = "+strStandard+"_GetPreviouslyAccumulatedTime");eval("this.SaveTime = "+strStandard+"_SaveTime");eval("this.GetMaxTimeAllowed = "+strStandard+"_GetMaxTimeAllowed");eval("this.DisplayMessageOnTimeout = "+strStandard+"_DisplayMessageOnTimeout");eval("this.ExitOnTimeout = "+strStandard+"_ExitOnTimeout");eval("this.GetPassingScore = "+strStandard+"_GetPassingScore");eval("this.SetScore = "+strStandard+"_SetScore");eval("this.GetScore = "+strStandard+"_GetScore");eval("this.GetScaledScore = "+strStandard+"_GetScaledScore");eval("this.RecordTrueFalseInteraction = "+strStandard+"_RecordTrueFalseInteraction");eval("this.RecordMultipleChoiceInteraction = "+strStandard+"_RecordMultipleChoiceInteraction");eval("this.RecordFillInInteraction = "+strStandard+"_RecordFillInInteraction");eval("this.RecordMatchingInteraction = "+strStandard+"_RecordMatchingInteraction");eval("this.RecordPerformanceInteraction = "+strStandard+"_RecordPerformanceInteraction");eval("this.RecordSequencingInteraction = "+strStandard+"_RecordSequencingInteraction");eval("this.RecordLikertInteraction = "+strStandard+"_RecordLikertInteraction");eval("this.RecordNumericInteraction = "+strStandard+"_RecordNumericInteraction");eval("this.GetEntryMode = "+strStandard+"_GetEntryMode");eval("this.GetLessonMode = "+strStandard+"_GetLessonMode");eval("this.GetTakingForCredit = "+strStandard+"_GetTakingForCredit");eval("this.SetObjectiveScore = "+strStandard+"_SetObjectiveScore");eval("this.SetObjectiveStatus = "+strStandard+"_SetObjectiveStatus");eval("this.GetObjectiveScore = "+strStandard+"_GetObjectiveScore");eval("this.GetObjectiveStatus = "+strStandard+"_GetObjectiveStatus");eval("this.SetObjectiveDescription = "+strStandard+"_SetObjectiveDescription");eval("this.GetObjectiveDescription = "+strStandard+"_GetObjectiveDescription");eval("this.SetFailed = "+strStandard+"_SetFailed");eval("this.SetPassed = "+strStandard+"_SetPassed");eval("this.SetCompleted = "+strStandard+"_SetCompleted");eval("this.ResetStatus = "+strStandard+"_ResetStatus");eval("this.GetStatus = "+strStandard+"_GetStatus");eval("this.GetLastError = "+strStandard+"_GetLastError");eval("this.GetLastErrorDesc = "+strStandard+"_GetLastErrorDesc");eval("this.GetInteractionType = "+strStandard+"_GetInteractionType");eval("this.GetInteractionTimestamp = "+strStandard+"_GetInteractionTimestamp");eval("this.GetInteractionCorrectResponses = "+strStandard+"_GetInteractionCorrectResponses");eval("this.GetInteractionWeighting = "+strStandard+"_GetInteractionWeighting");eval("this.GetInteractionLearnerResponses = "+strStandard+"_GetInteractionLearnerResponses");eval("this.GetInteractionResult = "+strStandard+"_GetInteractionResult");eval("this.GetInteractionLatency = "+strStandard+"_GetInteractionLatency");eval("this.GetInteractionDescription = "+strStandard+"_GetInteractionDescription");eval("this.CreateDataBucket = "+strStandard+"_CreateDataBucket");eval("this.GetDataFromBucket = "+strStandard+"_GetDataFromBucket");eval("this.PutDataInBucket = "+strStandard+"_PutDataInBucket");eval("this.DetectSSPSupport = "+strStandard+"_DetectSSPSupport");eval("this.GetBucketInfo = "+strStandard+"_GetBucketInfo");eval("this.GetProgressMeasure = "+strStandard+"_GetProgressMeasure");eval("this.SetProgressMeasure = "+strStandard+"_SetProgressMeasure");eval("this.SetPointBasedScore = "+strStandard+"_SetPointBasedScore");this.Standard=strStandard;}
var blnCalledFinish=false;var blnStandAlone=false;var blnLoaded=false;var blnReachedEnd=false;var blnStatusWasSet=false;var blnLmsPresent=false;var dtmStart=null;var dtmEnd=null;var intAccumulatedMS=0;var blnOverrodeTime=false;var intTimeOverrideMS=null;var aryDebug=new Array();var strDebug="";var winDebug;var intError=NO_ERROR;var strErrorDesc="";var objLMS=null;function Start(){var strStandAlone;var strShowInteractiveDebug;var objTempAPI=null;var strTemp="";WriteToDebug("<h1>SCORM Driver starting up</h1>");WriteToDebug("----------------------------------------");WriteToDebug("----------------------------------------");WriteToDebug("In Start - Version: "+VERSION+"  Last Modified="+window.document.lastModified);WriteToDebug("Browser Info ("+navigator.appName+" "+navigator.appVersion+")");WriteToDebug("URL: "+window.document.location.href);WriteToDebug("----------------------------------------");WriteToDebug("----------------------------------------");ClearErrorInfo();strStandAlone=GetQueryStringValue("StandAlone",window.location.search);strShowInteractiveDebug=GetQueryStringValue("ShowDebug",window.location.search);WriteToDebug("strStandAlone="+strStandAlone+"  strShowInteractiveDebug="+strShowInteractiveDebug);if(ConvertStringToBoolean(strStandAlone)){WriteToDebug("Entering Stand Alone Mode");blnStandAlone=true;}
if(blnStandAlone){WriteToDebug("Using NONE Standard");objLMS=new LMSStandardAPI("NONE");}
else{WriteToDebug("Standard From Configuration File - "+strLMSStandard);if(strLMSStandard.toUpperCase()=="AUTO"){WriteToDebug("Searching for AICC querystring parameters");strTemp=GetQueryStringValue("AICC_URL",document.location.search);if(strTemp!=null&&strTemp!="")
{WriteToDebug("Found AICC querystring parameters, using AICC");objLMS=new LMSStandardAPI("AICC");blnLmsPresent=true;}else{WriteToDebug("Auto-detecting standard - Searching for SCORM 2004 API");try{objTempAPI=SCORM2004_GrabAPI();}
catch(e){WriteToDebug("Error grabbing 2004 API-"+e.name+":"+e.message);}
if(!(typeof(objTempAPI)=="undefined"||objTempAPI==null)){WriteToDebug("Found SCORM 2004 API, using SCORM 2004");objLMS=new LMSStandardAPI("SCORM2004");blnLmsPresent=true;}else{WriteToDebug("Searching for SCORM 1.2 API");try{objTempAPI=SCORM_GrabAPI();}
catch(e){WriteToDebug("Error grabbing 1.2 API-"+e.name+":"+e.message);}
if(!(typeof(objTempAPI)=="undefined"||objTempAPI==null)){WriteToDebug("Found SCORM API, using SCORM");objLMS=new LMSStandardAPI("SCORM");blnLmsPresent=true;}else{if(ALLOW_NONE_STANDARD===true)
{WriteToDebug("Could not determine standard, defaulting to Stand Alone");objLMS=new LMSStandardAPI("NONE");}else{WriteToDebug("Could not determine standard, Stand Alone is disabled in configuration");DisplayError("Could not determine standard. Neither SCORM nor AICC APIs could be found");return;}}}}}else{WriteToDebug("Using Standard From Configuration File - "+strLMSStandard);objLMS=new LMSStandardAPI(strLMSStandard);blnLmsPresent=true;}}
if(ConvertStringToBoolean(strShowInteractiveDebug)||(!(typeof(SHOW_DEBUG_ON_LAUNCH)=="undefined")&&SHOW_DEBUG_ON_LAUNCH===true)){WriteToDebug("Showing Interactive Debug Windows");ShowDebugWindow();}
WriteToDebug("Calling Standard Initialize");objLMS.Initialize();return;}
function InitializeExecuted(blnSuccess,strErrorMessage){WriteToDebug("In InitializeExecuted, blnSuccess="+blnSuccess+", strErrorMessage="+strErrorMessage);if(!blnSuccess){WriteToDebug("ERROR - LMS Initialize Failed");if(strErrorMessage==""){strErrorMessage="An Error Has Occurred";}
blnLmsPresent=false;DisplayError(strErrorMessage);return;}
if(objLMS.Standard=='AICC'){AICC_InitializeExecuted();}
blnLoaded=true;dtmStart=new Date();LoadContent();return;}
function ExecFinish(ExitType){WriteToDebug("In ExecFinish, ExiType="+ExitType);ClearErrorInfo();if(blnLoaded&&!blnCalledFinish){WriteToDebug("Haven't called finish before, finishing");blnCalledFinish=true;if(blnReachedEnd&&(!EXIT_SUSPEND_IF_COMPLETED)){WriteToDebug("Reached End, overiding exit type to FINISH");ExitType=EXIT_TYPE_FINISH;}
if(objLMS.GetStatus()==LESSON_STATUS_PASSED&&EXIT_NORMAL_IF_PASSED==true){WriteToDebug("Passed status and config value set, overiding exit type to FINISH");ExitType=EXIT_TYPE_FINISH;}
if(!blnOverrodeTime){WriteToDebug("Did not override time");dtmEnd=new Date();AccumulateTime();objLMS.SaveTime(intAccumulatedMS);}
blnLoaded=false;WriteToDebug("Calling LMS Finish");return objLMS.Finish(ExitType,blnStatusWasSet);}
return true;}
function IsLoaded(){WriteToDebug("In IsLoaded, returning -"+blnLoaded);return blnLoaded;}
function WriteToDebug(strInfo){if(blnDebug){var dtm=new Date();var strLine;strLine=aryDebug.length+":"+dtm.toString()+" - "+strInfo;aryDebug[aryDebug.length]=strLine;if(winDebug&&!winDebug.closed){winDebug.document.write(strLine+"<br>\n");}}
return;}
function ShowDebugWindow(){if(winDebug&&!winDebug.closed){winDebug.close();}
winDebug=window.open("blank.html","Debug","width=600,height=300,resizable,scrollbars");winDebug.document.write(aryDebug.join("<br>\n"));winDebug.document.close();winDebug.focus();return;}
function DisplayError(strMessage){var blnShowDebug;WriteToDebug("In DisplayError, strMessage="+strMessage);blnShowDebug=confirm("An error has occured:\n\n"+strMessage+"\n\nPress 'OK' to view debug information to send to technical support.");if(blnShowDebug){ShowDebugWindow();}}
function GetLastError(){WriteToDebug("In GetLastError, intError="+intError);if(intError!=NO_ERROR){WriteToDebug("Returning API Error");return intError;}
else if(IsLoaded()&&objLMS.GetLastError()!=NO_ERROR){WriteToDebug("Returning LMS Error");return ERROR_LMS;}
WriteToDebug("Returning No Error");return NO_ERROR;}
function GetLastLMSErrorCode(){WriteToDebug("In GetLastLMSErrorCode, intError="+intError);var LMSError=objLMS.GetLastError();if(IsLoaded()&&LMSError!=NO_ERROR){WriteToDebug("Returning LMS Error: "+LMSError);return LMSError;}
WriteToDebug("Returning No Error");return NO_ERROR;}
function GetLastErrorDesc(){WriteToDebug("In GetLastErrorDesc");if(intError!=NO_ERROR){WriteToDebug("Returning API Error - "+strErrorDesc);return strErrorDesc;}
else if(IsLoaded()&&objLMS.GetLastError()!=NO_ERROR){WriteToDebug("returning LMS Error");return objLMS.GetLastErrorDesc;}
WriteToDebug("Returning No Error");return"";}
function SetErrorInfo(intErrorNumToSet,strErrorDescToSet){WriteToDebug("In SetErrorInfo - Num="+intErrorNumToSet+" Desc="+strErrorDescToSet);intError=intErrorNumToSet;strErrorDesc=strErrorDescToSet;}
function ClearErrorInfo(){WriteToDebug("In ClearErrorInfo");var intError=NO_ERROR;var strErrorDesc="";}
function CommitData(){WriteToDebug("In CommitData");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!blnOverrodeTime){WriteToDebug("Did not override time, saving incremental time");dtmEnd=new Date();AccumulateTime();dtmStart=new Date();objLMS.SaveTime(intAccumulatedMS);}
return objLMS.CommitData();}
function Suspend(){WriteToDebug("In Suspend");ClearErrorInfo();return ExecFinish(EXIT_TYPE_SUSPEND);}
function Finish(){WriteToDebug("In Finish");ClearErrorInfo();return ExecFinish(EXIT_TYPE_FINISH);}
function TimeOut(){WriteToDebug("In TimeOut");ClearErrorInfo();return ExecFinish(EXIT_TYPE_TIMEOUT);}
function Unload(){WriteToDebug("In Unload");ClearErrorInfo();return ExecFinish(DEFAULT_EXIT_TYPE);}
function SetReachedEnd(){WriteToDebug("In SetReachedEnd");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(blnStatusWasSet==false){objLMS.SetCompleted();}
blnReachedEnd=true;return true;}
function ConcedeControl()
{WriteToDebug("Conceding control with type: "+EXIT_BEHAVIOR);ClearErrorInfo();var contentRoot=null;var urlBase=null;switch(EXIT_BEHAVIOR)
{case"SCORM_RECOMMENDED":contentRoot=SearchParentsForContentRoot();if(contentRoot==window.top)
{Suspend();contentRoot.window.close();}
else
{Suspend();if(contentRoot!=null){if(IsAbsoluteUrl(EXIT_TARGET)){contentRoot.scormdriver_content.location.href=EXIT_TARGET;}else{urlBase=GetContentRootUrlBase(contentRoot);contentRoot.scormdriver_content.location.href=urlBase+EXIT_TARGET;}}}
break;case"ALWAYS_CLOSE":Suspend();window.close();break;case"ALWAYS_CLOSE_TOP":Suspend();window.top.close();break;case"NOTHING":Suspend();break;case"REDIR_CONTENT_FRAME":Suspend();contentRoot=SearchParentsForContentRoot();if(contentRoot!=null){if(IsAbsoluteUrl(EXIT_TARGET)){contentRoot.scormdriver_content.location.href=EXIT_TARGET;}else{urlBase=GetContentRootUrlBase(contentRoot);contentRoot.scormdriver_content.location.href=urlBase+EXIT_TARGET;}}
break;}
return true;}
function GetContentRootUrlBase(contentRoot){var urlParts=contentRoot.location.href.split("/");delete urlParts[urlParts.length-1];contentRoot=urlParts.join("/");return contentRoot;}
function SearchParentsForContentRoot(){var contentRoot=null;var wnd=window;var i=0;if(wnd.scormdriver_content){contentRoot=wnd;return contentRoot;}
while(contentRoot==null&&wnd!=window.top&&(i++<100)){if(wnd.scormdriver_content){contentRoot=wnd;return contentRoot;}
else{wnd=wnd.parent;}}
WriteToDebug("Unable to locate content root");return null;}
function GetStudentID(){WriteToDebug("In GetStudentID");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetStudentID();}
function GetStudentName(){WriteToDebug("In GetStudentName");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetStudentName();}
function GetBookmark(){WriteToDebug("In GetBookmark");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetBookmark();}
function SetBookmark(strBookmark){WriteToDebug("In SetBookmkar - strBookmark="+strBookmark);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.SetBookmark(strBookmark);}
function GetDataChunk(){WriteToDebug("In GetDataChunk");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetDataChunk();}
function SetDataChunk(strData){WriteToDebug("In SetDataChunk strData="+strData);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.SetDataChunk(strData);}
function GetLaunchData(){WriteToDebug("In GetLaunchData");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetLaunchData();}
function GetComments(){var strCommentString;var aryComments;var i;WriteToDebug("In GetComments");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return null;}
strCommentString=objLMS.GetComments();WriteToDebug("strCommentString="+strCommentString);strCommentString=new String(strCommentString);if(strCommentString!=""){aryComments=strCommentString.split(" | ");for(i=0;i<aryComments.length;i++){WriteToDebug("Returning Comment #"+i);aryComments[i]=new String(aryComments[i]);aryComments[i]=aryComments[i].replace(/\|\|/g,"|");WriteToDebug("Comment #"+i+"="+aryComments[i]);}}
else{aryComments=new Array(0);}
return aryComments;}
function WriteComment(strComment){var strExistingCommentString;WriteToDebug("In WriteComment strComment="+strComment);ClearErrorInfo();strComment=new String(strComment);if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strComment=strComment.replace(/\|/g,"||");strExistingCommentString=objLMS.GetComments();if(strExistingCommentString!=""&&strExistingCommentString!='undefined'){strComment=" | "+strComment;}
strComment=strComment;return objLMS.WriteComment(strComment);}
function GetLMSComments(){WriteToDebug("In GetLMSComments");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetLMSComments();}
function GetAudioPlayPreference(){WriteToDebug("In GetAudioPlayPreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return PREFERENCE_DEFAULT;}
return objLMS.GetAudioPlayPreference();}
function GetAudioVolumePreference(){WriteToDebug("GetAudioVolumePreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 100;}
return objLMS.GetAudioVolumePreference();}
function SetAudioPreference(PlayPreference,intPercentOfMaxVolume){WriteToDebug("In SetAudioPreference PlayPreference="+PlayPreference+" intPercentOfMaxVolume="+intPercentOfMaxVolume);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(PlayPreference!=PREFERENCE_OFF&&PlayPreference!=PREFERENCE_ON){WriteToDebug("Error Invalid PlayPreference");SetErrorInfo(ERROR_INVALID_PREFERENCE,"Invalid PlayPreference passed to SetAudioPreference, PlayPreference="+PlayPreference);return false;}
if(!ValidInteger(intPercentOfMaxVolume)){WriteToDebug("Error Invalid PercentOfMaxVolume - not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxVolume passed to SetAudioPreference (not an integer), intPercentOfMaxVolume="+intPercentOfMaxVolume);return false;}
intPercentOfMaxVolume=parseInt(intPercentOfMaxVolume,10);if(intPercentOfMaxVolume<1||intPercentOfMaxVolume>100){WriteToDebug("Error Invalid PercentOfMaxVolume - out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxVolume passed to SetAudioPreference (must be between 1 and 100), intPercentOfMaxVolume="+intPercentOfMaxVolume);return false;}
WriteToDebug("Calling to LMS");return objLMS.SetAudioPreference(PlayPreference,intPercentOfMaxVolume);}
function GetLanguagePreference(){WriteToDebug("In GetLanguagePreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetLanguagePreference();}
function SetLanguagePreference(strLanguage){WriteToDebug("In SetLanguagePreference strLanguage="+strLanguage);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.SetLanguagePreference(strLanguage);}
function GetSpeedPreference(){WriteToDebug("In GetSpeedPreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 100;}
return objLMS.GetSpeedPreference();}
function SetSpeedPreference(intPercentOfMax){WriteToDebug("In SetSpeedPreference intPercentOfMax="+intPercentOfMax);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!ValidInteger(intPercentOfMax)){WriteToDebug("ERROR Invalid Percent of MaxSpeed, not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxSpeed passed to SetSpeedPreference (not an integer), intPercentOfMax="+intPercentOfMax);return false;}
intPercentOfMax=parseInt(intPercentOfMax,10);if(intPercentOfMax<0||intPercentOfMax>100){WriteToDebug("ERROR Invalid Percent of MaxSpeed, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxSpeed passed to SetSpeedPreference (must be between 1 and 100), intPercentOfMax="+intPercentOfMax);return false;}
WriteToDebug("Calling to LMS");return objLMS.SetSpeedPreference(intPercentOfMax);}
function GetTextPreference(){WriteToDebug("In GetTextPreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetTextPreference();}
function SetTextPreference(intPreference){WriteToDebug("In SetTextPreference intPreference="+intPreference);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(intPreference!=PREFERENCE_DEFAULT&&intPreference!=PREFERENCE_OFF&&intPreference!=PREFERENCE_ON){WriteToDebug("Error - Invalid Preference");SetErrorInfo(ERROR_INVALID_PREFERENCE,"Invalid Preference passed to SetTextPreference, intPreference="+intPreference);return false;}
return objLMS.SetTextPreference(intPreference);}
function GetPreviouslyAccumulatedTime(){WriteToDebug("In GetPreviouslyAccumulatedTime");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetPreviouslyAccumulatedTime();}
function AccumulateTime(){WriteToDebug("In AccumulateTime dtmStart="+dtmStart+" dtmEnd="+dtmEnd+" intAccumulatedMS="+intAccumulatedMS);if(dtmEnd!=null&&dtmStart!=null){WriteToDebug("Accumulating Time");intAccumulatedMS+=(dtmEnd.getTime()-dtmStart.getTime());WriteToDebug("intAccumulatedMS="+intAccumulatedMS);}}
function GetSessionAccumulatedTime(){WriteToDebug("In GetSessionAccumulatedTime");ClearErrorInfo();WriteToDebug("Setting dtmEnd to now");dtmEnd=new Date();WriteToDebug("Accumulating Time");AccumulateTime();if(dtmStart!=null){WriteToDebug("Resetting dtmStart");dtmStart=new Date();}
WriteToDebug("Setting dtmEnd to null");dtmEnd=null;WriteToDebug("Returning "+intAccumulatedMS);return intAccumulatedMS;}
function SetSessionTime(intMilliseconds){WriteToDebug("In SetSessionTime");ClearErrorInfo();if(!ValidInteger(intMilliseconds)){WriteToDebug("ERROR parameter is not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMilliseconds passed to SetSessionTime (not an integer), intMilliseconds="+intMilliseconds);return false;}
intMilliseconds=parseInt(intMilliseconds,10);if(intMilliseconds<0){WriteToDebug("Error, parameter is less than 0");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMilliseconds passed to SetSessionTime (must be greater than 0), intMilliseconds="+intMilliseconds);return false;}
blnOverrodeTime=true;intTimeOverrideMS=intMilliseconds;objLMS.SaveTime(intTimeOverrideMS);return true;}
function PauseTimeTracking(){WriteToDebug("In PauseTimeTracking");ClearErrorInfo();WriteToDebug("Setting dtmEnd to now");dtmEnd=new Date();WriteToDebug("Accumulating Time");AccumulateTime();WriteToDebug("Setting Start and End times to null");dtmStart=null;dtmEnd=null;return true;}
function ResumeTimeTracking(){WriteToDebug("In ResumeTimeTracking");ClearErrorInfo();WriteToDebug("Setting dtmStart to now");dtmStart=new Date();return true;}
function GetMaxTimeAllowed(){WriteToDebug("In GetMaxTimeAllowed");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return MAX_CMI_TIME;}
return objLMS.GetMaxTimeAllowed();}
function DisplayMessageOnTimeout(){WriteToDebug("In DisplayMessageOnTimeOut");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.DisplayMessageOnTimeout();}
function ExitOnTimeout(){WriteToDebug("In ExitOnTimeOut");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.ExitOnTimeout();}
function GetPassingScore(){WriteToDebug("In GetPassingScore");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetPassingScore();}
function GetScore(){WriteToDebug("In GetScore");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetScore();}
function GetScaledScore(){WriteToDebug("In GetScaledScore");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetScaledScore();}
function SetScore(intScore,intMaxScore,intMinScore){WriteToDebug("In SetScore, intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!IsValidDecimal(intScore)){WriteToDebug("ERROR - intScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (not a valid decimal), intScore="+intScore);return false;}
if(!IsValidDecimal(intMaxScore)){WriteToDebug("ERROR - intMaxScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (not a valid decimal), intMaxScore="+intMaxScore);return false;}
if(!IsValidDecimal(intMinScore)){WriteToDebug("ERROR - intMinScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (not a valid decimal), intMinScore="+intMinScore);return false;}
WriteToDebug("Converting SCORES to floats");intScore=parseFloat(intScore);intMaxScore=parseFloat(intMaxScore);intMinScore=parseFloat(intMinScore);if(strLMSStandard=='SCORM')
{WriteToDebug("DEBUG - SCORM 1.2 so checking max score length");if(intScore<0||intScore>100){WriteToDebug("ERROR - intScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (must be between 0-100), intScore="+intScore);return false;}
if(intMaxScore<0||intMaxScore>100){WriteToDebug("ERROR - intMaxScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (must be between 0-100), intMaxScore="+intMaxScore);return false;}
if(intMinScore<0||intMinScore>100){WriteToDebug("ERROR - intMinScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (must be between 0-100), intMinScore="+intMinScore);return false;}}
if(SCORE_CAN_ONLY_IMPROVE===true){var previousScore=GetScore();if(previousScore!=null&&previousScore!=""&&previousScore>intScore){WriteToDebug("Previous score was greater than new score, configuration only allows scores to improve, returning.");return true;}}
WriteToDebug("Calling to LMS");return objLMS.SetScore(intScore,intMaxScore,intMinScore);}
function SetPointBasedScore(intScore,intMaxScore,intMinScore){WriteToDebug("In SetPointBasedScore, intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!IsValidDecimal(intScore)){WriteToDebug("ERROR - intScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (not a valid decimal), intScore="+intScore);return false;}
if(!IsValidDecimal(intMaxScore)){WriteToDebug("ERROR - intMaxScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (not a valid decimal), intMaxScore="+intMaxScore);return false;}
if(!IsValidDecimal(intMinScore)){WriteToDebug("ERROR - intMinScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (not a valid decimal), intMinScore="+intMinScore);return false;}
WriteToDebug("Converting SCORES to floats");intScore=parseFloat(intScore);intMaxScore=parseFloat(intMaxScore);intMinScore=parseFloat(intMinScore);if(strLMSStandard=='SCORM')
{if(intScore<0||intScore>100){WriteToDebug("ERROR - intScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (must be between 0-100), intScore="+intScore);return false;}
if(intMaxScore<0||intMaxScore>100){WriteToDebug("ERROR - intMaxScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (must be between 0-100), intMaxScore="+intMaxScore);return false;}
if(intMinScore<0||intMinScore>100){WriteToDebug("ERROR - intMinScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (must be between 0-100), intMinScore="+intMinScore);return false;}}
if(SCORE_CAN_ONLY_IMPROVE===true){var previousScore=GetScore();if(previousScore!=null&&previousScore!=""&&previousScore>intScore){WriteToDebug("Previous score was greater than new score, configuration only allows scores to improve, returning.");return true;}}
WriteToDebug("Calling to LMS");return objLMS.SetPointBasedScore(intScore,intMaxScore,intMinScore);}
function CreateResponseIdentifier(strShort,strLong){if(strShort.replace(" ","")==""){WriteToDebug("Short Identifier is empty");SetErrorInfo(ERROR_INVALID_ID,"Invalid short identifier, strShort="+strShort);return false;}
if(strShort.length!=1){WriteToDebug("ERROR - Short Identifier  not 1 character");SetErrorInfo(ERROR_INVALID_ID,"Invalid short identifier, strShort="+strShort);return false;}
if(!IsAlphaNumeric(strShort)){WriteToDebug("ERROR - Short Identifier  not alpha numeric");SetErrorInfo(ERROR_INVALID_ID,"Invalid short identifier, strShort="+strShort);return false;}
strShort=strShort.toLowerCase();strLong=CreateValidIdentifier(strLong);return new ResponseIdentifier(strShort,strLong);}
function ResponseIdentifier(strShort,strLong){this.Short=new String(strShort);this.Long=new String(strLong);this.toString=function(){return"[Response Identifier "+this.Short+", "+this.Long+"]";};}
function MatchingResponse(source,target){if(source.constructor==String){source=CreateResponseIdentifier(source,source);}
if(target.constructor==String){target=CreateResponseIdentifier(target,target);}
this.Source=source;this.Target=target;this.toString=function(){return"[Matching Response "+this.Source+", "+this.Target+"]";};}
function CreateMatchingResponse(pattern)
{var aryPairs=new Array();var aryEachPair=new Array();pattern=new String(pattern);aryPairs=pattern.split("[,]");for(var i=0;i<aryPairs.length;i++)
{var thisPair=new String(aryPairs[i]);aryEachPair=thisPair.split("[.]");WriteToDebug("Matching Response ["+i+"]  source: "+aryEachPair[0]+"  target: "+aryEachPair[1]);aryPairs[i]=new MatchingResponse(aryEachPair[0],aryEachPair[1]);}
WriteToDebug("pattern: "+pattern+" becomes "+aryPairs[0]);if(aryPairs.length==0)return aryPairs[0];else return aryPairs;}
function CreateValidIdentifier(str){if(str!=null||str!=""){str=new String(str);str=Trim(str);if(str.toLowerCase().indexOf("urn:")==0){str=str.substr(4);}
str=str.replace(/[^\w\-\(\)\+\.\:\=\@\;\$\_\!\*\'\%]/g,"_");return str;}else{return"";}}
function Trim(str){str=str.replace(/^\s*/,"");str=str.replace(/\s*$/,"");return str;}
function RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordTrueFalseInteraction strID="+strID+", blnResponse="+blnResponse+", blnCorrect="+blnCorrect+", blnCorrectResponse="+blnCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(blnResponse!=true&&blnResponse!=false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The Response parameter must be a valid boolean value.");return false;}
if(blnCorrectResponse!=null&&blnCorrectResponse!=true&&blnCorrectResponse!=false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The Correct Response parameter must be a valid boolean value or null.");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordMultipleChoiceInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordMultipleChoiceInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strID=new String(strID);var aryResponse;var aryCorrectResponse;if(response.constructor==String){aryResponse=new Array();var responseIdentifier=CreateResponseIdentifier(response,response);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
aryResponse[0]=responseIdentifier;}
else if(response.constructor==ResponseIdentifier){aryResponse=new Array();aryResponse[0]=response;}
else if(response.constructor==Array||response.constructor.toString().search("Array")>0){aryResponse=response;}
else if(window.console&&response.constructor.toString()=='(Internal Function)'&&response.length>0){aryResponse=response;}
else{if(window.console){window.console.log("ERROR_INVALID_INTERACTION_RESPONSE :: The response is not in the correct format.");}
SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse!=null&&correctResponse!=undefined&&correctResponse!=""){if(correctResponse.constructor==String){aryCorrectResponse=new Array();responseIdentifier=CreateResponseIdentifier(correctResponse,correctResponse);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}
aryCorrectResponse[0]=responseIdentifier;}
else if(correctResponse.constructor==ResponseIdentifier){aryCorrectResponse=new Array();aryCorrectResponse[0]=correctResponse;}
else if(correctResponse.constructor==Array||correctResponse.constructor.toString().search("Array")>0){aryCorrectResponse=correctResponse;}
else if(window.console&&correctResponse.constructor.toString()=='(Internal Function)'&&correctResponse.length>0){aryCorrectResponse=correctResponse;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}}
else{aryCorrectResponse=new Array();}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordMultipleChoiceInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordFillInInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordMatchingInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordMatchingInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var aryResponse;var aryCorrectResponse;if(response.constructor==MatchingResponse){aryResponse=new Array();aryResponse[0]=response;}
else if(response.constructor==Array||response.constructor.toString().search("Array")>0){aryResponse=response;}
else if(window.console&&response.constructor.toString()=='(Internal Function)'&&response.length>0){aryResponse=response;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse!=null&&correctResponse!=undefined){if(correctResponse.constructor==MatchingResponse){aryCorrectResponse=new Array();aryCorrectResponse[0]=correctResponse;}
else if(correctResponse.constructor==Array||correctResponse.constructor.toString().search("Array")>0){aryCorrectResponse=correctResponse;}
else if(window.console&&correctResponse.constructor.toString()=='(Internal Function)'&&correctResponse.length>0){aryCorrectResponse=correctResponse;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}}
else{aryCorrectResponse=new Array();}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordMatchingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordPerformanceInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordSequencingInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordSequencingInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var aryResponse;var aryCorrectResponse;if(response.constructor==String){aryResponse=new Array();var responseIdentifier=CreateResponseIdentifier(response,response);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
aryResponse[0]=responseIdentifier;}
else if(response.constructor==ResponseIdentifier){aryResponse=new Array();aryResponse[0]=response;}
else if(response.constructor==Array||response.constructor.toString().search("Array")>0){aryResponse=response;}
else if(window.console&&response.constructor.toString()=='(Internal Function)'&&response.length>0){aryResponse=response;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse!=null&&correctResponse!=undefined&&correctResponse!=""){if(correctResponse.constructor==String){aryCorrectResponse=new Array();responseIdentifier=CreateResponseIdentifier(correctResponse,correctResponse);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}
aryCorrectResponse[0]=responseIdentifier;}
else if(correctResponse.constructor==ResponseIdentifier){aryCorrectResponse=new Array();aryCorrectResponse[0]=correctResponse;}
else if(correctResponse.constructor==Array||correctResponse.constructor.toString().search("Array")>0){aryCorrectResponse=correctResponse;}
else if(window.console&&correctResponse.constructor.toString()=='(Internal Function)'&&correctResponse.length>0){aryCorrectResponse=correctResponse;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}}
else{aryCorrectResponse=new Array();}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordSequencingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordLikertInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordLikertInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var riResponse;var riCorrectResponse;if(response.constructor==String){riResponse=CreateResponseIdentifier(response,response);}
else if(response.constructor==ResponseIdentifier){riResponse=response;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse==null||correctResponse==undefined){riCorrectResponse=null;}
else if(correctResponse.constructor==ResponseIdentifier){riCorrectResponse=correctResponse;}
else if(correctResponse.constructor==String){riCorrectResponse=CreateResponseIdentifier(correctResponse,correctResponse);}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordLikertInteraction(strID,riResponse,blnCorrect,riCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordNumericInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!IsValidDecimal(strResponse)){WriteToDebug("ERROR - Invalid Response, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Response passed to RecordNumericInteraction (not a valid decimal), strResponse="+strResponse);return false;}
if(strCorrectResponse!=undefined&&strCorrectResponse!=null&&IsValidDecimal(strCorrectResponse)==false){WriteToDebug("ERROR - Invalid Correct Response, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Correct Response passed to RecordNumericInteraction (not a valid decimal), strCorrectResponse="+strCorrectResponse);return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function GetStatus(){WriteToDebug("In GetStatus");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return LESSON_STATUS_INCOMPLETE;}
return objLMS.GetStatus();}
function ResetStatus(){WriteToDebug("In ResetStatus");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
WriteToDebug("Setting blnStatusWasSet to false");blnStatusWasSet=false;return objLMS.ResetStatus();}
function GetProgressMeasure(){WriteToDebug("In GetProgressMeasure");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return LESSON_STATUS_INCOMPLETE;}
return objLMS.GetProgressMeasure();}
function SetProgressMeasure(numMeasure){WriteToDebug("In SetProgressMeasure, passing in: "+numMeasure);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return LESSON_STATUS_INCOMPLETE;}
return objLMS.SetProgressMeasure(numMeasure);}
function SetPassed(){WriteToDebug("In SetPassed");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
WriteToDebug("Setting blnStatusWasSet to true");blnStatusWasSet=true;return objLMS.SetPassed();}
function SetFailed(){WriteToDebug("In SetFailed");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
WriteToDebug("Setting blnStatusWasSet to true");blnStatusWasSet=true;return objLMS.SetFailed();}
function GetEntryMode(){WriteToDebug("In GetEntryMode");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return ENTRY_FIRST_TIME;}
return objLMS.GetEntryMode();}
function GetLessonMode(){WriteToDebug("In GetLessonMode");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return MODE_NORMAL;}
return objLMS.GetLessonMode();}
function GetTakingForCredit(){WriteToDebug("In GetTakingForCredit");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetTakingForCredit();}
function SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){WriteToDebug("In SetObjectiveScore, intObjectiveID="+strObjectiveID+", intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveScore (must have a value), strObjectiveID="+strObjectiveID);return false;}
if(!IsValidDecimal(intScore)){WriteToDebug("ERROR - Invalid Score, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetObjectiveScore (not a valid decimal), intScore="+intScore);return false;}
if(!IsValidDecimal(intMaxScore)){WriteToDebug("ERROR - Invalid Max Score, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetObjectiveScore (not a valid decimal), intMaxScore="+intMaxScore);return false;}
if(!IsValidDecimal(intMinScore)){WriteToDebug("ERROR - Invalid Min Score, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetObjectiveScore (not a valid decimal), intMinScore="+intMinScore);return false;}
WriteToDebug("Converting Scores to floats");intScore=parseFloat(intScore);intMaxScore=parseFloat(intMaxScore);intMinScore=parseFloat(intMinScore);if(intScore<0||intScore>100){WriteToDebug("ERROR - Invalid Score, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetObjectiveScore (must be between 0-100), intScore="+intScore);return false;}
if(intMaxScore<0||intMaxScore>100){WriteToDebug("ERROR - Invalid Max Score, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetObjectiveScore (must be between 0-100), intMaxScore="+intMaxScore);return false;}
if(intMinScore<0||intMinScore>100){WriteToDebug("ERROR - Invalid Min Score, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetObjectiveScore (must be between 0-100), intMinScore="+intMinScore);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore);}
function SetObjectiveStatus(strObjectiveID,Lesson_Status){WriteToDebug("In SetObjectiveStatus strObjectiveID="+strObjectiveID+", Lesson_Status="+Lesson_Status);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveStatus (must have a value), strObjectiveID="+strObjectiveID);return false;}
if((Lesson_Status!=LESSON_STATUS_PASSED)&&(Lesson_Status!=LESSON_STATUS_COMPLETED)&&(Lesson_Status!=LESSON_STATUS_FAILED)&&(Lesson_Status!=LESSON_STATUS_INCOMPLETE)&&(Lesson_Status!=LESSON_STATUS_BROWSED)&&(Lesson_Status!=LESSON_STATUS_NOT_ATTEMPTED)){WriteToDebug("ERROR - Invalid Status");SetErrorInfo(ERROR_INVALID_STATUS,"Invalid status passed to SetObjectiveStatus, Lesson_Status="+Lesson_Status);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveStatus(strObjectiveID,Lesson_Status);}
function GetObjectiveStatus(strObjectiveID){WriteToDebug("In GetObjectiveStatus, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveStatus(strObjectiveID);}
function SetObjectiveDescription(strObjectiveID,strObjectiveDescription){WriteToDebug("In SetObjectiveDescription strObjectiveID="+strObjectiveID+", strObjectiveDescription="+strObjectiveDescription);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveStatus (must have a value), strObjectiveID="+strObjectiveID);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveDescription(strObjectiveID,strObjectiveDescription);}
function GetObjectiveDescription(strObjectiveID){WriteToDebug("In GetObjectiveDescription, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveDescription(strObjectiveID);}
function GetObjectiveScore(strObjectiveID){WriteToDebug("In GetObjectiveScore, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveScore(strObjectiveID);}
function IsLmsPresent(){return blnLmsPresent;}
function SetObjectiveProgressMeasure(strObjectiveID,strObjectiveProgressMeasure){WriteToDebug("In SetObjectiveProgressMeasure strObjectiveID="+strObjectiveID+", strObjectiveProgressMeasure="+strObjectiveProgressMeasure);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveProgressMeasure (must have a value), strObjectiveID="+strObjectiveID);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveProgressMeasure(strObjectiveID,strObjectiveProgressMeasure);}
function GetObjectiveProgressMeasure(strObjectiveID){WriteToDebug("In GetObjectiveProgressMeasure, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveProgressMeasure(strObjectiveID);}
function GetInteractionType(strInteractionID)
{WriteToDebug("In GetInteractionType, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionType(strInteractionID);}
function GetInteractionTimestamp(strInteractionID)
{WriteToDebug("In GetInteractionTimestamp, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionTimestamp(strInteractionID);}
function GetInteractionCorrectResponses(strInteractionID)
{WriteToDebug("In GetInteractionCorrectResponses, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionCorrectResponses(strInteractionID);}
function GetInteractionWeighting(strInteractionID)
{WriteToDebug("In GetInteractionWeighting, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionWeighting(strInteractionID);}
function GetInteractionLearnerResponses(strInteractionID)
{WriteToDebug("In GetInteractionLearnerResponses, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionLearnerResponses(strInteractionID);}
function GetInteractionResult(strInteractionID)
{WriteToDebug("In GetInteractionResult, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionResult(strInteractionID);}
function GetInteractionLatency(strInteractionID)
{WriteToDebug("In GetInteractionLatency, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionLatency(strInteractionID);}
function GetInteractionDescription(strInteractionID)
{WriteToDebug("In GetInteractionDescription, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionDescription(strInteractionID);}
function CreateDataBucket(strBucketId,intMinSize,intMaxSize){WriteToDebug("In CreateDataBucket, strBucketId="+strBucketId+", intMinSize="+intMinSize+", intMaxSize="+intMaxSize);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to CreateDataBucket (must have a value), strBucketId="+strBucketId);return false;}
if(!ValidInteger(intMinSize)){WriteToDebug("ERROR Invalid Min Size, not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMinSize passed to CreateDataBucket (not an integer), intMinSize="+intMinSize);return false;}
if(!ValidInteger(intMaxSize)){WriteToDebug("ERROR Invalid Max Size, not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMaxSize passed to CreateDataBucket (not an integer), intMaxSize="+intMaxSize);return false;}
intMinSize=parseInt(intMinSize,10);intMaxSize=parseInt(intMaxSize,10);if(intMinSize<0){WriteToDebug("ERROR Invalid Min Size, must be greater than or equal to 0");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Size passed to CreateDataBucket (must be greater than or equal to 0), intMinSize="+intMinSize);return false;}
if(intMaxSize<=0){WriteToDebug("ERROR Invalid Max Size, must be greater than 0");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Size passed to CreateDataBucket (must be greater than 0), intMaxSize="+intMaxSize);return false;}
intMinSize=(intMinSize*2);intMaxSize=(intMaxSize*2);return objLMS.CreateDataBucket(strBucketId,intMinSize,intMaxSize);}
function GetDataFromBucket(strBucketId){WriteToDebug("In GetDataFromBucket, strBucketId="+strBucketId);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to GetDataFromBucket (must have a value), strBucketId="+strBucketId);return false;}
return objLMS.GetDataFromBucket(strBucketId);}
function PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("In PutDataInBucket, strBucketId="+strBucketId+", blnAppendToEnd="+blnAppendToEnd+", strData="+strData);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to PutDataInBucket (must have a value), strBucketId="+strBucketId);return false;}
if(blnAppendToEnd!=true){WriteToDebug("blnAppendToEnd was not explicitly true so setting it to false, blnAppendToEnd="+blnAppendToEnd);blnAppendToEnd=false;}
return objLMS.PutDataInBucket(strBucketId,strData,blnAppendToEnd);}
function DetectSSPSupport(){return objLMS.DetectSSPSupport();}
function GetBucketInfo(strBucketId){WriteToDebug("In GetBucketInfo, strBucketId="+strBucketId);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to GetBucketInfo (must have a value), strBucketId="+strBucketId);return false;}
var bucketInfo=objLMS.GetBucketInfo(strBucketId);bucketInfo.TotalSpace=(bucketInfo.TotalSpace/2);bucketInfo.UsedSpace=(bucketInfo.UsedSpace/2);WriteToDebug("GetBucketInfo returning "+bucketInfo);return bucketInfo;}
function SSPBucketSize(totalSpace,usedSpace){this.TotalSpace=totalSpace;this.UsedSpace=usedSpace;this.toString=function(){return"[SSPBucketSize "+this.TotalSpace+", "+this.UsedSpace+"]";};}