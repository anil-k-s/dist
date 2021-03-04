import { h, r as registerInstance } from './index-0c5e530b.js';
import { c as createCommonjsModule, a as commonjsGlobal, u as unwrapExports } from './_commonjsHelpers-97e6d7b1.js';

var compareVersions = createCommonjsModule(function (module, exports) {
/* global define */
(function (root, factory) {
  /* istanbul ignore next */
  {
    module.exports = factory();
  }
}(commonjsGlobal, function () {

  var semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

  function indexOrEnd(str, q) {
    return str.indexOf(q) === -1 ? str.length : str.indexOf(q);
  }

  function split(v) {
    var c = v.replace(/^v/, '').replace(/\+.*$/, '');
    var patchIndex = indexOrEnd(c, '-');
    var arr = c.substring(0, patchIndex).split('.');
    arr.push(c.substring(patchIndex + 1));
    return arr;
  }

  function tryParse(v) {
    return isNaN(Number(v)) ? v : Number(v);
  }

  function validate(version) {
    if (typeof version !== 'string') {
      throw new TypeError('Invalid argument expected string');
    }
    if (!semver.test(version)) {
      throw new Error('Invalid argument not valid semver (\''+version+'\' received)');
    }
  }

  function compareVersions(v1, v2) {
    [v1, v2].forEach(validate);

    var s1 = split(v1);
    var s2 = split(v2);

    for (var i = 0; i < Math.max(s1.length - 1, s2.length - 1); i++) {
      var n1 = parseInt(s1[i] || 0, 10);
      var n2 = parseInt(s2[i] || 0, 10);

      if (n1 > n2) return 1;
      if (n2 > n1) return -1;
    }

    var sp1 = s1[s1.length - 1];
    var sp2 = s2[s2.length - 1];

    if (sp1 && sp2) {
      var p1 = sp1.split('.').map(tryParse);
      var p2 = sp2.split('.').map(tryParse);

      for (i = 0; i < Math.max(p1.length, p2.length); i++) {
        if (p1[i] === undefined || typeof p2[i] === 'string' && typeof p1[i] === 'number') return -1;
        if (p2[i] === undefined || typeof p1[i] === 'string' && typeof p2[i] === 'number') return 1;

        if (p1[i] > p2[i]) return 1;
        if (p2[i] > p1[i]) return -1;
      }
    } else if (sp1 || sp2) {
      return sp1 ? -1 : 1;
    }

    return 0;
  }
  var allowedOperators = [
    '>',
    '>=',
    '=',
    '<',
    '<='
  ];

  var operatorResMap = {
    '>': [1],
    '>=': [0, 1],
    '=': [0],
    '<=': [-1, 0],
    '<': [-1]
  };

  function validateOperator(op) {
    if (typeof op !== 'string') {
      throw new TypeError('Invalid operator type, expected string but got ' + typeof op);
    }
    if (allowedOperators.indexOf(op) === -1) {
      throw new TypeError('Invalid operator, expected one of ' + allowedOperators.join('|'));
    }
  }

  compareVersions.validate = function(version) {
    return typeof version === 'string' && semver.test(version);
  };

  compareVersions.compare = function (v1, v2, operator) {
    // Validate operator
    validateOperator(operator);

    // since result of compareVersions can only be -1 or 0 or 1
    // a simple map can be used to replace switch
    var res = compareVersions(v1, v2);
    return operatorResMap[operator].indexOf(res) > -1;
  };

  return compareVersions;
}));
});

var get_object = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*!
 * American Well Core Web SDK
 *
 * Copyright (c) 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */

var getProp = function getProp(parts, create, context) {
  var root = context || window;
  var p = void 0;
  for (var i = 0; i < parts.length; i++) {
    p = parts[i].trim();
    try {
      if (!(p in root)) {
        if (create) {
          root[p] = {};
        } else {
          return undefined;
        }
      }
      root = root[p];
    } catch (e) {
      return undefined;
    }
  }
  return root;
};

/**
 * Get a property from a dot-separated string, such as "A.B.C"
 *
 * @param {string} name The dot-separated string to search for in `context`
 * @param {boolean} [create] toggle to create objects at intermediate name locations
 * @param {*} [context] The root context to begin searching. Defaults to `window`
 * @returns {*} Whatever the property found in `name` was, or undefined.
 */
var getObject = function getObject(name, create, context) {
  var parts = name.split('.');
  return getProp(parts, create, context);
};

exports.default = getObject;
});

unwrapExports(get_object);

var replace_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _get_object2 = _interopRequireDefault(get_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// default match pattern
var _pattern = /\{([^}]+)\}/g;

/**
 * Replace tokens in a string template according to some pattern matcher
 *
 * @param {string} template The source template to match against
 * @param {*} map A function to process matches individually, or a dictionary/array to use as lookup for matches
 * @param {RegEx} [pattern] A pattern-matching regular expression, which defaults to matching `{map.key}`
 * @returns {string} the replaced template
 */
/*!
 * American Well Core Web SDK
 *
 * Copyright (c) 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */

var replace = function replace(template, map, pattern) {
  var mapper = typeof map === 'function' ? map : function (_, k) {
    return (0, _get_object2.default)(k, false, map);
  };
  return template.replace(pattern || _pattern, mapper);
};

exports.default = replace;
});

const replace = unwrapExports(replace_1);

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const DrawerHeader = (props) => (h("div", { class: "visit-drawer-header" },
    h("div", { class: "visit-drawer-title" }, props.name),
    h("div", { class: "visit-drawer-close-button", onClick: (e) => props.onCloseClicked(e) },
        h("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
            h("path", { id: "a", d: "M10.943 12L4 5.057 5.057 4 12 10.943 18.943 4 20 5.057 13.057 12 20 18.943 18.943 20 12 13.057 5.057 20 4 18.943 10.943 12z" })))));

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const DrawerButton = (props, children) => (h("div", { class: { 'drawer-button': true, [props.className]: true, 'selected': props.selected }, onClick: (e) => props.onClick(e) },
    h("div", { class: "drawer-icon" }, children),
    h("div", { class: "drawer-button-label" }, props.name),
    props.showNotificationDot && h("div", { class: "notification-dot" })));

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const ChatIcon = () => (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32" },
    h("path", { d: "M6.121 25.274v-3.363H4.364c-.804 0-1.457-.775-1.457-1.726v-8.928c0-.952.653-1.726 1.457-1.726h6.011v5.61c0 2.076 1.63 3.765 3.632 3.765h2.868v1.279c0 .951-.654 1.726-1.457 1.726H9.099l-2.978 3.363zm6.161-15.742h3.136c.803 0 1.457.774 1.457 1.725V17h-2.868c-.951 0-1.725-.834-1.725-1.859V9.532zM25.554 17v3.66L20.975 17h-2.193v-5.743c0-2.003-1.509-3.632-3.364-3.632h-3.136V5.766c0-1.026.774-1.86 1.726-1.86H27.4c.951 0 1.725.834 1.725 1.86v9.375c0 1.025-.774 1.859-1.725 1.859h-1.846zM14.007 2c-2.002 0-3.632 1.689-3.632 3.766v1.86H4.364C2.509 7.626 1 9.255 1 11.257v8.928c0 1.948 1.429 3.543 3.214 3.628v5.569l5.582-5.565h5.621c1.856 0 3.365-1.629 3.365-3.632v-1.279h1.524l7.153 5.716v-5.716c1.976-.033 3.573-1.71 3.573-3.765V5.766C31.032 3.689 29.403 2 27.4 2H14.007z" })));

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const NotesIcon = () => (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32" },
    h("g", { fill: "none", "fill-rule": "nonzero" },
        h("g", { "stroke-width": "1.8", transform: "translate(6 1)" },
            h("path", { d: "M16.486 1.74h3.066c.8 0 1.448.648 1.448 1.448v25.363c0 .8-.648 1.449-1.448 1.449H1.448C.648 30 0 29.351 0 28.55V3.189c0-.8.648-1.449 1.448-1.449h3.44" }),
            h("rect", { width: "10.248", height: "4.548", x: "5.376", y: ".9", rx: "1.449" })),
        h("rect", { width: "11", height: "2", x: "11", y: "12", rx: "1" }),
        h("rect", { width: "11", height: "2", x: "11", y: "17", rx: "1" }),
        h("rect", { width: "11", height: "2", x: "11", y: "22", rx: "1" }))));

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const InviteIcon = () => (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32" },
    h("g", { fill: "none", "stroke-width": "2" },
        h("path", { "stroke-linecap": "round", d: "M31 13h-7M27.5 9.5v7" }),
        h("path", { d: "M15.032 3c4.345 0 7.775 6.185 3.934 12.044-1.442 2.2-1.22 3.84 4.521 5.435 2.626.73 3.513 1.325 3.513 3.268V27a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3.253c0-1.943.887-2.539 3.513-3.268 5.742-1.595 5.963-3.235 4.52-5.435C7.194 9.185 10.624 3 14.969 3h.064z" }))));

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const Modal = (props) => (h("div", { class: { "visit-console-modal-container": true, "hidden": !props.isOpen } },
    h("div", { class: "visit-console-modal" },
        h("div", { class: "visit-console-modal-header" },
            props.title,
            props.closeOnClick &&
                h("button", { onClick: (e) => props.closeOnClick(e) })),
        h("div", { class: "visit-console-modal-body" },
            h("div", { class: "visit-console-modal-content", innerHTML: props.message }),
            h("div", { class: "visit-console-modal-buttons" },
                props.button1Text && h("button", { onClick: (e) => props.button1OnClick && props.button1OnClick(e) }, props.button1Text),
                props.button2Text && h("button", { onClick: (e) => props.button2OnClick && props.button2OnClick(e) }, props.button2Text))))));

const defaultMessages = {
    amwell_visit_console_chat_button_text: 'Chat',
    amwell_visit_console_notes_button_text: 'Visit Notes',
    amwell_visit_console_invite_button_text: 'Invite',
    amwell_visit_console_reload_button_text: 'Reload',
    amwell_visit_console_drawer_chat_title: 'Chat',
    amwell_visit_console_drawer_notes_title: 'Visit Notes',
    amwell_visit_console_drawer_invite_title: 'Invite Guest',
    amwell_visit_console_visit_extension_continue: 'Continue',
    amwell_visit_console_visit_extension_cancel: 'Cancel',
    amwell_visit_console_visit_extension_title: 'Would you like to Extend the Visit?',
    amwell_visit_console_visit_extension_message: 'There is an extension fee of {cost} to extend the visit. Would you like to continue?',
    amwell_visit_console_drawer_tyto_button_text: 'Tyto Device',
    amwell_visit_console_drawer_tyto_header_text: 'Tyto Device',
};

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const ReloadIcon = () => (h("svg", { width: "32", height: "32", viewBox: "0 0 32 32" },
    h("g", { fill: "none", "fill-rule": "evenodd" },
        h("g", { transform: "translate(3 3.518)" },
            h("mask", null,
                h("path", { d: "M0 .865h25.385V26.25H0z" })),
            h("path", { d: "M24.2 10.953h-.028c-.668 0-1.157.598-1.066 1.259a9.677 9.677 0 0 1-.628 4.999c-1.527 3.804-5.045 6.585-9.137 6.832-6.754.408-12.254-5.605-10.964-12.501.786-4.212 4.193-7.57 8.41-8.32 2.848-.506 5.531.152 7.674 1.566h.77a.95.95 0 0 0 .95-.95V3.34A12.584 12.584 0 0 0 10.988.979C5.094 1.76.46 6.694.034 12.624c-.584 8.123 6.525 14.792 14.772 13.454 4.847-.786 8.854-4.43 10.132-9.172.464-1.723.548-3.403.34-4.991a1.093 1.093 0 0 0-1.079-.962", mask: "url(#b)" })),
        h("path", { d: "M23.663 10.229l-5.866.45a1.095 1.095 0 0 1-.168-2.182l4.94-.379-.38-4.941a1.094 1.094 0 0 1 2.183-.167l.45 5.865a1.26 1.26 0 0 1-1.16 1.354" }))));

/*!
 * American Well Visit Console Widget
 *
 * Copyright © 2019 American Well.
 * All rights reserved.
 *
 * It is illegal to use, reproduce or distribute
 * any part of this Intellectual Property without
 * prior written authorization from American Well.
 */
const TytoIcon = () => (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32" },
    h("rect", { id: "backgroundrect", width: "100%", height: "100%", x: "0", y: "0", fill: "none", stroke: "none" }),
    h("path", { fill: "#ffffff", d: "M16.458 7.657c.785-1.598 2.371-2.692 4.2-2.692 2.61 0 4.725 2.223 4.725 4.966 0 2.742-2.115 4.965-4.725 4.965-1.829 0-3.415 1.076-4.2 2.649-.785-1.573-2.37-2.649-4.2-2.649-2.61 0-4.725-2.223-4.725-4.965 0-2.743 2.116-4.966 4.725-4.966 1.83 0 3.415 1.094 4.2 2.692M16.5 0C10.7 0 6 4.94 6 11.034v5.264C6 24.97 12.69 32 20.94 32h1.335c-1.913-1.51-3.15-3.913-3.15-6.62 0-4.571 3.526-8.276 7.875-8.276v-6.07C27 4.94 22.298 0 16.5 0M7.799 14.93c1.167 1.152 2.736 1.857 4.459 1.857 1.104 0 2.104.627 2.607 1.636l1.593 3.191 1.593-3.191c.504-1.01 1.503-1.636 2.607-1.636.493 0 .974-.058 1.436-.167-2.851 1.77-4.768 5.035-4.768 8.76 0 1.574.336 3.087.965 4.448C12.311 28.535 7.8 22.96 7.8 16.298V14.93m17.402-.083v.542c-.305.06-.605.136-.898.226.32-.228.62-.485.898-.768M16.5 1.89c1.555 0 3.017.431 4.282 1.186l-.124-.001c-1.57 0-3.046.584-4.2 1.607a6.313 6.313 0 0 0-4.2-1.607h-.039A8.322 8.322 0 0 1 16.5 1.89" }),
    h("path", { fill: "#ffffff", d: "M28 18a7 7 0 1 0 0 14V18zm-1.999 2.415v9.17A5.008 5.008 0 0 1 23 25 5.007 5.007 0 0 1 26 20.415zM20.5 9a1.5 1.5 0 1 0-.001 2.999A1.5 1.5 0 0 0 20.5 9M12.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" })));

const VisitConsole = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.messages = defaultMessages;
    }
    async onVisitEndListener() {
        await this.destroy();
    }
    onVisitUpdatedListener(event) {
        this.visit = event.detail.visit;
        this.chatWindow.visit = event.detail.visit;
        this.visitNotes.visit = event.detail.visit;
        this.guestInvite.visit = event.detail.visit;
        this.timeRemaining = this.msToTime(this.visit.timeRemainingMilliseconds);
        if (this.visit.paidExtensionOffered && this.visit.longExtensionEntity && !this.extensionOfferAcceptedOrRejected) {
            this.showVisitExtensionModal = true;
        }
    }
    onVisitErrorListener() {
        // As of right now just passing this event through without doing anything
    }
    newMessagesReceivedListener() {
        if (this.activeDrawerName !== 'chat' || (this.activeDrawerName === 'chat' && !this.isDrawerOpen)) {
            this.showChatNotification = true;
        }
    }
    newNotesReceivedListener() {
        if (this.activeDrawerName !== 'notes' || (this.activeDrawerName === 'notes' && !this.isDrawerOpen)) {
            this.showNotesNotification = true;
        }
    }
    /**
     *
     * The initialize function for this widget.
     *
     * Requires an initialized SDK instance and an options object with an PreVisitScreening or InProgress Visit.
     *
     * + `visit`: a PreVisitScreening or InProgress AWSDKVisit instance to use in the WebRTC video experience.
     * + `disableHeader`: set to `true` if the header portion of the visit console should be disabled.
     * + `disableSidebar`: set to `true` if the sidebar portion of the visit console should be disabled.
     * + `messages`: an object of localized string messages.
     * + `locale`: the locale of the visit console i.e. `en-US`.
     *
     */
    async initialize(sdk, options) {
        const validationResult = await this.validateInitialize(sdk, options);
        if (validationResult) {
            return validationResult;
        }
        this.active = true;
        this.sdk = sdk;
        this.systemConfiguration = sdk.getSystemConfiguration();
        this.visit = options.visit;
        this.isHeaderDisabled = options.disableHeader;
        this.isSidebarDisabled = options.disableSidebar;
        // copy over whatever messages are provided to us
        this.messages = Object.assign({}, defaultMessages, options.messages);
        // try to convert the locale to be more BCP 47 locale matcher friendly:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation
        options.locale = options.locale && options.locale.replace('_', '-');
        this.locale = options.locale;
        return this.videoConsole.initialize(this.sdk, options)
            .then(() => this.visitNotes.initialize(this.sdk, options))
            .then(() => this.chatWindow.initialize(this.sdk, options))
            .then(() => this.guestInvite.initialize(this.sdk, options))
            .then(() => this.tytoDevice.initialize(this.sdk, options));
    }
    async validateInitialize(sdk, options) {
        if (!sdk) {
            return Promise.reject('AWSDK is null or undefined');
        }
        const match = sdk.version && sdk.version.match(/(\d\.\d\.\d)/);
        if (!match || compareVersions.compare(match[0], '3.1.0', '<')) {
            return Promise.reject('AWSDK must be at least version 3.1.0 or greater');
        }
        if (!options.visit) {
            return Promise.reject('AWSDKVisit is null or undefined');
        }
        if (!options.visit.disposition
            || (!options.visit.disposition.toString().includes('PreVisitScreening')
                && !options.visit.disposition.toString().includes('InProgress'))) {
            return Promise.reject('AWSDKVisit must have disposition PreVisitScreening or InProgress');
        }
    }
    async destroy() {
        this.active = false;
        this.sdk = null;
        this.visit = null;
        this.activeDrawerName = null;
        this.isDrawerOpen = false;
        this.showChatNotification = false;
        this.showNotesNotification = false;
        this.systemConfiguration = null;
        this.showVisitExtensionModal = false;
        this.extensionOfferAcceptedOrRejected = false;
        this.timeRemaining = null;
        return this.videoConsole.destroy()
            .then(() => this.visitNotes.destroy())
            .then(() => this.chatWindow.destroy())
            .then(() => this.guestInvite.destroy());
    }
    msToTime(ms = 0) {
        const s = ms / 1000;
        const min = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }
    toggleDrawer(drawerName) {
        if (this.activeDrawerName === drawerName) {
            this.isDrawerOpen = !this.isDrawerOpen;
        }
        else {
            this.activeDrawerName = drawerName;
            this.isDrawerOpen = true;
        }
        if (this.activeDrawerName === 'chat') {
            this.showChatNotification = false;
        }
        if (this.activeDrawerName === 'notes') {
            this.showNotesNotification = false;
        }
    }
    acceptVisitExtension(accepted) {
        this.extensionOfferAcceptedOrRejected = true;
        this.sdk.visitService.acceptPaidVisitExtension(this.visit, accepted)
            .then(() => {
            this.showVisitExtensionModal = false;
        })
            .catch(() => { });
    }
    render() {
        const showChat = !this.isSidebarDisabled && this.systemConfiguration && !this.systemConfiguration.alwaysHideChatTabEnabled;
        const showNotes = !this.isSidebarDisabled && this.systemConfiguration && !this.systemConfiguration.alwaysHideNotesTabEnabled;
        const showInvite = !this.isSidebarDisabled && this.systemConfiguration && this.systemConfiguration.multipleVideoParticipantsEnabled;
        const showTytoDrawer = !this.isSidebarDisabled && this.visit && this.visit.tytoLiveStreamingEnabled;
        const isChatOpen = showChat && this.isDrawerOpen && this.activeDrawerName === 'chat';
        const isNotesOpen = showNotes && this.isDrawerOpen && this.activeDrawerName === 'notes';
        const isInviteOpen = showInvite && this.isDrawerOpen && this.activeDrawerName === 'invite';
        const isTytoOpen = showTytoDrawer && this.isDrawerOpen && this.activeDrawerName === 'tyto';
        const hideSideBar = this.isSidebarDisabled || (!showChat && !showNotes && !showInvite && !showTytoDrawer);
        return (h("div", { class: {
                "visit-container": true,
                "hidden": !this.visit || !this.active,
                "header-disabled": this.isHeaderDisabled,
                "header-enabled": !this.isHeaderDisabled,
                "sidebar-disabled": hideSideBar,
                "sidebar-enabled": !hideSideBar,
                "drawer-open": this.isDrawerOpen,
                "bottom-drawer-open": this.isBottomDrawerOpen
            }, dir: document.documentElement.dir }, h("div", { class: "visit-header" }, h("div", { class: "logo-container" }, h("slot", { name: "logo" }))), h("div", { class: "visit-timer" }, this.visit && !this.visit.hidePatientTimer && this.timeRemaining &&
            h("span", null, this.timeRemaining)), h("div", { class: "visit-body" }, h("div", { class: { 'visit-sidebar': true, 'side-shadow': !this.isDrawerOpen } }, showChat &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_chat_button_text, className: 'chat-button', selected: isChatOpen, showNotificationDot: this.showChatNotification, onClick: () => this.toggleDrawer('chat') }, h(ChatIcon, null)), showNotes &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_notes_button_text, className: 'notes-button', selected: isNotesOpen, showNotificationDot: this.showNotesNotification, onClick: () => this.toggleDrawer('notes') }, h(NotesIcon, null)), showInvite &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_invite_button_text, className: 'invite-button', selected: isInviteOpen, onClick: () => this.toggleDrawer('invite') }, h(InviteIcon, null)), showTytoDrawer &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_drawer_tyto_button_text, className: 'tyto-button', selected: isTytoOpen, onClick: () => this.toggleDrawer('tyto') }, h(TytoIcon, null))), h("div", { class: "bottom-drawer" }, h("div", { class: "bottom-drawer-button", onClick: () => this.isBottomDrawerOpen = !this.isBottomDrawerOpen }), h("div", { class: "bottom-drawer-content" }, h("div", { class: "bottom-drawer-buttons" }, showChat &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_chat_button_text, className: 'chat-button', showNotificationDot: this.showChatNotification, onClick: () => this.toggleDrawer('chat') }, h(ChatIcon, null)), showNotes &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_notes_button_text, className: 'notes-button', showNotificationDot: this.showNotesNotification, onClick: () => this.toggleDrawer('notes') }, h(NotesIcon, null)), showInvite &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_invite_button_text, className: 'invite-button', onClick: () => this.toggleDrawer('invite') }, h(InviteIcon, null)), h(DrawerButton, { name: this.messages.amwell_visit_console_reload_button_text, className: 'reload-button', onClick: () => this.videoConsole.refresh() }, h(ReloadIcon, null)), showTytoDrawer &&
            h(DrawerButton, { name: this.messages.amwell_visit_console_drawer_tyto_button_text, className: 'tyto-button', onClick: () => this.toggleDrawer('tyto') }, h(TytoIcon, null))))), h("div", { class: { 'visit-drawer': true, 'side-shadow': true, 'hidden': !this.isDrawerOpen } }, h("div", { class: { 'drawer-content': true, 'chat-drawer': true, 'hidden': this.activeDrawerName !== 'chat' } }, h(DrawerHeader, { onCloseClicked: () => this.isDrawerOpen = false, name: this.messages.amwell_visit_console_drawer_chat_title }), h("amwell-chat-window", { ref: (el) => this.chatWindow = el })), h("div", { class: { 'drawer-content': true, 'notes-drawer': true, 'hidden': this.activeDrawerName !== 'notes' } }, h(DrawerHeader, { onCloseClicked: () => this.isDrawerOpen = false, name: this.messages.amwell_visit_console_drawer_notes_title }), h("amwell-visit-notes", { ref: (el) => this.visitNotes = el })), h("div", { class: { 'drawer-content': true, 'invite-drawer': true, 'hidden': this.activeDrawerName !== 'invite' } }, h(DrawerHeader, { onCloseClicked: () => this.isDrawerOpen = false, name: this.messages.amwell_visit_console_drawer_invite_title }), h("amwell-guest-invite", { ref: (el) => this.guestInvite = el })), h("div", { class: { 'drawer-content': true, 'tyto-device': true, 'hidden': this.activeDrawerName !== 'tyto' } }, h(DrawerHeader, { onCloseClicked: () => this.isDrawerOpen = false, name: this.messages.amwell_visit_console_drawer_tyto_header_text }), h("amwell-tyto-device", { ref: (el) => this.tytoDevice = el }))), h("amwell-video-console", { class: "video-console", ref: (el) => this.videoConsole = el })), this.visit && this.visit.longExtensionEntity && this.systemConfiguration &&
            h(Modal, { isOpen: this.showVisitExtensionModal, title: this.messages.amwell_visit_console_visit_extension_title, message: replace(this.messages.amwell_visit_console_visit_extension_message, { cost: `<u>${new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.systemConfiguration.currencyCode })
                        .format(this.visit.longExtensionEntity.extensionCost)}</u>` }), button1Text: this.messages.amwell_visit_console_visit_extension_continue, button1OnClick: (e) => { e.preventDefault(); this.acceptVisitExtension(true); }, button2Text: this.messages.amwell_visit_console_visit_extension_cancel, button2OnClick: (e) => { e.preventDefault(); this.acceptVisitExtension(false); } })));
    }
    static get style() { return ":root{--amwell-visit-console-button-color:pink;--amwell-visit-console-button-color-hover:deeppink;--amwell-visit-console-button-border-radius:4px;--amwell-visit-console-video-button-color:pink;--amwell-visit-console-video-button-color-hover:deeppink;--amwell-visit-console-end-visit-button-color:pink;--amwell-visit-console-end-visit-button-color-hover:deeppink;--amwell-visit-console-chat-button-color:pink;--amwell-visit-console-chat-button-color-hover:deeppink;--amwell-visit-console-icon-color:green;--amwell-visit-console-bar-color:purple;--amwell-visit-console-bar-color-selected:maroon;--amwell-visit-console-link-color:yellow;--amwell-visit-console-link-color-hover:yellowgreen;--amwell-visit-console-chat-my-messages:orange;--amwell-visit-console-chat-their-messages:orangered}/*!\n * American Well Visit Console Widget\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.visit-container{overflow:hidden;height:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;z-index:0}.visit-body{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;height:100%;-ms-flex:1;flex:1}.visit-header{height:72px;-ms-flex-negative:0;flex-shrink:0;background:#ffffff;-webkit-box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.3);box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.3);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;z-index:23;padding:0 24px}.header-disabled .visit-header{display:none}.video-console{-ms-flex:1;flex:1;height:100%}.visit-timer{font-size:16px;font-weight:600;position:absolute;top:0;left:0;right:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;z-index:25;height:72px;pointer-events:none;-webkit-transition:200ms;transition:200ms}.header-disabled .visit-timer{z-index:1;height:unset;margin-top:16px}.header-disabled.sidebar-enabled .visit-timer{left:96px;right:0}.header-disabled.sidebar-enabled.drawer-open .visit-timer{left:604px;right:0}[dir=\'rtl\'].header-disabled.sidebar-enabled.drawer-open .visit-timer{right:604px;left:0}.header-disabled .visit-timer span{color:#fff;background-color:rgba(0, 0, 0, 0.54);border-radius:4px;padding:8px}.visit-drawer{height:100%;width:508px;background:#fff;z-index:21;-ms-flex-negative:1;flex-shrink:1;-webkit-transition:margin-left 200ms;transition:margin-left 200ms}[dir=\'rtl\'] .visit-drawer{-webkit-transition:margin-right 200ms;transition:margin-right 200ms}.visit-drawer.hidden{position:inherit;width:508px;clip:unset;height:100%;margin:0 0 0 -508px;z-index:-10;white-space:normal}[dir=\'rtl\'] .visit-drawer.hidden{margin:0 -508px 0 0}.drawer-content{height:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;opacity:1}.visit-drawer-header{-ms-flex-negative:0;flex-shrink:0;display:-ms-flexbox;display:flex;font-size:20px;font-weight:600;margin-top:24px;margin-left:24px;margin-right:24px;padding-bottom:13px;-ms-flex-pack:justify;justify-content:space-between;border-bottom:solid 1.1px #d8d8d8}.visit-drawer-title{color:#313336}.visit-drawer-close-button{fill:#464646;cursor:pointer}amwell-visit-notes,amwell-chat-window,amwell-guest-invite{-ms-flex-positive:1;flex-grow:1}.side-shadow{-webkit-box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.5);box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.5)}.visit-sidebar{width:96px;-ms-flex-negative:0;flex-shrink:0;background:var(--amwell-visit-console-bar-color, #63788d) !important;z-index:22;height:100%}.sidebar-disabled .visit-sidebar{display:none}.drawer-button{position:relative;height:90px;width:100%;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;font-weight:600;font-size:12px;color:#ffffff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;cursor:pointer}.drawer-icon{padding:4px}.drawer-button-label{white-space:nowrap}.drawer-button:hover{background-color:rgba(255, 255, 255, 0.17)}.drawer-button.selected,.drawer-button.selected:hover{background-color:var(--amwell-visit-console-bar-color-selected, rgba(255, 255, 255, 0.9)) !important;color:#313336}.notification-dot{top:13px;right:25px;height:12px;width:12px;background-color:#fd5e60;border-radius:50%;position:absolute;border:solid 2px #ffffff}.chat-button path{fill:var(--amwell-visit-console-icon-color, #fff) !important}.chat-button.selected path{fill:var(--amwell-visit-console-bar-color, #63788d) !important}.notes-button g g{stroke:var(--amwell-visit-console-icon-color, #fff) !important}.notes-button.selected g g{stroke:var(--amwell-visit-console-bar-color, #63788d) !important}.notes-button g rect{fill:var(--amwell-visit-console-icon-color, #fff) !important}.notes-button.selected g rect{fill:var(--amwell-visit-console-bar-color, #63788d) !important}.notes-button g g:first-child rect{fill:var(--amwell-visit-console-bar-color, #63788d) !important}.notes-button.selected g g:first-child rect{fill:var(--amwell-visit-console-icon-color, #fff) !important}.invite-button g{stroke:var(--amwell-visit-console-icon-color, #fff) !important}.invite-button.selected g{stroke:var(--amwell-visit-console-bar-color, #63788d) !important}.tyto-button path{fill:var(--amwell-visit-console-icon-color, #fff) !important}.tyto-button.selected path{fill:var(--amwell-visit-console-bar-color, #63788d) !important}.visit-console-modal-container{position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);z-index:2000;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.visit-console-modal{border-radius:10px;-ms-flex-negative:1;flex-shrink:1;overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;text-align:center;max-width:500px}.visit-console-modal-header{background:var(--amwell-visit-console-bar-color, #63788d) !important;color:#fff;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;font-size:24px;font-weight:200;letter-spacing:.37px;position:relative;padding:25px 50px}.visit-console-modal-header button{width:24px;height:24px;position:absolute;background:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTEwLjk0MyAxMkw0IDUuMDU3IDUuMDU3IDQgMTIgMTAuOTQzIDE4Ljk0MyA0IDIwIDUuMDU3IDEzLjA1NyAxMiAyMCAxOC45NDMgMTguOTQzIDIwIDEyIDEzLjA1NyA1LjA1NyAyMCA0IDE4Ljk0MyAxMC45NDMgMTJ6Ii8+CiAgICA8L2RlZnM+CiAgICA8dXNlIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI2EiLz4KPC9zdmc+Cg==\") no-repeat center;border:none;outline:none;right:24px;cursor:pointer}[dir=\'rtl\'] .visit-console-modal-header button{left:28px;right:unset}.visit-console-modal-header button:hover{opacity:.8}.visit-console-modal-body{padding:50px;background:#fff;-ms-flex:1;flex:1;color:#313336;font-size:16px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between}.visit-console-modal-buttons{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin-top:40px}.visit-console-modal-buttons button{cursor:pointer;height:44px;border:none;outline:none;color:#fff;border-radius:var(--amwell-visit-console-button-border-radius, 4px) !important;font-size:20px;font-weight:600;width:120px;padding:8px;margin:10px;background:var(--amwell-visit-console-button-color, #1774CC) !important;-ms-flex-negative:0;flex-shrink:0}.visit-console-modal-buttons button:hover{background:var(--amwell-visit-console-button-color-hover, #156bbd) !important}.bottom-drawer{position:absolute;bottom:-210px;right:0;left:0;display:none;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-webkit-transition:bottom 200ms;transition:bottom 200ms;height:265px;z-index:2}.bottom-drawer-open .bottom-drawer{bottom:0}.bottom-drawer-button{width:92px;height:27px;cursor:pointer;border:none;outline:none}.bottom-drawer-button{background:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDkyIDI2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iLjg4Ij4KICAgICAgICA8cGF0aCBmaWxsPSIjNDY0NjQ2IiBkPSJNMCAyNkMyMi44NjMgMjYgMTkuNDMzIDAgNDUuNzI3IDAgNzIuMDIgMCA2OC41OSAyNiA5MS40NTMgMjZIMHoiLz4KICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzIiBkPSJNMzcuNSAyMS45ODVsNy43NzgtNy43NzhhMSAxIDAgMCAxIDEuNDE0IDBsNy43NzkgNy43NzgiLz4KICAgIDwvZz4KPC9zdmc+Cg==\") no-repeat bottom;background-size:cover}.bottom-drawer-open .bottom-drawer-button{background:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDkyIDI2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iLjg4Ij4KICAgICAgICA8cGF0aCBmaWxsPSIjNDY0NjQ2IiBkPSJNMCAyNkMyMi44NjMgMjYgMTkuNDMzIDAgNDUuNzI3IDAgNzIuMDIgMCA2OC41OSAyNiA5MS40NTMgMjZIMHoiLz4KICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzIiBkPSJNNTQuNDcgMTQuOTg1bC03Ljc3OCA3Ljc3OGExIDEgMCAwIDEtMS40MTQgMEwzNy41IDE0Ljk4NSIvPgogICAgPC9nPgo8L3N2Zz4K\") no-repeat bottom;background-size:cover}.bottom-drawer-content{border-top-left-radius:10px;border-top-right-radius:10px;-ms-flex-positive:1;flex-grow:1;width:100%;background-color:rgba(70, 70, 70, 0.88);padding-top:40px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.bottom-drawer-buttons{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;width:70%}.bottom-drawer-content .drawer-button{position:relative;height:90px;width:70px;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-align:center;align-items:center;font-weight:600;font-size:11px;color:#ffffff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;cursor:pointer}.bottom-drawer-content .drawer-icon{width:56px;height:56px;border-radius:56px;border:solid 2px rgba(255, 255, 255, 0.2);background-color:rgba(0, 0, 0, 0.3);padding:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.bottom-drawer-content .drawer-button:hover{background:unset}.bottom-drawer-content .drawer-button:active .drawer-icon{opacity:.5}.bottom-drawer-content .chat-button path{fill:#fff !important}.bottom-drawer-content .notes-button g g{stroke:#fff !important}.bottom-drawer-content .notes-button g rect{fill:#fff !important}.bottom-drawer-content .notes-button g g:first-child rect{fill:transparent !important}.bottom-drawer-content .invite-button g{stroke:#fff !important}.bottom-drawer-content .tyto-button path{fill:#fff !important}.bottom-drawer-content .reload-button path,.bottom-drawer-content .reload-button mask{fill:#fff !important}\@media screen and (max-width: 768px){.visit-sidebar{display:none}.visit-drawer{max-width:508px;width:100%}.visit-drawer.hidden{position:absolute;-webkit-transition:none;transition:none}.visit-timer{left:0 !important;right:0 !important}.header-enabled .visit-timer{padding:0 24px;-ms-flex-pack:start;justify-content:flex-start}.header-enabled .visit-timer,.visit-header{height:49px}.header-disabled .visit-timer{-webkit-transition:none;transition:none}.logo-container{display:none}.bottom-drawer{display:-ms-flexbox;display:flex}.notification-dot{top:15px;right:15px;height:10px;width:10px;border:none}}\@media screen and (max-width: 440px){.header-disabled .visit-timer{-ms-flex-pack:end;justify-content:end;padding:0 16px;margin-top:165px}.visit-console-modal-body{padding:20px}.visit-console-modal-buttons{margin-top:20px}.visit-console-modal{margin:0 20px}}\@media screen and (max-width: 350px){.visit-console-modal-buttons{-ms-flex-wrap:wrap;flex-wrap:wrap}.visit-console-modal-buttons button{margin:8px 0;width:100%}}.hidden{border:0;clip:rect(0 0 0 0);margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;border:solid 1px #d6d6d6;border-radius:50%}.radioButtonContainer:hover input~.checkmark{background-color:#d6d6d6}.radioButtonContainer input:checked~.checkmark{background:-webkit-gradient(\n    linear,\n    left top, left bottom,\n    from(#0469bd),\n    color-stop(50%, #2989d8),\n    color-stop(51%, #207cca),\n    to(#25abfd)\n  );background:linear-gradient(\n    to bottom,\n    #0469bd 0%,\n    #2989d8 50%,\n    #207cca 51%,\n    #25abfd 100%\n  );}.checkmark:after{content:\"\";position:absolute;display:none}.radioButtonContainer input:checked~.checkmark:after{display:block}.radioButtonContainer .checkmark:after{margin-top:8px;margin-left:8px;width:9px;height:9px;border-radius:50%;background:white}[dir=\"rtl\"] .radioButtonContainer .checkmark:after{margin-right:8px}.radioButtonContainer{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[dir=\"rtl\"] .radioButtonContainer{padding-right:35px}.radioButtonContainer input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.link{color:var(--amwell-visit-console-button-color, #1774CC);cursor:pointer}"; }
};

export { VisitConsole as amwell_visit_console };
