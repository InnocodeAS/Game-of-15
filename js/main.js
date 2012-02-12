/**
 * Created by JetBrains WebStorm.
 * User: Khrystyna Skvarok
 * Date: 16.01.12
 * Time: 13:39
 */
var puzzle15 = new Puzzle15();
puzzle15.subscribe("step",function(score){
                            document.getElementById("score").innerHTML = score;
                          })
        .subscribe("finish",function(score){
                            alert("You won! Your result is " + score + "!");
                          });

if (window.Touch){
  document.body.addEventListener("touchstart", function(event){event.preventDefault();});

  document.getElementById("refreshPuzzle").addEventListener("touchstart", function(){refreshPuzzle();});
  document.getElementById("showImage").addEventListener("touchstart", function(){showPuzzle(true);}, false);
  document.getElementById("showImage").addEventListener("touchend", function(){showPuzzle(false);}, false);
}
else{
  document.getElementById("refreshPuzzle").addEventListener("click", function(){refreshPuzzle();});
  document.getElementById("showImage").addEventListener("mousedown", function(){showPuzzle(true);});
  document.getElementById("showImage").addEventListener("mouseup", function(){showPuzzle(false);});
}

function refreshPuzzle(){
  puzzle15.refreshPuzzle();
}

function showPuzzle(show){
  document.getElementById("puzzle").style("zIndex") = 0;
}

/*
(function(target){
  var holder = new FileHolder(target);
  target.addEventListener("fileLoad",function(event){
    puzzle15.redrawSkin(event.data[0]);
  });
})(document.getElementById("puzzle"));

var fileSelect = document.getElementById("loadImage"),
    fileElem = document.getElementById("loader");

fileSelect.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  fileElem.click();
}, false);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
  var file = this.files[0];
  var reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = function(event){
    puzzle15.redrawSkin(event.target.result);
  };

}*/



window.onresize = function(){
  document.getElementById("puzzle").style.width = document.getElementById("puzzle").style.height = "100%";
  puzzle15.redrawPuzzle();
};

window.onload = function(){

};


