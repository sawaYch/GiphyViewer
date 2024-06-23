/* eslint-disable @typescript-eslint/unbound-method */
import { zustandMMKVStorage } from './zustandMMKV';

describe('zustandMMKVStorage', () => {
  it('should set an item in storage', () => {
    const name = 'testKey';
    const value = 'testValue';

    zustandMMKVStorage.setItem(name, value);
    const result = zustandMMKVStorage.getItem(name);
    expect(result).toBe(value);
  });

  it('should get an item from storage', () => {
    const name = 'testKey';
    const value = 'testValue';

    const result = zustandMMKVStorage.getItem(name);
    expect(result).toBe(value);
  });

  it('should return null if the item does not exist in storage', () => {
    const name = 'nonexistentKey';

    const result = zustandMMKVStorage.getItem(name);

    expect(result).toBeNull();
  });

  it('should remove an item from storage', () => {
    const name = 'testKey';

    zustandMMKVStorage.removeItem(name);
    const result = zustandMMKVStorage.getItem(name);

    expect(result).toBe(null);
  });
});
