// Start off by initializing a new context.

/*
export function initWebAudio() {
  let context = new (window.AudioContext || window.webkitAudioContext)();

  if (!context.createGain)
    context.createGain = context.createGainNode;
  if (!context.createDelay)
    context.createDelay = context.createDelayNode;
  if (!context.createScriptProcessor)
    context.createScriptProcessor = context.createJavaScriptNode;

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback: any ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();
}

export function playSound(buffer: Number, time: Number) {
  let source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source[source.start ? 'start' : 'noteOn'](time);
}

export function loadSounds(obj: any, soundMap: any, callback: any) {
  // Array-ify
  let names = [];
  let paths = [];
  for (let name in soundMap) {
    let path = soundMap[name];
    names.push(name);
    paths.push(path);
  }
  let bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      obj[name] = buffer;
    }
    if (callback) {
      callback();
    }
  });
  bufferLoader.load();
}

export function BufferLoader(context: any, urlList: any, callback: any) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url: any, index: any) {
  // Load buffer asynchronously
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  let loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer: any) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error: any) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
};
*/
