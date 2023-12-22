import InvalidLimitRequestError from '#src/Core/DataAbstractionLayer/Error/InvalidLimitRequestError';

describe('InvalidLimitError', () => {
  it('should be correct errors', async () => {
    const e = new InvalidLimitRequestError('(empty)');
    expect(e.message).toEqual('The limit parameter must be a positive integer greater or equals than 1. Given: (empty)');
  });
});
