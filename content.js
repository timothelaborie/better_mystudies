window.onload = function () {


	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function demo() {
		console.log("ETH improvements loaded");

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

		await sleep(400);
		if (location.href.includes("quiz") || location.href.includes("feedback") || location.href.includes("test") || location.href.includes("exam") || location.href.includes("prüfung")) return;


		//the following code is used to skip useless buttons and switch to english mode
		if (english && location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/studSessionException.view")) {
			// console.log('switching to english');
			// try { document.querySelectorAll('a[href="?lang=en"].engl')[0].click(); } catch { }
			await sleep(400);
			console.log('skipping useless button');
			try { document.querySelectorAll('a[href="index.jsp"]')[0].click(); } catch { }
		}

		if (buttons && location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/login.view")) {
			console.log('switching to english');
			try { document.querySelectorAll('a[href="?lang=en"].engl')[0].click(); } catch { }
			await sleep(400);
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



		console.log('done');
	}

	demo();




}