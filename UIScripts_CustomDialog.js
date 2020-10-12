/*name: Cf - UIScripts Custom Dialog
description: Dialog Helper for custom UIScripts
author: corefracture
version: 1.0
includes:
excludes:

js:*/

var baseWin =
    '<div class="dialog ui-dialog-content ui-widget-content"'  +
    '           style="width: 90%; display: block; min-height: 80px; height: auto; padding: 10px">'  +
    '           <div id="cf-uiscripts-dialog-desc"/><br/>' +
    '           <div id="cf-uiscripts-dialog-controls"/><br/>' +
    '           <button id="cf-uiscripts-dialog-exec">Execute Operation!</button>' +
    '           <hr/>' +
    '           <div>' +
    '               <label for="cf-uiscripts-dialog-log">Operation Log:</label>' +
    '               <textarea id="cf-uiscripts-dialog-log" readonly' +
    '               style="height: 200px; background-color: #f1f1f1;"' +
    '               class="form-control form-control-full textarea-with-grippie">Logs</textarea>'  +
    '           </div>' +
    '       </div>  ';


const CFDiagConTypes = {
    TEXT: 1,
}

class CFUIScriptsDialog {
    constructor(diagTitle, diagDescription, diagControls, exeCmdCallback) {
        this.diag = $(baseWin);
        this.log = this.diag.find("#cf-uiscripts-dialog-log")[0];
        this.controlsElem = this.diag.find("#cf-uiscripts-dialog-controls")[0];
        this.controls = {};
        let exeButton =this.diag.find("#cf-uiscripts-dialog-exec")[0];
        exeButton.addEventListener("click",
            function() {
            exeButton.setAttribute("disabled", "true");
            exeButton.innerText = "Executing! Watch log.";
            exeCmdCallback();
            });
        this.diag.find("#cf-uiscripts-dialog-desc")[0].innerText = diagDescription;
        this.addControls(diagControls);
        $(this.diag).dialog({title: diagTitle, width: 800});
    }

    addControls(diagControls) {
        for(const c in diagControls) {
            let newCon;
            switch(diagControls[c].type) {
                case CFDiagConTypes.TEXT:
                    newCon = document.createElement("input");
                    newCon.id = c.toString();
            }
            let lblElem = document.createElement("label");
            lblElem.innerText = diagControls[c].lbl;
            lblElem.setAttribute("for", c.toString());
            this.controlsElem.append(lblElem);
            this.controlsElem.append(newCon);
            this.controls[newCon.id] = newCon;
        }
    }

    getControl(controlId) {
        return this.controls[controlId];
    }

    addLogLine(entry) {
        let existing = this.log.value;
        this.log.value = entry + "\n" + existing ;
    }
}
