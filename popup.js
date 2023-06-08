document.addEventListener('DOMContentLoaded', function () {
  console.log('popup.js loaded');
  // console.log($('#video'));

  const array = ["english", "buttons", "fillpasswords"]
  array.forEach(function (item, index) {
    // console.log(item, index);
    chrome.storage.sync.get([item], function (result) {
      console.log(item + ' currently is ' + result[item]);
      console.log(result[item] === false);
      if (result[item] === false) {
        $('#' + item).prop('checked', false);
      }
      if (item === "fillpasswords" && result[item] === undefined) {
        $('#' + item).prop('checked', false);
      }
    });

  });



  $('html').click(function () {
    console.log('clicked');


    chrome.storage.sync.set({ english: ($('#english')[0].checked) }, function () {
      // console.log('english is now set to ' + on);
    });
    chrome.storage.sync.set({ buttons: ($('#buttons')[0].checked) }, function () {
      // console.log('buttons is now set to ' + on);
    });
    chrome.storage.sync.set({ fillpasswords: ($('#fillpasswords')[0].checked) }, function () {
      // console.log('fillpasswords is now set to ' + on);
    });



  });



}, false);