// create a listener that change chrome.storage.local.get("hideRetweets") to true or false when the toggle is clicked
let hideRetweetsCheckbox = document.getElementById("hideRetweetsCheckbox");
let hideSelfRepliesCheckbox = document.getElementById("hideSelfRepliesCheckbox");
let enableOnHomepageCheckbox = document.getElementById("enableOnHomepageCheckbox");

chrome.storage.sync.get('hideRetweets', storage => {
  hideRetweetsCheckbox.checked = storage.hideRetweets;
});

hideRetweetsCheckbox.addEventListener("click", () => {
  chrome.storage.sync.set({
    hideRetweets: hideRetweetsCheckbox.checked,
  });
  reloadCurrentTab();
});


chrome.storage.sync.get('hideSelfReplies', storage => {
  hideSelfRepliesCheckbox.checked = storage.hideSelfReplies;
});

hideSelfRepliesCheckbox.addEventListener("click", () => {  
  chrome.storage.sync.set({
    hideSelfReplies: hideSelfRepliesCheckbox.checked,
  });
  reloadCurrentTab();
});

chrome.storage.sync.get('enableOnHomepage', storage => {
  enableOnHomepageCheckbox.checked = storage.enableOnHomepage;
});

enableOnHomepageCheckbox.addEventListener("click", () => {  
    chrome.storage.sync.set({
      enableOnHomepage: enableOnHomepageCheckbox.checked,
    });
  reloadCurrentTab();
});

function reloadCurrentTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}


