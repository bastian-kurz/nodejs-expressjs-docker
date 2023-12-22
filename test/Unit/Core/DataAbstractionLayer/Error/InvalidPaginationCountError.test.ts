import InvalidPaginationCountError from '#src/Core/DataAbstractionLayer/Error/InvalidPaginationCountError';

describe('InvalidPaginationCountError', () => {
  it('should be correct errors', async () => {
    const e = new InvalidPaginationCountError();
    expect(e.message).toEqual('Only nextKey or prevKey allowed at the same time as query parameter.');
  });
});
