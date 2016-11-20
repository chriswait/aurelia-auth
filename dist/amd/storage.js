define(['exports', 'aurelia-dependency-injection', './base-config', 'cookies-js'], function (exports, _aureliaDependencyInjection, _baseConfig, _cookiesJs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Storage = exports.CookieStorage = undefined;

  var _dec, _class;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CookieStorage = exports.CookieStorage = function () {
    function CookieStorage() {
      _classCallCheck(this, CookieStorage);
    }

    CookieStorage.prototype.getItem = function getItem(key) {
      var result = _cookiesJs.Cookies.get(key);
      if (typeof result === 'undefined') {
        result = null;
      }
      return result;
    };

    CookieStorage.prototype.setItem = function setItem(key, value) {
      return _cookiesJs.Cookies.set(key, value);
    };

    CookieStorage.prototype.removeItem = function removeItem(key) {
      return _cookiesJs.Cookies.expire(key);
    };

    return CookieStorage;
  }();

  var Storage = exports.Storage = (_dec = (0, _aureliaDependencyInjection.inject)(_baseConfig.BaseConfig), _dec(_class = function () {
    function Storage(config) {
      _classCallCheck(this, Storage);

      this.config = config.current;
      this.type = this.config.storage;
      this.storage = this._getStorage();
    }

    Storage.prototype.get = function get(key) {
      return this.storage.getItem(key);
    };

    Storage.prototype.set = function set(key, value) {
      return this.storage.setItem(key, value);
    };

    Storage.prototype.remove = function remove(key) {
      return this.storage.removeItem(key);
    };

    Storage.prototype._getStorage = function _getStorage() {
      if (this.type === 'localStorage') {
        if ('localStorage' in window && window.localStorage !== null) return localStorage;
        throw new Error('Local Storage is disabled or unavailable.');
      } else if (this.type === 'sessionStorage') {
        if ('sessionStorage' in window && window.sessionStorage !== null) return sessionStorage;
        throw new Error('Session Storage is disabled or unavailable.');
      } else if (this.type === 'cookies') {
        return new CookieStorage();
      }
      throw new Error('Invalid storage type specified: ' + this.type);
    };

    return Storage;
  }()) || _class);
});