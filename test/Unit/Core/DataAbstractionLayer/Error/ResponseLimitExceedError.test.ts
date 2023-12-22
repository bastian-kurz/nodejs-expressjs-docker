import ResponseLimitExceedError from '#src/Core/DataAbstractionLayer/Error/ResponseLimitExceedError';

describe('ResponseLimitExceedError', () => {
  it('should be correct errors', async () => {
    const e = new ResponseLimitExceedError(50, 100);
    expect(e.message).toEqual('The limit must be lower than or equal to MAX_LIMIT=50. Given: 100');
  });
});
