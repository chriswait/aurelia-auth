var _dec, _class;

import { inject } from 'aurelia-dependency-injection';
import { BaseConfig } from './base-config';
import { Cookies } from 'cookies-js';

export let CookieStorage = class CookieStorage {
  getItem(key) {
    let result = Cookies.get(key);
    if (typeof result === 'undefined') {
      result = null;
    }
    return result;
  }
  setItem(key, value) {
    return Cookies.set(key, value);
  }
  removeItem(key) {
    return Cookies.expire(key);
  }
};

export let Storage = (_dec = inject(BaseConfig), _dec(_class = class Storage {
  constructor(config) {
    this.config = config.current;
    this.type = this.config.storage;
    this.storage = this._getStorage();
  }

  get(key) {
    return this.storage.getItem(key);
  }
  set(key, value) {
    return this.storage.setItem(key, value);
  }
  remove(key) {
    return this.storage.removeItem(key);
  }

  _getStorage() {
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
  }
}) || _class);