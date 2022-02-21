document.addEventListener('DOMContentLoaded', function () {
  console.log('popup.js loaded');
  // console.log($('#video'));

  const array = ["english", "buttons", "video"]
  array.forEach(function (item, index) {
    // console.log(item, index);
    chrome.storage.sync.get([item], function (result) {
      console.log(item + ' currently is ' + result[item]);
      console.log(result[item] === false);
      if (result[item] === false) {
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
    chrome.storage.sync.set({ video: ($('#video')[0].checked) }, function () {
      // console.log('video is now set to ' + on);
    });

  });


  // var checkPageButton = document.getElementById('clickIt');
  // checkPageButton.addEventListener('click', function() {
  //   chrome.tabs.getSelected(null, function(tab) {
  //     alert("Hello..! It's my first chrome extension.");
  //     $("h1").text("Hello..! It's my first chrome extension.");
  //   });
  // }, false);

  // var video = $('#video').is(":checked") ? true : false;
  // console.log(video);
  // chrome.storage.sync.set({ video: on }, function () {
  //   console.log('Value is set to ' + on);
  // });


}, false);