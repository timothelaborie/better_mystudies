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
        else if (e.keyCode == '37') {
            // left arrow
            paella.player.videoContainer.currentTime()
                .then(function (currentTime) {
                    paella.player.videoContainer.seekToTime(currentTime - 2);
                });
        }
        else if (e.keyCode == '39') {
            // right arrow
            paella.player.videoContainer.currentTime()
                .then(function (currentTime) {
                    paella.player.videoContainer.seekToTime(currentTime + 2);
                });
        }

    }

    let totalGrade = 0;
    let totalWeight = 0;
    let weightedTotal = 0;
    let count = 0;
    
    $('table tr').each(function() {
        let $firstTd = $(this).find('td:first');
    
        // Check for "Additional Requirements" and break the loop if found.
        if ($firstTd.text().includes('Additional Requirements')) {
            return false;  // This will break out of the .each loop.
        }
    
        // Check if the first td contains " S".
        if ($firstTd.text().endsWith(' S') &&  $(this).find('td').eq(4).text() == "") {
            let courseName = $(this).find('td').eq(1).text().trim();
            let grade = parseFloat($(this).find('td').eq(3).text().trim());
            let weight = parseInt($(this).find('td').eq(5).text().trim(), 10);
    
            // Print the values to the console.
            console.log(`Course: ${courseName}, Grade: ${grade}, Weight: ${weight}`);
    
            if(isNaN(grade))
                return; // best course
    
            totalGrade += grade;
            weightedTotal += grade * weight;
            totalWeight += weight;
            count++;
        }
        if ($firstTd.attr('colspan') == 2) {
            let courseName = $firstTd.text().trim();
            let grade = parseFloat($(this).find('td').eq(2).text().trim());
            let weight = parseInt($(this).find('td').eq(4).text().trim(), 10);
    
            // Print the values to the console.
            console.log(`Course: ${courseName}, Grade: ${grade}, Weight: ${weight}`);
    
            if(isNaN(grade))
                return; // best course
    
            totalGrade += grade;
            weightedTotal += grade * weight;
            totalWeight += weight;
            count++;
        }
    
    });
    
    let average = totalGrade / count;
    let weightedAverage = weightedTotal / totalWeight;
    
    console.log(`Average: ${average}`);
    console.log(`Weighted Average: ${weightedAverage}`);
    
    text = $("table.tablebox p").text();
    $("table.tablebox p").html(text + "<br>" + `Average: ${average}` + "<br>" + `Weighted Average: ${weightedAverage}`);

    // console.log('video.js done');


}

setTimeout(onload, 200);
