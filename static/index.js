var user_email, user_image, user_name;
var buttonvalid = document.getElementById("valid")
buttonvalid.addEventListener("click", pub);

(function main(){
    requestAnimationFrame(main); // keep the loop going
    mail = document.getElementById("mail")
    button = document.getElementById("button-addon2")

    if (mail.value === "" || button.classList.contains("btn-danger")) {
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

function check() {
    link = document.getElementById("basic-url").value
    button = document.getElementById("button-addon2")
    if (link === "") {
        button.classList.add("btn-danger")
        button.classList.remove("btn-success")
        button.classList.remove("btn-outline-secondary")
        return
    }

    fetch("/verify?link=" + link)
        .then(function(response) {
            if (response.ok) {
                button.classList.remove("btn-outline-secondary")
                button.classList.add("btn-success")
                button.classList.remove("btn-danger")
            } else {
                button.classList.add("btn-danger")
                button.classList.remove("btn-success")
                button.classList.remove("btn-outline-secondary")
            }
        })
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let profile = googleUser.getBasicProfile();
    mail = document.getElementById("mail")
    mail.value = profile.getEmail();
};

function pub(event) {
    event.preventDefault();
    link = document.getElementById("basic-url").value
    button = document.getElementById("button-addon2")

    if (document.forms["link-form"]["title"].value == "") {
        alert("The name of the game is required!")
        return
    }

    if (document.forms["link-form"]["creator"].value == "") {
        alert("The name of the creator is required!")
        return
    }

    if (link === "") {
        button.classList.add("btn-danger")
        button.classList.remove("btn-success")
        button.classList.remove("btn-outline-secondary")
        return
    }

    fetch("/verify?link=" + link)
        .then(function(response) {
            if (response.ok) {
                button.classList.remove("btn-outline-secondary")
                button.classList.add("btn-success")
                button.classList.remove("btn-danger")
                document.forms["link-form"].submit();
            } else {
                button.classList.add("btn-danger")
                button.classList.remove("btn-success")
                button.classList.remove("btn-outline-secondary")
            }
        })
}