import {Container} from 'aurelia-dependency-injection';
import {Storage} from '../src/storage';
import {BaseConfig} from '../src/base-config';

let key = 'testKey';
let value = 'testValue';

describe('Storage - localStorage', () => {
  it('successfully initialises using defaults (localStorage)', () => {
    let container = new Container();
    let config = new BaseConfig();
    container.registerInstance(BaseConfig, config);
    let storage;
    expect(() => {
      storage = container.get(Storage);
    }).not.toThrow();
    expect(storage.storage).toBe(localStorage);
  });
  it('stores and retrieves values using localStorage', () => {
    let container = new Container();
    let config = new BaseConfig();
    config.configure({storage: 'localStorage'});
    container.registerInstance(BaseConfig, config);
    let storage = container.get(Storage);
    storage.set(key, value);
    expect(storage.get(key)).toBe(value);
  });
  it('removes items using localStorage', () => {
    let container = new Container();
    let config = new BaseConfig();
    container.registerInstance(BaseConfig, config);
    let storage = container.get(Storage);
    storage.set(key, value);
    storage.remove(key);
    expect(storage.get(key)).toBe(null);
  });
});

describe('Storage - sessionStorage', () => {
  it('successfully initialises using sessionStorage', () => {
    let container = new Container();
    let config = new BaseConfig();
    config.configure({storage: 'sessionStorage'});
    container.registerInstance(BaseConfig, config);
    let storage;
    expect(() => {
      storage = container.get(Storage);
    }).not.toThrow();
    expect(storage.storage).toBe(sessionStorage);
  });
  it('stores and retrieves values using sessionStorage', () => {
    let container = new Container();
    let config = new BaseConfig();
    config.configure({storage: 'sessionStorage'});
    container.registerInstance(BaseConfig, config);
    let storage = container.get(Storage);
    storage.set(key, value);
    expect(storage.get(key)).toBe(value);
  });
  it('removes items using sessionStorage', () => {
    let container = new Container();
    let config = new BaseConfig();
    config.configure({storage: 'sessionStorage'});
    container.registerInstance(BaseConfig, config);
    let storage = container.get(Storage);
    storage.set(key, value);
    storage.remove(key);
    expect(storage.get(key)).toBe(null);
  });
});

describe('Storage - cookies', () => {
  it('successfully initialises using cookies', () => {
    let container = new Container();
    let config = new BaseConfig();
    let type = 'cookies'
    config.configure({storage: type});
    container.registerInstance(BaseConfig, config);
    let storage;
    expect(() => {
      storage = container.get(Storage);
    }).not.toThrow();
  });
  /*
  it('stores and retrieves values using cookies', () => {
    let container = new Container();
    let config = new BaseConfig();
    let type = 'cookies'
    config.configure({storage: type});
    container.registerInstance(BaseConfig, config);
    let storage = container.get(Storage);
    storage.set(key, value);
    expect(storage.get(key)).toBe(value);
  });
  it('removes items using cookies', () => {
    let container = new container();
    let config = new baseconfig();
    config.configure({storage: 'cookies'});
    container.registerinstance(baseconfig, config);
    let storage = container.get(storage);
    storage.set(key, value);
    storage.remove(key);
    expect(storage.get(key)).tobe(null);
  });
  */
});
