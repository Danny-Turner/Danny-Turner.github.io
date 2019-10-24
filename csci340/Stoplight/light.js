$(document).ready(function (){

//$("h1").html("testing");

var lightColor = "RED";

var stoplight = function() {
  if (lightColor === "RED") {
    $("h1").html("GREEN");
    $("#light").css("background","#00ff00");
    lightColor = "GREEN";
  }
  else if (lightColor === "GREEN") {
    $("h1").html("YELLOW");
    $("#light").css("background","yellow");
    lightColor = "YELLOW";
  }
  else if (lightColor === "YELLOW") {
    $("h1").html("RED");
    $("#light").css("background","#ff0000");
    lightColor = "RED";
  }

}

var click = document.getElementById("light");
click.addEventListener("click", stoplight);

});
