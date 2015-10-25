var context = new AudioContext();
var currInsTable;
var BPM = 0;
var type = 0;
var note = '';
var noteDuration = 0;
var pauseDuration = 0;
var lines = [''];
var score = [''];

function loadJSON(file, callback) {
  console.log("loadJSON");
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function loadIns(index) {
  console.log("loadIns");
  loadJSON("instruments.json", function(response) {
    var json = JSON.parse(response);
    var real = new Float32Array(json.table[Number(index)].real);
    var imag = new Float32Array(json.table[Number(index)].imag);
    currInsTable = context.createPeriodicWave(real, imag);
  });
}

function loadFreq(callback) {
  console.log("loadFreq");
  if (note != '') {
    loadJSON("noteKey.json", function(response) {
      var json = JSON.parse(response);
      for (var i = 0; i < json.notes.length; i++) {
        if(json.notes[i].note == note) {
          callback(json.notes[i].freq);
        }
      }
    });
  }
  callback(0);
}

function loadType(callback) {
  console.log("loadType");
  if (type != '') {
    loadJSON("typeKey.json", function(response) {
      var json = JSON.parse(response);
      for (var i = 0; i < json.types.length; i++) {
        if(json.types[i].type == type) {
          callback(json.types[i].num);
        }
      }
    });
  }
  callback(0);
}

function produce(freq, callback) {
  console.log("produce");
  if (note.length == 3) {
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.setPeriodicWave(currInsTable);
    oscillator.frequency.value = Number(freq);
    setTimeout(function() {
      oscillator.start(context.currentTime);
    }, pauseDuration);
    setTimeout(function() {
      oscillator.stop(context.currentTime);
    }, noteDuration);
  }
  callback();
}

function play(callback) {
  console.log("play");
  loadFreq(function(freq) {
    produce(freq, function() {
      callback();
    });
  });
}

function initRead(input) {
  console.log("initRead");
  lines = input.split('\n');
  BPM = lines[0].split('=')[1];
  type = lines[1].split('=')[1];
}

function read() {
  console.log("read");
  loadType(function(numType) { 
    score = lines[2].split("");
    var tempNote = '';
    while (note.length != 3 || score[0] == ' ') {
      if (score[0] == '0' || score[0] == '1' || score[0] == '2' || score[0] == '3' || score[0] == '4' || score[0] == '5' || score[0] == '6' || score[0] == '7' || score[0] == '8') {
        tempNote = tempNote.concat(score[0]);
        score.splice(0, 1);
        note = tempNote;
        tempNote = '';
      } else if (score[0] == ' ') {
        noteDuration += ((BPM/numType)*1000)*(1/3);
        score.splice(0, 1);
      } else if (score[0] == '.') {
        pauseDuration += ((BPM/numType)*1000)*(1/3);
        score.splice(0, 1);
      } else {
        tempNote = tempNote.concat(score[0]);
        score.splice(0, 1);
      }
    }
  });
}

function resetValues(callback) {
  console.log("resetValues");
  note = '';
  noteDuration = 0;
  pauseDuration = 0;
  callback();
}

function start() {
  console.log("start");
  loadIns(1);
  if (document.getElementById("score").value != '') {
    initRead(document.getElementById("score").value);
    console.log("note = " + note + ", noteDuration = " + noteDuration + ", pauseDuration = " + pauseDuration + ", score = " + score + ", lines = " + lines);
    while (score.length > 0) {
      play(function() {
        resetValues(function() {
          read();
        });
      });
    }
  }
}
