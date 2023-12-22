export class Collection<T> implements Iterable<T>, IterableIterator<T> {
  protected elements: Record<string | number, T> = {};
  private index: number = 0;

  public constructor(elements: Iterable<[string | number, T]> = []) {
    for (const [key, element] of elements) {
      this.set(key, element);
    }
  }

  public set(key: string | number, element: T): void {
    this.elements[key] = element;
  }

  public add(element: T): void {
    const keys = Object.keys(this.elements);
    const newKey = keys.length === 0 ? 0 : Math.max(...keys.map(Number)) + 1;
    this.elements[newKey] = element;
  }

  public get(key: string | number): T | null {
    return this.has(key) ? this.elements[key] : null;
  }

  public has(key: string | number): boolean {
    return key in this.elements;
  }

  public clear(): void {
    this.elements = {};
  }

  public getElements(): T[] {
    return Object.values(this.elements);
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const key in this.elements) {
      yield this.elements[key];
    }
  }

  public getIterator(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  public count(): number {
    return Object.keys(this.elements).length;
  }

  public first(): T | null {
    const keys = Object.keys(this.elements);
    return keys.length > 0 ? this.elements[keys[0]] : null;
  }

  public last(): T | null {
    const keys = Object.keys(this.elements);
    return keys.length > 0 ? this.elements[keys[keys.length - 1]] : null;
  }

  public next(..._args: [] | [undefined]): IteratorResult<T, any> {
    if (this.index >= Object.keys(this.elements).length) {
      return { value: undefined as any, done: true };
    }

    const keys = Object.keys(this.elements);
    const value = this.elements[keys[this.index]];
    this.index++;
    return { value, done: false };
  }
}
