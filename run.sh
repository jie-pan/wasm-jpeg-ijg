#! /bin/bash
for i in 1 2 3 4 5
do
    echo "org"
    time /home/panjie/web/src/v8/v8/out.gn/x64.release/d8 decode-jpeg.js
    echo "opt"
    time /home/panjie/web/src/v8/v8/out.gn/x64.release/d8  --experimental-wasm-simd decode-jpeg.js -- simd
done

