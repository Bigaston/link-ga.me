function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        mail = document.getElementById("mail")
        mail.value = "";
    });
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let profile = googleUser.getBasicProfile();
    mail = document.getElementById("mail")
	mail.value = profile.getEmail();
	token = document.getElementById("token")
	token.value = googleUser.getAuthResponse().id_token;
    update()
};

function update() {
	mail = document.getElementById("mail")
	section = document.getElementById("results")
	section.innerHTML = ""
	fetch("/usergame?user=" + mail.value)
		.then( function(response) {
			if (response.ok) {
				return response.json();
			} else {
				section.innerHTML = "You don't have games!"
			}
		})
		.then(function(data) {
			if (data == null) {
				section.innerHTML = "You don't have games!"
				return
			}
			for (i=0; i < data.length; i++) {
				ssec = document.createElement("section")
				ssec.innerHTML = `<div class="card" style="width: 18rem;">
									  <div class="card-body">
									    <h5 class="card-title">${data[i].title}</h5>
									    <p class="card-text">${data[i].description.replace("%°", ".")}</p>
										<a href="/${data[i].link}" class="btn btn-primary">Visit the page</a>
									  	<button class="btn btn-danger" onclick="delGame('${data[i].link}');">Delete</button>
									  </div>
									</div>`
				section.appendChild(ssec)
			}
		})
}

function delGame(pLink) {
	var linkArea = document.getElementById("link")
	linkArea.value = pLink
	document.forms["formMail"].submit();
	update();
}