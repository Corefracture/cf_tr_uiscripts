/*name: Cf - TestRail API Functions
description: Global UIScript access for API functions
author: corefracture
version: 1.0
includes:
excludes:

js:*/

/*
See: https://github.com/Corefracture/cf_tr_uiscripts for further information. See LICENSE file before use!
*/


//TODO: cf: Proper/Better error handling on failed AP
/**
 * Generic JQuery AJAX call to perform the API calls
 * @param url_address
 * @param payload
 * @param onSuccess
 * @param onError
 * @param method
 */
function api_call(url_address, payload, onSuccess, onError, method)
{
    $.ajax(
        {
            url: url_address,
            dataType: 'json',
            data: payload,
            type: method,
            processData: false,
            beforeSend: function(xhr, settings)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(data, status, xhr) {
                onSuccess(data);
            },
            error: function(error) {
                onError(error);
            }
        });
}

function get_case(caseId, onSuccess, onFail)
{
    api_call('index.php?api/v2/get_case/' + caseId,
        undefined,
        onSuccess,
        onFail,
        "GET");
}

function update_case(caseId, updateData, onSuccess, onFail)
{
    api_call('index.php?api/v2/update_case/' + caseId,
        updateData,
        onSuccess,
        onFail,
        "POST");
}

