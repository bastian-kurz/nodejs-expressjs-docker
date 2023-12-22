import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';

describe('Criteria Class', () => {
  let criteria: Criteria;

  beforeEach(() => {
    criteria = new Criteria();
  });

  it('should have default limit of 25', () => {
    expect(criteria.limit).toBe(25);
  });

  it('should be able to set and get limit', () => {
    criteria.limit = 30;
    expect(criteria.limit).toBe(30);
  });

  it('should have max limit of 50', () => {
    expect(criteria.maxLimit).toBe(50);
  });

  it('should be able to set and get id', () => {
    criteria.id = 'testId';
    expect(criteria.id).toBe('testId');
  });

  it('should return undefined if id is not set', () => {
    expect(criteria.id).toBeUndefined();
  });

  it('should set and get nextKey correctly', () => {
    const nextKey = { key: 'nextKey' };
    criteria.nextKey = nextKey;

    expect(criteria.nextKey).toEqual(nextKey);
  });

  it('should set and get prevKey correctly', () => {
    criteria.prevKey = { key: 'prevKey' };
    expect(criteria.prevKey).toEqual({ key: 'prevKey' });
  });

  it('should return undefined for nextKey if not set', () => {
    expect(criteria.nextKey).toBeUndefined();
  });

  it('should return undefined for prevKey if not set', () => {
    expect(criteria.prevKey).toBeUndefined();
  });
});
