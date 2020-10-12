/*name: Cf - References - Insert / Remove
description: Allows for the insertion or removal of references from groups of test cases - Requires the API functions support JS lib from corefracture
author: corefracture (Chris Coleman) - MIT License
version: 1.0
includes: ^suites/view
excludes:

js:*/

/*
References_InsertRemove
Tool to allow for bulk adding/inserting and removing references from test cases that do not share like references

See: https://github.com/Corefracture/cf_tr_uiscripts for further information. See LICENSE file before use!
*/


/**
 * Adds the shortcut links to display the insert or remove references dialog win to the
 * Edit dropdown menuy found on the Test Cases tab within TestRail
 */
$(document).ready(
    function() {
        let editDropdown = document.getElementById("editDropdown");
        let dropdownUl = editDropdown.firstElementChild;
        dropdownUl.appendChild($('<li class=\"dropdown-menu-separator\"></li>')[0]);
        dropdownUl.appendChild($("<li><a class=\"dropdown-menu-link\" href=\"javascript:void(0)\" onClick=\"showInsertRefDialog()\">Insert Refs Into Selected</a></li>")[0]);
        dropdownUl.appendChild($('<li class=\"dropdown-menu-separator\"></li>')[0]);
        dropdownUl.appendChild($("<li><a class=\"dropdown-menu-link\" href=\"javascript:void(0)\" onClick=\"showRemoveRefDialog()\">Remove Refs From Selected</a></li>")[0]);
    }
);

/**
 * Creates and shows the dialog to insert references from selected cases
 */
function showInsertRefDialog()
{
    let win;
    win = new CFUIScriptsDialog("Insert References",
        "This tool will insert the provided reference to the selected test cases without altering the existing references on those cases. ",
        {targetRef: {type:CFDiagConTypes.TEXT, lbl:"Reference To Insert:"}},
        function(){startRefWork(win, false)})
}

/**
 * Creates and shows the dialog to remove references from selected cases
 */
function showRemoveRefDialog()
{
    let win;
    win = new CFUIScriptsDialog("Remove References",
        "This tool will remove the provided reference to the selected test cases without altering the existing references on those cases. ",
        {targetRef: {type:CFDiagConTypes.TEXT, lbl:"Reference To Remove:"}},
        function(){startRefWork(win, true)})
}

/**
 * Retrieves the references data from the dialog window to insert or remove
 * @param diagWin - The instance of CFUIScriptsDialog
 * @returns {*}
 */
function getRefFromDiag(diagWin)
{
    return diagWin.getControl("targetRef").value;
}

/**
 * Starts the work on the references using the selected test cases.
 * @param diagWin - The instance of CFUIScriptsDialog
 * @param remove - True/False - Should add or remove references
 */
function startRefWork(diagWin, remove)
{
    diagWin.addLogLine("----------------------");
    //Use TestRail app support to obtain selected test cases
    let selected_cases = App.Tables.getSelected();
    if(selected_cases.length === 0)
    {
        diagWin.addLogLine("No selected test cases found! Please select test cases to update with their selection checkbox!");
        diagWin.enableExeButton();
        return;
    }

    //Obtains the reference from the dialog win to add or remove
    let targetRef = getRefFromDiag(diagWin);
    if(targetRef.length === 0)
    {
        diagWin.addLogLine("No ref provided! Cannot continue!");
        diagWin.enableExeButton();
        return;
    }

    for(const c of selected_cases)
    {
        get_case(c.toString(),
            function(c_data) {
                curRefs = c_data.refs;
                if(curRefs === null)
                {
                    curRefs = "";
                }
                diagWin.addLogLine("Updating refs " + c_data.refs + " for case: " + c.toString());
                updateCaseRefs(diagWin, c.toString(), c_data.refs, targetRef, remove)

            },
            function (e_data) {
                diagWin.addLogLine("Failed to update case: " + c.toString() + " Err: " + e_data);
            });
    }

    diagWin.enableExeButton();
}

/**
 * Update the reference data for the test cases and commit the update (if valid) to the test case.
 * @param diagWin The instance of CFUIScriptsDialog
 * @param caseId The caseId being updated
 * @param existingRefs The references string retreived from the test case
 * @param ref The reference string to add or remove from the case!
 * @param remove True / False to add or remove the reference data from the test case
 */
function updateCaseRefs(diagWin, caseId, existingRefs, ref, remove)
{
    let refs = existingRefs.split(',');
    let idxToRem = -1;

    for(rIdx in refs)
    {
        let r = refs[rIdx].trim();
        if(r === ref) {
            if (!remove) {
                diagWin.addLogLine("SKIPPING case: " + caseId + "! Already contains: " + ref);
                diagWin.enableExeButton();
                return;
            } else {
                idxToRem = rIdx;
                break;
            }
        }
    }

    //Check if the reference is there to remove!
    if(remove && idxToRem === -1)
    {
        diagWin.addLogLine("SKIPPING case: " + caseId + "! Couldn't find " + ref + " to remove from refs!");
        diagWin.enableExeButton();
        return;
    }

    if(!remove) {
        //Add the reference
        existingRefs += ", " + ref;
    } else {
        //Remove the reference
        refs.splice(idxToRem, 1);
        existingRefs = refs.join(", ");
    }

    //Call to the Global UIScript for TestRail API functionality.
    //Requires the API functions support JS lib from corefracture!
    update_case(caseId, JSON.stringify({"refs": existingRefs}),
        function(s_data)
        {
            diagWin.addLogLine("Updated case: " + caseId + "! New refs: " + existingRefs);
        },
        function (e_data) {
            diagWin.addLogLine("FAILED to update case: " + caseId + " Err: " + e_data);
        });

}

