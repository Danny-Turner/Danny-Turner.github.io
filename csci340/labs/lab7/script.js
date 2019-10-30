$(document).ready(function (){
var sets, cards
  $.ajax({dataType: "json",
  url: "https://api.magicthegathering.io/v1/sets/",
  success: function(results) {
    sets = results;
    console.log(sets);
    console.log(sets["sets"].length);
  },
  error: function(xhr,status,error) {
    console.log(error);
  }
});

$("#togglesets").click(function(){
for (var i=0; i<sets["sets"].length ; i++) {
  if (sets["sets"][i]["type"] == "core" || sets["sets"][i]["type"] =="expansion"
   || sets["sets"][i]["type"] =="masters") {
      console.log(i+" "+sets["sets"][i]["name"]+" "+sets["sets"][i]["type"]);
      $("p#setlist").append("<li>"+sets["sets"][i]["name"]+"</li>");
    };
};
$("#setlist li").click(function(){
  console.log("https://api.magicthegathering.io/v1/cards?setName="+$(this).text());
  $.ajax({dataType: "json",
  url: "https://api.magicthegathering.io/v1/cards?setName="+$(this).text(),
  success: function(results) {
    cards = results;
    console.log(cards);
    console.log(cards["cards"].length);
  },
  error: function(xhr,status,error) {
    console.log(error);
  }
  });
});


$("#togglecards").click(function(){
  for (var i=0; i<cards["cards"].length ; i++) {
      $("p#cardlist").append("<li>"+cards["cards"][i]["name"]+"</li>");
      };
      $("#cardlist li").click(function(){
        console.log("https://api.magicthegathering.io/v1/cards?name="+$(this).text())
        var current
        $.ajax({dataType: "json",
        url: "https://api.magicthegathering.io/v1/cards?name="+$(this).text(),
        success: function(results) {
          current = results;
          console.log(current);
          console.log(current["cards"][0]["imageUrl"]);
          $("#cardpic").attr("src",current["cards"][0]["imageUrl"])
        },
        error: function(xhr,status,error) {
          console.log(error);
        }
      });
      });

});


});

$("#setlist li").click(function(){
  console.log("https://api.magicthegathering.io/v1/cards?setName="+this);
  $.ajax({dataType: "json",
  url: "https://api.magicthegathering.io/v1/cards?setName="+this,
  success: function(results) {
    sets = results;
    console.log(sets);
    console.log(sets["sets"].length);
  },
  error: function(xhr,status,error) {
    console.log(error);
  }
});

});

});
