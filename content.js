window.onload = function () {






	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function demo() {
		console.log("better_mystudies loaded");

		var english = true;
		chrome.storage.sync.get(['english'], function (result) {
			console.log('content.js: english currently is ' + result.english);
			if(result.english == undefined)return;
			english = result.english;
		});
		var buttons = true;
		chrome.storage.sync.get(['buttons'], function (result) {
			console.log('content.js: buttons currently is ' + result.buttons);
			if(result.buttons == undefined)return;
			buttons = result.buttons;
		});
		var video = true;
		chrome.storage.sync.get(['video'], function (result) {
			console.log('content.js: video currently is ' + result.video);
			if(result.video == undefined)return;
			video = result.video;
		});

		await sleep(400);
		if (location.href.includes("quiz") || location.href.includes("feedback") || location.href.includes("test") || location.href.includes("exam") || location.href.includes("prüfung")) return;



		if (english && location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/studSessionException.view")) {
			console.log('switching to english');
			try { document.querySelectorAll('a[href="?lang=en"]')[0].click(); } catch { }
			await sleep(400);
			console.log('skipping useless button');
			try { document.querySelectorAll('a[href="index_en.jsp"]')[0].click(); } catch { }
		}

		if (buttons && location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/login.view")) {
			console.log('skipping useless button');
			try { document.querySelectorAll('input[value="Start"]')[0].click(); } catch { }
		}


		if (english && location.href.includes("https://moodle-app2.let.ethz.ch/")) {
			console.log('moodle english');
			var page_is_english = false;
			//go through every element with class "media-body" and check if it contains "Startseite"
			var elements = document.getElementsByClassName("media-body");
			for (var i = 0; i < elements.length; i++) {
				if (elements[i].innerText.includes("Startseite")) {
					page_is_english = true;
				}
			}
			
			
			if(page_is_english){
				//go through every element with class "dropdown-item" and check if the title attribute contains "English"
				var elements = document.getElementsByClassName("dropdown-item");
				for (var i = 0; i < elements.length; i++) {
					if (elements[i].title.includes("English")) {
						console.log('switching to english');
						elements[i].click();
					}
				}
				
			}



			
		}

		if (buttons && location.href.includes("https://moodle-app2.let.ethz.ch/auth/shibboleth/login.php")) {
			console.log('skipping useless moodle login button');
			try { document.querySelectorAll('button.btn.btn-primary.btn-block')[0].click(); } catch { }
		}

		if (video && location.href.includes("https://video.ethz.ch/etc/")) {
			console.log('video detected, adding features');

			var scriptContent = "document.onkeydown = checkKey; " +
				"function checkKey(e) {" +
				" e = e || window.event;" +
				" if (e.keyCode == '38') { paella.player.videoContainer.setPlaybackRate(2); }" +
				" else if (e.keyCode == '40') { paella.player.videoContainer.setPlaybackRate(1.25); }" +
				" else if (e.keyCode == '37') { paella.player.videoContainer.currentTime() .then(function(currentTime) { paella.player.videoContainer.seekToTime(currentTime - 5); }); } " +
				" else if (e.keyCode == '39') { paella.player.videoContainer.currentTime() .then(function(currentTime) { paella.player.videoContainer.seekToTime(currentTime + 5); }); } }";
			var script = document.createElement('script');
			script.id = 'tmpScript';
			script.appendChild(document.createTextNode(scriptContent));
			(document.body || document.head || document.documentElement).appendChild(script);



		}


		console.log('done');
	}

	demo();




}