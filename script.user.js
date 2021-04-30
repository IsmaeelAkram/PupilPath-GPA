// ==UserScript==
// @name         PupilPath Dashboard Average Calculator
// @version      1.0
// @description  Calculate your GPA straight from the PupilPath dashboard.
// @author       Ismaeel Akram
// @match        https://pupilpath.skedula.com/Home/Dashboard/
// @updateURL    https://github.com/IsmaeelAkram/PupilPath-GPA/raw/main/script.user.js
// @icon         https://www.google.com/s2/favicons?domain=skedula.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
    document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};
    document.removeElementsByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); for ( var i = 0 ; i < a.snapshotLength ; i++ ) { a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i)); } };


    window.addEventListener('load', function() {
        var averageText = document.createElement("h3");
        averageText.innerText = "GPA: Loading... / 4.00";
        document.getElementsByClassName("content-box-content")[0].appendChild(averageText);

        var table = document.getElementByXPath('//*[@id="progress-card"]/tbody');
        var classEntries = table.children;

        var grades = [];
        for (var classEntry of classEntries) {
            var classGrade = parseFloat(classEntry.children[4].innerText.replace("MP1: ", "").trim())
            if(!Number.isNaN(classGrade)) {
                grades.push(classGrade);
            }
        };
        var totalGrade = 0.0;
        for (var grade of grades) {
            totalGrade += grade;
        }
        totalGrade = (totalGrade / grades.length).toFixed(2);

        averageText.innerText = `GPA: ${totalGrade} / 100`;
    })
})();
