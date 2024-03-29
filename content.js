if (location.href.includes("https://moodle-app2.let.ethz.ch/")) {
	try {
		document.getElementsByClassName("main-inner-wrapper main-inner-outside-none main-inner-outside-nextmaincontent")[0].style.maxWidth = "1000px";
		document.getElementsByClassName("main-inner-wrapper main-inner-outside-none main-inner-outside-nextmaincontent")[0].style.margin = "auto";
		var activities = document.getElementsByClassName("activity-item ")
		for (var i = 0; i < activities.length; i++) {
			activities[i].style.paddingTop = "0.5rem";
			activities[i].style.paddingBottom = "0.5rem";
		}
	} catch { }
}

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
		var fillpasswords = false;
		chrome.storage.sync.get(['fillpasswords'], function (result) {
			console.log('content.js: fillpasswords currently is ' + result.fillpasswords);
			if(result.fillpasswords == undefined)return;
			fillpasswords = result.fillpasswords;
		});

		await sleep(400);
		// if (location.href.includes("quiz") || location.href.includes("feedback") || location.href.includes("test") || location.href.includes("exam") || location.href.includes("prüfung")) return;


		//the following code is used to skip useless buttons and switch to english mode
		if (english && location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/studSessionException.view")) {
			// console.log('switching to english');
			await sleep(400);
			console.log('skipping useless button');
			try { document.querySelectorAll('a[href="index.jsp"]')[0].click(); } catch { }
			try { document.querySelectorAll('a[href="index_en.jsp"]')[0].click(); } catch { }
		}

		if (english && location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/studWillkommen.view")) {
			console.log('switching to english');
			try { document.querySelectorAll('a[href="?lang=en"].engl')[0].click(); } catch { }
			await sleep(400);
		}

		if (buttons && location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/login.view")) {
			console.log('skipping useless button');
			await sleep(400);
			try { document.querySelectorAll('input[value="Start"]')[0].click(); } catch { }
		}

		if (english && location.href.includes("https://moodle-app2.let.ethz.ch/")) {
			console.log('moodle english');
			var page_is_german = false;

			var element = document.querySelectorAll('a[href="https://moodle-app2.let.ethz.ch/course/index.php"]')[0];
			if(element && element.innerText.includes("Kurssuche")){
				page_is_german = true;
			}

			if(page_is_german){
				//go through every element with class "dropdown-item" and check if the title attribute contains "English"
				var elements = document.getElementsByClassName("dropdown-item");
				for (var i = 0; i < elements.length; i++) {
					if (elements[i].innerHTML.includes("English")) {
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


		if (fillpasswords && location.href.includes("https://aai-logon.ethz.ch/idp/profile/SAML2") && document.querySelectorAll('#username')[0]) {
			console.log('searching for password');
			navigator.credentials.get({ password: true }).then(function(credential) {
				if (credential && credential.password) {
				  // Found saved password, use it to fill in the input field
				  document.querySelectorAll('#username')[0].value=credential.id;
				  document.querySelectorAll('#password')[0].value=credential.password;
				  document.querySelectorAll('button[name="_eventId_proceed"]')[0].click();

				} else {
				  console.log('no saved password');
				}
			})
		}

		if(fillpasswords && document.querySelectorAll('input[placeholder="username@ethz.ch"]')[0]){
			console.log('searching for password');
			navigator.credentials.get({ password: true }).then(function(credential) {
				if (credential && credential.password) {
				  // Found saved password, use it to fill in the input field
				  document.querySelectorAll('#userNameInput')[0].value=credential.id;
				  document.querySelectorAll('#passwordInput')[0].value=credential.password;

				} else {
				  console.log('no saved password');
				}
			})
		}

		console.log('done');
	}

	demo();
}