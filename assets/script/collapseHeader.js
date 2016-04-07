var header = document.getElementById("header");
var name = document.getElementById("ianarber");
var composer = document.getElementById("composer");
var film = document.getElementById("film");
var menuItems1 = document.getElementsByClassName("menu-items-1");
var menuItems2 = document.getElementsByClassName("menu-items-2");

function initScroll(){
	if(window.pageYOffset > 200){
		name.style.fontSize = "100%";
	}else{
		name.style.fontSize = "250%";
	}
}

window.addEventListener("scoll", initScroll);