import { h, r as registerInstance, c as createEvent } from './index-0c5e530b.js';
import { a as commonjsGlobal, c as createCommonjsModule } from './_commonjsHelpers-97e6d7b1.js';
import { d as defaultMessages$4, T as TytoWizardScreenType } from './tyto-wizard-screen-type.model-45d69098.js';

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString$1 = {}.toString;

var classofRaw = function (it) {
  return toString$1.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap$1 = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$2 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$2();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $forEach = arrayIteration.forEach;



var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype.forEach = arrayForEach;
  }
}

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

var canUseDom = canUseDOM;

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $filter = arrayIteration.filter;



var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var iterators = {};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var defineProperty$1 = objectDefineProperty.f;



var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var nativeAssign = Object.assign;
var defineProperty$2 = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$2({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$2(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$2 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};

var trim = stringTrim.trim;


var $parseInt = global_1.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
_export({ global: true, forced: parseInt != numberParseInt }, {
  parseInt: numberParseInt
});

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$3 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$3(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$3(true)
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$1(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
var defineProperty = objectDefineProperty.f;



var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;
});

var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype$1 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
};

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3]
    || it['@@iterator']
    || iterators[classof(it)];
};

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};
});

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var ITERATOR$4 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  };
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var getWeakData = internalMetadata.getWeakData;








var setInternalState$2 = internalState.set;
var internalStateGetterFor = internalState.getterFor;
var find = arrayIteration.find;
var findIndex = arrayIteration.findIndex;
var id$1 = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id$1++,
        frozen: undefined
      });
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has$1(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

var es_weakMap = createCommonjsModule(function (module) {






var enforceIternalState = internalState.enforce;


var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (nativeWeakMap && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  internalMetadata.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}
});

var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
  if (CollectionPrototype$1) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
    }
    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
    }
    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject$1(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString$1.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_throttle = throttle;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN$1 = 0 / 0;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim$1 = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary$1 = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal$1 = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt$1 = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$2 = objectProto$1.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max,
    nativeMin$1 = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber$1(wait) || 0;
  if (isObject$2(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now$1());
  }

  function debounced() {
    var time = now$1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && objectToString$2.call(value) == symbolTag$1);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN$1;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$2(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim$1, '');
  var isBinary = reIsBinary$1.test(value);
  return (isBinary || reIsOctal$1.test(value))
    ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex$1.test(value) ? NAN$1 : +value);
}

var lodash_debounce = debounce$1;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$2 = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$2 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$2 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal$2 || freeSelf$2 || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root$2['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$3 = objectProto$2.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root$2, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$1.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject$3(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$3(value) ? objectToString$3.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$3(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

var lodash_memoize = memoize;

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle$1 (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$4 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};

var $reduce = arrayReduce.left;



var STRICT_METHOD$1 = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$2 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var defineProperty$3 = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty$3(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$2 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$2] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

// @@match logic
fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regexpExecAbstract(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regexpExecAbstract(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

var max$1 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regexpExecAbstract(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$1(min$2(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

/**
 * SimpleBar.js - v5.0.7
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */

var cachedScrollbarWidth = null;
var cachedDevicePixelRatio = null;

if (canUseDom) {
  window.addEventListener('resize', function () {
    if (cachedDevicePixelRatio !== window.devicePixelRatio) {
      cachedDevicePixelRatio = window.devicePixelRatio;
      cachedScrollbarWidth = null;
    }
  });
}

function scrollbarWidth() {
  if (cachedScrollbarWidth === null) {
    if (typeof document === 'undefined') {
      cachedScrollbarWidth = 0;
      return cachedScrollbarWidth;
    }

    var body = document.body;
    var box = document.createElement('div');
    box.classList.add('simplebar-hide-scrollbar');
    body.appendChild(box);
    var width = box.getBoundingClientRect().right;
    body.removeChild(box);
    cachedScrollbarWidth = width;
  }

  return cachedScrollbarWidth;
}

var SimpleBar =
/*#__PURE__*/
function () {
  function SimpleBar(element, options) {
    var _this = this;

    this.onScroll = function () {
      if (!_this.scrollXTicking) {
        window.requestAnimationFrame(_this.scrollX);
        _this.scrollXTicking = true;
      }

      if (!_this.scrollYTicking) {
        window.requestAnimationFrame(_this.scrollY);
        _this.scrollYTicking = true;
      }
    };

    this.scrollX = function () {
      if (_this.axis.x.isOverflowing) {
        _this.showScrollbar('x');

        _this.positionScrollbar('x');
      }

      _this.scrollXTicking = false;
    };

    this.scrollY = function () {
      if (_this.axis.y.isOverflowing) {
        _this.showScrollbar('y');

        _this.positionScrollbar('y');
      }

      _this.scrollYTicking = false;
    };

    this.onMouseEnter = function () {
      _this.showScrollbar('x');

      _this.showScrollbar('y');
    };

    this.onMouseMove = function (e) {
      _this.mouseX = e.clientX;
      _this.mouseY = e.clientY;

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        _this.onMouseMoveForAxis('x');
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        _this.onMouseMoveForAxis('y');
      }
    };

    this.onMouseLeave = function () {
      _this.onMouseMove.cancel();

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        _this.onMouseLeaveForAxis('x');
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        _this.onMouseLeaveForAxis('y');
      }

      _this.mouseX = -1;
      _this.mouseY = -1;
    };

    this.onWindowResize = function () {
      // Recalculate scrollbarWidth in case it's a zoom
      _this.scrollbarWidth = _this.getScrollbarWidth();

      _this.hideNativeScrollbar();
    };

    this.hideScrollbars = function () {
      _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
      _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

      if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
        _this.axis.y.scrollbar.el.classList.remove(_this.classNames.visible);

        _this.axis.y.isVisible = false;
      }

      if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
        _this.axis.x.scrollbar.el.classList.remove(_this.classNames.visible);

        _this.axis.x.isVisible = false;
      }
    };

    this.onPointerEvent = function (e) {
      var isWithinTrackXBounds, isWithinTrackYBounds;
      _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
      _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
      } // If any pointer event is called on the scrollbar


      if (isWithinTrackXBounds || isWithinTrackYBounds) {
        // Preventing the event's default action stops text being
        // selectable during the drag.
        e.preventDefault(); // Prevent event leaking

        e.stopPropagation();

        if (e.type === 'mousedown') {
          if (isWithinTrackXBounds) {
            _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();

            if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
              _this.onDragStart(e, 'x');
            } else {
              _this.onTrackClick(e, 'x');
            }
          }

          if (isWithinTrackYBounds) {
            _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();

            if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
              _this.onDragStart(e, 'y');
            } else {
              _this.onTrackClick(e, 'y');
            }
          }
        }
      }
    };

    this.drag = function (e) {
      var eventOffset;
      var track = _this.axis[_this.draggedAxis].track;
      var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
      var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
      var contentSize = _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollSizeAttr];
      var hostSize = parseInt(_this.elStyles[_this.axis[_this.draggedAxis].sizeAttr], 10);
      e.preventDefault();
      e.stopPropagation();

      if (_this.draggedAxis === 'y') {
        eventOffset = e.pageY;
      } else {
        eventOffset = e.pageX;
      } // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).


      var dragPos = eventOffset - track.rect[_this.axis[_this.draggedAxis].offsetAttr] - _this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

      var dragPerc = dragPos / (trackSize - scrollbar.size); // Scroll the content by the same percentage.

      var scrollPos = dragPerc * (contentSize - hostSize); // Fix browsers inconsistency on RTL

      if (_this.draggedAxis === 'x') {
        scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? scrollPos - (trackSize + scrollbar.size) : scrollPos;
        scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollPos : scrollPos;
      }

      _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
    };

    this.onEndDrag = function (e) {
      e.preventDefault();
      e.stopPropagation();

      _this.el.classList.remove(_this.classNames.dragging);

      document.removeEventListener('mousemove', _this.drag, true);
      document.removeEventListener('mouseup', _this.onEndDrag, true);
      _this.removePreventClickId = window.setTimeout(function () {
        // Remove these asynchronously so we still suppress click events
        // generated simultaneously with mouseup.
        document.removeEventListener('click', _this.preventClick, true);
        document.removeEventListener('dblclick', _this.preventClick, true);
        _this.removePreventClickId = null;
      });
    };

    this.preventClick = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    this.el = element;
    this.minScrollbarWidth = 20;
    this.options = Object.assign({}, SimpleBar.defaultOptions, {}, options);
    this.classNames = Object.assign({}, SimpleBar.defaultOptions.classNames, {}, this.options.classNames);
    this.axis = {
      x: {
        scrollOffsetAttr: 'scrollLeft',
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetSizeAttr: 'offsetWidth',
        offsetAttr: 'left',
        overflowAttr: 'overflowX',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      },
      y: {
        scrollOffsetAttr: 'scrollTop',
        sizeAttr: 'height',
        scrollSizeAttr: 'scrollHeight',
        offsetSizeAttr: 'offsetHeight',
        offsetAttr: 'top',
        overflowAttr: 'overflowY',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      }
    };
    this.removePreventClickId = null; // Don't re-instantiate over an existing one

    if (SimpleBar.instances.has(this.el)) {
      return;
    }

    this.recalculate = lodash_throttle(this.recalculate.bind(this), 64);
    this.onMouseMove = lodash_throttle(this.onMouseMove.bind(this), 64);
    this.hideScrollbars = lodash_debounce(this.hideScrollbars.bind(this), this.options.timeout);
    this.onWindowResize = lodash_debounce(this.onWindowResize.bind(this), 64, {
      leading: true
    });
    SimpleBar.getRtlHelpers = lodash_memoize(SimpleBar.getRtlHelpers);
    this.init();
  }
  /**
   * Static properties
   */

  /**
   * Helper to fix browsers inconsistency on RTL:
   *  - Firefox inverts the scrollbar initial position
   *  - IE11 inverts both scrollbar position and scrolling offset
   * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
   */


  SimpleBar.getRtlHelpers = function getRtlHelpers() {
    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
    var scrollbarDummyEl = dummyDiv.firstElementChild;
    document.body.appendChild(scrollbarDummyEl);
    var dummyContainerChild = scrollbarDummyEl.firstElementChild;
    scrollbarDummyEl.scrollLeft = 0;
    var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
    var dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
    scrollbarDummyEl.scrollLeft = 999;
    var dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(dummyContainerChild);
    return {
      // determines if the scrolling is responding with negative values
      isRtlScrollingInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left && dummyContainerChildOffset.left - dummyContainerScrollOffsetAfterScroll.left !== 0,
      // determines if the origin scrollbar position is inverted or not (positioned on left or right)
      isRtlScrollbarInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left
    };
  };

  SimpleBar.getOffset = function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top + (window.pageYOffset || document.documentElement.scrollTop),
      left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft)
    };
  };

  var _proto = SimpleBar.prototype;

  _proto.init = function init() {
    // Save a reference to the instance, so we know this DOM node has already been instancied
    SimpleBar.instances.set(this.el, this); // We stop here on server-side

    if (canUseDom) {
      this.initDOM();
      this.scrollbarWidth = this.getScrollbarWidth();
      this.recalculate();
      this.initListeners();
    }
  };

  _proto.initDOM = function initDOM() {
    var _this2 = this;

    // make sure this element doesn't have the elements yet
    if (Array.prototype.filter.call(this.el.children, function (child) {
      return child.classList.contains(_this2.classNames.wrapper);
    }).length) {
      // assume that element has his DOM already initiated
      this.wrapperEl = this.el.querySelector("." + this.classNames.wrapper);
      this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector("." + this.classNames.contentWrapper);
      this.contentEl = this.options.contentNode || this.el.querySelector("." + this.classNames.contentEl);
      this.offsetEl = this.el.querySelector("." + this.classNames.offset);
      this.maskEl = this.el.querySelector("." + this.classNames.mask);
      this.placeholderEl = this.findChild(this.wrapperEl, "." + this.classNames.placeholder);
      this.heightAutoObserverWrapperEl = this.el.querySelector("." + this.classNames.heightAutoObserverWrapperEl);
      this.heightAutoObserverEl = this.el.querySelector("." + this.classNames.heightAutoObserverEl);
      this.axis.x.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.horizontal);
      this.axis.y.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.vertical);
    } else {
      // Prepare DOM
      this.wrapperEl = document.createElement('div');
      this.contentWrapperEl = document.createElement('div');
      this.offsetEl = document.createElement('div');
      this.maskEl = document.createElement('div');
      this.contentEl = document.createElement('div');
      this.placeholderEl = document.createElement('div');
      this.heightAutoObserverWrapperEl = document.createElement('div');
      this.heightAutoObserverEl = document.createElement('div');
      this.wrapperEl.classList.add(this.classNames.wrapper);
      this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
      this.offsetEl.classList.add(this.classNames.offset);
      this.maskEl.classList.add(this.classNames.mask);
      this.contentEl.classList.add(this.classNames.contentEl);
      this.placeholderEl.classList.add(this.classNames.placeholder);
      this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
      this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);

      while (this.el.firstChild) {
        this.contentEl.appendChild(this.el.firstChild);
      }

      this.contentWrapperEl.appendChild(this.contentEl);
      this.offsetEl.appendChild(this.contentWrapperEl);
      this.maskEl.appendChild(this.offsetEl);
      this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
      this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
      this.wrapperEl.appendChild(this.maskEl);
      this.wrapperEl.appendChild(this.placeholderEl);
      this.el.appendChild(this.wrapperEl);
    }

    if (!this.axis.x.track.el || !this.axis.y.track.el) {
      var track = document.createElement('div');
      var scrollbar = document.createElement('div');
      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);
      track.appendChild(scrollbar);
      this.axis.x.track.el = track.cloneNode(true);
      this.axis.x.track.el.classList.add(this.classNames.horizontal);
      this.axis.y.track.el = track.cloneNode(true);
      this.axis.y.track.el.classList.add(this.classNames.vertical);
      this.el.appendChild(this.axis.x.track.el);
      this.el.appendChild(this.axis.y.track.el);
    }

    this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector("." + this.classNames.scrollbar);
    this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector("." + this.classNames.scrollbar);

    if (!this.options.autoHide) {
      this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
      this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
    }

    this.el.setAttribute('data-simplebar', 'init');
  };

  _proto.initListeners = function initListeners() {
    var _this3 = this;

    // Event listeners
    if (this.options.autoHide) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(function (e) {
      _this3.el.addEventListener(e, _this3.onPointerEvent, true);
    });
    ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
      _this3.el.addEventListener(e, _this3.onPointerEvent, {
        capture: true,
        passive: true
      });
    });
    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);
    this.contentWrapperEl.addEventListener('scroll', this.onScroll); // Browser zoom triggers a window resize

    window.addEventListener('resize', this.onWindowResize); // Hack for https://github.com/WICG/ResizeObserver/issues/38

    var resizeObserverStarted = false;
    this.resizeObserver = new index(function () {
      if (!resizeObserverStarted) return;

      _this3.recalculate();
    });
    this.resizeObserver.observe(this.el);
    this.resizeObserver.observe(this.contentEl);
    window.requestAnimationFrame(function () {
      resizeObserverStarted = true;
    }); // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.

    this.mutationObserver = new MutationObserver(this.recalculate);
    this.mutationObserver.observe(this.contentEl, {
      childList: true,
      subtree: true,
      characterData: true
    });
  };

  _proto.recalculate = function recalculate() {
    this.elStyles = window.getComputedStyle(this.el);
    this.isRtl = this.elStyles.direction === 'rtl';
    var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
    var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
    var contentElOffsetWidth = this.contentEl.offsetWidth;
    var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
    var elOverflowX = this.elStyles.overflowX;
    var elOverflowY = this.elStyles.overflowY;
    this.contentEl.style.padding = this.elStyles.paddingTop + " " + this.elStyles.paddingRight + " " + this.elStyles.paddingBottom + " " + this.elStyles.paddingLeft;
    this.wrapperEl.style.margin = "-" + this.elStyles.paddingTop + " -" + this.elStyles.paddingRight + " -" + this.elStyles.paddingBottom + " -" + this.elStyles.paddingLeft;
    var contentElScrollHeight = this.contentEl.scrollHeight;
    var contentElScrollWidth = this.contentEl.scrollWidth;
    this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%'; // Determine placeholder size

    this.placeholderEl.style.width = isWidthAuto ? contentElOffsetWidth + "px" : 'auto';
    this.placeholderEl.style.height = contentElScrollHeight + "px";
    var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
    this.axis.x.isOverflowing = contentElScrollWidth > contentElOffsetWidth;
    this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

    this.axis.x.isOverflowing = elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
    this.axis.y.isOverflowing = elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
    this.axis.x.forceVisible = this.options.forceVisible === 'x' || this.options.forceVisible === true;
    this.axis.y.forceVisible = this.options.forceVisible === 'y' || this.options.forceVisible === true;
    this.hideNativeScrollbar(); // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

    var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
    var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
    this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
    this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
    this.axis.x.scrollbar.size = this.getScrollbarSize('x');
    this.axis.y.scrollbar.size = this.getScrollbarSize('y');
    this.axis.x.scrollbar.el.style.width = this.axis.x.scrollbar.size + "px";
    this.axis.y.scrollbar.el.style.height = this.axis.y.scrollbar.size + "px";
    this.positionScrollbar('x');
    this.positionScrollbar('y');
    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }
  /**
   * Calculate scrollbar size
   */
  ;

  _proto.getScrollbarSize = function getScrollbarSize(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.axis[axis].isOverflowing) {
      return 0;
    }

    var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    var scrollbarSize;
    var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

    scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);

    if (this.options.scrollbarMaxSize) {
      scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
    }

    return scrollbarSize;
  };

  _proto.positionScrollbar = function positionScrollbar(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.axis[axis].isOverflowing) {
      return;
    }

    var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
    var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    var scrollbar = this.axis[axis].scrollbar;
    var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    scrollOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollOffset : scrollOffset;
    var scrollPourcent = scrollOffset / (contentSize - hostSize);
    var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
    handleOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? handleOffset + (trackSize - scrollbar.size) : handleOffset;
    scrollbar.el.style.transform = axis === 'x' ? "translate3d(" + handleOffset + "px, 0, 0)" : "translate3d(0, " + handleOffset + "px, 0)";
  };

  _proto.toggleTrackVisibility = function toggleTrackVisibility(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var track = this.axis[axis].track.el;
    var scrollbar = this.axis[axis].scrollbar.el;

    if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
      track.style.visibility = 'visible';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
    } else {
      track.style.visibility = 'hidden';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
    } // Even if forceVisible is enabled, scrollbar itself should be hidden


    if (this.axis[axis].isOverflowing) {
      scrollbar.style.display = 'block';
    } else {
      scrollbar.style.display = 'none';
    }
  };

  _proto.hideNativeScrollbar = function hideNativeScrollbar() {
    this.offsetEl.style[this.isRtl ? 'left' : 'right'] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
    this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
  }
  /**
   * On scroll event handling
   */
  ;

  _proto.onMouseMoveForAxis = function onMouseMoveForAxis(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    this.axis[axis].track.rect = this.axis[axis].track.el.getBoundingClientRect();
    this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
    var isWithinScrollbarBoundsX = this.isWithinBounds(this.axis[axis].scrollbar.rect);

    if (isWithinScrollbarBoundsX) {
      this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
    }

    if (this.isWithinBounds(this.axis[axis].track.rect)) {
      this.showScrollbar(axis);
      this.axis[axis].track.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].track.el.classList.remove(this.classNames.hover);
    }
  };

  _proto.onMouseLeaveForAxis = function onMouseLeaveForAxis(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    this.axis[axis].track.el.classList.remove(this.classNames.hover);
    this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
  };

  /**
   * Show scrollbar
   */
  _proto.showScrollbar = function showScrollbar(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var scrollbar = this.axis[axis].scrollbar.el;

    if (!this.axis[axis].isVisible) {
      scrollbar.classList.add(this.classNames.visible);
      this.axis[axis].isVisible = true;
    }

    if (this.options.autoHide) {
      this.hideScrollbars();
    }
  }
  /**
   * Hide Scrollbar
   */
  ;

  /**
   * on scrollbar handle drag movement starts
   */
  _proto.onDragStart = function onDragStart(e, axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var scrollbar = this.axis[axis].scrollbar; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

    var eventOffset = axis === 'y' ? e.pageY : e.pageX;
    this.axis[axis].dragOffset = eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
    this.draggedAxis = axis;
    this.el.classList.add(this.classNames.dragging);
    document.addEventListener('mousemove', this.drag, true);
    document.addEventListener('mouseup', this.onEndDrag, true);

    if (this.removePreventClickId === null) {
      document.addEventListener('click', this.preventClick, true);
      document.addEventListener('dblclick', this.preventClick, true);
    } else {
      window.clearTimeout(this.removePreventClickId);
      this.removePreventClickId = null;
    }
  }
  /**
   * Drag scrollbar handle
   */
  ;

  _proto.onTrackClick = function onTrackClick(e, axis) {
    var _this4 = this;

    if (axis === void 0) {
      axis = 'y';
    }

    this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
    var scrollbar = this.axis[axis].scrollbar;
    var scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
    var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    var t = axis === 'y' ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
    var dir = t < 0 ? -1 : 1;
    var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
    var speed = 40;

    var scrollTo = function scrollTo() {
      if (dir === -1) {
        if (scrolled > scrollSize) {
          var _this4$contentWrapper;

          scrolled -= speed;

          _this4.contentWrapperEl.scrollTo((_this4$contentWrapper = {}, _this4$contentWrapper[_this4.axis[axis].offsetAttr] = scrolled, _this4$contentWrapper));

          window.requestAnimationFrame(scrollTo);
        }
      } else {
        if (scrolled < scrollSize) {
          var _this4$contentWrapper2;

          scrolled += speed;

          _this4.contentWrapperEl.scrollTo((_this4$contentWrapper2 = {}, _this4$contentWrapper2[_this4.axis[axis].offsetAttr] = scrolled, _this4$contentWrapper2));

          window.requestAnimationFrame(scrollTo);
        }
      }
    };

    scrollTo();
  }
  /**
   * Getter for content element
   */
  ;

  _proto.getContentElement = function getContentElement() {
    return this.contentEl;
  }
  /**
   * Getter for original scrolling element
   */
  ;

  _proto.getScrollElement = function getScrollElement() {
    return this.contentWrapperEl;
  };

  _proto.getScrollbarWidth = function getScrollbarWidth() {
    // Try/catch for FF 56 throwing on undefined computedStyles
    try {
      // Detect Chrome/Firefox and do not calculate
      if (getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar').display === 'none' || 'scrollbarWidth' in document.documentElement.style) {
        return 0;
      } else {
        return scrollbarWidth();
      }
    } catch (e) {
      return scrollbarWidth();
    }
  };

  _proto.removeListeners = function removeListeners() {
    var _this5 = this;

    // Event listeners
    if (this.options.autoHide) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(function (e) {
      _this5.el.removeEventListener(e, _this5.onPointerEvent, true);
    });
    ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
      _this5.el.removeEventListener(e, _this5.onPointerEvent, {
        capture: true,
        passive: true
      });
    });
    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);
    this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onWindowResize);
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect(); // Cancel all debounced functions

    this.recalculate.cancel();
    this.onMouseMove.cancel();
    this.hideScrollbars.cancel();
    this.onWindowResize.cancel();
  }
  /**
   * UnMount mutation observer and delete SimpleBar instance from DOM element
   */
  ;

  _proto.unMount = function unMount() {
    this.removeListeners();
    SimpleBar.instances.delete(this.el);
  }
  /**
   * Check if mouse is within bounds
   */
  ;

  _proto.isWithinBounds = function isWithinBounds(bbox) {
    return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
  }
  /**
   * Find element children matches query
   */
  ;

  _proto.findChild = function findChild(el, query) {
    var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    return Array.prototype.filter.call(el.children, function (child) {
      return matches.call(child, query);
    })[0];
  };

  return SimpleBar;
}();

SimpleBar.defaultOptions = {
  autoHide: true,
  forceVisible: false,
  classNames: {
    contentEl: 'simplebar-content',
    contentWrapper: 'simplebar-content-wrapper',
    offset: 'simplebar-offset',
    mask: 'simplebar-mask',
    wrapper: 'simplebar-wrapper',
    placeholder: 'simplebar-placeholder',
    scrollbar: 'simplebar-scrollbar',
    track: 'simplebar-track',
    heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
    heightAutoObserverEl: 'simplebar-height-auto-observer',
    visible: 'simplebar-visible',
    horizontal: 'simplebar-horizontal',
    vertical: 'simplebar-vertical',
    hover: 'simplebar-hover',
    dragging: 'simplebar-dragging'
  },
  scrollbarMinSize: 25,
  scrollbarMaxSize: 0,
  timeout: 1000
};
SimpleBar.instances = new WeakMap();

// Helper function to retrieve options from element attributes
var getOptions = function getOptions(obj) {
  var options = Array.prototype.reduce.call(obj, function (acc, attribute) {
    var option = attribute.name.match(/data-simplebar-(.+)/);

    if (option) {
      var key = option[1].replace(/\W+(.)/g, function (x, chr) {
        return chr.toUpperCase();
      });

      switch (attribute.value) {
        case 'true':
          acc[key] = true;
          break;

        case 'false':
          acc[key] = false;
          break;

        case undefined:
          acc[key] = true;
          break;

        default:
          acc[key] = attribute.value;
      }
    }

    return acc;
  }, {});
  return options;
};

SimpleBar.initDOMLoadedElements = function () {
  document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
  window.removeEventListener('load', this.initDOMLoadedElements);
  Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]:not([data-simplebar="init"])'), function (el) {
    if (!SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
  });
};

SimpleBar.removeObserver = function () {
  this.globalObserver.disconnect();
};

SimpleBar.initHtmlApi = function () {
  this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

  if (typeof MutationObserver !== 'undefined') {
    // Mutation observer to observe dynamically added elements
    this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
    this.globalObserver.observe(document, {
      childList: true,
      subtree: true
    });
  } // Taken from jQuery `ready` function
  // Instantiate elements already present on the page


  if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay init
    window.setTimeout(this.initDOMLoadedElements);
  } else {
    document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
    window.addEventListener('load', this.initDOMLoadedElements);
  }
};

SimpleBar.handleMutations = function (mutations) {
  mutations.forEach(function (mutation) {
    Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
      if (addedNode.nodeType === 1) {
        if (addedNode.hasAttribute('data-simplebar')) {
          !SimpleBar.instances.has(addedNode) && new SimpleBar(addedNode, getOptions(addedNode.attributes));
        } else {
          Array.prototype.forEach.call(addedNode.querySelectorAll('[data-simplebar]:not([data-simplebar="init"])'), function (el) {
            !SimpleBar.instances.has(el) && new SimpleBar(el, getOptions(el.attributes));
          });
        }
      }
    });
    Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
      if (removedNode.nodeType === 1) {
        if (removedNode.hasAttribute('[data-simplebar="init"]')) {
          SimpleBar.instances.has(removedNode) && SimpleBar.instances.get(removedNode).unMount();
        } else {
          Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
            SimpleBar.instances.has(el) && SimpleBar.instances.get(el).unMount();
          });
        }
      }
    });
  });
};

SimpleBar.getOptions = getOptions;
/**
 * HTML API
 * Called only in a browser env.
 */

if (canUseDom) {
  SimpleBar.initHtmlApi();
}

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
const LargeChatIcon = () => (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "128", height: "128" },
    h("path", { d: "M64 125c33.69 0 61-27.31 61-61S97.69 3 64 3 3 30.31 3 64s27.31 61 61 61zm0 3C28.654 128 0 99.346 0 64 0 28.654 28.654 0 64 0c35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64z" }),
    h("path", { transform: "translate(28 28)", d: "M13.772 56.867V49.3H9.82c-1.809 0-3.278-1.744-3.278-3.884V25.328c0-2.142 1.469-3.883 3.278-3.883h13.525v12.622c0 4.671 3.667 8.471 8.172 8.471h6.453v2.878c0 2.14-1.472 3.884-3.279 3.884H20.474l-6.7 7.567zm13.862-35.42h7.056c1.807 0 3.279 1.742 3.279 3.881V38.25h-6.453c-2.14 0-3.881-1.877-3.881-4.183v-12.62zM57.496 38.25v8.235L47.194 38.25H42.26V25.328c0-4.506-3.396-8.172-7.57-8.172h-7.055v-4.182c0-2.309 1.741-4.185 3.883-4.185H61.65c2.14 0 3.881 1.876 3.881 4.184v21.094c0 2.306-1.741 4.183-3.881 4.183h-4.154zM31.516 4.5c-4.505 0-8.172 3.8-8.172 8.473v4.185H9.819c-4.174 0-7.569 3.666-7.569 8.17v20.088c0 4.383 3.215 7.972 7.232 8.163v12.53L22.04 53.59h12.647c4.176 0 7.572-3.666 7.572-8.173V42.54h3.428l16.095 12.86V42.54c4.446-.075 8.039-3.848 8.039-8.472V12.974c0-4.674-3.665-8.474-8.172-8.474H31.516z" })));

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
const SendIcon = () => (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32" },
    h("path", { d: "M11.356 30.638c.07-.212-2.406-6.18-2.406-6.18-.484-1.169.076-1.73 1.245-1.252l2.67 1.093c1.168.478 1.561 1.739.87 2.796 0 0-2.448 3.75-2.38 3.543zM1.81 16.491L29.048 2.21c1.118-.586 1.763-.068 1.431 1.151l-5.88 21.61c-.332 1.22-1.584 1.78-2.756 1.304l-3.858-1.57a337.718 337.718 0 0 0-4.27-1.698l-.408-.159c-1.178-.455-1.434-1.586-.569-2.506l11.94-12.78c.863-.923.756-1.038-.237-.257L9.338 19.214c-.996.778-2.774 1.032-3.949.566l-3.478-1.376c-1.174-.465-1.22-1.325-.1-1.913z" })));

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
const AdminMessage = ({ chatItem, i18messages }) => {
    let title;
    let showBorder = true;
    switch (chatItem.messageType) {
        case 'Transfer':
            title = i18messages.amwell_chat_window_please_stay_online;
            break;
        case 'ProviderEnter':
            title = i18messages.amwell_chat_window_visit_begun;
            showBorder = false;
            break;
    }
    return (h("div", { class: { 'chat-item': true, 'admin-message': true, 'admin-message-border': showBorder } },
        title && h("h3", null, title),
        chatItem.message));
};

var MILLISECONDS_IN_MINUTE = 60000;

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
var getTimezoneOffsetInMilliseconds = function getTimezoneOffsetInMilliseconds (dirtyDate) {
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = date.getTimezoneOffset();
  date.setSeconds(0, 0);
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE;

  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset
};

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

var is_date = isDate;

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE$1 = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var parseTokenDateTimeDelimeter = /[T ]/;
var parseTokenPlainTime = /:/;

// year tokens
var parseTokenYY = /^(\d{2})$/;
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
];

var parseTokenYYYY = /^(\d{4})/;
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
];

// date tokens
var parseTokenMM = /^-(\d{2})$/;
var parseTokenDDD = /^-?(\d{3})$/;
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
var parseTokenWww = /^-?W(\d{2})$/;
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/;
var parseTokenTimezoneZ = /^(Z)$/;
var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (is_date(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits;
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  } else {
    additionalDigits = Number(additionalDigits);
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE$1;
    } else {
      var fullTime = timestamp + time;
      var fullTimeDate = new Date(fullTime);

      offset = getTimezoneOffsetInMilliseconds(fullTimeDate);

      // Adjust time when it's coming from DST
      var fullTimeDateNextDay = new Date(fullTime);
      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1);
      var offsetDiff =
        getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) -
        getTimezoneOffsetInMilliseconds(fullTimeDate);
      if (offsetDiff > 0) {
        offset += offsetDiff;
      }
    }

    return new Date(timestamp + time + offset)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {};
  var array = dateString.split(parseTokenDateTimeDelimeter);
  var timeString;

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits];
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = parseTokenHH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE$1
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE$1 +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString);
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

var parse_1 = parse;

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, dirtyAmount) {
  var date = parse_1(dirtyDate);
  var amount = Number(dirtyAmount);
  date.setDate(date.getDate() + amount);
  return date
}

var add_days = addDays;

/**
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @returns {Date} the new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds (dirtyDate, dirtyAmount) {
  var timestamp = parse_1(dirtyDate).getTime();
  var amount = Number(dirtyAmount);
  return new Date(timestamp + amount)
}

var add_milliseconds = addMilliseconds;

var MILLISECONDS_IN_HOUR$1 = 3600000;

/**
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added
 * @returns {Date} the new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_milliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR$1)
}

var add_hours = addHours;

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;

  var date = parse_1(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_week = startOfWeek;

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek (dirtyDate) {
  return start_of_week(dirtyDate, {weekStartsOn: 1})
}

var start_of_iso_week = startOfISOWeek;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = start_of_iso_week(fourthOfJanuaryOfNextYear);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = start_of_iso_week(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

var get_iso_year = getISOYear;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear (dirtyDate) {
  var year = get_iso_year(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = start_of_iso_week(fourthOfJanuary);
  return date
}

var start_of_iso_year = startOfISOYear;

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_day = startOfDay;

var MILLISECONDS_IN_MINUTE$2 = 60000;
var MILLISECONDS_IN_DAY = 86400000;

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = start_of_day(dirtyDateLeft);
  var startOfDayRight = start_of_day(dirtyDateRight);

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$2;
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$2;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

var difference_in_calendar_days = differenceInCalendarDays;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date,
 * saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} isoYear - the ISO week-numbering year of the new date
 * @returns {Date} the new date with the ISO week-numbering year setted
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * var result = setISOYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
function setISOYear (dirtyDate, dirtyISOYear) {
  var date = parse_1(dirtyDate);
  var isoYear = Number(dirtyISOYear);
  var diff = difference_in_calendar_days(date, start_of_iso_year(date));
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(isoYear, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  date = start_of_iso_year(fourthOfJanuary);
  date.setDate(date.getDate() + diff);
  return date
}

var set_iso_year = setISOYear;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be added
 * @returns {Date} the new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * var result = addISOYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
function addISOYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return set_iso_year(dirtyDate, get_iso_year(dirtyDate) + amount)
}

var add_iso_years = addISOYears;

var MILLISECONDS_IN_MINUTE$3 = 60000;

/**
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @returns {Date} the new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_milliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE$3)
}

var add_minutes = addMinutes;

/**
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate()
}

var get_days_in_month = getDaysInMonth;

/**
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths (dirtyDate, dirtyAmount) {
  var date = parse_1(dirtyDate);
  var amount = Number(dirtyAmount);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = get_days_in_month(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date
}

var add_months = addMonths;

/**
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be added
 * @returns {Date} the new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * var result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
function addQuarters (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  var months = amount * 3;
  return add_months(dirtyDate, months)
}

var add_quarters = addQuarters;

/**
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be added
 * @returns {Date} the new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * var result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_milliseconds(dirtyDate, amount * 1000)
}

var add_seconds = addSeconds;

/**
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added
 * @returns {Date} the new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * var result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  var days = amount * 7;
  return add_days(dirtyDate, days)
}

var add_weeks = addWeeks;

/**
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_months(dirtyDate, amount * 12)
}

var add_years = addYears;

/**
 * @category Range Helpers
 * @summary Is the given date range overlapping with another date range?
 *
 * @description
 * Is the given date range overlapping with another date range?
 *
 * @param {Date|String|Number} initialRangeStartDate - the start of the initial range
 * @param {Date|String|Number} initialRangeEndDate - the end of the initial range
 * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with
 * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with
 * @returns {Boolean} whether the date ranges are overlapping
 * @throws {Error} startDate of a date range cannot be after its endDate
 *
 * @example
 * // For overlapping date ranges:
 * areRangesOverlapping(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping date ranges:
 * areRangesOverlapping(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)
 * )
 * //=> false
 */
function areRangesOverlapping (dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
  var initialStartTime = parse_1(dirtyInitialRangeStartDate).getTime();
  var initialEndTime = parse_1(dirtyInitialRangeEndDate).getTime();
  var comparedStartTime = parse_1(dirtyComparedRangeStartDate).getTime();
  var comparedEndTime = parse_1(dirtyComparedRangeEndDate).getTime();

  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime
}

var are_ranges_overlapping = areRangesOverlapping;

/**
 * @category Common Helpers
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date[]|String[]|Number[]} datesArray - the array to search
 * @returns {Number} an index of the date closest to the given date
 * @throws {TypeError} the second argument must be an instance of Array
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * var dateToCompare = new Date(2015, 8, 6)
 * var datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * var result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
function closestIndexTo (dirtyDateToCompare, dirtyDatesArray) {
  if (!(dirtyDatesArray instanceof Array)) {
    throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')
  }

  var dateToCompare = parse_1(dirtyDateToCompare);
  var timeToCompare = dateToCompare.getTime();

  var result;
  var minDistance;

  dirtyDatesArray.forEach(function (dirtyDate, index) {
    var currentDate = parse_1(dirtyDate);
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result === undefined || distance < minDistance) {
      result = index;
      minDistance = distance;
    }
  });

  return result
}

var closest_index_to = closestIndexTo;

/**
 * @category Common Helpers
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date[]|String[]|Number[]} datesArray - the array to search
 * @returns {Date} the date from the array closest to the given date
 * @throws {TypeError} the second argument must be an instance of Array
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * var dateToCompare = new Date(2015, 8, 6)
 * var result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
function closestTo (dirtyDateToCompare, dirtyDatesArray) {
  if (!(dirtyDatesArray instanceof Array)) {
    throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')
  }

  var dateToCompare = parse_1(dirtyDateToCompare);
  var timeToCompare = dateToCompare.getTime();

  var result;
  var minDistance;

  dirtyDatesArray.forEach(function (dirtyDate) {
    var currentDate = parse_1(dirtyDate);
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result === undefined || distance < minDistance) {
      result = currentDate;
      minDistance = distance;
    }
  });

  return result
}

var closest_to = closestTo;

/**
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * var result = compareAsc(
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * )
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var timeLeft = dateLeft.getTime();
  var dateRight = parse_1(dirtyDateRight);
  var timeRight = dateRight.getTime();

  if (timeLeft < timeRight) {
    return -1
  } else if (timeLeft > timeRight) {
    return 1
  } else {
    return 0
  }
}

var compare_asc = compareAsc;

/**
 * @category Common Helpers
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * var result = compareDesc(
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * )
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
function compareDesc (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var timeLeft = dateLeft.getTime();
  var dateRight = parse_1(dirtyDateRight);
  var timeRight = dateRight.getTime();

  if (timeLeft > timeRight) {
    return -1
  } else if (timeLeft < timeRight) {
    return 1
  } else {
    return 0
  }
}

var compare_desc = compareDesc;

var MILLISECONDS_IN_MINUTE$4 = 60000;
var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @category ISO Week Helpers
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO weeks
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * var result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6)
 * )
 * //=> 3
 */
function differenceInCalendarISOWeeks (dirtyDateLeft, dirtyDateRight) {
  var startOfISOWeekLeft = start_of_iso_week(dirtyDateLeft);
  var startOfISOWeekRight = start_of_iso_week(dirtyDateRight);

  var timestampLeft = startOfISOWeekLeft.getTime() -
    startOfISOWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$4;
  var timestampRight = startOfISOWeekRight.getTime() -
    startOfISOWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$4;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)
}

var difference_in_calendar_iso_weeks = differenceInCalendarISOWeeks;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO week-numbering years
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * var result = differenceInCalendarISOYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
function differenceInCalendarISOYears (dirtyDateLeft, dirtyDateRight) {
  return get_iso_year(dirtyDateLeft) - get_iso_year(dirtyDateRight)
}

var difference_in_calendar_iso_years = differenceInCalendarISOYears;

/**
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();

  return yearDiff * 12 + monthDiff
}

var difference_in_calendar_months = differenceInCalendarMonths;

/**
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * var result = getQuarter(new Date(2014, 6, 2))
 * //=> 3
 */
function getQuarter (dirtyDate) {
  var date = parse_1(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter
}

var get_quarter = getQuarter;

/**
 * @category Quarter Helpers
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * var result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
function differenceInCalendarQuarters (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var quarterDiff = get_quarter(dateLeft) - get_quarter(dateRight);

  return yearDiff * 4 + quarterDiff
}

var difference_in_calendar_quarters = differenceInCalendarQuarters;

var MILLISECONDS_IN_MINUTE$5 = 60000;
var MILLISECONDS_IN_WEEK$1 = 604800000;

/**
 * @category Week Helpers
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   {weekStartsOn: 1}
 * )
 * //=> 2
 */
function differenceInCalendarWeeks (dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  var startOfWeekLeft = start_of_week(dirtyDateLeft, dirtyOptions);
  var startOfWeekRight = start_of_week(dirtyDateRight, dirtyOptions);

  var timestampLeft = startOfWeekLeft.getTime() -
    startOfWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$5;
  var timestampRight = startOfWeekRight.getTime() -
    startOfWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$5;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK$1)
}

var difference_in_calendar_weeks = differenceInCalendarWeeks;

/**
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * var result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInCalendarYears (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  return dateLeft.getFullYear() - dateRight.getFullYear()
}

var difference_in_calendar_years = differenceInCalendarYears;

/**
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full days
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 */
function differenceInDays (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  var sign = compare_asc(dateLeft, dateRight);
  var difference = Math.abs(difference_in_calendar_days(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastDayNotFull = compare_asc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastDayNotFull)
}

var difference_in_days = differenceInDays;

/**
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * var result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime()
}

var difference_in_milliseconds = differenceInMilliseconds;

var MILLISECONDS_IN_HOUR$2 = 3600000;

/**
 * @category Hour Helpers
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of hours
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * var result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
function differenceInHours (dirtyDateLeft, dirtyDateRight) {
  var diff = difference_in_milliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_HOUR$2;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

var difference_in_hours = differenceInHours;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be subtracted
 * @returns {Date} the new date with the ISO week-numbering years subtracted
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * var result = subISOYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
function subISOYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_iso_years(dirtyDate, -amount)
}

var sub_iso_years = subISOYears;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * var result = differenceInISOYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 1
 */
function differenceInISOYears (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  var sign = compare_asc(dateLeft, dateRight);
  var difference = Math.abs(difference_in_calendar_iso_years(dateLeft, dateRight));
  dateLeft = sub_iso_years(dateLeft, sign * difference);

  // Math.abs(diff in full ISO years - diff in calendar ISO years) === 1
  // if last calendar ISO year is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastISOYearNotFull = compare_asc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastISOYearNotFull)
}

var difference_in_iso_years = differenceInISOYears;

var MILLISECONDS_IN_MINUTE$6 = 60000;

/**
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the number of minutes between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of minutes
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * var result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 */
function differenceInMinutes (dirtyDateLeft, dirtyDateRight) {
  var diff = difference_in_milliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE$6;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

var difference_in_minutes = differenceInMinutes;

/**
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 7
 */
function differenceInMonths (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  var sign = compare_asc(dateLeft, dateRight);
  var difference = Math.abs(difference_in_calendar_months(dateLeft, dateRight));
  dateLeft.setMonth(dateLeft.getMonth() - sign * difference);

  // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastMonthNotFull = compare_asc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastMonthNotFull)
}

var difference_in_months = differenceInMonths;

/**
 * @category Quarter Helpers
 * @summary Get the number of full quarters between the given dates.
 *
 * @description
 * Get the number of full quarters between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full quarters
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * var result = differenceInQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInQuarters (dirtyDateLeft, dirtyDateRight) {
  var diff = difference_in_months(dirtyDateLeft, dirtyDateRight) / 3;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

var difference_in_quarters = differenceInQuarters;

/**
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * var result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds (dirtyDateLeft, dirtyDateRight) {
  var diff = difference_in_milliseconds(dirtyDateLeft, dirtyDateRight) / 1000;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

var difference_in_seconds = differenceInSeconds;

/**
 * @category Week Helpers
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full weeks
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 2
 */
function differenceInWeeks (dirtyDateLeft, dirtyDateRight) {
  var diff = difference_in_days(dirtyDateLeft, dirtyDateRight) / 7;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

var difference_in_weeks = differenceInWeeks;

/**
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * var result = differenceInYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 1
 */
function differenceInYears (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);

  var sign = compare_asc(dateLeft, dateRight);
  var difference = Math.abs(difference_in_calendar_years(dateLeft, dateRight));
  dateLeft.setFullYear(dateLeft.getFullYear() - sign * difference);

  // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastYearNotFull = compare_asc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastYearNotFull)
}

var difference_in_years = differenceInYears;

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };

  function localize (token, count, options) {
    options = options || {};

    var result;
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token];
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one;
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count);
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

var build_distance_in_words_locale = buildDistanceInWordsLocale;

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
];

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = [];
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key);
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse();
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  );

  return formattingTokensRegExp
}

var build_formatting_tokens_reg_exp = buildFormattingTokensRegExp;

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var meridiemUppercase = ['AM', 'PM'];
  var meridiemLowercase = ['am', 'pm'];
  var meridiemFull = ['a.m.', 'p.m.'];

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  };

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W'];
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    };
  });

  return {
    formatters: formatters,
    formattingTokensRegExp: build_formatting_tokens_reg_exp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

var build_format_locale = buildFormatLocale;

/**
 * @category Locales
 * @summary English locale.
 */
var en = {
  distanceInWords: build_distance_in_words_locale(),
  format: build_format_locale()
};

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;

/**
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date|String|Number} date - the other date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = distanceInWords(
 *   new Date(2014, 6, 2),
 *   new Date(2015, 0, 1)
 * )
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * var result = distanceInWords(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = distanceInWords(
 *   new Date(2016, 0, 1),
 *   new Date(2015, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = distanceInWords(
 *   new Date(2016, 7, 1),
 *   new Date(2015, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function distanceInWords (dirtyDateToCompare, dirtyDate, dirtyOptions) {
  var options = dirtyOptions || {};

  var comparison = compare_desc(dirtyDateToCompare, dirtyDate);

  var locale = options.locale;
  var localize = en.distanceInWords.localize;
  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
    localize = locale.distanceInWords.localize;
  }

  var localizeOptions = {
    addSuffix: Boolean(options.addSuffix),
    comparison: comparison
  };

  var dateLeft, dateRight;
  if (comparison > 0) {
    dateLeft = parse_1(dirtyDateToCompare);
    dateRight = parse_1(dirtyDate);
  } else {
    dateLeft = parse_1(dirtyDate);
    dateRight = parse_1(dirtyDateToCompare);
  }

  var seconds = difference_in_seconds(dateRight, dateLeft);
  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset();
  var minutes = Math.round(seconds / 60) - offset;
  var months;

  // 0 up to 2 mins
  if (minutes < 2) {
    if (options.includeSeconds) {
      if (seconds < 5) {
        return localize('lessThanXSeconds', 5, localizeOptions)
      } else if (seconds < 10) {
        return localize('lessThanXSeconds', 10, localizeOptions)
      } else if (seconds < 20) {
        return localize('lessThanXSeconds', 20, localizeOptions)
      } else if (seconds < 40) {
        return localize('halfAMinute', null, localizeOptions)
      } else if (seconds < 60) {
        return localize('lessThanXMinutes', 1, localizeOptions)
      } else {
        return localize('xMinutes', 1, localizeOptions)
      }
    } else {
      if (minutes === 0) {
        return localize('lessThanXMinutes', 1, localizeOptions)
      } else {
        return localize('xMinutes', minutes, localizeOptions)
      }
    }

  // 2 mins up to 0.75 hrs
  } else if (minutes < 45) {
    return localize('xMinutes', minutes, localizeOptions)

  // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return localize('aboutXHours', 1, localizeOptions)

  // 1.5 hrs up to 24 hrs
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return localize('aboutXHours', hours, localizeOptions)

  // 1 day up to 1.75 days
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return localize('xDays', 1, localizeOptions)

  // 1.75 days up to 30 days
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return localize('xDays', days, localizeOptions)

  // 1 month up to 2 months
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return localize('aboutXMonths', months, localizeOptions)
  }

  months = difference_in_months(dateRight, dateLeft);

  // 2 months up to 12 months
  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return localize('xMonths', nearestMonth, localizeOptions)

  // 1 year up to max Date
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12);

    // N years up to 1 years 3 months
    if (monthsSinceStartOfYear < 3) {
      return localize('aboutXYears', years, localizeOptions)

    // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return localize('overXYears', years, localizeOptions)

    // N years 9 months up to N year 12 months
    } else {
      return localize('almostXYears', years + 1, localizeOptions)
    }
  }
}

var distance_in_words = distanceInWords;

var MINUTES_IN_DAY$1 = 1440;
var MINUTES_IN_MONTH$1 = 43200;
var MINUTES_IN_YEAR = 525600;

/**
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `distanceInWords`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Date|String|Number} date - the other date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'s'|'m'|'h'|'d'|'M'|'Y'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.partialMethod='floor'] - which way to round partial units
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = distanceInWordsStrict(
 *   new Date(2014, 6, 2),
 *   new Date(2015, 0, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * var result = distanceInWordsStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = distanceInWordsStrict(
 *   new Date(2016, 0, 1),
 *   new Date(2015, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * var result = distanceInWordsStrict(
 *   new Date(2016, 0, 1),
 *   new Date(2015, 0, 1),
 *   {unit: 'm'}
 * )
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 28 January 2015, in months, rounded up?
 * var result = distanceInWordsStrict(
 *   new Date(2015, 0, 28),
 *   new Date(2015, 0, 1),
 *   {unit: 'M', partialMethod: 'ceil'}
 * )
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = distanceInWordsStrict(
 *   new Date(2016, 7, 1),
 *   new Date(2015, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */
function distanceInWordsStrict (dirtyDateToCompare, dirtyDate, dirtyOptions) {
  var options = dirtyOptions || {};

  var comparison = compare_desc(dirtyDateToCompare, dirtyDate);

  var locale = options.locale;
  var localize = en.distanceInWords.localize;
  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
    localize = locale.distanceInWords.localize;
  }

  var localizeOptions = {
    addSuffix: Boolean(options.addSuffix),
    comparison: comparison
  };

  var dateLeft, dateRight;
  if (comparison > 0) {
    dateLeft = parse_1(dirtyDateToCompare);
    dateRight = parse_1(dirtyDate);
  } else {
    dateLeft = parse_1(dirtyDate);
    dateRight = parse_1(dirtyDateToCompare);
  }

  var unit;
  var mathPartial = Math[options.partialMethod ? String(options.partialMethod) : 'floor'];
  var seconds = difference_in_seconds(dateRight, dateLeft);
  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset();
  var minutes = mathPartial(seconds / 60) - offset;
  var hours, days, months, years;

  if (options.unit) {
    unit = String(options.unit);
  } else {
    if (minutes < 1) {
      unit = 's';
    } else if (minutes < 60) {
      unit = 'm';
    } else if (minutes < MINUTES_IN_DAY$1) {
      unit = 'h';
    } else if (minutes < MINUTES_IN_MONTH$1) {
      unit = 'd';
    } else if (minutes < MINUTES_IN_YEAR) {
      unit = 'M';
    } else {
      unit = 'Y';
    }
  }

  // 0 up to 60 seconds
  if (unit === 's') {
    return localize('xSeconds', seconds, localizeOptions)

  // 1 up to 60 mins
  } else if (unit === 'm') {
    return localize('xMinutes', minutes, localizeOptions)

  // 1 up to 24 hours
  } else if (unit === 'h') {
    hours = mathPartial(minutes / 60);
    return localize('xHours', hours, localizeOptions)

  // 1 up to 30 days
  } else if (unit === 'd') {
    days = mathPartial(minutes / MINUTES_IN_DAY$1);
    return localize('xDays', days, localizeOptions)

  // 1 up to 12 months
  } else if (unit === 'M') {
    months = mathPartial(minutes / MINUTES_IN_MONTH$1);
    return localize('xMonths', months, localizeOptions)

  // 1 year up to max Date
  } else if (unit === 'Y') {
    years = mathPartial(minutes / MINUTES_IN_YEAR);
    return localize('xYears', years, localizeOptions)
  }

  throw new Error('Unknown unit: ' + unit)
}

var distance_in_words_strict = distanceInWordsStrict;

/**
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * @param {Date|String|Number} date - the given date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result specifies if the second date is earlier or later than the first
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the distance in words
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * var result = distanceInWordsToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * var result = distanceInWordsToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * var result = distanceInWordsToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = distanceInWordsToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function distanceInWordsToNow (dirtyDate, dirtyOptions) {
  return distance_in_words(Date.now(), dirtyDate, dirtyOptions)
}

var distance_in_words_to_now = distanceInWordsToNow;

/**
 * @category Day Helpers
 * @summary Return the array of dates within the specified range.
 *
 * @description
 * Return the array of dates within the specified range.
 *
 * @param {Date|String|Number} startDate - the first date
 * @param {Date|String|Number} endDate - the last date
 * @param {Number} [step=1] - the step between each day
 * @returns {Date[]} the array with starts of days from the day of startDate to the day of endDate
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * var result = eachDay(
 *   new Date(2014, 9, 6),
 *   new Date(2014, 9, 10)
 * )
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDay (dirtyStartDate, dirtyEndDate, dirtyStep) {
  var startDate = parse_1(dirtyStartDate);
  var endDate = parse_1(dirtyEndDate);
  var step = dirtyStep !== undefined ? dirtyStep : 1;

  var endTime = endDate.getTime();

  if (startDate.getTime() > endTime) {
    throw new Error('The first date cannot be after the second date')
  }

  var dates = [];

  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);

  while (currentDate.getTime() <= endTime) {
    dates.push(parse_1(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
  }

  return dates
}

var each_day = eachDay;

/**
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_day = endOfDay;

/**
 * @category Hour Helpers
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an hour
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * var result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
function endOfHour (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setMinutes(59, 59, 999);
  return date
}

var end_of_hour = endOfHour;

/**
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;

  var date = parse_1(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_week = endOfWeek;

/**
 * @category ISO Week Helpers
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an ISO week
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * var result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfISOWeek (dirtyDate) {
  return end_of_week(dirtyDate, {weekStartsOn: 1})
}

var end_of_iso_week = endOfISOWeek;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * var result = endOfISOYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
function endOfISOYear (dirtyDate) {
  var year = get_iso_year(dirtyDate);
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var date = start_of_iso_week(fourthOfJanuaryOfNextYear);
  date.setMilliseconds(date.getMilliseconds() - 1);
  return date
}

var end_of_iso_year = endOfISOYear;

/**
 * @category Minute Helpers
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * var result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
function endOfMinute (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setSeconds(59, 999);
  return date
}

var end_of_minute = endOfMinute;

/**
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth (dirtyDate) {
  var date = parse_1(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_month = endOfMonth;

/**
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * var result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfQuarter (dirtyDate) {
  var date = parse_1(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_quarter = endOfQuarter;

/**
 * @category Second Helpers
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * var result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
function endOfSecond (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setMilliseconds(999);
  return date
}

var end_of_second = endOfSecond;

/**
 * @category Day Helpers
 * @summary Return the end of today.
 *
 * @description
 * Return the end of today.
 *
 * @returns {Date} the end of today
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
function endOfToday () {
  return end_of_day(new Date())
}

var end_of_today = endOfToday;

/**
 * @category Day Helpers
 * @summary Return the end of tomorrow.
 *
 * @description
 * Return the end of tomorrow.
 *
 * @returns {Date} the end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
function endOfTomorrow () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();

  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_tomorrow = endOfTomorrow;

/**
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_year = endOfYear;

/**
 * @category Day Helpers
 * @summary Return the end of yesterday.
 *
 * @description
 * Return the end of yesterday.
 *
 * @returns {Date} the end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
function endOfYesterday () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();

  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(23, 59, 59, 999);
  return date
}

var end_of_yesterday = endOfYesterday;

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear (dirtyDate) {
  var cleanDate = parse_1(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_year = startOfYear;

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var diff = difference_in_calendar_days(date, start_of_year(date));
  var dayOfYear = diff + 1;
  return dayOfYear
}

var get_day_of_year = getDayOfYear;

var MILLISECONDS_IN_WEEK$2 = 604800000;

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek (dirtyDate) {
  var date = parse_1(dirtyDate);
  var diff = start_of_iso_week(date).getTime() - start_of_iso_year(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK$2) + 1
}

var get_iso_week = getISOWeek;

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (dirtyDate) {
  if (is_date(dirtyDate)) {
    return !isNaN(dirtyDate)
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
  }
}

var is_valid = isValid;

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  var options = dirtyOptions || {};

  var locale = options.locale;
  var localeFormatters = en.format.formatters;
  var formattingTokensRegExp = en.format.formattingTokensRegExp;
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters;

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp;
    }
  }

  var date = parse_1(dirtyDate);

  if (!is_valid(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp);

  return formatFn(date)
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return get_day_of_year(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(get_day_of_year(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getDay()
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return get_iso_week(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(get_iso_week(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(get_iso_year(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return get_iso_year(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getHours();
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date) {
    return date.getTime()
  }
};

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp);
  var length = array.length;

  var i;
  var formatter;
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]];
    if (formatter) {
      array[i] = formatter;
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }

  return function (date) {
    var output = '';
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters);
      } else {
        output += array[i];
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output
}

var format_1 = format;

/**
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * var result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate (dirtyDate) {
  var date = parse_1(dirtyDate);
  var dayOfMonth = date.getDate();
  return dayOfMonth
}

var get_date = getDate;

/**
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of week
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * var result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay (dirtyDate) {
  var date = parse_1(dirtyDate);
  var day = date.getDay();
  return day
}

var get_day = getDay;

/**
 * @category Year Helpers
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the leap year
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * var result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
function isLeapYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0
}

var is_leap_year = isLeapYear;

/**
 * @category Year Helpers
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a year
 *
 * @example
 * // How many days are in 2012?
 * var result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
function getDaysInYear (dirtyDate) {
  return is_leap_year(dirtyDate) ? 366 : 365
}

var get_days_in_year = getDaysInYear;

/**
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * var result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours (dirtyDate) {
  var date = parse_1(dirtyDate);
  var hours = date.getHours();
  return hours
}

var get_hours = getHours;

/**
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * var result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay (dirtyDate) {
  var date = parse_1(dirtyDate);
  var day = date.getDay();

  if (day === 0) {
    day = 7;
  }

  return day
}

var get_iso_day = getISODay;

var MILLISECONDS_IN_WEEK$3 = 604800000;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of ISO weeks in a year
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * var result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
function getISOWeeksInYear (dirtyDate) {
  var thisYear = start_of_iso_year(dirtyDate);
  var nextYear = start_of_iso_year(add_weeks(thisYear, 60));
  var diff = nextYear.valueOf() - thisYear.valueOf();
  // Round the number of weeks to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK$3)
}

var get_iso_weeks_in_year = getISOWeeksInYear;

/**
 * @category Millisecond Helpers
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the milliseconds
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * var result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
function getMilliseconds (dirtyDate) {
  var date = parse_1(dirtyDate);
  var milliseconds = date.getMilliseconds();
  return milliseconds
}

var get_milliseconds = getMilliseconds;

/**
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * var result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes (dirtyDate) {
  var date = parse_1(dirtyDate);
  var minutes = date.getMinutes();
  return minutes
}

var get_minutes = getMinutes;

/**
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the month
 *
 * @example
 * // Which month is 29 February 2012?
 * var result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth (dirtyDate) {
  var date = parse_1(dirtyDate);
  var month = date.getMonth();
  return month
}

var get_month = getMonth;

var MILLISECONDS_IN_DAY$1 = 24 * 60 * 60 * 1000;

/**
 * @category Range Helpers
 * @summary Get the number of days that overlap in two date ranges
 *
 * @description
 * Get the number of days that overlap in two date ranges
 *
 * @param {Date|String|Number} initialRangeStartDate - the start of the initial range
 * @param {Date|String|Number} initialRangeEndDate - the end of the initial range
 * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with
 * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with
 * @returns {Number} the number of days that overlap in two date ranges
 * @throws {Error} startDate of a date range cannot be after its endDate
 *
 * @example
 * // For overlapping date ranges adds 1 for each started overlapping day:
 * getOverlappingDaysInRanges(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping date ranges returns 0:
 * getOverlappingDaysInRanges(
 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)
 * )
 * //=> 0
 */
function getOverlappingDaysInRanges (dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
  var initialStartTime = parse_1(dirtyInitialRangeStartDate).getTime();
  var initialEndTime = parse_1(dirtyInitialRangeEndDate).getTime();
  var comparedStartTime = parse_1(dirtyComparedRangeStartDate).getTime();
  var comparedEndTime = parse_1(dirtyComparedRangeEndDate).getTime();

  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  var isOverlapping = initialStartTime < comparedEndTime && comparedStartTime < initialEndTime;

  if (!isOverlapping) {
    return 0
  }

  var overlapStartDate = comparedStartTime < initialStartTime
    ? initialStartTime
    : comparedStartTime;

  var overlapEndDate = comparedEndTime > initialEndTime
    ? initialEndTime
    : comparedEndTime;

  var differenceInMs = overlapEndDate - overlapStartDate;

  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY$1)
}

var get_overlapping_days_in_ranges = getOverlappingDaysInRanges;

/**
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * var result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds (dirtyDate) {
  var date = parse_1(dirtyDate);
  var seconds = date.getSeconds();
  return seconds
}

var get_seconds = getSeconds;

/**
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * var result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime (dirtyDate) {
  var date = parse_1(dirtyDate);
  var timestamp = date.getTime();
  return timestamp
}

var get_time = getTime;

/**
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the year
 *
 * @example
 * // Which year is 2 July 2014?
 * var result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  return year
}

var get_year = getYear;

/**
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|String|Number} date - the date that should be after the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter (dirtyDate, dirtyDateToCompare) {
  var date = parse_1(dirtyDate);
  var dateToCompare = parse_1(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime()
}

var is_after = isAfter;

/**
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|String|Number} date - the date that should be before the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore (dirtyDate, dirtyDateToCompare) {
  var date = parse_1(dirtyDate);
  var dateToCompare = parse_1(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime()
}

var is_before = isBefore;

/**
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Boolean} the dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * var result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0)
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual (dirtyLeftDate, dirtyRightDate) {
  var dateLeft = parse_1(dirtyLeftDate);
  var dateRight = parse_1(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime()
}

var is_equal = isEqual;

/**
 * @category Month Helpers
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is the first day of a month
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * var result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
function isFirstDayOfMonth (dirtyDate) {
  return parse_1(dirtyDate).getDate() === 1
}

var is_first_day_of_month = isFirstDayOfMonth;

/**
 * @category Weekday Helpers
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Friday
 *
 * @example
 * // Is 26 September 2014 Friday?
 * var result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
function isFriday (dirtyDate) {
  return parse_1(dirtyDate).getDay() === 5
}

var is_friday = isFriday;

/**
 * @category Common Helpers
 * @summary Is the given date in the future?
 *
 * @description
 * Is the given date in the future?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the future
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * var result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
function isFuture (dirtyDate) {
  return parse_1(dirtyDate).getTime() > new Date().getTime()
}

var is_future = isFuture;

/**
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * var result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth (dirtyDate) {
  var date = parse_1(dirtyDate);
  return end_of_day(date).getTime() === end_of_month(date).getTime()
}

var is_last_day_of_month = isLastDayOfMonth;

/**
 * @category Weekday Helpers
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Monday
 *
 * @example
 * // Is 22 September 2014 Monday?
 * var result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
function isMonday (dirtyDate) {
  return parse_1(dirtyDate).getDay() === 1
}

var is_monday = isMonday;

/**
 * @category Common Helpers
 * @summary Is the given date in the past?
 *
 * @description
 * Is the given date in the past?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * var result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast (dirtyDate) {
  return parse_1(dirtyDate).getTime() < new Date().getTime()
}

var is_past = isPast;

/**
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 18, 0)
 * )
 * //=> true
 */
function isSameDay (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = start_of_day(dirtyDateLeft);
  var dateRightStartOfDay = start_of_day(dirtyDateRight);

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

var is_same_day = isSameDay;

/**
 * @category Hour Helpers
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * var result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
function startOfHour (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setMinutes(0, 0, 0);
  return date
}

var start_of_hour = startOfHour;

/**
 * @category Hour Helpers
 * @summary Are the given dates in the same hour?
 *
 * @description
 * Are the given dates in the same hour?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same hour
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * var result = isSameHour(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 6, 30)
 * )
 * //=> true
 */
function isSameHour (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfHour = start_of_hour(dirtyDateLeft);
  var dateRightStartOfHour = start_of_hour(dirtyDateRight);

  return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime()
}

var is_same_hour = isSameHour;

/**
 * @category Week Helpers
 * @summary Are the given dates in the same week?
 *
 * @description
 * Are the given dates in the same week?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(
 *   new Date(2014, 7, 31),
 *   new Date(2014, 8, 4)
 * )
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(
 *   new Date(2014, 7, 31),
 *   new Date(2014, 8, 4),
 *   {weekStartsOn: 1}
 * )
 * //=> false
 */
function isSameWeek (dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  var dateLeftStartOfWeek = start_of_week(dirtyDateLeft, dirtyOptions);
  var dateRightStartOfWeek = start_of_week(dirtyDateRight, dirtyOptions);

  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime()
}

var is_same_week = isSameWeek;

/**
 * @category ISO Week Helpers
 * @summary Are the given dates in the same ISO week?
 *
 * @description
 * Are the given dates in the same ISO week?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * var result = isSameISOWeek(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 8, 7)
 * )
 * //=> true
 */
function isSameISOWeek (dirtyDateLeft, dirtyDateRight) {
  return is_same_week(dirtyDateLeft, dirtyDateRight, {weekStartsOn: 1})
}

var is_same_iso_week = isSameISOWeek;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * var result = isSameISOYear(
 *   new Date(2003, 11, 29),
 *   new Date(2005, 0, 2)
 * )
 * //=> true
 */
function isSameISOYear (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfYear = start_of_iso_year(dirtyDateLeft);
  var dateRightStartOfYear = start_of_iso_year(dirtyDateRight);

  return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime()
}

var is_same_iso_year = isSameISOYear;

/**
 * @category Minute Helpers
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * var result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
function startOfMinute (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setSeconds(0, 0);
  return date
}

var start_of_minute = startOfMinute;

/**
 * @category Minute Helpers
 * @summary Are the given dates in the same minute?
 *
 * @description
 * Are the given dates in the same minute?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same minute
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15
 * // in the same minute?
 * var result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 */
function isSameMinute (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfMinute = start_of_minute(dirtyDateLeft);
  var dateRightStartOfMinute = start_of_minute(dirtyDateRight);

  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime()
}

var is_same_minute = isSameMinute;

/**
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameMonth (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

var is_same_month = isSameMonth;

/**
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * var result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter (dirtyDate) {
  var date = parse_1(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_quarter = startOfQuarter;

/**
 * @category Quarter Helpers
 * @summary Are the given dates in the same year quarter?
 *
 * @description
 * Are the given dates in the same year quarter?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same quarter
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * var result = isSameQuarter(
 *   new Date(2014, 0, 1),
 *   new Date(2014, 2, 8)
 * )
 * //=> true
 */
function isSameQuarter (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfQuarter = start_of_quarter(dirtyDateLeft);
  var dateRightStartOfQuarter = start_of_quarter(dirtyDateRight);

  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime()
}

var is_same_quarter = isSameQuarter;

/**
 * @category Second Helpers
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * var result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
function startOfSecond (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setMilliseconds(0);
  return date
}

var start_of_second = startOfSecond;

/**
 * @category Second Helpers
 * @summary Are the given dates in the same second?
 *
 * @description
 * Are the given dates in the same second?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same second
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500
 * // in the same second?
 * var result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 */
function isSameSecond (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfSecond = start_of_second(dirtyDateLeft);
  var dateRightStartOfSecond = start_of_second(dirtyDateRight);

  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime()
}

var is_same_second = isSameSecond;

/**
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameYear (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse_1(dirtyDateLeft);
  var dateRight = parse_1(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear()
}

var is_same_year = isSameYear;

/**
 * @category Weekday Helpers
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Saturday
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * var result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
function isSaturday (dirtyDate) {
  return parse_1(dirtyDate).getDay() === 6
}

var is_saturday = isSaturday;

/**
 * @category Weekday Helpers
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Sunday
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * var result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
function isSunday (dirtyDate) {
  return parse_1(dirtyDate).getDay() === 0
}

var is_sunday = isSunday;

/**
 * @category Hour Helpers
 * @summary Is the given date in the same hour as the current date?
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this hour
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * var result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
function isThisHour (dirtyDate) {
  return is_same_hour(new Date(), dirtyDate)
}

var is_this_hour = isThisHour;

/**
 * @category ISO Week Helpers
 * @summary Is the given date in the same ISO week as the current date?
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this ISO week
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * var result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
function isThisISOWeek (dirtyDate) {
  return is_same_iso_week(new Date(), dirtyDate)
}

var is_this_iso_week = isThisISOWeek;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Is the given date in the same ISO week-numbering year as the current date?
 *
 * @description
 * Is the given date in the same ISO week-numbering year as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this ISO week-numbering year
 *
 * @example
 * // If today is 25 September 2014,
 * // is 30 December 2013 in this ISO week-numbering year?
 * var result = isThisISOYear(new Date(2013, 11, 30))
 * //=> true
 */
function isThisISOYear (dirtyDate) {
  return is_same_iso_year(new Date(), dirtyDate)
}

var is_this_iso_year = isThisISOYear;

/**
 * @category Minute Helpers
 * @summary Is the given date in the same minute as the current date?
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this minute
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * var result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */
function isThisMinute (dirtyDate) {
  return is_same_minute(new Date(), dirtyDate)
}

var is_this_minute = isThisMinute;

/**
 * @category Month Helpers
 * @summary Is the given date in the same month as the current date?
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this month
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * var result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
function isThisMonth (dirtyDate) {
  return is_same_month(new Date(), dirtyDate)
}

var is_this_month = isThisMonth;

/**
 * @category Quarter Helpers
 * @summary Is the given date in the same quarter as the current date?
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this quarter
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * var result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
function isThisQuarter (dirtyDate) {
  return is_same_quarter(new Date(), dirtyDate)
}

var is_this_quarter = isThisQuarter;

/**
 * @category Second Helpers
 * @summary Is the given date in the same second as the current date?
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this second
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * var result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
function isThisSecond (dirtyDate) {
  return is_same_second(new Date(), dirtyDate)
}

var is_this_second = isThisSecond;

/**
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21), {weekStartsOn: 1})
 * //=> false
 */
function isThisWeek (dirtyDate, dirtyOptions) {
  return is_same_week(new Date(), dirtyDate, dirtyOptions)
}

var is_this_week = isThisWeek;

/**
 * @category Year Helpers
 * @summary Is the given date in the same year as the current date?
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in this year
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * var result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
function isThisYear (dirtyDate) {
  return is_same_year(new Date(), dirtyDate)
}

var is_this_year = isThisYear;

/**
 * @category Weekday Helpers
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Thursday
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * var result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
function isThursday (dirtyDate) {
  return parse_1(dirtyDate).getDay() === 4
}

var is_thursday = isThursday;

/**
 * @category Day Helpers
 * @summary Is the given date today?
 *
 * @description
 * Is the given date today?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * var result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday (dirtyDate) {
  return start_of_day(dirtyDate).getTime() === start_of_day(new Date()).getTime()
}

var is_today = isToday;

/**
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * var result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow (dirtyDate) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return start_of_day(dirtyDate).getTime() === start_of_day(tomorrow).getTime()
}

var is_tomorrow = isTomorrow;

/**
 * @category Weekday Helpers
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Tuesday
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * var result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
function isTuesday (dirtyDate) {
  return parse_1(dirtyDate).getDay() === 2
}

var is_tuesday = isTuesday;

/**
 * @category Weekday Helpers
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is Wednesday
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * var result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
function isWednesday (dirtyDate) {
  return parse_1(dirtyDate).getDay() === 3
}

var is_wednesday = isWednesday;

/**
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * var result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
function isWeekend (dirtyDate) {
  var date = parse_1(dirtyDate);
  var day = date.getDay();
  return day === 0 || day === 6
}

var is_weekend = isWeekend;

/**
 * @category Range Helpers
 * @summary Is the given date within the range?
 *
 * @description
 * Is the given date within the range?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Date|String|Number} startDate - the start of range
 * @param {Date|String|Number} endDate - the end of range
 * @returns {Boolean} the date is within the range
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // For the date within the range:
 * isWithinRange(
 *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the range:
 * isWithinRange(
 *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> false
 */
function isWithinRange (dirtyDate, dirtyStartDate, dirtyEndDate) {
  var time = parse_1(dirtyDate).getTime();
  var startTime = parse_1(dirtyStartDate).getTime();
  var endTime = parse_1(dirtyEndDate).getTime();

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

var is_within_range = isWithinRange;

/**
 * @category Day Helpers
 * @summary Is the given date yesterday?
 *
 * @description
 * Is the given date yesterday?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * var result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday (dirtyDate) {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return start_of_day(dirtyDate).getTime() === start_of_day(yesterday).getTime()
}

var is_yesterday = isYesterday;

/**
 * @category Week Helpers
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the last day of a week
 *
 * @example
 * // The last day of a week for 2 September 2014 11:55:00:
 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:
 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;

  var date = parse_1(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + diff);
  return date
}

var last_day_of_week = lastDayOfWeek;

/**
 * @category ISO Week Helpers
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * var result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfISOWeek (dirtyDate) {
  return last_day_of_week(dirtyDate, {weekStartsOn: 1})
}

var last_day_of_iso_week = lastDayOfISOWeek;

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * var result = lastDayOfISOYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
function lastDayOfISOYear (dirtyDate) {
  var year = get_iso_year(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year + 1, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = start_of_iso_week(fourthOfJanuary);
  date.setDate(date.getDate() - 1);
  return date
}

var last_day_of_iso_year = lastDayOfISOYear;

/**
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * var result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth (dirtyDate) {
  var date = parse_1(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(0, 0, 0, 0);
  return date
}

var last_day_of_month = lastDayOfMonth;

/**
 * @category Quarter Helpers
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of a quarter
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * var result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfQuarter (dirtyDate) {
  var date = parse_1(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(0, 0, 0, 0);
  return date
}

var last_day_of_quarter = lastDayOfQuarter;

/**
 * @category Year Helpers
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * var result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
function lastDayOfYear (dirtyDate) {
  var date = parse_1(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date
}

var last_day_of_year = lastDayOfYear;

/**
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @param {...(Date|String|Number)} dates - the dates to compare
 * @returns {Date} the latest of the dates
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max(
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * )
 * //=> Sun Jul 02 1995 00:00:00
 */
function max$2 () {
  var dirtyDates = Array.prototype.slice.call(arguments);
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse_1(dirtyDate)
  });
  var latestTimestamp = Math.max.apply(null, dates);
  return new Date(latestTimestamp)
}

var max_1 = max$2;

/**
 * @category Common Helpers
 * @summary Return the earliest of the given dates.
 *
 * @description
 * Return the earliest of the given dates.
 *
 * @param {...(Date|String|Number)} dates - the dates to compare
 * @returns {Date} the earliest of the dates
 *
 * @example
 * // Which of these dates is the earliest?
 * var result = min(
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * )
 * //=> Wed Feb 11 1987 00:00:00
 */
function min$3 () {
  var dirtyDates = Array.prototype.slice.call(arguments);
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse_1(dirtyDate)
  });
  var earliestTimestamp = Math.min.apply(null, dates);
  return new Date(earliestTimestamp)
}

var min_1 = min$3;

/**
 * @category Day Helpers
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} dayOfMonth - the day of the month of the new date
 * @returns {Date} the new date with the day of the month setted
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * var result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
function setDate (dirtyDate, dirtyDayOfMonth) {
  var date = parse_1(dirtyDate);
  var dayOfMonth = Number(dirtyDayOfMonth);
  date.setDate(dayOfMonth);
  return date
}

var set_date = setDate;

/**
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} day - the day of the week of the new date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the new date with the day of the week setted
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * var result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If week starts with Monday, set Sunday to 1 September 2014:
 * var result = setDay(new Date(2014, 8, 1), 0, {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay (dirtyDate, dirtyDay, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;
  var date = parse_1(dirtyDate);
  var day = Number(dirtyDay);
  var currentDay = date.getDay();

  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  return add_days(date, diff)
}

var set_day = setDay;

/**
 * @category Day Helpers
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} dayOfYear - the day of the year of the new date
 * @returns {Date} the new date with the day of the year setted
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * var result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
function setDayOfYear (dirtyDate, dirtyDayOfYear) {
  var date = parse_1(dirtyDate);
  var dayOfYear = Number(dirtyDayOfYear);
  date.setMonth(0);
  date.setDate(dayOfYear);
  return date
}

var set_day_of_year = setDayOfYear;

/**
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours setted
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours (dirtyDate, dirtyHours) {
  var date = parse_1(dirtyDate);
  var hours = Number(dirtyHours);
  date.setHours(hours);
  return date
}

var set_hours = setHours;

/**
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday etc.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} day - the day of the ISO week of the new date
 * @returns {Date} the new date with the day of the ISO week setted
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * var result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay (dirtyDate, dirtyDay) {
  var date = parse_1(dirtyDate);
  var day = Number(dirtyDay);
  var currentDay = get_iso_day(date);
  var diff = day - currentDay;
  return add_days(date, diff)
}

var set_iso_day = setISODay;

/**
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} isoWeek - the ISO week of the new date
 * @returns {Date} the new date with the ISO week setted
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * var result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek (dirtyDate, dirtyISOWeek) {
  var date = parse_1(dirtyDate);
  var isoWeek = Number(dirtyISOWeek);
  var diff = get_iso_week(date) - isoWeek;
  date.setDate(date.getDate() - diff * 7);
  return date
}

var set_iso_week = setISOWeek;

/**
 * @category Millisecond Helpers
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} milliseconds - the milliseconds of the new date
 * @returns {Date} the new date with the milliseconds setted
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * var result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
function setMilliseconds (dirtyDate, dirtyMilliseconds) {
  var date = parse_1(dirtyDate);
  var milliseconds = Number(dirtyMilliseconds);
  date.setMilliseconds(milliseconds);
  return date
}

var set_milliseconds = setMilliseconds;

/**
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} minutes - the minutes of the new date
 * @returns {Date} the new date with the minutes setted
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes (dirtyDate, dirtyMinutes) {
  var date = parse_1(dirtyDate);
  var minutes = Number(dirtyMinutes);
  date.setMinutes(minutes);
  return date
}

var set_minutes = setMinutes;

/**
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month setted
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth (dirtyDate, dirtyMonth) {
  var date = parse_1(dirtyDate);
  var month = Number(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();

  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = get_days_in_month(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth));
  return date
}

var set_month = setMonth;

/**
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} quarter - the quarter of the new date
 * @returns {Date} the new date with the quarter setted
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * var result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
function setQuarter (dirtyDate, dirtyQuarter) {
  var date = parse_1(dirtyDate);
  var quarter = Number(dirtyQuarter);
  var oldQuarter = Math.floor(date.getMonth() / 3) + 1;
  var diff = quarter - oldQuarter;
  return set_month(date, date.getMonth() + diff * 3)
}

var set_quarter = setQuarter;

/**
 * @category Second Helpers
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} seconds - the seconds of the new date
 * @returns {Date} the new date with the seconds setted
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * var result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds (dirtyDate, dirtySeconds) {
  var date = parse_1(dirtyDate);
  var seconds = Number(dirtySeconds);
  date.setSeconds(seconds);
  return date
}

var set_seconds = setSeconds;

/**
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year setted
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear (dirtyDate, dirtyYear) {
  var date = parse_1(dirtyDate);
  var year = Number(dirtyYear);
  date.setFullYear(year);
  return date
}

var set_year = setYear;

/**
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth (dirtyDate) {
  var date = parse_1(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_month = startOfMonth;

/**
 * @category Day Helpers
 * @summary Return the start of today.
 *
 * @description
 * Return the start of today.
 *
 * @returns {Date} the start of today
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
function startOfToday () {
  return start_of_day(new Date())
}

var start_of_today = startOfToday;

/**
 * @category Day Helpers
 * @summary Return the start of tomorrow.
 *
 * @description
 * Return the start of tomorrow.
 *
 * @returns {Date} the start of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
function startOfTomorrow () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();

  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_tomorrow = startOfTomorrow;

/**
 * @category Day Helpers
 * @summary Return the start of yesterday.
 *
 * @description
 * Return the start of yesterday.
 *
 * @returns {Date} the start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();

  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date
}

var start_of_yesterday = startOfYesterday;

/**
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted
 * @returns {Date} the new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * var result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_days(dirtyDate, -amount)
}

var sub_days = subDays;

/**
 * @category Hour Helpers
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be subtracted
 * @returns {Date} the new date with the hours subtracted
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * var result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
function subHours (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_hours(dirtyDate, -amount)
}

var sub_hours = subHours;

/**
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted
 * @returns {Date} the new date with the milliseconds subtracted
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */
function subMilliseconds (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_milliseconds(dirtyDate, -amount)
}

var sub_milliseconds = subMilliseconds;

/**
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted
 * @returns {Date} the new date with the mintues subtracted
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_minutes(dirtyDate, -amount)
}

var sub_minutes = subMinutes;

/**
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted
 * @returns {Date} the new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * var result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_months(dirtyDate, -amount)
}

var sub_months = subMonths;

/**
 * @category Quarter Helpers
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be subtracted
 * @returns {Date} the new date with the quarters subtracted
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * var result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
function subQuarters (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_quarters(dirtyDate, -amount)
}

var sub_quarters = subQuarters;

/**
 * @category Second Helpers
 * @summary Subtract the specified number of seconds from the given date.
 *
 * @description
 * Subtract the specified number of seconds from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be subtracted
 * @returns {Date} the new date with the seconds subtracted
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:00:
 * var result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:44:30
 */
function subSeconds (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_seconds(dirtyDate, -amount)
}

var sub_seconds = subSeconds;

/**
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted
 * @returns {Date} the new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * var result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_weeks(dirtyDate, -amount)
}

var sub_weeks = subWeeks;

/**
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted
 * @returns {Date} the new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * var result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_years(dirtyDate, -amount)
}

var sub_years = subYears;

var dateFns = {
  addDays: add_days,
  addHours: add_hours,
  addISOYears: add_iso_years,
  addMilliseconds: add_milliseconds,
  addMinutes: add_minutes,
  addMonths: add_months,
  addQuarters: add_quarters,
  addSeconds: add_seconds,
  addWeeks: add_weeks,
  addYears: add_years,
  areRangesOverlapping: are_ranges_overlapping,
  closestIndexTo: closest_index_to,
  closestTo: closest_to,
  compareAsc: compare_asc,
  compareDesc: compare_desc,
  differenceInCalendarDays: difference_in_calendar_days,
  differenceInCalendarISOWeeks: difference_in_calendar_iso_weeks,
  differenceInCalendarISOYears: difference_in_calendar_iso_years,
  differenceInCalendarMonths: difference_in_calendar_months,
  differenceInCalendarQuarters: difference_in_calendar_quarters,
  differenceInCalendarWeeks: difference_in_calendar_weeks,
  differenceInCalendarYears: difference_in_calendar_years,
  differenceInDays: difference_in_days,
  differenceInHours: difference_in_hours,
  differenceInISOYears: difference_in_iso_years,
  differenceInMilliseconds: difference_in_milliseconds,
  differenceInMinutes: difference_in_minutes,
  differenceInMonths: difference_in_months,
  differenceInQuarters: difference_in_quarters,
  differenceInSeconds: difference_in_seconds,
  differenceInWeeks: difference_in_weeks,
  differenceInYears: difference_in_years,
  distanceInWords: distance_in_words,
  distanceInWordsStrict: distance_in_words_strict,
  distanceInWordsToNow: distance_in_words_to_now,
  eachDay: each_day,
  endOfDay: end_of_day,
  endOfHour: end_of_hour,
  endOfISOWeek: end_of_iso_week,
  endOfISOYear: end_of_iso_year,
  endOfMinute: end_of_minute,
  endOfMonth: end_of_month,
  endOfQuarter: end_of_quarter,
  endOfSecond: end_of_second,
  endOfToday: end_of_today,
  endOfTomorrow: end_of_tomorrow,
  endOfWeek: end_of_week,
  endOfYear: end_of_year,
  endOfYesterday: end_of_yesterday,
  format: format_1,
  getDate: get_date,
  getDay: get_day,
  getDayOfYear: get_day_of_year,
  getDaysInMonth: get_days_in_month,
  getDaysInYear: get_days_in_year,
  getHours: get_hours,
  getISODay: get_iso_day,
  getISOWeek: get_iso_week,
  getISOWeeksInYear: get_iso_weeks_in_year,
  getISOYear: get_iso_year,
  getMilliseconds: get_milliseconds,
  getMinutes: get_minutes,
  getMonth: get_month,
  getOverlappingDaysInRanges: get_overlapping_days_in_ranges,
  getQuarter: get_quarter,
  getSeconds: get_seconds,
  getTime: get_time,
  getYear: get_year,
  isAfter: is_after,
  isBefore: is_before,
  isDate: is_date,
  isEqual: is_equal,
  isFirstDayOfMonth: is_first_day_of_month,
  isFriday: is_friday,
  isFuture: is_future,
  isLastDayOfMonth: is_last_day_of_month,
  isLeapYear: is_leap_year,
  isMonday: is_monday,
  isPast: is_past,
  isSameDay: is_same_day,
  isSameHour: is_same_hour,
  isSameISOWeek: is_same_iso_week,
  isSameISOYear: is_same_iso_year,
  isSameMinute: is_same_minute,
  isSameMonth: is_same_month,
  isSameQuarter: is_same_quarter,
  isSameSecond: is_same_second,
  isSameWeek: is_same_week,
  isSameYear: is_same_year,
  isSaturday: is_saturday,
  isSunday: is_sunday,
  isThisHour: is_this_hour,
  isThisISOWeek: is_this_iso_week,
  isThisISOYear: is_this_iso_year,
  isThisMinute: is_this_minute,
  isThisMonth: is_this_month,
  isThisQuarter: is_this_quarter,
  isThisSecond: is_this_second,
  isThisWeek: is_this_week,
  isThisYear: is_this_year,
  isThursday: is_thursday,
  isToday: is_today,
  isTomorrow: is_tomorrow,
  isTuesday: is_tuesday,
  isValid: is_valid,
  isWednesday: is_wednesday,
  isWeekend: is_weekend,
  isWithinRange: is_within_range,
  isYesterday: is_yesterday,
  lastDayOfISOWeek: last_day_of_iso_week,
  lastDayOfISOYear: last_day_of_iso_year,
  lastDayOfMonth: last_day_of_month,
  lastDayOfQuarter: last_day_of_quarter,
  lastDayOfWeek: last_day_of_week,
  lastDayOfYear: last_day_of_year,
  max: max_1,
  min: min_1,
  parse: parse_1,
  setDate: set_date,
  setDay: set_day,
  setDayOfYear: set_day_of_year,
  setHours: set_hours,
  setISODay: set_iso_day,
  setISOWeek: set_iso_week,
  setISOYear: set_iso_year,
  setMilliseconds: set_milliseconds,
  setMinutes: set_minutes,
  setMonth: set_month,
  setQuarter: set_quarter,
  setSeconds: set_seconds,
  setYear: set_year,
  startOfDay: start_of_day,
  startOfHour: start_of_hour,
  startOfISOWeek: start_of_iso_week,
  startOfISOYear: start_of_iso_year,
  startOfMinute: start_of_minute,
  startOfMonth: start_of_month,
  startOfQuarter: start_of_quarter,
  startOfSecond: start_of_second,
  startOfToday: start_of_today,
  startOfTomorrow: start_of_tomorrow,
  startOfWeek: start_of_week,
  startOfYear: start_of_year,
  startOfYesterday: start_of_yesterday,
  subDays: sub_days,
  subHours: sub_hours,
  subISOYears: sub_iso_years,
  subMilliseconds: sub_milliseconds,
  subMinutes: sub_minutes,
  subMonths: sub_months,
  subQuarters: sub_quarters,
  subSeconds: sub_seconds,
  subWeeks: sub_weeks,
  subYears: sub_years
};
var dateFns_50 = dateFns.format;

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
const ChatMessage = ({ chatItem, showSubtitle }) => (h("div", { class: { 'chat-item': true, 'self-message': chatItem.isSelf } },
    h("div", { class: "chat-item-content" },
        h("div", { class: "chat-item-bubble" },
            h("div", { class: "chat-item-message" }, chatItem.message),
            h("div", { class: "chat-item-tail-outer" },
                h("div", { class: "chat-item-tail-inner" }))),
        showSubtitle &&
            h("div", { class: "chat-item-subtitle" },
                !chatItem.isSelf && h("span", null, chatItem.fullName),
                !chatItem.isSelf && h("span", null, "\u00A0-\u00A0"),
                h("span", null, dateFns_50(chatItem.date, 'h:mm A'))))));

const defaultMessages = {
    amwell_chat_window_messages_placeholder: 'Let’s get started.',
    amwell_chat_window_new_messages_toast: 'New Messages',
    amwell_chat_window_input_placeholder: 'Write a message ...',
};

const ChatWindow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.chatItems = [];
        this.lastOrdinal = 0;
        this.messages = defaultMessages; // i18n messages
        this.locale = 'en-US';
        /* NON-UI driving state */
        this.shouldScrollToBottom = true;
        this.newMessagesReceived = createEvent(this, "newMessagesReceived", 7);
    }
    async initialize(sdk, options) {
        this.sdk = sdk;
        this.visit = options.visit;
        this.shouldScrollToBottom = true;
        // copy over whatever they give us
        Object.assign(this.messages, options.messages);
        this.locale = options.locale || this.locale;
        if (options.visit.chatReport) {
            this.chatItems = options.visit.chatReport.chatItems || [];
            this.lastOrdinal = options.visit.chatReport.lastOrdinal;
        }
    }
    async destroy() {
        this.sdk = null;
        this.visit = null;
        this.chatItems = [];
        this.lastOrdinal = 0;
    }
    visitUpdated(newVisit) {
        if (!newVisit)
            return;
        const chatItems = (newVisit.chatReport && newVisit.chatReport.chatItems) || [];
        const newChatItemsExist = newVisit.chatReport && newVisit.chatReport.lastOrdinal > this.lastOrdinal;
        // if we have new messages
        if (newChatItemsExist) {
            // if we're not scrolled to bottom, show the toast,
            // otherwise we need to scroll to the bottom again on next update so set shouldScrollToBottom to true
            if (!this.isTranscriptScrolledToBottom()) {
                this.showNewMessagesToast = true;
            }
            else {
                this.shouldScrollToBottom = true;
            }
            this.newMessagesReceived.emit();
        }
        if (newVisit.chatReport && this.lastOrdinal < newVisit.chatReport.lastOrdinal) {
            this.chatItems = chatItems;
            this.lastOrdinal = newVisit.chatReport.lastOrdinal;
        }
    }
    isTranscriptScrolledToBottom() {
        return this.transcriptScroll.clientHeight === 0 || Math.abs(this.transcriptScroll.scrollHeight - this.transcriptScroll.scrollTop - this.transcriptScroll.clientHeight) <= 3;
    }
    scrollToBottom() {
        this.transcriptScroll.scrollTop = this.transcriptScroll.scrollHeight;
        this.showNewMessagesToast = false;
        this.shouldScrollToBottom = false;
    }
    componentDidLoad() {
        // attach custom scrollbar to the transcript or fallback to default if no shadowDom support
        if (document.head.attachShadow) {
            const simpleBar = new SimpleBar(this.transcript, { autoHide: false, direction: document.documentElement.dir });
            this.transcriptScroll = simpleBar.getScrollElement();
        }
        else {
            this.transcriptScroll = this.transcript;
        }
    }
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            this.scrollToBottom();
        }
        else if (this.isTranscriptScrolledToBottom()) {
            this.showNewMessagesToast = false;
        }
    }
    sendMessage(e) {
        e.preventDefault();
        // if message is empty text don't send it
        if (!this.input.value) {
            return;
        }
        return this.sdk.visitService.addChatMessage(this.visit, this.input.value, this.lastOrdinal)
            .then((report) => {
            this.chatItems = [...this.chatItems, ...report.chatItems];
            this.input.value = '';
            this.shouldScrollToBottom = true;
            this.lastOrdinal = report.lastOrdinal;
        });
    }
    drawChatItems(chatItems) {
        return chatItems.map((item, index) => {
            // check if next message is from the same usertype as current message
            const wasSameSender = chatItems[index + 1] && item.userType === chatItems[index + 1].userType;
            // check if current message was sent within 1 minute of previous message
            const wasSentWithinAMinute = chatItems[index + 1] && item.date.getMinutes() === chatItems[index + 1].date.getMinutes();
            return this.drawChatItem(item, !wasSameSender || !wasSentWithinAMinute);
        });
    }
    drawChatItem(chatItem, showSubtitle) {
        if (chatItem.userType === "ADMIN") {
            return h(AdminMessage, { chatItem: chatItem, i18messages: this.messages });
        }
        return h(ChatMessage, { chatItem: chatItem, showSubtitle: showSubtitle });
    }
    render() {
        return (h("div", { class: "chat-window", dir: document.documentElement.dir }, h("div", { ref: (el) => this.transcript = el, class: { 'transcript': true, 'hidden': this.chatItems.length === 0 }, "data-simplebar-direction": document.documentElement.dir }, h("div", null, h("div", { class: "chat-icon-bumper" }, h(LargeChatIcon, null)), this.drawChatItems(this.chatItems))), h("div", { class: { 'chat-placeholder': true, 'hidden': this.chatItems.length > 0 } }, h(LargeChatIcon, null), h("div", null, this.messages.amwell_chat_window_messages_placeholder)), h("div", { class: { 'new-message-toast-container': true, 'hidden': !this.showNewMessagesToast } }, h("div", { onClick: () => this.scrollToBottom(), class: "new-message-toast" }, h("div", { class: "chevron down" }), h("div", null, this.messages.amwell_chat_window_new_messages_toast), h("div", { class: "chevron down" }))), h("form", null, h("input", { ref: (el) => this.input = el, type: "text", placeholder: this.messages.amwell_chat_window_input_placeholder }), h("button", { type: "submit", onClick: (e) => this.sendMessage(e) }, h(SendIcon, null)))));
    }
    static get watchers() { return {
        "visit": ["visitUpdated"]
    }; }
    static get style() { return "/*!\n * American Well Visit Console Widget\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */:host,amwell-chat-window{position:relative}.chat-window{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;top:0;bottom:0;right:0;left:0;position:absolute}.transcript{-ms-flex-positive:1;flex-grow:1;overflow-y:auto;height:100%;padding:0 24px;overflow-x:hidden}.chat-item{margin:6px 0;display:-ms-flexbox;display:flex}.chat-item.self-message{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.chat-item-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;max-width:290px}.self-message .chat-item-content{-ms-flex-align:end;align-items:flex-end}.chat-item-subtitle{color:#747481;font-size:12px;display:-ms-flexbox;display:flex;margin-top:8px}.self-message .chat-item-subtitle{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.chat-item-bubble{display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.self-message .chat-item-bubble{-ms-flex-direction:row;flex-direction:row}.chat-item-message{background-color:var(--amwell-visit-console-chat-their-messages, #f0f0f0) !important;padding:13px 20px;color:#313336;font-size:14px;font-weight:600;word-break:break-word}.self-message .chat-item-message{background-color:var(--amwell-visit-console-chat-my-messages, #1774cc) !important;color:#fff}[dir=\'rtl\'] .self-message .chat-item-message,.chat-item-message{border-radius:16px 16px 16px 0}[dir=\'rtl\'] .chat-item-message,.self-message .chat-item-message{border-radius:16px 16px 0 16px}.chat-item-tail-outer{width:10px;background-color:var(--amwell-visit-console-chat-their-messages, #f0f0f0) !important;-ms-flex-negative:0;flex-shrink:0}.self-message .chat-item-tail-outer{background-color:var(--amwell-visit-console-chat-my-messages, #1774cc) !important}.chat-item-tail-inner{background-color:#fff;width:100%;height:100%}[dir=\'rtl\'] .self-message .chat-item-tail-inner,.chat-item-tail-inner{border-radius:0 0 16px 0}[dir=\'rtl\'] .chat-item-tail-inner,.self-message .chat-item-tail-inner{border-radius:0 0 0 16px}.admin-message{-ms-flex-direction:column;flex-direction:column;padding:20px;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-align:center;margin:32px 0;font-size:14px;color:#727274;word-break:break-word}.admin-message h3{font-size:18px;margin-top:0;margin-bottom:10px;color:#313336}.admin-message-border{border-radius:8px;border:solid 1px #d6d6d6}.new-message-toast-container{position:absolute;bottom:100px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;width:100%}.new-message-toast{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;background-color:#313336;font-size:14px;font-weight:400;color:#fff;border-radius:22px;padding:6px 12px;-webkit-box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.2);box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.2);cursor:pointer}.new-message-toast:hover{opacity:.9}.new-message-toast div{margin:0 5px}.chevron::before{border-style:solid;border-width:0.1em 0.1em 0 0;content:\'\';display:block;height:.3em;width:.3em;margin-top:6px}.chevron.down:before{top:0;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.chat-icon-bumper{padding-top:20px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-bottom:-20px;fill:var(--amwell-visit-console-chat-button-color, #1774CC) !important}.chat-placeholder{-ms-flex-positive:1;flex-grow:1;padding:0 24px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:#747481}.chat-placeholder div{padding-top:6px}.chat-placeholder path{fill:#E1E1E1}form{-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;height:80px;background-color:#f3f3f3;padding:0 12px;-ms-flex-negative:0;flex-shrink:0}input{-ms-flex-positive:1;flex-grow:1;min-width:0;height:24px;border:none;border-bottom:1px solid #6f7780;outline:none;font-size:16px;padding:16px 10px;margin:0 12px}button{background:none;border:none;outline:none;cursor:pointer;width:unset;height:unset;padding:unset;margin:0 12px}button path{fill:var(--amwell-visit-console-chat-button-color, #1774cc) !important}button:active path,button:hover path{fill:var(--amwell-visit-console-chat-button-color-hover, #156bbd) !important}[dir=\'rtl\'] button svg{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.hidden{border:0;clip:rect(0 0 0 0);margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;border:solid 1px #d6d6d6;border-radius:50%}.radioButtonContainer:hover input~.checkmark{background-color:#d6d6d6}.radioButtonContainer input:checked~.checkmark{background:-webkit-gradient(\n    linear,\n    left top, left bottom,\n    from(#0469bd),\n    color-stop(50%, #2989d8),\n    color-stop(51%, #207cca),\n    to(#25abfd)\n  );background:linear-gradient(\n    to bottom,\n    #0469bd 0%,\n    #2989d8 50%,\n    #207cca 51%,\n    #25abfd 100%\n  );}.checkmark:after{content:\"\";position:absolute;display:none}.radioButtonContainer input:checked~.checkmark:after{display:block}.radioButtonContainer .checkmark:after{margin-top:8px;margin-left:8px;width:9px;height:9px;border-radius:50%;background:white}[dir=\"rtl\"] .radioButtonContainer .checkmark:after{margin-right:8px}.radioButtonContainer{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[dir=\"rtl\"] .radioButtonContainer{padding-right:35px}.radioButtonContainer input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.link{color:var(--amwell-visit-console-button-color, #1774CC);cursor:pointer}[data-simplebar]{position:relative;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-ms-flex-align:start;align-items:flex-start}.simplebar-wrapper{overflow:hidden;width:inherit;height:inherit;max-width:inherit;max-height:inherit}.simplebar-mask{direction:inherit;position:absolute;overflow:hidden;padding:0;margin:0;left:0;top:0;bottom:0;right:0;width:auto !important;height:auto !important;z-index:0}.simplebar-offset{direction:inherit !important;-webkit-box-sizing:inherit !important;box-sizing:inherit !important;resize:none !important;position:absolute;top:0;left:0;bottom:0;right:0;padding:0;margin:0;-webkit-overflow-scrolling:touch}.simplebar-content-wrapper{direction:inherit;-webkit-box-sizing:border-box !important;box-sizing:border-box !important;position:relative;display:block;height:100%;width:auto;visibility:visible;max-width:100%;max-height:100%;scrollbar-width:none}.simplebar-content-wrapper::-webkit-scrollbar,.simplebar-hide-scrollbar::-webkit-scrollbar{display:none}.simplebar-content:before,.simplebar-content:after{content:\' \';display:table}.simplebar-placeholder{max-height:100%;max-width:100%;width:100%;pointer-events:none}.simplebar-height-auto-observer-wrapper{-webkit-box-sizing:inherit !important;box-sizing:inherit !important;height:100%;width:100%;max-width:1px;position:relative;float:left;max-height:1px;overflow:hidden;z-index:-1;padding:0;margin:0;pointer-events:none;-ms-flex-positive:inherit;flex-grow:inherit;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:0;flex-basis:0}.simplebar-height-auto-observer{-webkit-box-sizing:inherit;box-sizing:inherit;display:block;opacity:0;position:absolute;top:0;left:0;height:1000%;width:1000%;min-height:1px;min-width:1px;overflow:hidden;pointer-events:none;z-index:-1}.simplebar-track{z-index:1;position:absolute;right:0;bottom:0;pointer-events:none;overflow:hidden}[data-simplebar].simplebar-dragging .simplebar-content{pointer-events:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}[data-simplebar].simplebar-dragging .simplebar-track{pointer-events:all}.simplebar-scrollbar{position:absolute;right:2px;width:7px;min-height:10px}.simplebar-scrollbar:before{position:absolute;content:\'\';background:black;border-radius:7px;left:0;right:0;opacity:0;-webkit-transition:opacity 0.2s linear;transition:opacity 0.2s linear}.simplebar-scrollbar.simplebar-visible:before{opacity:0.5;-webkit-transition:opacity 0s linear;transition:opacity 0s linear}.simplebar-track.simplebar-vertical{top:0;width:11px}.simplebar-track.simplebar-vertical .simplebar-scrollbar:before{top:2px;bottom:2px}.simplebar-track.simplebar-horizontal{left:0;height:11px}.simplebar-track.simplebar-horizontal .simplebar-scrollbar:before{height:100%;left:2px;right:2px}.simplebar-track.simplebar-horizontal .simplebar-scrollbar{right:auto;left:0;top:2px;height:7px;min-height:0;min-width:10px;width:auto}[data-simplebar-direction=\'rtl\'] .simplebar-track.simplebar-vertical{right:auto;left:0}.hs-dummy-scrollbar-size{direction:rtl;position:fixed;opacity:0;visibility:hidden;height:500px;width:500px;overflow-y:hidden;overflow-x:scroll}.simplebar-hide-scrollbar{position:fixed;left:0;visibility:hidden;overflow-y:scroll;scrollbar-width:none}"; }
};

const defaultMessages$1 = {
    amwell_guest_invite_error_invalid_email: 'This email is invalid',
    amwell_guest_invite_error_invited_email: 'This email is already invited',
    amwell_guest_invite_invited_guests_header: 'Guests You\'ve Invited',
    amwell_guest_invite_invited_max: 'You’ve invited the maximum number of guests',
    amwell_guest_invite_invite_guest_subtitle: 'Enter an email address and we’ll send your guest a link to join the visit.',
    amwell_guest_invite_remove_text: 'Remove',
    amwell_guest_invite_input_label: 'Guest\'s Email',
    amwell_guest_invite_add_another_text: 'Add Another Guest',
    amwell_guest_invite_button_text_pending: 'Invite Sent',
    amwell_guest_invite_button_text: 'Send Invite',
};

const GuestInvite = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.emails = [{ value: '' }];
        this.invitedGuests = [];
        this.messages = defaultMessages$1;
    }
    componentDidLoad() {
        // attach custom scrollbar to the invite window or fallback to default if no shadowDom support
        if (document.head.attachShadow) {
            new SimpleBar(this.inviteScroll, { autoHide: false, direction: document.documentElement.dir });
        }
    }
    async initialize(sdk, options) {
        this.sdk = sdk;
        this.systemConfiguration = sdk.getSystemConfiguration();
        this.visit = options.visit;
        Object.assign(this.messages, options.messages);
    }
    async destroy() {
        this.sdk = null;
        this.visit = null;
        this.systemConfiguration = null;
        this.emails = [{ value: '' }];
        this.invitedGuests = [];
        this.pendingInvites = false;
        this.invitesSent = false;
        this.focusedIndex = null;
    }
    visitUpdated(newVisit) {
        if (!newVisit)
            return;
        this.invitedGuests = newVisit.invitedGuestEmails || [];
    }
    removeInput(e, index) {
        e.preventDefault();
        this.emails.splice(index, 1);
        this.emails = [...this.emails];
    }
    addInput(e) {
        e.preventDefault();
        this.emails = [...this.emails, { value: '' }];
        this.invitesSent = false;
    }
    checkEmailValidOrEmpty(emailString, allowEmpty) {
        const regex = /^[a-zA-Z0-9!#$%&amp;'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        // has to be a string, can be empty if flag is true and if not must match regex
        return (typeof emailString === 'string') && ((allowEmpty && !emailString) || !!emailString.match(regex));
    }
    checkEmailExists(emailString) {
        const alreadyInvited = !!this.invitedGuests.find((guest) => emailString.toUpperCase() == guest.toUpperCase());
        const alreadyEntered = (this.emails.filter((email) => emailString.toUpperCase() == email.value.toUpperCase()).length > 1);
        return alreadyInvited || alreadyEntered;
    }
    validateEmail(email, allowEmpty = true) {
        if (!this.checkEmailValidOrEmpty(email.value, allowEmpty)) {
            email.error = this.messages.amwell_guest_invite_error_invalid_email;
        }
        else if (this.checkEmailExists(email.value)) {
            email.error = this.messages.amwell_guest_invite_error_invited_email;
        }
        else {
            email.error = null;
        }
    }
    handleOnEmailBlur(email, value) {
        // not focusing anything so set it to an IMPOSSIBLE INDEX
        this.focusedIndex = -1;
        // set value of email to user input
        email.value = value;
        // make sure what they entered isn't bananas
        this.validateEmail(email, true);
        // update the state of the component (causes a re-render)
        this.emails = [...this.emails];
    }
    shouldShowAddMoreButton() {
        // only show if we have less total invitedGuests + current inputs than the server configured max
        return (!!this.systemConfiguration && this.systemConfiguration.maxVideoInvites > (this.emails.length + this.invitedGuests.length));
    }
    shouldShowInviteSection() {
        // only show if we have less invitedGuests than server configured max
        return (!!this.systemConfiguration && this.systemConfiguration.maxVideoInvites > this.invitedGuests.length);
    }
    shouldSendInvites() {
        // validate all the emails
        this.emails.forEach((e) => this.validateEmail(e, false));
        // check if we got any errors
        const emailsHaveNoErrors = this.emails.every((e) => !e.error);
        // only send if we have emails that are valid to send and there are no pending invites
        return this.emails.length > 0 && emailsHaveNoErrors && !this.pendingInvites;
    }
    inviteGuests() {
        // if there are no emails, or emails with errors, or if there's already pending invites
        if (!this.shouldSendInvites()) {
            // make sure we're rendering latest email state
            this.emails = [...this.emails];
            return Promise.reject();
        }
        // make sure we keep track of if we've already sent invites
        this.pendingInvites = true;
        // invite guest
        return this.sdk.visitService.inviteGuestsToVisit(this.visit, this.emails.map((e) => e.value))
            .then((invites) => {
            // clear out the inputs
            this.emails = [];
            this.invitesSent = true;
            // set invited guests to the list we get back, will be overwritten by what comes back on visit
            this.invitedGuests = invites.filter((invite) => invite.inviter === "CONSUMER").map((invite) => invite.email);
        })
            .catch(() => {
            // make sure to revert this to false if we never actually sent the invites.
        })
            .finally(() => this.pendingInvites = false);
    }
    async handleSendInvites(e) {
        e.preventDefault();
        try {
            await this.inviteGuests();
        }
        catch (_a) {
            // eat this error
        }
    }
    render() {
        return (h("div", { class: "guest-invite", ref: (el) => this.inviteScroll = el, dir: document.documentElement.dir, "data-simplebar-direction": document.documentElement.dir }, h("div", null, this.invitedGuests.length > 0 &&
            h("div", { class: "invited-guest-section" }, h("h3", null, this.messages.amwell_guest_invite_invited_guests_header), h("div", { class: "invited-guest-names" }, this.invitedGuests.sort((guest1, guest2) => guest1.length - guest2.length).map((guest) => [h("div", { title: guest, class: "invited-guest-name" }, guest), h("div", { class: "invited-guest-spacer" })])), h("div", { class: { "max-invited-message": true, "max-invited": !this.shouldShowInviteSection() } }, this.messages.amwell_guest_invite_invited_max)), this.shouldShowInviteSection() &&
            h("div", { class: "invite-guest-section" }, h("div", { class: "invite-guest-subtitle" }, this.messages.amwell_guest_invite_invite_guest_subtitle), h("div", { class: "invite-inputs" }, this.emails.map((email, index) => h("div", { key: email.value + index, class: "input-group" }, h("floating-label-input", { error: email.error, label: this.messages.amwell_guest_invite_input_label, value: email.value, hasFocus: this.focusedIndex === index, handleOnFocus: () => this.focusedIndex = index, handleOnBlur: (e) => this.handleOnEmailBlur(email, e.target.value) }), this.emails.length > 1 &&
                h("button", { class: "link-like", onClick: (e) => this.removeInput(e, index) }, this.messages.amwell_guest_invite_remove_text)))), this.shouldShowAddMoreButton() &&
                h("button", { class: "add-another-button link-like", onClick: (e) => this.addInput(e) }, h("span", { class: "add-another-plus-sign" }, "\u271A"), h("span", { class: "add-another-text" }, this.messages.amwell_guest_invite_add_another_text)), h("button", { onClick: (e) => this.handleSendInvites(e), class: { "send-invite-button": true,
                    "pending-invites": this.pendingInvites,
                    "invites-sent": this.invitesSent
                } }, h("div", null), this.invitesSent
                ?
                    h("span", null, this.messages.amwell_guest_invite_button_text_pending)
                :
                    h("span", null, this.messages.amwell_guest_invite_button_text))))));
    }
    static get watchers() { return {
        "visit": ["visitUpdated"]
    }; }
    static get style() { return ":host,amwell-guest-invite{position:relative}.guest-invite{position:absolute !important;top:0;bottom:0;left:0;right:0;padding:24px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;overflow-y:auto;overflow-x:hidden}.invited-guest-section{margin-bottom:24px;border-bottom:1px solid #f3f3f3;width:100%}.invited-guest-section h3{font-size:14px;color:#313336;margin-top:0;margin-bottom:1rem}.invited-guest-names{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.invited-guest-name{height:35px;border-radius:18px;background-color:#f3f3f3;-ms-flex-align:center;align-items:center;margin-bottom:8px;padding:0 16px;overflow:hidden;white-space:nowrap;display:inline;text-overflow:ellipsis;line-height:35px}.invited-guest-spacer{width:8px}.max-invited-message{height:20px;font-size:12px;color:#5b6b7b;margin-top:12px;visibility:hidden}.max-invited-message.max-invited{visibility:visible}.invite-guest-section{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:baseline;align-items:baseline}.invite-guest-subtitle{margin-bottom:24px;font-size:14px;color:#5b6b7b}.invite-inputs{width:100%}.input-group{display:-ms-flexbox;display:flex;margin-bottom:15px}floating-label-input{-ms-flex-positive:1;flex-grow:1}.link-like{color:var(--amwell-visit-console-link-color, #1774cc) !important;text-decoration:underline;font-size:14px;background:none;border:none;outline:none;cursor:pointer;padding:0}.link-like:hover{color:var(--amwell-visit-console-link-color-hover, #156bbd) !important}.add-another-button.link-like{margin-top:20px;margin-bottom:15px;text-decoration:none}.add-another-button .add-another-text{padding:0 6px;text-decoration:underline}.send-invite-button{margin:25px auto 0;height:44px;width:200px;font-weight:600;font-size:20px;color:#ffffff;border:none;background:var(--amwell-visit-console-button-color, #1774cc) !important;border-radius:var(--amwell-visit-console-button-border-radius, 5px) !important;cursor:pointer;outline:none;position:relative}.send-invite-button:hover{background:var(--amwell-visit-console-button-color-hover, #156bbd) !important}.send-invite-button.invites-sent,.send-invite-button.invites-sent:hover{background:var(--amwell-visit-console-button-color, #1774cc) !important;cursor:unset;pointer-events:none;opacity:.7}.send-invite-button div{display:none}.send-invite-button.pending-invites div{display:initial;position:absolute;border:4px solid #ffffff;border-top:4px solid transparent;border-radius:50%;width:26px;height:26px;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite;bottom:0;top:0;left:0;right:0;margin:4px 83px}.send-invite-button.pending-invites span{visibility:hidden}\@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.hidden{border:0;clip:rect(0 0 0 0);margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;border:solid 1px #d6d6d6;border-radius:50%}.radioButtonContainer:hover input~.checkmark{background-color:#d6d6d6}.radioButtonContainer input:checked~.checkmark{background:-webkit-gradient(\n    linear,\n    left top, left bottom,\n    from(#0469bd),\n    color-stop(50%, #2989d8),\n    color-stop(51%, #207cca),\n    to(#25abfd)\n  );background:linear-gradient(\n    to bottom,\n    #0469bd 0%,\n    #2989d8 50%,\n    #207cca 51%,\n    #25abfd 100%\n  );}.checkmark:after{content:\"\";position:absolute;display:none}.radioButtonContainer input:checked~.checkmark:after{display:block}.radioButtonContainer .checkmark:after{margin-top:8px;margin-left:8px;width:9px;height:9px;border-radius:50%;background:white}[dir=\"rtl\"] .radioButtonContainer .checkmark:after{margin-right:8px}.radioButtonContainer{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[dir=\"rtl\"] .radioButtonContainer{padding-right:35px}.radioButtonContainer input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.link{color:var(--amwell-visit-console-button-color, #1774CC);cursor:pointer}[data-simplebar]{position:relative;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-ms-flex-align:start;align-items:flex-start}.simplebar-wrapper{overflow:hidden;width:inherit;height:inherit;max-width:inherit;max-height:inherit}.simplebar-mask{direction:inherit;position:absolute;overflow:hidden;padding:0;margin:0;left:0;top:0;bottom:0;right:0;width:auto !important;height:auto !important;z-index:0}.simplebar-offset{direction:inherit !important;-webkit-box-sizing:inherit !important;box-sizing:inherit !important;resize:none !important;position:absolute;top:0;left:0;bottom:0;right:0;padding:0;margin:0;-webkit-overflow-scrolling:touch}.simplebar-content-wrapper{direction:inherit;-webkit-box-sizing:border-box !important;box-sizing:border-box !important;position:relative;display:block;height:100%;width:auto;visibility:visible;max-width:100%;max-height:100%;scrollbar-width:none}.simplebar-content-wrapper::-webkit-scrollbar,.simplebar-hide-scrollbar::-webkit-scrollbar{display:none}.simplebar-content:before,.simplebar-content:after{content:\' \';display:table}.simplebar-placeholder{max-height:100%;max-width:100%;width:100%;pointer-events:none}.simplebar-height-auto-observer-wrapper{-webkit-box-sizing:inherit !important;box-sizing:inherit !important;height:100%;width:100%;max-width:1px;position:relative;float:left;max-height:1px;overflow:hidden;z-index:-1;padding:0;margin:0;pointer-events:none;-ms-flex-positive:inherit;flex-grow:inherit;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:0;flex-basis:0}.simplebar-height-auto-observer{-webkit-box-sizing:inherit;box-sizing:inherit;display:block;opacity:0;position:absolute;top:0;left:0;height:1000%;width:1000%;min-height:1px;min-width:1px;overflow:hidden;pointer-events:none;z-index:-1}.simplebar-track{z-index:1;position:absolute;right:0;bottom:0;pointer-events:none;overflow:hidden}[data-simplebar].simplebar-dragging .simplebar-content{pointer-events:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}[data-simplebar].simplebar-dragging .simplebar-track{pointer-events:all}.simplebar-scrollbar{position:absolute;right:2px;width:7px;min-height:10px}.simplebar-scrollbar:before{position:absolute;content:\'\';background:black;border-radius:7px;left:0;right:0;opacity:0;-webkit-transition:opacity 0.2s linear;transition:opacity 0.2s linear}.simplebar-scrollbar.simplebar-visible:before{opacity:0.5;-webkit-transition:opacity 0s linear;transition:opacity 0s linear}.simplebar-track.simplebar-vertical{top:0;width:11px}.simplebar-track.simplebar-vertical .simplebar-scrollbar:before{top:2px;bottom:2px}.simplebar-track.simplebar-horizontal{left:0;height:11px}.simplebar-track.simplebar-horizontal .simplebar-scrollbar:before{height:100%;left:2px;right:2px}.simplebar-track.simplebar-horizontal .simplebar-scrollbar{right:auto;left:0;top:2px;height:7px;min-height:0;min-width:10px;width:auto}[data-simplebar-direction=\'rtl\'] .simplebar-track.simplebar-vertical{right:auto;left:0}.hs-dummy-scrollbar-size{direction:rtl;position:fixed;opacity:0;visibility:hidden;height:500px;width:500px;overflow-y:hidden;overflow-x:scroll}.simplebar-hide-scrollbar{position:fixed;left:0;visibility:hidden;overflow-y:scroll;scrollbar-width:none}"; }
};

const TytoDeviceWizard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.messages = defaultMessages$4;
        this.isTytoDevicePaired = false;
    }
    async initialize(sdk, options) {
        this.sdk = sdk;
        this.visit = options.visit;
        this.consumer = this.visit.consumerProxy
            ? this.visit.consumerProxy
            : this.visit.consumer;
        Object.assign(this.messages, options.messages);
        this.sdk.deviceLiveStreamService
            .getDevicePairingStatus(this.visit.consumerProxy
            ? this.visit.consumerProxy
            : this.visit.consumer, "TYTO_LIVESTREAM")
            .then((response) => {
            if (response.devicePairingStatus.toString() === "PAIRED") {
                this.initializeStep = TytoWizardScreenType.DEVICE_PAIRED;
                this.isTytoDevicePaired = true;
            }
            else {
                this.initializeStep = TytoWizardScreenType.TYTO_DEVICE_INTAKE;
            }
        })
            .catch(() => {
            this.initializeStep = TytoWizardScreenType.TYTO_DEVICE_INTAKE;
        });
    }
    async destroy() {
        this.sdk = null;
        this.visit = null;
    }
    render() {
        return (h("div", null, h("tyto-stepper", { sdk: this.sdk, consumer: this.consumer, initializeStep: this.initializeStep, isTytoDevicePaired: this.isTytoDevicePaired })));
    }
    static get style() { return "/*!\n * awsdk - 3.1.0 - (c) 2017 - sdk.support\@americanwell.com - https://sdk.americanwell.com \n * \n *  American Well Consumer Web SDK \n * \n * Copyright © 2017 American Well.\n * All rights reserved.\n * \n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */\n/*!\n * American Well Core Web SDK\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-samsung .awcore-switch-camera{display:none}.awcore-container{position:relative;top:0;left:0;width:100%;height:100%;min-width:870px;min-height:357px;background-color:#1B191B;color:#ffffff}.awcore-container .awcore-control-button:hover{cursor:pointer}.awcore-container video{pointer-events:none}.awcore-top-pane-wrapper{pointer-events:none;position:absolute;top:0px;left:0px;right:0px;height:160px;width:100%;background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(26,25,27,0.6)), to(rgba(26,25,27,0)));background-image:linear-gradient(to bottom, rgba(26,25,27,0.6), rgba(26,25,27,0));display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.awcore-top-pane-wrapper *{pointer-events:auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.awcore-bottom-pane-wrapper{pointer-events:none;opacity:1;text-align:center;position:absolute;bottom:0px;left:0px;right:0px;max-height:120px;height:100%;width:100%;background-image:-webkit-gradient(linear, left bottom, left top, from(rgba(26,25,27,0.6)), to(rgba(26,25,27,0)));background-image:linear-gradient(to top, rgba(26,25,27,0.6), rgba(26,25,27,0));display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:baseline;align-items:baseline;padding:16px;-webkit-box-sizing:border-box;box-sizing:border-box}\@media screen and (max-width: 768px){.awcore-bottom-pane-wrapper{max-height:180px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}}.awcore-bottom-pane-wrapper *{pointer-events:auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.awcore-bottom-pane-wrapper,.awcore-hide-self-video{-webkit-transition-duration:.3s;transition-duration:.3s}.awcore-bottom-pane-wrapper span,.awcore-hide-self-video span{display:block;margin-top:66px;font-size:12px;white-space:nowrap}.awcore-full-screen-button span{margin-left:-20px;margin-right:-20px;text-align:center}.awcore-hiddenControllers .awcore-top-pane-wrapper,.awcore-hiddenControllers .awcore-bottom-pane-wrapper,.awcore-hiddenControllers .awcore-hide-self-video{pointer-events:none;opacity:0;-webkit-transition-duration:.8s;transition-duration:.8s}.wcag .awcore-hiddenControllers .awcore-top-pane-wrapper,.wcag .awcore-hiddenControllers .awcore-bottom-pane-wrapper,.wcag .awcore-hiddenControllers .awcore-hide-self-video{pointer-events:auto;opacity:1}.awcore-toggle-buttons-container{display:none}.awcore-toggle-buttons-container,.awcore-settings-container,.awcore-far-control-container{z-index:5}.awcore-toggle-buttons-container,.awcore-settings-container,.awcore-toggle-buttons-container.awcore-call-active{display:-ms-flexbox;display:flex}.awcore-video-node-0.awcore-participant-wrapper{position:absolute;top:0;left:0;width:100%;height:100%}.awcore-remote-video-0{position:absolute;top:0;left:0;width:100%;height:100%}.awcore-remote-video-0.multiway{height:calc(100% - 140px);bottom:102px}.awcore-requesting-browser-permission .awcore-spinner-container,.awcore-requesting-browser-permission .awcore-settings-container,.awcore-requesting-browser-permission .awcore-toggle-buttons-container{visibility:hidden}.awcore-control-button{height:60px;width:60px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;border-radius:50%;background-color:#25abfd;background-repeat:no-repeat;background-position:center center;border:1px solid #25abfd;-webkit-box-shadow:0 3px 8px 0 rgba(0,0,0,0.5);box-shadow:0 3px 8px 0 rgba(0,0,0,0.5);margin:0 10px}.wcag .awcore-control-button{background-color:#1296e7;border:8px #1296e7}.awcore-switch-camera{display:none}\@media only screen and (max-width: 768px){.awcore-switch-camera{display:inline-block}}.awcore-control-button:active,.awcore-toggle-buttons-container .awcore-full-screen:active,.awcore-toggle-buttons-container .awcore-refresh:active,.awcore-control-button.awcore-settings-div:active{border:solid 1.9px #ffc33e !important}.awcore-control-button:active span{margin-top:65px}\@media only screen and (max-width: 768px){.awcore-settings-container,.awcore-call-me-div,.awcore-full-screen-button,.awcore-refresh-button{display:none}}.awcore-toggle-buttons-container .awcore-camera{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASdJREFUWAntlDEOAUEUhq0ohEKioEAjeomIQqNSuItSoaSUqDiBEziCuIFoHECiU0h0wvqm2M1kyBoTL1HMS/7sm3lv3v/vv5tJpXx4B7wD/+RAGIYDcAQucefQFpSd34nDruS64Pk3AtJGc9VYuyzfzkBhHizBTB9qCtBrP8sh7TFsD4agrw8WFQBxDiwg3IC6ThzlmSj59RPiLjNXoJE0W0wApGtQSiJXNclPUPxELi3Ahl/UAS/gZmOB5E84RsBHEWICgiBQF1Ab7JKcEBOgSBGhrt8OmIK3bogKgFSJuIEJqRKiBJ1AHOZNeKFSiKtuiZrxEojYcT23KGRfitEGDSPwAK5x5mAzmmfzDMwmBtTYq5j7Fus7PQfe9GrR61u8A96B2IEnllkEvZkqx+0AAAAASUVORK5CYII=\")}.awcore-toggle-buttons-container .awcore-camera.awcore-disabled{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYtJREFUWAntljtOw0AQhmMeBaRDCggh2hQUiIKKhiNQcRMKSlokquQINLRIcAAkSp6i43EAOioKEJhvLE/kXRtlZ+PIjUf6M97deXzejeN0Oq21O9DuADuQpukluka9RjYkb45L31BfIPB76AuF2g+BV2jFfBMk9dATEvtEsRCSf2IGyO9YINQmgTirAqBwFw3RcdV6Nqfdcx8LUQKg3i6S4xW7CwWQ4BiIEQD5i2iAfpGaCUCSrBAZAHk76EUKeGYGkHwLhAK8e4116ADM/Hse7sICwwcq9JMkOed6H327IaXRUmmmYiIUQFJjICpaulMWgKlAWAFqh4gBCIUY9x3JziIWIATikKAgiIxEPvQ5MXr/ET3VgtTZRPdePecx1NjMe4GWYRFitViUIvPoCOmbdSoAAjuCKALoNetb6BFd6FzJs/iBJrFxELMU75Ya6wSLB6j44oiBeSYp+J9Vos3Vk7zO9ZqODV7ubIA20C0/2duG3HpCgV9GN+gVzdVTNaJKo80jeNuUZnfgD81pGyyGJcc/AAAAAElFTkSuQmCC\")}.awcore-toggle-buttons-container .awcore-mic{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAdlJREFUWAntlr9KA0EQh3MhBgwhSSGCjY0WChaCnQpir4UpFF9ArBW0ECx9AG20Ed9AFMFeLGwUooKgWIk2sTGFgn8Sv9G5EEw2t3seaJGBj9mbnfnNZO8uSSzWshAnUKlU5uAInuAKNqEzhJRbCU3isA+NrEhw0E3RMZsGi40618QuWCcdZe3TEb+uaWZajtsrxmJx22S6ZcjttcgfssipplgPQIUM4FUrzYuseat+x2WA+uoIIq0BWifwv0+Ad39KCPOwU9cNy5AOU/9VQ3EJniEBHWBjK1JM4oYmzzYbIOgWlChuhy7P8x7xD83EdK+gvke9aBgtaIBLrRxTv2tU+t4o4o755G34Yc31NfTSwSE0r8d4jk9CGm409tN9EMiLPH5BN88c2tWnIpKCexVbU/Ec19vwonFxBRjV/T7W/t50vapjBLE8lOEdViGhjeTB7IecL8l6BG5B7BBsfrz8crNHSF4n305ZTIA8nHLcHgzAOshtEJMcp19Fc3fdQXAG5G+Xb3Iqb0ptbIeLVKBgmASEM7AEJ/AKYjLIHWyB05+RMDNUa2gmt0HsoBoMsQj6HrCRrNgkmXKiGMCkbRVvDfCbEyjrGfve6sgjS+Lpz8IeTEYm+hdCny9kF+rB7wYKAAAAAElFTkSuQmCC\")}.awcore-toggle-buttons-container .awcore-mic.awcore-disabled{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAlpJREFUWAntlj1LHVEQhl1RY0Q0hdoZOwuRIKSzkdRJEAWV/AAhtYiChU0gP0AbbdKaLhgSK7s0aSKi1+sXIUVMoxCIheLn5pnrHDksZ/fsuW5hIAOvZ2bOzDvvPbvubk3Nfws8gTiOIzAOvoA/YBssgI5AqvByhtSCj8BlRyT7wlkDOhgw6Zps5TbxGwIo3aWQdIEZ0GZXEO8Cnz2ze6rymSDDxUqgXUhYG8EZ8NlkVUPtJia0ARkuZosYJD6vZNP/vLG5qvbhbwfViChGgChPiCgTd2s+6ySKE+AQcZJDRLECLBE7DBfziShegIp4cjPfKyJIQK2Q57TfVt1D/HWkdEdRtIw/Ai6s/dxupgAGDAlS2DJF0PcYTIPmlH5/muZjINe8DsizwWXJe2JGmCmc1+JX/kkpFRAcKEmnkv7SOLnYIh5o7YoWPU+hr6QzLwEVJW0e0PWDrsnFvhzyuK6noF+LDEeyxx9D9Fp/xQZrA2gG+5pzLT9IyhN0QjfX/FMyKiBpAubY30op8SPwDpwCY3s43zUQ3+yNZtDn24JsGFyDSzAL6lSI3Jg9oEtj+eVGBG68CqJ8UzxVEMm/k7FvOC+AXHc5EflE6wVz4AoYK+NUXuUe+nzbkI0B+ewyJqdyobBzSwRbmrh9leeb4qmCtAVMga/AfBeIkJ9gETwVClbnq9xDH7bNELkMYp9cneQ7gPmeWHLVSM73HEjrs/OxHRifd8QhvnwfvgefTT65Vu7oZLKoGBFHcGU+ios4gTvp/acFXOtPN+udTiK4mTu8FSyDl8HN96nhL4fP77sBPH/XAAAAAElFTkSuQmCC\")}.awcore-toggle-buttons-container .awcore-switch-camera{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA0VJREFUWAntljtoFFEUhnc34sbEJIWFj8Ii+CCkMCSKokFU0CqFggpqrCyChZZWWgZtBBU0jSAYCxVFQREUC8UiJijERxVTRMEgKuIzD5Pd9Tuz5wwzkzu7ySzpvPDvOfc//zn3zNw7s5NK/R9l7kChULgE3oJVZaSJwplZZDWweDO6J/PRRNrVAAtVw68DK0AtOAe3JJ1Of8Tfhh3GegN+Ac52sLjIOH8/wQ6SN+6MGikLg7NgKp/PF1wg9sD0Ypl3uXRRDt00uABqgvnSvTcIyHY8xG6l0ynQz3y0GE1thl+q/j21Zh6h7WVS6g4sI95GjWNoN2DbsTkr4FnI49I1YwTInht/kHlOYyeMn6ulxlowHFuH4DMNdgSLwz+PTQoKZ+FTa6fWGpghJ/hbg3Lo/AHfBHb4RAUOdbIgByaA9wT6T4EsLrUzmYzPxa1Fch2xXUDeDXKy5Yr62VevBn7s0MWzaKvBpC+UBqwJn3Q4FNgPvpjeLJy8JxodKSEKzYTkMLKhgBUKkZEJSSdNh98PzoNeMKpFf+E3RdJCU+LJGiCxFUwpOoNV4erADW1iAL8qGA/6xBI3cEcX6A4WNJ/Ci8A71ew2PmqjDXgnMSqKmbcrf80V50DJYbytsS0ujYubSwNy8mXY27E4C/9azLThqGM2lwbea36ro45RbeqY1vjyVvZOEKdk77p1f/vwZxwyuBbwF8ifTuyTQCzxIawh2Q7ZU3x5KqqAPAGHwVdt8HTcRQiPLlkDmiz/aCN2t/DHAdPi3cO/BRbOWwPahFyxfKB81iuW19ogOFBqYYuhc98BAt6VYMv+FwSK1aMvecWmNYt+UhsP5xEY0sBqEye1chHgDHgJGqwO/kpd44NxviV4VYOXfTKBQx1ZvEdrjeHbl5QcwIvK37TS/u0m2Aj5GlvLW+0uvnxm2YvF9EH7B92bIEGu1OvBdglP/BTmMZBPskPwe/WN2YIdggsPBB3Ae5yk03JAezRYgfm+UjnEv4E9wRz/o1RIurqPoBl7hOl6sFz4mDEG3xeJvSL3JzXqhcd/gZkG8lku/hW4UncVSYWDxTeBH7rX1ysslyydBjaC79rEmmRVKsyiAfkM76ywzPyn/wO9yLf4O4l0fwAAAABJRU5ErkJggg==\")}.awcore-toggle-buttons-container .awcore-full-screen{background-color:#4a5764;border:1px solid #4a5764 !important;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWtJREFUWAntVUFOxDAMbDkjbnyKp/CMvfEf9g/c4T0tM2wdTey4bXpDiiUrTjwzdtxtd5qGjQm4Cazrel+WZW05cw4etr38J68AgTd/JvtV4ixMMQfaDz27OcC0b/hrVunonNxNo0z0iDNJAyxOu9QEeKU4NUy3pwEK/MBpXE9PgtiNg+Vxge4G2KkTOtVExrnUQG8TWXHqnG4AIp90kswaws+Ws7WBqR5ZS9e4p1Yp8NEiIP8C/4KfelQtjcMziIebK2lrorq55kc8JvC/J4BfOD+vN3j4B9WbIf9OrJ51xSDf6UqiIJzvN+2mOY2RY3Fa+BbgLOgqt8T+kwmiFg/ChYhgD+t1lVfFCtwTrEiyyTiqK/AYGjATiox40uKabkS7EwNCxJ757tgdvWx9E6ZbAFlgQAjQLhU3bfDL78d0LZeuBNKMoCuOq7ejJUKMcnzsOeGdnueZr4vH2T5NGABriqG24EY4JvA3gV8bY/W+zlbCXwAAAABJRU5ErkJggg==\")}.awcore-toggle-buttons-container .awcore-full-screen.awcore-on{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUtJREFUWAntVokNwjAMpOwAQ7EJnY9OAvM03FVNSGwnoSlISCSSFfzc+eQit4dDP782AefcFXb6tC5ykrvIuzbH5e6wRAT8iVYkQNKqIxeMnDx5EUjGhYmIeZ4drSZA1pU4Ta4V8MDNw3uZhCQ2wQjGdcSuHLj0VHMcHGMMXETExFlgJMDiKOFUThI0CFBTVE1qgVhEgwDAX4+w1ivkAZp8M+sOhZkfFsbHyC1hRxmAn/2nD8OgCCS+UpPlljzd7xPoE/jjCZQ2obXJ5Ki24t/ehNhwfEteZEPpV2q2bUKQhdey3+eyofR9HbA84XtC1lV9gENzEnniGtDXrc1xNYgAKGlO3xNvEKA4atglbzVnYqsAYnJczJmnBGgRwCYlTiUCxSOMR/15ELvRFEgErDrE4scxCkjqopgili/hNLPPA+eZ3PtYOvoLE3gCXhzUULzBV0kAAAAASUVORK5CYII=\")}.awcore-toggle-buttons-container .awcore-refresh{background-color:#4a5764;border:1px solid #4a5764 !important;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArZJREFUWAntljtoVEEUhrPx/cYHvhBFo2AQRCKo2GghNlY+CgtBxQeKFkLAQqwVQRCDjYVgKWksRIKghZWkUEgUJLIKFkbFByE+IsF4/f7cM2H2vje72SoHvj1n7/zzz9zZ2bm3qWkyJmgFgiC4BO9h7QQNkW3LwM9AcSZLOTWrMdqGWYlrK6EFlsA0aIYv0A/lUqk0TFZ8D9Oozsp4KjQBBl5A19NwFrKWdBBtJ5qb8BUUmmhq5E4Aw0P07oAV5hKQX8I70J3PhtWwFebDSTgGPaBYHKYqP7XccB1cfKK4CEuTrLg+C/ZDNyhGwhR0JendtawVuI3olAllcpTfV3dcEQyifXACWkHLPQB9oIkuhOpXANPzNnsl/Z20+RKDtr0SZcStxI52MWaM0TraXsN0uMtdHzdtYkI/h4aroN9fG098s9xP/27q4oFhp93NK7I2WOOCAVfBP5vArsaNbCMxcLsN3tuowXWK+bHbvjz0L9aj5sbaQGdEeiAo2wocTleNrwXfHvNe5jtEV8A1unPc19Za60xQzAxT+BmdwC9r/OmL6lSPmM8U3y9tAmt8Ua01S69BF5nPkO8XnUDZGjf5ojrUbXjooFLoqB6L6AQeWcu+MUV9ij1m84GTsWIFKuxZqlbbqUo7KxrH+QWfeaAnqeJGrg2irlFpEDwhx54VuQYRAR5XzO8veWOkOf4V0WZwz/L2uKL4FXy2wRAo7hTuidi9iAxTHync0RPST4MPgKIX5nrN2SXiZrgPCj2cLoNePAoFWr0ZucE/U1f/t6aTXrEegIs+ioMwI20WtOmun4KLjxQ70vS6nrvJMLiA7hroBUWh0/IxvIFBkIdeSLfDcnBxj+Icf7vaj3Um0QId8APy4jmCA24WeTl3BXwDjLWRtsAGWA/aF3/gN7yFF9yx8mQUXoH/E9EVRgqS6vcAAAAASUVORK5CYII=\")}.awcore-toggle-buttons-container .awcore-disabled-button{pointer-events:none;opacity:0.4}.awcore-toggle-buttons-container .awcore-control-button .awcore-on:hover,.awcore-toggle-buttons-container .awcore-control-button .awcore-disabled:hover{background-color:#4a5764}.wcag .closeDrawerItem:focus,.wcag .awcore-spinner-button:focus,.wcag .awcore-toggle-buttons-container .awcore-control-button:focus,.wcag .awcore-control-button:focus,.wcag .awcore-call-me-div:focus,.wcag .awcore-hide-self-video-container:focus,.wcag .awcore-cancel-text:focus,.wcag .awcore-cancel-sub-text:focus{-webkit-box-shadow:inset 0 0 1px 0.5px #ffc33e, inset 0 0 2px 1px #fff;box-shadow:inset 0 0 1px 0.5px #ffc33e, inset 0 0 2px 1px #fff}.wcag .awcore-cancel-text:focus,.wcag .awcore-cancel-sub-text:focus{display:inline}.awcore-disconnect-call-container{z-index:5;padding:20px}.awcore-disconnect-call-container .awcore-disconnect-button{display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.awcore-self-container{z-index:5;position:absolute;width:20%;min-width:120px;max-width:350px;top:88px;right:24px}[dir=\'rtl\'] .awcore-self-container{right:unset;left:24px}\@media only screen and (max-width: 768px){.awcore-self-container{min-width:90px}}.awcore-self-container.active .awcore-local-view video{-webkit-box-shadow:0px 2px 20px rgba(0,0,0,0.5);box-shadow:0px 2px 20px rgba(0,0,0,0.5)}.awcore-local-video{bottom:0;right:0;width:100%;height:100%;pointer-events:none}.awcore-local-view.awcore-local-participant-wrapper.awcore-hidden{display:block !important;opacity:0 !important}.awcore-local-view-name{position:absolute;left:20px;bottom:20px;width:52px;height:26px;opacity:0.4;border-radius:28px;background-color:#000000;text-align:center;padding-top:5px;overflow:hidden}.awcore-connect-display-main{font-size:20px;font-weight:600;color:#ffffff;margin-bottom:12px}\@media only screen and (max-width: 768px){.awcore-connect-display-main{margin:24px 0 0 0;font-size:14px;margin-bottom:6px}}.awcore-connect-display-subtext{font-size:16px;font-weight:normal;color:#ffffff}\@media only screen and (max-width: 768px){.awcore-connect-display-subtext{font-size:12px}}.awcore-control-button.awcore-settings-div{border:none;background-color:transparent;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAkJJREFUWAntljtLXEEUgO/VEJS4GEwUUVeLEPCBYCUWgtW2aYRIzE9IaSpNIJCQIj9ALOzE/2BpuY1YBLQQXazURBCiEtSY9Tuws05O5gz7QhLwwMfMec+de+/cmyT38r/uQLFYXAEnp0wm7uxaaPYALlz30vi+lgU0xZIo/AheQIuKG0N/qGzDSk/I64M2ba9IJ7ETNkBkEwahHd5AAbRcYvgCWWiGd3AFu9BTUVMXREIbbIMv1yi/fIMxl7hj5dtC73D1/dG6BVmCBv1A5hLbrGwhVeKeKMcQ+rSyxVVWvKSuoh5139oBcxUkyG34aXRdxj4BmRIyF5slU2Yjy0GlHvitKh6i5yI5OfwSo2XAyjHtVPigq6CbzV0hiQnkzTt/dCSxG6ZBmsvp5styNNlzkqRvxxE2OU+6vbC/pwQcgCUVH7UUkGfCknW/c+orkuHrap5J0/RM2YIqZTI4fgSdSVKkTvn1L0+MYN/8x2J9Rz1zvYB8pNhIxKddsVh7F9m6FJ7BDOjnoZ6HUL6cq7AA43q1QZ3AOdBS62v4MdgkZqSzvJJaajmI5IsYf/1CCyFpFPRJ6BZUzVH8nST9rIVa3tpIaIWvrlsDxoXb6hXMaPiqAU39EnIbgj8l1tassc5ttdZLpVej7hB8Uk2C/M/1wl7pMhYZ5fPcD5/hHLR8w/AWumASCiAiv3VPq2rugkl8DKGfzU/Ytcy6PBlxSu5rkGO5sULRl6DleWO7RKrRWX5WZMud5JlYz1Ok0r3rH9iBG/Sqg5ve1aWlAAAAAElFTkSuQmCC\");background-color:#4a5764;border:1px solid #4a5764 !important}.wcag .awcore-control-button.awcore-settings-div{background-color:#5b6b7b}.awcore-control-button.awcore-settings-div.open{background-image:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2232%22 height%3D%2232%22 viewBox%3D%220 0 32 32%22%3E    %3Cg fill%3D%22%23FFF%22 fill-rule%3D%22evenodd%22 transform%3D%22rotate(45 12.586 17.414)%22%3E        %3Crect width%3D%222%22 height%3D%2228%22 x%3D%2213%22 rx%3D%221%22%2F%3E        %3Crect width%3D%2228%22 height%3D%222%22 y%3D%2213%22 rx%3D%221%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-settings-chevron{margin-left:15px;width:24px;height:12px;position:absolute;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAYAAAB4MH11AAAAAXNSR0IArs4c6QAAALlJREFUOBFj+P//fwkQ0wI8BBqqwAACQEYVlW14AjRPGWw4jAAKNFDJkudAc9Rg5qLQQIk2Ci15BdSvhWIoOgeooIdMS94A9emim4eVD1Q4kURL3gHVG2I1DJcgUMN0Ii35AFRnisscnOJATYxAPIeAJZ+A8pY4DSEkAdTMBMSLcFjyBShuS8gMgvJAQ5iBeDmaJd+AfEeCmolVADSMBYjXQC35AaRdidVLtDqgoaxAvAqIvYjWBFQIAJQEbVXDb8whAAAAAElFTkSuQmCC\") no-repeat}[dir=\'rtl\'] .awcore-settings-chevron{margin-left:unset;margin-right:15px}.awcore-participant-title-container-bg{border-radius:4px;background-color:rgba(0,0,0,0.54);padding:8px 16px;margin-bottom:12px}.awcore-participant-title-container{position:absolute;top:16px;left:16px;max-width:calc(80% - 115px);text-align:initial;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;z-index:5}[dir=\'rtl\'] .awcore-participant-title-container{left:unset;right:16px}.wcag .awcore-participant-title-container{margin-left:10px;margin-top:0px;margin-bottom:0px;width:342px;height:65px;border-radius:4px;background-color:rgba(0,0,0,0.54);bottom:14px;padding-left:8px}h3.awcore-participant-title{font-size:20px;font-weight:bold;margin-top:1px;margin-bottom:3px;line-height:1.2}.wcag h3.awcore-participant-title{margin-bottom:0px;margin-top:8px;padding-left:8px}h4.awcore-participant-subtitle{font-size:14px;line-height:1.1}.wcag h4.awcore-participant-subtitle{bottom:15px !important;padding-left:8px}.spacer{display:inline-block;padding:0 2px}.awcore-disconnect-button{height:44px;border-radius:4px;border:none;background-color:#fd6b6b;font-size:20px;font-weight:bold;text-align:center;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);padding:0 20px}.awcore-disconnect-button:hover{background-color:#f14343;cursor:pointer}.awcore-muted-icon{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2YAAANmCAMAAACmC2jMAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTJmZmZqampubm5mZmZ2dnZycnJqampmZmaOjo5qampqampubm5qampqampqampqampqampmZmU6oNn0AAAASdFJOUwDf0TfsFiT+9wiHmEx0X6nDtgBw4RoAAC/gSURBVBgZ7MALYuOqtgTQkgRs0F81/8G+16dvB+z4HyexRS3IK0qhG+epH5ZlW9u2cS7+YQfiH841bbtuyzL00zx2IUFEzkqhm6dhWRsXaSwZ/2M8ZDzFGF2zLsM0dyFBRAD4bu6XtYnGv4zPYPyPxWZd+rnzEKmR76ZhbaLxD+N3Mf7HYrMOU+chUgU/Tkvr+Jfxh5jxP65dptFDZK/C3K/O+ALMrf0cILInYR5WZ3wx5tZhDhB5e2FaGuMLs2aZAkTeU+qmzRnfgrlt6hJE3kmYF8e3YiTdMgeIvIE0Dm3k24rtMCaIvC4/L8749swts4fI6/Hz5ow0PkeMrmnXdVuGoZ/meez+XwjepwSk5H0I3f8b53nqh2HZ1rVtXIx8GnPb7CHyOvy0RpoZvyS6pl2Xfh47j4f5bpz7ZW0bF/kVZmaM6+Qh8vvSuDg+zhibdunnLuHpUjf3S9tEGh/nljFB5Bd1Q0MzPsJcsw1Tl/ADUjcNW+OMDzAjm6GDyG/wU8tHmGu3fvT4BX7st9YZH9FOHiI/qhsc7xZdO8wev87PQ+si7+aGDiI/I81b5J1cO8weL8XPQ+t4p7jNCSLfzE8t79OsfYeX1fVrw/s0k4fIt/F9YzTeypptCngDYdoa4+2s6T1EvkHonfFW5tY+4K2EfnXGW5nrA0SeKgyON7LYDiPe1Di00XgjNwSIPInvHW9jse0D3lzo22i8jes9RL7MTw2Nt4hr77ETvl8jb2FsJg+RL0hzy1tYXCePnfHTGo1XGdnOCSKPGVej8arYDAE7FYYm8jqzdYTI3XwfeZ25ZcTOjYszXhd7D5F7jK3xqthOCVVIUxt5lbUjRG7kh8ir3DaiKuPmeFUcPESum1vjNU3vUSHfN7zG2hkiF4Ul8pp2SqhWmlpeE5cAkTPS3PCaZkqoXJoaXtPMCSKfhYXXNH2CAEh9w2uWAJFDY2O8yJo+QT6kvjFeZM0IkQ9pcrzImj5BjqS+MV5g5qYEkT/8EGk8z5reQ07yfWM8zxgHD5GwGS8wN3jIBX5wxgtsC5C6da3xgrh1kKu6LfICaztIvWbHC6yZIDeaGuMFboZUKfWRxrPiFiB3CFvkWcbYJ0ht/GA8z5oJcrepMZ5ng4fUJKzG8+ISIA8JS+R5tgZILcLKC9oZ8gVzywvWAKlBWI1nxcFDvsgPkeeYrQGyd2EznmPNCHmKsTGeY1uA7JnfjOfY2kGepluN59jmIXvlF54VFw95Kr9EnrV4yB75xXhOHBLk6dIQeY4tHrI3aeA55ibIN5mc8ZwhQfYkDcYzrB0h32hsjWfYkCB7kXqetQbINwsrz+oTZBf6yDPi4iE/wC+RZ8Qe8v5Gx9PM9ZAf0zue4UbIewstjSfFCfKjpsgz2gB5X2nhGbGH/Lg+8owlQd7UxDNiD/kVfeQZE+QdjY6nxQHya4bIk8yNkHcTWp5mQ4L8ojQYT2sD5J2khafZkiC/LC3G05YEeRtT5Em2JMgLSIvxpDhB3kPneNrmIS/CbzzNdZDX51fjSZuHvBC/8SRbPeTF9caT2gB5MaHlCWbWQ15Z53iSGyEvaHQ8yXWQV5UG4ylxgryoKfIUGxLkJY2RJy0J8rLSwpPiCHk9aeMp1gbISwut8ZQtQV7MHHmKGyEvb3Q8Jc6QV+JbnhJ7yFvoI09pPeRlTMZTtgR5E2njKTZBXkNoeIK1AfJGQms8oQmQF9DzFDdD3szseEoP+W2d4ykD5A0NPMFcB/lVg/GEJkDeUmh4gg2Q3xMcT4gT5G1NkZ8YXYD8ksn4mbUe8sZ8a/zMJshv8C1PiDPkzc2RJ7Qe8uPGyM9sS5C3lzbjZ3GE/Ky08AQ3QnZhdDxhSZAfFBw/swGyG4PxMxcgP2YyftZ0kB3pGn5iNkF+hm/5mfWQnemNn7Ue8gPGyE+s9ZDd8a3xmMUR8t3SYvxsguzSxM9sSZBv1Tl+1gTIToWGn5jrIN+o52c2QHZsMH42Qb5LWvlZ7CC71kV+tibItwiOn9iaIDuXVuMnLkC+wcgTZkgF5sjPRsjTDcZPGg+pQmj4iQ2Q50otPxsg1Rj4WZsgT9RFfuI6SEU6x09iB3ma2XjMNkhd0mY8ZjPkSRZ+EmdIdebITxbIM/iGnzQeUiHf8Jg1HvJlXeQxGyCVGozHYgf5op6fjZBqjZGf9JCvSCs/cQFSseD4yZogD/OOx2yFVG41HnMe8qAu8pj1kOr1xmOxgzxk5Cexgwi6yE9GyAMm47HGQwSAb3jMJsjdFh6zBSL/sxiPLZD7pJXHbIbIh9l4bE2QO/iGx1wHkULneMQaD7lZiDzWJogcSC2PWAyQG3U8ZgNEPhmMxzrITWYeiyNEThgjj82QG/Q8FgNETkkh8pBZD7lq4zHnIXKGdzxiG+Sy1PBYC5ELWh5rEuQC73jEFohctBiPOA85K0Qe6yFyRc8jFgPkjBB5xGaIXDUbj8QAOakzHokdRG7QRR4y6yAndDzmAkRuEhyPdZBPRuORJkHkRqnhERshR2YeWyFyh5XHZsiB2XjIBojcZTAeshlSmIyHbILInSbjIZsgH3oeiSNE7jZGHukh/9PzSOwg8oAu8kgP+c/AIzFA5CEh8pANEAALj8QAkQeFyCMLBBuPOA+Rh3nHIxuqt/KISxD5guR4ZEXlWh6yJkHkS1LDIy2qtvJIkyDyRanhkRUV23ikhcgTtDyyoVoLj7QQeYqWRxZUauCRFSJPsvKQDahSzyMbRJ5m45EeFep5yBaIPNFiLBl7VGfiIRsg8lSD8dCEyszGQz1EnqznIZtRldl4wHqIPF1vPGAzKjLykA0Q+QaD8dCIanTGQwtEvsXCQ9ahEh2PbBD5JhuPdKhCMB5aIfJtVh6ygAqEyEMtRL5Ry0MWsHs+8lALkW/V8lD02LnkeKiByDdreMBcwr41PNQkiHyz1PBQg13beMgliHy75Hhow471POQSRH5AcjzUY7dmHrDoIfIjfGTJOGOnOh6KAXKrFLpxnvrhj34auwC5S4g81GGXAg/FALlBGPtldUYzY6FZ5gC5XYg8FLBDPvJA7CBXhHloI89rpwC5VRd5IHrsTmp4wEbIJWHaHK+ydU6Q24zGA03C3qw8YBPkvK5veCvXB8hNJmPJVuzMwkMD5Jyub3gXWwLkFgMPLdiViYdWyGlpbnk/GzzkBisPTdiR0XiggZwUhsiHmJsgN2h4wEbsRsdDLkFOGFd+wRogVyXHQx12wkceiAHySZobfonFGXJViCxZ9NiF5HjAOsgx3zt+3ZAg13TGAy5hD1YemiFHfB/5FG2AXDPz0Iod6HnAesihMEQ+i+sg1/TGAz3eXsdDC+SAHyKfyGbINQsPdXhzPvJACzkwOT5ZD7mm5YHo8d4aHnCQUlj5fEuCXOF4oMFbW3ggekhhdPwOq4dc5iMPLHhjMw/EACn0xu/ReshlIbJkM95WZyzZCMn8ym/TBMhls7FkHd5UijwwQLLQ8hs1AXLZwJLFhPfU8kALyYLjt2oC5LKWB1q8pYElcwnyoXP8Zk2AXJQcDwx4Q6OxZB3kwxj57RqPW/hunP4Yu4DKdMaSjXg7gYdmyIcx8ge0CZelsV8dM7f1I2oy81DAm0mOBxbIhy7yR6wJ54VpNRqPuWFEPRYecAnvZeWBBvKXH/st8ocMOCPNq/Gcdk6oRcMDK95KzwPRQwB0fcsfNeGUNDW8wMxNqISPPNDjjXQ8YB0E4+D44yZ8EvrIq9oOdeiMBzq8jeRYsh7VC1PDX9HjUOojb7IkVKE3llzCu1h4YEXtuo2/ZkkozI63ajpUYWXJFryJ0VhyqNy48je1Af90Le8xoQqOJRvxFnxkKQZUbWz5u8zN+E8aeKfVowIhsmDR4x20PDCiZt3KX2ccPICu4d1chwqMPNDiDfQ8MKBifuBrcJMfjA+IMyow8ECPlxeMpQYVmxzfnk2oQMOSBby45Fiw6FGt0HIPbEjYPR9ZcgmvbWHJZlRrjtyJLWH3ZmNpwUsbeWBDrfzC/VgTdm/jgREvzEeWHGrVNdyTNWH3HEvR43W1PNChUj2Nu7Im7F3HAy1e1sQDA+qUFu7OmrB3Aw9MeFHBWGpQp9Byh9aEvWtYsoDX5FiKHlUKDXdpwd75yJLDS1pYshlV6hx3asDezcaCDXhBnbG0okpj5G5N2LuVJevwehwLFhNqNEbultmMnUuRJYeX07NkHWo0Ru6Zjdi5zljq8WICDwyo0Ri5by5g5wYeCHgtDUsNatRF7l2bsHMNSw1eysQDARUKjntntmHnAg9MeCHeWLAJFfINa9Bj5yZjwTxeR8tSiwqllnWYsXMtC9biZcwsmUeFFlbCBeybN5ZmvIgUWepRoZ7VaBP2rWcpJryGjaUGFZpZkQE717C04SWMLFmH+nSRNZmxb52xNOIFpMjSgPp4x6rEgH0bWHIJv29gyaFCKyvTJuybY8EG/LrOWLAR9elZnR77NhoL1uG3OZY21Gc0Vsc67NvGgjn8sp6lmFCd4FihJmHXUmSpx68KxoLNqM/KKg3Yt9lYMI/ftLLUoj49KzVi31qWVvyizliIHtXpWKvGY9d8ZGbW4fc4liZUJzWs1oJ9m1hy+DUTSw3qM7BiM/atYWnCL0mRpYDqjKyZ89i1wFJM+B0LSwOqkxpWzGzDvg0sLfgVgSWH+gys3Ix9cywF/IaWBZtRnc5YN3MeuzYbCy1+wchSi+qklrWzDfvWsjTi5zmWAqrTUzhj1wJLDj9uYmlDdUKk0Hns2sbShB+WWLCYUJ2NQnLBrqXIUsLPWljqUZ2R8p8Ru9aztOBHBZYcqpMayh/WJOyaYyngJ7Us2IjqTJS/bMCujcZCix80stSiOt5R/sc67FrL0oif41gKqM5A+dAk7FlgyeHH9CwtqE4wStZj1xaWevyQFFmICdXZKAXrsGcpshATfkbPgk2oTkc50Cbs2cSC9fgRiSWH+qyUQz12zbGU8BMGlkZUZ6QciR32bGRpwA9IxkKL+rSUY23CnrUsWML3G1iwgOrMlM967FkwZjbg23mWNtSnpXxmHfZsY8njuy0seVRnppzSJOyYZ2nBN/PGwob6NJSTFuzZxoJ5fK+FJY/qzJQzZuyYZ2nBt/IsLahPQzkjdtixhSWP77SxlFCdmXKONR77lVja8I0CSwvq01DOsjVhvxaWAr7PxoIlVGemXLIm7FYyFjZ8m2AsDKhPQ7loTditgQUL+C4rM4sJ1ZkpVzQd9ipFFlZ8k2AsDKhPQ7lq8NipgQUL+B4rCxH1mSk3iBN2KjKzFd8isNSjOqmh3GTz2KWepYDvsLIQUZ+JcqPGY5ciCyu+gTcWelQnOcqtNuxSz4J5PN/CzCLq01NuF7BLkYUFT5dYmlCdECm367BLEwsx4dl6ZuZQn41yuxY75Vjo8WyRhR7VmSm3az12qmch4slmZhZRHe8ot2qmhN2KLMx4LsfCgupslFtN2LOFBYen6ljyqM1EudmKPfMsdXimloUVtZmNcrsZe7ay0OKJgjGzgMqMlHtEjx0LxswCnmdjoUVlJmOpbSmXLdizloUNT+ONmY2oS2j5T1yH2WOlXDFix0ZjZh7PMrDgUJ1unvp+mseAPwLlmiZhxxwLA54kRRYmVK6nXGMTdmxiISY8x8RCRO0aylXRY8ciCxOewzGzHpXrKDcYsGM9M3N4ipmFmFC5gXKLgP1KkYUZz9CwsKByyVFuMWDHFhYaPEEwZuZRuZFykxiwX96YWcDXLSysqN1Cuc2AHVtZWPBliQXrULnkKLdxCfvVGQsJXzWz0KB2I+U2ZjN2rGFhxlc1LIyo3UC5VYsdG1lo8EWBhYjqOcrNOuxYZCHgaxYWBtSuo9yux44NLCz4msiCR+0Gys2swY55FiK+ZGahRfUayh067FjLwoyvaFmYUbtAuUePHZtZaPEF3phFVG+i3KPFnkVm5vG4gYUF1Vsp9zCPHVtYGPC4yMwCapci5S4jdiwYs4iHjSw0qN5IuYv12LOGhRGPalmYUL2ecp8Vezax0OJB3phFSEu5T0zYs8jMPB7Ts7Chet4odwrYs42FHo+JzCygeiPlXiP2LBiziIeMLDSQgXKvCbvWsDDiESsLE6Sl3GvArk0srHhAMmYR4o1yrw37FplZwv1mFjbISLlbi33bmNmM+7XMrIP0lLs12LfOmLW4mzdmDoKVci+L2DnHzDzuNbEwQBLlAQn7NrAw4V4NM/OQkfIAj33zxg/W4E6ehQaCnvIAj51rWPC4T8/Megg2ygM8dq5nZj3u45iZhyBSHuCxc96YOdwlsNBA0FEe4bF3DQsB9xhY6CGYKI9I2LuehQH3cMwsQbBRHhCxe8mYOdwhsNBAAEd5QIP9a1gIuF3PQg9BR3lEi/3rmVmP2zkWEgQT5REr9i+x4HAzb8waCLBSHrGgAg0z87hVz8IEQYqUR/SowMRCj1s1zCxBMFIeMqECyfjBGtzIG7MGAgyUh8yoQcPMPG7TszBBkBzlIR1qMLHQ4zYtCwmCkfKYgBokFlrcJLHQQoCB8piEKrQsJNxiZmGCIDnKQyLqMLEw4xYbCwmCkfKYBnVILGy4RWTWQICN8pgVlWiYRdygY2Y9BD5SHrOhEj0LHa4bWPAQzJQHDahEYGHAdY6ZgwAr5UE9auGYOVzlWVgg8JRHTajFwoLHNRMLIwQT5VEzajGyMOGallmEACvlUSOqEZm1uIaFFgJvlEd1qEbLAq7oWJggmCkPC6jGxEKHywZmliBYKA/zqEYyZgMua5g5CFKkPCyhHo5Zg4sSCwsEI+VhERVZWEi4ZGRhhKCnPMyhIiMLIy7ZmEUI0FIe1qAmkdmGSxyzBoJklIetqEnDzOECz0IPQUd53Iqa9Cx4nDcxswDBTHncgpoEYzbhvJVZhAA95XELqhKZrTgvMlshQE953ICqrMwizvIsTBBgojyuR1UmFjzOmVnwEMBHshkayiMmVMWzMOOcjVmE/OHnDpgpD7AZdYn8YBvOccxWyIdAecSMuqzMHM7wxg82QT54yiNG1GViZh6nzczMQzLKIzrUJRizGactzCKkECkPCKhM5AdbcJpj1kIKkfKAhMq0zBxOSsashxQc5W7mUJuemSWcMjKzACk0lPu1qE0wZiNOGZhFSKmh3G9DdSKzAae0zFpIqaXcb0B1WmYtTon8YAOktFLuZjOqMzCLOCGwMEJKC+V+HaozshDw2cwC5MBAuZ9HfViY8dnCzEEOTJS7NaiQY7bgM8dshRwYKXcbUKGVmcMniYUeciBQ7jaiQj0LCcc6FgLkUKTcyTwqFFjocGxiFiFHVsqdVlQpMptwbGPWQI5MlPvYhCo1zDYcc8w2yJFAuVNAlTZmDseM2QQ51lDu0qJOEzPDkcBCgBwbKHfpUafAQsChiVmEfNJR7hJQqchswqGFmYN85ih3aFErx2zBoYbZBvlsoNxhQq02Zg0OsdBDPhspt7OAWvUs4EBgoYN85im3W1GtjoWA0swC5JSGcrMZ9WJhRmlg5iCnLJRbxYR6OX6wHqWVWQs5pafcakHFWmYrSo7ZADllptyqQ8UGZg4lYzZDThkpN2pQs5mZoRCYmYecMlJu1KNm3pgFZDOzCDmpo9zIo2qR2YysZ+YgJ42U22yom2PWI1uZtZCTRsptZtStZbYic8wGyEkz5RbmEuo2MHPIjNkMOamn3GRA5WZmhg+eBQ85qafcZETlPAse/4zMDHLaQrlJQu2M2Yh/JmYOctpGuUWL6jlmE/5ZmLWQ0wbKLRZUr2W24J+W2QY5baTcYkL1NmYt/nHMesgZDeUGI6rXM3P4h5mNkDNGynUxoXojC/gfz4KHnLNQrlogngWPvzpmBjkrGOWaEQJj1uGviZmDnLdRrtgggGM24a+BWQM5r6dc5jwEaJgN+GtltkHO6ykXxQ4CYGO24q+G2QA5b6NcNEP+GJg1+CsymyBndZSLesh/JmYRfxmzDnJWS7lkg/zVMTP8xzOzBDlnpFzipmFbt2H2qF4yZh5/dMwMclZLucT4l5tRPWPW4Y+ZWYSc4yk36lG7yGzGHz2zBnLOSLnViMo1zHr8sTBrIefMlFutqFzLbMEfKz/YAjlnpNzKPOq2MFvxR8Osh5wzUm42om49swZ/RGYz5JxAuZXNqNvMLOIPFjrIWZFyqwl161gAgMRCgpy1Um5kPeqWWEgAAguQ83rKrQZUjoUAoGMWIed1lFsNqFxk1gGYmTnIeSlSbjSgco7ZDGDiB2sgFyyUGw2oXMNsAjAwayEXjJQb9ahcy2wAsDBbIRekSLlNj8qtzBYAK7MFcslCuc2Eyi3MVgANsx5yyUi5zYjK9cwaAI7ZDLkkOcpNOlRuZuYARH6wEXLRQLlJQuVGZhEACx3koo5yC4fadSwAMGYecllDucGK2nlmBiRmBrliotxgQPWMWUJgAXJFoNxgQvVYCOiYRcg1LeW6EdWLzDqMzCLkmp5yXUD1IrMRMzMHuWakXBUhjtmMiVkDuSZFyjUtpGE2oWfWQq5qKNcskJZZj4EfbIVctVKusB6yMhuwMFshVy2UaybIymzBwmyDXDVQrhkhG7MFG7MFctVAuaaDLMw2rPxgA+SqhXKNhwzMVrTMBshVC+WKCMHArEXLrIdctVKuaCHombVomE2QqxrKFRsEE7MGjh9shlzlKFcMEMzMHByzGXJNolwzQTAzc4jMRsg1gXLNCMHIDxYRmXWQa0bKNR0EHbOIyKyDXDNRrrAEQccsIjLrINf0lCsaCNAxi2AhQK5ZKFdsECCwgMgsQK5pKVcMECAwi2AhQK5xlCtmCBBYgDHzkCsS5ZoOAnhmBmPmIVcEyjUeAnhmBhYS5IqRcoWDAEgswJglyBUz5YoNAiAxMxgzyDUT5YoB8gczAwuQa3rKFTPkDxZgzBLkioVyRQcBkJgZjFmCXLFSrkgQAImZwZh5yBUt5bIG8odnZjBmHnKFo1y2Qf7wzAzGLECuiJTLBsgfgZnBmAXIZYlyxQT5IzAzRGYd5DJPuWKE/NExi4jMOshlgXJFgPzR8YNFRGYd5LJAucwS5I+OWUTkB+sgl3WUi6yB/KdjFhGZjZDLOsplK+Q/I7MIx2yGXNZRLlsg/5mZOThmM+SyQLmsh/xnZubQ8INNkMsC5bIJ8p+JWYOWWQ+5LFEumyH/6Zm1aJkNkCuMclEH+c/ArMXKbIBc0VAu8pD/DMxWbPxgC+SKlXJJhPy1MNuwMNsgVwyUS1rIXxuzBQuzFXLFRLlkgPy1MlswMFshV3SUS2bIXyuzAT0/WAu5IkXKBR3kr5ZZj4lZA7lmoZzXQP6nYTZhZuYg18yU8wbI/zhmM0ZmEXJNipSzRsj/RGYjOmYRctVGOcMayD+RWYfAAuSqkXJOD/mHhYDEAuS6lnJaDJB/WEiAMfOQq2bKaQPkH8/MALDQQa5rKadED/mnYwFAZDZCrhspp/SQDyOzCMDxg82QGyyUT6xJkA8zMwegYdZDbuAd5ZMRkvXMGgArswVyi5FyxAZIYWG2AliYrZCbDJRDjYcUVmYLgIFZC7nNRinFDlJqmQ0AJmYN5Da+oRRmyIGG2QRg5gdzkBsFR/kwQA45ZjOAjlmE3KpzlP/ZEuRQZNYBCCxAbtZFyn/aBDnCQgCQWEiQm42UPxoPOZJYSABgzDrI7WajsPGQYx0zwx+R2Qy5w2ysXushn8zMIv5omPWQe4yRdbPVQz7rmTX4Y2W2QO7StazaliAnLMxW/LEwayH3SVPDevWQk1pmC/7omTWQu41D61zTsjpuhpzWMOvxx8wsQh7UsTZrgJwRmc34o2MB8iDPqsRthpzFQoc/PDNLkAc51mMZE+S8ZMw8/mPMOsiDVlbDQS7qmBn+iswmyIMGVmOAXDTxg0X81TAbIA+aWI0ZctHArMFfK7MN8qCO1fCQizZmK/4amDWQB3nWooFc1jAb8NfEzEEe1bASC+Qyx2zCXx0zgzxqYyVmyGXGrMNfngUPedDESnSQizwLHv/Dwgh50Mg6RMhlIwv4x/GD9ZAHedZhhVzWM3P4p2W2QR7VsAo95LKNWYt/Fn6wFvKohTWwEXJZy2zBPxMzB3nUxCoEyGWO2YR/RmYGeVTHCpiDXMHCiH88Cx7yoBRZgQ1ymWfB44Pxg82QR62swAS5bGZmyByzAfKonhXoIJcNzByylVkLedTI/bMEuaxltiLrmTnIoxL3r4Vc4Zj1yGZmEfKwlbvXQ66IzGZkgQUPeVTP3Rshl3kWAgrGbIY8quPemYdcNjMzlByzAfIwx51rIVcMzBxKK7MW8rCFOzdArmiZrSgNzBzkYTN3boRc4ZgNKM0sQB7mjbsWE+QKFmaUAgsd5GErd22DXNGx4HHAmPWQh03ctQlyRc/McKhhtkIe1nHXAuSKlVmDQwuzBvK4hjvWQK5pmC04NLEAeVzPHRsg17Aw4VBgIUAe1nHHRsgVgYWAI8Zsgjyu5W65BLliYmY45phtkMf13CsbINdszByObcwayOMCd2uEXNMw23BsYmaQL2i5Uy5BrjF+sAnHOhYC5HEzd2qAXBNY6HAssdBDHpcid8k6yDU9CwmfOGYr5AsG7pKDXLUyc/hsYeYgX9Bxl3rIVY7Zgs9mZgb5ipY7ZAFylTGb8VlgZiPkC2bu0Aa5amQh4ITIbIB8QWq4PyPkqoFZxCktswbyFRN3p4Fc1zBrccrALEK+IjnuzQS5LjIbcMrIzALkK3ruTPSQq4IxG3FKMmY95Ct85L4MkOt6ZpZwkmPWQr6k565YgFzXMnM4bWEWIV+SHPdkgdwgMltw2szMPORLZu6IBch13pjNOM0bsx7yNS33Y4DcoGdmHmc4Zivka0buRvSQG6z8YA7nbMwi5IsW7sUEuUVktuGcmQUP+RrvuA9NgtzAM7MZ53gWJsgXjdwF6yC3mFjwOCsyWyFfNXAPBshNVn6wiPNWZhHyVb7h+2sS5CaR2YrzJmYWIF8VHN9d7CA3CcZswnmehQHyZSPf3Qy5zcCCxwWOWQv5uplvzXrIjVp+MIdLFmYR8gQ939kAuRULCy4ZWRghTzDxfS2QW43MbMQliYUF8gwz31UPudnCQsJFDTMHeYox8h3FGXI7x6zBZQMzS5Cn2PiOFsjtkjEbcFnHwgR5io3vaILcbmKhwxUstJCnWPiORsjtWhZwTcssQp5i4DvykNtFZi2umVgYIc8w8A01kNuNLEy4xrOwQJ6h5xtaILfbWPC4yjFzkGeY+IYmyO0cM4frBhY85AkmvqERcjPPwoDrOhZ6yBPMfEMBcrOehQ43iMwayBPMfD8GuV3DLOIWGwsJ8nUj34+D3CyxsOEWMwsT5OtGvp8WcrOJhRm3SCy0kK/r+H5ayM1aFhJu0rKQIF/W8f20kFslFlrcZmJhgnxZ4PtpIbeaWJhwG2/MGsiXBb4dayC3apiZx40aFhLkqzzfT4TcKLHQ4FY9Cz3kqxLfUILcpmehx628MWsgX8Y3NM/j2AUPuaZhZh43cywkyFdFvh0jSSPdNifIBYkFh9v1LPSQLwhzv63Gd+Y6yHk9Cz1uF1hoII9K08q3Z3Qd5KyGhYA7OGaWII8ZHfehSZAzkjFzuMfAQg95hN+4Gz3kjJ6FAfcILDSQB/iW+xE95LSGhYC7OGbmIXdLLXfEeshJ3pg53KdnoYfcbeCuRA85pWehx308M2sg9+q4Mz3klIYFjzs1zMxD7rRxZ6KHfOaNWYN7TSwMkPsE4970kM8GZjbhXp4FB7lPz92JHvKJY8Hjbi0z6yB3Wbk7NkCOdcasxf1mFjbIPZJxhzrIkY2FGfdLxixC7tFxj1bIkcjMEh6wsjBB7jBzl2bIgYmFFY8YmVkDucPAXXIeUmpYGPGQyMwC5HYr92mAFIIxi3hMz8IGuVmK3CfrINnGQo/HeGMWITcbuVcbJIvMzONBLQsT5FYbd6uD/DOx0OJRIwsN5EbBuFsD5J+GhREPi8wsQG6zcLcsJshfwZhFPG5gYYHcZDTu2Aj5a2FhwOO8MYuQW3jHPVsgf0Vm5vEFLQsz5AYbdy0myB8zCy2+YmZmLeS6gTs3Qf5oWZjxJZEFD7lm4N7FDgJ4FiK+ZmFmA+SKhfvXeAgGFhZ8TWAhQi7yK2uwJkhkIeCLGmY2Qi7oHKtgA6o3stDgq2YWGshZaYqsxYTaNSzM+KrEgnWQM7qW1TCbUbfOWEj4soWFFXJS6o01iR2qtrKw4OuCMTMP+SzNjpVxARXzxswCnqBhYYF8MjasT5tQr4WFBs8wMrOYIIfGllXaUK0UmdmIp3AsDJDS3LJWPWo1sODwHBMzi5APfmpYLxtRqcjChOdIkYUJ8lc3RFYtBlRpYiEmPMnAgoMASHNLY+VWVMmxMOBZvDGzERJ6RyEnVGg0ZubxNBsLLSqX5o3yHxdQn5aFDc8TjJkF1KwbHOWfDdUJxswCnqhlYUW1/NRSSjNqs7LQ4pk6ljzqNC6RcigG1MWz1OGpHAsLKhT6hvLZmlCVhZk5PNfMQkRt0rgZ5aTVoyaRhRlPFlnoUZXQOxrlNHMj6tGzEPFsPQsRFekWo1zUTgGViCz0eLZkLEyoxbxSbuC2fvTYvYkFS3i6gYWIOswt5WbWTgH7FlkY8HzemFmPCowt5U7tlLBfPQvm8Q1WFiJ2b24pD3BTwl5FFlZ8h8CC9dg1PzWUBzUj9qlnKeBbrCxE7Ni4RMoXLB57FFlY8T2CsTBgp0LfUL6oGbE/AwsW8E1WFmLCDvl5pTyBDR47kyILK75LMGY2YG/SvEXKk8TeY1cGFizg22wsWMKepHGJlGeyIWA/krGw4fsEY2HBbqRxcJRnM9tG7MXCggV8o40FS9iFNA6ONMp3aKaEPUjGwobv5Fla8P7SuDjKd4pDwPtbWPL4VgsL5vHe0rhEyjcz2jbizXljYcH38sbChjfm5y1SfoRZM3m8s40F8/hmC0seb8pPG+UnWVw6vC3P0oLv5lna8I7CtBrl57VzwnvaWPL4dgNLAe+m61vSjPIb4hDwhgJLA75fMhZavJM0Do7yi4xc54R307JgCT9gYGnEu/DzEikvwPUBb2VkacBPSCw5vIUwrZSXYduY8D4cSwk/omdpwsvr+pbyUsxcH/AmJpZ6/IwUWYgJryyNg6O8pG1MeAMpshATfkjP0oKX5ect0iivyvUBL29hqcePcSwFvKSub2mUF7eNCS8tsGAOP2dkqcXLSePgKO/B9QEvrGVpxA9qWbARLyVMW6S8k21MeFGjsdDiJwWWHF5H17eU9+P6gJfkWAr4UQtLPV6CnxdHeVO2jQkvp2dpwc9KLMWEXxem1SjvzFwf8FpSZCnhh00sbfhVaRwayh6sc8IL2Via8OMcSwG/JkxbpOyGGwJeRWDJ4eeNLFiL3zH2DWVnbJ0TXkLL0ohf0LJgM36cn5dI2aU4dPh9s7HQ4jcElhx+Vte3NMo+Gcl28vhljqWAX7GwNODH+HlxlN2LS4ffNLC04HekyFLAj+j61iiVaCaP3xJYsJjwSyaWGnw7Py+OUpdlxO9oWJrwaxxLE75V17dGqVDTB/y8iSWH39MZC9Hju/h5cZRq2TYn/CwfWbAOv2hlqcV3SF3fGqVybujwk1oWbMVv8saCzXg2Py+OIn+0k8dPmY0F8/hVPUsx4YnS2Lc0o8h/IuMy4kekyFKPX+ZY2vAsYdoiRQ4Y2Uwe329jyeG3dcaCjXiCNA4NRU4ybmPC9xqNBevw6waWHL6qm9ZIkUtcH/CdHEsDfl+KLNiAL/Dz4ihyjZmtc8J3GViKCS9gZMk6PCZ1fWsUuY1ZHDp8i85YGvESNpYaPCBMW6TIPczYTB7P17C04TWkyFKPO3V9S5GH2DYmPFfPUkx4ETNL5nGHcWgo8gWu7/BE3lia8TJallrcqhscRb6snTyepWWpxevwxoJNuEXoG4o8R1xGPMVkLJjHC5l4IOCaNK8UeaamD/iywAMTXkrDgjW4LAyOIk+3zglf07DU4LUEHhhwwbgZRb5FHDp8wcADAS+mZ8GswzlzS5FvY2z6gAd1xoL1eDmOpZhw0thS5JvZNic8IEWWHF5PZ8yMK04YW4r8hDh0uNvKknV4QQNLNuNYWCjyM4xspoC7zMbSgJfkeMDjQJoiRX6SrXPCzXxkyeE1BWOpQSm0FPlxcehwo4YlC3hRE0s2IJsiRX6BWdMH3GDggQkvq+WBDv+TFor8nnX2uKLjgRavy0cWzOEv31LkFxnjMiZc4liKHi9s5IENf4SGIr/O9R3O2nhgxEtbWDCbAQRHkZfQTh4nzcbSgteWHEvRIziKvIo4BHzmI0su4cUFY6nxDUVeiC0BxxqWLODlTTzgKPJiloADAw9MeAMtRV5bnBKy0Vhq8Q58pMiLawP+CZGl6PEWRqPIi4sz/sexZCPexEKRlzck/LHywIJ3kRxFXt7qAfTGgrmEt9FR5PU1Hp3xQIc3MlHk5VkbIg9MeCsrRV5f5IEV7yU5irwZl/BmAkXeTMDbGY0ib8RGvKGNIm9kwFtqKPI2WrwnHynyJmLCmxop8h6sw9vqKfIWZryxlSJvYME7S44iL8/hvQWKvLyANzcbRV6azXh7C0Ve2oIdaCjywhrsQYoUeVUWE3ahixR5UbHDTowUeVEjdmOiyEuasCMDRV7QgF1ZKfJyVuxMQ5EX02BvkqPIS3EJuxMiRV5IDNihjiIvpMMuzUaRF2Ezdqo3irwE67FbG0VewoYdaynyAlrsWXIU+W3mEnbNR4r8suixc8Eo8qtih93rKPKrOlRgpMgvGlGFkSK/ZkQlZor8khnVmIwiv8AmVGQyivw4m1CV3ijyw6xHZQajyI+yAdVZKPKjFlRoo8gP2lCllSI/ZkWlVor8DFtRrZYiP6JFxRqK/IAGNUsNRb5dk1C11FDkmzUJtWsp8q1aCFaKfB9bIQBWinybFfKfjSLfZIP8z2IU+Qa2QD4MRpGnswFS6I0iT2Y95MBkFHkqmyBHJoo81QT5ZKbIE82QE0aKPM0IOWmkyJOMkDM6o8gTWAc5q4sU+bLYQS7wjiJf5DzkotRS5EvaBLlmM4o8zDbIDXqjyIOsh9xkpsiDZsiNukiRB8QOcrPgKHI3FyB3SA1F7tQkyH1WitxlhdxtoMgdBsgDJorcbII8ZKTIjUbIg7pIkRvEDvKw1FDkqiZBvmIxilxkC+SLZopcNEO+LDiKnOUC5AnSSpHTbE2Q5+gpclIPeZoxUuSTOEKeyDuKHHEe8lybUaRgG+TpJooUJsg36CJF/id2kG+RGor8p0mQ77IYRWgL5BuNkVK9OEK+VWqNUjVrE+S7TUapmE2QHxAcpVouQH7GYpQq2QL5MWOkVCiOkB+UVqNUxtYE+VkTpS5xgvy40FAq0gTIbxiMUgkbIL+ki5QqxA7ya9JqlN2zNUF+0xgpOxdHyC9LG2XXtgT5fZ2j7JbrIK9hMMou2QB5GaGh7FATIK+kp+xN7CEvxrdG2RFrPeT1zJGyG3GGvKS0GmUXbE2QVzVGyg7EEfLKFqO8OVsgL65rjPLGrOkgr2+OlLcVZ8h7GChvaoC8Db8a5e3Y6iHvpGsob6bpIO9mjpQ3EmfIOxqM8iZsgLwpvxrlDdjqIe+raygvz3WQ9zZFykuLE+TtpcUoL8uWBNmDtFFe1JYge+E3o7wc2zxkT/xKeTGrh+xNWCkvZA2QPfq/duAEN24YhgIoRdEiLcmyxPsfti1QFOiSJpmMx9t/iR0OghPBVUVWh90pR4Iri+ywM44EVxeDOuxGQyS4gxrUYRcaKsFdVFaHl1OuBHeSusOL9URwN9NqDi9j60RwS1kcXkIywX21oA4b09AI7i2yOmxIORJAGg6bGYkAfpiLOWzAykwAvyyiDk+lshDA72pXh6fRXgngb3MWdXgClTwTwBtiV4cv0h4J4L+yqMPDVPJMAO+KwxweYiMSwActQR0+ScNCAJ+Rhjl8go1EAJ/Wgjp8iIZGAI+Zc1CHd2jIMwF8QSqiDm9SKYkAviwOc/gnG5EAnqQOc/iDjUoATxWHqcNPaiMSwAbiKurgKmskgM2kVfzmZE0EsLE5s98W55kAXqMOU78ZtVEJ4KVSCX4joSQC2EMbon55KqMRwI6mhc0vzHiZCGB/sbD5BRmXSADHkTKb+mWocU4EcDwps6mfnhrnRADHNS0j+ImFsUwEcAIxs6ifjArnSABnMrfC4ichXNpMAOdUSxc/NOmlEsDpxTyCqR+MWhg5EsCVxGUE80OwMJZIAFeVWunBfCcWemmJAG4htTJYzF/EhEdpiQDuKNW89iDmmzAJfc01EQB8N8e2lMFBzFz9YepmEniUpcWZAOBNU6wtl3X0ziGIiJmaq7vrT+6ubmomIiEw97GW3GqcCA7oG9OI8b0UrBwEAAAAAElFTkSuQmCC\") no-repeat center center;width:40%;height:40%;background-size:contain;-ms-flex-line-pack:center;align-content:center;margin:auto;position:relative;top:25%}.awcore-call-me-control-container{display:-ms-flexbox;display:flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.awcore-call-me-div{height:56px;border-radius:4px;border:none;background-color:#25abfd;font-size:14px;font-weight:bold;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);padding:0 16px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-width:150px}.awcore-call-me-div:hover{background-color:#acd7f2}.awcore-call-me-div:hover:not(.awcore-disabled){cursor:pointer}.awcore-call-me-div .not-calling,.awcore-call-me-div .not-calling-problems{display:block}.awcore-call-me-div .not-calling-problems{font-weight:lighter}.awcore-call-me-div .calling{display:none;text-align:center}.awcore-call-me-div.awcore-call-me-disabled{-webkit-box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.5);box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.5);background-color:#acd7f2}.awcore-call-me-div.awcore-call-me-active .not-calling,.awcore-call-me-div.awcore-call-me-active .not-calling-problems{display:none}.awcore-call-me-div.awcore-call-me-active .calling{display:block}.awcore-spinner-active .awcore-call-me-div,.awcore-requesting-browser-permission .awcore-call-me-div{display:none}.awcore-disabled{background-color:#4a5764 !important;border:1px solid #4a5764 !important}.wcag .awcore-disabled{background-color:#5b6b7b !important}#awcore-callMeDiv.awcore-call-me-disabled{cursor:not-allowed !important;background-color:transparent !important;border-width:0px !important}.awcore-self-container .awcore-local-view{-webkit-filter:blur(0);filter:blur(0);opacity:1;-webkit-transition:opacity .5s, -webkit-filter .33s;transition:opacity .5s, -webkit-filter .33s;transition:filter .33s, opacity .5s;transition:filter .33s, opacity .5s, -webkit-filter .33s}.awcore-self-container:hover .awcore-local-view{-webkit-filter:blur(10px);filter:blur(10px);opacity:0.8;-webkit-transition:opacity .5s, -webkit-filter .33s;transition:opacity .5s, -webkit-filter .33s;transition:filter .33s, opacity .5s;transition:filter .33s, opacity .5s, -webkit-filter .33s}.awcore-hide-self-video.awcore-show-self{display:inline;background-color:#4a5764;border:2px solid #4a5764;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAndJREFUWAntlbtLXEEUh11X8EHEykYEbdZAEEEljakWCeIDXCSxVv+KYG9hYZUiVSCx8D8IVmGbdCFNfIBauNuIiwgmAQtfN9/vOkfm7r3h6kLE4h74ODNnzsyce+bM3KamTLIMZBl4ihkIguALfIPu/x1fyz826ML+CsoEUczlcifyoz2ImoZx6IMekBxBFb7CJv4/0Y2Lvhy2QSLdr9XQs3ABafIdh3nINxwFkxXEAUjOYcAFUaRdgj7ogGdQANk+QA1MftAYbSgIJi7Dpa2EPoTUmsCnFZagApIrWL53EDi3wEeQ3MB72FUH0XGEQaD11VU4gg3o9Tehr+ysgtaQyCf9SHCyzc9oz7i0+zWxh92Ow6+JU+yRINzcCey/QLLuBxlr47AQut1OeOk7YPeDUE0U3AbPaZdBsuHPsTb2YdAHSZbMHtMMboUuQTAXG8TAmIKwuthXX35oBaHboeuYKIwpW5ID36HZ79Buc/2rOnvYde/BqRtTBsos2I19j/ZbuHRjSSrnjIlrh2MspuqVKF3DSatgVzFJft+qQJmw4wh1/TzGR8DqYLF+PNLHcR0kCmIiMkgHWy+o4Hy5eycS/CdxtM0/14/H+jjrGtpX6grpKnX4jvQVhHyOwWpCtyOsCfnSboc1uAbJJ0i/hrYRznqI9IhIKqDjabVx09j82+G/E68ZU2GKd2A1YFPTNZNGQc+pSY2GntsS6CHSM9wJY6BHSfIH7J2Yot3YU2zhsUAe5kE/mPuKauTuOGytJP2gtLDoEItMgv87vqZfgSpswxtQBnag6K4uzUcSfTnYr3zlkbaNbuOCWEG/iI5kvSwDWQbiGfgLQOBLBDb81hwAAAAASUVORK5CYII=\") !important;cursor:pointer}.awcore-hide-self-video:active{border:solid 2px #ffc33e !important}.awcore-hide-self-video-container{position:absolute;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.awcore-hide-self-video{background:#25abfd url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWVJREFUWAntlUFKw1AURRsrCMUVSMGRU6F0CQ6KE3XkArqMrkBX4LyDLkFHXYE4cdqJTgoOBJ2L8Zzyf0iCba21RDQXLnl5/76Xl5ufpNGoUTtQO/DfHUhWMSBN00P0x/AI7sM9KKbwEY7hTZIk9xx/Bly0Cc/hLfwq1FrTXGsKGnThHYx4IriCZ/AA7gYam3NNTYS13W8NQeEAvoVODxz7cGdZMzVBa42wx2BZXbaOWMtHULzDC9jKBASct6GaaaBxu6RpkbuE9hBqlj8SREPV4AX28k2NyXnxZ1iGucIQQd8jby8xLPcrnCPQZmFBp7AYTsh7J+IaOow0FqM5NR3W4hD9zzSzHKKJXcDJPBFr2i6yuzWeZVhbUHcaNJO8Zit/UnnMhNU+Ah1giE1swtdg/+JNGAbYRhw32rqvoa/waq9h3AcUVvMhigMEN6r7FMdBcGKjP6Pf/zuOTtTH2oHagT/rwAd97fRlZeeYawAAAABJRU5ErkJggg==\") center center no-repeat;border:2px solid #25abfd;height:60px;width:60px;border-radius:50%;pointer-events:auto;text-align:center;cursor:pointer;margin-top:-25px;z-index:5;display:none}.awcore-self-container.loaded:hover .awcore-hide-self-video{display:inline !important}.awcore-remote-video-0:-webkit-full-screen{width:100%;height:100%}.awcore-settings-content-wrapper{background-color:#FFF;border:none;color:#000000;padding:15px 15px 0;position:absolute;width:-webkit-max-content;width:-moz-max-content;width:max-content;bottom:135px;z-index:10;text-align:left}[dir=\'rtl\'] .awcore-settings-content-wrapper{text-align:right}.awcore-settings-content-wrapper h2{font-size:20px;font-weight:600}.awcore-settings-content-wrapper h3{font-size:14px;font-weight:400;margin-bottom:20px}.awcore-settings-device-separator{border:solid 1px #dddddd;margin:0}.awcore-settings-content-header-title{height:18px;font-size:12px;font-weight:600;line-height:1.5;color:#99a0a7;margin-bottom:10px;padding-left:5px;margin-top:0px;text-align:left}.awcore-settings-content-div{position:relative;margin-bottom:25px}.awcore-settings-content-div:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2212%22 height%3D%227%22 viewBox%3D%220 0 12 7%22%3E    %3Cpath fill%3D%22%23959DA6%22 fill-rule%3D%22evenodd%22 d%3D%22M11.027.67a.353.353 0 0 1 0 .513l-5.201 5.2a.353.353 0 0 1-.513 0l-5.201-5.2a.353.353 0 0 1 0-.513L.67.112a.353.353 0 0 1 .513 0l4.386 4.386L9.955.112a.353.353 0 0 1 .514 0l.558.558z%22%2F%3E%3C%2Fsvg%3E\");right:11px;top:15px;padding:10px 0 0 8px;position:absolute;pointer-events:none}[dir=\'rtl\'] .awcore-settings-content-div:after{right:unset;left:11px}.awcore-settings-content-div::-ms-expand{display:none}.awcore-settings-content-div select{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:100%;height:35px;font-size:16px;line-height:1.75;border-top:0;border-right:0;border-left:0;-ms-word-break:normal;word-break:normal;padding:0 35px 0 10px}[dir=\'rtl\'] .awcore-settings-content-div select{padding:0 10px 0 35px}.awcore-settings-content-div label{margin:0;vertical-align:bottom;padding:0 0 0 10px}[dir=\'rtl\'] .awcore-settings-content-div label{padding:0 10px 0 0}.awcore-modal-container{position:absolute;top:0;width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background:rgba(0,0,0,0.5);z-index:1000}.awcore-modal{background:white;border-radius:5px;color:black;overflow:hidden}.awcore-modal-footer{padding:0 50px 50px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.awcore-modal-header{background:-webkit-gradient(linear, left top, right top, from(#25abfd), to(#0b77cb));background:linear-gradient(to right, #25abfd, #0b77cb);height:77px;color:#fff;font-size:24px;text-shadow:0 1px 1px rgba(0,0,0,0.4);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:0 25px}.awcore-modal-body{padding:50px}.awcore-modal button{min-width:131px;margin:0 10px;height:44px;border-radius:4px;border:none;background-color:#0b77cb;font-size:20px;font-weight:bold;text-align:center;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);cursor:pointer}.awcore-modal button.awcore-green-btn{background-color:#66d448}.awcore-modal button.awcore-green-btn:hover{background-color:#5bc23e}.awcore-modal button:hover{background-color:#25abfd}.awcore-modalClose{background:url(data:image/png;base64,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) no-repeat center;background-size:cover;width:44px;height:44px}.awcore-modalClose:hover{opacity:.5;cursor:pointer}[dir=\'rtl\'] .awcore-modalClose{left:8px;right:unset}.awcore-browser-permissions{z-index:10}.awcore-browser-permissions p+p{margin-top:20px}.awcore-browser-permissions .awcore-modal{text-align:center;width:600px}.awcore-browser-permissions .awcore-modal h1{font-size:36px;color:#5b6b7b;font-weight:300;margin-bottom:.58em}.awcore-browser-permissions .awcore-modal p{margin-bottom:0;font:inherit;color:#313336}.awcore-browser-permissions .awcore-error-icon{margin-bottom:30px}.awcore-browser-permissions .awcore-wide-button{margin-top:36px;min-width:160px}.awcore-cancel-text{text-decoration:underline;font-size:14px;color:rgba(255,255,255,0.75);cursor:pointer}.awcore-cancel-sub-text{font-size:12px}.awcore-dialog-icon{width:72px;height:72px;display:inline-block;background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2272%22 height%3D%2273%22 viewBox%3D%220 0 72 73%22%3E    %3Cg fill%3D%22%2325ABFD%22 fill-rule%3D%22nonzero%22%3E        %3Cpath d%3D%22M36 72.5c19.882 0 36-16.118 36-36S55.882.5 36 .5 0 16.618 0 36.5s16.118 36 36 36zm0-2c-18.778 0-34-15.222-34-34s15.222-34 34-34 34 15.222 34 34-15.222 34-34 34z%22%2F%3E        %3Cpath d%3D%22M20 26a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-6.5 2h45v2h-45v-2zM25 26a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z%22%2F%3E        %3Cpath d%3D%22M59 44.495h-2V23a2 2 0 0 0-2-2H17a2 2 0 0 0-2 2v27a2 2 0 0 0 2 2h22v2H17a4 4 0 0 1-4-4V23a4 4 0 0 1 4-4h38a4 4 0 0 1 4 4v21.495z%22%2F%3E        %3Cpath d%3D%22M43.02 36.2v19.268c0 1.356.49 1.384 1.298.577 1.673-1.385 4.413-3.606 4.413-3.606s2.019 4.587 2.942 6.692c.375.865.836 1.039 1.413.721.433-.173.952-.375 1.356-.548.606-.173.663-.634.375-1.327-.894-2.105-2.971-6.547-2.971-6.547h6.115c1.24 0 1.327-.375.49-1.212-3-3.115-10.845-11.22-14.047-14.508-1.096-1.068-1.384-.952-1.384.49z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat}.awcore-modal-container.awcore-modal-container-flat .awcore-modal{border-radius:10px}.awcore-modal-container.awcore-modal-container-flat .awcore-modal-footer{padding:15px 50px 15px 50px;height:120px;background-color:#f9f9f9;color:#313336;font-size:14px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-direction:column;flex-direction:column}.awcore-button.awcore-button-inverted{color:#1774cc;border:1px solid #1774cc;padding:2px 30px;font-weight:bold;border-radius:4px;background-color:transparent;cursor:pointer}.awcore-button.awcore-button-inverted.awcore-disabled{background-color:transparent !important;border:1px solid #1774cc !important;opacity:.3;cursor:not-allowed;pointer-events:none;-webkit-transition-duration:.8s;transition-duration:.8s}/*!\n * American Well Core Web SDK\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-spinner-container{width:100%;height:100%;text-align:center;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);-webkit-transition:top .5s;transition:top .5s;max-width:550px;height:200px;text-align:center;position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);transition:top .5s}.awcore-spinner-container.awcore-call-active{display:none !important}.awcore-spinner-container .awcore-wait-image-box{width:120px;height:120px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-left:auto;margin-right:auto;-webkit-transition:opacity 1s;transition:opacity 1s}.awcore-spinner-container .awcore-wait-image-box .awcore-loader{padding:0px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex-flow:row wrap;flex-flow:row wrap;margin-bottom:100px;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s, -webkit-transform .3s}\@media screen and (max-width: 768px){.awcore-spinner-container .awcore-wait-image-box .awcore-loader{margin:0 0 0 0}}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner{position:relative;text-align:center;margin:0 auto;padding:0;width:200px;height:200px}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner:before{content:\'\';display:block;padding-top:100%}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner .awcore-loading-icon{position:absolute;top:76px;left:66px;width:70px;height:auto;stroke-width:1.5px}\@media only screen and (max-width: 768px){.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner{width:72px;height:72px}}.awcore-loading-icon-static-camera,.awcore-loading-icon-static-waves,.awcore-loading-icon-static-nodes{position:absolute;top:66px;left:66px;width:72px;height:auto;display:none}\@media only screen and (max-width: 768px){.awcore-loading-icon-static-camera,.awcore-loading-icon-static-waves,.awcore-loading-icon-static-nodes{top:24px;left:24px;width:24px}}.awcore-spinner-style-waves .awcore-loading-icon-static-waves{display:initial}.awcore-spinner-style-waves .awcore-circle-svg{stroke:#9485ED}.awcore-spinner-style-nodes .awcore-loading-icon-static-nodes{display:initial}.awcore-spinner-style-nodes .awcore-circle-svg{stroke:#FCD54E}.awcore-spinner-style-camera .awcore-loading-icon-static-camera{display:initial}.awcore-spinner-style-camera .awcore-circle-svg{stroke:#25ABFD}.awcore-circle-svg{-webkit-animation:loading-spinner-rotate 2s linear infinite;animation:loading-spinner-rotate 2s linear infinite;-webkit-transform-origin:center center;transform-origin:center center;position:absolute;top:0;bottom:0;left:0;right:0}.awcore-circle-stroke-static{stroke-dasharray:1, 200;stroke-dashoffset:0;-webkit-animation:loading-spinner-dash 1.75s ease-in-out infinite;animation:loading-spinner-dash 1.75s ease-in-out infinite;stroke-linecap:round;stroke-width:1.5px}.awcore-spinner-button{min-width:131px;height:44px;border-radius:3px;border:none;background-color:#25abfd;font-size:20px;font-weight:bold;text-align:center;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);padding:0 10px;margin:0 8px}.awcore-spinner-button:hover{background-color:#13a3fc;cursor:pointer}\@media screen and (max-width: 768px){.awcore-spinner-button{width:148px;height:34px;font-size:16px}}\@media screen and (max-width: 420px){.awcore-spinner-button{width:100%}}.awcore-spinner-button.awcore-disabled{pointer-events:none;background-color:#25abfd !important;border:none !important;cursor:not-allowed;opacity:.5;-webkit-transition-duration:.8s;transition-duration:.8s}.awcore-spinner-buttons-div{padding:25px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.awcore-spinner-buttons-div .awcore-spinner-button{display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.awcore-spinner-buttons-div div:first-child{margin-bottom:16px}.awcore-cancel-waiting-button-div{padding-top:40px}.awcore-cancel-waiting-button-div.awcore-spinner-ext{padding-top:15px}\@media only screen and (max-width: 768px){.awcore-cancel-waiting-button-div.awcore-spinner-ext{padding-top:5px}}.awcore-cancel-waiting-button{width:155px;height:34px;font-size:16px;font-weight:bold;font-style:normal;font-stretch:normal;line-height:normal;letter-spacing:normal;text-align:center;background:inherit;border-radius:3px;border:solid 1px #979797;color:rgba(255,255,255,0.9);background-color:#25abfd}.awcore-cancel-waiting-button:hover{background-color:grey}.awcore-permission-ivr-wrapper .awcore-spinner-button{display:inline-block;padding:8px 16px}\@media only screen and (max-height: 525px){.awcore-spinner-container .awcore-wait-image-box .awcore-loader{margin-bottom:22px}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner{-webkit-transform:scale(0.66);transform:scale(0.66)}}\@media only screen and (max-height: 420px){.awcore-spinner-container .awcore-wait-image-box{opacity:0;-webkit-transition:opacity 1s;transition:opacity 1s}}\@-webkit-keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@-webkit-keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}\@keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}.awcore-hidden{display:none !important}.awcore-invisible{visibility:hidden !important}.awcore-phone-only-mode .awcore-spinner-container,.awcore-phone-only-mode .awcore-self-container,.awcore-phone-only-mode .awcore-remotevideo-default,.awcore-phone-only-mode .awcore-video-controls-container{display:none}.awcore-phone-only-mode .awcore-phone-only-container{max-width:550px;height:200px;text-align:center;position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);-webkit-transition:top .5s;transition:top .5s;color:#fff}.awcore-phone-only-mode .awcore-phone-only-container .awcore-icon-calling{background-image:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22128%22 height%3D%22128%22 viewBox%3D%220 0 128 128%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%23BBB%22 stroke-width%3D%223%22 transform%3D%22translate(1.5 1.5)%22%3E        %3Cpath d%3D%22M34.698 32.888c2.56-2.56 10.301-2.99 10.358-1.634.06 1.355 6.974 16.375 7.033 17.73.06 1.356-4.56 5.97-5.908 7.324-1.34 1.337 9.033 13.063 9.23 13.28.221.196 11.944 10.571 13.284 9.232 1.348-1.349 5.965-5.966 7.318-5.911 1.356.062 16.38 6.976 17.732 7.035 1.356.06.928 7.794-1.634 10.36-2.19 2.189-13.529 10.136-33.247-4.058C56.7 85 53.276 82.15 48.083 76.959a.043.043 0 0 1-.01-.011c-.004 0-.006-.007-.011-.01l-.014-.01-.009-.012c-5.188-5.189-8.04-8.617-9.284-10.777-14.196-19.722-6.247-31.063-4.057-33.25%22%2F%3E        %3Cpath stroke-linecap%3D%22round%22 d%3D%22M65.41 31.96c7.114-.146 14.274 2.621 19.703 8.3 5.118 5.354 7.763 12.316 7.932 19.33M65.41 42.136c4.79.197 9.525 2.196 13.183 5.998 3.463 3.6 5.37 8.205 5.725 12.911M65.41 50.864c2.155.312 4.235 1.343 5.892 3.095a11.08 11.08 0 0 1 2.834 5.632%22%2F%3E        %3Ccircle cx%3D%2262.5%22 cy%3D%2262.5%22 r%3D%2262.5%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\");width:128px;height:128px;margin:0 auto}.awcore-phone-only-mode .awcore-phone-only-container .awcore-calling-heading{margin-top:25px;font-size:20px;font-weight:600}.awcore-phone-only-mode .awcore-phone-only-container .awcore-calling-subtext{font-size:16px;font-weight:normal;font-stretch:normal;margin-top:15px}\n\n.awcore-screenshare-button{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQRJREFUWAntVlEOgjAMBWO4g1eSO3gUvzmQ8UhwjPmqa0ImtIO14seaLAPavb29rg1NU+1oBUIIHcaAMWJYGuERbieeMQZZbpxiDRoBPvlVDNzoBIs+MhnFpUxXDNrpzME+78TOXfZEYBCDc1iKAIXOU+H64uUiAajjX6JSCuCjOva0oSV00rGFpXrCRSV0Sb8bvk8aAfkGGzAR74ABvgqR1QeW0qMiKwGc+sMVqARIgYnShZz0Stp83Ng4bTYP3okuChm/W84f5BCoCu4R+IbZs+ks8v/qfvMoPn0tw7kq1s9/3wdcShR3i0v+jb+qKgLTEuXqsZrVX3b/P6LV41fHjxR4Abu2z0VQNtiBAAAAAElFTkSuQmCC\")}.awcore-screenshare-button span{margin-left:-20px;margin-right:-20px;text-align:center}.awcore-screenshare-button-hidden{display:none !important}.awcore-screenshare-button-disabled{opacity:0.5}\n\n/*!\n * American Well Core Web SDK\n *\n * Copyright © 2020 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-tmc-lite-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;max-width:636px;-ms-flex-pack:center;justify-content:center;margin:auto;color:#313336}.awcore-tmc-lite-container label{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin-bottom:20px}.awcore-tmc-lite-container label span{padding:0 10px;font-size:14px;font-weight:600;color:#6e6e6e}.awcore-tmc-lite-container label select{font-size:16px;height:36px;border:none;border-bottom:1px solid #888888;max-width:460px;padding:0 15px 0 10px;appearance:none;-moz-appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgMTIgNyI+CiAgICA8cGF0aCBmaWxsPSIjOTU5REE2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4wMjcuNjdhLjM1My4zNTMgMCAwIDEgMCAuNTEzbC01LjIwMSA1LjJhLjM1My4zNTMgMCAwIDEtLjUxMyAwbC01LjIwMS01LjJhLjM1My4zNTMgMCAwIDEgMC0uNTEzTC42Ny4xMTJhLjM1My4zNTMgMCAwIDEgLjUxMyAwbDQuMzg2IDQuMzg2TDkuOTU1LjExMmEuMzUzLjM1MyAwIDAgMSAuNTE0IDBsLjU1OC41NTh6Ii8+Cjwvc3ZnPgo=\");background-position:100%;background-repeat:no-repeat;background-color:#ffffff;outline:none}[dir=\'rtl\'] .awcore-tmc-lite-container label select{padding:0 10px 0 15px;background-position:0}.awcore-tmc-lite-container .awcore-tmc-lite-video-container{background:rgba(0,0,0,0.19);position:relative;margin-bottom:30px;max-height:376px}.awcore-tmc-lite-container .awcore-tmc-lite-video-container video{width:100%;max-height:376px;min-height:160px;background:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik04MS44MjQgOTNINTAuMTc2QzQ3Ljg3IDkzIDQ2IDkxLjE1OCA0NiA4OC44ODZWNjEuMTE0QzQ2IDU4Ljg0MiA0Ny44NyA1NyA1MC4xNzYgNTdoMzEuNjQ4Qzg0LjEzIDU3IDg2IDU4Ljg0MiA4NiA2MS4xMTR2MjcuNzcyQzg2IDkxLjE1OCA4NC4xMyA5MyA4MS44MjQgOTNtMjAuODg5LTQuMjJsLTExLjk4LTcuMjY4YTEuNTMgMS41MyAwIDAgMS0uNzMzLTEuMzFWNjkuOGMwLS41MzguMjc4LTEuMDM1LjczMy0xLjMxMWwxMS45OC03LjI2OGMxLjAwNi0uNjEgMi4yODcuMTIzIDIuMjg3IDEuMzF2MjQuOTRjMCAxLjE4Ny0xLjI4IDEuOTItMi4yODcgMS4zMSIvPgogICAgICAgIDxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjcyLjUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=\") no-repeat center}.awcore-tmc-lite-container hr{width:100%;border-top:solid 1px #b1b1b1;margin-bottom:30px}.awcore-tmc-lite-container .awcore-tmc-lite-microphone-error-box,.awcore-tmc-lite-container .awcore-tmc-lite-camera-error-box{background:#e0f0ff;padding:20px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-size:16px;color:#313336;-ms-flex-align:start;align-items:flex-start;margin-bottom:20px}.awcore-tmc-lite-container .awcore-tmc-lite-microphone-error-box .awcore-tmc-lite-error-header,.awcore-tmc-lite-container .awcore-tmc-lite-camera-error-box .awcore-tmc-lite-error-header{font-weight:600}.awcore-tmc-lite-container .awcore-tmc-lite-buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.awcore-tmc-lite-container .awcore-tmc-lite-buttons .awcore-tmc-lite-sub-buttons{display:-ms-flexbox;display:flex}.awcore-tmc-lite-container .awcore-tmc-lite-buttons .awcore-tmc-lite-sub-buttons .awcore-tmc-lite-link-like{background:none;border:none;color:#009cff;text-decoration:underline}.awcore-tmc-lite-container .awcore-tmc-lite-button{color:#ffffff;border:none;-webkit-box-shadow:none;box-shadow:none;background:#25abfd;border-radius:4px;font-weight:600;font-size:16px;height:34px;padding:0 29px;margin-top:15px}.awcore-tmc-lite-container .awcore-tmc-microphone-meter{max-width:300px;height:23px;border-radius:0;margin-top:10px;margin-bottom:15px}.awcore-tmc-lite-container .awcore-tmc-microphone-meter .awcore-tmc-microphone-meter-bar{border-radius:0;width:35px;height:15px}.awcore-tmc-lite-container .awcore-tmc-microphone-meter-description{margin-bottom:20px;font-size:16px}\n\n/*!\n * American Well Core Web SDK\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-tmc-container{width:100%;height:100%;display:-ms-flexbox;display:flex;text-align:initial}.awcore-tmc-container h3{font-size:20px}.awcore-tmc-drawer{-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.5);box-shadow:0 2px 6px 0 rgba(0,0,0,0.5);width:508px;-ms-flex-negative:0;flex-shrink:0;padding:24px;background-color:white;z-index:1;overflow-y:auto;height:100%}.awcore-tmc-drawer-header{margin-bottom:40px}.awcore-tmc-drawer-header h3{font-size:20px;font-weight:600;color:#313336;vertical-align:middle;margin-top:7px}.awcore-tmc-progress-container{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;border-radius:4px;border:solid 1px #e9e9e9;background-color:#f9f9f9;padding:0 26px 5px;font-size:12px;white-space:nowrap;margin:5px 0;height:75px}.awcore-tmc-progress-container hr{margin-bottom:30px;border-top:none;border-bottom:solid 1px #d8d8d8;width:40px}.awcore-tmc-progress-container div{cursor:pointer}.awcore-tmc-progress-back div:hover{opacity:0.5}.awcore-tmc-step-title,.awcore-tmc-progress-back{display:inline-block}.awcore-tmc-step{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;width:24px;color:#5b6b7b}.awcore-tmc-step:hover,.awcore-tmc-current-step{color:#313336}.awcore-tmc-step span{position:absolute;visibility:hidden;width:120px;background-color:black;color:#fff;text-align:center;padding:5px 0;bottom:53px}.awcore-tmc-step:hover span{visibility:visible}.awcore-tmc-step span::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-8px;border-width:8px;border-style:solid;border-color:black transparent transparent transparent}.awcore-tmc-step-camera:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22%2386919C%22 fill-rule%3D%22evenodd%22%3E        %3Cpath d%3D%22M14.434 19H2.566C1.701 19 1 18.283 1 17.4V6.6C1 5.716 1.701 5 2.566 5h11.868C15.3 5 16 5.716 16 6.6v10.8c0 .883-.701 1.6-1.566 1.6M22.085 17.906l-4.792-3.115A.667.667 0 0 1 17 14.23V9.77c0-.23.111-.443.293-.56l4.792-3.116c.403-.261.915.053.915.562v10.689c0 .508-.512.822-.915.56%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-camera:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22%235B6B7B%22 fill-rule%3D%22evenodd%22%3E        %3Cpath d%3D%22M14.434 19H2.566C1.701 19 1 18.283 1 17.4V6.6C1 5.716 1.701 5 2.566 5h11.868C15.3 5 16 5.716 16 6.6v10.8c0 .883-.701 1.6-1.566 1.6M22.085 17.906l-4.792-3.115A.667.667 0 0 1 17 14.23V9.77c0-.23.111-.443.293-.56l4.792-3.116c.403-.261.915.053.915.562v10.689c0 .508-.512.822-.915.56%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-camera.awcore-tmc-step-on:hover:after,.awcore-tmc-step-camera.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22%231296E7%22 fill-rule%3D%22evenodd%22%3E        %3Cpath d%3D%22M14.434 19H2.566C1.701 19 1 18.283 1 17.4V6.6C1 5.716 1.701 5 2.566 5h11.868C15.3 5 16 5.716 16 6.6v10.8c0 .883-.701 1.6-1.566 1.6M22.085 17.906l-4.792-3.115A.667.667 0 0 1 17 14.23V9.77c0-.23.111-.443.293-.56l4.792-3.116c.403-.261.915.053.915.562v10.689c0 .508-.512.822-.915.56%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-microphone:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Crect width%3D%226%22 height%3D%2213%22 x%3D%229%22 y%3D%222%22 fill%3D%22%2386919C%22 rx%3D%223%22%2F%3E        %3Cpath stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M6 12a6 6 0 1 0 12 0M12 18v4%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-microphone:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%235B6B7B%22 stroke-width%3D%222%22%3E        %3Crect width%3D%224%22 height%3D%2211%22 x%3D%2210%22 y%3D%223%22 fill%3D%22%235B6B7B%22 rx%3D%222%22%2F%3E        %3Cpath stroke-linecap%3D%22round%22 d%3D%22M6 12a6 6 0 1 0 12 0M12 18v4%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-microphone.awcore-tmc-step-on:hover:after,.awcore-tmc-step-microphone.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%231296E7%22 stroke-width%3D%222%22%3E        %3Crect width%3D%224%22 height%3D%2211%22 x%3D%2210%22 y%3D%223%22 fill%3D%22%231296E7%22 rx%3D%222%22%2F%3E        %3Cpath stroke-linecap%3D%22round%22 d%3D%22M6 12a6 6 0 1 0 12 0M12 18v4%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-speaker:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath fill%3D%22%2386919C%22 stroke-linejoin%3D%22round%22 d%3D%22M5.113 8.871H2v6.636h3.113L9.38 19V5.378z%22%2F%3E        %3Cpath d%3D%22M18.976 5a9.9 9.9 0 0 1 3.048 7.158A9.896 9.896 0 0 1 19.292 19M16.248 6.83a7.826 7.826 0 0 1 2.083 5.33 7.823 7.823 0 0 1-1.881 5.1M13.53 8.62a5.83 5.83 0 0 1 1.19 3.538c0 1.214-.37 2.34-1 3.274%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-speaker:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%235B6B7B%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath fill%3D%22%235B6B7B%22 stroke-linejoin%3D%22round%22 d%3D%22M5.113 8.871H2v6.636h3.113L9.38 19V5.378z%22%2F%3E        %3Cpath d%3D%22M18.976 5a9.9 9.9 0 0 1 3.048 7.158A9.896 9.896 0 0 1 19.292 19M16.248 6.83a7.826 7.826 0 0 1 2.083 5.33 7.823 7.823 0 0 1-1.881 5.1M13.53 8.62a5.83 5.83 0 0 1 1.19 3.538c0 1.214-.37 2.34-1 3.274%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-speaker.awcore-tmc-step-on:hover:after,.awcore-tmc-step-speaker.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%231296E7%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath fill%3D%22%231296E7%22 stroke-linejoin%3D%22round%22 d%3D%22M5.113 8.871H2v6.636h3.113L9.38 19V5.378z%22%2F%3E        %3Cpath d%3D%22M18.976 5a9.9 9.9 0 0 1 3.048 7.158A9.896 9.896 0 0 1 19.292 19M16.248 6.83a7.826 7.826 0 0 1 2.083 5.33 7.823 7.823 0 0 1-1.881 5.1M13.53 8.62a5.83 5.83 0 0 1 1.19 3.538c0 1.214-.37 2.34-1 3.274%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-internet:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath d%3D%22M13 13l2-4M14 15a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 15z%22%2F%3E        %3Cpath d%3D%22M20.535 19A9.717 9.717 0 0 0 22 13.873C22 8.42 17.523 4 12 4 6.478 4 2 8.42 2 13.873A9.71 9.71 0 0 0 3.466 19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-internet:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%235B6B7B%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath d%3D%22M13 13l2-4M14 15a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 15z%22%2F%3E        %3Cpath d%3D%22M20.535 19A9.717 9.717 0 0 0 22 13.873C22 8.42 17.523 4 12 4 6.478 4 2 8.42 2 13.873A9.71 9.71 0 0 0 3.466 19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-internet.awcore-tmc-step-on:hover:after,.awcore-tmc-step-internet.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%231296E7%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath d%3D%22M13 13l2-4M14 15a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 15z%22%2F%3E        %3Cpath d%3D%22M20.535 19A9.717 9.717 0 0 0 22 13.873C22 8.42 17.523 4 12 4 6.478 4 2 8.42 2 13.873A9.71 9.71 0 0 0 3.466 19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-summary:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%224%22 cy%3D%226%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2210%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2214%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2218%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Cpath stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M8 6h12M8 10h8M8 14h12M8 18h8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-summary:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%224%22 cy%3D%226%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2210%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2214%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2218%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Cpath stroke%3D%22%235B6B7B%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M8 6h12M8 10h8M8 14h12M8 18h8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-summary.awcore-tmc-step-on:hover:after,.awcore-tmc-step-summary.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%224%22 cy%3D%226%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2210%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2214%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2218%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Cpath stroke%3D%22%231296E7%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M8 6h12M8 10h8M8 14h12M8 18h8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-get_started.awcore-tmc-step-on:hover:after,.awcore-tmc-step-get_started.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Cpath stroke%3D%22%231296E7%22 stroke-width%3D%222%22 d%3D%22M21.9 18H2.1c-.607 0-1.1-.47-1.1-1.05V5.05C1 4.47 1.493 4 2.1 4h19.8c.607 0 1.1.47 1.1 1.05v11.9c0 .58-.493 1.05-1.1 1.05zM18 21H6%22%2F%3E        %3Cpath fill%3D%22%231296E7%22 d%3D%22M10 20h4v-3h-4z%22%2F%3E        %3Cpath stroke%3D%22%231296E7%22 stroke-linejoin%3D%22round%22 stroke-width%3D%222%22 d%3D%22M5 11h3.733l1.867 4 2.8-8 1.867 4H19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-get_started:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%235BC23E%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-get_started:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%2366D448%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-failed-icon:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%23FDB53E%22%2F%3E        %3Cpath fill%3D%22%23FFF%22 d%3D%22M10.5 5h3v9h-3zM10.5 16h3v3h-3z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-failed-icon:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%23EDA42F%22%2F%3E        %3Cpath fill%3D%22%23FFF%22 d%3D%22M10.5 5h3v9h-3zM10.5 16h3v3h-3z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-passed-icon:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%2366D448%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-passed-icon:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%235BC23E%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-progress-back{height:18px;width:18px;background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cpath fill%3D%22%23313336%22 fill-rule%3D%22nonzero%22 stroke%3D%22%23313336%22 d%3D%22M16 5.166L14.856 4 7 11.998 14.855 20 16 18.835l-6.711-6.836z%22%2F%3E%3C%2Fsvg%3E\") no-repeat center center;cursor:pointer;margin-right:15px}[dir=\'rtl\'] .awcore-tmc-progress-back{-webkit-transform:scaleX(-1);transform:scaleX(-1);margin-right:0;margin-left:15px}.awcore-tmc-step-failed,.awcore-tmc-failed .awcore-tmc-step-test{display:none}.awcore-tmc-failed .awcore-tmc-step-failed{display:initial}.awcore-tmc-microphone-meter{height:32px;width:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-radius:10px;border:solid 1px #d8d8d8;-ms-flex-align:center;align-items:center;padding:0 5px;margin:0}.awcore-tmc-microphone-meter>:first-child{border-radius:6px 0 0 6px}.awcore-tmc-microphone-meter>:last-child{border-radius:0 6px 6px 0}[dir=\'rtl\'] .awcore-tmc-microphone-meter>:first-child{border-radius:0 6px 6px 0}[dir=\'rtl\'] .awcore-tmc-microphone-meter>:last-child{border-radius:6px 0 0 6px}.awcore-tmc-microphone-meter-bar{height:20px;width:60px;background-color:#e6e6e6}.awcore-tmc-microphone-meter-bar-lit{background-color:#2fab0d}.awcore-tmc-content{-ms-flex-positive:1;flex-grow:1;display:-ms-flexbox;display:flex}.awcore-tmc-video{height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.awcore-tmc-blur{-webkit-filter:blur(15px);filter:blur(15px);opacity:.5}.awcore-tmc-no-video-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:#313336}.awcore-no-video-content-image{height:158px;width:100%;margin-bottom:25px;background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22158%22 height%3D%22158%22 viewBox%3D%220 0 158 158%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%23BBB%22 stroke-width%3D%223%22 transform%3D%22translate(2 2)%22%3E        %3Ccircle cx%3D%2277%22 cy%3D%2277%22 r%3D%2277%22%2F%3E        %3Cg transform%3D%22translate(38 50)%22%3E            %3Crect width%3D%2261%22 height%3D%2255%22 rx%3D%225%22%2F%3E            %3Cg stroke-linecap%3D%22round%22%3E                %3Cpath d%3D%22M20 17l21 21M41 17L20 38%22%2F%3E            %3C%2Fg%3E            %3Cpath d%3D%22M68.982 16.794l11.986-10.9a3 3 0 0 1 5.018 2.219v38.775a3 3 0 0 1-5.018 2.22L68.982 38.206a3 3 0 0 1-.982-2.22V19.013a3 3 0 0 1 .982-2.22z%22%2F%3E        %3C%2Fg%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-tmc-no-video-content{text-align:center;color:#ffffff}.awcore-tmc-no-video-content p{display:inline-block;width:340px}.awcore-tmc-internet-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1 1 auto;flex:1 1 auto;padding-top:30px}.awcore-tmc-internet-content iframe{-ms-flex:1 1 auto;flex:1 1 auto;border:0}.awcore-drawer-single-button-container,.awcore-drawer-multi-button-container{padding-top:30px;display:-ms-flexbox;display:flex}.awcore-drawer-single-button-container{-ms-flex-pack:center;justify-content:center}.awcore-drawer-multi-button-container{-ms-flex-pack:justify;justify-content:space-between}.awcore-drawer-content button{font-size:20px;border-radius:4px;text-align:center;color:#ffffff;background-color:#25abfd;background-repeat:no-repeat;background-position:center center;border:none;width:215px;height:40px}.awcore-drawer-content .awcore-drawer-content-ghost-button{background-color:white;color:#25abfd;font-size:16px;font-weight:bold;padding:5px 15px;width:initial;height:initial}.awcore-drawer-content{font-size:14px;line-height:1.3}.awcore-drawer-content.awcore-drawer-content-internet{width:445px}.awcore-drawer-content label{width:100%;font-weight:normal;color:unset}.awcore-drawer-content .awcore-drawer-content-details{padding:0 20px}.awcore-drawer-content h3{font-size:18px;font-weight:600;text-align:center}.awcore-drawer-content h4{font-size:14px;font-weight:bold}.awcore-tmc-troubleshoot{margin:15px 0 0}.awcore-drawer-content p{margin:18px 0 0}.awcore-drawer-content ul{padding-left:18px;margin:0}.awcore-drawer-content li{padding:10px 0}.awcore-drawer-content audio{margin:20px 0 0 0}.awcore-drawer-content-image{height:132px;margin-bottom:25px}.awcore-tmc-step{height:40px}.awcore-tmc-step-failed,.awcore-tmc-step-results-fail{text-align:left}.awcore-drawer-content-get-started .awcore-drawer-content-image{background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22132%22 height%3D%22132%22 viewBox%3D%220 0 132 132%22%3E    %3Cdefs%3E        %3ClinearGradient id%3D%22a%22 x1%3D%22132.34%25%22 x2%3D%22-15.812%25%22 y1%3D%22188.791%25%22 y2%3D%22-61.697%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22b%22 x1%3D%22239.947%25%22 x2%3D%22-99.472%25%22 y1%3D%223681.055%25%22 y2%3D%22-8690.039%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22c%22 x1%3D%22-297.925%25%22 x2%3D%22462.17%25%22 y1%3D%22-1127.507%25%22 y2%3D%22626.26%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22d%22 x1%3D%22179.437%25%22 x2%3D%22-52.148%25%22 y1%3D%22278.523%25%22 y2%3D%22-136.663%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22e%22 x1%3D%22100%25%22 x2%3D%220%25%22 y1%3D%22100%25%22 y2%3D%220%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E    %3C%2Fdefs%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 transform%3D%22translate(2 2)%22%3E        %3Cpath stroke%3D%22url(%23a)%22 stroke-width%3D%223%22 d%3D%22M68.4 46H3.6C1.612 46 0 44.455 0 42.55V3.45C0 1.545 1.612 0 3.6 0h64.8C70.388 0 72 1.545 72 3.45v39.1c0 1.905-1.612 3.45-3.6 3.45z%22 transform%3D%22translate(28 39)%22%2F%3E        %3Cpath stroke%3D%22url(%23b)%22 stroke-width%3D%223%22 d%3D%22M53 53H19%22 transform%3D%22translate(28 39)%22%2F%3E        %3Cpath fill%3D%22url(%23c)%22 d%3D%22M28 52.857h16v-7H28z%22 transform%3D%22translate(28 39)%22%2F%3E        %3Cpath stroke%3D%22url(%23d)%22 stroke-linejoin%3D%22round%22 stroke-width%3D%223%22 d%3D%22M41 62h12.267L59.4 76l9.2-28 6.133 14H87%22%2F%3E        %3Ccircle cx%3D%2264%22 cy%3D%2264%22 r%3D%2264%22 stroke%3D%22url(%23e)%22 stroke-width%3D%223%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-drawer-content-summary-failed .awcore-drawer-content-image{background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22128%22 height%3D%22128%22 viewBox%3D%220 0 128 128%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 transform%3D%22translate(0 11)%22%3E        %3Cpath fill%3D%22%23FDB53E%22 d%3D%22M61 36h6v36h-6z%22%2F%3E        %3Crect width%3D%227%22 height%3D%227%22 x%3D%2260.5%22 y%3D%2278%22 fill%3D%22%23FDB53E%22 rx%3D%223.5%22%2F%3E        %3Cpath stroke%3D%22%23FDB53E%22 stroke-width%3D%223%22 d%3D%22M68.27 7.005l55.096 90.393a5 5 0 0 1-4.27 7.602H8.904a5 5 0 0 1-4.27-7.602L59.732 7.005a5 5 0 0 1 8.538 0z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-drawer-content-summary-success .awcore-drawer-content-image{background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22132%22 height%3D%22132%22 viewBox%3D%220 0 132 132%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%2366D448%22 transform%3D%22translate(2 2)%22%3E        %3Ccircle cx%3D%2264%22 cy%3D%2264%22 r%3D%2264%22 stroke-width%3D%223%22%2F%3E        %3Cpath stroke-width%3D%226%22 d%3D%22M37 62.697L55.848 82 91 46%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-tcm-select-container{position:relative;margin-bottom:25px}.awcore-tcm-select-container:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2212%22 height%3D%227%22 viewBox%3D%220 0 12 7%22%3E    %3Cpath fill%3D%22%23959DA6%22 fill-rule%3D%22evenodd%22 d%3D%22M11.027.67a.353.353 0 0 1 0 .513l-5.201 5.2a.353.353 0 0 1-.513 0l-5.201-5.2a.353.353 0 0 1 0-.513L.67.112a.353.353 0 0 1 .513 0l4.386 4.386L9.955.112a.353.353 0 0 1 .514 0l.558.558z%22%2F%3E%3C%2Fsvg%3E\");right:11px;top:15px;padding:10px 0 0 8px;position:absolute;pointer-events:none}.awcore-tmc-audio-controls{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin:25px 0 0 0}.awcore-tmc-audio-controls button{background:#1774cc url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2216%22 height%3D%2216%22 viewBox%3D%220 0 16 16%22%3E    %3Cpath fill%3D%22%23FFF%22 fill-rule%3D%22evenodd%22 d%3D%22M4.467.135a1.029 1.029 0 0 0-.97-.025C3.212.265 3 .559 3 .879v13.329c0 .32.215.617.499.77a.845.845 0 0 0 .414.108c.166 0 .36-.046.505-.138l10.646-6.725a.887.887 0 0 0 .42-.744.862.862 0 0 0-.402-.74L4.467.134z%22%2F%3E%3C%2Fsvg%3E\") no-repeat center center;border:none;width:40px;height:40px;margin:0;padding:0;border-radius:40px;cursor:pointer}.awcore-tmc-audio-controls button.awcore-audio-stopped{background:#1774cc url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2216%22 height%3D%2216%22 viewBox%3D%220 0 16 16%22%3E    %3Crect width%3D%2212%22 height%3D%2212%22 x%3D%222%22 y%3D%222%22 fill%3D%22%23FFF%22 fill-rule%3D%22evenodd%22 rx%3D%221%22%2F%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-tmc-audio-controls button:focus{outline:none}.awcore-tmc-audio-controls progress{-webkit-appearance:none;width:285px;margin:0 10px;border:none;border-radius:50px;height:10px}.awcore-tmc-audio-controls progress::-webkit-progress-bar{background:#e6e6e6;border-radius:50px;height:10px}.awcore-tmc-audio-controls progress::-webkit-progress-value{border-radius:50px;background:#2fab0d;height:10px;-webkit-box-shadow:2pt 0 0 2pt #2fab0d;box-shadow:2pt 0 0 2pt #2fab0d;-webkit-transition:.4s linear;transition:.4s linear}.awcore-tmc-audio-controls progress::-moz-progress-bar{border-radius:50px;background:#2fab0d;height:10px;box-shadow:2pt 0 0 2pt #2fab0d;-moz-transition:.4s linear;transition:.4s linear}.awcore-tmc-audio-controls progress::-ms-fill{border-radius:50px;background:#2fab0d;height:10px;box-shadow:2pt 0 0 2pt #2fab0d;-ms-transition:.4s linear;transition:.4s linear}.awcore-tmc-audio-controls progress[value=\'0\']::-webkit-progress-value{visibility:hidden}[dir=\'rtl\'] .awcore-tcm-select-container:after{right:unset;left:11px}awcore-tcm-select-container::-ms-expand{display:none}.awcore-tcm-select-container select{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:100%;height:35px;font-size:14px;line-height:1.75;border-top:0;border-right:0;border-left:0;-ms-word-break:normal;word-break:normal;padding:0 35px 0 10px}.awcore-tcm-select-container label span{padding:0 10px}[dir=\'rtl\'] .awcore-tcm-select-container select{padding:0 10px 0 35px}\n\n\nbutton,\ninput,\nselect {\n  font-family: inherit;\n}\n\namwell-tyto-device {\n  padding: 24px;\n}\n\n.tyto-msg-wrapper {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  margin-bottom: 20px;\n  margin-left: 15px;\n}\n\n.tyto-msg-wrapper img {\n  width: 111px;\n  height: 109px;\n}\n\n[dir=\"rtl\"] .tyto-msg-wrapper {\n  margin-right: 15px;\n}\n\n.tyto-message-details {\n  display: inline-block;\n  vertical-align: top;\n  margin-left: 12px;\n  position: relative;\n  width: 72%;\n}\n\n\n.tyto-message-details a{\n  text-decoration: none;\n}\n\n.tyto-message-details.full_width {\n  width: 100%;\n} \n\n[dir=\"rtl\"] .tyto-message-details {\n  margin-right: 12px;\n}\n\nh1 {\n  font-size: 20px;\n  color: #383a3e;\n  font-weight: 600;\n  display: block;\n  margin: 0;\n}\n\n.tyto-message-details p {\n  font-size: 16px;\n  margin: 0;\n  color: #313336;\n}\n\n.buttons-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row;\n  flex-flow: row;\n  text-align: center;\n  margin-top: 45px;\n}\n\n.buttons-container button {\n  margin: 25px auto 0;\n  min-height: 44px;\n  width: 200px;\n  font-weight: 600;\n  font-size: 20px;\n  color: #ffffff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  outline: none;\n  position: relative;\n}\n\n.buttons-container button.blueBtn {\n  background: var(--amwell-visit-console-button-color, #1774cc);\n}\n\n.buttons-container button.whiteBtn {\n  background: #ffffff;\n  color: #1774cc;\n  border:1px solid  #1774cc;\n}\n\n.buttons-container button.whiteBtn:hover {\n  background: whitesmoke;\n  color: #156bbd;\n  border:1px solid #156bbd;\n}\n\n.buttons-container button.blueBtn:hover {\n  background: var(--amwell-visit-console-button-color-hover, #156bbd);\n}\n\n.buttons-container button.blueBtn:disabled {\n  background: var(--amwell-visit-console-button-color, #1774cc);\n  opacity: 0.4;\n}\n\n.awcore-hiddenControllers .awcore-top-pane-wrapper {\n  height: 0;\n}\n\n\@media screen and (max-width: 768px) {\n  .buttons-container{\n    -ms-flex-flow: column;\n    flex-flow: column;\n  }\n}\n\n/* a more accessible \'hidden\' https://gomakethings.com/hidden-content-for-better-a11y/#hiding-the-link */\n.hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n/* Create a custom radio button */\n.checkmark {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 25px;\n  width: 25px;\n  border: solid 1px #d6d6d6;\n  border-radius: 50%;\n}\n\n/* On mouse-over, add a grey background color */\n.radioButtonContainer:hover input ~ .checkmark {\n  background-color: #d6d6d6;\n}\n\n/* When the radio button is checked, add a blue background */\n.radioButtonContainer input:checked ~ .checkmark {\n  background: -webkit-gradient(\n    linear,\n    left top, left bottom,\n    from(#0469bd),\n    color-stop(50%, #2989d8),\n    color-stop(51%, #207cca),\n    to(#25abfd)\n  );\n  background: linear-gradient(\n    to bottom,\n    #0469bd 0%,\n    #2989d8 50%,\n    #207cca 51%,\n    #25abfd 100%\n  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n}\n\n/* Create the indicator (the dot/circle - hidden when not checked) */\n.checkmark:after {\n  content: \"\";\n  position: absolute;\n  display: none;\n}\n\n/* Show the indicator (dot/circle) when checked */\n.radioButtonContainer input:checked ~ .checkmark:after {\n  display: block;\n}\n\n/* Style the indicator (dot/circle) */\n.radioButtonContainer .checkmark:after {\n  margin-top: 8px;\n  margin-left: 8px;\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n  background: white;\n}\n\n[dir=\"rtl\"] .radioButtonContainer .checkmark:after {\n  margin-right: 8px;\n}\n\n.radioButtonContainer {\n  display: block;\n  position: relative;\n  padding-left: 35px;\n  margin-bottom: 12px;\n  cursor: pointer;\n  font-size: 16px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n[dir=\"rtl\"] .radioButtonContainer {\n  padding-right: 35px;\n}\n\n/* Hide the browser\'s default radio button */\n.radioButtonContainer input {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n}\n\n.link {\n  color: var(--amwell-visit-console-button-color, #1774CC);\n  cursor: pointer;\n}"; }
};

const defaultMessages$2 = {
    amwell_video_console_accept_permission: 'Please allow access to your camera and microphone. You may need to update your browser settings to allow access.',
    amwell_video_console_call_me: 'Switch To Phone',
    amwell_video_console_camera: 'Camera',
    amwell_video_console_can_cancel_rejoin: "{participantName} will rejoin shortly. If you'd prefer not to wait, you can cancel the visit.",
    amwell_video_console_can_cancel: "You have connected but we are still loading {participantName}'s video. If you'd prefer not to wait you can cancel the visit.",
    amwell_video_console_connecting_guest: 'Please wait.',
    amwell_video_console_connecting_guest_subtext: 'Your visit is about to begin.',
    amwell_video_console_connecting_remote_extended: "You've connected but we're still loading {participantName}'s video",
    amwell_video_console_connecting_remote_extended_subtext: "If you'd prefer not to wait you can cancel the visit.",
    amwell_video_console_connecting_remote_extended_subtext_ivr: "If you'd prefer, you can still talk to {participantName} on the phone, or continue to wait for the video",
    amwell_video_console_connecting_with_remote: "We're connecting you with {remoteName}",
    amwell_video_console_connecting_your_video_extended: 'It looks like you are having trouble connecting.',
    amwell_video_console_connecting_your_video_subtext_extended: "We're still trying to connect you. If you'd prefer not to wait, you can cancel the visit",
    amwell_video_console_connecting_your_video_subtext_extended_ivr: "We're still trying to connect you. If you'd prefer, you can talk to {participantName} on the phone, or continue to wait for video.",
    amwell_video_console_consumer_reconnecting: "We're reconnecting {participantName}'s video. Please wait for your patient to rejoin",
    amwell_video_console_consumer_subtitle_age: 'Age {age}',
    amwell_video_console_end_visit_confirmation_title: 'Are you sure?',
    amwell_video_console_full_screen: 'Full Screen',
    amwell_video_console_header_browser_permission: 'Browser Permission',
    amwell_video_console_media_permission_denied: 'We are having trouble accessing camera and microphone. Please check your camera and microphone permissions.',
    amwell_video_console_mic: 'Mic',
    amwell_video_console_participant_connection_issue: "It looks like you're having trouble connecting. Please check your internet connection and we'll keep trying to connect your visit.",
    amwell_video_console_participant_type_label_consumer: 'patient',
    amwell_video_console_participant_type_label_guest: 'guest',
    amwell_video_console_participant_type_label_provider: 'provider',
    amwell_video_console_provider_reconnecting: "We're reconnecting {participantName}'s video. Please wait for your provider to rejoin",
    amwell_video_console_reconnecting_remote: "We're reconnecting {participantName}'s video",
    amwell_video_console_reconnecting_remote_as_guest_subtext: "We're waiting for everyone to connect.",
    amwell_video_console_reconnecting_consumer_subtext: 'Please wait for your patient to rejoin the visit.',
    amwell_video_console_reconnecting_provider_subtext: 'Please wait for your provider to rejoin the visit.',
    amwell_video_console_reconnecting_your_video_main: 'It looks like your video disconnected.',
    amwell_video_console_reconnecting_your_video_extended: "It looks like you're having trouble reconnecting",
    amwell_video_console_reconnecting_your_video_extended_subtext: "We're still trying to connect you. If you'd prefer not to wait, you can end the visit",
    amwell_video_console_reconnecting_your_video_extended_subtext_ivr: "We're still trying to connect you. If you'd prefer, you can talk on the phone, or continue to wait for video.",
    amwell_video_console_reconnecting_your_video_subtext: "We're trying to reconnect you now",
    amwell_video_console_refresh: 'Reload',
    amwell_video_console_settings_camera_list_header: 'Camera',
    amwell_video_console_settings_microphone_list_header: 'Microphone',
    amwell_video_console_settings_speaker_list_header: 'Speaker',
    amwell_video_console_settings: 'Settings',
    amwell_video_console_settings_details: 'Select the source for your inputs.',
    amwell_video_console_switch: 'Switch',
    amwell_video_console_talk_via_phone: 'Talk Via Phone',
    amwell_video_console_webrtc_additional_comments: 'Additional Comments',
    amwell_video_console_webrtc_end_visit_confirmation_singular: 'There is still {timeRemaining} minute remaining. Are you sure you want to end this visit?',
    amwell_video_console_webrtc_end_visit_confirmation_plural: 'There are still {timeRemaining} minutes remaining. Are you sure you want to end this visit?',
    amwell_video_console_webrtc_back: 'Back',
    amwell_video_console_webrtc_cancel_visit: 'Cancel Visit',
    amwell_video_console_webrtc_cancel_visit_confirmation: 'Are you sure you want to cancel this visit?',
    amwell_video_console_webrtc_cancel_visit_sub: '(You will not be charged)',
    amwell_video_console_webrtc_confirm_end: 'YES',
    amwell_video_console_webrtc_disregard_end: 'NO',
    amwell_video_console_webrtc_end_visit_confirmation: 'Are you sure you want to end this visit?',
    amwell_video_console_webrtc_end_visit: 'End Visit',
    amwell_video_console_webrtc_guest_name_default: 'Guest',
    amwell_video_console_webrtc_refresh_visit: 'Refresh Video',
    amwell_video_console_webrtc_visit_report_note: "Visit report will NOT be generated and any entries you've made will not be applied.",
    amwell_video_console_self_video: 'Self View'
};

const VideoConsole = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.messages = defaultMessages$2;
        this.visitUpdated = createEvent(this, "visitUpdated", 7);
        this.visitError = createEvent(this, "visitError", 7);
        this.visitEnd = createEvent(this, "visitEnd", 7);
    }
    async initialize(sdk, options) {
        this.sdk = sdk;
        this.visit = options.visit;
        this.messages = Object.assign({}, defaultMessages$2, options.messages);
        // filter messages only to the ones that are for the video console and remove the widget prefix
        const filtered = Object.keys(this.messages)
            .filter(key => key.startsWith('amwell_video_console_'))
            .reduce((obj, key) => {
            obj[key.substring(21)] = this.messages[key];
            return obj;
        }, {});
        const contextElements = {
            // success is only called when visit ends, so pass back ended visit obj
            successCallback: (visit) => {
                this.visit = null;
                this.visitEnd.emit({ visit });
            },
            // error callback is not only called when visit ends, also has inconsistent non-visit error field usage
            // so just sending the first one FIXME: this should be less terrible and more consistent.
            errorCallback: (visit, error) => {
                this.visitError.emit({ visit, error });
            },
            // just send back the most up to date visit
            updatedCallback: (visit) => {
                this.visit = visit;
                this.visitUpdated.emit({ visit });
            },
            videoConsoleContainer: this.container,
            attachPoints: null,
            messages: filtered,
            locale: options.locale
        };
        const videoContext = this.sdk.visitService.createVideoContext(contextElements);
        return this.sdk.visitService.startWebRTCVisit(this.visit, videoContext)
            .then((videoConsole) => {
            this.videoConsole = videoConsole;
            return true;
        });
    }
    async destroy() {
        this.sdk = null;
        this.visit = null;
        if (this.videoConsole) {
            this.videoConsole.stop();
        }
    }
    async refresh() {
        if (this.videoConsole) {
            this.videoConsole.refresh();
        }
    }
    render() {
        return (h("div", { class: "video-console", ref: (el) => this.container = el, dir: document.documentElement.dir }));
    }
    static get style() { return "/*!\n * awsdk - 3.1.0 - (c) 2017 - sdk.support\@americanwell.com - https://sdk.americanwell.com \n * \n *  American Well Consumer Web SDK \n * \n * Copyright © 2017 American Well.\n * All rights reserved.\n * \n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */\n/*!\n * American Well Core Web SDK\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-samsung .awcore-switch-camera{display:none}.awcore-container{position:relative;top:0;left:0;width:100%;height:100%;min-width:870px;min-height:357px;background-color:#1B191B;color:#ffffff}.awcore-container .awcore-control-button:hover{cursor:pointer}.awcore-container video{pointer-events:none}.awcore-top-pane-wrapper{pointer-events:none;position:absolute;top:0px;left:0px;right:0px;height:160px;width:100%;background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(26,25,27,0.6)), to(rgba(26,25,27,0)));background-image:linear-gradient(to bottom, rgba(26,25,27,0.6), rgba(26,25,27,0));display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.awcore-top-pane-wrapper *{pointer-events:auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.awcore-bottom-pane-wrapper{pointer-events:none;opacity:1;text-align:center;position:absolute;bottom:0px;left:0px;right:0px;max-height:120px;height:100%;width:100%;background-image:-webkit-gradient(linear, left bottom, left top, from(rgba(26,25,27,0.6)), to(rgba(26,25,27,0)));background-image:linear-gradient(to top, rgba(26,25,27,0.6), rgba(26,25,27,0));display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:baseline;align-items:baseline;padding:16px;-webkit-box-sizing:border-box;box-sizing:border-box}\@media screen and (max-width: 768px){.awcore-bottom-pane-wrapper{max-height:180px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}}.awcore-bottom-pane-wrapper *{pointer-events:auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.awcore-bottom-pane-wrapper,.awcore-hide-self-video{-webkit-transition-duration:.3s;transition-duration:.3s}.awcore-bottom-pane-wrapper span,.awcore-hide-self-video span{display:block;margin-top:66px;font-size:12px;white-space:nowrap}.awcore-full-screen-button span{margin-left:-20px;margin-right:-20px;text-align:center}.awcore-hiddenControllers .awcore-top-pane-wrapper,.awcore-hiddenControllers .awcore-bottom-pane-wrapper,.awcore-hiddenControllers .awcore-hide-self-video{pointer-events:none;opacity:0;-webkit-transition-duration:.8s;transition-duration:.8s}.wcag .awcore-hiddenControllers .awcore-top-pane-wrapper,.wcag .awcore-hiddenControllers .awcore-bottom-pane-wrapper,.wcag .awcore-hiddenControllers .awcore-hide-self-video{pointer-events:auto;opacity:1}.awcore-toggle-buttons-container{display:none}.awcore-toggle-buttons-container,.awcore-settings-container,.awcore-far-control-container{z-index:5}.awcore-toggle-buttons-container,.awcore-settings-container,.awcore-toggle-buttons-container.awcore-call-active{display:-ms-flexbox;display:flex}.awcore-video-node-0.awcore-participant-wrapper{position:absolute;top:0;left:0;width:100%;height:100%}.awcore-remote-video-0{position:absolute;top:0;left:0;width:100%;height:100%}.awcore-remote-video-0.multiway{height:calc(100% - 140px);bottom:102px}.awcore-requesting-browser-permission .awcore-spinner-container,.awcore-requesting-browser-permission .awcore-settings-container,.awcore-requesting-browser-permission .awcore-toggle-buttons-container{visibility:hidden}.awcore-control-button{height:60px;width:60px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;border-radius:50%;background-color:#25abfd;background-repeat:no-repeat;background-position:center center;border:1px solid #25abfd;-webkit-box-shadow:0 3px 8px 0 rgba(0,0,0,0.5);box-shadow:0 3px 8px 0 rgba(0,0,0,0.5);margin:0 10px}.wcag .awcore-control-button{background-color:#1296e7;border:8px #1296e7}.awcore-switch-camera{display:none}\@media only screen and (max-width: 768px){.awcore-switch-camera{display:inline-block}}.awcore-control-button:active,.awcore-toggle-buttons-container .awcore-full-screen:active,.awcore-toggle-buttons-container .awcore-refresh:active,.awcore-control-button.awcore-settings-div:active{border:solid 1.9px #ffc33e !important}.awcore-control-button:active span{margin-top:65px}\@media only screen and (max-width: 768px){.awcore-settings-container,.awcore-call-me-div,.awcore-full-screen-button,.awcore-refresh-button{display:none}}.awcore-toggle-buttons-container .awcore-camera{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASdJREFUWAntlDEOAUEUhq0ohEKioEAjeomIQqNSuItSoaSUqDiBEziCuIFoHECiU0h0wvqm2M1kyBoTL1HMS/7sm3lv3v/vv5tJpXx4B7wD/+RAGIYDcAQucefQFpSd34nDruS64Pk3AtJGc9VYuyzfzkBhHizBTB9qCtBrP8sh7TFsD4agrw8WFQBxDiwg3IC6ThzlmSj59RPiLjNXoJE0W0wApGtQSiJXNclPUPxELi3Ahl/UAS/gZmOB5E84RsBHEWICgiBQF1Ab7JKcEBOgSBGhrt8OmIK3bogKgFSJuIEJqRKiBJ1AHOZNeKFSiKtuiZrxEojYcT23KGRfitEGDSPwAK5x5mAzmmfzDMwmBtTYq5j7Fus7PQfe9GrR61u8A96B2IEnllkEvZkqx+0AAAAASUVORK5CYII=\")}.awcore-toggle-buttons-container .awcore-camera.awcore-disabled{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYtJREFUWAntljtOw0AQhmMeBaRDCggh2hQUiIKKhiNQcRMKSlokquQINLRIcAAkSp6i43EAOioKEJhvLE/kXRtlZ+PIjUf6M97deXzejeN0Oq21O9DuADuQpukluka9RjYkb45L31BfIPB76AuF2g+BV2jFfBMk9dATEvtEsRCSf2IGyO9YINQmgTirAqBwFw3RcdV6Nqfdcx8LUQKg3i6S4xW7CwWQ4BiIEQD5i2iAfpGaCUCSrBAZAHk76EUKeGYGkHwLhAK8e4116ADM/Hse7sICwwcq9JMkOed6H327IaXRUmmmYiIUQFJjICpaulMWgKlAWAFqh4gBCIUY9x3JziIWIATikKAgiIxEPvQ5MXr/ET3VgtTZRPdePecx1NjMe4GWYRFitViUIvPoCOmbdSoAAjuCKALoNetb6BFd6FzJs/iBJrFxELMU75Ya6wSLB6j44oiBeSYp+J9Vos3Vk7zO9ZqODV7ubIA20C0/2duG3HpCgV9GN+gVzdVTNaJKo80jeNuUZnfgD81pGyyGJcc/AAAAAElFTkSuQmCC\")}.awcore-toggle-buttons-container .awcore-mic{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAdlJREFUWAntlr9KA0EQh3MhBgwhSSGCjY0WChaCnQpir4UpFF9ArBW0ECx9AG20Ed9AFMFeLGwUooKgWIk2sTGFgn8Sv9G5EEw2t3seaJGBj9mbnfnNZO8uSSzWshAnUKlU5uAInuAKNqEzhJRbCU3isA+NrEhw0E3RMZsGi40618QuWCcdZe3TEb+uaWZajtsrxmJx22S6ZcjttcgfssipplgPQIUM4FUrzYuseat+x2WA+uoIIq0BWifwv0+Ad39KCPOwU9cNy5AOU/9VQ3EJniEBHWBjK1JM4oYmzzYbIOgWlChuhy7P8x7xD83EdK+gvke9aBgtaIBLrRxTv2tU+t4o4o755G34Yc31NfTSwSE0r8d4jk9CGm409tN9EMiLPH5BN88c2tWnIpKCexVbU/Ec19vwonFxBRjV/T7W/t50vapjBLE8lOEdViGhjeTB7IecL8l6BG5B7BBsfrz8crNHSF4n305ZTIA8nHLcHgzAOshtEJMcp19Fc3fdQXAG5G+Xb3Iqb0ptbIeLVKBgmASEM7AEJ/AKYjLIHWyB05+RMDNUa2gmt0HsoBoMsQj6HrCRrNgkmXKiGMCkbRVvDfCbEyjrGfve6sgjS+Lpz8IeTEYm+hdCny9kF+rB7wYKAAAAAElFTkSuQmCC\")}.awcore-toggle-buttons-container .awcore-mic.awcore-disabled{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAlpJREFUWAntlj1LHVEQhl1RY0Q0hdoZOwuRIKSzkdRJEAWV/AAhtYiChU0gP0AbbdKaLhgSK7s0aSKi1+sXIUVMoxCIheLn5pnrHDksZ/fsuW5hIAOvZ2bOzDvvPbvubk3Nfws8gTiOIzAOvoA/YBssgI5AqvByhtSCj8BlRyT7wlkDOhgw6Zps5TbxGwIo3aWQdIEZ0GZXEO8Cnz2ze6rymSDDxUqgXUhYG8EZ8NlkVUPtJia0ARkuZosYJD6vZNP/vLG5qvbhbwfViChGgChPiCgTd2s+6ySKE+AQcZJDRLECLBE7DBfziShegIp4cjPfKyJIQK2Q57TfVt1D/HWkdEdRtIw/Ai6s/dxupgAGDAlS2DJF0PcYTIPmlH5/muZjINe8DsizwWXJe2JGmCmc1+JX/kkpFRAcKEmnkv7SOLnYIh5o7YoWPU+hr6QzLwEVJW0e0PWDrsnFvhzyuK6noF+LDEeyxx9D9Fp/xQZrA2gG+5pzLT9IyhN0QjfX/FMyKiBpAubY30op8SPwDpwCY3s43zUQ3+yNZtDn24JsGFyDSzAL6lSI3Jg9oEtj+eVGBG68CqJ8UzxVEMm/k7FvOC+AXHc5EflE6wVz4AoYK+NUXuUe+nzbkI0B+ewyJqdyobBzSwRbmrh9leeb4qmCtAVMga/AfBeIkJ9gETwVClbnq9xDH7bNELkMYp9cneQ7gPmeWHLVSM73HEjrs/OxHRifd8QhvnwfvgefTT65Vu7oZLKoGBFHcGU+ios4gTvp/acFXOtPN+udTiK4mTu8FSyDl8HN96nhL4fP77sBPH/XAAAAAElFTkSuQmCC\")}.awcore-toggle-buttons-container .awcore-switch-camera{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA0VJREFUWAntljtoFFEUhnc34sbEJIWFj8Ii+CCkMCSKokFU0CqFggpqrCyChZZWWgZtBBU0jSAYCxVFQREUC8UiJijERxVTRMEgKuIzD5Pd9Tuz5wwzkzu7ySzpvPDvOfc//zn3zNw7s5NK/R9l7kChULgE3oJVZaSJwplZZDWweDO6J/PRRNrVAAtVw68DK0AtOAe3JJ1Of8Tfhh3GegN+Ac52sLjIOH8/wQ6SN+6MGikLg7NgKp/PF1wg9sD0Ypl3uXRRDt00uABqgvnSvTcIyHY8xG6l0ynQz3y0GE1thl+q/j21Zh6h7WVS6g4sI95GjWNoN2DbsTkr4FnI49I1YwTInht/kHlOYyeMn6ulxlowHFuH4DMNdgSLwz+PTQoKZ+FTa6fWGpghJ/hbg3Lo/AHfBHb4RAUOdbIgByaA9wT6T4EsLrUzmYzPxa1Fch2xXUDeDXKy5Yr62VevBn7s0MWzaKvBpC+UBqwJn3Q4FNgPvpjeLJy8JxodKSEKzYTkMLKhgBUKkZEJSSdNh98PzoNeMKpFf+E3RdJCU+LJGiCxFUwpOoNV4erADW1iAL8qGA/6xBI3cEcX6A4WNJ/Ci8A71ew2PmqjDXgnMSqKmbcrf80V50DJYbytsS0ujYubSwNy8mXY27E4C/9azLThqGM2lwbea36ro45RbeqY1vjyVvZOEKdk77p1f/vwZxwyuBbwF8ifTuyTQCzxIawh2Q7ZU3x5KqqAPAGHwVdt8HTcRQiPLlkDmiz/aCN2t/DHAdPi3cO/BRbOWwPahFyxfKB81iuW19ogOFBqYYuhc98BAt6VYMv+FwSK1aMvecWmNYt+UhsP5xEY0sBqEye1chHgDHgJGqwO/kpd44NxviV4VYOXfTKBQx1ZvEdrjeHbl5QcwIvK37TS/u0m2Aj5GlvLW+0uvnxm2YvF9EH7B92bIEGu1OvBdglP/BTmMZBPskPwe/WN2YIdggsPBB3Ae5yk03JAezRYgfm+UjnEv4E9wRz/o1RIurqPoBl7hOl6sFz4mDEG3xeJvSL3JzXqhcd/gZkG8lku/hW4UncVSYWDxTeBH7rX1ysslyydBjaC79rEmmRVKsyiAfkM76ywzPyn/wO9yLf4O4l0fwAAAABJRU5ErkJggg==\")}.awcore-toggle-buttons-container .awcore-full-screen{background-color:#4a5764;border:1px solid #4a5764 !important;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWtJREFUWAntVUFOxDAMbDkjbnyKp/CMvfEf9g/c4T0tM2wdTey4bXpDiiUrTjwzdtxtd5qGjQm4Cazrel+WZW05cw4etr38J68AgTd/JvtV4ixMMQfaDz27OcC0b/hrVunonNxNo0z0iDNJAyxOu9QEeKU4NUy3pwEK/MBpXE9PgtiNg+Vxge4G2KkTOtVExrnUQG8TWXHqnG4AIp90kswaws+Ws7WBqR5ZS9e4p1Yp8NEiIP8C/4KfelQtjcMziIebK2lrorq55kc8JvC/J4BfOD+vN3j4B9WbIf9OrJ51xSDf6UqiIJzvN+2mOY2RY3Fa+BbgLOgqt8T+kwmiFg/ChYhgD+t1lVfFCtwTrEiyyTiqK/AYGjATiox40uKabkS7EwNCxJ757tgdvWx9E6ZbAFlgQAjQLhU3bfDL78d0LZeuBNKMoCuOq7ejJUKMcnzsOeGdnueZr4vH2T5NGABriqG24EY4JvA3gV8bY/W+zlbCXwAAAABJRU5ErkJggg==\")}.awcore-toggle-buttons-container .awcore-full-screen.awcore-on{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUtJREFUWAntVokNwjAMpOwAQ7EJnY9OAvM03FVNSGwnoSlISCSSFfzc+eQit4dDP782AefcFXb6tC5ykrvIuzbH5e6wRAT8iVYkQNKqIxeMnDx5EUjGhYmIeZ4drSZA1pU4Ta4V8MDNw3uZhCQ2wQjGdcSuHLj0VHMcHGMMXETExFlgJMDiKOFUThI0CFBTVE1qgVhEgwDAX4+w1ivkAZp8M+sOhZkfFsbHyC1hRxmAn/2nD8OgCCS+UpPlljzd7xPoE/jjCZQ2obXJ5Ki24t/ehNhwfEteZEPpV2q2bUKQhdey3+eyofR9HbA84XtC1lV9gENzEnniGtDXrc1xNYgAKGlO3xNvEKA4atglbzVnYqsAYnJczJmnBGgRwCYlTiUCxSOMR/15ELvRFEgErDrE4scxCkjqopgili/hNLPPA+eZ3PtYOvoLE3gCXhzUULzBV0kAAAAASUVORK5CYII=\")}.awcore-toggle-buttons-container .awcore-refresh{background-color:#4a5764;border:1px solid #4a5764 !important;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArZJREFUWAntljtoVEEUhrPx/cYHvhBFo2AQRCKo2GghNlY+CgtBxQeKFkLAQqwVQRCDjYVgKWksRIKghZWkUEgUJLIKFkbFByE+IsF4/f7cM2H2vje72SoHvj1n7/zzz9zZ2bm3qWkyJmgFgiC4BO9h7QQNkW3LwM9AcSZLOTWrMdqGWYlrK6EFlsA0aIYv0A/lUqk0TFZ8D9Oozsp4KjQBBl5A19NwFrKWdBBtJ5qb8BUUmmhq5E4Aw0P07oAV5hKQX8I70J3PhtWwFebDSTgGPaBYHKYqP7XccB1cfKK4CEuTrLg+C/ZDNyhGwhR0JendtawVuI3olAllcpTfV3dcEQyifXACWkHLPQB9oIkuhOpXANPzNnsl/Z20+RKDtr0SZcStxI52MWaM0TraXsN0uMtdHzdtYkI/h4aroN9fG098s9xP/27q4oFhp93NK7I2WOOCAVfBP5vArsaNbCMxcLsN3tuowXWK+bHbvjz0L9aj5sbaQGdEeiAo2wocTleNrwXfHvNe5jtEV8A1unPc19Za60xQzAxT+BmdwC9r/OmL6lSPmM8U3y9tAmt8Ua01S69BF5nPkO8XnUDZGjf5ojrUbXjooFLoqB6L6AQeWcu+MUV9ij1m84GTsWIFKuxZqlbbqUo7KxrH+QWfeaAnqeJGrg2irlFpEDwhx54VuQYRAR5XzO8veWOkOf4V0WZwz/L2uKL4FXy2wRAo7hTuidi9iAxTHync0RPST4MPgKIX5nrN2SXiZrgPCj2cLoNePAoFWr0ZucE/U1f/t6aTXrEegIs+ioMwI20WtOmun4KLjxQ70vS6nrvJMLiA7hroBUWh0/IxvIFBkIdeSLfDcnBxj+Icf7vaj3Um0QId8APy4jmCA24WeTl3BXwDjLWRtsAGWA/aF3/gN7yFF9yx8mQUXoH/E9EVRgqS6vcAAAAASUVORK5CYII=\")}.awcore-toggle-buttons-container .awcore-disabled-button{pointer-events:none;opacity:0.4}.awcore-toggle-buttons-container .awcore-control-button .awcore-on:hover,.awcore-toggle-buttons-container .awcore-control-button .awcore-disabled:hover{background-color:#4a5764}.wcag .closeDrawerItem:focus,.wcag .awcore-spinner-button:focus,.wcag .awcore-toggle-buttons-container .awcore-control-button:focus,.wcag .awcore-control-button:focus,.wcag .awcore-call-me-div:focus,.wcag .awcore-hide-self-video-container:focus,.wcag .awcore-cancel-text:focus,.wcag .awcore-cancel-sub-text:focus{-webkit-box-shadow:inset 0 0 1px 0.5px #ffc33e, inset 0 0 2px 1px #fff;box-shadow:inset 0 0 1px 0.5px #ffc33e, inset 0 0 2px 1px #fff}.wcag .awcore-cancel-text:focus,.wcag .awcore-cancel-sub-text:focus{display:inline}.awcore-disconnect-call-container{z-index:5;padding:20px}.awcore-disconnect-call-container .awcore-disconnect-button{display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.awcore-self-container{z-index:5;position:absolute;width:20%;min-width:120px;max-width:350px;top:88px;right:24px}[dir=\'rtl\'] .awcore-self-container{right:unset;left:24px}\@media only screen and (max-width: 768px){.awcore-self-container{min-width:90px}}.awcore-self-container.active .awcore-local-view video{-webkit-box-shadow:0px 2px 20px rgba(0,0,0,0.5);box-shadow:0px 2px 20px rgba(0,0,0,0.5)}.awcore-local-video{bottom:0;right:0;width:100%;height:100%;pointer-events:none}.awcore-local-view.awcore-local-participant-wrapper.awcore-hidden{display:block !important;opacity:0 !important}.awcore-local-view-name{position:absolute;left:20px;bottom:20px;width:52px;height:26px;opacity:0.4;border-radius:28px;background-color:#000000;text-align:center;padding-top:5px;overflow:hidden}.awcore-connect-display-main{font-size:20px;font-weight:600;color:#ffffff;margin-bottom:12px}\@media only screen and (max-width: 768px){.awcore-connect-display-main{margin:24px 0 0 0;font-size:14px;margin-bottom:6px}}.awcore-connect-display-subtext{font-size:16px;font-weight:normal;color:#ffffff}\@media only screen and (max-width: 768px){.awcore-connect-display-subtext{font-size:12px}}.awcore-control-button.awcore-settings-div{border:none;background-color:transparent;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAkJJREFUWAntljtLXEEUgO/VEJS4GEwUUVeLEPCBYCUWgtW2aYRIzE9IaSpNIJCQIj9ALOzE/2BpuY1YBLQQXazURBCiEtSY9Tuws05O5gz7QhLwwMfMec+de+/cmyT38r/uQLFYXAEnp0wm7uxaaPYALlz30vi+lgU0xZIo/AheQIuKG0N/qGzDSk/I64M2ba9IJ7ETNkBkEwahHd5AAbRcYvgCWWiGd3AFu9BTUVMXREIbbIMv1yi/fIMxl7hj5dtC73D1/dG6BVmCBv1A5hLbrGwhVeKeKMcQ+rSyxVVWvKSuoh5139oBcxUkyG34aXRdxj4BmRIyF5slU2Yjy0GlHvitKh6i5yI5OfwSo2XAyjHtVPigq6CbzV0hiQnkzTt/dCSxG6ZBmsvp5styNNlzkqRvxxE2OU+6vbC/pwQcgCUVH7UUkGfCknW/c+orkuHrap5J0/RM2YIqZTI4fgSdSVKkTvn1L0+MYN/8x2J9Rz1zvYB8pNhIxKddsVh7F9m6FJ7BDOjnoZ6HUL6cq7AA43q1QZ3AOdBS62v4MdgkZqSzvJJaajmI5IsYf/1CCyFpFPRJ6BZUzVH8nST9rIVa3tpIaIWvrlsDxoXb6hXMaPiqAU39EnIbgj8l1tassc5ttdZLpVej7hB8Uk2C/M/1wl7pMhYZ5fPcD5/hHLR8w/AWumASCiAiv3VPq2rugkl8DKGfzU/Ytcy6PBlxSu5rkGO5sULRl6DleWO7RKrRWX5WZMud5JlYz1Ok0r3rH9iBG/Sqg5ve1aWlAAAAAElFTkSuQmCC\");background-color:#4a5764;border:1px solid #4a5764 !important}.wcag .awcore-control-button.awcore-settings-div{background-color:#5b6b7b}.awcore-control-button.awcore-settings-div.open{background-image:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2232%22 height%3D%2232%22 viewBox%3D%220 0 32 32%22%3E    %3Cg fill%3D%22%23FFF%22 fill-rule%3D%22evenodd%22 transform%3D%22rotate(45 12.586 17.414)%22%3E        %3Crect width%3D%222%22 height%3D%2228%22 x%3D%2213%22 rx%3D%221%22%2F%3E        %3Crect width%3D%2228%22 height%3D%222%22 y%3D%2213%22 rx%3D%221%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-settings-chevron{margin-left:15px;width:24px;height:12px;position:absolute;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAYAAAB4MH11AAAAAXNSR0IArs4c6QAAALlJREFUOBFj+P//fwkQ0wI8BBqqwAACQEYVlW14AjRPGWw4jAAKNFDJkudAc9Rg5qLQQIk2Ci15BdSvhWIoOgeooIdMS94A9emim4eVD1Q4kURL3gHVG2I1DJcgUMN0Ii35AFRnisscnOJATYxAPIeAJZ+A8pY4DSEkAdTMBMSLcFjyBShuS8gMgvJAQ5iBeDmaJd+AfEeCmolVADSMBYjXQC35AaRdidVLtDqgoaxAvAqIvYjWBFQIAJQEbVXDb8whAAAAAElFTkSuQmCC\") no-repeat}[dir=\'rtl\'] .awcore-settings-chevron{margin-left:unset;margin-right:15px}.awcore-participant-title-container-bg{border-radius:4px;background-color:rgba(0,0,0,0.54);padding:8px 16px;margin-bottom:12px}.awcore-participant-title-container{position:absolute;top:16px;left:16px;max-width:calc(80% - 115px);text-align:initial;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;z-index:5}[dir=\'rtl\'] .awcore-participant-title-container{left:unset;right:16px}.wcag .awcore-participant-title-container{margin-left:10px;margin-top:0px;margin-bottom:0px;width:342px;height:65px;border-radius:4px;background-color:rgba(0,0,0,0.54);bottom:14px;padding-left:8px}h3.awcore-participant-title{font-size:20px;font-weight:bold;margin-top:1px;margin-bottom:3px;line-height:1.2}.wcag h3.awcore-participant-title{margin-bottom:0px;margin-top:8px;padding-left:8px}h4.awcore-participant-subtitle{font-size:14px;line-height:1.1}.wcag h4.awcore-participant-subtitle{bottom:15px !important;padding-left:8px}.spacer{display:inline-block;padding:0 2px}.awcore-disconnect-button{height:44px;border-radius:4px;border:none;background-color:#fd6b6b;font-size:20px;font-weight:bold;text-align:center;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);padding:0 20px}.awcore-disconnect-button:hover{background-color:#f14343;cursor:pointer}.awcore-muted-icon{background:url(\"data:image/png;base64,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\") no-repeat center center;width:40%;height:40%;background-size:contain;-ms-flex-line-pack:center;align-content:center;margin:auto;position:relative;top:25%}.awcore-call-me-control-container{display:-ms-flexbox;display:flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.awcore-call-me-div{height:56px;border-radius:4px;border:none;background-color:#25abfd;font-size:14px;font-weight:bold;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);padding:0 16px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-width:150px}.awcore-call-me-div:hover{background-color:#acd7f2}.awcore-call-me-div:hover:not(.awcore-disabled){cursor:pointer}.awcore-call-me-div .not-calling,.awcore-call-me-div .not-calling-problems{display:block}.awcore-call-me-div .not-calling-problems{font-weight:lighter}.awcore-call-me-div .calling{display:none;text-align:center}.awcore-call-me-div.awcore-call-me-disabled{-webkit-box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.5);box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.5);background-color:#acd7f2}.awcore-call-me-div.awcore-call-me-active .not-calling,.awcore-call-me-div.awcore-call-me-active .not-calling-problems{display:none}.awcore-call-me-div.awcore-call-me-active .calling{display:block}.awcore-spinner-active .awcore-call-me-div,.awcore-requesting-browser-permission .awcore-call-me-div{display:none}.awcore-disabled{background-color:#4a5764 !important;border:1px solid #4a5764 !important}.wcag .awcore-disabled{background-color:#5b6b7b !important}#awcore-callMeDiv.awcore-call-me-disabled{cursor:not-allowed !important;background-color:transparent !important;border-width:0px !important}.awcore-self-container .awcore-local-view{-webkit-filter:blur(0);filter:blur(0);opacity:1;-webkit-transition:opacity .5s, -webkit-filter .33s;transition:opacity .5s, -webkit-filter .33s;transition:filter .33s, opacity .5s;transition:filter .33s, opacity .5s, -webkit-filter .33s}.awcore-self-container:hover .awcore-local-view{-webkit-filter:blur(10px);filter:blur(10px);opacity:0.8;-webkit-transition:opacity .5s, -webkit-filter .33s;transition:opacity .5s, -webkit-filter .33s;transition:filter .33s, opacity .5s;transition:filter .33s, opacity .5s, -webkit-filter .33s}.awcore-hide-self-video.awcore-show-self{display:inline;background-color:#4a5764;border:2px solid #4a5764;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAndJREFUWAntlbtLXEEUh11X8EHEykYEbdZAEEEljakWCeIDXCSxVv+KYG9hYZUiVSCx8D8IVmGbdCFNfIBauNuIiwgmAQtfN9/vOkfm7r3h6kLE4h74ODNnzsyce+bM3KamTLIMZBl4ihkIguALfIPu/x1fyz826ML+CsoEUczlcifyoz2ImoZx6IMekBxBFb7CJv4/0Y2Lvhy2QSLdr9XQs3ABafIdh3nINxwFkxXEAUjOYcAFUaRdgj7ogGdQANk+QA1MftAYbSgIJi7Dpa2EPoTUmsCnFZagApIrWL53EDi3wEeQ3MB72FUH0XGEQaD11VU4gg3o9Tehr+ysgtaQyCf9SHCyzc9oz7i0+zWxh92Ow6+JU+yRINzcCey/QLLuBxlr47AQut1OeOk7YPeDUE0U3AbPaZdBsuHPsTb2YdAHSZbMHtMMboUuQTAXG8TAmIKwuthXX35oBaHboeuYKIwpW5ID36HZ79Buc/2rOnvYde/BqRtTBsos2I19j/ZbuHRjSSrnjIlrh2MspuqVKF3DSatgVzFJft+qQJmw4wh1/TzGR8DqYLF+PNLHcR0kCmIiMkgHWy+o4Hy5eycS/CdxtM0/14/H+jjrGtpX6grpKnX4jvQVhHyOwWpCtyOsCfnSboc1uAbJJ0i/hrYRznqI9IhIKqDjabVx09j82+G/E68ZU2GKd2A1YFPTNZNGQc+pSY2GntsS6CHSM9wJY6BHSfIH7J2Yot3YU2zhsUAe5kE/mPuKauTuOGytJP2gtLDoEItMgv87vqZfgSpswxtQBnag6K4uzUcSfTnYr3zlkbaNbuOCWEG/iI5kvSwDWQbiGfgLQOBLBDb81hwAAAAASUVORK5CYII=\") !important;cursor:pointer}.awcore-hide-self-video:active{border:solid 2px #ffc33e !important}.awcore-hide-self-video-container{position:absolute;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.awcore-hide-self-video{background:#25abfd url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWVJREFUWAntlUFKw1AURRsrCMUVSMGRU6F0CQ6KE3XkArqMrkBX4LyDLkFHXYE4cdqJTgoOBJ2L8Zzyf0iCba21RDQXLnl5/76Xl5ufpNGoUTtQO/DfHUhWMSBN00P0x/AI7sM9KKbwEY7hTZIk9xx/Bly0Cc/hLfwq1FrTXGsKGnThHYx4IriCZ/AA7gYam3NNTYS13W8NQeEAvoVODxz7cGdZMzVBa42wx2BZXbaOWMtHULzDC9jKBASct6GaaaBxu6RpkbuE9hBqlj8SREPV4AX28k2NyXnxZ1iGucIQQd8jby8xLPcrnCPQZmFBp7AYTsh7J+IaOow0FqM5NR3W4hD9zzSzHKKJXcDJPBFr2i6yuzWeZVhbUHcaNJO8Zit/UnnMhNU+Ah1giE1swtdg/+JNGAbYRhw32rqvoa/waq9h3AcUVvMhigMEN6r7FMdBcGKjP6Pf/zuOTtTH2oHagT/rwAd97fRlZeeYawAAAABJRU5ErkJggg==\") center center no-repeat;border:2px solid #25abfd;height:60px;width:60px;border-radius:50%;pointer-events:auto;text-align:center;cursor:pointer;margin-top:-25px;z-index:5;display:none}.awcore-self-container.loaded:hover .awcore-hide-self-video{display:inline !important}.awcore-remote-video-0:-webkit-full-screen{width:100%;height:100%}.awcore-settings-content-wrapper{background-color:#FFF;border:none;color:#000000;padding:15px 15px 0;position:absolute;width:-webkit-max-content;width:-moz-max-content;width:max-content;bottom:135px;z-index:10;text-align:left}[dir=\'rtl\'] .awcore-settings-content-wrapper{text-align:right}.awcore-settings-content-wrapper h2{font-size:20px;font-weight:600}.awcore-settings-content-wrapper h3{font-size:14px;font-weight:400;margin-bottom:20px}.awcore-settings-device-separator{border:solid 1px #dddddd;margin:0}.awcore-settings-content-header-title{height:18px;font-size:12px;font-weight:600;line-height:1.5;color:#99a0a7;margin-bottom:10px;padding-left:5px;margin-top:0px;text-align:left}.awcore-settings-content-div{position:relative;margin-bottom:25px}.awcore-settings-content-div:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2212%22 height%3D%227%22 viewBox%3D%220 0 12 7%22%3E    %3Cpath fill%3D%22%23959DA6%22 fill-rule%3D%22evenodd%22 d%3D%22M11.027.67a.353.353 0 0 1 0 .513l-5.201 5.2a.353.353 0 0 1-.513 0l-5.201-5.2a.353.353 0 0 1 0-.513L.67.112a.353.353 0 0 1 .513 0l4.386 4.386L9.955.112a.353.353 0 0 1 .514 0l.558.558z%22%2F%3E%3C%2Fsvg%3E\");right:11px;top:15px;padding:10px 0 0 8px;position:absolute;pointer-events:none}[dir=\'rtl\'] .awcore-settings-content-div:after{right:unset;left:11px}.awcore-settings-content-div::-ms-expand{display:none}.awcore-settings-content-div select{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:100%;height:35px;font-size:16px;line-height:1.75;border-top:0;border-right:0;border-left:0;-ms-word-break:normal;word-break:normal;padding:0 35px 0 10px}[dir=\'rtl\'] .awcore-settings-content-div select{padding:0 10px 0 35px}.awcore-settings-content-div label{margin:0;vertical-align:bottom;padding:0 0 0 10px}[dir=\'rtl\'] .awcore-settings-content-div label{padding:0 10px 0 0}.awcore-modal-container{position:absolute;top:0;width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background:rgba(0,0,0,0.5);z-index:1000}.awcore-modal{background:white;border-radius:5px;color:black;overflow:hidden}.awcore-modal-footer{padding:0 50px 50px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.awcore-modal-header{background:-webkit-gradient(linear, left top, right top, from(#25abfd), to(#0b77cb));background:linear-gradient(to right, #25abfd, #0b77cb);height:77px;color:#fff;font-size:24px;text-shadow:0 1px 1px rgba(0,0,0,0.4);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:0 25px}.awcore-modal-body{padding:50px}.awcore-modal button{min-width:131px;margin:0 10px;height:44px;border-radius:4px;border:none;background-color:#0b77cb;font-size:20px;font-weight:bold;text-align:center;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);cursor:pointer}.awcore-modal button.awcore-green-btn{background-color:#66d448}.awcore-modal button.awcore-green-btn:hover{background-color:#5bc23e}.awcore-modal button:hover{background-color:#25abfd}.awcore-modalClose{background:url(data:image/png;base64,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) no-repeat center;background-size:cover;width:44px;height:44px}.awcore-modalClose:hover{opacity:.5;cursor:pointer}[dir=\'rtl\'] .awcore-modalClose{left:8px;right:unset}.awcore-browser-permissions{z-index:10}.awcore-browser-permissions p+p{margin-top:20px}.awcore-browser-permissions .awcore-modal{text-align:center;width:600px}.awcore-browser-permissions .awcore-modal h1{font-size:36px;color:#5b6b7b;font-weight:300;margin-bottom:.58em}.awcore-browser-permissions .awcore-modal p{margin-bottom:0;font:inherit;color:#313336}.awcore-browser-permissions .awcore-error-icon{margin-bottom:30px}.awcore-browser-permissions .awcore-wide-button{margin-top:36px;min-width:160px}.awcore-cancel-text{text-decoration:underline;font-size:14px;color:rgba(255,255,255,0.75);cursor:pointer}.awcore-cancel-sub-text{font-size:12px}.awcore-dialog-icon{width:72px;height:72px;display:inline-block;background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2272%22 height%3D%2273%22 viewBox%3D%220 0 72 73%22%3E    %3Cg fill%3D%22%2325ABFD%22 fill-rule%3D%22nonzero%22%3E        %3Cpath d%3D%22M36 72.5c19.882 0 36-16.118 36-36S55.882.5 36 .5 0 16.618 0 36.5s16.118 36 36 36zm0-2c-18.778 0-34-15.222-34-34s15.222-34 34-34 34 15.222 34 34-15.222 34-34 34z%22%2F%3E        %3Cpath d%3D%22M20 26a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-6.5 2h45v2h-45v-2zM25 26a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z%22%2F%3E        %3Cpath d%3D%22M59 44.495h-2V23a2 2 0 0 0-2-2H17a2 2 0 0 0-2 2v27a2 2 0 0 0 2 2h22v2H17a4 4 0 0 1-4-4V23a4 4 0 0 1 4-4h38a4 4 0 0 1 4 4v21.495z%22%2F%3E        %3Cpath d%3D%22M43.02 36.2v19.268c0 1.356.49 1.384 1.298.577 1.673-1.385 4.413-3.606 4.413-3.606s2.019 4.587 2.942 6.692c.375.865.836 1.039 1.413.721.433-.173.952-.375 1.356-.548.606-.173.663-.634.375-1.327-.894-2.105-2.971-6.547-2.971-6.547h6.115c1.24 0 1.327-.375.49-1.212-3-3.115-10.845-11.22-14.047-14.508-1.096-1.068-1.384-.952-1.384.49z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat}.awcore-modal-container.awcore-modal-container-flat .awcore-modal{border-radius:10px}.awcore-modal-container.awcore-modal-container-flat .awcore-modal-footer{padding:15px 50px 15px 50px;height:120px;background-color:#f9f9f9;color:#313336;font-size:14px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-direction:column;flex-direction:column}.awcore-button.awcore-button-inverted{color:#1774cc;border:1px solid #1774cc;padding:2px 30px;font-weight:bold;border-radius:4px;background-color:transparent;cursor:pointer}.awcore-button.awcore-button-inverted.awcore-disabled{background-color:transparent !important;border:1px solid #1774cc !important;opacity:.3;cursor:not-allowed;pointer-events:none;-webkit-transition-duration:.8s;transition-duration:.8s}/*!\n * American Well Core Web SDK\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-spinner-container{width:100%;height:100%;text-align:center;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);-webkit-transition:top .5s;transition:top .5s;max-width:550px;height:200px;text-align:center;position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);transition:top .5s}.awcore-spinner-container.awcore-call-active{display:none !important}.awcore-spinner-container .awcore-wait-image-box{width:120px;height:120px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-left:auto;margin-right:auto;-webkit-transition:opacity 1s;transition:opacity 1s}.awcore-spinner-container .awcore-wait-image-box .awcore-loader{padding:0px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex-flow:row wrap;flex-flow:row wrap;margin-bottom:100px;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s, -webkit-transform .3s}\@media screen and (max-width: 768px){.awcore-spinner-container .awcore-wait-image-box .awcore-loader{margin:0 0 0 0}}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner{position:relative;text-align:center;margin:0 auto;padding:0;width:200px;height:200px}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner:before{content:\'\';display:block;padding-top:100%}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner .awcore-loading-icon{position:absolute;top:76px;left:66px;width:70px;height:auto;stroke-width:1.5px}\@media only screen and (max-width: 768px){.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner{width:72px;height:72px}}.awcore-loading-icon-static-camera,.awcore-loading-icon-static-waves,.awcore-loading-icon-static-nodes{position:absolute;top:66px;left:66px;width:72px;height:auto;display:none}\@media only screen and (max-width: 768px){.awcore-loading-icon-static-camera,.awcore-loading-icon-static-waves,.awcore-loading-icon-static-nodes{top:24px;left:24px;width:24px}}.awcore-spinner-style-waves .awcore-loading-icon-static-waves{display:initial}.awcore-spinner-style-waves .awcore-circle-svg{stroke:#9485ED}.awcore-spinner-style-nodes .awcore-loading-icon-static-nodes{display:initial}.awcore-spinner-style-nodes .awcore-circle-svg{stroke:#FCD54E}.awcore-spinner-style-camera .awcore-loading-icon-static-camera{display:initial}.awcore-spinner-style-camera .awcore-circle-svg{stroke:#25ABFD}.awcore-circle-svg{-webkit-animation:loading-spinner-rotate 2s linear infinite;animation:loading-spinner-rotate 2s linear infinite;-webkit-transform-origin:center center;transform-origin:center center;position:absolute;top:0;bottom:0;left:0;right:0}.awcore-circle-stroke-static{stroke-dasharray:1, 200;stroke-dashoffset:0;-webkit-animation:loading-spinner-dash 1.75s ease-in-out infinite;animation:loading-spinner-dash 1.75s ease-in-out infinite;stroke-linecap:round;stroke-width:1.5px}.awcore-spinner-button{min-width:131px;height:44px;border-radius:3px;border:none;background-color:#25abfd;font-size:20px;font-weight:bold;text-align:center;text-decoration:none;color:#ffffff;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);box-shadow:0 2px 6px 0 rgba(0,0,0,0.2);padding:0 10px;margin:0 8px}.awcore-spinner-button:hover{background-color:#13a3fc;cursor:pointer}\@media screen and (max-width: 768px){.awcore-spinner-button{width:148px;height:34px;font-size:16px}}\@media screen and (max-width: 420px){.awcore-spinner-button{width:100%}}.awcore-spinner-button.awcore-disabled{pointer-events:none;background-color:#25abfd !important;border:none !important;cursor:not-allowed;opacity:.5;-webkit-transition-duration:.8s;transition-duration:.8s}.awcore-spinner-buttons-div{padding:25px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.awcore-spinner-buttons-div .awcore-spinner-button{display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.awcore-spinner-buttons-div div:first-child{margin-bottom:16px}.awcore-cancel-waiting-button-div{padding-top:40px}.awcore-cancel-waiting-button-div.awcore-spinner-ext{padding-top:15px}\@media only screen and (max-width: 768px){.awcore-cancel-waiting-button-div.awcore-spinner-ext{padding-top:5px}}.awcore-cancel-waiting-button{width:155px;height:34px;font-size:16px;font-weight:bold;font-style:normal;font-stretch:normal;line-height:normal;letter-spacing:normal;text-align:center;background:inherit;border-radius:3px;border:solid 1px #979797;color:rgba(255,255,255,0.9);background-color:#25abfd}.awcore-cancel-waiting-button:hover{background-color:grey}.awcore-permission-ivr-wrapper .awcore-spinner-button{display:inline-block;padding:8px 16px}\@media only screen and (max-height: 525px){.awcore-spinner-container .awcore-wait-image-box .awcore-loader{margin-bottom:22px}.awcore-spinner-container .awcore-wait-image-box .awcore-loader .awcore-loading-spinner{-webkit-transform:scale(0.66);transform:scale(0.66)}}\@media only screen and (max-height: 420px){.awcore-spinner-container .awcore-wait-image-box{opacity:0;-webkit-transition:opacity 1s;transition:opacity 1s}}\@-webkit-keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@keyframes loading-spinner-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\@-webkit-keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}\@keyframes loading-spinner-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:89, 200;stroke-dashoffset:-35px}100%{stroke-dasharray:89, 200;stroke-dashoffset:-124px}}.awcore-hidden{display:none !important}.awcore-invisible{visibility:hidden !important}.awcore-phone-only-mode .awcore-spinner-container,.awcore-phone-only-mode .awcore-self-container,.awcore-phone-only-mode .awcore-remotevideo-default,.awcore-phone-only-mode .awcore-video-controls-container{display:none}.awcore-phone-only-mode .awcore-phone-only-container{max-width:550px;height:200px;text-align:center;position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);-webkit-transition:top .5s;transition:top .5s;color:#fff}.awcore-phone-only-mode .awcore-phone-only-container .awcore-icon-calling{background-image:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22128%22 height%3D%22128%22 viewBox%3D%220 0 128 128%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%23BBB%22 stroke-width%3D%223%22 transform%3D%22translate(1.5 1.5)%22%3E        %3Cpath d%3D%22M34.698 32.888c2.56-2.56 10.301-2.99 10.358-1.634.06 1.355 6.974 16.375 7.033 17.73.06 1.356-4.56 5.97-5.908 7.324-1.34 1.337 9.033 13.063 9.23 13.28.221.196 11.944 10.571 13.284 9.232 1.348-1.349 5.965-5.966 7.318-5.911 1.356.062 16.38 6.976 17.732 7.035 1.356.06.928 7.794-1.634 10.36-2.19 2.189-13.529 10.136-33.247-4.058C56.7 85 53.276 82.15 48.083 76.959a.043.043 0 0 1-.01-.011c-.004 0-.006-.007-.011-.01l-.014-.01-.009-.012c-5.188-5.189-8.04-8.617-9.284-10.777-14.196-19.722-6.247-31.063-4.057-33.25%22%2F%3E        %3Cpath stroke-linecap%3D%22round%22 d%3D%22M65.41 31.96c7.114-.146 14.274 2.621 19.703 8.3 5.118 5.354 7.763 12.316 7.932 19.33M65.41 42.136c4.79.197 9.525 2.196 13.183 5.998 3.463 3.6 5.37 8.205 5.725 12.911M65.41 50.864c2.155.312 4.235 1.343 5.892 3.095a11.08 11.08 0 0 1 2.834 5.632%22%2F%3E        %3Ccircle cx%3D%2262.5%22 cy%3D%2262.5%22 r%3D%2262.5%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\");width:128px;height:128px;margin:0 auto}.awcore-phone-only-mode .awcore-phone-only-container .awcore-calling-heading{margin-top:25px;font-size:20px;font-weight:600}.awcore-phone-only-mode .awcore-phone-only-container .awcore-calling-subtext{font-size:16px;font-weight:normal;font-stretch:normal;margin-top:15px}\n\n.awcore-screenshare-button{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQRJREFUWAntVlEOgjAMBWO4g1eSO3gUvzmQ8UhwjPmqa0ImtIO14seaLAPavb29rg1NU+1oBUIIHcaAMWJYGuERbieeMQZZbpxiDRoBPvlVDNzoBIs+MhnFpUxXDNrpzME+78TOXfZEYBCDc1iKAIXOU+H64uUiAajjX6JSCuCjOva0oSV00rGFpXrCRSV0Sb8bvk8aAfkGGzAR74ABvgqR1QeW0qMiKwGc+sMVqARIgYnShZz0Stp83Ng4bTYP3okuChm/W84f5BCoCu4R+IbZs+ks8v/qfvMoPn0tw7kq1s9/3wdcShR3i0v+jb+qKgLTEuXqsZrVX3b/P6LV41fHjxR4Abu2z0VQNtiBAAAAAElFTkSuQmCC\")}.awcore-screenshare-button span{margin-left:-20px;margin-right:-20px;text-align:center}.awcore-screenshare-button-hidden{display:none !important}.awcore-screenshare-button-disabled{opacity:0.5}\n\n/*!\n * American Well Core Web SDK\n *\n * Copyright © 2020 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-tmc-lite-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;max-width:636px;-ms-flex-pack:center;justify-content:center;margin:auto;color:#313336}.awcore-tmc-lite-container label{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin-bottom:20px}.awcore-tmc-lite-container label span{padding:0 10px;font-size:14px;font-weight:600;color:#6e6e6e}.awcore-tmc-lite-container label select{font-size:16px;height:36px;border:none;border-bottom:1px solid #888888;max-width:460px;padding:0 15px 0 10px;appearance:none;-moz-appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgMTIgNyI+CiAgICA8cGF0aCBmaWxsPSIjOTU5REE2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4wMjcuNjdhLjM1My4zNTMgMCAwIDEgMCAuNTEzbC01LjIwMSA1LjJhLjM1My4zNTMgMCAwIDEtLjUxMyAwbC01LjIwMS01LjJhLjM1My4zNTMgMCAwIDEgMC0uNTEzTC42Ny4xMTJhLjM1My4zNTMgMCAwIDEgLjUxMyAwbDQuMzg2IDQuMzg2TDkuOTU1LjExMmEuMzUzLjM1MyAwIDAgMSAuNTE0IDBsLjU1OC41NTh6Ii8+Cjwvc3ZnPgo=\");background-position:100%;background-repeat:no-repeat;background-color:#ffffff;outline:none}[dir=\'rtl\'] .awcore-tmc-lite-container label select{padding:0 10px 0 15px;background-position:0}.awcore-tmc-lite-container .awcore-tmc-lite-video-container{background:rgba(0,0,0,0.19);position:relative;margin-bottom:30px;max-height:376px}.awcore-tmc-lite-container .awcore-tmc-lite-video-container video{width:100%;max-height:376px;min-height:160px;background:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik04MS44MjQgOTNINTAuMTc2QzQ3Ljg3IDkzIDQ2IDkxLjE1OCA0NiA4OC44ODZWNjEuMTE0QzQ2IDU4Ljg0MiA0Ny44NyA1NyA1MC4xNzYgNTdoMzEuNjQ4Qzg0LjEzIDU3IDg2IDU4Ljg0MiA4NiA2MS4xMTR2MjcuNzcyQzg2IDkxLjE1OCA4NC4xMyA5MyA4MS44MjQgOTNtMjAuODg5LTQuMjJsLTExLjk4LTcuMjY4YTEuNTMgMS41MyAwIDAgMS0uNzMzLTEuMzFWNjkuOGMwLS41MzguMjc4LTEuMDM1LjczMy0xLjMxMWwxMS45OC03LjI2OGMxLjAwNi0uNjEgMi4yODcuMTIzIDIuMjg3IDEuMzF2MjQuOTRjMCAxLjE4Ny0xLjI4IDEuOTItMi4yODcgMS4zMSIvPgogICAgICAgIDxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjcyLjUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=\") no-repeat center}.awcore-tmc-lite-container hr{width:100%;border-top:solid 1px #b1b1b1;margin-bottom:30px}.awcore-tmc-lite-container .awcore-tmc-lite-microphone-error-box,.awcore-tmc-lite-container .awcore-tmc-lite-camera-error-box{background:#e0f0ff;padding:20px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-size:16px;color:#313336;-ms-flex-align:start;align-items:flex-start;margin-bottom:20px}.awcore-tmc-lite-container .awcore-tmc-lite-microphone-error-box .awcore-tmc-lite-error-header,.awcore-tmc-lite-container .awcore-tmc-lite-camera-error-box .awcore-tmc-lite-error-header{font-weight:600}.awcore-tmc-lite-container .awcore-tmc-lite-buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.awcore-tmc-lite-container .awcore-tmc-lite-buttons .awcore-tmc-lite-sub-buttons{display:-ms-flexbox;display:flex}.awcore-tmc-lite-container .awcore-tmc-lite-buttons .awcore-tmc-lite-sub-buttons .awcore-tmc-lite-link-like{background:none;border:none;color:#009cff;text-decoration:underline}.awcore-tmc-lite-container .awcore-tmc-lite-button{color:#ffffff;border:none;-webkit-box-shadow:none;box-shadow:none;background:#25abfd;border-radius:4px;font-weight:600;font-size:16px;height:34px;padding:0 29px;margin-top:15px}.awcore-tmc-lite-container .awcore-tmc-microphone-meter{max-width:300px;height:23px;border-radius:0;margin-top:10px;margin-bottom:15px}.awcore-tmc-lite-container .awcore-tmc-microphone-meter .awcore-tmc-microphone-meter-bar{border-radius:0;width:35px;height:15px}.awcore-tmc-lite-container .awcore-tmc-microphone-meter-description{margin-bottom:20px;font-size:16px}\n\n/*!\n * American Well Core Web SDK\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */.awcore-tmc-container{width:100%;height:100%;display:-ms-flexbox;display:flex;text-align:initial}.awcore-tmc-container h3{font-size:20px}.awcore-tmc-drawer{-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,0.5);box-shadow:0 2px 6px 0 rgba(0,0,0,0.5);width:508px;-ms-flex-negative:0;flex-shrink:0;padding:24px;background-color:white;z-index:1;overflow-y:auto;height:100%}.awcore-tmc-drawer-header{margin-bottom:40px}.awcore-tmc-drawer-header h3{font-size:20px;font-weight:600;color:#313336;vertical-align:middle;margin-top:7px}.awcore-tmc-progress-container{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;border-radius:4px;border:solid 1px #e9e9e9;background-color:#f9f9f9;padding:0 26px 5px;font-size:12px;white-space:nowrap;margin:5px 0;height:75px}.awcore-tmc-progress-container hr{margin-bottom:30px;border-top:none;border-bottom:solid 1px #d8d8d8;width:40px}.awcore-tmc-progress-container div{cursor:pointer}.awcore-tmc-progress-back div:hover{opacity:0.5}.awcore-tmc-step-title,.awcore-tmc-progress-back{display:inline-block}.awcore-tmc-step{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;width:24px;color:#5b6b7b}.awcore-tmc-step:hover,.awcore-tmc-current-step{color:#313336}.awcore-tmc-step span{position:absolute;visibility:hidden;width:120px;background-color:black;color:#fff;text-align:center;padding:5px 0;bottom:53px}.awcore-tmc-step:hover span{visibility:visible}.awcore-tmc-step span::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-8px;border-width:8px;border-style:solid;border-color:black transparent transparent transparent}.awcore-tmc-step-camera:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22%2386919C%22 fill-rule%3D%22evenodd%22%3E        %3Cpath d%3D%22M14.434 19H2.566C1.701 19 1 18.283 1 17.4V6.6C1 5.716 1.701 5 2.566 5h11.868C15.3 5 16 5.716 16 6.6v10.8c0 .883-.701 1.6-1.566 1.6M22.085 17.906l-4.792-3.115A.667.667 0 0 1 17 14.23V9.77c0-.23.111-.443.293-.56l4.792-3.116c.403-.261.915.053.915.562v10.689c0 .508-.512.822-.915.56%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-camera:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22%235B6B7B%22 fill-rule%3D%22evenodd%22%3E        %3Cpath d%3D%22M14.434 19H2.566C1.701 19 1 18.283 1 17.4V6.6C1 5.716 1.701 5 2.566 5h11.868C15.3 5 16 5.716 16 6.6v10.8c0 .883-.701 1.6-1.566 1.6M22.085 17.906l-4.792-3.115A.667.667 0 0 1 17 14.23V9.77c0-.23.111-.443.293-.56l4.792-3.116c.403-.261.915.053.915.562v10.689c0 .508-.512.822-.915.56%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-camera.awcore-tmc-step-on:hover:after,.awcore-tmc-step-camera.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22%231296E7%22 fill-rule%3D%22evenodd%22%3E        %3Cpath d%3D%22M14.434 19H2.566C1.701 19 1 18.283 1 17.4V6.6C1 5.716 1.701 5 2.566 5h11.868C15.3 5 16 5.716 16 6.6v10.8c0 .883-.701 1.6-1.566 1.6M22.085 17.906l-4.792-3.115A.667.667 0 0 1 17 14.23V9.77c0-.23.111-.443.293-.56l4.792-3.116c.403-.261.915.053.915.562v10.689c0 .508-.512.822-.915.56%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-microphone:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Crect width%3D%226%22 height%3D%2213%22 x%3D%229%22 y%3D%222%22 fill%3D%22%2386919C%22 rx%3D%223%22%2F%3E        %3Cpath stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M6 12a6 6 0 1 0 12 0M12 18v4%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-microphone:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%235B6B7B%22 stroke-width%3D%222%22%3E        %3Crect width%3D%224%22 height%3D%2211%22 x%3D%2210%22 y%3D%223%22 fill%3D%22%235B6B7B%22 rx%3D%222%22%2F%3E        %3Cpath stroke-linecap%3D%22round%22 d%3D%22M6 12a6 6 0 1 0 12 0M12 18v4%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-microphone.awcore-tmc-step-on:hover:after,.awcore-tmc-step-microphone.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%231296E7%22 stroke-width%3D%222%22%3E        %3Crect width%3D%224%22 height%3D%2211%22 x%3D%2210%22 y%3D%223%22 fill%3D%22%231296E7%22 rx%3D%222%22%2F%3E        %3Cpath stroke-linecap%3D%22round%22 d%3D%22M6 12a6 6 0 1 0 12 0M12 18v4%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-speaker:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath fill%3D%22%2386919C%22 stroke-linejoin%3D%22round%22 d%3D%22M5.113 8.871H2v6.636h3.113L9.38 19V5.378z%22%2F%3E        %3Cpath d%3D%22M18.976 5a9.9 9.9 0 0 1 3.048 7.158A9.896 9.896 0 0 1 19.292 19M16.248 6.83a7.826 7.826 0 0 1 2.083 5.33 7.823 7.823 0 0 1-1.881 5.1M13.53 8.62a5.83 5.83 0 0 1 1.19 3.538c0 1.214-.37 2.34-1 3.274%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-speaker:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%235B6B7B%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath fill%3D%22%235B6B7B%22 stroke-linejoin%3D%22round%22 d%3D%22M5.113 8.871H2v6.636h3.113L9.38 19V5.378z%22%2F%3E        %3Cpath d%3D%22M18.976 5a9.9 9.9 0 0 1 3.048 7.158A9.896 9.896 0 0 1 19.292 19M16.248 6.83a7.826 7.826 0 0 1 2.083 5.33 7.823 7.823 0 0 1-1.881 5.1M13.53 8.62a5.83 5.83 0 0 1 1.19 3.538c0 1.214-.37 2.34-1 3.274%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-speaker.awcore-tmc-step-on:hover:after,.awcore-tmc-step-speaker.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%231296E7%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath fill%3D%22%231296E7%22 stroke-linejoin%3D%22round%22 d%3D%22M5.113 8.871H2v6.636h3.113L9.38 19V5.378z%22%2F%3E        %3Cpath d%3D%22M18.976 5a9.9 9.9 0 0 1 3.048 7.158A9.896 9.896 0 0 1 19.292 19M16.248 6.83a7.826 7.826 0 0 1 2.083 5.33 7.823 7.823 0 0 1-1.881 5.1M13.53 8.62a5.83 5.83 0 0 1 1.19 3.538c0 1.214-.37 2.34-1 3.274%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-internet:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath d%3D%22M13 13l2-4M14 15a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 15z%22%2F%3E        %3Cpath d%3D%22M20.535 19A9.717 9.717 0 0 0 22 13.873C22 8.42 17.523 4 12 4 6.478 4 2 8.42 2 13.873A9.71 9.71 0 0 0 3.466 19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-internet:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%235B6B7B%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath d%3D%22M13 13l2-4M14 15a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 15z%22%2F%3E        %3Cpath d%3D%22M20.535 19A9.717 9.717 0 0 0 22 13.873C22 8.42 17.523 4 12 4 6.478 4 2 8.42 2 13.873A9.71 9.71 0 0 0 3.466 19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-internet.awcore-tmc-step-on:hover:after,.awcore-tmc-step-internet.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%231296E7%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22%3E        %3Cpath d%3D%22M13 13l2-4M14 15a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 15z%22%2F%3E        %3Cpath d%3D%22M20.535 19A9.717 9.717 0 0 0 22 13.873C22 8.42 17.523 4 12 4 6.478 4 2 8.42 2 13.873A9.71 9.71 0 0 0 3.466 19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-summary:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%224%22 cy%3D%226%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2210%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2214%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2218%22 r%3D%221%22 fill%3D%22%2386919C%22%2F%3E        %3Cpath stroke%3D%22%2386919C%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M8 6h12M8 10h8M8 14h12M8 18h8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-summary:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%224%22 cy%3D%226%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2210%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2214%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2218%22 r%3D%221%22 fill%3D%22%235B6B7B%22%2F%3E        %3Cpath stroke%3D%22%235B6B7B%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M8 6h12M8 10h8M8 14h12M8 18h8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-summary.awcore-tmc-step-on:hover:after,.awcore-tmc-step-summary.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%224%22 cy%3D%226%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2210%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2214%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Ccircle cx%3D%224%22 cy%3D%2218%22 r%3D%221%22 fill%3D%22%231296E7%22%2F%3E        %3Cpath stroke%3D%22%231296E7%22 stroke-linecap%3D%22round%22 stroke-width%3D%222%22 d%3D%22M8 6h12M8 10h8M8 14h12M8 18h8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-get_started.awcore-tmc-step-on:hover:after,.awcore-tmc-step-get_started.awcore-tmc-step-on:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Cpath stroke%3D%22%231296E7%22 stroke-width%3D%222%22 d%3D%22M21.9 18H2.1c-.607 0-1.1-.47-1.1-1.05V5.05C1 4.47 1.493 4 2.1 4h19.8c.607 0 1.1.47 1.1 1.05v11.9c0 .58-.493 1.05-1.1 1.05zM18 21H6%22%2F%3E        %3Cpath fill%3D%22%231296E7%22 d%3D%22M10 20h4v-3h-4z%22%2F%3E        %3Cpath stroke%3D%22%231296E7%22 stroke-linejoin%3D%22round%22 stroke-width%3D%222%22 d%3D%22M5 11h3.733l1.867 4 2.8-8 1.867 4H19%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-get_started:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%235BC23E%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step-get_started:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%2366D448%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-failed-icon:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%23FDB53E%22%2F%3E        %3Cpath fill%3D%22%23FFF%22 d%3D%22M10.5 5h3v9h-3zM10.5 16h3v3h-3z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-failed-icon:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%23EDA42F%22%2F%3E        %3Cpath fill%3D%22%23FFF%22 d%3D%22M10.5 5h3v9h-3zM10.5 16h3v3h-3z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-passed-icon:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%2366D448%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-step .awcore-tmc-step-passed-icon:hover:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E        %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2212%22 fill%3D%22%235BC23E%22%2F%3E        %3Cpath stroke%3D%22%23FFF%22 stroke-width%3D%223%22 d%3D%22M6 12l4 4 8-8%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\")}.awcore-tmc-progress-back{height:18px;width:18px;background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22%3E    %3Cpath fill%3D%22%23313336%22 fill-rule%3D%22nonzero%22 stroke%3D%22%23313336%22 d%3D%22M16 5.166L14.856 4 7 11.998 14.855 20 16 18.835l-6.711-6.836z%22%2F%3E%3C%2Fsvg%3E\") no-repeat center center;cursor:pointer;margin-right:15px}[dir=\'rtl\'] .awcore-tmc-progress-back{-webkit-transform:scaleX(-1);transform:scaleX(-1);margin-right:0;margin-left:15px}.awcore-tmc-step-failed,.awcore-tmc-failed .awcore-tmc-step-test{display:none}.awcore-tmc-failed .awcore-tmc-step-failed{display:initial}.awcore-tmc-microphone-meter{height:32px;width:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-radius:10px;border:solid 1px #d8d8d8;-ms-flex-align:center;align-items:center;padding:0 5px;margin:0}.awcore-tmc-microphone-meter>:first-child{border-radius:6px 0 0 6px}.awcore-tmc-microphone-meter>:last-child{border-radius:0 6px 6px 0}[dir=\'rtl\'] .awcore-tmc-microphone-meter>:first-child{border-radius:0 6px 6px 0}[dir=\'rtl\'] .awcore-tmc-microphone-meter>:last-child{border-radius:6px 0 0 6px}.awcore-tmc-microphone-meter-bar{height:20px;width:60px;background-color:#e6e6e6}.awcore-tmc-microphone-meter-bar-lit{background-color:#2fab0d}.awcore-tmc-content{-ms-flex-positive:1;flex-grow:1;display:-ms-flexbox;display:flex}.awcore-tmc-video{height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.awcore-tmc-blur{-webkit-filter:blur(15px);filter:blur(15px);opacity:.5}.awcore-tmc-no-video-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:#313336}.awcore-no-video-content-image{height:158px;width:100%;margin-bottom:25px;background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22158%22 height%3D%22158%22 viewBox%3D%220 0 158 158%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%23BBB%22 stroke-width%3D%223%22 transform%3D%22translate(2 2)%22%3E        %3Ccircle cx%3D%2277%22 cy%3D%2277%22 r%3D%2277%22%2F%3E        %3Cg transform%3D%22translate(38 50)%22%3E            %3Crect width%3D%2261%22 height%3D%2255%22 rx%3D%225%22%2F%3E            %3Cg stroke-linecap%3D%22round%22%3E                %3Cpath d%3D%22M20 17l21 21M41 17L20 38%22%2F%3E            %3C%2Fg%3E            %3Cpath d%3D%22M68.982 16.794l11.986-10.9a3 3 0 0 1 5.018 2.219v38.775a3 3 0 0 1-5.018 2.22L68.982 38.206a3 3 0 0 1-.982-2.22V19.013a3 3 0 0 1 .982-2.22z%22%2F%3E        %3C%2Fg%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-tmc-no-video-content{text-align:center;color:#ffffff}.awcore-tmc-no-video-content p{display:inline-block;width:340px}.awcore-tmc-internet-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1 1 auto;flex:1 1 auto;padding-top:30px}.awcore-tmc-internet-content iframe{-ms-flex:1 1 auto;flex:1 1 auto;border:0}.awcore-drawer-single-button-container,.awcore-drawer-multi-button-container{padding-top:30px;display:-ms-flexbox;display:flex}.awcore-drawer-single-button-container{-ms-flex-pack:center;justify-content:center}.awcore-drawer-multi-button-container{-ms-flex-pack:justify;justify-content:space-between}.awcore-drawer-content button{font-size:20px;border-radius:4px;text-align:center;color:#ffffff;background-color:#25abfd;background-repeat:no-repeat;background-position:center center;border:none;width:215px;height:40px}.awcore-drawer-content .awcore-drawer-content-ghost-button{background-color:white;color:#25abfd;font-size:16px;font-weight:bold;padding:5px 15px;width:initial;height:initial}.awcore-drawer-content{font-size:14px;line-height:1.3}.awcore-drawer-content.awcore-drawer-content-internet{width:445px}.awcore-drawer-content label{width:100%;font-weight:normal;color:unset}.awcore-drawer-content .awcore-drawer-content-details{padding:0 20px}.awcore-drawer-content h3{font-size:18px;font-weight:600;text-align:center}.awcore-drawer-content h4{font-size:14px;font-weight:bold}.awcore-tmc-troubleshoot{margin:15px 0 0}.awcore-drawer-content p{margin:18px 0 0}.awcore-drawer-content ul{padding-left:18px;margin:0}.awcore-drawer-content li{padding:10px 0}.awcore-drawer-content audio{margin:20px 0 0 0}.awcore-drawer-content-image{height:132px;margin-bottom:25px}.awcore-tmc-step{height:40px}.awcore-tmc-step-failed,.awcore-tmc-step-results-fail{text-align:left}.awcore-drawer-content-get-started .awcore-drawer-content-image{background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22132%22 height%3D%22132%22 viewBox%3D%220 0 132 132%22%3E    %3Cdefs%3E        %3ClinearGradient id%3D%22a%22 x1%3D%22132.34%25%22 x2%3D%22-15.812%25%22 y1%3D%22188.791%25%22 y2%3D%22-61.697%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22b%22 x1%3D%22239.947%25%22 x2%3D%22-99.472%25%22 y1%3D%223681.055%25%22 y2%3D%22-8690.039%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22c%22 x1%3D%22-297.925%25%22 x2%3D%22462.17%25%22 y1%3D%22-1127.507%25%22 y2%3D%22626.26%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22d%22 x1%3D%22179.437%25%22 x2%3D%22-52.148%25%22 y1%3D%22278.523%25%22 y2%3D%22-136.663%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E        %3ClinearGradient id%3D%22e%22 x1%3D%22100%25%22 x2%3D%220%25%22 y1%3D%22100%25%22 y2%3D%220%25%22%3E            %3Cstop offset%3D%220%25%22 stop-color%3D%22%234BC451%22%2F%3E            %3Cstop offset%3D%22100%25%22 stop-color%3D%22%231F93E2%22%2F%3E        %3C%2FlinearGradient%3E    %3C%2Fdefs%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 transform%3D%22translate(2 2)%22%3E        %3Cpath stroke%3D%22url(%23a)%22 stroke-width%3D%223%22 d%3D%22M68.4 46H3.6C1.612 46 0 44.455 0 42.55V3.45C0 1.545 1.612 0 3.6 0h64.8C70.388 0 72 1.545 72 3.45v39.1c0 1.905-1.612 3.45-3.6 3.45z%22 transform%3D%22translate(28 39)%22%2F%3E        %3Cpath stroke%3D%22url(%23b)%22 stroke-width%3D%223%22 d%3D%22M53 53H19%22 transform%3D%22translate(28 39)%22%2F%3E        %3Cpath fill%3D%22url(%23c)%22 d%3D%22M28 52.857h16v-7H28z%22 transform%3D%22translate(28 39)%22%2F%3E        %3Cpath stroke%3D%22url(%23d)%22 stroke-linejoin%3D%22round%22 stroke-width%3D%223%22 d%3D%22M41 62h12.267L59.4 76l9.2-28 6.133 14H87%22%2F%3E        %3Ccircle cx%3D%2264%22 cy%3D%2264%22 r%3D%2264%22 stroke%3D%22url(%23e)%22 stroke-width%3D%223%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-drawer-content-summary-failed .awcore-drawer-content-image{background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22128%22 height%3D%22128%22 viewBox%3D%220 0 128 128%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 transform%3D%22translate(0 11)%22%3E        %3Cpath fill%3D%22%23FDB53E%22 d%3D%22M61 36h6v36h-6z%22%2F%3E        %3Crect width%3D%227%22 height%3D%227%22 x%3D%2260.5%22 y%3D%2278%22 fill%3D%22%23FDB53E%22 rx%3D%223.5%22%2F%3E        %3Cpath stroke%3D%22%23FDB53E%22 stroke-width%3D%223%22 d%3D%22M68.27 7.005l55.096 90.393a5 5 0 0 1-4.27 7.602H8.904a5 5 0 0 1-4.27-7.602L59.732 7.005a5 5 0 0 1 8.538 0z%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-drawer-content-summary-success .awcore-drawer-content-image{background:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22132%22 height%3D%22132%22 viewBox%3D%220 0 132 132%22%3E    %3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22 stroke%3D%22%2366D448%22 transform%3D%22translate(2 2)%22%3E        %3Ccircle cx%3D%2264%22 cy%3D%2264%22 r%3D%2264%22 stroke-width%3D%223%22%2F%3E        %3Cpath stroke-width%3D%226%22 d%3D%22M37 62.697L55.848 82 91 46%22%2F%3E    %3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-tcm-select-container{position:relative;margin-bottom:25px}.awcore-tcm-select-container:after{content:url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2212%22 height%3D%227%22 viewBox%3D%220 0 12 7%22%3E    %3Cpath fill%3D%22%23959DA6%22 fill-rule%3D%22evenodd%22 d%3D%22M11.027.67a.353.353 0 0 1 0 .513l-5.201 5.2a.353.353 0 0 1-.513 0l-5.201-5.2a.353.353 0 0 1 0-.513L.67.112a.353.353 0 0 1 .513 0l4.386 4.386L9.955.112a.353.353 0 0 1 .514 0l.558.558z%22%2F%3E%3C%2Fsvg%3E\");right:11px;top:15px;padding:10px 0 0 8px;position:absolute;pointer-events:none}.awcore-tmc-audio-controls{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin:25px 0 0 0}.awcore-tmc-audio-controls button{background:#1774cc url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2216%22 height%3D%2216%22 viewBox%3D%220 0 16 16%22%3E    %3Cpath fill%3D%22%23FFF%22 fill-rule%3D%22evenodd%22 d%3D%22M4.467.135a1.029 1.029 0 0 0-.97-.025C3.212.265 3 .559 3 .879v13.329c0 .32.215.617.499.77a.845.845 0 0 0 .414.108c.166 0 .36-.046.505-.138l10.646-6.725a.887.887 0 0 0 .42-.744.862.862 0 0 0-.402-.74L4.467.134z%22%2F%3E%3C%2Fsvg%3E\") no-repeat center center;border:none;width:40px;height:40px;margin:0;padding:0;border-radius:40px;cursor:pointer}.awcore-tmc-audio-controls button.awcore-audio-stopped{background:#1774cc url(\"data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2216%22 height%3D%2216%22 viewBox%3D%220 0 16 16%22%3E    %3Crect width%3D%2212%22 height%3D%2212%22 x%3D%222%22 y%3D%222%22 fill%3D%22%23FFF%22 fill-rule%3D%22evenodd%22 rx%3D%221%22%2F%3E%3C%2Fsvg%3E\") no-repeat center center}.awcore-tmc-audio-controls button:focus{outline:none}.awcore-tmc-audio-controls progress{-webkit-appearance:none;width:285px;margin:0 10px;border:none;border-radius:50px;height:10px}.awcore-tmc-audio-controls progress::-webkit-progress-bar{background:#e6e6e6;border-radius:50px;height:10px}.awcore-tmc-audio-controls progress::-webkit-progress-value{border-radius:50px;background:#2fab0d;height:10px;-webkit-box-shadow:2pt 0 0 2pt #2fab0d;box-shadow:2pt 0 0 2pt #2fab0d;-webkit-transition:.4s linear;transition:.4s linear}.awcore-tmc-audio-controls progress::-moz-progress-bar{border-radius:50px;background:#2fab0d;height:10px;box-shadow:2pt 0 0 2pt #2fab0d;-moz-transition:.4s linear;transition:.4s linear}.awcore-tmc-audio-controls progress::-ms-fill{border-radius:50px;background:#2fab0d;height:10px;box-shadow:2pt 0 0 2pt #2fab0d;-ms-transition:.4s linear;transition:.4s linear}.awcore-tmc-audio-controls progress[value=\'0\']::-webkit-progress-value{visibility:hidden}[dir=\'rtl\'] .awcore-tcm-select-container:after{right:unset;left:11px}awcore-tcm-select-container::-ms-expand{display:none}.awcore-tcm-select-container select{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:100%;height:35px;font-size:14px;line-height:1.75;border-top:0;border-right:0;border-left:0;-ms-word-break:normal;word-break:normal;padding:0 35px 0 10px}.awcore-tcm-select-container label span{padding:0 10px}[dir=\'rtl\'] .awcore-tcm-select-container select{padding:0 10px 0 35px}\n\n/*/\n * American Well Visit Console Widget\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */\n.video-console .awcore-container {\n  height: 100%;\n  min-width: unset;\n  min-height: unset;\n}\n\n/* END VISIT BUTTON OVERRIDES */\n\n.video-console .awcore-top-pane-wrapper {\n  background: none; /* remove background gradient */\n}\n\n/* header dependent */\n.header-enabled .video-console .awcore-top-pane-wrapper {\n  pointer-events: initial !important;\n  opacity: 1 !important;\n}\n\n.header-enabled  .video-console .awcore-disconnect-call-container {\n  position: absolute;\n  top: -82px;\n  padding: 24px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n  left: 0;\n  right: 0;\n  z-index: 50;\n}\n\n.video-console .awcore-disconnect-call-container {\n  padding: 16px;\n}\n\n/* PARTICIPANT TITLE AND SUBTITLE OVERRIDES */\n.video-console .awcore-participant-subtitle,\n.header-enabled  .video-console .awcore-disconnect-button {\n  opacity: 1 !important;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.awcore-disconnect-button {\n  background: var(--amwell-visit-console-end-visit-button-color, #fd6b6b) !important;\n  border-radius: var(--amwell-visit-console-button-border-radius, 4px) !important;\n}\n\n.awcore-disconnect-button:hover {\n  background: var(--amwell-visit-console-end-visit-button-color-hover, #fd6b6b) !important;\n}\n\n.video-console .awcore-self-container {\n  right: 16px;\n}\n\n[dir=\'rtl\'] .video-console .awcore-self-container {\n  right: unset;\n  left: 16px;\n}\n\n.header-enabled .video-console .awcore-self-container {\n  top: 22px;\n}\n\n.video-console h4.awcore-participant-subtitle {\n  margin: 0;\n}\n\n.video-console .awcore-call-me-div {\n  min-width: unset;\n  white-space: nowrap;\n  background-color: var(--amwell-visit-console-button-color, #1774cc) !important;\n}\n\n.video-console .awcore-call-me-div:hover {\n  background-color: var(--amwell-visit-console-button-color-hover, #156bbd) !important;\n}\n\n.video-console .awcore-spinner-container {\n  max-width: 100%;\n}\n\n/* CONTROL BUTTON OVERRIDES */\n.awcore-settings-container .awcore-control-button,\n.awcore-toggle-buttons-container .awcore-control-button,\n.awcore-far-control-container .awcore-control-button {\n  background-color: #5b6b7b !important;\n}\n\n.awcore-toggle-buttons-container .awcore-camera-button.awcore-disabled,\n.awcore-toggle-buttons-container .awcore-mic-button.awcore-disabled,\n.awcore-toggle-buttons-container .awcore-screenshare-button.awcore-disabled,\n.awcore-toggle-buttons-container .awcore-mic-button.awcore-disabled:hover,\n.awcore-toggle-buttons-container .awcore-screenshare-button.awcore-disabled:hover,\n.awcore-toggle-buttons-container .awcore-camera-button.awcore-disabled:hover {\n  border: 1px solid #5b6b7b !important;\n  background-color: #5b6b7b !important;\n}\n\n.awcore-hide-self-video,\n.awcore-toggle-buttons-container .awcore-mic-button,\n.awcore-toggle-buttons-container .awcore-camera-button,\n.awcore-toggle-buttons-container .awcore-screenshare-button {\n  border: 1px solid var(--amwell-visit-console-video-button-color, #1774cc) !important;\n  background-color: var(--amwell-visit-console-video-button-color, #1774cc) !important;\n}\n\n\@media (any-hover: hover) {\n  .awcore-hide-self-video:hover,\n  .awcore-toggle-buttons-container .awcore-mic-button:hover,\n  .awcore-toggle-buttons-container .awcore-camera-button:hover {\n    border: 1px solid var(--amwell-visit-console-video-button-color-hover, #156bbd) !important;\n    background-color: var(--amwell-visit-console-video-button-color-hover, #156bbd) !important;\n  }\n}\n\n.awcore-hide-self-video:active,\n.awcore-toggle-buttons-container .awcore-mic-button.awcore-disabled:active,\n.awcore-toggle-buttons-container .awcore-mic-button:active,\n.awcore-toggle-buttons-container .awcore-camera-button:active,\n.awcore-toggle-buttons-container .awcore-camera-button.awcore-disabled:active {\n  background-color: var(--amwell-visit-console-video-button-color-hover, #156bbd) !important;\n  border: 2px solid #ffc33e !important;\n}\n\n/* SPINNER OVERRIDES */\n\n.video-console .awcore-loading-icon-static {\n  fill: var(--amwell-visit-console-button-color, #1774cc) !important;\n}\n\n.video-console .awcore-spinner-button {\n  background-color: var(--amwell-visit-console-button-color, #1774cc) !important;\n  border-radius: var(--amwell-visit-console-button-border-radius, 4px) !important;\n}\n\n\@media (any-hover: hover) {\n  .video-console .awcore-spinner-button:hover {\n    background-color: var(--amwell-visit-console-button-color-hover, #156bbd) !important;\n  }\n}\n\n/* MODAL OVERRIDES */\n.video-console .awcore-modal-container {\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.video-console .awcore-modal {\n  border-radius: 10px;\n  text-align: center;\n}\n\n.video-console .awcore-modal-header {\n  background: var(--amwell-visit-console-bar-color, #63788d) !important;\n  -ms-flex-pack: center;\n  justify-content: center;\n  position: relative;\n}\n\n.video-console .awcore-modal-header h5 {\n  font-size: 24px;\n  font-weight: 200;\n}\n\n.video-console .awcore-modal button,\n.video-console .awcore-modal .awcore-disregard-end-button,\n.video-console .awcore-modal .awcore-confirm-end-button {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  background: var(--amwell-visit-console-button-color, #1774cc) !important;\n  border-radius: var(--amwell-visit-console-button-border-radius, 4px) !important;\n  outline: none;\n}\n\n\@media (any-hover: hover) {\n  .video-console .awcore-modal button,\n  .video-console .awcore-modal .awcore-disregard-end-button:hover,\n  .video-console .awcore-modal .awcore-confirm-end-button:hover {\n    opacity: 1;\n    background: var(--amwell-visit-console-button-color-hover, #156bbd) !important;\n  }\n}\n\n.video-console .awcore-modalClose {\n  position: absolute;\n  right: 24px;\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTEwLjk0MyAxMkw0IDUuMDU3IDUuMDU3IDQgMTIgMTAuOTQzIDE4Ljk0MyA0IDIwIDUuMDU3IDEzLjA1NyAxMiAyMCAxOC45NDMgMTguOTQzIDIwIDEyIDEzLjA1NyA1LjA1NyAyMCA0IDE4Ljk0MyAxMC45NDMgMTJ6Ii8+CiAgICA8L2RlZnM+CiAgICA8dXNlIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI2EiLz4KPC9zdmc+Cg==\") no-repeat center;\n  width: 24px;\n  height: 24px;\n}\n\n.video-console .awcore-switch-camera {\n  border-color: #5b6b7b;\n}\n\n\@media screen and (max-width: 440px) {\n  .video-console .awcore-modal {\n    width: 100%;\n    margin: 20px;\n  }\n\n  .video-console .awcore-modal-body {\n    padding: 20px;\n  }\n\n  .video-console .awcore-modal-footer {\n    padding: 0 20px 20px;\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n}\n\n\@media screen and (max-width: 350px) {\n  .video-console .awcore-modal-footer {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n  }\n\n  .video-console .awcore-modal button {\n    margin: 8px 0;\n    width: 100%;\n  }\n}\n\n\n.video-console {\n  height: 100%;\n}\n\n/* mobile */\n\n\@media screen and (max-width: 768px) {\n  .video-console {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .video-console .awcore-top-pane-wrapper {\n    height: 0;\n  }\n\n  /* slightly breaking the rules by referencing amwell-visit-console classes in these selectors */\n  .drawer-open .video-console .awcore-video-container {\n    display: none;\n  }\n\n  .bottom-drawer-open .video-console .awcore-video-controls-container {\n    bottom: 315px;\n  }\n\n  .video-console .awcore-toggle-buttons-container {\n    margin-bottom: 50px;\n    -webkit-transition: margin-bottom 200ms;\n    transition: margin-bottom 200ms;\n  }\n\n  .bottom-drawer-open .video-console .awcore-toggle-buttons-container {\n    margin-bottom: 470px;\n  }\n\n  .header-enabled .video-console .awcore-disconnect-call-container {\n    top: -66px;\n  }\n\n  .header-enabled .video-console .awcore-disconnect-button {\n    height: 34px;\n  }\n\n  .video-console .awcore-self-container {\n    min-width: 110px;\n  }\n}\n\n\@media screen and (max-width: 440px) {\n  .video-console .awcore-participant-title-container {\n    width: -webkit-min-content !important;\n    width: -moz-min-content !important;\n    width: min-content !important;\n  }\n}"; }
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
const NotesSection = (props, children) => (h("div", { ref: props.ref, class: props.class },
    h("div", { class: "notes-section-header" }, props.title),
    children));

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
const NotesEntry = (props) => (h("div", { class: "notes-entry" },
    props.title &&
        h("h3", null, props.title),
    props.description));

const defaultMessages$3 = {
    amwell_visit_notes_notes_title: 'Notes',
    amwell_visit_notes_prescriptions_title: 'Prescriptions',
    amwell_visit_notes_diagnoses_and_procedures_title: 'Diagnoses & Procedures',
    amwell_visit_notes_additional_items_title: 'Additional Items',
    amwell_visit_notes_placeholder: 'The notes that the provider enters will appear here.',
};

const VisitNotes = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.messages = defaultMessages$3;
        this.newNotesReceived = createEvent(this, "newNotesReceived", 7);
    }
    async initialize(sdk, options) {
        this.sdk = sdk;
        this.visit = options.visit;
        Object.assign(this.messages, options.messages);
    }
    async destroy() {
        this.sdk = null;
        this.visit = null;
        this.notesExist = false;
        this.prescriptionsExist = false;
        this.diagnosesExist = false;
        this.proceduresExist = false;
        this.agendaItemsExist = false;
        this.postVisitItemsExist = false;
    }
    isNonEmpty(list) {
        return Array.isArray(list) && list.length > 0;
    }
    haveEntriesChanged(newEntries, oldEntries, comparisonKey) {
        const newEntriesExist = this.isNonEmpty(newEntries);
        const oldEntriesExist = this.isNonEmpty(oldEntries);
        // if old and new entries exist, check if they're different at all
        if (newEntriesExist && oldEntriesExist) {
            return !((newEntries.length === oldEntries.length) && newEntries.every((newEntry) => oldEntries.find((oldEntry) => newEntry[comparisonKey] === oldEntry[comparisonKey])));
        }
        // otherwise return only if old/new exists and did/didn't before
        return (newEntriesExist && !oldEntriesExist) || (!newEntriesExist && oldEntriesExist);
    }
    visitUpdated(newVisit, oldVisit) {
        if (!newVisit)
            return;
        if (newVisit.providerEntries) {
            this.notesExist = !!newVisit.providerEntries.notes;
            this.prescriptionsExist = this.isNonEmpty(newVisit.providerEntries.prescriptions);
            this.diagnosesExist = this.isNonEmpty(newVisit.providerEntries.diagnoses);
            this.proceduresExist = this.isNonEmpty(newVisit.providerEntries.procedures);
            this.agendaItemsExist = this.isNonEmpty(newVisit.providerEntries.agendaItemFollowUps);
            this.postVisitItemsExist = this.isNonEmpty(newVisit.providerEntries.postVisitFollowUpItems);
            // check if there has been any delta in the provider entries and emit event if there has
            if (oldVisit && oldVisit.providerEntries) {
                const notesChanged = newVisit.providerEntries.notes !== oldVisit.providerEntries.notes;
                const prescriptionsChanged = this.haveEntriesChanged(newVisit.providerEntries.prescriptions, oldVisit.providerEntries.prescriptions, 'description');
                const diagnosesChanged = this.haveEntriesChanged(newVisit.providerEntries.diagnoses, oldVisit.providerEntries.diagnoses, 'displayName');
                const proceduresChanged = this.haveEntriesChanged(newVisit.providerEntries.procedures, oldVisit.providerEntries.procedures, 'displayName');
                const agendaItemsChanged = this.haveEntriesChanged(newVisit.providerEntries.agendaItemFollowUps, oldVisit.providerEntries.agendaItemFollowUps, 'description');
                const postVisitItemsChanged = this.haveEntriesChanged(newVisit.providerEntries.postVisitFollowUpItems, oldVisit.providerEntries.postVisitFollowUpItems, 'description');
                if (notesChanged || prescriptionsChanged || diagnosesChanged || proceduresChanged || agendaItemsChanged || postVisitItemsChanged) {
                    this.newNotesReceived.emit();
                }
            }
        }
    }
    componentDidLoad() {
        // attach custom scrollbar to the transcript or fallback to default if no shadowDom support
        if (document.head.attachShadow) {
            const simpleBar = new SimpleBar(this.notesSection, { autoHide: false, direction: document.documentElement.dir });
            this.notesScroll = simpleBar.getScrollElement();
        }
        else {
            this.notesScroll = this.notesSection;
        }
    }
    componentDidUpdate() {
        this.showAnchors = this.notesScroll && (this.notesScroll.scrollHeight > this.notesScroll.clientHeight);
    }
    scrollToNotesSection(e, anchor) {
        e.preventDefault();
        this.notesScroll.scrollTop = anchor.offsetTop - this.notesScroll.offsetTop;
    }
    render() {
        return (h("div", { class: "visit-notes", dir: document.documentElement.dir }, h("div", { class: { "notes-anchors": true, "hidden": !this.showAnchors } }, this.notesExist &&
            h("button", { onClick: (e) => this.scrollToNotesSection(e, this.notesAnchor) }, this.messages.amwell_visit_notes_notes_title), this.prescriptionsExist &&
            h("button", { onClick: (e) => this.scrollToNotesSection(e, this.prescriptionsAnchor) }, this.messages.amwell_visit_notes_prescriptions_title), (this.diagnosesExist || this.proceduresExist) &&
            h("button", { onClick: (e) => this.scrollToNotesSection(e, this.diagnosesAndProceduresAnchor) }, this.messages.amwell_visit_notes_diagnoses_and_procedures_title), (this.agendaItemsExist || this.postVisitItemsExist) &&
            h("button", { onClick: (e) => this.scrollToNotesSection(e, this.additionalItemsAnchor) }, this.messages.amwell_visit_notes_additional_items_title)), h("div", { ref: (el) => this.notesSection = el, class: "notes-sections", "data-simplebar-direction": document.documentElement.dir }, !this.notesExist
            && !this.prescriptionsExist
            && !this.diagnosesExist
            && !this.proceduresExist
            && !this.agendaItemsExist
            && !this.postVisitItemsExist &&
            h("div", { class: "no-notes-placeholder" }, h("div", { class: "no-notes-icon" }), h("div", { class: "no-notes-message" }, this.messages.amwell_visit_notes_placeholder)), h("div", null, this.notesExist &&
            h(NotesSection, { ref: (el) => this.notesAnchor = el, class: "notes-section", title: this.messages.amwell_visit_notes_notes_title }, h("div", { innerHTML: this.visit.providerEntries.notes })), this.prescriptionsExist &&
            h(NotesSection, { ref: (el) => this.prescriptionsAnchor = el, class: "notes-section", title: this.messages.amwell_visit_notes_prescriptions_title }, this.visit.providerEntries.prescriptions.map((prescription) => h(NotesEntry, { title: prescription.description, description: prescription.rxInstructions }))), (this.diagnosesExist || this.proceduresExist) &&
            h(NotesSection, { ref: (el) => this.diagnosesAndProceduresAnchor = el, class: "notes-section", title: this.messages.amwell_visit_notes_diagnoses_and_procedures_title }, this.diagnosesExist && this.visit.providerEntries.diagnoses.map((diagnosis) => h(NotesEntry, { title: diagnosis.displayName, description: diagnosis.description })), this.proceduresExist && this.visit.providerEntries.procedures.map((procedure) => h(NotesEntry, { title: procedure.displayName, description: procedure.description }))), (this.agendaItemsExist || this.postVisitItemsExist) &&
            h(NotesSection, { ref: (el) => this.additionalItemsAnchor = el, class: "notes-section", title: this.messages.amwell_visit_notes_additional_items_title }, this.agendaItemsExist && this.visit.providerEntries.agendaItemFollowUps.map((item) => h(NotesEntry, { description: item.description })), this.postVisitItemsExist && this.visit.providerEntries.postVisitFollowUpItems.map((item) => h(NotesEntry, { description: item.description })))))));
    }
    static get watchers() { return {
        "visit": ["visitUpdated"]
    }; }
    static get style() { return "/*!\n * American Well Visit Console Widget\n *\n * Copyright © 2019 American Well.\n * All rights reserved.\n *\n * It is illegal to use, reproduce or distribute\n * any part of this Intellectual Property without\n * prior written authorization from American Well.\n */:host,amwell-visit-notes{position:relative}.visit-notes{position:absolute;top:0;bottom:0;right:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.notes-sections{padding:0 24px;overflow-y:auto;overflow-x:hidden;-ms-flex-positive:1;flex-grow:1;height:100%;font-size:14px;line-height:1.64;color:#313336}.notes-section-header{font-size:18px;font-weight:600;padding-top:5px;padding-bottom:9px;border-bottom:4px solid #e1e1e1;margin-bottom:20px;margin-top:37px;line-height:normal}.notes-entry{margin-bottom:1em}.notes-entry h3{padding:0;margin:0;font-size:16px}.no-notes-placeholder{top:0;bottom:0;right:0;left:0;position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.no-notes-message{width:40%;font-size:14px;color:#747481;text-align:center;padding-top:8px}.no-notes-icon{background:url(\"data:image/svg+xml;base64,ICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIxMzAiIHZpZXdCb3g9IjAgMCAxMzAgMTMwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSI+CiAgICAgIDxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjYzLjQ5MiIgc3Ryb2tlPSIjRTFFMUUxIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPHBhdGggZmlsbD0iI0UxRTFFMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNTEuMzc0IDM3LjgwNGgtNi4xMTd2NTYuMzY1SDg1LjAzVjM3LjgwNGgtNi4xMTZ2MS4wNTFhNS4zNyA1LjM3IDAgMCAxLTUuMzcgNS4zNjloLTE2LjhhNS4zNyA1LjM3IDAgMCAxLTUuMzctNS4zNjl2LTEuMDUxem0yNy4zNTYtNC4xMTVoNy4xMDNhMy4zMTEgMy4zMTEgMCAwIDEgMy4zMSAzLjMxMnY1Ny45NzNhMy4zMDkgMy4zMDkgMCAwIDEtMy4zMSAzLjMxaC00MS4zOGEzLjMxIDMuMzEgMCAwIDEtMy4zMS0zLjMxVjM3LjAwMWEzLjMxMiAzLjMxMiAwIDAgMSAzLjMxLTMuMzEyaDcuMTA0YTUuMzcyIDUuMzcyIDAgMCAxIDUuMTg3LTMuOTc1aDE2LjhhNS4zNzIgNS4zNzIgMCAwIDEgNS4xODYgMy45NzV6bS0yMS45ODYuMTRjLS42OTMgMC0xLjI1Ni41NjEtMS4yNTYgMS4yNTR2My43NzJjMCAuNjkyLjU2MyAxLjI1NSAxLjI1NiAxLjI1NWgxNi44Yy42OTIgMCAxLjI1NC0uNTYzIDEuMjU0LTEuMjU1di0zLjc3MmMwLS42OTMtLjU2Mi0xLjI1NC0xLjI1NS0xLjI1NGgtMTYuOHptLTEuODg3IDIxLjAyOEg3NS40M2EyLjI4NiAyLjI4NiAwIDAgMSAwIDQuNTcySDU0Ljg1N2EyLjI4NiAyLjI4NiAwIDAgMSAwLTQuNTcyem0wIDExLjQyOUg3NS40M2EyLjI4NCAyLjI4NCAwIDAgMSAyLjI4NSAyLjI4NSAyLjI4NCAyLjI4NCAwIDAgMS0yLjI4NSAyLjI4Nkg1NC44NTdhMi4yODYgMi4yODYgMCAwIDEgMC00LjU3MXptMCAxMS40MjhINzUuNDNBMi4yODQgMi4yODQgMCAwIDEgNzcuNzE0IDgwYTIuMjg0IDIuMjg0IDAgMCAxLTIuMjg1IDIuMjg2SDU0Ljg1N2EyLjI4NiAyLjI4NiAwIDAgMSAwLTQuNTcyeiIvPgogICAgPC9nPgogIDwvc3ZnPg==\") no-repeat center;width:130px;height:130px}.notes-anchors{margin-top:-1px;display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.1);box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.1);background-color:#f9f9fa;-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:0;flex-grow:0;z-index:1;padding:0 12px}.notes-anchors button{height:50px;background:none;border:none;outline:none;font-size:16px;color:var(--amwell-visit-console-link-color, #1774cc) !important;text-decoration:underline;white-space:nowrap;width:45%;text-align:initial;cursor:pointer;margin:0 12px;padding:12px 0 0}.notes-anchors button:hover{color:var(--amwell-visit-console-link-color-hover, #156bbd) !important}.notes-anchors button:nth-child(3),.notes-anchors button:nth-child(4){border-top:solid 1px #d0d5da;padding-top:0;padding-bottom:12px}\@media screen and (max-width: 768px){.notes-anchors button:nth-child(3),.notes-anchors button:nth-child(4){padding-top:unset;padding-bottom:unset}.notes-anchors button{width:100%;padding:12px 0;border-top:solid 1px #d0d5da}}.hidden{border:0;clip:rect(0 0 0 0);margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;border:solid 1px #d6d6d6;border-radius:50%}.radioButtonContainer:hover input~.checkmark{background-color:#d6d6d6}.radioButtonContainer input:checked~.checkmark{background:-webkit-gradient(\n    linear,\n    left top, left bottom,\n    from(#0469bd),\n    color-stop(50%, #2989d8),\n    color-stop(51%, #207cca),\n    to(#25abfd)\n  );background:linear-gradient(\n    to bottom,\n    #0469bd 0%,\n    #2989d8 50%,\n    #207cca 51%,\n    #25abfd 100%\n  );}.checkmark:after{content:\"\";position:absolute;display:none}.radioButtonContainer input:checked~.checkmark:after{display:block}.radioButtonContainer .checkmark:after{margin-top:8px;margin-left:8px;width:9px;height:9px;border-radius:50%;background:white}[dir=\"rtl\"] .radioButtonContainer .checkmark:after{margin-right:8px}.radioButtonContainer{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[dir=\"rtl\"] .radioButtonContainer{padding-right:35px}.radioButtonContainer input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.link{color:var(--amwell-visit-console-button-color, #1774CC);cursor:pointer}[data-simplebar]{position:relative;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-ms-flex-align:start;align-items:flex-start}.simplebar-wrapper{overflow:hidden;width:inherit;height:inherit;max-width:inherit;max-height:inherit}.simplebar-mask{direction:inherit;position:absolute;overflow:hidden;padding:0;margin:0;left:0;top:0;bottom:0;right:0;width:auto !important;height:auto !important;z-index:0}.simplebar-offset{direction:inherit !important;-webkit-box-sizing:inherit !important;box-sizing:inherit !important;resize:none !important;position:absolute;top:0;left:0;bottom:0;right:0;padding:0;margin:0;-webkit-overflow-scrolling:touch}.simplebar-content-wrapper{direction:inherit;-webkit-box-sizing:border-box !important;box-sizing:border-box !important;position:relative;display:block;height:100%;width:auto;visibility:visible;max-width:100%;max-height:100%;scrollbar-width:none}.simplebar-content-wrapper::-webkit-scrollbar,.simplebar-hide-scrollbar::-webkit-scrollbar{display:none}.simplebar-content:before,.simplebar-content:after{content:\' \';display:table}.simplebar-placeholder{max-height:100%;max-width:100%;width:100%;pointer-events:none}.simplebar-height-auto-observer-wrapper{-webkit-box-sizing:inherit !important;box-sizing:inherit !important;height:100%;width:100%;max-width:1px;position:relative;float:left;max-height:1px;overflow:hidden;z-index:-1;padding:0;margin:0;pointer-events:none;-ms-flex-positive:inherit;flex-grow:inherit;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:0;flex-basis:0}.simplebar-height-auto-observer{-webkit-box-sizing:inherit;box-sizing:inherit;display:block;opacity:0;position:absolute;top:0;left:0;height:1000%;width:1000%;min-height:1px;min-width:1px;overflow:hidden;pointer-events:none;z-index:-1}.simplebar-track{z-index:1;position:absolute;right:0;bottom:0;pointer-events:none;overflow:hidden}[data-simplebar].simplebar-dragging .simplebar-content{pointer-events:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}[data-simplebar].simplebar-dragging .simplebar-track{pointer-events:all}.simplebar-scrollbar{position:absolute;right:2px;width:7px;min-height:10px}.simplebar-scrollbar:before{position:absolute;content:\'\';background:black;border-radius:7px;left:0;right:0;opacity:0;-webkit-transition:opacity 0.2s linear;transition:opacity 0.2s linear}.simplebar-scrollbar.simplebar-visible:before{opacity:0.5;-webkit-transition:opacity 0s linear;transition:opacity 0s linear}.simplebar-track.simplebar-vertical{top:0;width:11px}.simplebar-track.simplebar-vertical .simplebar-scrollbar:before{top:2px;bottom:2px}.simplebar-track.simplebar-horizontal{left:0;height:11px}.simplebar-track.simplebar-horizontal .simplebar-scrollbar:before{height:100%;left:2px;right:2px}.simplebar-track.simplebar-horizontal .simplebar-scrollbar{right:auto;left:0;top:2px;height:7px;min-height:0;min-width:10px;width:auto}[data-simplebar-direction=\'rtl\'] .simplebar-track.simplebar-vertical{right:auto;left:0}.hs-dummy-scrollbar-size{direction:rtl;position:fixed;opacity:0;visibility:hidden;height:500px;width:500px;overflow-y:hidden;overflow-x:scroll}.simplebar-hide-scrollbar{position:fixed;left:0;visibility:hidden;overflow-y:scroll;scrollbar-width:none}"; }
};

export { ChatWindow as amwell_chat_window, GuestInvite as amwell_guest_invite, TytoDeviceWizard as amwell_tyto_device, VideoConsole as amwell_video_console, VisitNotes as amwell_visit_notes };
