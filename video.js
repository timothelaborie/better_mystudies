//add extra features to the video player

async function onload() {
    console.log("video.js adding features");


    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
            paella.player.videoContainer.setPlaybackRate(2);
        }
        else if (e.keyCode == '40') {
            // down arrow
            paella.player.videoContainer.setPlaybackRate(1.25);
        }
        else if (e.keyCode == '37') {
            // left arrow
            paella.player.videoContainer.currentTime()
                .then(function (currentTime) {
                    paella.player.videoContainer.seekToTime(currentTime - 5);
                });
        }
        else if (e.keyCode == '39') {
            // right arrow
            paella.player.videoContainer.currentTime()
                .then(function (currentTime) {
                    paella.player.videoContainer.seekToTime(currentTime + 5);
                });
        }

    }


    console.log('video.js done');


}

setTimeout(onload, 200);
