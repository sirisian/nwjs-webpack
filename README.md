If you are using Windows with WSL then run these first in WSL:

```
export npm_config_nwjs_process_arch=x64;
export npm_config_nwjs_platform=win32;
```

That tells the nw package to download binaries for windows x64 SDK and not the architecture WSL is using. If you're running natively in say Ubuntu you can just run the following:

```
export NWJS_BUILD_TYPE=sdk;
```
and
```
cd container;
npm install
```

npm run build

The ```dist``` directory should now have nwjs files and the webpack bundle. In Windows you can double click the nw.exe, then press f12 to see the debugger.

The goal is so that ```__filename``` is set to ```'./'``` or something equivelant. Right now after I build I insert at the top of the bundle:

```
const __filename = './';
```