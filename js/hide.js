// save value if currently on twitter homepage
let onHomepage = false;

// get current url
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  if (obj.type === 'URL_CHANGE') {
      if (obj.url === "https://twitter.com/home") {
        onHomepage = true;
      }
  }
});

let enableOnHomepage = false;
chrome.storage.sync.get('enableOnHomepage', storage => {
  enableOnHomepage = storage.enableOnHomepage;
});

// get current value of hideRetweets and hideSelfReplies
let hideRetweets = false;
chrome.storage.sync.get('hideRetweets', storage => {
  hideRetweets = storage.hideRetweets;
  if (storage.hideRetweets) {
    hideAllRetweets();
  }
});

let hideSelfReplies = false;
chrome.storage.sync.get('hideSelfReplies', storage => {
  hideSelfReplies = storage.hideSelfReplies;
  if (storage.hideSelfReplies) {
    hideAllSelfReplies();
  }
});

// update on infinite scroll
const targetNode = document.body;
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    if (hideRetweets) {
      hideAllRetweets();
    }
  
    if (hideSelfReplies) {
      hideAllSelfReplies();
    }

};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// jquery to hide all retweets
// currently looks for the text "Retweeted" in the div
function hideAllRetweets() {
  if (!onHomepage || enableOnHomepage) {
    // Hide retweets, needs to be executed on every scroll event
    $('div:contains("Retweeted")').filter('[data-testid="cellInnerDiv"]').hide();
  }
}

// jquery to hide all self replies
function hideAllSelfReplies() {
  if (!onHomepage || enableOnHomepage) {
      // hide self replies 
    $("div[data-testid='cellInnerDiv']").has("div.css-1dbjc4n.r-1bnu78o.r-1p0dtai.r-1d2f490.r-1jgb5lz.r-u8s1d.r-zchlnj.r-ipm5af.r-m5arl1").hide();

    // hide thread bar on left side
    $("div[data-testid='cellInnerDiv']").has("div.css-1dbjc4n.r-1bnu78o.r-16y2uox.r-1jgb5lz.r-14gqq1x.r-m5arl1").hide();
  }
}

// $('div[data-testid="cellInnerDiv"]').filter(function() {
//   var prevDiv = $(this).prev('div');
//   return $(this).find('div.css-1dbjc4n.r-1bnu78o.r-16y2uox.r-1jgb5lz.r-14gqq1x.r-m5arl1').length > 0 && prevDiv.height() > 0;
// }).hide();


// $('div[data-testid="cellInnerDiv"]').filter(function() {
//   var prevDiv = $(this).prev('div');
//   return $(this).find('css-1dbjc4n r-1bnu78o r-1p0dtai r-1d2f490 r-1jgb5lz r-u8s1d r-zchlnj r-ipm5af r-m5arl1').length > 0 && prevDiv.height() > 0;
// }).hide();