import { r as registerInstance, h } from './index-0c5e530b.js';
var FloatingLabelInput = /** @class */ (function () {
    function FloatingLabelInput(hostRef) {
        registerInstance(this, hostRef);
    }
    FloatingLabelInput.prototype.render = function () {
        var _this = this;
        return (h("div", null, h("label", { class: {
                "floating-label-container": true,
                "has-content": !!this.value,
                "has-error": !!this.error,
                "has-focus": this.hasFocus
            } }, h("span", { class: "floating-label" }, this.label), h("input", { class: "floating-input", onBlur: function (e) { return _this.handleOnBlur(e); }, onFocus: function (e) { return _this.handleOnFocus(e); }, value: this.value, type: this.type || "text" }), this.error && h("div", { class: "floating-error" }, this.error))));
    };
    Object.defineProperty(FloatingLabelInput, "style", {
        get: function () { return ".floating-label-container{position:relative;width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.floating-label{position:absolute;font-size:16px;color:#6f7780;margin:0 10px;top:20px;-webkit-transition:100ms;transition:100ms}.floating-label-container.has-content .floating-label,.floating-label-container.has-focus .floating-label{top:0;bottom:unset;font-size:12px;font-weight:bold}.floating-label-container.has-focus .floating-label{color:var(--amwell-visit-console-link-color, #1774cc) !important}.floating-error{font-size:13px;color:#d90000;padding:0 10px}.floating-label-container.has-error .floating-label{color:#d90000}.floating-label-container.has-error .floating-input{border-color:#d90000}.floating-input{-ms-flex-positive:1;flex-grow:1;padding:20px 10px 0;line-height:30px;border:none;border-bottom:1px solid  #6f7780;outline:none;margin-bottom:1px;font-size:16px;color:#313336}.floating-input:focus{border-bottom:2px solid var(--amwell-visit-console-link-color, #1774cc) !important;margin-bottom:0}"; },
        enumerable: true,
        configurable: true
    });
    return FloatingLabelInput;
}());
export { FloatingLabelInput as floating_label_input };
