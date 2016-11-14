import {Container} from 'aurelia-dependency-injection';
import {Storage} from '../src/storage';
import {BaseConfig} from '../src/base-config';

let key = 'testKey';
let value = 'testValue';
describe('Storage', () => {
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

  it('stores and retrieves values using sessionStorage', () => {
    let container = new Container();
    let config = new BaseConfig();
    config.configure({storage: 'sessionStorage'});
    container.registerInstance(BaseConfig, config);
    let storage = container.get(Storage);
    storage.set(key, value);
    expect(storage.get(key)).toBe(value);
  });

  it('removes items', () => {
    let container = new Container();
    let config = new BaseConfig();
    container.registerInstance(BaseConfig, config);
    let storage = container.get(Storage);
    storage.set(key, value);
    storage.remove(key);
    expect(storage.get(key)).toBe(null);
  });

  it('throws error when trying to initialise using cookies', () => {
    let container = new Container();
    let config = new BaseConfig();
    let type = 'cookies'
    config.configure({storage: type});
    container.registerInstance(BaseConfig, config);

    let expectedError = new Error('Invalid storage type specified: ' + type);
    try {
      container.get(Storage);
    } catch (e) {
      expect(e.innerError).toEqual(expectedError);
    }
  });

});
