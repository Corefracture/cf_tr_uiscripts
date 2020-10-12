/*name: Cf - UIScripts Custom Dialog
description: CF Dialog Helper for custom UIScripts
author: corefracture
version: 1.0
includes:
excludes:

js:*/

/*
See: https://github.com/Corefracture/cf_tr_uiscripts for further information. See LICENSE file before use!
*/

/**
 * The string containing the base html for the dialog
 * @type {string}
 */
const baseWin =
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
    '               class="form-control form-control-full textarea-with-grippie"></textarea>'  +
    '           </div>' +
    '       </div>  ';


/**
 * The available control types currently supported. More to come.
 */
const CFDiagConTypes = {
    TEXT: 1,
}

/**
 *  A dynamic and custom TestRail dialog. Takes an controls definition object to build the controls. Example:
 *  {controlName: {type:CFDiagConTypes.TEXT, lbl:"Controls label text:"}
 *  controlName: Object name, not a string
 *  type: The CFDiagConTypes control type.
 *  lbl: The string to display as a label next to the control
 */
class CFUIScriptsDialog {

    /**
     * Constructs a custom UI dialog using defined controls and a callback to execute
     * @param diagTitle - The string of the title
     * @param diagDescription - The string description of what this dialog instance is for
     * @param diagControls - Object: Example: {controlName: {type:CFDiagConTypes.TEXT, lbl:"Controls label text:"}
     * @param exeCmdCallback - Callback to call when operation is executed.
     */
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

    /**
     * Adds the controls provided in the constructor of this diag window instance
     * @param diagControls
     */
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

    /**
     * Re-enables the execute operation button
     */
    enableExeButton() {
        let exeButton =this.diag.find("#cf-uiscripts-dialog-exec")[0];
        exeButton.removeAttribute("disabled");
        exeButton.innerText = "Execute Operation!";
    }

    /**
     * Attempts to find and return the control use the provided ID
     * @param controlId - The ID of the control to find
     * @returns {*}
     */
    getControl(controlId) {
        return this.controls[controlId];
    }

    /**
     * Simply prepends an entry into the operation log.
     * TODO: cf: For future, switch to autoscrallong text box and append, not prepend
     * @param entry - The log entry string to prepend
     */
    addLogLine(entry) {
        this.log.value = entry + "\n" + this.log.value;
    }
}
