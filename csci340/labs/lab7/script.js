$(document).ready(function (){

  $.ajax({dataType: "json",
  url: "https://api.magicthegathering.io/v1/sets/",
  success: function(results) {
    var sets = results;
    console.log(sets);
    console.log(sets["sets"].length);


    for (var i=0; i<sets["sets"].length ; i++) {
      if (sets["sets"][i]["type"] == "core" || sets["sets"][i]["type"] =="expansion" || sets["sets"][i]["type"] =="masters") {
          console.log(i+" "+sets["sets"][i]["name"]+" "+sets["sets"][i]["type"]);
          $("p#setlist").append("<li>"+sets["sets"][i]["name"]+"</li>");
        }
    };
  },
  error: function(xhr,status,error) {
    console.log(error);
  }
});

});
