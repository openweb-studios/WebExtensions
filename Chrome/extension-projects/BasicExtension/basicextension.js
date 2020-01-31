
// let queryInfo =
// chrome.tabs.query(object queryInfo, function callback)


tabs = {};
tabIds = [];

focusedWindowId = undefined;
currentWindowId = undefined;

function bootStrap() {
  chrome.windows.getCurrent(function(currentWindow) {
    currentWindowId = currentWindow.id;
    chrome.windows.getLastFocused(function(focusedWindow) {
      focusedWindowId = focusedWindow.id;
      loadWindowList();
    });
  });
}

function isInt(i) {
  return (typeof i == "number") && !(i % 1) && !isNaN(i);
}

function loadWindowList() {
  chrome.windows.getAll({ populate: true }, function(windowList) {
    tabs = {};
    tabIds = [];

    // caonsole.log(JSON.stringify(windowList, null, '\t'));
    for (var i = 0; i < windowList.length; i++) {
      let window_i = windowList[i];
      // console.log(JSON.stringify());

      // windowList[i].current = (windowList[i].id == currentWindowId);
      // windowList[i].focused = (windowList[i].id == focusedWindowId);
      //
      if (window_i.focused) {
        for (var j = 0; j < windowList[i].tabs.length; j++) {
          let tab = windowList[i].tabs[j];
          let tabUrl = JSON.stringify(tab.url);
          let tabTitle = JSON.stringify(tab.title);

          console.log("tab.url: " + tabUrl);
          // console.log("tab.title: " + tabTitle);
          // tabIds[tabIds.length] = tab.id;
          // tabs[windowList[i].tabs[j].id] = windowList[i].tabs[j];
        }
      }
    }
    // var input = new JsExprContext(windowList);
    // var output = document.getElementById('windowList');
    // jstProcess(input, output);
  });
}

// console.log("running extension....");
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log(tabs);
//     tabs.forEach(tab => console.log("tab: " + JSON.stringify(tab)));
//
//     // var input = new JsExprContext(tabs[0]);
//     // var output = document.getElementById('tab_' + tabs[0].id);
//     // jstProcess(input, output);
//     // appendToLog(
//     //     'selected tab refreshed -- tabId: ' + tabs[0].id +
//     //     ' url:' + tabs[0].url);
//   });
//
// alert("hello world");

document.addEventListener('DOMContentLoaded', function() {
  bootStrap();
});
