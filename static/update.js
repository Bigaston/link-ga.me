buttonvalid = document.getElementById("valid")

(function main(){
    requestAnimationFrame(main); // keep the loop going
    mail = document.getElementById("mail")

    if (mail.value === "") {
        buttonvalid.disabled = true;
    } else {
        buttonvalid.disabled = false;
    }
})()

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
};