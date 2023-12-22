import IdLengthError from '#src/Core/DataAbstractionLayer/Error/IdLengthError';

describe('IdLengthError', () => {
  it('should be correct errors', async () => {
    const e = new IdLengthError();
    expect(e.message).toEqual('Parameter :id should have a min/max length of 32 characters');
  });
});
