if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,d)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const c=e=>r(e,t),u={module:{uri:t},exports:n,require:c};s[t]=Promise.all(i.map((e=>u[e]||c(e)))).then((e=>(d(...e),n)))}}define(["./workbox-24de250b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"dist/client/_nuxt/C84suS4K.js",revision:"af6da888087f35e6c771a0d1134b6b02"},{url:"dist/client/_nuxt/Cej5YG1v.js",revision:"bbbe39cc8f0ad86bb92f0d2919a9a9fb"},{url:"dist/client/_nuxt/DdxmzoMT.js",revision:"f3335c62653adf4363d5b0b169da30ba"},{url:"dist/client/_nuxt/DENKkQZw.js",revision:"87235409e22d6cdac3b78f5e34b922d2"},{url:"dist/client/_nuxt/DpMA5EdS.js",revision:"30eae1f90f1339e902f911120c3dd11a"},{url:"dist/client/_nuxt/er_VXj5z.js",revision:"71d7b16f05e98b600aa9032f05d0a438"},{url:"dist/client/_nuxt/error-404.C3V-3Mc4.css",revision:"bf62406a55e48b1aee5c97f89b7e90be"},{url:"dist/client/_nuxt/error-500.dGVH929u.css",revision:"653cbb71972dd3145dd66c1c6c043617"},{url:"dist/client/_nuxt/Fuzwablc.js",revision:"586f4a9d2b318fb69650e5634af0f47c"},{url:"dist/client/_nuxt/IGCgZ_mW.js",revision:"eb3b2d48878608375aaa39439b355c83"},{url:"dist/client/_nuxt/nm1Pkz_9.js",revision:"0b37411f30db85930df76677541959e4"},{url:"dist/client/_nuxt/tZjtmBvi.js",revision:"d8f15473096438cddf4b5799e0e936d0"},{url:"dist/client/registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"dist/client/sw.js",revision:"56fc93dda92e3d823d6077a9cf09db3c"},{url:"dist/client/workbox-5ffe50d4.js",revision:"c29cc7cc112f8bcdd32fd0b00b935985"},{url:"dist/server/_nuxt/_id_-D80I0cFu.js",revision:"ad07a1b34dbe1ab81811e65e202a14a8"},{url:"dist/server/_nuxt/add-Ig3pXl5H.js",revision:"b498b3fa6dc13a2e45fe56107e90bd2c"},{url:"dist/server/_nuxt/default-BLYvFKBP.js",revision:"42ab6c87e44ca8a2a4a3970e3333dff6"},{url:"dist/server/_nuxt/entry-styles-1.mjs-dp2lMaN-.js",revision:"f0bc540690c9766d41ec0b43fe376212"},{url:"dist/server/_nuxt/error-404-BrOnnQrl.js",revision:"985f658ea781425694a399c2f887a7d8"},{url:"dist/server/_nuxt/error-404-styles-1.mjs-COU7bu3q.js",revision:"235ee1de1763e910475e9db6d1c6497a"},{url:"dist/server/_nuxt/error-500-DZQsGvrE.js",revision:"2ad6c6567fa87652bfceeaa991c6b2e0"},{url:"dist/server/_nuxt/error-500-styles-1.mjs-Bj5KKHbJ.js",revision:"4a71eba7122a68185e681d799d531e65"},{url:"dist/server/_nuxt/index-C2merokO.js",revision:"2cfba36507e637db99afb721df02633e"},{url:"dist/server/_nuxt/index-CuaxYPbr.js",revision:"1f9ad008812a3292e2b0728c40d2a6c9"},{url:"dist/server/_nuxt/login-BWGc9neu.js",revision:"d97470c2d4d403e6e847caf6a860f2da"},{url:"dist/server/registerSW.js",revision:"1872c500de691dce40960bb85481de07"}],{}),e.registerRoute((({url:e})=>"https://todos.martz.cloud"===e.origin),new e.NetworkFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
