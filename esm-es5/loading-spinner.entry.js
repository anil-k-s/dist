import { r as registerInstance, h } from './index-0c5e530b.js';
var LoadingSpinner = /** @class */ (function () {
    function LoadingSpinner(hostRef) {
        registerInstance(this, hostRef);
    }
    LoadingSpinner.prototype.render = function () {
        return (h("div", { class: "loading-spinner" }, h("svg", { class: "circle-svg", viewBox: "25 25 50 50" }, h("circle", { class: "circle-stroke-static", fill: "none", cx: "50", cy: "50", r: "20", "stroke-width": "2", "stroke-miterlimit": "10" }))));
    };
    Object.defineProperty(LoadingSpinner, "style", {
        get: function () { return ".loading-spinner{position:relative;text-align:center;margin:0 auto;padding:0;width:60px}.loading-spinner:before{content:\"\";display:block;padding-top:100%}.circle-svg{-webkit-animation:loading-spinner-rotate 2s linear infinite;animation:loading-spinner-rotate 2s linear infinite;-webkit-transform-origin:center center;transform-origin:center center;position:absolute;top:0;bottom:0;left:0;right:0;stroke:#6e8093}.circle-stroke-static{stroke-dasharray:1, 200;stroke-dashoffset:0;-webkit-animation:loading-spinner-dash 1.75s ease-in-out infinite;animation:loading-spinner-dash 1.75s ease-in-out infinite;stroke-linecap:round;stroke-width:1.5px}\@-webkit-keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@-webkit-keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}\@keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}"; },
        enumerable: true,
        configurable: true
    });
    return LoadingSpinner;
}());
export { LoadingSpinner as loading_spinner };
