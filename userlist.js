chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo == "showPageAction") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.pageAction.show(tabs[0].id)
        })
    }
})

chrome.runtime.sendMessage({todo: 'default'});
//get matched url's from localstorage to inject dataColor with username elements;
