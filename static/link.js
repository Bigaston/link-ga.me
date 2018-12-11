function URLGet(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
        vars[key] = value !== undefined ? value : '';
        }
    );
    if ( param ) {
        return vars[param] ? vars[param] : null;	
    }
    return vars;
}

function OpenLD() {
    var ld_windows = window.open(URLGet("ld"), '_blank');
    ld_windows.focus();
}

if (URLGet("ldn") == null) {
    document.getElementById("ld_banner").style.display = "none";
} else {
    document.getElementById("ld_number").innerHTML = '<img src="./assets/ludum_banner.png" height="20px"> ' + URLGet("ldn");
}

document.getElementById("title").innerHTML = decodeURI(URLGet("title"));
document.title = decodeURI(URLGet("title"));

if (URLGet("creator") == null) {
    document.getElementById("creator").style.display = "none";
} else {
    document.getElementById("creator").innerHTML = "By " + decodeURI(URLGet("creator"));
    document.title = document.title + " By " + decodeURI(URLGet("creator"));
}

document.getElementById("image").src = URLGet("img");
document.getElementById("image").height = 200;

if (URLGet("desc") == null) {
    document.getElementById("desc_link").style.display = "none";
} else {
    var description = URLGet("desc");
    description = decodeURI(description)

    document.getElementById("desc_link").innerHTML = description;
    document.querySelector('meta[name="description"]').setAttribute("content", URLGet("desc"));
}

if (URLGet("itch") == null) {
    document.getElementById("link_itch").style.display = "none";
} else {
    document.getElementById("link_itch").href = URLGet("itch");
}

if (URLGet("ng") == null) {
    document.getElementById("link_ng").style.display = "none";
} else {
    document.getElementById("link_ng").href = URLGet("ng");
}

if (URLGet("gj") == null) {
    document.getElementById("link_gamejolt").style.display = "none";
} else {
    document.getElementById("link_gamejolt").href = URLGet("gj");
}

if (URLGet("steam") == null) {
    document.getElementById("link_steam").style.display = "none";
    document.getElementById("steam_cop").style.display = "none";
} else {
    document.getElementById("link_steam").href = URLGet("steam");
}

if (URLGet("ag") == null) {
    document.getElementById("link_armorgames").style.display = "none";
} else {
    document.getElementById("link_armorgames").href = URLGet("ag");
}

if (URLGet("ld") == null) {
    document.getElementById("link_ludum").style.display = "none";
} else {
    document.getElementById("link_ludum").href = URLGet("ld");
}

if (URLGet("gp") == null) {
    document.getElementById("link_google").style.display = "none";
    document.getElementById("google_cop").style.display = "none";
} else {
    document.getElementById("link_google").href = URLGet("gp");
}

if (URLGet("as") == null) {
    document.getElementById("link_appstore").style.display = "none";
} else {
    document.getElementById("link_appstore").href = URLGet("as");
}

if (URLGet("git") == null) {
    document.getElementById("link_github").style.display = "none";
} else {
    document.getElementById("link_github").href = URLGet("git");
}

if (URLGet("back") != null) {
    document.getElementById("body").style.backgroundColor = "#" + URLGet("back");
}

if (URLGet("text") != null) {
    document.getElementById("body").style.color = "#" + URLGet("text");
    var links = document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        if(links[i].href)
        {
            links[i].style.color = "#" + URLGet("text");  
        }
    }  
}