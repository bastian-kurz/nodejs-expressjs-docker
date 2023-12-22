import { Collection } from '#src/Core/Framework/Structure/Collection';

describe('Collection class tests', () => {
  let collection: Collection<number>;

  beforeEach(() => {
    collection = new Collection<number>([
      ['1', 10],
      ['2', 20],
      ['3', 30],
    ]);
  });

  afterEach(() => {
    collection.clear();
  });

  it('should set elements', () => {
    collection.set('4', 40);
    expect(collection.get('4')).toBe(40);
  });

  it('should add elements', () => {
    const initialLength = collection.count();
    collection.add(40);
    const finalLength = collection.count();

    expect(finalLength).toBe(initialLength + 1);
  });

  it('should get elements', () => {
    expect(collection.get('2')).toBe(20);
    expect(collection.get('5')).toBeNull();
  });

  it('should check element existence', () => {
    expect(collection.has('3')).toBe(true);
    expect(collection.has('5')).toBe(false);
  });

  it('should clear elements', () => {
    collection.clear();
    expect(collection.count()).toBe(0);
  });

  it('should return elements as an array', () => {
    expect(collection.getElements()).toEqual([10, 20, 30]);
  });

  it('should iterate through elements', () => {
    const result: number[] = [];
    for (const item of collection) {
      result.push(item);
    }
    expect(result).toEqual([10, 20, 30]);
  });

  it('should return the first element', () => {
    expect(collection.first()).toBe(10);
  });

  it('should return the last element', () => {
    expect(collection.last()).toBe(30);
  });
});
