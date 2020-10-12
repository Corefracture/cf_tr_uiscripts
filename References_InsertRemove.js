/*name: References - Insert / Remove
description: Allows for the insertion or removal of references from groups of test cases - Requires the API functions support JS lib from corefracture
author: corefracture (Chris Coleman) - MIT License
version: 1.0
includes: ^suites/view
excludes:

js:*/

function getEditDropdown()
{
//    let editDropdown = document.getElementById("editDropdown");
//    let dropdownUl = editDropdown.firstElementChild;
//    let firstSep = dropdownUl.

}

$(document).ready(
    function() {
        //Add Edit buttons
        getEditDropdown();
    }
);

function showInsertRefDialog()
{
    let win;
    win = new CFUIScriptsDialog("Insert References",
        "This tool will insert the provided reference to the selected test cases without altering the existing references on those cases. ",
        {refToInsert: {type:CFDiagConTypes.TEXT, lbl:"Reference To Insert:"}},
        function(){doInsertRefWork(win)})
}

function getRefFromDiag(diagWin)
{
        return diagWin.getControl("refToInsert").value;
}

function doInsertRefWork(diagWin)
{
    let selected_cases = App.Tables.getSelected();
    let refToInsert = getRefFromDiag(diagWin);

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
                updateCaseRefs(diagWin, c.toString(), c_data.refs, refToInsert)

            },
            function (e_data) {
                diagWin.addLogLine("Failed to update case: " + c.toString() + " Err: " + e_data);
            });
    }
}

function updateCaseRefs(diagWin, caseId, existingRefs, ref, remove=false)
{
    refs = existingRefs.split(',')
    for(r of refs)
    {
        if(r.trim() === ref)
        {
            diagWin.addLogLine("SKIPPING case: " + caseId + "! Already contains: " + ref);
            return;
        }
    }
    diagWin.addLogLine("Updating case: " + caseId + " with ref: " + ref);

    existingRefs += ", " + ref;

    update_case(caseId, JSON.stringify({"refs": existingRefs}),
        function(s_data)
    {
        diagWin.addLogLine("Updated case: " + caseId + "! New refs: " + existingRefs);
    },
    function (e_data) {
        diagWin.addLogLine("FAILED to update case: " + caseId + " Err: " + e_data);
    });
}

