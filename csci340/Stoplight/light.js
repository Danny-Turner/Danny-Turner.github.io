$(document).ready(function (){


var stoplight = function() {
  if ($("h1").html() === "RED") {
    $("h1").html("GREEN");
    $("#light").css("background","#00ff00");
  }
  else if ($("h1").html() === "GREEN") {
    $("h1").html("YELLOW");
    $("#light").css("background","yellow");
  }
  else if ($("h1").html() === "YELLOW") {
    $("h1").html("RED");
    $("#light").css("background","#ff0000");
  }
}

var click = document.getElementById("light");
click.addEventListener("click", stoplight);

});
