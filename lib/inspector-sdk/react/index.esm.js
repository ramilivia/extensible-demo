import require$$0, { createContext, useRef, useEffect, useContext, useCallback } from "react";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React = require$$0;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self) ;
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      var didWarnAboutKeySpread = {};
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum();
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          {
            if (hasOwnProperty.call(props, "key")) {
              var componentName = getComponentNameFromType(type);
              var keys = Object.keys(props).filter(function(k) {
                return k !== "key";
              });
              var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
              if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                didWarnAboutKeySpread[componentName + beforeExample] = true;
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
class FieldRegistry {
  constructor(config) {
    this.registry = {};
    this.observer = null;
    this.isDestroyed = false;
    this.config = config;
    this.initializeObserver();
    this.scanExistingElements();
  }
  /**
   * Get all elements for a specific field
   */
  getElementsForField(fieldApiId, locale) {
    const elements = [];
    for (const elementList of Object.values(this.registry)) {
      for (const element of elementList) {
        if (element.fieldApiId === fieldApiId && element.locale === locale) {
          elements.push(element);
        }
      }
    }
    return elements;
  }
  /**
   * Get all elements for a specific entry
   */
  getElementsForEntry(entryId) {
    const elements = [];
    for (const elementList of Object.values(this.registry)) {
      for (const element of elementList) {
        if (element.entryId === entryId) {
          elements.push(element);
        }
      }
    }
    return elements;
  }
  /**
   * Get specific element by exact match
   */
  getElement(entryId, fieldApiId, locale) {
    const key = this.createRegistryKey(entryId, fieldApiId, locale);
    const elements = this.registry[key];
    return (elements == null ? void 0 : elements[0]) || null;
  }
  /**
   * Refresh registry - scan for new elements
   */
  refresh() {
    if (this.isDestroyed) return;
    this.scanExistingElements();
  }
  /**
   * Destroy registry and clean up observers
   */
  destroy() {
    var _a;
    this.isDestroyed = true;
    (_a = this.observer) == null ? void 0 : _a.disconnect();
    this.registry = {};
  }
  initializeObserver() {
    this.observer = new MutationObserver((mutations) => {
      var _a;
      if (this.isDestroyed) return;
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.scanElement(node);
            }
          }
        }
        if (mutation.type === "attributes" && ((_a = mutation.attributeName) == null ? void 0 : _a.startsWith("data-hygraph-"))) {
          this.updateElementRegistration(mutation.target);
        }
      }
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "data-hygraph-entry-id",
        "data-hygraph-field-api-id",
        "data-hygraph-field-locale"
      ]
    });
  }
  scanExistingElements() {
    const elements = document.querySelectorAll("[data-hygraph-entry-id]");
    elements.forEach((element) => this.scanElement(element));
  }
  scanElement(element) {
    if (this.hasHygraphAttributes(element)) {
      this.registerElement(element);
    }
    const children = element.querySelectorAll("[data-hygraph-entry-id]");
    children.forEach((child) => this.registerElement(child));
  }
  hasHygraphAttributes(element) {
    return element.hasAttribute("data-hygraph-entry-id");
  }
  registerElement(element) {
    const entryId = element.getAttribute("data-hygraph-entry-id");
    if (!entryId) return;
    const fieldApiId = element.getAttribute("data-hygraph-field-api-id") || void 0;
    const locale = element.getAttribute("data-hygraph-field-locale") || void 0;
    const registeredElement = {
      element,
      entryId,
      fieldApiId,
      locale,
      lastUpdated: Date.now()
    };
    const key = this.createRegistryKey(entryId, fieldApiId, locale);
    if (!this.registry[key]) {
      this.registry[key] = [];
    }
    const existingIndex = this.registry[key].findIndex((reg) => reg.element === element);
    if (existingIndex >= 0) {
      this.registry[key][existingIndex] = registeredElement;
    } else {
      this.registry[key].push(registeredElement);
    }
    if (this.config.debug) {
      console.log(`[FieldRegistry] Registered element:`, {
        entryId,
        fieldApiId,
        locale,
        element: element.tagName
      });
    }
  }
  updateElementRegistration(element) {
    this.unregisterElement(element);
    if (this.hasHygraphAttributes(element)) {
      this.registerElement(element);
    }
  }
  unregisterElement(element) {
    for (const [key, elements] of Object.entries(this.registry)) {
      const filteredElements = elements.filter((reg) => reg.element !== element);
      if (filteredElements.length === 0) {
        delete this.registry[key];
      } else {
        this.registry[key] = filteredElements;
      }
    }
  }
  createRegistryKey(entryId, fieldApiId, locale) {
    const parts = [entryId];
    if (fieldApiId) parts.push(fieldApiId);
    if (locale) parts.push(locale);
    return parts.join(":");
  }
  /**
   * Get registry statistics for debugging
   */
  getStats() {
    const entries = /* @__PURE__ */ new Set();
    const fields = /* @__PURE__ */ new Set();
    let totalElements = 0;
    for (const elements of Object.values(this.registry)) {
      totalElements += elements.length;
      for (const element of elements) {
        entries.add(element.entryId);
        if (element.fieldApiId) {
          fields.add(`${element.entryId}:${element.fieldApiId}`);
        }
      }
    }
    return {
      totalElements,
      entriesCount: entries.size,
      fieldsCount: fields.size
    };
  }
  /**
   * Get all registry keys (for debugging)
   */
  getRegistryKeys() {
    return Object.keys(this.registry);
  }
}
class MessageBridge {
  constructor(config) {
    this.isConnected = false;
    this.studioOrigin = null;
    this.messageQueue = [];
    this.isDestroyed = false;
    this.handleMessage = (event) => {
      if (this.isDestroyed) return;
      if (!this.isOriginAllowed(event.origin)) {
        if (this.config.debug) {
          console.log("[MessageBridge] Ignored message from disallowed origin:", event.origin);
        }
        return;
      }
      const message = event.data;
      if (!this.isValidStudioMessage(message)) {
        if (this.config.debug) {
          console.log("[MessageBridge] Ignored invalid message:", message);
        }
        return;
      }
      if (this.config.debug) {
        console.log("[MessageBridge] Received message:", message);
      }
      if (message.type === "init") {
        this.handleConnection(event.origin);
      }
      this.config.onMessage(message);
    };
    this.config = config;
    this.setupMessageListener();
  }
  /**
   * Send message to Studio
   */
  sendMessage(message) {
    if (this.isDestroyed) return false;
    if (!this.isConnected || !this.studioOrigin) {
      this.messageQueue.push(message);
      return false;
    }
    try {
      window.parent.postMessage(message, this.studioOrigin);
      if (this.config.debug) {
        console.log("[MessageBridge] Sent message:", message);
      }
      return true;
    } catch (error) {
      console.error("[MessageBridge] Failed to send message:", error);
      return false;
    }
  }
  /**
   * Send initial ready message to all allowed origins
   * Used to establish initial connection when studioOrigin is unknown
   */
  sendReadyMessage(message) {
    if (this.isDestroyed) return false;
    let sentSuccessfully = false;
    for (const origin of this.config.allowedOrigins) {
      try {
        window.parent.postMessage(message, origin);
        if (this.config.debug) {
          console.log("[MessageBridge] Sent ready message to origin:", origin, "message:", message);
        }
        sentSuccessfully = true;
      } catch (error) {
        if (this.config.debug) {
          console.log("[MessageBridge] Failed to send ready message to origin:", origin, "error:", error);
        }
      }
    }
    return sentSuccessfully;
  }
  /**
   * Check if connected to Studio
   */
  isConnectedToStudio() {
    return this.isConnected;
  }
  /**
   * Get Studio origin
   */
  getStudioOrigin() {
    return this.studioOrigin;
  }
  /**
   * Destroy message bridge
   */
  destroy() {
    this.isDestroyed = true;
    this.isConnected = false;
    this.studioOrigin = null;
    this.messageQueue = [];
    window.removeEventListener("message", this.handleMessage);
  }
  setupMessageListener() {
    if (this.config.debug) {
      console.log("[MessageBridge] Setting up message listener, allowed origins:", this.config.allowedOrigins);
    }
    window.addEventListener("message", this.handleMessage);
    if (this.config.onReady) {
      setTimeout(() => {
        this.config.onReady();
      }, 0);
    }
  }
  isOriginAllowed(origin) {
    return this.config.allowedOrigins.includes(origin) || this.config.allowedOrigins.some((allowed) => {
      if (allowed.includes("*")) {
        const pattern = allowed.replace(/\*/g, ".*");
        return new RegExp(`^${pattern}$`).test(origin);
      }
      return false;
    });
  }
  isValidStudioMessage(message) {
    if (!message || typeof message !== "object") return false;
    if (typeof message.type !== "string") return false;
    if (typeof message.timestamp !== "number") return false;
    switch (message.type) {
      case "init":
        return typeof message.studioOrigin === "string";
      case "field-update":
        return typeof message.entryId === "string" && typeof message.fieldApiId === "string" && typeof message.fieldType === "string" && message.newValue !== void 0;
      case "focus-field":
        return typeof message.fieldApiId === "string";
      case "bulk-update":
        return Array.isArray(message.changes);
      case "content-saved":
        return typeof message.entryId === "string";
      case "disconnect":
        return true;
      default:
        return false;
    }
  }
  handleConnection(origin) {
    if (!this.isConnected) {
      this.isConnected = true;
      this.studioOrigin = origin;
      if (this.config.debug) {
        console.log("[MessageBridge] Connected to Studio:", origin);
      }
      this.flushMessageQueue();
    }
  }
  flushMessageQueue() {
    const messages = [...this.messageQueue];
    this.messageQueue = [];
    for (const message of messages) {
      this.sendMessage(message);
    }
    if (this.config.debug && messages.length > 0) {
      console.log(`[MessageBridge] Sent ${messages.length} queued messages`);
    }
  }
}
class ContentUpdater {
  constructor(config) {
    this.updateQueue = /* @__PURE__ */ new Map();
    this.isDestroyed = false;
    this.config = config;
  }
  /**
   * Update a single field with new content
   */
  async updateField(update) {
    if (this.isDestroyed) {
      return { success: false, error: "ContentUpdater is destroyed" };
    }
    try {
      const updateKey = `${update.entryId}:${update.fieldApiId}:${update.locale || ""}`;
      this.updateQueue.set(updateKey, update);
      await this.delay(this.config.updateDelay || 50);
      const latestUpdate = this.updateQueue.get(updateKey);
      if (latestUpdate !== update) {
        return { success: true };
      }
      this.updateQueue.delete(updateKey);
      const elements = this.findElements(update.entryId, update.fieldApiId, update.locale);
      if (elements.length === 0) {
        return { success: false, error: "No matching elements found" };
      }
      let hasError = false;
      let lastError = "";
      for (const element of elements) {
        try {
          await this.updateElement(element, update);
        } catch (error) {
          hasError = true;
          lastError = error instanceof Error ? error.message : String(error);
          console.error("[ContentUpdater] Failed to update element:", error);
        }
      }
      if (hasError) {
        return { success: false, error: lastError };
      }
      if (this.config.debug) {
        console.log("[ContentUpdater] Updated field:", {
          entryId: update.entryId,
          fieldApiId: update.fieldApiId,
          locale: update.locale,
          elementsCount: elements.length
        });
      }
      return { success: true, element: elements[0] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[ContentUpdater] Update failed:", error);
      return { success: false, error: errorMessage };
    }
  }
  /**
   * Destroy content updater
   */
  destroy() {
    this.isDestroyed = true;
    this.updateQueue.clear();
  }
  findElements(entryId, fieldApiId, locale) {
    const elements = [];
    let selector = `[data-hygraph-entry-id="${entryId}"]`;
    if (fieldApiId) {
      selector += `[data-hygraph-field-api-id="${fieldApiId}"]`;
    }
    if (locale) {
      selector += `[data-hygraph-field-locale="${locale}"]`;
    }
    const found = document.querySelectorAll(selector);
    elements.push(...Array.from(found));
    return elements;
  }
  async updateElement(element, update) {
    switch (update.fieldType) {
      case "STRING":
      case "ID":
        this.updateTextField(element, update.newValue);
        break;
      case "RICHTEXT":
        await this.updateRichTextField(element, update.newValue);
        break;
      case "INT":
      case "FLOAT":
        this.updateNumberField(element, update.newValue);
        break;
      case "BOOLEAN":
        this.updateBooleanField(element, update.newValue);
        break;
      case "DATETIME":
      case "DATE":
        this.updateDateField(element, update.newValue);
        break;
      case "ASSET":
        await this.updateAssetField(element, update.newValue);
        break;
      case "LOCATION":
        this.updateLocationField(element, update.newValue);
        break;
      case "COLOR":
        this.updateColorField(element, update.newValue);
        break;
      case "COMPONENT":
        await this.updateComponentField(element, update.newValue);
        break;
      case "JSON":
        this.updateJsonField(element, update.newValue);
        break;
      case "ENUMERATION":
        this.updateTextField(element, update.newValue);
        break;
      default:
        throw new Error(`Unsupported field type: ${update.fieldType}`);
    }
  }
  updateTextField(element, newValue) {
    if (!newValue && newValue !== "") return;
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      element.value = newValue;
    } else {
      element.textContent = newValue;
    }
  }
  async updateRichTextField(element, richTextAST) {
    if (!richTextAST || !richTextAST.children) return;
    try {
      const htmlContent = this.richTextToHTML(richTextAST);
      if (this.hasMorphdom()) {
        const tempElement = document.createElement(element.tagName);
        tempElement.innerHTML = htmlContent;
        window.morphdom(element, tempElement);
      } else {
        element.innerHTML = htmlContent;
      }
    } catch (error) {
      console.error("[ContentUpdater] Rich text update failed:", error);
      throw error;
    }
  }
  updateNumberField(element, newValue) {
    if (newValue === null || newValue === void 0) return;
    const stringValue = String(newValue);
    if (element.tagName === "INPUT") {
      element.value = stringValue;
    } else {
      element.textContent = stringValue;
    }
  }
  updateBooleanField(element, newValue) {
    if (element.tagName === "INPUT" && element.type === "checkbox") {
      element.checked = newValue;
    } else {
      element.textContent = String(newValue);
    }
  }
  updateDateField(element, newValue) {
    if (!newValue) return;
    const date = new Date(newValue);
    const formattedDate = date.toLocaleDateString();
    if (element.tagName === "INPUT" && element.type === "date") {
      element.value = newValue.split("T")[0];
    } else {
      element.textContent = formattedDate;
    }
  }
  async updateAssetField(element, asset) {
    if (!asset) return;
    if (Array.isArray(asset)) {
      if (asset.length > 0) {
        await this.updateSingleAsset(element, asset[0]);
      }
      return;
    }
    await this.updateSingleAsset(element, asset);
  }
  async updateSingleAsset(element, asset) {
    if (element.tagName === "IMG") {
      const img = element;
      img.src = asset.url;
      if (asset.alt) img.alt = asset.alt;
      if (asset.width) img.width = asset.width;
      if (asset.height) img.height = asset.height;
    } else if (element.tagName === "VIDEO") {
      const video = element;
      video.src = asset.url;
    } else if (element.tagName === "AUDIO") {
      const audio = element;
      audio.src = asset.url;
    } else if (element.tagName === "A") {
      const link = element;
      link.href = asset.url;
      if (!link.textContent) {
        link.textContent = asset.fileName;
      }
    } else {
      element.innerHTML = `<img src="${asset.url}" alt="${asset.alt || ""}" />`;
    }
  }
  updateLocationField(element, location) {
    if (!location || typeof location.latitude !== "number" || typeof location.longitude !== "number") {
      return;
    }
    const locationText = `${location.latitude}, ${location.longitude}`;
    element.textContent = locationText;
    element.setAttribute("data-latitude", String(location.latitude));
    element.setAttribute("data-longitude", String(location.longitude));
  }
  updateColorField(element, color) {
    if (!color) return;
    element.textContent = color;
    if (element.style) {
      element.style.backgroundColor = color;
    }
  }
  async updateComponentField(element, componentData) {
    if (!componentData) return;
    try {
      const componentHtml = this.renderComponent(componentData);
      if (this.hasMorphdom()) {
        const tempElement = document.createElement(element.tagName);
        tempElement.innerHTML = componentHtml;
        window.morphdom(element, tempElement);
      } else {
        element.innerHTML = componentHtml;
      }
    } catch (error) {
      console.error("[ContentUpdater] Component update failed:", error);
      throw error;
    }
  }
  updateJsonField(element, jsonData) {
    if (jsonData === null || jsonData === void 0) return;
    const jsonString = JSON.stringify(jsonData, null, 2);
    element.textContent = jsonString;
  }
  richTextToHTML(richTextAST) {
    if (!richTextAST.children) return "";
    return richTextAST.children.map((node) => this.renderRichTextNode(node)).join("");
  }
  renderRichTextNode(node) {
    if (node.text) {
      return this.escapeHtml(node.text);
    }
    const children = node.children ? node.children.map((child) => this.renderRichTextNode(child)).join("") : "";
    switch (node.type) {
      case "paragraph":
        return `<p>${children}</p>`;
      case "heading-one":
        return `<h1>${children}</h1>`;
      case "heading-two":
        return `<h2>${children}</h2>`;
      case "heading-three":
        return `<h3>${children}</h3>`;
      case "heading-four":
        return `<h4>${children}</h4>`;
      case "heading-five":
        return `<h5>${children}</h5>`;
      case "heading-six":
        return `<h6>${children}</h6>`;
      case "block-quote":
        return `<blockquote>${children}</blockquote>`;
      case "bulleted-list":
        return `<ul>${children}</ul>`;
      case "numbered-list":
        return `<ol>${children}</ol>`;
      case "list-item":
        return `<li>${children}</li>`;
      case "link":
        return `<a href="${node.href || ""}">${children}</a>`;
      case "bold":
        return `<strong>${children}</strong>`;
      case "italic":
        return `<em>${children}</em>`;
      case "underline":
        return `<u>${children}</u>`;
      case "code":
        return `<code>${children}</code>`;
      default:
        return children;
    }
  }
  renderComponent(componentData) {
    const typename = componentData.__typename;
    const fields = Object.entries(componentData).filter(([key]) => key !== "__typename" && key !== "id").map(([key, value]) => `<div data-field="${key}">${this.escapeHtml(String(value))}</div>`).join("");
    return `<div data-component="${typename}">${fields}</div>`;
  }
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
  hasMorphdom() {
    return typeof window.morphdom === "function";
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
class OverlayManager {
  constructor(config) {
    this.overlayElement = null;
    this.editButtonElement = null;
    this.currentTarget = null;
    this.isDestroyed = false;
    this.handleMouseMove = (event) => {
      var _a;
      if (this.isDestroyed) return;
      const target = event.target;
      if (target === this.editButtonElement || ((_a = this.editButtonElement) == null ? void 0 : _a.contains(target))) {
        return;
      }
      const hygraphElement = target.closest("[data-hygraph-entry-id]");
      if (hygraphElement && hygraphElement !== this.currentTarget) {
        const entryId = hygraphElement.getAttribute("data-hygraph-entry-id");
        const fieldApiId = hygraphElement.getAttribute("data-hygraph-field-api-id");
        const locale = hygraphElement.getAttribute("data-hygraph-field-locale");
        if (entryId) {
          const registeredElement = {
            element: hygraphElement,
            entryId,
            fieldApiId: fieldApiId || void 0,
            locale: locale || void 0
          };
          this.showOverlay(hygraphElement, registeredElement);
        }
      } else if (!hygraphElement && this.currentTarget) {
        setTimeout(() => {
          if (this.currentTarget && !this.isMouseOverEditButton(event)) {
            this.hideOverlay();
          }
        }, 50);
      }
    };
    this.handleMouseLeave = () => {
      this.hideOverlay();
    };
    this.handleScroll = () => {
      if (this.currentTarget) {
        this.updateOverlayPosition(this.currentTarget);
      }
    };
    this.handleResize = () => {
      if (this.currentTarget) {
        this.updateOverlayPosition(this.currentTarget);
      }
    };
    this.config = config;
    this.createOverlayElements();
    this.setupEventListeners();
  }
  /**
   * Show overlay for a specific element
   */
  showOverlay(element, registeredElement) {
    if (this.isDestroyed || !this.config.overlayEnabled) return;
    this.currentTarget = element;
    this.updateOverlayPosition(element);
    this.updateEditButton(registeredElement);
    this.showOverlayElements();
  }
  /**
   * Hide overlay
   */
  hideOverlay() {
    if (this.isDestroyed) return;
    this.currentTarget = null;
    this.hideOverlayElements();
  }
  /**
   * Destroy overlay manager
   */
  destroy() {
    this.isDestroyed = true;
    this.removeOverlayElements();
    this.removeEventListeners();
  }
  createOverlayElements() {
    this.overlayElement = document.createElement("div");
    this.overlayElement.id = "hygraph-inspector-overlay";
    this.overlayElement.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      border: 2px solid #3B82F6;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 4px;
      display: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
    `;
    this.editButtonElement = document.createElement("button");
    this.editButtonElement.id = "hygraph-inspector-edit-button";
    this.editButtonElement.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Edit
    `;
    this.editButtonElement.style.cssText = `
      position: fixed;
      z-index: 10000;
      background: #3B82F6;
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: none;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      pointer-events: auto;
      width: 72px;
      height: 32px;
      justify-content: center;
      box-sizing: border-box;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    `;
    this.editButtonElement.addEventListener("mouseenter", () => {
      this.editButtonElement.style.background = "#2563EB";
      this.editButtonElement.style.transform = "scale(1.05)";
    });
    this.editButtonElement.addEventListener("mouseleave", () => {
      this.editButtonElement.style.background = "#3B82F6";
      this.editButtonElement.style.transform = "scale(1)";
    });
    document.body.appendChild(this.overlayElement);
    document.body.appendChild(this.editButtonElement);
  }
  setupEventListeners() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseleave", this.handleMouseLeave);
    document.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", this.handleResize);
  }
  removeEventListeners() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseleave", this.handleMouseLeave);
    document.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("resize", this.handleResize);
  }
  isMouseOverEditButton(event) {
    if (!this.editButtonElement) return false;
    const rect = this.editButtonElement.getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  }
  updateOverlayPosition(element) {
    if (!this.overlayElement) return;
    const rect = element.getBoundingClientRect();
    this.overlayElement.style.left = `${rect.left}px`;
    this.overlayElement.style.top = `${rect.top}px`;
    this.overlayElement.style.width = `${rect.width}px`;
    this.overlayElement.style.height = `${rect.height}px`;
  }
  updateEditButton(registeredElement) {
    if (!this.editButtonElement || !this.currentTarget) return;
    const rect = this.currentTarget.getBoundingClientRect();
    const buttonWidth = 72;
    const buttonHeight = 32;
    const padding = 4;
    let buttonTop = rect.top + padding;
    let buttonLeft = rect.right - buttonWidth - padding;
    if (buttonLeft < rect.left + padding) {
      buttonLeft = rect.left + padding;
    }
    if (buttonTop + buttonHeight + padding > rect.bottom) {
      buttonTop = Math.max(rect.top + padding, rect.bottom - buttonHeight - padding);
    }
    buttonLeft = Math.max(rect.left + padding, Math.min(buttonLeft, rect.right - buttonWidth - padding));
    buttonTop = Math.max(rect.top + padding, Math.min(buttonTop, rect.bottom - buttonHeight - padding));
    this.editButtonElement.style.left = `${buttonLeft}px`;
    this.editButtonElement.style.top = `${buttonTop}px`;
    this.editButtonElement.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.handleEditClick(registeredElement);
    };
    const fieldName = registeredElement.fieldApiId || "entry";
    this.editButtonElement.title = `Edit ${fieldName}`;
  }
  handleEditClick(registeredElement) {
    const event = new CustomEvent("hygraph-edit-click", {
      detail: registeredElement,
      bubbles: true
    });
    document.dispatchEvent(event);
    if (this.config.debug) {
      console.log("[OverlayManager] Edit button clicked:", registeredElement);
    }
  }
  showOverlayElements() {
    if (this.overlayElement) {
      this.overlayElement.style.display = "block";
    }
    if (this.editButtonElement) {
      this.editButtonElement.style.display = "flex";
    }
  }
  hideOverlayElements() {
    if (this.overlayElement) {
      this.overlayElement.style.display = "none";
    }
    if (this.editButtonElement) {
      this.editButtonElement.style.display = "none";
    }
  }
  removeOverlayElements() {
    if (this.overlayElement) {
      this.overlayElement.remove();
      this.overlayElement = null;
    }
    if (this.editButtonElement) {
      this.editButtonElement.remove();
      this.editButtonElement = null;
    }
  }
}
class Inspector {
  constructor(config) {
    this.messageBridge = null;
    this.saveCallbacks = /* @__PURE__ */ new Set();
    this.handleEditClick = (event) => {
      const customEvent = event;
      const registeredElement = customEvent.detail;
      const element = registeredElement.element;
      if (this.mode === "iframe") {
        this.handleIframeEditClick(element);
      } else {
        this.handleStandaloneEditClick(element);
      }
    };
    this.config = {
      debug: false,
      overlayEnabled: true,
      updateDelay: 50,
      retryAttempts: 3,
      autoConnect: true,
      allowedOrigins: ["https://app.hygraph.com", "http://localhost:3000"],
      ...config
    };
    this.mode = this.determineMode();
    this.fieldRegistry = new FieldRegistry(this.config);
    this.contentUpdater = new ContentUpdater(this.config);
    this.overlayManager = new OverlayManager(this.config);
    if (this.mode === "iframe") {
      this.initializeIframeMode();
    } else {
      this.initializeStandaloneMode();
    }
    this.setupEditClickHandler();
    if (this.config.debug) {
      window.__HYGRAPH_INSPECTOR__ = this;
    }
    this.emitEvent("inspector:ready", { inspector: this });
  }
  /**
   * Subscribe to save events - for framework refresh integration
   */
  subscribe(eventType, config) {
    if (eventType === "save") {
      this.saveCallbacks.add(config.callback);
      return () => this.saveCallbacks.delete(config.callback);
    }
    throw new Error(`Unknown event type: ${eventType}`);
  }
  /**
   * Get current SDK version
   */
  getVersion() {
    return "2.0.0";
  }
  /**
   * Get current mode
   */
  getMode() {
    return this.mode;
  }
  /**
   * Check if Inspector is connected to Studio
   */
  isConnected() {
    var _a;
    return ((_a = this.messageBridge) == null ? void 0 : _a.isConnectedToStudio()) ?? false;
  }
  /**
   * Refresh element registry - scan for new elements
   */
  refresh() {
    this.fieldRegistry.refresh();
  }
  /**
   * Destroy Inspector and clean up resources
   */
  destroy() {
    var _a;
    this.fieldRegistry.destroy();
    (_a = this.messageBridge) == null ? void 0 : _a.destroy();
    this.contentUpdater.destroy();
    this.overlayManager.destroy();
    this.saveCallbacks.clear();
    document.removeEventListener("hygraph-edit-click", this.handleEditClick);
    if (window.__HYGRAPH_INSPECTOR__ === this) {
      delete window.__HYGRAPH_INSPECTOR__;
    }
  }
  determineMode() {
    if (this.config.mode === "iframe") return "iframe";
    if (this.config.mode === "standalone") return "standalone";
    try {
      return window.self === window.top ? "standalone" : "iframe";
    } catch (e) {
      return "iframe";
    }
  }
  initializeIframeMode() {
    if (this.config.debug) {
      console.log("[Inspector] Initializing in iframe mode");
    }
    this.messageBridge = new MessageBridge({
      debug: this.config.debug,
      allowedOrigins: this.getAllowedOrigins(),
      onMessage: this.handleStudioMessage.bind(this),
      onReady: () => {
        if (this.config.debug) {
          console.log("[Inspector] MessageBridge ready, sending ready message to Studio");
        }
        if (this.config.autoConnect) {
          this.sendReadyMessage();
        }
      }
    });
    this.setupIframeEditHandlers();
  }
  initializeStandaloneMode() {
    if (this.config.debug) {
      console.log("[Inspector] Initializing in standalone mode");
    }
    if (!this.config.studioUrl && !this.isProductionEndpoint()) {
      console.warn("[Inspector] Consider setting studioUrl for development endpoints");
    }
    this.setupStandaloneEditHandlers();
  }
  getAllowedOrigins() {
    const origins = [...this.config.allowedOrigins || []];
    if (this.config.studioUrl) {
      origins.push(new URL(this.config.studioUrl).origin);
    }
    return origins;
  }
  isProductionEndpoint() {
    return this.config.endpoint.includes("api.hygraph.com") || this.config.endpoint.includes(".hygraph.com");
  }
  sendReadyMessage() {
    if (!this.messageBridge) return;
    const message = {
      type: "ready",
      sdkVersion: this.getVersion(),
      timestamp: Date.now()
    };
    this.messageBridge.sendReadyMessage(message);
  }
  handleStudioMessage(message) {
    switch (message.type) {
      case "init":
        this.handleInitMessage(message);
        break;
      case "field-update":
        this.handleFieldUpdate(message);
        break;
      case "focus-field":
        this.handleFocusField(message);
        break;
      case "bulk-update":
        this.handleBulkUpdate(message);
        break;
      case "content-saved":
        this.handleContentSaved(message);
        break;
      case "disconnect":
        this.handleDisconnect();
        break;
    }
  }
  handleInitMessage(message) {
    if (this.config.debug) {
      console.log("[Inspector] Connected to Studio:", message.studioOrigin);
    }
    this.emitEvent("inspector:connected", { studioOrigin: message.studioOrigin });
  }
  async handleFieldUpdate(message) {
    const result = await this.contentUpdater.updateField({
      entryId: message.entryId,
      fieldApiId: message.fieldApiId,
      newValue: message.newValue,
      locale: message.locale,
      fieldType: message.fieldType,
      updateId: message.updateId
    });
    if (this.messageBridge) {
      const responseMessage = result.success ? {
        type: "update-complete",
        updateId: message.updateId,
        timestamp: Date.now()
      } : {
        type: "update-failed",
        updateId: message.updateId,
        error: result.error || "Update failed",
        timestamp: Date.now()
      };
      this.messageBridge.sendMessage(responseMessage);
    }
    if (result.success) {
      this.emitEvent("inspector:field-updated", {
        entryId: message.entryId,
        fieldApiId: message.fieldApiId,
        newValue: message.newValue
      });
    } else {
      this.emitEvent("inspector:update-failed", {
        entryId: message.entryId,
        fieldApiId: message.fieldApiId,
        error: result.error || "Update failed"
      });
    }
  }
  handleFocusField(message) {
    const elements = this.fieldRegistry.getElementsForField(
      message.fieldApiId,
      message.locale
    );
    if (elements.length > 0) {
      const element = elements[0].element;
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.focus();
      }
    }
  }
  async handleBulkUpdate(message) {
    const results = await Promise.all(
      message.changes.map((change) => this.contentUpdater.updateField(change))
    );
    const allSucceeded = results.every((result) => result.success);
    const errors = results.filter((result) => !result.success).map((result) => result.error);
    if (this.messageBridge) {
      const responseMessage = allSucceeded ? {
        type: "update-complete",
        timestamp: Date.now()
      } : {
        type: "update-failed",
        error: `Bulk update failed: ${errors.join(", ")}`,
        timestamp: Date.now()
      };
      this.messageBridge.sendMessage(responseMessage);
    }
  }
  async handleContentSaved(message) {
    if (this.config.debug) {
      console.log("[Inspector] Content saved, triggering framework refresh");
    }
    this.emitEvent("inspector:content-saved", {
      entryId: message.entryId,
      timestamp: message.timestamp
    });
    for (const callback of this.saveCallbacks) {
      try {
        await callback(message.entryId);
      } catch (error) {
        console.error("[Inspector] Save callback failed:", error);
      }
    }
  }
  handleDisconnect() {
    if (this.config.debug) {
      console.log("[Inspector] Disconnected from Studio");
    }
    this.emitEvent("inspector:disconnected", {});
  }
  setupEditClickHandler() {
    document.addEventListener("hygraph-edit-click", this.handleEditClick);
  }
  setupIframeEditHandlers() {
  }
  setupStandaloneEditHandlers() {
  }
  handleIframeEditClick(element) {
    var _a;
    const entryId = element.getAttribute("data-hygraph-entry-id");
    const fieldApiId = element.getAttribute("data-hygraph-field-api-id") || void 0;
    const locale = element.getAttribute("data-hygraph-field-locale") || void 0;
    if (!entryId) return;
    if (this.messageBridge) {
      const message = {
        type: "field-click",
        entryId,
        fieldApiId,
        locale,
        timestamp: Date.now()
      };
      const success = this.messageBridge.sendMessage(message);
      if (!success && ((_a = this.config.standalone) == null ? void 0 : _a.fallbackToNewTab) !== false) {
        if (this.config.debug) {
          console.log("[Inspector] Studio not connected, falling back to new tab");
        }
        this.handleStandaloneEditClick(element);
      }
    }
    this.emitEvent("inspector:field-click", {
      entryId,
      fieldApiId,
      locale,
      mode: this.mode
    });
  }
  handleStandaloneEditClick(element) {
    const entryId = element.getAttribute("data-hygraph-entry-id");
    const fieldApiId = element.getAttribute("data-hygraph-field-api-id") || void 0;
    const locale = element.getAttribute("data-hygraph-field-locale") || void 0;
    if (!entryId) return;
    if (!this.config.endpoint) {
      console.error("[Inspector] Cannot open Studio - no endpoint configured");
      return;
    }
    const studioUrl = this.buildStudioUrl(entryId, fieldApiId, locale);
    window.open(studioUrl, "_blank", "noopener,noreferrer");
    if (this.config.debug) {
      console.log("[Inspector] Opened Studio in new tab:", studioUrl);
    }
    this.emitEvent("inspector:field-click", {
      entryId,
      fieldApiId,
      locale,
      mode: this.mode
    });
  }
  buildStudioUrl(entryId, fieldApiId, locale) {
    const baseUrl = this.config.studioUrl || "https://app.hygraph.com";
    const params = new URLSearchParams({
      endpoint: this.config.endpoint,
      entryId
    });
    if (fieldApiId) params.set("fieldApiId", fieldApiId);
    if (locale) params.set("locale", locale);
    return `${baseUrl}/entry?${params.toString()}`;
  }
  emitEvent(type, detail) {
    const event = new CustomEvent(type, { detail });
    document.dispatchEvent(event);
  }
}
const HygraphInspectorContext = createContext({
  inspector: null,
  isReady: false,
  isConnected: false
});
function HygraphInspector({
  children,
  onReady,
  onConnected,
  onDisconnected,
  onSave,
  onError,
  ...config
}) {
  const inspectorRef = useRef(null);
  const [contextValue, setContextValue] = require$$0.useState({
    inspector: null,
    isReady: false,
    isConnected: false
  });
  useEffect(() => {
    try {
      const inspector = new Inspector(config);
      inspectorRef.current = inspector;
      const handleReady = (event) => {
        setContextValue((prev) => ({
          ...prev,
          inspector: event.detail.inspector,
          isReady: true
        }));
        onReady == null ? void 0 : onReady(event.detail.inspector);
      };
      const handleConnected = (event) => {
        setContextValue((prev) => ({
          ...prev,
          isConnected: true
        }));
        onConnected == null ? void 0 : onConnected(event.detail.studioOrigin);
      };
      const handleDisconnected = () => {
        setContextValue((prev) => ({
          ...prev,
          isConnected: false
        }));
        onDisconnected == null ? void 0 : onDisconnected();
      };
      const handleError = (event) => {
        onError == null ? void 0 : onError(event.detail.error);
      };
      document.addEventListener("inspector:ready", handleReady);
      document.addEventListener("inspector:connected", handleConnected);
      document.addEventListener("inspector:disconnected", handleDisconnected);
      document.addEventListener("inspector:error", handleError);
      let unsubscribe;
      if (onSave) {
        unsubscribe = inspector.subscribe("save", { callback: onSave });
      }
      return () => {
        document.removeEventListener("inspector:ready", handleReady);
        document.removeEventListener("inspector:connected", handleConnected);
        document.removeEventListener("inspector:disconnected", handleDisconnected);
        document.removeEventListener("inspector:error", handleError);
        unsubscribe == null ? void 0 : unsubscribe();
        inspector.destroy();
      };
    } catch (error) {
      console.error("[HygraphInspector] Failed to initialize:", error);
      onError == null ? void 0 : onError(error instanceof Error ? error : new Error(String(error)));
      return () => {
      };
    }
  }, [
    config.endpoint,
    config.debug,
    config.studioUrl,
    config.mode,
    onReady,
    onConnected,
    onDisconnected,
    onSave,
    onError
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HygraphInspectorContext.Provider, { value: contextValue, children });
}
function useInspector() {
  const context = useContext(HygraphInspectorContext);
  if (!context) {
    throw new Error("useInspector must be used within a HygraphInspector component");
  }
  return context;
}
function useInspectorSave(callback) {
  const { inspector } = useInspector();
  useEffect(() => {
    if (!inspector) return;
    const unsubscribe = inspector.subscribe("save", { callback });
    return unsubscribe;
  }, [inspector, callback]);
}
function useInspectorEvent(eventType, handler) {
  useEffect(() => {
    const eventHandler = (event) => {
      handler(event);
    };
    document.addEventListener(eventType, eventHandler);
    return () => document.removeEventListener(eventType, eventHandler);
  }, [eventType, handler]);
}
function useInspectorRefresh() {
  const { inspector } = useInspector();
  const frameworkRef = useRef(null);
  useEffect(() => {
    if (!inspector) return;
    const integration = inspector.frameworkIntegration;
    const framework = integration == null ? void 0 : integration.getFramework();
    frameworkRef.current = (framework == null ? void 0 : framework.type) || null;
  }, [inspector]);
  const refresh = useCallback(async () => {
    if (!inspector) return;
    const integration = inspector.frameworkIntegration;
    if (integration) {
      await integration.refresh();
    } else {
      window.location.reload();
    }
  }, [inspector]);
  return {
    refresh,
    framework: frameworkRef.current
  };
}
function useInspectorNextjs() {
  const { refresh } = useInspectorRefresh();
  const getNextRouter = useCallback(() => {
    var _a, _b;
    if (typeof window === "undefined") return null;
    const router = ((_a = window.next) == null ? void 0 : _a.router) || ((_b = window.__NEXT_DATA__) == null ? void 0 : _b.router) || null;
    return router;
  }, []);
  const nextjsRefresh = useCallback(() => {
    const router = getNextRouter();
    if (router && typeof router.replace === "function") {
      router.replace(router.asPath || window.location.pathname);
    } else {
      refresh();
    }
  }, [refresh, getNextRouter]);
  useInspectorSave(nextjsRefresh);
}
function useInspectorRemix() {
  const { refresh } = useInspectorRefresh();
  const getRemixRevalidator = useCallback(() => {
    var _a;
    if (typeof window === "undefined") return null;
    return window.__remixRevalidator || ((_a = window.__remixRouterContext) == null ? void 0 : _a.revalidator) || null;
  }, []);
  const remixRefresh = useCallback(() => {
    const revalidator = getRemixRevalidator();
    if (revalidator && typeof revalidator.revalidate === "function") {
      revalidator.revalidate();
    } else {
      refresh();
    }
  }, [refresh, getRemixRevalidator]);
  useInspectorSave(remixRefresh);
}
function useInspectorFieldUpdates(onUpdate, onError) {
  useInspectorEvent("inspector:field-updated", (event) => {
    onUpdate == null ? void 0 : onUpdate(event.detail);
  });
  useInspectorEvent("inspector:update-failed", (event) => {
    onError == null ? void 0 : onError(event.detail);
  });
}
function useInspectorConnection() {
  const { inspector, isReady, isConnected } = useInspector();
  const mode = (inspector == null ? void 0 : inspector.getMode()) || null;
  return {
    isConnected,
    isReady,
    mode
  };
}
function useInspectorActions() {
  const { inspector } = useInspector();
  const refresh = useCallback(() => {
    inspector == null ? void 0 : inspector.refresh();
  }, [inspector]);
  const destroy = useCallback(() => {
    inspector == null ? void 0 : inspector.destroy();
  }, [inspector]);
  const getVersion = useCallback(() => {
    return (inspector == null ? void 0 : inspector.getVersion()) || null;
  }, [inspector]);
  const getMode = useCallback(() => {
    return (inspector == null ? void 0 : inspector.getMode()) || null;
  }, [inspector]);
  return {
    refresh,
    destroy,
    getVersion,
    getMode
  };
}
function useInspectorDebug() {
  const { inspector } = useInspector();
  const getStats = useCallback(() => {
    if (!inspector) return null;
    const fieldRegistry = inspector.fieldRegistry;
    return (fieldRegistry == null ? void 0 : fieldRegistry.getStats()) || null;
  }, [inspector]);
  const getRegistryKeys = useCallback(() => {
    if (!inspector) return [];
    const fieldRegistry = inspector.fieldRegistry;
    return (fieldRegistry == null ? void 0 : fieldRegistry.getRegistryKeys()) || [];
  }, [inspector]);
  const getFramework = useCallback(() => {
    if (!inspector) return null;
    const frameworkIntegration = inspector.frameworkIntegration;
    return (frameworkIntegration == null ? void 0 : frameworkIntegration.getFramework()) || null;
  }, [inspector]);
  return {
    inspector,
    stats: getStats(),
    registryKeys: getRegistryKeys(),
    framework: getFramework()
  };
}
export {
  HygraphInspector,
  Inspector,
  useInspector,
  useInspectorActions,
  useInspectorConnection,
  useInspectorDebug,
  useInspectorEvent,
  useInspectorFieldUpdates,
  useInspectorNextjs,
  useInspectorRefresh,
  useInspectorRemix,
  useInspectorSave
};
//# sourceMappingURL=index.esm.js.map
