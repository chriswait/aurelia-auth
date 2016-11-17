import {inject} from 'aurelia-dependency-injection';
import {BaseConfig} from './base-config';

@inject(BaseConfig)
export class Storage {
  constructor(config) {
    this.config = config.current;
    this.type = this.config.storage;
    this.storage = this._getStorage();
  }
  isUsingStorage() {
    return (this.type === 'localStorage' || this.type === 'sessionStorage');
  }

  get(key) {
    if (this.isUsingStorage()) {
      return this.storage.getItem(key);
    }
  }
  set(key, value) {
    if (this.isUsingStorage()) {
      return this.storage.setItem(key, value);
    }
  }
  remove(key) {
    if (this.isUsingStorage()) {
      return this.storage.removeItem(key);
    }
  }

  _getStorage() {
    if (this.type === 'localStorage') {
      if ('localStorage' in window && window.localStorage !== null) return localStorage;
      throw new Error('Local Storage is disabled or unavailable.');
    } else if (this.type === 'sessionStorage') {
      if ('sessionStorage' in window && window.sessionStorage !== null) return sessionStorage;
      throw new Error('Session Storage is disabled or unavailable.');
    } else if (this.type === 'cookies') {
      return undefined;
    }
    throw new Error('Invalid storage type specified: ' + this.type);
  }
}
