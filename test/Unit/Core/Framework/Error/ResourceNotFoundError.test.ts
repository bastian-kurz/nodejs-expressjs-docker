import ResourceNotFoundError from "#src/Core/Framework/Error/ResourceNotFoundError";

describe('ResourceCreationError', () => {
  it('should be correct errors', async () => {
    const e = new ResourceNotFoundError('abcd');
    expect(e.message).toEqual('Unable to find resource by given id: abcd');
  });
});
