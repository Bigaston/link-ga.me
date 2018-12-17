function CreateLink(qr){
    var url = "https://link-ga.me/old/link.html"
    
    var url = url + "?title=" + document.getElementById("title").value;
    
    if (document.getElementById("creator").value != null) {
        var url = url + "&creator=" + document.getElementById("creator").value;
    }
    
    var url = url + "&img=" + document.getElementById("image").value;
    
    if (document.getElementById("desc").value != null) {
        var url = url + "&desc=" + encodeURI(document.getElementById("desc").value);
    }
    
    if (document.getElementById("itch").value != "") {        
        var url = url + "&itch=" + document.getElementById("itch").value;
    }
    
    if (document.getElementById("ng").value != "") {        
        var url = url + "&ng=" + document.getElementById("ng").value;
    }
    
    if (document.getElementById("gj").value != "") {        
        var url = url + "&gj=" + document.getElementById("gj").value;
    }
    
    if (document.getElementById("steam").value != "") {        
        var url = url + "&steam=" + document.getElementById("steam").value;
    }
    
    if (document.getElementById("ag").value != "") {        
        var url = url + "&ag=" + document.getElementById("ag").value;
    }
    
    if (document.getElementById("ld").value != "") {        
        var url = url + "&ld=" + document.getElementById("ld").value;
        
        if (document.getElementById("ld_banner").checked == true) {
            var url = url + "&ldn=" + document.getElementById("ld_num").value;
        }
    }
    
    if (document.getElementById("gp").value != "") {        
        var url = url + "&gp=" + document.getElementById("gp").value;
    }
    
    if (document.getElementById("as").value != "") {        
        var url = url + "&as=" + document.getElementById("as").value;
    }
    
    if (document.getElementById("git").value != "") {        
        var url = url + "&git=" + document.getElementById("git").value;
    }
    
    if (document.getElementById("color_back").value != "#d5dbdb") {        
        var url = url + "&back=" + document.getElementById("color_back").value.replace("#", "");
    }
    
    if (document.getElementById("color_text").value != "#1c2833") {        
        var url = url + "&text=" + document.getElementById("color_text").value.replace("#", "");
    }
    
    if (qr == true) {
        var share = window.open("https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + url, '_blank');
        share.focus();
    } else {
        var share = window.open(url, '_blank');
        share.focus();
    }
}

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