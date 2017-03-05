var gameOfLife = {

  width: 12,
  height: 12, // width and height dimensions of the board
  stepInterval: 0, // defined in milliseconds.

  createAndShowBoard: function () {

    // create <table> element
    var goltable = document.createElement("tbody");

    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    for(var w = 0; w < this.width; w++){
      for(var h = 0; h < this.height; h++){
        iteratorFunc(document.getElementById(w + '-' + h));
      }
    }
  },

  setupBoardEvents: function() {
    var gameOfLifeObj = this;
    var onCellClick = function (e) {
      gameOfLifeObj.switchCellStatus(this);
    };

    var arrOfTds = document.getElementsByTagName('td');
    for (var i =0; i < arrOfTds.length; i++){
      arrOfTds[i].onclick = onCellClick;
    }

    //document.getElementById("reset_btn").onclick = randomize.bind(gameOfLife);
    document.getElementById("reset_btn").addEventListener('click', this.randomize.bind(gameOfLife));
    //document.getElementById("reset_btn").addEventListener('click', this.randomize.bind(gameOfLife));
    //document.getElementById("clear_btn").onclick = clear.bind(gameOfLife);
    document.getElementById("clear_btn").addEventListener('click', this.clear.bind(gameOfLife));
    document.getElementById("step_btn").addEventListener('click', function(e){
      gameOfLifeObj.step();
    });
    document.getElementById("play_btn").addEventListener('click', function(e){
      gameOfLifeObj.enableAutoPlay();
    });
  },

  randomize: function (){
    var gameOfLifeObj = this;
      this.forEachCell(function(thisCell) {
        var status = Math.random()*10;
        if (status < 5) gameOfLifeObj.switchCellStatus(thisCell);
      });
  },

  clear: function(){
    this.forEachCell(function(thisCell){
      thisCell.className = 'dead';
      thisCell.dataset.status = 'dead';
    })
  },

  switchCellStatus: function(thisCell){
      if (thisCell.dataset.status == 'dead') {
        thisCell.className = 'alive';
        thisCell.dataset.status = 'alive';
      } else {
        thisCell.className = 'dead';
        thisCell.dataset.status = 'dead';
      }

  },

  step: function () {
    var gameOfLifeObj = this;
    var cellsToSwitch = [];
    this.forEachCell(function(thisCell){
      let xCoord = Number(thisCell.id.split('-')[0]);
      let yCoord = Number(thisCell.id.split('-')[1]);
      let cellStatus = thisCell.dataset.status;
      if(cellStatus === 'alive'){
        if(gameOfLifeObj.countNeighbors(xCoord, yCoord) !== 2 && gameOfLifeObj.countNeighbors(xCoord, yCoord) !==3){
          cellsToSwitch.push(thisCell);
        }
      } else {
        if(gameOfLifeObj.countNeighbors(xCoord, yCoord) === 3){
          cellsToSwitch.push(thisCell);
        }
      }
    });

    cellsToSwitch.forEach(function(x){
      gameOfLifeObj.switchCellStatus(x);
    });
  },

  enableAutoPlay: function () {
    if(this.stepInterval){
      document.getElementById("play_btn").innerHTML = "Play";
      return this.stopAutoPlay();
    }
    if(!this.stepInterval){
      document.getElementById("play_btn").innerHTML = "Pause";
    }
    this.stepInterval = setInterval(this.step.bind(this), 500);
    //question here!!! Why bind and not global variable this?
  },

  stopAutoPlay: function () {
    clearInterval(this.stepInterval);
    this.stepInterval = null;
  },

  countNeighbors: function (xCoord, yCoord) {
    let total = 0;
      if(document.getElementById((xCoord-1) + '-' + (yCoord-1)) !== null && document.getElementById((xCoord-1) + '-' + (yCoord-1)).dataset.status === 'alive') total++;
      if(document.getElementById((xCoord) + '-' + (yCoord-1)) !== null && document.getElementById((xCoord) + '-' + (yCoord-1)).dataset.status === 'alive') total++;
      if(document.getElementById((xCoord+1) + '-' + (yCoord-1)) !== null && document.getElementById((xCoord+1) + '-' + (yCoord-1)).dataset.status === 'alive') total++;
      if(document.getElementById((xCoord-1) + '-' + (yCoord)) !== null && document.getElementById((xCoord-1) + '-' + (yCoord)).dataset.status === 'alive') total++;
      if(document.getElementById((xCoord+1) + '-' + (yCoord)) !== null && document.getElementById((xCoord+1) + '-' + (yCoord)).dataset.status === 'alive') total++;
      if(document.getElementById((xCoord-1) + '-' + (yCoord+1)) !== null && document.getElementById((xCoord-1) + '-' + (yCoord+1)).dataset.status === 'alive') total++;
      if(document.getElementById((xCoord) + '-' + (yCoord+1)) !== null && document.getElementById((xCoord) + '-' + (yCoord+1)).dataset.status === 'alive') total++;
      if(document.getElementById((xCoord+1) + '-' + (yCoord+1)) !== null && document.getElementById((xCoord+1) + '-' + (yCoord+1)).dataset.status === 'alive') total++;
    return total;
  },

  // getCell: function(xCoord, yCoord){
  //   return document.getElementById(xCoord + '-' + yCoord);
  // }

};

gameOfLife.createAndShowBoard();
