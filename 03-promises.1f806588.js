!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("h6c0i"),u={delay:document.querySelector("[name=delay]"),step:document.querySelector("[name=step]"),amount:document.querySelector("[name=amount]"),createBtn:document.querySelector("button")};function i(e,t,n){return new Promise((function(o,r){var u=Math.random()>.3,i=1===e?t:t+n*(e-1);setTimeout((function(){u?o({position:e,delay:i}):r({position:e,delay:i})}),i)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();for(var t=1;t<=Number(u.amount.value);t+=1)i(t,Number(u.delay.value),Number(u.step.value)).then((function(e){var t=e.position,n=e.delay;r.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;r.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))}));document.querySelector(".form").reset()}))}();
//# sourceMappingURL=03-promises.1f806588.js.map
