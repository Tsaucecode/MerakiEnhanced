// ==UserScript==
// @name         Meraki Enhanced View
// @namespace    http://tampermonkey.net/
// @version      0.91
// @description  This script enhances the default Meraki ACL view to make it easier to use and prettier to look at
// @author       Tom Woods
// @match        https://*.meraki.com/*/manage/configure/acl
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meraki.com
// @grant        none
// @run-at document-start
// @require https://code.jquery.com/jquery-3.6.1.min.js
// ==/UserScript==

setInterval(function() {


// widen the headings
var theths = document.getElementsByTagName('th');
for (var j = 0; j < theths.length; j++) {
    if (theths[j].innerHTML == "Comment") {
        theths[j].width = "230px";
    }
}

var tableclass = document.getElementsByClassName('TableEditor__table')
tableclass[0].id="MerakiTableID";
var table = document.getElementById('MerakiTableID').style.borderCollapse = "collapse";
var breakcounter =0;

//get all the meraki rows and go through them all
var therows = document.getElementsByClassName('TableEditor__bodyRow');
for (var m = 0; m < therows.length; m++) {
    therows[m].style.borderBottom = "";
    //check the comment field in order to add breaks after ---
    var theinputs = therows[m].getElementsByTagName('input');
    for (var k = 0; k < theinputs.length; k++) {
        if (theinputs[k].name.includes("[comment]")) {
            theinputs[k].size = "70";//make it big!
            if (theinputs[k].value.includes("---")) {
                //therows[m].style.opacity="0.4";
                //therows[m].style.borderBottom = "30px solid rgb(236,236,236)";//lightgrey
                therows[m].style.borderBottom = "40px solid rgb(255,255,255)";
            }
        }
    } //end of commend field stuff
    //search through the allow/deny dropdown to colour the rows in red or green
    var policybuttons = therows[m].getElementsByClassName('labelFlexWrapper');
    for (var l = 0; l < policybuttons.length; l++) {
    if (policybuttons[l].innerHTML.includes("Allow")) {
        therows[m].style.backgroundColor = "rgba(83, 168, 40,0.3)";
        }
    if (policybuttons[l].innerHTML.includes("Deny")) {
        therows[m].style.backgroundColor = "rgba(250, 83, 53,0.3)";
        }
    }
}


},4000);
