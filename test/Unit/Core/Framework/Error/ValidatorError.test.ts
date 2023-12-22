import { ExampleEntity } from '#src/App/Entity/Example/ExampleEntity';
import { DeserializeToObject } from '#src/Core/Framework/Serializer/JsonDeserializer';
import ValidatorError from '#src/Core/Framework/Error/ValidatorError';

describe('ValidatorError', () => {
  it('should be correct errors', async () => {
    const json: {} = {
      foo: 'foo',
      bar: 'bar',
    };

    const fn = async () => {
      await DeserializeToObject<ExampleEntity>(ExampleEntity, json, true);
    };

    await expect(fn()).rejects.toThrow(ValidatorError);
  });
});
