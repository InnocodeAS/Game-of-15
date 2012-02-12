/**
 * Created by JetBrains WebStorm.
 * User: Power
 * Date: 13.12.11
 * Time: 17:20
 * To change this template use File | Settings | File Templates.
 */
var Puzzle15 = function (conf){
  var self = this,
      puzzles = [],
      emptyPuzzle,
      steps = 0,
      side;

  Observer.apply(self);

  this.redrawPuzzle = function(){
    var style = getComputedStyle(self.container, null);
    side = Math.min(parseInt(style.height),parseInt(style.width));
    self.container.style.width = self.container.style.height = side + "px";

    var squares = self.container.querySelectorAll("div");
    for (var i = 0, max = squares.length; i < max; ++i) {
      squares[i].style.backgroundSize =  side + "px" + " " + side + "px";
    }
  };

  this.showTip = function(show){
  };

  this.refreshPuzzle = function(){
    self.fire("step", steps = 0);
    _randomizePuzzle();
  };

  this.redrawSkin = function(data){
    // redraw skin
    self.skin = data;
    _drawSkin();
    // refresh puzzle
    self.refreshPuzzle();
  };

  function _createPuzzle(){
    var style = getComputedStyle(self.container, null);
    side = Math.min(parseInt(style.height),parseInt(style.width));
    // save aspect ration for puzzle container and center it
    self.container.style.width = self.container.style.height = side + "px";
    // listen for click

    if (window.Touch){
      //self.container.addEventListener("touchstart", touchPuzzle(event), false);
      self.container.addEventListener("touchend", _play, false);
    }
    else self.container.addEventListener("click",_play);

    // draw puzzles
    for (var i = 0,xx = 0, yy = 0; i < 15; i++){
      var square = document.createElement("div");
      xx = i % 4;
      yy = Math.floor(i / 4);

      square.key = i;
      //square.className = "nice";
      square.style.backgroundImage =  "url('" + self.skin + "')";
      square.style.backgroundPosition = xx * 33.333 + "%" + " " + yy * 33.333 + "%";
      square.style.backgroundSize =  side + "px" + " " + side + "px";
      self.container.appendChild(square);
      // save square
      puzzles.push(square);
    }

    // empty element
    puzzles.push(0);
    emptyPuzzle = 15;

    _randomizePuzzle();
  }

  function _randomizePuzzle(){
    puzzles.shuffle();
    _fixPuzzles();
    emptyPuzzle = 15;

    for (var i = 0, xx = 0, yy = 0; i < puzzles.length; i++){
      var square = puzzles[i];
      if (square === 0) continue;

      // to calculate square absolute position
      x = i % 4;
      y = Math.floor(i / 4);

      square.style.top = y * 25 + "%";
      square.style.left = x * 25 + "%";

      /*square.style.MozTransform = "translate(" + (x * 100 + "%, ") + (y * 100 + "%") + ")";
      square.style.WebkitTransform = "translate(" + (x * 100 + "%, ") + (y * 100 + "%") + ")";
      square.style.MSTransform = "translate(" + (x * 100 + "%, ") + (y * 100 + "%") + ")";
      square.style.transform = "translate(" + (x * 100 + "%, ") + (y * 100 + "%") + ")";*/
    }
  }

  function _drawSkin(){
    //self.helpLayer.style.backgroundImage =  "url('" + self.skin + "')";

    var squares = self.container.querySelectorAll("div");
    for (var i = 0, max = squares.length; i < max; ++i) {
      squares[i].style.backgroundImage =  "url('" + self.skin + "')";
    }
  }

  function _fixPuzzles(){
    if (puzzles.indexOf(0) == 15) return;
    puzzles.splice(puzzles.indexOf(0),1);
    puzzles.push(0);
  }

  function _play(event){
    event = event || window.event;
    var target = event.target || event.srcElement || event.changedTouches[0].target;

    while(target != this){
      if (target.tagName == 'DIV'){
        _movePuzzle(target);
      }
      target = target.parentNode;
    }
  }

  function touchPuzzle(event){
    var touches = event.changedTouches;
    var str = "";
    for (var i=0; i<touches.length; i++) {
      str += " X: " + touches[i].pageX + " Y: " + touches[i].pageY + " : ";
    }
    alert(str);
    _play(event);
  }

  function _movePuzzle(square){
    var index = puzzles.indexOf(square);
    var x = index % 4;
    var y = Math.floor(index / 4);

    var emptyPuzzleX = emptyPuzzle % 4;
    var emptyPuzzleY = Math.floor(emptyPuzzle / 4);

    if (x == emptyPuzzleX && Math.abs(y-emptyPuzzleY) == 1){
      square.style.top = emptyPuzzleY * 25 + "%";
      /*square.style.MozTransform = "translate(" + (x * 100 + "%, ") + (emptyPuzzleY * 100 + "%") + ")";
      square.style.WebkitTransform = "translate(" + (x * 100 + "%, ") + (emptyPuzzleY * 100 + "%") + ")";
      square.style.MSTransform = "translate(" + (x * 100 + "%, ") + (emptyPuzzleY * 100 + "%") + ")";
      square.style.transform = "translate(" + (x * 100 + "%, ") + (emptyPuzzleY * 100 + "%") + ")";*/
    }
    else if (y == emptyPuzzleY && Math.abs(x-emptyPuzzleX) == 1){
      square.style.left = emptyPuzzleX * 25 + "%";
      /*square.style.MozTransform = "translate(" + (emptyPuzzleX * 100 + "%, ") + (y * 100 + "%") +")";
      square.style.WebkitTransform = "translate(" + (emptyPuzzleX * 100 + "%, ") + (y * 100 + "%") +")";
      square.style.MSTransform = "translate(" + (emptyPuzzleX * 100 + "%, ") + (y * 100 + "%") +")";
      square.style.transform = "translate(" + (emptyPuzzleX * 100 + "%, ") + (y * 100 + "%") +")";*/
    }
    else return;

    puzzles[emptyPuzzle] = square;
    puzzles[index] = 0;
    emptyPuzzle = index;

    // notify about new step - one more step to the victory!
    self.fire("step", ++steps);

    // notify about finish - we've done it!
    if (_checkForSuccess()) setTimeout(function(){self.fire("finish",steps)}, 200);
  }

  function _checkForSuccess(){
    for (var i = 0; i < puzzles.length; i++){
      if (puzzles[i] === 0) continue;
      if (i !== puzzles[i].key) return false;
    }
    return true;
  }

  function _init(conf){
    for (var prop in conf){
      self[prop] = conf[prop];
    }
    _createPuzzle();
  }

  _init(conf);
};

Puzzle15.prototype = {
  container: document.getElementById("puzzle"),
  skin : "css/images/default.png",
  size:4
};

Array.prototype.shuffle = function() {
  var s = [];
  while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
  while (s.length) this.push(s.pop());
  return this;
};