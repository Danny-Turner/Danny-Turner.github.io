$(document).ready(function (){

  $.ajax({dataType: "json",
    url: "https://api.magicthegathering.io/v1/sets/",
    success: function(results) {
      createSetList(results);
      setNameListener();
    },
    error: function(xhr,status,error) {
      console.log(error);
    }
  });

  function createSetList(sets) {
    sets["sets"].sort(function(a,b){return new Date(a["releaseDate"]).getTime()-new Date(b["releaseDate"]).getTime()});
    for (var i=0; i< sets["sets"].length ; i++) {
      if (sets["sets"][i]["type"] == "core"
        || sets["sets"][i]["type"] == "expansion"
        || sets["sets"][i]["type"] == "masters") {
        $("p#setlist").append("<li>"+sets["sets"][i]["name"]+"</li>");
      };
    };

    for (var i=0; i< sets["sets"].length ; i++) {
      if (sets["sets"][i]["type"] == "core"
        || sets["sets"][i]["type"] == "expansion"
        || sets["sets"][i]["type"] == "masters") {
        $("#selectSet").append("<option value="+sets["sets"][i]["name"]+">"
        +sets["sets"][i]["name"]+"</option>");
      };
    };

  }

  $("#selectSet").select(function(){
    currentSet=$(this).text();
    $("#setName").text(currentSet);
    $("#cardlist li").remove();
    $.ajax({dataType: "json",
      url: "https://api.magicthegathering.io/v1/cards?setName="+currentSet,
      success: function(results) {
        createCardList(results, currentSet);
        },
      error: function(xhr,status,error) {
        console.log(error);
        }
    });
  });


  function setNameListener(){
    $("#setlist li").click(function(){
      currentSet=$(this).text();
      $("#setName").text(currentSet);
      $("#cardlist li").remove();
      $.ajax({dataType: "json",
        url: "https://api.magicthegathering.io/v1/cards?setName="+currentSet,
        success: function(results) {
          createCardList(results, currentSet);
          },
        error: function(xhr,status,error) {
          console.log(error);
          }
      });
    });
  }


  function createCardList(cards, currentSet) {
    for (var i=0; i< cards["cards"].length ; i++) {
        $("p#cardlist").append("<li>"+cards["cards"][i]["name"]+"</li>");
        };
    cardNameListener(currentSet);
  }


  function cardNameListener(currentSet) {
    $("#cardlist li").click(function(){
      $.ajax({dataType: "json",
        url: "https://api.magicthegathering.io/v1/cards?name="+$(this).text()+"&setName="+currentSet,
        success: function(results) {
            $("#cardpic").attr("src",results["cards"][0]["imageUrl"])
        },
        error: function(xhr,status,error) {
          console.log(error);
        }
      });
    });
  }

});
