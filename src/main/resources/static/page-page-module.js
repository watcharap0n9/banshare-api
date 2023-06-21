(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["page-page-module"],{

/***/ "./node_modules/ngx-mask/fesm5/ngx-mask.js":
/*!*************************************************!*\
  !*** ./node_modules/ngx-mask/fesm5/ngx-mask.js ***!
  \*************************************************/
/*! exports provided: INITIAL_CONFIG, MaskApplierService, MaskDirective, MaskPipe, MaskService, NEW_CONFIG, NgxMaskModule, _configFactory, config, initialConfig, timeMasks, withoutValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_CONFIG", function() { return INITIAL_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskApplierService", function() { return MaskApplierService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskDirective", function() { return MaskDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskPipe", function() { return MaskPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskService", function() { return MaskService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_CONFIG", function() { return NEW_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxMaskModule", function() { return NgxMaskModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_configFactory", function() { return _configFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialConfig", function() { return initialConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeMasks", function() { return timeMasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withoutValidation", function() { return withoutValidation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IConfig() { }
if (false) {}
/** @type {?} */
var config = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('config');
/** @type {?} */
var NEW_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('NEW_CONFIG');
/** @type {?} */
var INITIAL_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('INITIAL_CONFIG');
/** @type {?} */
var initialConfig = {
    suffix: '',
    prefix: '',
    thousandSeparator: ' ',
    decimalMarker: '.',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    placeHolderCharacter: '_',
    dropSpecialCharacters: true,
    hiddenInput: undefined,
    shownMaskExpression: '',
    separatorLimit: '',
    allowNegativeNumbers: false,
    validation: true,
    // tslint:disable-next-line: quotemark
    specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true,
        },
        X: {
            pattern: new RegExp('\\d'),
            symbol: '*',
        },
        A: {
            pattern: new RegExp('[a-zA-Z0-9]'),
        },
        S: {
            pattern: new RegExp('[a-zA-Z]'),
        },
        d: {
            pattern: new RegExp('\\d'),
        },
        m: {
            pattern: new RegExp('\\d'),
        },
        M: {
            pattern: new RegExp('\\d'),
        },
        H: {
            pattern: new RegExp('\\d'),
        },
        h: {
            pattern: new RegExp('\\d'),
        },
        s: {
            pattern: new RegExp('\\d'),
        },
    },
};
/** @type {?} */
var timeMasks = ['Hh:m0:s0', 'Hh:m0', 'm0:s0'];
/** @type {?} */
var withoutValidation = [
    'percent',
    'Hh',
    's0',
    'm0',
    'separator',
    'd0/M0/0000',
    'd0/M0',
    'd0',
    'M0',
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MaskApplierService = /** @class */ (function () {
    function MaskApplierService(_config) {
        var _this = this;
        this._config = _config;
        this.maskExpression = '';
        this.actualValue = '';
        this.shownMaskExpression = '';
        this._formatWithSeparators = (/**
         * @param {?} str
         * @param {?} thousandSeparatorChar
         * @param {?} decimalChar
         * @param {?} precision
         * @return {?}
         */
        function (str, thousandSeparatorChar, decimalChar, precision) {
            /** @type {?} */
            var x = str.split(decimalChar);
            /** @type {?} */
            var decimals = x.length > 1 ? "" + decimalChar + x[1] : '';
            /** @type {?} */
            var res = x[0];
            /** @type {?} */
            var separatorLimit = _this.separatorLimit.replace(/\s/g, '');
            if (separatorLimit && +separatorLimit) {
                if (res[0] === '-') {
                    res = "-" + res.slice(1, res.length).slice(0, separatorLimit.length);
                }
                else {
                    res = res.slice(0, separatorLimit.length);
                }
            }
            /** @type {?} */
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(res)) {
                res = res.replace(rgx, '$1' + thousandSeparatorChar + '$2');
            }
            if (precision === undefined) {
                return res + decimals;
            }
            else if (precision === 0) {
                return res;
            }
            return res + decimals.substr(0, precision + 1);
        });
        this.percentage = (/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            return Number(str) >= 0 && Number(str) <= 100;
        });
        this.getPrecision = (/**
         * @param {?} maskExpression
         * @return {?}
         */
        function (maskExpression) {
            /** @type {?} */
            var x = maskExpression.split('.');
            if (x.length > 1) {
                return Number(x[x.length - 1]);
            }
            return Infinity;
        });
        this.checkInputPrecision = (/**
         * @param {?} inputValue
         * @param {?} precision
         * @param {?} decimalMarker
         * @return {?}
         */
        function (inputValue, precision, decimalMarker) {
            if (precision < Infinity) {
                /** @type {?} */
                var precisionRegEx = new RegExp(_this._charToRegExpExpression(decimalMarker) + ("\\d{" + precision + "}.*$"));
                /** @type {?} */
                var precisionMatch = inputValue.match(precisionRegEx);
                if (precisionMatch && precisionMatch[0].length - 1 > precision) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                else if (precision === 0 && inputValue.endsWith(decimalMarker)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
            }
            return inputValue;
        });
        this._shift = new Set();
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = this._config.specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.suffix = this._config.suffix;
        this.thousandSeparator = this._config.thousandSeparator;
        this.decimalMarker = this._config.decimalMarker;
        this.hiddenInput = this._config.hiddenInput;
        this.showMaskTyped = this._config.showMaskTyped;
        this.placeHolderCharacter = this._config.placeHolderCharacter;
        this.validation = this._config.validation;
        this.separatorLimit = this._config.separatorLimit;
        this.allowNegativeNumbers = this._config.allowNegativeNumbers;
    }
    /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    MaskApplierService.prototype.applyMaskWithPattern = /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    function (inputValue, maskAndPattern) {
        var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(maskAndPattern, 2), mask = _a[0], customPattern = _a[1];
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    };
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskApplierService.prototype.applyMask = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        /** @type {?} */
        var cursor = 0;
        /** @type {?} */
        var result = '';
        /** @type {?} */
        var multi = false;
        /** @type {?} */
        var backspaceShift = false;
        /** @type {?} */
        var shift = 1;
        /** @type {?} */
        var stepBack = false;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        if (!!this.suffix && inputValue.endsWith(this.suffix)) {
            inputValue = inputValue.slice(0, inputValue.length - this.suffix.length);
        }
        /** @type {?} */
        var inputArray = inputValue.toString().split('');
        if (maskExpression === 'IP') {
            this.ipError = !!(inputArray.filter((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i === '.'; })).length < 3 && inputArray.length < 7);
            maskExpression = '099.099.099.099';
        }
        if (maskExpression.startsWith('percent')) {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                inputValue = this._stripToDecimal(inputValue);
                /** @type {?} */
                var precision = this.getPrecision(maskExpression);
                inputValue = this.checkInputPrecision(inputValue, precision, '.');
            }
            if (inputValue.indexOf('.') > 0 && !this.percentage(inputValue.substring(0, inputValue.indexOf('.')))) {
                /** @type {?} */
                var base = inputValue.substring(0, inputValue.indexOf('.') - 1);
                inputValue = "" + base + inputValue.substring(inputValue.indexOf('.'), inputValue.length);
            }
            if (this.percentage(inputValue)) {
                result = inputValue;
            }
            else {
                result = inputValue.substring(0, inputValue.length - 1);
            }
        }
        else if (maskExpression.startsWith('separator')) {
            if (inputValue.match('[wа-яА-Я]') ||
                inputValue.match('[ЁёА-я]') ||
                inputValue.match('[a-z]|[A-Z]') ||
                inputValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\[\]:";<>.?\/]/) ||
                inputValue.match('[^A-Za-z0-9,]')) {
                inputValue = this._stripToDecimal(inputValue);
            }
            inputValue =
                inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== this.decimalMarker
                    ? inputValue.slice(1, inputValue.length)
                    : inputValue;
            // TODO: we had different rexexps here for the different cases... but tests dont seam to bother - check this
            //  separator: no COMMA, dot-sep: no SPACE, COMMA OK, comma-sep: no SPACE, COMMA OK
            /** @type {?} */
            var thousandSeperatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);
            /** @type {?} */
            var decimalMarkerEscaped = this._charToRegExpExpression(this.decimalMarker);
            /** @type {?} */
            var invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,";<>?\\/'
                .replace(thousandSeperatorCharEscaped, '')
                .replace(decimalMarkerEscaped, '');
            /** @type {?} */
            var invalidCharRegexp = new RegExp('[' + invalidChars + ']');
            if (inputValue.match(invalidCharRegexp)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            /** @type {?} */
            var precision = this.getPrecision(maskExpression);
            inputValue = this.checkInputPrecision(inputValue, precision, this.decimalMarker);
            /** @type {?} */
            var strForSep = inputValue.replace(new RegExp(thousandSeperatorCharEscaped, 'g'), '');
            result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, precision);
            /** @type {?} */
            var commaShift = result.indexOf(',') - inputValue.indexOf(',');
            /** @type {?} */
            var shiftStep = result.length - inputValue.length;
            if (shiftStep > 0 && result[position] !== ',') {
                backspaceShift = true;
                /** @type {?} */
                var _shift = 0;
                do {
                    this._shift.add(position + _shift);
                    _shift++;
                } while (_shift < shiftStep);
            }
            else if ((commaShift !== 0 && position > 0 && !(result.indexOf(',') >= position && position > 3)) ||
                (!(result.indexOf('.') >= position && position > 3) && shiftStep <= 0)) {
                this._shift.clear();
                backspaceShift = true;
                shift = shiftStep;
                position += shiftStep;
                this._shift.add(position);
            }
            else {
                this._shift.clear();
            }
        }
        else {
            for (
            // tslint:disable-next-line
            var i = 0, inputSymbol = inputArray[0]; i < inputArray.length; i++, inputSymbol = inputArray[i]) {
                if (cursor === maskExpression.length) {
                    break;
                }
                if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                    result += inputSymbol;
                    cursor += 2;
                }
                else if (maskExpression[cursor + 1] === '*' &&
                    multi &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                    multi = false;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '*') {
                    result += inputSymbol;
                    multi = true;
                }
                else if (maskExpression[cursor + 1] === '?' &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) ||
                    (this.hiddenInput &&
                        this.maskAvailablePatterns[maskExpression[cursor]] &&
                        this.maskAvailablePatterns[maskExpression[cursor]].symbol === inputSymbol)) {
                    if (maskExpression[cursor] === 'H') {
                        if (Number(inputSymbol) > 2) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'h') {
                        if (result === '2' && Number(inputSymbol) > 3) {
                            cursor += 1;
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    /** @type {?} */
                    var daysCount = 31;
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputValue.slice(cursor, cursor + 2)) > daysCount || inputValue[cursor + 1] === '/') {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'M') {
                        /** @type {?} */
                        var monthsCount = 12;
                        // mask without day
                        /** @type {?} */
                        var withoutDays = cursor === 0 &&
                            (Number(inputSymbol) > 2 ||
                                Number(inputValue.slice(cursor, cursor + 2)) > monthsCount ||
                                inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for input
                        /** @type {?} */
                        var day1monthInput = inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            ((inputValue[cursor - 2] === '/' &&
                                (Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount && inputValue[cursor] !== '/')) ||
                                inputValue[cursor] === '/' ||
                                ((inputValue[cursor - 3] === '/' &&
                                    (Number(inputValue.slice(cursor - 2, cursor)) > monthsCount && inputValue[cursor - 1] !== '/')) ||
                                    inputValue[cursor - 1] === '/'));
                        // 10<day<31 && month<12 for input
                        /** @type {?} */
                        var day2monthInput = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] === '/' &&
                            (Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for paste whole data
                        /** @type {?} */
                        var day1monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) > daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            (!inputValue.slice(cursor - 2, cursor).includes('/') &&
                                Number(inputValue.slice(cursor - 2, cursor)) > monthsCount);
                        // 10<day<31 && month<12 for paste whole data
                        /** @type {?} */
                        var day2monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] !== '/' &&
                            Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount;
                        if (withoutDays || day1monthInput || day2monthInput || day1monthPaste || day2monthPaste) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                    result += maskExpression[cursor];
                    cursor++;
                    /** @type {?} */
                    var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                    this._shift.add(shiftStep + this.prefix.length || 0);
                    i--;
                }
                else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1 &&
                    this.maskAvailablePatterns[maskExpression[cursor]] &&
                    this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                    if (!!inputArray[cursor] && maskExpression !== '099.099.099.099') {
                        result += inputArray[cursor];
                    }
                    cursor++;
                    i--;
                }
                else if (this.maskExpression[cursor + 1] === '*' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.maskExpression[cursor + 1] === '?' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.showMaskTyped && this.maskSpecialCharacters.indexOf(inputSymbol) < 0 && inputSymbol !== this.placeHolderCharacter) {
                    stepBack = true;
                }
            }
        }
        if (result.length + 1 === maskExpression.length &&
            this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        /** @type {?} */
        var newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        /** @type {?} */
        var actualShift = this._shift.has(position) ? shift : 0;
        if (stepBack) {
            actualShift--;
        }
        cb(actualShift, backspaceShift);
        if (shift < 0) {
            this._shift.clear();
        }
        /** @type {?} */
        var res = "" + this.prefix + result + this.suffix;
        if (result.length === 0) {
            res = "" + this.prefix + result;
        }
        return res;
    };
    /**
     * @param {?} inputSymbol
     * @return {?}
     */
    MaskApplierService.prototype._findSpecialChar = /**
     * @param {?} inputSymbol
     * @return {?}
     */
    function (inputSymbol) {
        return this.maskSpecialCharacters.find((/**
         * @param {?} val
         * @return {?}
         */
        function (val) { return val === inputSymbol; }));
    };
    /**
     * @protected
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    MaskApplierService.prototype._checkSymbolMask = /**
     * @protected
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    function (inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
        return (this.maskAvailablePatterns[maskSymbol] &&
            this.maskAvailablePatterns[maskSymbol].pattern &&
            this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    MaskApplierService.prototype._stripToDecimal = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str
            .split('')
            .filter((/**
         * @param {?} i
         * @param {?} idx
         * @return {?}
         */
        function (i, idx) {
            return i.match('^-?\\d') || i === '.' || i === ',' || (i === '-' && idx === 0);
        }))
            .join('');
    };
    /**
     * @private
     * @param {?} char
     * @return {?}
     */
    MaskApplierService.prototype._charToRegExpExpression = /**
     * @private
     * @param {?} char
     * @return {?}
     */
    function (char) {
        /** @type {?} */
        var charsToEscape = '[\\^$.|?*+()';
        return char === ' ' ? '\\s' : charsToEscape.indexOf(char) >= 0 ? '\\' + char : char;
    };
    MaskApplierService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    /** @nocollapse */
    MaskApplierService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [config,] }] }
    ]; };
    return MaskApplierService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MaskService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MaskService, _super);
    function MaskService(document, _config, _elementRef, _renderer) {
        var _this = _super.call(this, _config) || this;
        _this.document = document;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        _this.maskExpression = '';
        _this.isNumberValue = false;
        _this.placeHolderCharacter = '_';
        _this.maskIsShown = '';
        _this.selStart = null;
        _this.selEnd = null;
        _this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        _this._formElement = _this._elementRef.nativeElement;
        return _this;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyMask = 
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        var _this = this;
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        if (!maskExpression) {
            return inputValue;
        }
        this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
        if (this.maskExpression === 'IP' && this.showMaskTyped) {
            this.maskIsShown = this.showMaskInInput(inputValue || '#');
        }
        if (!inputValue && this.showMaskTyped) {
            this.formControlResult(this.prefix);
            return this.prefix + this.maskIsShown;
        }
        /** @type {?} */
        var getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
        /** @type {?} */
        var newInputValue = '';
        if (this.hiddenInput !== undefined) {
            /** @type {?} */
            var actualResult = this.actualValue.split('');
            // tslint:disable no-unused-expression
            inputValue !== '' && actualResult.length
                ? typeof this.selStart === 'number' && typeof this.selEnd === 'number'
                    ? inputValue.length > actualResult.length
                        ? actualResult.splice(this.selStart, 0, getSymbol)
                        : inputValue.length < actualResult.length
                            ? actualResult.length - inputValue.length === 1
                                ? actualResult.splice(this.selStart - 1, 1)
                                : actualResult.splice(this.selStart, this.selEnd - this.selStart)
                            : null
                    : null
                : (actualResult = []);
            // tslint:enable no-unused-expression
            newInputValue = this.actualValue.length ? this.shiftTypedSymbols(actualResult.join('')) : inputValue;
        }
        newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;
        /** @type {?} */
        var result = _super.prototype.applyMask.call(this, newInputValue, maskExpression, position, cb);
        this.actualValue = this.getActualValue(result);
        // handle some separator implications:
        // a.) adjust decimalMarker default (. -> ,) if thousandSeparator is a dot
        if (this.thousandSeparator === '.' && this.decimalMarker === '.') {
            this.decimalMarker = ',';
        }
        // b) remove decimal marker from list of special characters to mask
        if (this.maskExpression.startsWith('separator') && this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item !== _this.decimalMarker; }));
        }
        this.formControlResult(result);
        if (!this.showMaskTyped) {
            if (this.hiddenInput) {
                return result && result.length ? this.hideInput(result, this.maskExpression) : result;
            }
            return result;
        }
        /** @type {?} */
        var resLen = result.length;
        /** @type {?} */
        var prefNmask = this.prefix + this.maskIsShown;
        return result + (this.maskExpression === 'IP' ? prefNmask : prefNmask.slice(resLen));
    };
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyValueChanges = /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        this._formElement.value = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    };
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    MaskService.prototype.hideInput = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    function (inputValue, maskExpression) {
        var _this = this;
        return inputValue
            .split('')
            .map((/**
         * @param {?} curr
         * @param {?} index
         * @return {?}
         */
        function (curr, index) {
            if (_this.maskAvailablePatterns &&
                _this.maskAvailablePatterns[maskExpression[index]] &&
                _this.maskAvailablePatterns[maskExpression[index]].symbol) {
                return _this.maskAvailablePatterns[maskExpression[index]].symbol;
            }
            return curr;
        }))
            .join('');
    };
    // this function is not necessary, it checks result against maskExpression
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    MaskService.prototype.getActualValue = 
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        /** @type {?} */
        var compare = res
            .split('')
            .filter((/**
         * @param {?} symbol
         * @param {?} i
         * @return {?}
         */
        function (symbol, i) {
            return _this._checkSymbolMask(symbol, _this.maskExpression[i]) ||
                (_this.maskSpecialCharacters.includes(_this.maskExpression[i]) && symbol === _this.maskExpression[i]);
        }));
        if (compare.join('') === res) {
            return compare.join('');
        }
        return res;
    };
    /**
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.shiftTypedSymbols = /**
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        var _this = this;
        /** @type {?} */
        var symbolToReplace = '';
        /** @type {?} */
        var newInputValue = (inputValue &&
            inputValue.split('').map((/**
             * @param {?} currSymbol
             * @param {?} index
             * @return {?}
             */
            function (currSymbol, index) {
                if (_this.maskSpecialCharacters.includes(inputValue[index + 1]) &&
                    inputValue[index + 1] !== _this.maskExpression[index + 1]) {
                    symbolToReplace = currSymbol;
                    return inputValue[index + 1];
                }
                if (symbolToReplace.length) {
                    /** @type {?} */
                    var replaceSymbol = symbolToReplace;
                    symbolToReplace = '';
                    return replaceSymbol;
                }
                return currSymbol;
            }))) ||
            [];
        return newInputValue.join('');
    };
    /**
     * @param {?=} inputVal
     * @return {?}
     */
    MaskService.prototype.showMaskInInput = /**
     * @param {?=} inputVal
     * @return {?}
     */
    function (inputVal) {
        if (this.showMaskTyped && !!this.shownMaskExpression) {
            if (this.maskExpression.length !== this.shownMaskExpression.length) {
                throw new Error('Mask expression must match mask placeholder length');
            }
            else {
                return this.shownMaskExpression;
            }
        }
        else if (this.showMaskTyped) {
            if (inputVal) {
                return this._checkForIp(inputVal);
            }
            return this.maskExpression.replace(/\w/g, this.placeHolderCharacter);
        }
        return '';
    };
    /**
     * @return {?}
     */
    MaskService.prototype.clearIfNotMatchFn = /**
     * @return {?}
     */
    function () {
        if (this.clearIfNotMatch &&
            this.prefix.length + this.maskExpression.length + this.suffix.length !==
                this._formElement.value.replace(/_/g, '').length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    };
    Object.defineProperty(MaskService.prototype, "formElementProperty", {
        set: /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), name = _b[0], value = _b[1];
            this._renderer.setProperty(this._formElement, name, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} mask
     * @return {?}
     */
    MaskService.prototype.checkSpecialCharAmount = /**
     * @param {?} mask
     * @return {?}
     */
    function (mask) {
        var _this = this;
        /** @type {?} */
        var chars = mask.split('').filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this._findSpecialChar(item); }));
        return chars.length;
    };
    /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    MaskService.prototype._checkForIp = /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    function (inputVal) {
        if (inputVal === '#') {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        /** @type {?} */
        var arr = [];
        for (var i = 0; i < inputVal.length; i++) {
            if (inputVal[i].match('\\d')) {
                arr.push(inputVal[i]);
            }
        }
        if (arr.length <= 3) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 3 && arr.length <= 6) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 6 && arr.length <= 9) {
            return this.placeHolderCharacter;
        }
        if (arr.length > 9 && arr.length <= 12) {
            return '';
        }
        return '';
    };
    /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.formControlResult = /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        if (Array.isArray(this.dropSpecialCharacters)) {
            this.onChange(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters));
        }
        else if (this.dropSpecialCharacters) {
            this.onChange(this._checkSymbols(inputValue));
        }
        else {
            this.onChange(this._removeSuffix(this._removePrefix(inputValue)));
        }
    };
    /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._removeMask = /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (value, specialCharactersForRemove) {
        return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removePrefix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removeSuffix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.suffix) {
            return value;
        }
        return value ? value.replace(this.suffix, '') : value;
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorValue = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    };
    /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._regExpForRemove = /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return "\\" + item; })).join('|'), 'gi');
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._checkSymbols = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        if (result === '') {
            return result;
        }
        /** @type {?} */
        var separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
        /** @type {?} */
        var separatorValue = this._retrieveSeparatorValue(result);
        if (this.decimalMarker !== '.') {
            separatorValue = separatorValue.replace(this.decimalMarker, '.');
        }
        if (this.isNumberValue) {
            if (separatorPrecision) {
                if (result === this.decimalMarker) {
                    return null;
                }
                return this._checkPrecision(this.maskExpression, separatorValue);
            }
            else {
                return Number(separatorValue);
            }
        }
        else {
            return separatorValue;
        }
    };
    // TODO should think about helpers or separting decimal precision to own property
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorPrecision = 
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    function (maskExpretion) {
        /** @type {?} */
        var matcher = maskExpretion.match(new RegExp("^separator\\.([^d]*)"));
        return matcher ? Number(matcher[1]) : null;
    };
    /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    MaskService.prototype._checkPrecision = /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    function (separatorExpression, separatorValue) {
        if (separatorExpression.indexOf('2') > 0) {
            return Number(separatorValue).toFixed(2);
        }
        return Number(separatorValue);
    };
    MaskService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    /** @nocollapse */
    MaskService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"],] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [config,] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] }
    ]; };
    return MaskService;
}(MaskApplierService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable deprecation
var MaskDirective = /** @class */ (function () {
    function MaskDirective(document, _maskService, _config) {
        this.document = document;
        this._maskService = _maskService;
        this._config = _config;
        this.maskExpression = '';
        this.specialCharacters = [];
        this.patterns = {};
        this.prefix = '';
        this.suffix = '';
        this.thousandSeparator = ' ';
        this.decimalMarker = '.';
        this.dropSpecialCharacters = null;
        this.hiddenInput = null;
        this.showMaskTyped = null;
        this.placeHolderCharacter = null;
        this.shownMaskExpression = null;
        this.showTemplate = null;
        this.clearIfNotMatch = null;
        this.validation = null;
        this.separatorLimit = null;
        this.allowNegativeNumbers = null;
        this._maskValue = '';
        this._position = null;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouch = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaskDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var maskExpression = changes.maskExpression, specialCharacters = changes.specialCharacters, patterns = changes.patterns, prefix = changes.prefix, suffix = changes.suffix, thousandSeparator = changes.thousandSeparator, decimalMarker = changes.decimalMarker, dropSpecialCharacters = changes.dropSpecialCharacters, hiddenInput = changes.hiddenInput, showMaskTyped = changes.showMaskTyped, placeHolderCharacter = changes.placeHolderCharacter, shownMaskExpression = changes.shownMaskExpression, showTemplate = changes.showTemplate, clearIfNotMatch = changes.clearIfNotMatch, validation = changes.validation, separatorLimit = changes.separatorLimit, allowNegativeNumbers = changes.allowNegativeNumbers;
        if (maskExpression) {
            this._maskValue = changes.maskExpression.currentValue || '';
        }
        if (specialCharacters) {
            if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
                return;
            }
            else {
                this._maskService.maskSpecialCharacters = changes.specialCharacters.currentValue || [];
            }
        }
        // Only overwrite the mask available patterns if a pattern has actually been passed in
        if (patterns && patterns.currentValue) {
            this._maskService.maskAvailablePatterns = patterns.currentValue;
        }
        if (prefix) {
            this._maskService.prefix = prefix.currentValue;
        }
        if (suffix) {
            this._maskService.suffix = suffix.currentValue;
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator.currentValue;
        }
        if (decimalMarker) {
            this._maskService.decimalMarker = decimalMarker.currentValue;
        }
        if (dropSpecialCharacters) {
            this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
        }
        if (hiddenInput) {
            this._maskService.hiddenInput = hiddenInput.currentValue;
        }
        if (showMaskTyped) {
            this._maskService.showMaskTyped = showMaskTyped.currentValue;
        }
        if (placeHolderCharacter) {
            this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
        }
        if (shownMaskExpression) {
            this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
        }
        if (showTemplate) {
            this._maskService.showTemplate = showTemplate.currentValue;
        }
        if (clearIfNotMatch) {
            this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
        }
        if (validation) {
            this._maskService.validation = validation.currentValue;
        }
        if (separatorLimit) {
            this._maskService.separatorLimit = separatorLimit.currentValue;
        }
        if (allowNegativeNumbers) {
            this._maskService.maskSpecialCharacters = this._maskService.maskSpecialCharacters.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c !== '-'; }));
        }
        this._applyMask();
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    MaskDirective.prototype.validate = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a.value;
        if (!this._maskService.validation) {
            return null;
        }
        if (this._maskService.ipError) {
            return this._createValidationError(value);
        }
        if (this._maskValue.startsWith('separator')) {
            return null;
        }
        if (withoutValidation.includes(this._maskValue)) {
            return null;
        }
        if (this._maskService.clearIfNotMatch) {
            return null;
        }
        if (timeMasks.includes(this._maskValue)) {
            return this._validateTime(value);
        }
        if (value && value.toString().length >= 1) {
            /** @type {?} */
            var counterOfOpt = 0;
            var _loop_1 = function (key) {
                if (this_1._maskService.maskAvailablePatterns[key].optional &&
                    this_1._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this_1._maskValue.indexOf(key) !== this_1._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        var opt = this_1._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i === key; }))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this_1._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this_1._maskValue.indexOf(key) !== -1 && value.toString().length >= this_1._maskValue.indexOf(key)) {
                        return { value: null };
                    }
                    if (counterOfOpt === this_1._maskValue.length) {
                        return { value: null };
                    }
                }
            };
            var this_1 = this;
            for (var key in this._maskService.maskAvailablePatterns) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            if (this._maskValue.indexOf('{') === 1 &&
                value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4) {
                return null;
            }
            if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
                return null;
            }
            else if ((this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*')) ||
                (this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?')) ||
                this._maskValue.indexOf('{') === 1) {
                return this._createValidationError(value);
            }
            if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
                /** @type {?} */
                var length_1 = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length_1) {
                    return this._createValidationError(value);
                }
            }
        }
        return null;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        var position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        var caretShift = 0;
        /** @type {?} */
        var backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        function (shift, _backspaceShift) {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        var positionToApply = this._position
            ? this._inputValue.length + position + caretShift
            : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
        if (positionToApply > this._getActualInputLength()) {
            positionToApply = this._getActualInputLength();
        }
        el.setSelectionRange(positionToApply, positionToApply);
        if ((this.maskExpression.includes('H') || this.maskExpression.includes('M')) && caretShift === 0) {
            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) + 1, ((/** @type {?} */ (el.selectionStart))) + 1);
        }
        this._position = null;
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        /** @type {?} */
        var posStart = 0;
        /** @type {?} */
        var posEnd = 0;
        if (el !== null &&
            el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            ((/** @type {?} */ (e))).keyCode !== 38)
            if (this._maskService.showMaskTyped) {
                // We are showing the mask in the input
                this._maskService.maskIsShown = this._maskService.showMaskInInput();
                if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
                    // the input ONLY contains the mask, so position the cursor at the start
                    el.focus();
                    el.setSelectionRange(posStart, posEnd);
                }
                else {
                    // the input contains some characters already
                    if (el.selectionStart > this._maskService.actualValue.length) {
                        // if the user clicked beyond our value's length, position the cursor at the end of our value
                        el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
                    }
                }
            }
        /** @type {?} */
        var nextValue = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
        if (el.value !== nextValue) {
            el.value = nextValue;
        }
        /** fix of cursor position with prefix when mouse click occur */
        if ((((/** @type {?} */ (el.selectionStart))) || ((/** @type {?} */ (el.selectionEnd)))) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
        /** select only inserted text */
        if (((/** @type {?} */ (el.selectionEnd))) > this._getActualInputLength()) {
            el.selectionEnd = this._getActualInputLength();
        }
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onKeyDown = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 46) {
            if (e.keyCode === 8 && el.value.length === 0) {
                el.selectionStart = el.selectionEnd;
            }
            if (e.keyCode === 8 && ((/** @type {?} */ (el.selectionStart))) !== 0) {
                // If specialChars is false, (shouldn't ever happen) then set to the defaults
                this.specialCharacters = this.specialCharacters || this._config.specialCharacters;
                if (this.prefix.length > 1 && ((/** @type {?} */ (el.selectionStart))) <= this.prefix.length) {
                    el.setSelectionRange(this.prefix.length, this.prefix.length);
                }
                else {
                    if (this._inputValue.length !== ((/** @type {?} */ (el.selectionStart))) && ((/** @type {?} */ (el.selectionStart))) !== 1) {
                        while (this.specialCharacters.includes(this._inputValue[((/** @type {?} */ (el.selectionStart))) - 1].toString()) &&
                            ((this.prefix.length >= 1 && ((/** @type {?} */ (el.selectionStart))) > this.prefix.length) ||
                                this.prefix.length === 0)) {
                            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
                        }
                    }
                    this.suffixCheckOnPressDelete(e.keyCode, el);
                }
            }
            this.suffixCheckOnPressDelete(e.keyCode, el);
            if (this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionStart))) <= this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionEnd))) <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            /** @type {?} */
            var cursorStart = el.selectionStart;
            // this.onFocus(e);
            if (e.keyCode === 8 &&
                !el.readOnly &&
                cursorStart === 0 &&
                el.selectionEnd === el.value.length &&
                el.value.length !== 0) {
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
                this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
            }
        }
        if (!!this.suffix &&
            this.suffix.length > 1 &&
            this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
            el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
        else if ((e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+ A
            (e.keyCode === 65 && e.metaKey === true) // Cmd + A (Mac)
        ) {
            el.setSelectionRange(0, this._getActualInputLength());
            e.preventDefault();
        }
        this._maskService.selStart = el.selectionStart;
        this._maskService.selEnd = el.selectionEnd;
    };
    /** It writes the value in the input */
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                if (typeof inputValue === 'number') {
                    inputValue = String(inputValue);
                    inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
                    this._maskService.isNumberValue = true;
                }
                (inputValue && this._maskService.maskExpression) ||
                    (this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped))
                    ? (this._maskService.formElementProperty = [
                        'value',
                        this._maskService.applyMask(inputValue, this._maskService.maskExpression),
                    ])
                    : (this._maskService.formElementProperty = ['value', inputValue]);
                this._inputValue = inputValue;
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    MaskDirective.prototype.suffixCheckOnPressDelete = /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    function (keyCode, el) {
        if (keyCode === 46 && this.suffix.length > 0) {
            if (this._inputValue.length - this.suffix.length <= ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
        }
        if (keyCode === 8) {
            if (this.suffix.length > 1 && this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
            if (this.suffix.length === 1 && this._inputValue.length === ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
            }
        }
    };
    /** It disables the input element */
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onModelChange = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    };
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    MaskDirective.prototype._repeatPatternSymbols = /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    function (maskExp) {
        var _this = this;
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            function (accum, currval, index) {
                _this._start = currval === '{' ? index : _this._start;
                if (currval !== '}') {
                    return _this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                _this._end = index;
                /** @type {?} */
                var repeatNumber = Number(maskExp.slice(_this._start + 1, _this._end));
                /** @type {?} */
                var repaceWith = new Array(repeatNumber + 1).join(maskExp[_this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._applyMask = 
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    function () {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskDirective.prototype._validateTime = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s !== ':'; })).length;
        if (value === null || value.length === 0) {
            return null; // Don't validate empty values to allow for optional form control
        }
        if ((+value[value.length - 1] === 0 && value.length < rowMaskLen) || value.length <= rowMaskLen - 2) {
            return this._createValidationError(value);
        }
        return null;
    };
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._getActualInputLength = /**
     * @private
     * @return {?}
     */
    function () {
        return (this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length);
    };
    /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    MaskDirective.prototype._createValidationError = /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    function (actualValue) {
        return {
            mask: {
                requiredMask: this._maskValue,
                actualValue: actualValue,
            },
        };
    };
    MaskDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        MaskService,
                    ],
                },] }
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"],] }] },
        { type: MaskService },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [config,] }] }
    ]; };
    MaskDirective.propDecorators = {
        maskExpression: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['mask',] }],
        specialCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        patterns: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        prefix: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        suffix: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        thousandSeparator: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        decimalMarker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        dropSpecialCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        hiddenInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showMaskTyped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        placeHolderCharacter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        shownMaskExpression: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        clearIfNotMatch: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        validation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        separatorLimit: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        allowNegativeNumbers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['input', ['$event'],] }],
        onBlur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['blur',] }],
        onFocus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['click', ['$event'],] }],
        onKeyDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keydown', ['$event'],] }],
        onModelChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['ngModelChange', ['$event'],] }]
    };
    return MaskDirective;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MaskPipe = /** @class */ (function () {
    function MaskPipe(_maskService) {
        this._maskService = _maskService;
    }
    /**
     * @param {?} value
     * @param {?} mask
     * @param {?=} thousandSeparator
     * @return {?}
     */
    MaskPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} mask
     * @param {?=} thousandSeparator
     * @return {?}
     */
    function (value, mask, thousandSeparator) {
        if (thousandSeparator === void 0) { thousandSeparator = null; }
        if (!value && typeof value !== 'number') {
            return '';
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator;
        }
        if (typeof mask === 'string') {
            return this._maskService.applyMask("" + value, mask);
        }
        return this._maskService.applyMaskWithPattern("" + value, mask);
    };
    MaskPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{
                    name: 'mask',
                    pure: true,
                },] }
    ];
    /** @nocollapse */
    MaskPipe.ctorParameters = function () { return [
        { type: MaskApplierService }
    ]; };
    return MaskPipe;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaskModule = /** @class */ (function () {
    function NgxMaskModule() {
    }
    /**
     * @param {?=} configValue
     * @return {?}
     */
    NgxMaskModule.forRoot = /**
     * @param {?=} configValue
     * @return {?}
     */
    function (configValue) {
        return {
            ngModule: NgxMaskModule,
            providers: [
                {
                    provide: NEW_CONFIG,
                    useValue: configValue,
                },
                {
                    provide: INITIAL_CONFIG,
                    useValue: initialConfig,
                },
                {
                    provide: config,
                    useFactory: _configFactory,
                    deps: [INITIAL_CONFIG, NEW_CONFIG],
                },
                MaskApplierService,
            ],
        };
    };
    /**
     * @param {?=} _configValue
     * @return {?}
     */
    NgxMaskModule.forChild = /**
     * @param {?=} _configValue
     * @return {?}
     */
    function (_configValue) {
        return {
            ngModule: NgxMaskModule,
        };
    };
    NgxMaskModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    exports: [MaskDirective, MaskPipe],
                    declarations: [MaskDirective, MaskPipe],
                },] }
    ];
    return NgxMaskModule;
}());
/**
 * \@internal
 * @param {?} initConfig
 * @param {?} configValue
 * @return {?}
 */
function _configFactory(initConfig, configValue) {
    return configValue instanceof Function ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, initConfig, configValue()) : Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, initConfig, configValue);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
((/**
 * @return {?}
 */
function () {
    if (!commonjsGlobal.KeyboardEvent) {
        commonjsGlobal.KeyboardEvent = (/**
         * @param {?} _eventType
         * @param {?} _init
         * @return {?}
         */
        function (_eventType, _init) { });
    }
}))();


var customKeyboardEvent = {

};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-mask.js.map


/***/ }),

/***/ "./src/app/page/account-list/account-list.component.css":
/*!**************************************************************!*\
  !*** ./src/app/page/account-list/account-list.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-body {\r\n    flex: 1 1 auto;\r\n    min-height: 1px;\r\n    padding: 1.25rem;\r\n}\r\n\r\n.overflow-auto {\r\n    overflow: auto !important;\r\n}\r\n\r\n.table {\r\n    width: 100%;\r\n    margin-bottom: 1rem;\r\n    color: #212529;\r\n}\r\n\r\n/* .shadow-lg {\r\n    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%) !important;\r\n} */\r\n\r\n.purple-text-start {\r\n    text-align: left;\r\n    font-family: PSL-Bd;\r\n    font-size: 20px;\r\n    letter-spacing: 0px;\r\n    color: #4a2886;\r\n}\r\n\r\n.form-control-custom {\r\n    height: 42px !important;\r\n    width: 140px !important;\r\n    font-family: PSL;\r\n    border-radius: 4px;\r\n    border: 1px solid #707070;\r\n    width: 100px;\r\n  }\r\n\r\n.table-responsive {\r\n    max-height:300px;\r\n}\r\n\r\n.numberDate {\r\n    font-size: 24px;\r\n    font-weight: 700;\r\n    color: #212529;\r\n}\r\n\r\n \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9hY2NvdW50LWxpc3QvYWNjb3VudC1saXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsY0FBYztBQUNsQjs7QUFFQTs7R0FFRzs7QUFFSDtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixZQUFZO0VBQ2Q7O0FBRUE7SUFDRSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9wYWdlL2FjY291bnQtbGlzdC9hY2NvdW50LWxpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkLWJvZHkge1xyXG4gICAgZmxleDogMSAxIGF1dG87XHJcbiAgICBtaW4taGVpZ2h0OiAxcHg7XHJcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xyXG59XHJcblxyXG4ub3ZlcmZsb3ctYXV0byB7XHJcbiAgICBvdmVyZmxvdzogYXV0byAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4udGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgY29sb3I6ICMyMTI1Mjk7XHJcbn1cclxuXHJcbi8qIC5zaGFkb3ctbGcge1xyXG4gICAgYm94LXNoYWRvdzogMCAxcmVtIDNyZW0gcmdiKDAgMCAwIC8gMTglKSAhaW1wb3J0YW50O1xyXG59ICovXHJcblxyXG4ucHVycGxlLXRleHQtc3RhcnQge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIGZvbnQtZmFtaWx5OiBQU0wtQmQ7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMHB4O1xyXG4gICAgY29sb3I6ICM0YTI4ODY7XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRyb2wtY3VzdG9tIHtcclxuICAgIGhlaWdodDogNDJweCAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IDE0MHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LWZhbWlseTogUFNMO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzcwNzA3MDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICB9XHJcblxyXG4gIC50YWJsZS1yZXNwb25zaXZlIHtcclxuICAgIG1heC1oZWlnaHQ6MzAwcHg7XHJcbn1cclxuXHJcbi5udW1iZXJEYXRlIHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBjb2xvcjogIzIxMjUyOTtcclxufVxyXG5cclxuICJdfQ== */"

/***/ }),

/***/ "./src/app/page/account-list/account-list.component.html":
/*!***************************************************************!*\
  !*** ./src/app/page/account-list/account-list.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid mt-4\">\n  <!-- <div class=\"row\">\n    <div class=\"col-12 ml-3 mr-3 mb-3\">\n      รายการบัญชีหลัก\n    </div>\n  </div> -->\n\n  <form [formGroup]=\"form\">\n    <div class=\"row\">\n      <div class=\"col-12 ml-3 mr-3 mb-3\">\n        <span >\n          วันที่\n        </span>\n        <span class=\"purple-text-start mr-2\">\n          <input type=\"date\" class=\"form-control-custom\" id=\"start\" name=\"start\" formControlName=\"startDate\">\n        </span>\n        <span >\n          ถึงวันที่\n        </span>\n        <span class=\"purple-text-start mr-2\">\n          <input type=\"date\" class=\"form-control-custom\" id=\"end\" name=\"end\" formControlName=\"endDate\">\n        </span>\n        <button type=\"button\" class=\"btn btn-primary ml-2\" name=\"search\" (click)=\"search()\">ค้นหา</button>\n      </div>\n    </div>\n  </form>\n\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"card shadow-lg\">\n        <div class=\"card-header\" >\n          รายการบัญชีหลัก\n        </div>\n\n        <div class=\"card-header\" >\n          รายได้ <span class=\"numberDate ml-2\"> {{sumNumber}} </span>\n        </div>\n      <!-- <div class=\"card-body overflow-auto\"> -->\n      <div class=\"datatable-inner\" mdbScrollbar style=\"overflow-y: auto;\n          overflow-x: auto;\">\n        <table class=\"table table-striped\">\n          <thead style=\"background-color: rgb(143, 145, 145);\">\n            <tr>\n              <th class=\"col-2\" >วันที่</th>\n              <th class=\"col-5\" >ลูกค้า</th>\n              <th class=\"col-3 text-center\" >รายได้</th>\n              <th class=\"col-2\"></th>\n            </tr>\n          </thead>\n          <tbody *ngFor=\"let item of listData| slice: (page-1) * pageSize : page * pageSize;\n          let i = index; let last = last\">\n            <tr>\n              <td class=\"col-2\" >{{item.createDate}}</td>\n              <td class=\"col-5\">{{item.customerName}}</td>\n              <td class=\"col-3 text-right\">{{item.sumIncome}}</td>\n              <td class=\"col-2 text-center\"> <button type=\"button\" class=\"btn btn-primary\" (click)=\"searchDetail(item)\">ดูรายการ</button></td>\n            </tr>\n          </tbody>\n        </table>\n        <div class=\"row float-right pt-3 pr-5\">\n          <ngb-pagination [(page)]=\"page\" [pageSize]=\"pageSize\" [collectionSize]=\"listData.length\"></ngb-pagination>\n        </div>\n        <!-- </div> -->\n      </div>\n      <!-- </div> -->\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/page/account-list/account-list.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/page/account-list/account-list.component.ts ***!
  \*************************************************************/
/*! exports provided: AccountListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountListComponent", function() { return AccountListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_service_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/service.service */ "./src/app/service/service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AccountListComponent = /** @class */ (function () {
    function AccountListComponent(service, router) {
        this.service = service;
        this.router = router;
        this.listData = [];
        this.page = 1;
        this.pageSize = 10;
        this.sumNumber = '0';
    }
    AccountListComponent.prototype.ngOnInit = function () {
        this.initialFrom();
        this.search();
    };
    AccountListComponent.prototype.initialFrom = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            startDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            endDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
        });
        var date = new Date();
        date.setDate(date.getDate() - 30);
        this.form.controls.startDate.patchValue(this.formatDateInput(date));
        this.form.controls.endDate.patchValue(this.formatDateInput(new Date()));
    };
    AccountListComponent.prototype.formatDateInput = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_3__(date).format('YYYY-MM-DD');
    };
    AccountListComponent.prototype.formatDateInput2 = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_3__(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    };
    AccountListComponent.prototype.search = function () {
        var _this = this;
        this.listData = [];
        var sum = 0;
        this.service.search(this.formatDateInput2(this.form.controls.startDate.value), this.formatDateInput2(this.form.controls.endDate.value)).subscribe(function (resp) {
            if (resp && resp.length !== 0) {
                resp.forEach(function (item) {
                    _this.listData.push({
                        customerId: item.customerId,
                        customerName: item.customerName,
                        createDate: item.createDate,
                        sumIncome: _this.localeString(item.sumIncome)
                    });
                    sum += item.sumIncome;
                });
                _this.sumNumber = _this.localeString(sum);
            }
        });
    };
    AccountListComponent.prototype.searchDetail = function (item) {
        var data = {
            customerId: item.customerId,
            dueDate: item.createDate,
            status: 'account'
        };
        localStorage.removeItem('dataMain');
        localStorage.setItem('dataMain', JSON.stringify(data));
        this.router.navigate(['/view-detail']);
    };
    AccountListComponent.prototype.localeString = function (data) {
        var points = data.toLocaleString('en-US');
        return points;
    };
    AccountListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-account-list',
            template: __webpack_require__(/*! ./account-list.component.html */ "./src/app/page/account-list/account-list.component.html"),
            styles: [__webpack_require__(/*! ./account-list.component.css */ "./src/app/page/account-list/account-list.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_service_service_service__WEBPACK_IMPORTED_MODULE_4__["ServiceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AccountListComponent);
    return AccountListComponent;
}());



/***/ }),

/***/ "./src/app/page/main/main.component.css":
/*!**********************************************!*\
  !*** ./src/app/page/main/main.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-body {\r\n    flex: 1 1 auto;\r\n    min-height: 1px;\r\n    padding: 1.25rem;\r\n}\r\n\r\n.overflow-auto {\r\n    overflow: auto !important;\r\n}\r\n\r\n.table {\r\n    width: 100%;\r\n    margin-bottom: 1rem;\r\n    color: #212529;\r\n}\r\n\r\n/* .shadow-lg {\r\n    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%) !important;\r\n} */\r\n\r\n.purple-text-start {\r\n    text-align: left;\r\n    font-family: PSL-Bd;\r\n    font-size: 20px;\r\n    letter-spacing: 0px;\r\n    color: #4a2886;\r\n}\r\n\r\n.form-control-custom {\r\n    height: 42px !important;\r\n    width: 140px !important;\r\n    font-family: PSL;\r\n    border-radius: 4px;\r\n    border: 1px solid #6d6b6b;\r\n    width: 100px;\r\n  }\r\n\r\n.mat-toolbar-row, .mat-toolbar-single-row {\r\n    height: 20px;\r\n}\r\n\r\n.numberDate {\r\n    font-size: 24px;\r\n    font-weight: 700;\r\n    color: #212529;\r\n}\r\n\r\n.select-width {\r\n    width: 20%;\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    margin-left: 20px;\r\n}\r\n\r\n \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9tYWluL21haW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksV0FBVztJQUNYLG1CQUFtQjtJQUNuQixjQUFjO0FBQ2xCOztBQUVBOztHQUVHOztBQUVIO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLFlBQVk7RUFDZDs7QUFFQTtJQUNFLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixpQkFBaUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9wYWdlL21haW4vbWFpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtYm9keSB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxuICAgIG1pbi1oZWlnaHQ6IDFweDtcclxuICAgIHBhZGRpbmc6IDEuMjVyZW07XHJcbn1cclxuXHJcbi5vdmVyZmxvdy1hdXRvIHtcclxuICAgIG92ZXJmbG93OiBhdXRvICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi50YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBjb2xvcjogIzIxMjUyOTtcclxufVxyXG5cclxuLyogLnNoYWRvdy1sZyB7XHJcbiAgICBib3gtc2hhZG93OiAwIDFyZW0gM3JlbSByZ2IoMCAwIDAgLyAxOCUpICFpbXBvcnRhbnQ7XHJcbn0gKi9cclxuXHJcbi5wdXJwbGUtdGV4dC1zdGFydCB7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgZm9udC1mYW1pbHk6IFBTTC1CZDtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwcHg7XHJcbiAgICBjb2xvcjogIzRhMjg4NjtcclxufVxyXG5cclxuLmZvcm0tY29udHJvbC1jdXN0b20ge1xyXG4gICAgaGVpZ2h0OiA0MnB4ICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDogMTQwcHggIWltcG9ydGFudDtcclxuICAgIGZvbnQtZmFtaWx5OiBQU0w7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNmQ2YjZiO1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuXHJcbiAgLm1hdC10b29sYmFyLXJvdywgLm1hdC10b29sYmFyLXNpbmdsZS1yb3cge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG59XHJcblxyXG4ubnVtYmVyRGF0ZSB7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgY29sb3I6ICMyMTI1Mjk7XHJcbn1cclxuXHJcbi5zZWxlY3Qtd2lkdGgge1xyXG4gICAgd2lkdGg6IDIwJTtcclxuICAgIGZvbnQtZmFtaWx5OiBQU0w7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNzA3MDcwO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbn1cclxuXHJcbiAiXX0= */"

/***/ }),

/***/ "./src/app/page/main/main.component.html":
/*!***********************************************!*\
  !*** ./src/app/page/main/main.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid mt-2\">\n  <ngx-spinner type=\"ball-beat\"></ngx-spinner>\n  <div class=\"row \">\n    <div class=\"col-12 text-right\">\n      <button type=\"button\" class=\"btn btn-primary btn-lg\" name=\"add\"\n        (click)=\"onClickDetailDialog()\">เพิ่มข้อมูล</button>\n    </div>\n  </div>\n  <hr>\n  <div class=\"row mb-2\">\n    <form [formGroup]=\"form\">\n      <div class=\"col-12\">\n        <span class=\"purple-text-start mr-2\">\n          <input id=\"date1\" type=\"date\" class=\"form-control-custom\" formControlName=\"date\" />\n        </span>\n        <button type=\"button\" class=\"btn btn-primary ml-2\" name=\"search\" (click)=\"get()\">ค้นหา</button>\n      </div>\n    </form>\n  </div>\n  <hr>\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"card shadow-lg\">\n        <div class=\"card-header\">\n          <div class=\"text-left\">\n            รายการประจำวัน\n          </div>\n        </div>\n        <div class=\"card-header\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n              ยอดประจำวัน <span class=\"numberDate ml-2\"> {{numberDate}} </span>\n            </div>\n            <div class=\"col-6 text-right\">\n              <button type=\"button\" class=\"btn btn-success ml-2\" name=\"get\" (click)=\"saveAsTextFile()\"><svg\n                  xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-line\"\n                  viewBox=\"0 0 16 16\">\n                  <path\n                    d=\"M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z\" />\n                </svg></button>\n            </div>\n          </div>\n\n\n        </div>\n        <div class=\"card-body overflow-auto\">\n          <table class=\"table table-striped\">\n            <thead style=\"background-color: rgb(143, 145, 145);\">\n              <tr>\n                <th class=\"col-3\">ลูกค้า</th>\n                <th class=\"col-3\">งวดวันที่</th>\n                <!-- <th class=\"col-1\">ล่วงหน้า</th> -->\n                <th class=\"col-5 text-center\">ยอดรวม</th>\n                <th></th>\n              </tr>\n            </thead>\n\n\n            <tbody *ngFor=\"let item of dataSource | slice: (page-1) * pageSize : page * pageSize;\n             let i = index; let last = last\">\n              <tr>\n                <td class=\"col-3\">{{item.customerName}}</td>\n                <td class=\"col-3\">{{item.dueDate}}</td>\n                <!-- <td class=\"col-1\">{{item.test1}}</td> -->\n                <td class=\"col-5 text-right\">{{item.sumAmt}}</td>\n                <td class=\"text-right\">\n                  <mat-toolbar>\n                    <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n                      <mat-icon>more_vert</mat-icon>\n                    </button>\n                    <mat-menu #menu=\"matMenu\">\n                      <button mat-menu-item (click)=\"detail(item)\">\n                        <mat-icon>search</mat-icon>\n                        <span>ดูรายการ</span>\n                      </button>\n                      <!-- <button mat-menu-item>\n                        <mat-icon>volume_down</mat-icon>\n                        <span>Down Volume</span>\n                      </button>\n                      <button mat-menu-item>\n                        <mat-icon>volume_off</mat-icon>\n                        <span>Off Volume</span>\n                      </button> -->\n                    </mat-menu>\n                  </mat-toolbar>\n                </td>\n\n              </tr>\n            </tbody>\n          </table>\n\n          <div *ngIf=\"dataSource.length === 0\" class=\"col-12 text-center\">\n            <span>ไม่พบข้อมูล</span>\n          </div>\n          <div class=\"row float-right pt-3 pr-5\">\n            <ngb-pagination [(page)]=\"page\" [pageSize]=\"pageSize\" [collectionSize]=\"dataSource.length\"></ngb-pagination>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/page/main/main.component.ts":
/*!*********************************************!*\
  !*** ./src/app/page/main/main.component.ts ***!
  \*********************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _add_new_add_new_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../add-new/add-new.component */ "./src/app/page/add-new/add-new.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var big_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! big.js */ "./node_modules/big.js/big.js");
/* harmony import */ var big_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(big_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_service_service_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/service/service.service */ "./src/app/service/service.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var MainComponent = /** @class */ (function () {
    function MainComponent(modalService, router, service, SpinnerService) {
        this.modalService = modalService;
        this.router = router;
        this.service = service;
        this.SpinnerService = SpinnerService;
        this.date = new Date();
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.page = 1;
        this.pageSize = 10;
        this.dataSource = [];
        this.listCustomer = [];
    }
    MainComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SpinnerService.show();
                        this.initialFrom();
                        return [4 /*yield*/, this.myFunction()];
                    case 1:
                        _a.sent();
                        this.date = new Date();
                        this.get();
                        this.getCustomer();
                        setTimeout(function () {
                            _this.SpinnerService.hide();
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    MainComponent.prototype.getCustomer = function () {
        var _this = this;
        this.listCustomer = [];
        this.service.customer().subscribe(function (resp) {
            if (resp && resp.length !== 0) {
                _this.listCustomer = resp;
            }
        }, function (errorRes) {
            if (errorRes.error && errorRes.error.errorDesc) {
                return;
            }
        });
    };
    MainComponent.prototype.myFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.numberDate = '0';
                this.dataSource.forEach(function (item) {
                    _this.numberDate = _this.localeString(parseInt(_this.formatNumber(_this.numberDate)) + parseInt(_this.formatNumber(item.sumAmt)));
                });
                return [2 /*return*/];
            });
        });
    };
    MainComponent.prototype.onClickDetailDialog = function () {
        var modalRef = this.modalService.open(_add_new_add_new_component__WEBPACK_IMPORTED_MODULE_3__["AddNewComponent"], {
            windowClass: 'modal-fit-content', backdrop: 'static', keyboard: false
        });
        var page = 'Add';
        this.setModalRef(modalRef, { page: page });
        return modalRef;
    };
    MainComponent.prototype.setModalRef = function (modalRef, modalInfo) {
        for (var _i = 0, _a = Object.keys(modalInfo); _i < _a.length; _i++) {
            var item = _a[_i];
            modalRef.componentInstance[item] = modalInfo[item];
        }
        return modalRef;
    };
    MainComponent.prototype.detail = function (item) {
        var data = {
            customerId: item.customerId,
            dueDate: item.dueDate,
            status: 'serach'
        };
        localStorage.removeItem('dataMain');
        localStorage.setItem('dataMain', JSON.stringify(data));
        this.router.navigate(['/view-detail']);
    };
    MainComponent.prototype.initialFrom = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            date: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
        });
        this.form.controls.date.patchValue(this.formatDateInput(new Date()));
    };
    MainComponent.prototype.formatDateInput = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_5__(date).format('YYYY-MM-DD');
    };
    MainComponent.prototype.formatDateTimeInput = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_5__(date).format('DD-MM-YYYY HH:mm:ss');
    };
    MainComponent.prototype.formatDateInput2 = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_5__(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    };
    MainComponent.prototype.localeString = function (data) {
        var points = data.toLocaleString('en-US');
        return points;
    };
    MainComponent.prototype.formatNumber = function (value) {
        if (value && value !== '') {
            var parts = String(value).replace(/[^-\d.]/g, '').split('.');
            parts[0] = new big_js__WEBPACK_IMPORTED_MODULE_6__["Big"](parts[0].padStart(1, '0')).toString();
            return parts[0];
        }
    };
    MainComponent.prototype.saveAsTextFile = function () {
        var fileText = '';
        fileText += 'วันที่: ' + this.isoStringToDate(this.formatDateInput(this.form.controls.date.value)) + "<BR><BR>";
        this.dataSource.forEach(function (element, i) {
            fileText += (i + 1) + '.' + element.customerName + ' = ' + element.sumAmt + "<BR>";
        });
        fileText += 'รวม ' + this.numberDate;
        var w = null;
        setTimeout(function () {
            w = window.open("", "_blank");
            w.document.write(fileText);
        });
    };
    MainComponent.prototype.isoStringToDate = function (data) {
        var date = new Date(data);
        return date.toLocaleDateString('th-TH', {
            weekday: "long",
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };
    MainComponent.prototype.get = function () {
        var _this = this;
        this.dataSource = [];
        this.numberDate = '0';
        this.service.installments(this.formatDateInput2(this.form.controls.date.value)).subscribe(function (resp) {
            if (resp && resp.length !== 0) {
                resp.forEach(function (item) {
                    _this.dataSource.push({
                        customerId: item.customerId,
                        customerName: item.customerName,
                        dueDate: item.dueDate,
                        sumAmt: _this.localeString(item.sumAmt)
                    });
                });
                _this.dataSource.forEach(function (item) {
                    _this.numberDate = _this.localeString(parseInt(_this.formatNumber(_this.numberDate)) + parseInt(_this.formatNumber(item.sumAmt)));
                });
            }
        }, function (errorRes) {
            if (errorRes.error && errorRes.error.errorDesc) {
                return;
            }
        });
    };
    MainComponent.prototype.search = function () {
        var data = {
            customerId: this.customerId,
            dueDate: null,
            status: 'cus'
        };
        localStorage.removeItem('dataMain');
        localStorage.setItem('dataMain', JSON.stringify(data));
        this.router.navigate(['/view-detail']);
    };
    MainComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.component.html */ "./src/app/page/main/main.component.html"),
            styles: [__webpack_require__(/*! ./main.component.css */ "./src/app/page/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_service_service_service__WEBPACK_IMPORTED_MODULE_7__["ServiceService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"]])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/app/page/navbar/navbar.component.css":
/*!**************************************************!*\
  !*** ./src/app/page/navbar/navbar.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\r\n    flex: 1 1 auto;\r\n  }\r\n  \r\n  .main-div {\r\n    display: grid;\r\n    grid-template-columns: 1fr;\r\n    grid-template-rows: auto 1fr;\r\n    height: 100vh;\r\n  }\r\n  \r\n  .app-header {\r\n    grid-column: 1 / 2;\r\n    grid-row: 1 / 2;\r\n  }\r\n  \r\n  .app-sidenav {\r\n    grid-column: 1 / 2;\r\n    grid-row: 2 / 3;\r\n  }\r\n  \r\n  .sidenav-container {\r\n    z-index: -1 !important;\r\n  }\r\n  \r\n  .active-link {\r\n    color: blue;\r\n    font-weight: bold !important;\r\n    border: none;\r\n  }\r\n  \r\n  .filler {\r\n    flex: 1 1 auto;\r\n }\r\n  \r\n  .gap {\r\n    margin-right: 10px;\r\n }\r\n\r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsYUFBYTtJQUNiLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsYUFBYTtFQUNmOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLFdBQVc7SUFDWCw0QkFBNEI7SUFDNUIsWUFBWTtFQUNkOztFQUVBO0lBQ0UsY0FBYztDQUNqQjs7RUFDQTtJQUNHLGtCQUFrQjtDQUNyQiIsImZpbGUiOiJzcmMvYXBwL3BhZ2UvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwYWNlciB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxuICB9XHJcbiAgXHJcbiAgLm1haW4tZGl2IHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG4gIH1cclxuICBcclxuICAuYXBwLWhlYWRlciB7XHJcbiAgICBncmlkLWNvbHVtbjogMSAvIDI7XHJcbiAgICBncmlkLXJvdzogMSAvIDI7XHJcbiAgfVxyXG4gIFxyXG4gIC5hcHAtc2lkZW5hdiB7XHJcbiAgICBncmlkLWNvbHVtbjogMSAvIDI7XHJcbiAgICBncmlkLXJvdzogMiAvIDM7XHJcbiAgfVxyXG5cclxuICAuc2lkZW5hdi1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogLTEgIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5hY3RpdmUtbGluayB7XHJcbiAgICBjb2xvcjogYmx1ZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAuZmlsbGVyIHtcclxuICAgIGZsZXg6IDEgMSBhdXRvO1xyXG4gfVxyXG4gLmdhcCB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiB9XHJcblxyXG4gICJdfQ== */"

/***/ }),

/***/ "./src/app/page/navbar/navbar.component.html":
/*!***************************************************!*\
  !*** ./src/app/page/navbar/navbar.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n  <!-- <mat-toolbar-row> -->\n  <button mat-icon-button>\n    <mat-icon (click)=\"sidenav.toggle()\">menu</mat-icon>\n  </button>\n  <h1>App</h1>\n  <!-- <span class=\"menu-spacer\"></span>\n    <div>\n      <a mat-button [routerLink]=\"'/main'\"> Accounts </a>\n      <a mat-button [routerLink]=\"'/create-account'\"> Create Account </a>\n      <a mat-button [routerLink]=\"'/contacts'\"> Contacts </a>\n      <a mat-button [routerLink]=\"'/create-contact'\"> Create Contact </a>\n      <a mat-button [routerLink]=\"'/activities'\"> Activities </a>\n      <a mat-button [routerLink]=\"'/create-activity'\"> Create Activity </a>\n\n    </div> -->\n  <span class=\"filler\"></span>\n  <span>\n    <div class=\"text-right\">\n      <button mat-icon-button [matMenuTriggerFor]=\"menu\" class=\"text-right\">\n        <mat-icon>account_circle</mat-icon>\n      </button>\n      <mat-menu #menu=\"matMenu\" class=\" text-center\">\n        <div mat-menu-item href=\"\" (click)=\"onLogout($event)\">\n          <mat-icon>exit_to_app</mat-icon>\n          <span>Logout</span>\n        </div>\n      </mat-menu>\n    </div>\n  </span>\n  <!-- </mat-toolbar-row> -->\n\n\n</mat-toolbar>\n<mat-sidenav-container>\n  <mat-sidenav #sidenav>\n    <mat-nav-list>\n\n      <a mat-list-item routerLinkActive=\"active\" routerLink=\"/main\"> หน้าหลัก </a>\n      <a mat-list-item routerLinkActive=\"active\" routerLink=\"/search-customer\"> ค้นหาชื่อลูกค้า </a>\n      <a mat-list-item routerLinkActive=\"active\" routerLink=\"/account-list\"> รายการบัญชีหลัก </a>\n\n    </mat-nav-list>\n  </mat-sidenav>\n  <mat-sidenav-content>\n    <div style=\"height: 88vh;\">\n\n      <router-outlet></router-outlet>\n    </div>\n  </mat-sidenav-content>\n</mat-sidenav-container>"

/***/ }),

/***/ "./src/app/page/navbar/navbar.component.ts":
/*!*************************************************!*\
  !*** ./src/app/page/navbar/navbar.component.ts ***!
  \*************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router) {
        this.router = router;
        this.routes = [{
                label: '11'
            }];
    }
    // @HostListener('window:mousemove')
    // onMousemove() {
    //   if (this.isTimeout) {
    //     return;
    //   }
    //   this.userIdle.resetTimer();
    //   this.userIdle.startWatching();
    // }
    NavbarComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('token') === null) {
            this.router.navigate(['/login']);
        }
    };
    NavbarComponent.prototype.snavToggle = function (snav) {
        snav.toggle();
    };
    NavbarComponent.prototype.onLogout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/page/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/page/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/page/page-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/page/page-routing.module.ts ***!
  \*********************************************/
/*! exports provided: PageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageRoutingModule", function() { return PageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _account_list_account_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account-list/account-list.component */ "./src/app/page/account-list/account-list.component.ts");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main/main.component */ "./src/app/page/main/main.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/page/navbar/navbar.component.ts");
/* harmony import */ var _view_detail_view_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view-detail/view-detail.component */ "./src/app/page/view-detail/view-detail.component.ts");
/* harmony import */ var _search_customer_search_customer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search-customer/search-customer.component */ "./src/app/page/search-customer/search-customer.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"], children: [
            { path: 'main', component: _main_main_component__WEBPACK_IMPORTED_MODULE_3__["MainComponent"] },
            { path: 'account-list', component: _account_list_account_list_component__WEBPACK_IMPORTED_MODULE_2__["AccountListComponent"] },
            { path: 'view-detail', component: _view_detail_view_detail_component__WEBPACK_IMPORTED_MODULE_5__["ViewDetailComponent"] },
            { path: 'search-customer', component: _search_customer_search_customer_component__WEBPACK_IMPORTED_MODULE_6__["SearchCustomerComponent"] }
        ] }
];
var PageRoutingModule = /** @class */ (function () {
    function PageRoutingModule() {
    }
    PageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], PageRoutingModule);
    return PageRoutingModule;
}());



/***/ }),

/***/ "./src/app/page/page.module.ts":
/*!*************************************!*\
  !*** ./src/app/page/page.module.ts ***!
  \*************************************/
/*! exports provided: PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageModule", function() { return PageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/page/navbar/navbar.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _page_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./page-routing.module */ "./src/app/page/page-routing.module.ts");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./main/main.component */ "./src/app/page/main/main.component.ts");
/* harmony import */ var _account_list_account_list_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./account-list/account-list.component */ "./src/app/page/account-list/account-list.component.ts");
/* harmony import */ var _view_detail_view_detail_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./view-detail/view-detail.component */ "./src/app/page/view-detail/view-detail.component.ts");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-mask */ "./node_modules/ngx-mask/fesm5/ngx-mask.js");
/* harmony import */ var _popup_comfirm_popup_comfirm_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! .//popup-comfirm/popup-comfirm.component */ "./src/app/page/popup-comfirm/popup-comfirm.component.ts");
/* harmony import */ var _view_installment_view_installment_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./view-installment/view-installment.component */ "./src/app/page/view-installment/view-installment.component.ts");
/* harmony import */ var _search_customer_search_customer_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./search-customer/search-customer.component */ "./src/app/page/search-customer/search-customer.component.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var PageModule = /** @class */ (function () {
    function PageModule() {
    }
    PageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__["NavbarComponent"],
                _main_main_component__WEBPACK_IMPORTED_MODULE_22__["MainComponent"],
                _account_list_account_list_component__WEBPACK_IMPORTED_MODULE_23__["AccountListComponent"],
                _view_detail_view_detail_component__WEBPACK_IMPORTED_MODULE_24__["ViewDetailComponent"],
                _view_installment_view_installment_component__WEBPACK_IMPORTED_MODULE_27__["ViewInstallmentComponent"],
                _popup_comfirm_popup_comfirm_component__WEBPACK_IMPORTED_MODULE_26__["PopupComfirmComponent"],
                _search_customer_search_customer_component__WEBPACK_IMPORTED_MODULE_28__["SearchCustomerComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
                _page_routing_module__WEBPACK_IMPORTED_MODULE_7__["PageRoutingModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_1__["MatGridListModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__["MatSidenavModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__["MatMenuModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_15__["MatSlideToggleModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_16__["MatSelectModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_17__["MatOptionModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__["MatAutocompleteModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_19__["MatDatepickerModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_20__["NgSelectModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_21__["ReactiveFormsModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_29__["NgxSpinnerModule"],
                ngx_mask__WEBPACK_IMPORTED_MODULE_25__["NgxMaskModule"].forRoot()
            ],
            entryComponents: [
                _view_installment_view_installment_component__WEBPACK_IMPORTED_MODULE_27__["ViewInstallmentComponent"],
                _popup_comfirm_popup_comfirm_component__WEBPACK_IMPORTED_MODULE_26__["PopupComfirmComponent"]
            ]
        })
    ], PageModule);
    return PageModule;
}());



/***/ }),

/***/ "./src/app/page/search-customer/search-customer.component.css":
/*!********************************************************************!*\
  !*** ./src/app/page/search-customer/search-customer.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-body {\r\n    flex: 1 1 auto;\r\n    min-height: 1px;\r\n    padding: 1.25rem;\r\n}\r\n\r\n.overflow-auto {\r\n    overflow: auto !important;\r\n}\r\n\r\n.table {\r\n    width: 100%;\r\n    margin-bottom: 1rem;\r\n    color: #212529;\r\n}\r\n\r\n/* .shadow-lg {\r\n    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%) !important;\r\n} */\r\n\r\n.purple-text-start {\r\n    text-align: left;\r\n    font-family: PSL-Bd;\r\n    font-size: 20px;\r\n    letter-spacing: 0px;\r\n    color: #4a2886;\r\n}\r\n\r\n.form-control-custom {\r\n    height: 42px !important;\r\n    width: 140px !important;\r\n    font-family: PSL;\r\n    border-radius: 4px;\r\n    border: 1px solid #6d6b6b;\r\n    width: 100px;\r\n  }\r\n\r\n.mat-toolbar-row, .mat-toolbar-single-row {\r\n    height: 20px;\r\n}\r\n\r\n.numberDate {\r\n    font-size: 24px;\r\n    font-weight: 700;\r\n    color: #212529;\r\n}\r\n\r\n/* .shadow-lg {\r\n    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%) !important;\r\n} */\r\n\r\n.card-body {\r\n    flex: 1 1 auto;\r\n    min-height: 1px;\r\n    padding: 1.25rem;\r\n}\r\n\r\n.overflow-auto {\r\n    overflow: auto !important;\r\n}\r\n\r\n.table {\r\n    width: 100%;\r\n    margin-bottom: 1rem;\r\n    color: #212529;\r\n}\r\n\r\n.input-width {\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    width: 100%;\r\n}\r\n\r\n.input-width.ng-invalid {\r\n    border: 1px solid #fc1f1f;\r\n}\r\n\r\n.input-width-w50 {\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    width: 50px;\r\n}\r\n\r\n.input-width-w130 {\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    width: 100%;\r\n}\r\n\r\n.input-width-91 {\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    width: 91%;\r\n}\r\n\r\n.input-width.ng-invalid {\r\n    border: 1px solid #fc1f1f;\r\n}\r\n\r\n.purple-text-start {\r\n    text-align: left;\r\n    font-family: PSL-Bd;\r\n    font-size: 20px;\r\n    letter-spacing: 0px;\r\n    color: #4a2886;\r\n}\r\n\r\n.form-control-custom {\r\n    height: 42px !important;\r\n    width: 100% !important;\r\n    font-family: PSL;\r\n    border-radius: 4px;\r\n    border: 1px solid #707070;\r\n    width: 100%;\r\n}\r\n\r\ninput[type=radio] {\r\n    width: 20px;\r\n    height: 20px;\r\n}\r\n\r\ninput[type=\"text\"]:disabled {\r\n    background: #e0e1e2;\r\n}\r\n\r\n.custom-select:disabled {\r\n    color: #6c757d;\r\n    background-color: #b2b3b4;\r\n}\r\n\r\n.w-50 {\r\n    width: 40px;\r\n}\r\n\r\n.input-width-80 {\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    width: 80%;\r\n    text-align: right;\r\n}\r\n\r\n.input-width-85 {\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    width: 85%;\r\n    text-align: right;\r\n}\r\n\r\n.select-width {\r\n    width: 50%;\r\n    font-family: PSL;\r\n    font-size: 18px;\r\n    border-radius: 4px;\r\n    height: 40px;\r\n    border: 1px solid #707070;\r\n    margin-left: 20px;\r\n}\r\n\r\nng-select select-dropdown>div {\r\n    z-index: 2;\r\n}\r\n\r\ninput[type=\"number\"]:disabled {\r\n    background: #e0e1e2;\r\n}\r\n\r\nselect:disabled {\r\n    background: #e0e1e2;\r\n}\r\n\r\n.is-invalid {\r\n    border: 1px solid #fc1f1f;\r\n}\r\n\r\n.error-msg {\r\n    font-family: PSL;\r\n    font-size: 16px;\r\n    color: #fc1f1f;\r\n}\r\n\r\n.basic-information-input.ng-invalid {\r\n    border: 1px solid #fc1f1f;\r\n}\r\n\r\n.example-form {\r\n    min-width: 150px;\r\n    max-width: 500px;\r\n    width: 100%;\r\n  }\r\n\r\n.example-full-width {\r\n    width: 100%;\r\n  }\r\n \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9zZWFyY2gtY3VzdG9tZXIvc2VhcmNoLWN1c3RvbWVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsY0FBYztBQUNsQjs7QUFFQTs7R0FFRzs7QUFFSDtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixZQUFZO0VBQ2Q7O0FBRUE7SUFDRSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0FBQ2xCOztBQUVBOztHQUVHOztBQUVIO0lBQ0ksY0FBYztJQUNkLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWix5QkFBeUI7SUFDekIsV0FBVztBQUNmOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFVBQVU7QUFDZDs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGNBQWM7SUFDZCx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQVc7RUFDYjs7QUFFQTtJQUNFLFdBQVc7RUFDYiIsImZpbGUiOiJzcmMvYXBwL3BhZ2Uvc2VhcmNoLWN1c3RvbWVyL3NlYXJjaC1jdXN0b21lci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtYm9keSB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxuICAgIG1pbi1oZWlnaHQ6IDFweDtcclxuICAgIHBhZGRpbmc6IDEuMjVyZW07XHJcbn1cclxuXHJcbi5vdmVyZmxvdy1hdXRvIHtcclxuICAgIG92ZXJmbG93OiBhdXRvICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi50YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBjb2xvcjogIzIxMjUyOTtcclxufVxyXG5cclxuLyogLnNoYWRvdy1sZyB7XHJcbiAgICBib3gtc2hhZG93OiAwIDFyZW0gM3JlbSByZ2IoMCAwIDAgLyAxOCUpICFpbXBvcnRhbnQ7XHJcbn0gKi9cclxuXHJcbi5wdXJwbGUtdGV4dC1zdGFydCB7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgZm9udC1mYW1pbHk6IFBTTC1CZDtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwcHg7XHJcbiAgICBjb2xvcjogIzRhMjg4NjtcclxufVxyXG5cclxuLmZvcm0tY29udHJvbC1jdXN0b20ge1xyXG4gICAgaGVpZ2h0OiA0MnB4ICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDogMTQwcHggIWltcG9ydGFudDtcclxuICAgIGZvbnQtZmFtaWx5OiBQU0w7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNmQ2YjZiO1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuXHJcbiAgLm1hdC10b29sYmFyLXJvdywgLm1hdC10b29sYmFyLXNpbmdsZS1yb3cge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG59XHJcblxyXG4ubnVtYmVyRGF0ZSB7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgY29sb3I6ICMyMTI1Mjk7XHJcbn1cclxuXHJcbi8qIC5zaGFkb3ctbGcge1xyXG4gICAgYm94LXNoYWRvdzogMCAxcmVtIDNyZW0gcmdiKDAgMCAwIC8gMTglKSAhaW1wb3J0YW50O1xyXG59ICovXHJcblxyXG4uY2FyZC1ib2R5IHtcclxuICAgIGZsZXg6IDEgMSBhdXRvO1xyXG4gICAgbWluLWhlaWdodDogMXB4O1xyXG4gICAgcGFkZGluZzogMS4yNXJlbTtcclxufVxyXG5cclxuLm92ZXJmbG93LWF1dG8ge1xyXG4gICAgb3ZlcmZsb3c6IGF1dG8gIWltcG9ydGFudDtcclxufVxyXG5cclxuLnRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIGNvbG9yOiAjMjEyNTI5O1xyXG59XHJcblxyXG4uaW5wdXQtd2lkdGgge1xyXG4gICAgZm9udC1mYW1pbHk6IFBTTDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3MDcwNzA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmlucHV0LXdpZHRoLm5nLWludmFsaWQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2ZjMWYxZjtcclxufVxyXG5cclxuLmlucHV0LXdpZHRoLXc1MCB7XHJcbiAgICBmb250LWZhbWlseTogUFNMO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzcwNzA3MDtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG59XHJcblxyXG4uaW5wdXQtd2lkdGgtdzEzMCB7XHJcbiAgICBmb250LWZhbWlseTogUFNMO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzcwNzA3MDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uaW5wdXQtd2lkdGgtOTEge1xyXG4gICAgZm9udC1mYW1pbHk6IFBTTDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3MDcwNzA7XHJcbiAgICB3aWR0aDogOTElO1xyXG59XHJcblxyXG4uaW5wdXQtd2lkdGgubmctaW52YWxpZCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZmMxZjFmO1xyXG59XHJcblxyXG4ucHVycGxlLXRleHQtc3RhcnQge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIGZvbnQtZmFtaWx5OiBQU0wtQmQ7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMHB4O1xyXG4gICAgY29sb3I6ICM0YTI4ODY7XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRyb2wtY3VzdG9tIHtcclxuICAgIGhlaWdodDogNDJweCAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIGZvbnQtZmFtaWx5OiBQU0w7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNzA3MDcwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9cmFkaW9dIHtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwidGV4dFwiXTpkaXNhYmxlZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZTBlMWUyO1xyXG59XHJcblxyXG4uY3VzdG9tLXNlbGVjdDpkaXNhYmxlZCB7XHJcbiAgICBjb2xvcjogIzZjNzU3ZDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNiMmIzYjQ7XHJcbn1cclxuXHJcbi53LTUwIHtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG59XHJcblxyXG4uaW5wdXQtd2lkdGgtODAge1xyXG4gICAgZm9udC1mYW1pbHk6IFBTTDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3MDcwNzA7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuXHJcbi5pbnB1dC13aWR0aC04NSB7XHJcbiAgICBmb250LWZhbWlseTogUFNMO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzcwNzA3MDtcclxuICAgIHdpZHRoOiA4NSU7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG5cclxuLnNlbGVjdC13aWR0aCB7XHJcbiAgICB3aWR0aDogNTAlO1xyXG4gICAgZm9udC1mYW1pbHk6IFBTTDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3MDcwNzA7XHJcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcclxufVxyXG5cclxubmctc2VsZWN0IHNlbGVjdC1kcm9wZG93bj5kaXYge1xyXG4gICAgei1pbmRleDogMjtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cIm51bWJlclwiXTpkaXNhYmxlZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZTBlMWUyO1xyXG59XHJcblxyXG5zZWxlY3Q6ZGlzYWJsZWQge1xyXG4gICAgYmFja2dyb3VuZDogI2UwZTFlMjtcclxufVxyXG5cclxuLmlzLWludmFsaWQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2ZjMWYxZjtcclxufVxyXG5cclxuLmVycm9yLW1zZyB7XHJcbiAgICBmb250LWZhbWlseTogUFNMO1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgY29sb3I6ICNmYzFmMWY7XHJcbn1cclxuXHJcbi5iYXNpYy1pbmZvcm1hdGlvbi1pbnB1dC5uZy1pbnZhbGlkIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmYzFmMWY7XHJcbn1cclxuXHJcbi5leGFtcGxlLWZvcm0ge1xyXG4gICAgbWluLXdpZHRoOiAxNTBweDtcclxuICAgIG1heC13aWR0aDogNTAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgXHJcbiAgLmV4YW1wbGUtZnVsbC13aWR0aCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAiXX0= */"

/***/ }),

/***/ "./src/app/page/search-customer/search-customer.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/page/search-customer/search-customer.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid mt-4\">\n\n  <ngx-spinner type=\"ball-beat\"></ngx-spinner>\n\n  <div class=\"row mb-2\">\n    <span class=\"mt-3 ml-4 mr-2\" style=\"font-size: 18px;\"> ค้นหาชื่อลูกค้า : </span>\n    <div class=\"col-4\">\n      <mat-form-field class=\"example-full-width\">\n        <!-- <mat-label>ชื่อ</mat-label> -->\n        <input type=\"text\" placeholder=\"ชื่อ\" matInput [formControl]=\"customerId\"\n          [matAutocomplete]=\"auto\">\n        <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\">\n          <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option.name\">\n            {{option.name}}\n          </mat-option>\n        </mat-autocomplete>\n      </mat-form-field>\n    </div>\n    <div class=\"col-4\">\n    <button type=\"button\" class=\"btn btn-primary ml-2 mt-3\" name=\"search\" (click)=\"getCustomerList()\">ดูยอดรวม</button>\n  </div>\n  </div>\n  <hr>\n\n  <div class=\"row ml-3\" style=\"color: brown; font-size: 16px;\">\n    (ต้องกดเลือกค้นหาลูกค้าก่อน ถึงจะกดปุ่ม ดูรายการได้)\n  </div>\n\n  <div class=\"row\">\n    <button type=\"button\" style=\"width: 100px;\" class=\"btn btn-primary ml-4\" name=\"search\" (click)=\"search()\"\n      [disabled]=\"listDataTran.length === 0\">ดูรายการ</button>\n  </div>\n  <br />\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"card\">\n            <div class=\"card-header\" style=\"background-color: rgb(57, 109, 252);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">{{sumAdd}}</div>\n            </div>\n            <div class=\"card-body\" style=\"background-color: rgb(57, 109, 252);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">บวก</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"card\">\n            <div class=\"card-header\" style=\"background-color: rgb(248, 185, 103);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">{{sumDelete}}</div>\n            </div>\n            <div class=\"card-body\" style=\"background-color: rgb(248, 185, 103);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">ลบ</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"card\" *ngIf=\"sumAmt >= '0'\">\n            <div class=\"card-header\" style=\"background-color: rgb(77, 194, 23);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">{{sumAmt}}</div>\n            </div>\n            <div class=\"card-body\" style=\"background-color: rgb(77, 194, 23);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">สรุปยอด</div>\n            </div>\n          </div>\n          <div class=\"card\" *ngIf=\"sumAmt < '0'\">\n            <div class=\"card-header\" style=\"background-color: rgb(194, 57, 23);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">{{sumAmt}}</div>\n            </div>\n            <div class=\"card-body\" style=\"background-color: rgb(194, 57, 23);\">\n              <div class=\"text-center\" style=\"font-size: 18px; color: #fffdfd;\">สรุปยอด</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/page/search-customer/search-customer.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/page/search-customer/search-customer.component.ts ***!
  \*******************************************************************/
/*! exports provided: SearchCustomerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchCustomerComponent", function() { return SearchCustomerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_service_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/service.service */ "./src/app/service/service.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var big_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! big.js */ "./node_modules/big.js/big.js");
/* harmony import */ var big_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(big_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var SearchCustomerComponent = /** @class */ (function () {
    function SearchCustomerComponent(service, router, SpinnerService) {
        this.service = service;
        this.router = router;
        this.SpinnerService = SpinnerService;
        this.listCustomer = [];
        // customerId: number;
        this.listDataTran = [];
        this.installmentTemp = [];
        this.sumAmt = '0';
        this.customerId = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.options = ['One', 'Two', 'Three'];
    }
    SearchCustomerComponent.prototype.ngOnInit = function () {
        this.sumDelete = '0';
        this.sumAdd = '0';
        this.getCustomer();
    };
    SearchCustomerComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.listCustomer.filter(function (option) { return option.name.toLowerCase().includes(filterValue); });
    };
    SearchCustomerComponent.prototype.getCustomer = function () {
        var _this = this;
        this.service.customer().subscribe(function (resp) {
            if (resp && resp.length !== 0) {
                _this.listCustomer = resp;
                _this.filteredOptions = _this.customerId.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (value) { return _this._filter(value || ''); }));
            }
        }, function (errorRes) {
            if (errorRes.error && errorRes.error.errorDesc) {
                return;
            }
        });
    };
    SearchCustomerComponent.prototype.getListCustomer = function () {
        var _this = this;
        this.service.getListCustomer().subscribe(function (resp) {
            if (resp && resp.length !== 0) {
                _this.listCustomer = resp;
            }
        }, function (errorRes) {
            if (errorRes.error && errorRes.error.errorDesc) {
                return;
            }
        });
    };
    SearchCustomerComponent.prototype.search = function () {
        var _this = this;
        var customerId = this.customerId.value ? this.listCustomer.find(function (item) { return item.name === _this.customerId.value; }).customerId : null;
        var data = {
            customerId: customerId,
            dueDate: null,
            status: 'cus'
        };
        localStorage.removeItem('dataMain');
        localStorage.setItem('dataMain', JSON.stringify(data));
        this.router.navigate(['/view-detail']);
    };
    SearchCustomerComponent.prototype.getCustomerList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customerId;
            var _this = this;
            return __generator(this, function (_a) {
                customerId = this.customerId.value ? this.listCustomer.find(function (item) { return item.name === _this.customerId.value; }).customerId : null;
                this.listDataTran = [];
                this.sumDelete = '0';
                this.sumAdd = '0';
                this.SpinnerService.show();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.service.getCustomer(customerId).subscribe(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                if (resp && resp.length !== 0) {
                                    this.listDataTran = resp;
                                    this.listDataTran.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!!element.isClosed) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, this.viewInstallmentl(element.transactionId)];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, this.sum(element.transactionType)];
                                                case 2:
                                                    _a.sent();
                                                    if (this.sumAdd && this.sumDelete) {
                                                        this.sumAmt = this.localeString(parseInt(this.formatNumber(this.sumAdd)) - parseInt(this.formatNumber(this.sumDelete)));
                                                    }
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    resolve(true);
                                }
                                setTimeout(function () {
                                    _this.SpinnerService.hide();
                                }, 1000);
                                return [2 /*return*/];
                            });
                        }); }, function (errorRes) {
                            if (errorRes.error && errorRes.error.errorDesc) {
                                return;
                            }
                        });
                    })];
            });
        });
    };
    SearchCustomerComponent.prototype.viewInstallmentl = function (transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.service.viewInstallmentl(transactionId).subscribe(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                if (resp && resp.length !== 0) {
                                    this.installmentTemp = [];
                                    resp.forEach(function (item, i) {
                                        _this.installmentTemp.push({
                                            'installmentNo': i + 1,
                                            'dueDate': item.dueDate,
                                            'installmentAmt': _this.localeString(item.installmentAmt),
                                            'isPrepaid': item.isPrepaid
                                        });
                                    });
                                    resolve(true);
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (errorRes) {
                            if (errorRes.error && errorRes.error.errorDesc) {
                                return;
                            }
                        });
                    })];
            });
        });
    };
    SearchCustomerComponent.prototype.localeString = function (data) {
        var points = data.toLocaleString('ban');
        return points;
    };
    SearchCustomerComponent.prototype.sum = function (transactionType) {
        return __awaiter(this, void 0, void 0, function () {
            var installmentDelete, installmentAdd;
            var _this = this;
            return __generator(this, function (_a) {
                installmentDelete = 0;
                installmentAdd = 0;
                if (transactionType === 1 || transactionType === 2 || transactionType === 4 || transactionType === 7) {
                    this.installmentTemp.forEach(function (item) {
                        if (!item.isPrepaid) {
                            var todayDate = moment__WEBPACK_IMPORTED_MODULE_4__(new Date(), 'YYYY-MM-DD');
                            var arr1 = (todayDate.year() + '-' + (todayDate.month() + 1) + '-' + todayDate.date()).toString().split(/[-]/);
                            var newDate = new Date(Number(arr1[0]), Number(arr1[1]) - 1, Number(arr1[2]));
                            var date = moment__WEBPACK_IMPORTED_MODULE_4__(_this.formatDateInput(item.dueDate), 'YYYY-MM-DD');
                            var arr2 = (date.year() + '-' + (date.month() + 1) + '-' + date.date()).toString().split(/[-]/);
                            var dueDate = new Date(Number(arr2[0]), Number(arr2[1]) - 1, Number(arr2[2]));
                            if (newDate <= dueDate) {
                                installmentDelete += parseInt(_this.formatNumber(item.installmentAmt));
                            }
                        }
                    });
                    this.sumDelete = this.localeString(parseInt(this.formatNumber(this.sumDelete)) + installmentDelete);
                }
                else {
                    this.installmentTemp.forEach(function (item) {
                        var todayDate = moment__WEBPACK_IMPORTED_MODULE_4__(new Date(), 'YYYY-MM-DD');
                        var arr3 = (todayDate.year() + '-' + (todayDate.month() + 1) + '-' + todayDate.date()).toString().split(/[-]/);
                        var newDate = new Date(Number(arr3[0]), Number(arr3[1]) - 1, Number(arr3[2]));
                        var date = moment__WEBPACK_IMPORTED_MODULE_4__(_this.formatDateInput(item.dueDate), 'YYYY-MM-DD');
                        var arr4 = (date.year() + '-' + (date.month() + 1) + '-' + date.date()).toString().split(/[-]/);
                        var dueDate = new Date(Number(arr4[0]), Number(arr4[1]) - 1, Number(arr4[2]));
                        if (newDate >= dueDate) {
                            installmentAdd += parseInt(_this.formatNumber(item.installmentAmt));
                        }
                        if (item.isPrepaid) {
                            installmentAdd += parseInt(_this.formatNumber(item.installmentAmt));
                        }
                    });
                    this.sumAdd = this.localeString(parseInt(this.formatNumber(this.sumAdd)) + installmentAdd);
                }
                return [2 /*return*/];
            });
        });
    };
    SearchCustomerComponent.prototype.formatDateInput = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    };
    SearchCustomerComponent.prototype.formatNumber = function (value) {
        if (value && value !== '') {
            var parts = String(value).replace(/[^-\d.]/g, '').split('.');
            parts[0] = new big_js__WEBPACK_IMPORTED_MODULE_5__["Big"](parts[0].padStart(1, '0')).toString();
            return parts[0];
        }
    };
    SearchCustomerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-search-customer',
            template: __webpack_require__(/*! ./search-customer.component.html */ "./src/app/page/search-customer/search-customer.component.html"),
            styles: [__webpack_require__(/*! ./search-customer.component.css */ "./src/app/page/search-customer/search-customer.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_service_service_service__WEBPACK_IMPORTED_MODULE_3__["ServiceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]])
    ], SearchCustomerComponent);
    return SearchCustomerComponent;
}());



/***/ }),

/***/ "./src/app/page/view-detail/view-detail.component.css":
/*!************************************************************!*\
  !*** ./src/app/page/view-detail/view-detail.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".background-color {\r\n    background-color: #ec8b1c;\r\n}\r\n\r\n.coler3 {\r\n    background-color: #3d5ff5;\r\n}\r\n\r\n.w100 {\r\n    width: 100px;\r\n}\r\n\r\n.sticky {\r\n    position: auto;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 999;\r\n}\r\n\r\n.menu {\r\n    text-align: left;\r\n    padding: 10px 0;\r\n    padding-left: 20px;\r\n    margin: -11px 0;\r\n    margin-left: -21px;\r\n    margin-right: -20px;\r\n    color: #ffffff;\r\n    background-color: #3f51b5;\r\n    text-align: left;\r\n    font-family: PSL-Bd;\r\n    font-size: 20px;\r\n    letter-spacing: 0px;\r\n    color: #ffffff;\r\n    opacity: 1;\r\n}\r\n\r\n.text-coler-back {\r\n    text-align: left;\r\n    font-family: PSL-Bd;\r\n    font-size: 20px;\r\n    letter-spacing: 0px;\r\n    font-weight: 700;\r\n    color: #ffffff;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS92aWV3LWRldGFpbC92aWV3LWRldGFpbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUdBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsTUFBTTtJQUNOLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QsVUFBVTtBQUNkOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixjQUFjO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvcGFnZS92aWV3LWRldGFpbC92aWV3LWRldGFpbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJhY2tncm91bmQtY29sb3Ige1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VjOGIxYztcclxufVxyXG5cclxuLmNvbGVyMyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q1ZmY1O1xyXG59XHJcblxyXG5cclxuLncxMDAge1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG59XHJcblxyXG4uc3RpY2t5IHtcclxuICAgIHBvc2l0aW9uOiBhdXRvO1xyXG4gICAgcG9zaXRpb246IHN0aWNreTtcclxuICAgIHRvcDogMDtcclxuICAgIHotaW5kZXg6IDk5OTtcclxufVxyXG5cclxuLm1lbnUge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIHBhZGRpbmc6IDEwcHggMDtcclxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcclxuICAgIG1hcmdpbjogLTExcHggMDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMjFweDtcclxuICAgIG1hcmdpbi1yaWdodDogLTIwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZjUxYjU7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgZm9udC1mYW1pbHk6IFBTTC1CZDtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIG9wYWNpdHk6IDE7XHJcbn1cclxuXHJcbi50ZXh0LWNvbGVyLWJhY2sge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIGZvbnQtZmFtaWx5OiBQU0wtQmQ7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/page/view-detail/view-detail.component.html":
/*!*************************************************************!*\
  !*** ./src/app/page/view-detail/view-detail.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-spinner type=\"ball-beat\"></ngx-spinner>\n<div class=\"sticky\">\n  <div class=\"menu\"> <button type=\"button\" class=\"btn\" style=\"\n    margin-top: 0px;\n    margin-right: 0px;\n    margin-left: 8px;\n  \" (click)=\"gotoBack()\">\n      <div class=\"row pl-2\">\n        <div class=\"text-coler-back\"><i class=\"fa fa-angle-left ml-2 mr-2 mt-1\"></i></div>\n        <span class=\"text-coler-back\">กลับ</span>\n        <span class=\"text-coler-back ml-4\" *ngIf=\"dataMain.dueDate\">{{date}}</span>\n      </div>\n    </button></div>\n</div>\n<br />\n\n<div class=\"container-fluid mt-2\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div style=\"background-color: rgb(2, 196, 83); height: 60px; font-size: 18px;\"\n        *ngIf=\"dataMain.status === 'cus' || dataMain.status === 'account'\">\n        <hr />\n        <div class=\"ml-2\">รายการบัญชีปัจจุบัน</div>\n        <hr />\n      </div>\n      <br />\n      <div *ngFor=\"let item of listDataTran\">\n        <div class=\"card shadow-lg\" *ngIf=\"!item.isClosed\">\n          <div class=\"card-header\"\n            [ngStyle]=\"{'background-color': item.transactionType === 3 ? '#3d5ff5' : '#ec8b1c'  }\">\n            รายการ : {{item?.description}}\n          </div>\n          <div class=\"card-body overflow-auto\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"row ml-2\">\n                  <div class=\"col-6 \">\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">ชื่อลูกค้า :</span>\n                      <span>{{item.customerName}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">วันที่ :</span>\n                      <span>{{item.createDate}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">วันที่เริ่มผ่อน :</span>\n                      <span>{{item.contractFirstDueDate}}</span>\n                    </div>\n\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">ประเภท :</span>\n                      <span>{{item.transactionTypeDesc}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">ดอกเบี้ยกู้ :</span>\n                      <span *ngIf=\"item.interestType !== 0\">{{item.interestRate}}</span>\n                      <span *ngIf=\"item.interestType !== 0\" class=\"ml-1\">%</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left  mr-1\">เลือกดอกเบี้ย :</span>\n                      <span *ngIf=\"item.interestType !== 0\">{{item.interestTypeName}}</span>\n                    </div>\n\n                    <div class=\"row\">\n                      <span class=\"w100 text-left  mr-1\">ดอกเบี้ยทุน :</span>\n                      <span *ngIf=\"item.interestType === 0\">{{item.interestRate }}</span>\n                      <span *ngIf=\"item.interestType === 0\" class=\"ml-1\">%</span>\n                    </div>\n\n                    <div class=\"row\">\n                      <span class=\"w100 text-left  mr-1\">จ่ายแบบ :</span>\n                      <span class=\"mr-1 \" *ngIf=\"item.paymentType === 1\">ราย {{ item.daily }} วัน</span>\n                      <span class=\"mr-1 \" *ngIf=\"item.paymentType === 2\">รายเดือน</span>\n                      <span class=\"mr-1 \" *ngIf=\"item.paymentType === 3\">ระบุวัน</span>\n                    </div>\n\n                    <!-- <div class=\"row\">\n                      <span class=\"w100 text-left  mr-1\">ทุกวันที่ :</span>\n                      <span class=\"mr-1 \" *ngIf=\"item.paymentType === 1\">{{ item.paymentDateSpecific }}</span>\n                      <span class=\"mr-1 \" *ngIf=\"item.paymentType === 1\">{{ item.paymentDateSpecific }}</span>\n                    </div> -->\n\n                    <!-- <div class=\"row\">\n                  <span class=\"w100 text-right  mr-1\">รายเดือนทุกวันที่ :</span>\n                  <span>รายวัน</span>\n                </div> -->\n\n                  </div>\n\n                  <div class=\"col-6\">\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">เงินต้น :</span>\n                      <span>{{item.principle}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">ดาวน์/หักดอก :</span>\n                      <span>{{item.firstDownAmt}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">คงเหลือผ่อน :</span>\n                      <span>{{item.remaining}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">ยอดรวม :</span>\n                      <span>{{item.total}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">จำนวนงวด :</span>\n                      <span>{{item.contractPeriod}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">ผ่อนงวดละ :</span>\n                      <span>{{item.installmentAmt}}</span>\n                    </div>\n                    <div class=\"row\">\n                      <span class=\"w100 text-left mr-1\">รายได้ :</span>\n                      <span>{{item.income}}</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <hr />\n          <div class=\"row text-right mr-1\">\n            <div class=\"col-12 \">\n              <button type=\"button\" (click)=\"close(item, 'ยืนยันปิดบัญชี')\" class=\"btn btn-danger btn-lg mr-2 ml-3\">\n                ยกเลิกปิดบัญชี\n              </button>\n              <button type=\"button\" class=\"btn btn-success ml-2\" name=\"get\" (click)=\"saveAsTextFile(item)\"><svg\n                  width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-line\" viewBox=\"0 0 16 16\">\n                  <path\n                    d=\"M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z\" />\n                </svg>\n              </button>\n              <button type=\"button\" (click)=\"onClickViewInstallmentlDialog(item)\" class=\"btn btn-warning mr-2 ml-3\">\n                <i class=\"fa fa-search\"></i> ดูงวด\n              </button>\n              <!-- <button type=\"button\" (click)=\"onClickDetailDialog(item)\" class=\"btn btn-primary mr-3 ml-2\">\n                <i class=\"fa fa-edit\"></i> แก้ไขข้อมูล\n              </button> -->\n              <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(item)\">\n                <i class=\"fa fa-trash\"></i> ลบ\n              </button>\n            </div>\n          </div>\n          <br />\n        </div>\n        <br />\n      </div>\n\n      <div style=\"background-color: rgb(209, 0, 52); height: 60px; font-size: 18px;\"\n        *ngIf=\"dataMain.status === 'cus' || dataMain.status === 'account'\">\n        <hr />\n        <div class=\"ml-2\">รายการบัญชีที่ปิดแล้ว</div>\n        <hr />\n      </div>\n      <br>\n      <div *ngIf=\"dataMain.status === 'cus' || dataMain.status === 'account'\">\n        <div *ngFor=\"let item of listDataTran\">\n          <div class=\"card shadow-lg\" *ngIf=\"item.isClosed\">\n            <div class=\"card-header\"\n              [ngStyle]=\"{'background-color': item.transactionType === 3 ? '#3d5ff5' : '#ec8b1c'  }\">\n              {{item?.description}}\n            </div>\n            <div class=\"card-body overflow-auto\">\n              <div class=\"row\">\n                <div class=\"col-6\">\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">ชื่อลูกค้า :</span>\n                    <span>{{item.customerName}}</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">ดอกเบี้ยกู้ :</span>\n                    <span *ngIf=\"item.interestType !== 0\">{{item.interestRate}}</span>\n                    <span *ngIf=\"item.interestType !== 0\" class=\"ml-1\">%</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right  mr-1\">เลือกดอกเบี้ย :</span>\n                    <span *ngIf=\"item.interestType !== 0\">{{item.interestType}}</span>\n                  </div>\n\n                  <div class=\"row\">\n                    <span class=\"w100 text-right  mr-1\">ดอกเบี้ยทุน :</span>\n                    <span *ngIf=\"item.interestType === 0\">{{item.interestRate }}</span>\n                    <span *ngIf=\"item.interestType === 0\" class=\"ml-1\">%</span>\n                  </div>\n\n                  <div class=\"row\">\n                    <span class=\"w100 text-right  mr-1\">จ่ายแบบ :</span>\n                    <span class=\"mr-1 \" *ngIf=\"item.paymentType === 1\">รายวัน</span>\n                    <span class=\"mr-1 \" *ngIf=\"item.paymentType === 2\">รายเดือน</span>\n                    <span class=\"mr-1 \" *ngIf=\"item.paymentType === 3\">ระบุวัน</span>\n                  </div>\n\n                  <!-- <div class=\"row\">\n                  <span class=\"w100 text-right  mr-1\">รายเดือนทุกวันที่ :</span>\n                  <span>รายวัน</span>\n                </div> -->\n\n                </div>\n\n                <div class=\"col-6\">\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">เงินต้น :</span>\n                    <span>{{item.principle}}</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">ยอดรวม :</span>\n                    <span>{{item.total}}</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">จำนวนงวด :</span>\n                    <span>{{item.contractPeriod}}</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">ดาวน์/หักดอก :</span>\n                    <span>{{item.firstDownAmt}}</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">คงเหลือผ่อน :</span>\n                    <span>{{item.remaining}}</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">ผ่อนงวดละ :</span>\n                    <span>{{item.installmentAmt}}</span>\n                  </div>\n                  <div class=\"row\">\n                    <span class=\"w100 text-right mr-1\">รายได้ :</span>\n                    <span>{{item.income}}</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <hr />\n            <div class=\"row text-right mr-1\">\n              <div class=\"col-12 \">\n                <button type=\"button\" (click)=\"close(item, 'ยืนยันเปิดบัญชี')\" class=\"btn btn-primary btn-lg mr-2 ml-3\">\n                  เปิดบัญชี\n                </button>\n                <button type=\"button\" class=\"btn btn-success ml-2\" name=\"get\" (click)=\"saveAsTextFile(item)\"><svg\n                    width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-line\" viewBox=\"0 0 16 16\">\n                    <path\n                      d=\"M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z\" />\n                  </svg>\n                </button>\n                <button type=\"button\" (click)=\"onClickViewInstallmentlDialog(item)\" class=\"btn btn-warning mr-2 ml-3\">\n                  <i class=\"fa fa-search\"></i> ดูงวด\n                </button>\n                <!-- <button type=\"button\" (click)=\"onClickDetailDialog(item)\" class=\"btn btn-primary mr-3 ml-2\">\n                <i class=\"fa fa-edit\"></i> แก้ไขข้อมูล\n              </button> -->\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(item)\">\n                  <i class=\"fa fa-trash\"></i> ลบ\n                </button>\n              </div>\n            </div>\n            <br />\n          </div>\n          <br />\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/page/view-detail/view-detail.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/page/view-detail/view-detail.component.ts ***!
  \***********************************************************/
/*! exports provided: ViewDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewDetailComponent", function() { return ViewDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _view_installment_view_installment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view-installment/view-installment.component */ "./src/app/page/view-installment/view-installment.component.ts");
/* harmony import */ var _popup_comfirm_popup_comfirm_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../popup-comfirm/popup-comfirm.component */ "./src/app/page/popup-comfirm/popup-comfirm.component.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _add_new_add_new_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../add-new/add-new.component */ "./src/app/page/add-new/add-new.component.ts");
/* harmony import */ var src_app_service_service_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/service/service.service */ "./src/app/service/service.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var ViewDetailComponent = /** @class */ (function () {
    function ViewDetailComponent(modalService, router, service, SpinnerService) {
        this.modalService = modalService;
        this.router = router;
        this.service = service;
        this.SpinnerService = SpinnerService;
        this.dataSource = [];
        this.listDataTran = [];
        this.listNumber = [
            {
                id: 1,
                name: 'จ่ายเฉพาะดอก'
            }, {
                id: 2,
                name: 'ลดต้นลดดอก'
            }
        ];
    }
    ViewDetailComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SpinnerService.show();
                        this.dataMain = JSON.parse(localStorage.getItem('dataMain'));
                        this.date = this.isoStringToDate(this.formatDateInput(this.dataMain.dueDate));
                        this.listApi();
                        if (!(this.dataMain.status === 'cus')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCustomer()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.dataMain.status === 'account')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.searchCus()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.getData()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        setTimeout(function () {
                            _this.SpinnerService.hide();
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewDetailComponent.prototype.getCustomer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listDataTran = [];
                this.SpinnerService.show();
                this.service.getCustomer(this.dataMain.customerId).subscribe(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (resp && resp.length !== 0) {
                            resp.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.setData(item)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        setTimeout(function () {
                            _this.SpinnerService.hide();
                        }, 10000);
                        return [2 /*return*/];
                    });
                }); }, function (errorRes) {
                    if (errorRes.error && errorRes.error.errorDesc) {
                        return;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ViewDetailComponent.prototype.searchCus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listDataTran = [];
                this.SpinnerService.show();
                this.service.searchCus(this.dataMain.customerId, this.formatDateInput1(this.dataMain.dueDate), this.formatDateInput1(this.dataMain.dueDate)).subscribe(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (resp && resp.length !== 0) {
                            resp.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.setData(item)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        setTimeout(function () {
                            _this.SpinnerService.hide();
                        }, 10000);
                        return [2 /*return*/];
                    });
                }); }, function (errorRes) {
                    if (errorRes.error && errorRes.error.errorDesc) {
                        return;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ViewDetailComponent.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listDataTran = [];
                this.SpinnerService.show();
                this.service.getViewDetail(this.dataMain.customerId, this.formatDateInput1(this.dataMain.dueDate)).subscribe(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (resp && resp.length !== 0) {
                            resp.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.setData(item)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        setTimeout(function () {
                            _this.SpinnerService.hide();
                        }, 10000);
                        return [2 /*return*/];
                    });
                }); }, function (errorRes) {
                    if (errorRes.error && errorRes.error.errorDesc) {
                        return;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ViewDetailComponent.prototype.setData = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.listDataTran.push({
                    transactionId: item.transactionId,
                    description: item.description,
                    createDate: this.isoStringToDate(item.createDate),
                    customerName: item.customerName,
                    transactionType: item.transactionType,
                    transactionTypeDesc: item.transactionType ? this.listData.transactionType.find(function (event) { return event.transactionTypeId === item.transactionType; }).transactionTypeDesc : '',
                    interestType: item.interestType,
                    interestTypeName: item.interestType ? this.listNumber.find(function (event) { return event.id === item.interestType; }).name : '',
                    interestRate: item.interestRate,
                    paymentType: item.paymentType,
                    contractFirstDueDate: this.isoStringToDate(item.contractFirstDueDate),
                    principle: this.localeString(item.principle),
                    total: this.localeString(item.total),
                    contractPeriod: item.contractPeriod,
                    firstDownAmt: this.localeString(item.firstDownAmt),
                    remaining: this.localeString(item.remaining),
                    installmentAmt: this.localeString(item.installmentAmt),
                    income: this.localeString(item.income),
                    paymentDateSpecific: item.paymentDateSpecific,
                    daily: item.daily,
                    paymentDate: item.paymentDate,
                    isClosed: item.isClosed
                });
                return [2 /*return*/];
            });
        });
    };
    ViewDetailComponent.prototype.formatDateInput = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    };
    ViewDetailComponent.prototype.formatDateInput1 = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date, 'DD/MM/YYYY').format('DD-MM-YYYY');
    };
    ViewDetailComponent.prototype.isoStringToDate = function (data) {
        var date = new Date(data);
        return date.toLocaleDateString('th-TH', {
            // weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };
    ViewDetailComponent.prototype.viewInstallmentl = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.installmentTemp = [];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.service.viewInstallmentl(item.transactionId).subscribe(function (resp) {
                            if (resp && resp.length !== 0) {
                                resp.forEach(function (item, i) {
                                    _this.installmentTemp.push({
                                        'installmentNo': i + 1,
                                        'dueDate': item.dueDate,
                                        'installmentAmt': _this.localeString(item.installmentAmt),
                                        'installmentId': item.installmentId,
                                        'isPrepaid': item.isPrepaid
                                    });
                                });
                                resolve(true);
                            }
                        }, function (errorRes) {
                            if (errorRes.error && errorRes.error.errorDesc) {
                                return;
                            }
                        });
                    })];
            });
        });
    };
    ViewDetailComponent.prototype.onClickViewInstallmentlDialog = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var modalRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewInstallmentl(item)];
                    case 1:
                        _a.sent();
                        modalRef = this.modalService.open(_view_installment_view_installment_component__WEBPACK_IMPORTED_MODULE_2__["ViewInstallmentComponent"], {
                            windowClass: 'modal-fit-content-view', backdrop: 'static', keyboard: false
                        });
                        modalRef.componentInstance.isCheckStatus = 'edit';
                        modalRef.componentInstance.installment = this.installmentTemp;
                        modalRef.componentInstance.transactionId = item.transactionId;
                        return [2 /*return*/, modalRef];
                }
            });
        });
    };
    ViewDetailComponent.prototype.delete = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var cf;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onClickDialog('ลบ')];
                    case 1:
                        cf = _a.sent();
                        if (cf) {
                            this.SpinnerService.show();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    _this.service.delete(item.transactionId).subscribe(function (resp) {
                                        if (resp && resp.length !== 0) {
                                            if (_this.dataMain.status === 'cus') {
                                                _this.getCustomer();
                                            }
                                            else if (_this.dataMain.status === 'account') {
                                                _this.searchCus();
                                            }
                                            else {
                                                _this.getData();
                                            }
                                            setTimeout(function () {
                                                _this.SpinnerService.hide();
                                            }, 1000);
                                            resolve(true);
                                        }
                                    }, function (errorRes) {
                                        if (errorRes.error && errorRes.error.errorDesc) {
                                            return;
                                        }
                                    });
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewDetailComponent.prototype.onClickDialog = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var modalRef, flag;
            return __generator(this, function (_a) {
                modalRef = this.modalService.open(_popup_comfirm_popup_comfirm_component__WEBPACK_IMPORTED_MODULE_3__["PopupComfirmComponent"], {
                    backdrop: 'static', keyboard: false
                });
                flag = true;
                this.setModalRef(modalRef, { message: message, flag: flag });
                return [2 /*return*/, modalRef.result];
            });
        });
    };
    ViewDetailComponent.prototype.setModalRef = function (modalRef, modalInfo) {
        for (var _i = 0, _a = Object.keys(modalInfo); _i < _a.length; _i++) {
            var item = _a[_i];
            modalRef.componentInstance[item] = modalInfo[item];
        }
        return modalRef;
    };
    ViewDetailComponent.prototype.saveAsTextFile = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var fileText, w;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.viewInstallmentl(item)];
                    case 1:
                        _a.sent();
                        fileText = '';
                        fileText += 'รายการบัญชี <BR> ------------ <BR>';
                        fileText += 'ชื่อลูกค้า: ' + item.customerName + '<BR>';
                        fileText += 'วันที่: ' + item.createDate + '<BR>';
                        fileText += 'รายการ: ' + item.description + '<BR>';
                        fileText += 'ประเภท: ' + this.listData.transactionType.find(function (event) { return event.transactionTypeId === item.transactionType; }).transactionTypeDesc + '<BR>';
                        fileText += 'เงินต้น: ' + this.localeString(item.principle) + '<BR>';
                        fileText += 'ดาวน์/หักดอก: ' + item.firstDownAmt + '<BR>';
                        fileText += 'คงเหลือผ่อน: ' + this.localeString(item.remaining) + '<BR>';
                        fileText += 'อัตราดอกเบี้ย: ' + item.interestRate + '%<BR>';
                        fileText += 'ยอดรวม: ' + this.localeString(item.total) + '<BR>';
                        fileText += 'จ่ายแบบ: ' + this.listData.paymentType.find(function (event) { return event.paymentTypeId === item.paymentType; }).paymentTypeDesc + (item.paymentType === 1 ? ' ' + item.daily + ' วัน' : '') + '<BR>';
                        fileText += 'จำนวนงวด: ' + item.contractPeriod + '<BR>';
                        fileText += 'ผ่อนงวดละ: ' + this.localeString(item.installmentAmt) + '<BR>';
                        fileText += 'วันที่เริ่มผ่อน: ' + item.contractFirstDueDate + '<BR>';
                        fileText += '------------ <BR> รายการจ่ายค่างวด <BR> ------------ <BR>';
                        this.installmentTemp.forEach(function (item, i) {
                            fileText += '(' + (i + 1) + ') ' + _this.isoStringToDate(_this.formatDateInput(item.dueDate)) + ' = ' + _this.localeString(item.installmentAmt) + '<BR>';
                        });
                        w = null;
                        setTimeout(function () {
                            w = window.open("", "_blank");
                            w.document.write(fileText);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewDetailComponent.prototype.localeString = function (data) {
        var points = data.toLocaleString('en-US');
        return points;
    };
    ViewDetailComponent.prototype.formatDateTimeInput = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('DD-MM-YYYY HH:mm:ss');
    };
    ViewDetailComponent.prototype.gotoBack = function () {
        if (this.dataMain.status === 'cus') {
            this.router.navigate(['/search-customer']);
        }
        else if (this.dataMain.status === 'account') {
            this.router.navigate(['/account-list']);
        }
        else {
            this.router.navigate(['/main']);
        }
    };
    ViewDetailComponent.prototype.listApi = function () {
        this.listData = {
            "interestType": [
                {
                    "interestTypeId": 1,
                    "interestTypeDesc": "รายปี",
                    "seqNo": 1
                },
                {
                    "interestTypeId": 2,
                    "interestTypeDesc": "รายเดือน",
                    "seqNo": 2
                }
            ],
            "paymentType": [
                {
                    "paymentTypeId": 1,
                    "paymentTypeDesc": "รายวัน",
                    "seqNo": 1
                },
                {
                    "paymentTypeId": 2,
                    "paymentTypeDesc": "รายเดือน",
                    "seqNo": 2
                },
                {
                    "paymentTypeId": 3,
                    "paymentTypeDesc": "ระบุวัน",
                    "seqNo": 3
                }
            ],
            "transactionType": [
                {
                    "transactionTypeId": 1,
                    "transactionTypeDesc": "ทอง",
                    "seqNo": 1,
                    "coler": '#ec8b1c'
                },
                {
                    "transactionTypeId": 2,
                    "transactionTypeDesc": "ทุน",
                    "seqNo": 2,
                    "coler": '#ec8b1c'
                },
                {
                    "transactionTypeId": 3,
                    "transactionTypeDesc": "ออม",
                    "seqNo": 3,
                    "coler": '#3d5ff5'
                },
                {
                    "transactionTypeId": 4,
                    "transactionTypeDesc": "ความงาม",
                    "seqNo": 4,
                    "coler": '#ec8b1c'
                },
                {
                    "transactionTypeId": 5,
                    "transactionTypeDesc": "เบอร์",
                    "seqNo": 5,
                    "coler": '#ec8b1c'
                },
                {
                    "transactionTypeId": 6,
                    "transactionTypeDesc": "เพชร",
                    "seqNo": 6,
                    "coler": '#ec8b1c'
                },
                {
                    "transactionTypeId": 7,
                    "transactionTypeDesc": "กู้",
                    "seqNo": 7,
                    "coler": '#ec8b1c'
                }
            ]
        };
        // this.radioTypeList = this.listData.transactionType;
    };
    ViewDetailComponent.prototype.onClickDetailDialog = function (item) {
        var modalRef = this.modalService.open(_add_new_add_new_component__WEBPACK_IMPORTED_MODULE_6__["AddNewComponent"], {
            windowClass: 'modal-fit-content', backdrop: 'static', keyboard: false
        });
        var page = 'Edit';
        this.setModalRef(modalRef, { page: page, item: item });
        return modalRef;
    };
    ViewDetailComponent.prototype.close = function (item, message) {
        return __awaiter(this, void 0, void 0, function () {
            var cf;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onClickDialog(message)];
                    case 1:
                        cf = _a.sent();
                        if (cf) {
                            this.SpinnerService.show();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    _this.service.close(item.transactionId).subscribe(function (resp) {
                                        if (resp && resp.length !== 0) {
                                            if (_this.dataMain.status === 'cus') {
                                                _this.getCustomer();
                                            }
                                            else if (_this.dataMain.status === 'account') {
                                                _this.searchCus();
                                            }
                                            else {
                                                _this.getData();
                                            }
                                            setTimeout(function () {
                                                _this.SpinnerService.hide();
                                            }, 1000);
                                            resolve(true);
                                        }
                                    }, function (errorRes) {
                                        if (errorRes.error && errorRes.error.errorDesc) {
                                            return;
                                        }
                                    });
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-view-detail',
            template: __webpack_require__(/*! ./view-detail.component.html */ "./src/app/page/view-detail/view-detail.component.html"),
            styles: [__webpack_require__(/*! ./view-detail.component.css */ "./src/app/page/view-detail/view-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            src_app_service_service_service__WEBPACK_IMPORTED_MODULE_7__["ServiceService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"]])
    ], ViewDetailComponent);
    return ViewDetailComponent;
}());



/***/ })

}]);
//# sourceMappingURL=page-page-module.js.map