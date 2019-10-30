
/*
var wasmBinaryFile = 'jpgsquash.wasm';
const buffer = readbuffer(wasmBinaryFile);
const { instance } = await WebAssembly.instantiate(buffer);
*/


if (arguments.length == 0) {
    load("./jpgsquash.js");
    console.log("scalar");
} else {
    load("./jpgsquash-simd.js");
    console.log("simd");
}

Module['onRuntimeInitialized'] = onRuntimeInitialized;

function transcode(filename, quality)
{
    var imgAsArray = new Uint8Array(readbuffer(filename));
    var len = imgAsArray.byteLength;
    var buf = Module._malloc(len);
    //Module.HEAPU8.set(new Uint8Array(imgAsArray), buf);
    Module.HEAPU8.set(imgAsArray, buf);
    var size = Module._jpg_transcode(buf, len, quality);
    var result = new Uint8Array(Module.HEAPU8.buffer, buf, len);
    //console.log("org size = " + len + ", new file size = " + size);

}

function decode(filename, quality)
{
    var imgAsArray = new Uint8Array(readbuffer(filename));
    var len = imgAsArray.byteLength;
    var buf = Module._malloc(len);
    //Module.HEAPU8.set(new Uint8Array(imgAsArray), buf);
    Module.HEAPU8.set(imgAsArray, buf);
    var size = Module._jpg_decode(buf, len, quality);
    //console.log("org size = " + len + ", new file size = " + size);

}



function onRuntimeInitialized() {

    var filelist = ["js-wa-900.jpg", "jpeg444.jpg", "jpeg422jfif.jpg", "jpeg420exif.jpg", "jpeg400jfif.jpg" ];
    var quality = 100;
    var dirname="images/"
    
    var start = performance.now();
    for (var i = 0; i < filelist.length; i++) {
        filename = dirname + filelist[i];

        for (var j = 0; j < 50; j++)
        {
            //transcode(filename, quality);
            decode(filename, quality);
        }
    }
    var timeused = performance.now() - start;

    console.log(timeused);
}

