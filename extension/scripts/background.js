chrome.browserAction.onClicked.addListener(function (activeTab) {
  chrome.tabs.create({ url: 'https://socialclub.rockstargames.com/games/gtav/pc/career/vehicles/gtaonline/super' })
});