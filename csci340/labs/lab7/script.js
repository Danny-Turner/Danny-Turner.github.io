$(document).ready(function (){

  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });


  setDateListener();
  initializeCardDropDown();


  function setDateListener() {
    $("#pickDate").on('change', function(){
      var selectedDate= $("#pickDate").val();
      $.ajax({dataType: "json",
        url: "https://api.nasa.gov/planetary/apod?api_key=tz5Behp5ZLCd6jUVH5m1rbfEmT4AN1g4LHlZnX6G&date="+selectedDate,
        success: function(results) {
          console.log(results);
          $("#astronomyPic").attr("src",results["url"])
          $("#astronomyPic").attr("alt",results["title"])
          $("#astronomyDesc").text(results["explanation"])
          },
        error: function(xhr,status,error) {
          console.log(error);
          }
      });
    });
  }


  function initializeCardDropDown(){
    $.ajax({dataType: "json",
      url: "https://api.magicthegathering.io/v1/sets/",
      success: function(results) {
        console.log(results);
        populateSetDropDown(results);
        setDropDownListener();
      },
      error: function(xhr,status,error) {
        console.log(error);
      }
    });
  }


  function populateSetDropDown(sets) {
    sets["sets"].sort(function(a,b){return new Date(b["releaseDate"]).getTime() - new Date(a["releaseDate"]).getTime()});
    for (var i=0; i< sets["sets"].length ; i++) {
      if (sets["sets"][i]["name"].search("Renaissance") == -1
        && sets["sets"][i]["name"].search("Rinascim") == -1
        && sets["sets"][i]["name"].search("Summer Magic") == -1
        && sets["sets"][i]["name"].search("Foreign") == -1
        && sets["sets"][i]["onlineOnly"] == false
        && (sets["sets"][i]["type"] == "core"
        || sets["sets"][i]["type"] == "expansion"
        || sets["sets"][i]["type"] == "masters")) {
        $("#selectSet").append("<option value="+i+">"
        +sets["sets"][i]["name"]+"</option>");
      };
    };
  $("#selectSet").val("Core Set 2020");
  }


  function setDropDownListener() {
    $("#selectSet").on('change', function(){
      var currentSet=$("#selectSet :selected").text();
      console.log(currentSet);
      $("#setName").text(currentSet);
      $("#instructions").text("(Select a Card for Details)");
      $("#cardlist li").remove();
      $("li#cardlist").append("<li>Generating Card List...</li>");
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
    $("#cardlist li").remove();
    for (var i=0; i< cards["cards"].length ; i++) {
        $("li#cardlist").append("<li>"+cards["cards"][i]["name"]+"</li>");
        };
    cardNameListener(currentSet);
  }


  function cardNameListener(currentSet) {
    $("#cardlist li").click(function(){
      $.ajax({dataType: "json",
        url: "https://api.magicthegathering.io/v1/cards?name="+$(this).text()+"&setName="+currentSet,
        success: function(results) {
          for (var i = 0; i < results["cards"].length; i++) {
              console.log(results["cards"][i]["imageUrl"]);
              if (results["cards"][i]["imageUrl"]!=null){
                $("#cardpic").attr("src",results["cards"][i]["imageUrl"])
                $("#cardpic").attr("alt",results["cards"][i]["name"])
              }
            }
        },
        error: function(xhr,status,error) {
          console.log(error);
        }
      });
    });
  }

});
