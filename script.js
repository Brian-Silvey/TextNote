var context = new AudioContext();
var playing = 0;
var currInsTable;

function loadJSON(file, callback) {
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

function voice(instrument, note) {
  var oscillator;
  var ins = instrument;
  var nt = note;

  this.changeInstrument = function (newInstrument) {
    ins = newInstrument;
  };
  this.changeNote = function (newNote) {
    nt = newNote;
  };
  function play(freq) {
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.setPeriodicWave(currInsTable);
    oscillator.frequency.value = Number(freq);
    oscillator.start(context.currentTime);
  }
  function stop() {
    oscillator.stop(context.currentTime);
  }
  function changeIns(index, json) {
    var real = new Float32Array(json.table[Number(index)].real);
    var imag = new Float32Array(json.table[Number(index)].imag);
    currInsTable = context.createPeriodicWave(real, imag);
  }
  function load(index) {
    loadJSON("instruments.json", function(response) {
      var json = JSON.parse(response);
      changeIns(index, json)
    });
  }

  load(0);
}

function parse(input) {
  var readable = input.split();
  // stuff
};
