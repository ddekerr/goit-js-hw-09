var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var r=n("iQIUW");const u={delay:document.querySelector("[name=delay]"),step:document.querySelector("[name=step]"),amount:document.querySelector("[name=amount]"),createBtn:document.querySelector("button")};function i(e,t,o){return new Promise(((n,r)=>{const u=Math.random()>.3,i=1===e?t:t+o*(e-1);setTimeout((()=>{u?n({position:e,delay:i}):r({position:e,delay:i})}),i)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();for(let e=1;e<=Number(u.amount.value);e+=1)i(e,Number(u.delay.value),Number(u.step.value)).then((({position:e,delay:t})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)}));document.querySelector(".form").reset()}));
//# sourceMappingURL=03-promises.0ae53b9f.js.map
