import type { Dictionary } from 'types/shared';

type Values<T> = T[keyof T];

class TypedObject {
  public keys<T extends Dictionary>(object: T) {
    return Object.keys(object) as (keyof T)[];
  }

  public entries<T extends Dictionary>(object: T) {
    return Object.entries<T[keyof T]>(object);
  }

  public lastKey<T extends Dictionary>(object: T) {
    return Object.keys(object).pop();
  }

  public pop<T extends Dictionary>(object: T): Values<T> | null {
    const lastKey = Object.keys(object).pop();
    if (lastKey) {
      return object[lastKey];
    }
    return null;
  }

  public shift<T extends Dictionary>(object: T): Values<T> | null {
    const firstKey = Object.keys(object).shift();
    if (firstKey) {
      return object[firstKey];
    }
    return null;
  }

  public size<T extends Dictionary>(object: T) {
    return Object.keys(object).length;
  }

  public isEmpty<T extends Dictionary>(object: T) {
    return Object.keys(object).length === 0;
  }

  public isExist<T extends Dictionary>(object: T) {
    return Object.keys(object).length !== 0;
  }

  public in<K extends PropertyKey>(
    obj: object,
    key: K
  ): obj is Record<K, unknown> {
    if (!obj || typeof obj !== 'object') return false;
    return key in obj;
  }
}

export default new TypedObject();
