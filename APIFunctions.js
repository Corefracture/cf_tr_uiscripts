/*name: API Functions
description: Global UIScript access for API functions
author: Chris Coleman
version: 1.0
includes:
excludes:

js:*/

api_urls = {
    cases_get_case: 'index.php?api/v2/get_case/',
    update_case: 'index.php?api/v2/update_case/'
}
function api_call(url_address, payload, onSuccess, onError, method)
{
    $.ajax(
        {
            url: url_address,
            dataType: 'json',
            data: payload,
            type: method.toString(),
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

