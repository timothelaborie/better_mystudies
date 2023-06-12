//add extra features to the video player

async function onload() {
    console.log("video.js adding features");

    let rate = 1;

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
            rate+=0.25;
            if(rate > 2)rate = 2;
            console.log(rate);
            paella.player.videoContainer.setPlaybackRate(rate);
        }
        else if (e.keyCode == '40') {
            // down arrow
            rate-=0.25;
            if(rate < 1)rate = 1;
            console.log(rate);
            paella.player.videoContainer.setPlaybackRate(rate);
        }
        // else if (e.keyCode == '37') {
        //     // left arrow
        //     paella.player.videoContainer.currentTime()
        //         .then(function (currentTime) {
        //             paella.player.videoContainer.seekToTime(currentTime + 0);
        //         });
        // }
        // else if (e.keyCode == '39') {
        //     // right arrow
        //     paella.player.videoContainer.currentTime()
        //         .then(function (currentTime) {
        //             paella.player.videoContainer.seekToTime(currentTime - 0);
        //         });
        // }

    }


    console.log('video.js done');


}

setTimeout(onload, 200);
