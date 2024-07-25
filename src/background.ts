
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action == 'addDataLC') {
        fetch(`http://localhost:5000/add_lc/${request.username}`, {
            method: "POST",
        })
        .then(response => {
            if (response.ok) {
                sendResponse();
            } else {
                response.text().then(text => sendResponse({ error: text }));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ error: 'Failed to add LeetCode data' });
        });

        return true; // This is necessary to indicate that the response will be sent asynchronously.
    } else if (request.action == 'addDataCF') {
        fetch(`http://localhost:5000/add_cf/${request.username}`, {
            method: "POST",
        })
        .then(response => {
            if (response.ok) {
                sendResponse();
            } else {
                response.text().then(text => sendResponse({ error: text }));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ error: 'Failed to add Codeforces data' });
        });
        return true;
    } else if(request.action == 'getDataLC') {
        fetch(`http://localhost:5000/get_lc/${request.username}`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ error: 'Failed to get LeetCode data' });
        });
        return true;
    } else if(request.action == 'getDataCF') {
        fetch(`http://localhost:5000/get_cf/${request.username}`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ error: 'Failed to get LeetCode data' });
        });
        return true;
    }
});

chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.set({ cfUsername: '', lcUsername: '' });
});
