import ResourceCreationError from '#src/Core/Framework/Error/ResourceCreationError';

describe('ResourceCreationError', () => {
  it('should be correct errors', async () => {
    const e = new ResourceCreationError({ foo: 'bar', bar: 'foo' });
    expect(e.message).toEqual('Unable to create Resource with given data: {\"foo\":\"bar\",\"bar\":\"foo\"}');
  });
});
