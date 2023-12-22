import ResourceUpdateError from '#src/Core/Framework/Error/ResourceUpdateError';

describe('ResourceCreationError', () => {
  it('should be correct errors', async () => {
    const e = new ResourceUpdateError({ foo: 'bar', bar: 'foo' });
    expect(e.message).toEqual('Unable to update Resource with given data: {\"foo\":\"bar\",\"bar\":\"foo\"}');
  });
});
