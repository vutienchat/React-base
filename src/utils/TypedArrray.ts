class TypedArray {
  public includes<T extends any[], E extends any>(
    array: T,
    element: E
  ): element is T[number] {
    return array.includes(element);
  }

  public isEmpty<T extends any[]>(array: T) {
    return Array.isArray(array) && array.length === 0;
  }

  public join<T extends any[]>(array: T) {
    if (!Array.isArray(array)) return '';
    return array
      .filter((value) => value && typeof value === 'string')
      .join(' ');
  }
}

export default new TypedArray();
