'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-085d988e.js');

const LoadingSpinner = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
    }
    render() {
        return (index$1.h("div", { class: "loading-spinner" }, index$1.h("svg", { class: "circle-svg", viewBox: "25 25 50 50" }, index$1.h("circle", { class: "circle-stroke-static", fill: "none", cx: "50", cy: "50", r: "20", "stroke-width": "2", "stroke-miterlimit": "10" }))));
    }
    static get style() { return ".loading-spinner{position:relative;text-align:center;margin:0 auto;padding:0;width:60px}.loading-spinner:before{content:\"\";display:block;padding-top:100%}.circle-svg{-webkit-animation:loading-spinner-rotate 2s linear infinite;animation:loading-spinner-rotate 2s linear infinite;-webkit-transform-origin:center center;transform-origin:center center;position:absolute;top:0;bottom:0;left:0;right:0;stroke:#6e8093}.circle-stroke-static{stroke-dasharray:1, 200;stroke-dashoffset:0;-webkit-animation:loading-spinner-dash 1.75s ease-in-out infinite;animation:loading-spinner-dash 1.75s ease-in-out infinite;stroke-linecap:round;stroke-width:1.5px}\@-webkit-keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@-webkit-keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}\@keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}"; }
};

exports.loading_spinner = LoadingSpinner;
