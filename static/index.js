var user_email, user_image, user_name;

(function main(){
    requestAnimationFrame(main); // keep the loop going
    if (document.getElementById("ld").value != "") {        
        document.getElementById("ld_banner_div").style.display = "block";
        if (document.getElementById("ld_banner").checked == true) {
            document.getElementById("ld_num_div").style.display = "block";
        } else {
            document.getElementById("ld_num_div").style.display = "none";
        }
    } else {
        document.getElementById("ld_banner_div").style.display = "none";
    }
})()

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    user_email = profile.getEmail();
    user_image = profile.getImageUrl();
    user_name = profile.getGivenName();
};