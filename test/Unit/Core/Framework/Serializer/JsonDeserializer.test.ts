import { ExampleEntity } from '#src/App/Entity/Example/ExampleEntity';
import { DeserializeToObject } from '#src/Core/Framework/Serializer/JsonDeserializer';
import ValidatorError from '#src/Core/Framework/Error/ValidatorError';

describe('JsonDeserializer', () => {
  it('should deserialize correctly', async () => {
    const jsonData = { id: '312313', foo: 'bar', 'bar': 1, 'dddd': 13 };
    const exampleEntity = await DeserializeToObject<ExampleEntity>(ExampleEntity, jsonData, true) as ExampleEntity;

    expect(exampleEntity.foo).toEqual('bar');
    expect(exampleEntity.id).toEqual('312313');
    expect(exampleEntity.bar).toEqual(1);

  });


  it('should lower case the properties', async () => {
    const jsonData = { Id: '312313', Foo: 'bar', Bar: 1, 'dddd': 13 };
    const exampleEntity = await DeserializeToObject<ExampleEntity>(ExampleEntity, jsonData, true, true) as ExampleEntity;

    expect(exampleEntity.foo).toEqual('bar');
    expect(exampleEntity.id).toEqual('312313');
    expect(exampleEntity.bar).toEqual(1);
  });

  it('should do the same with an array of entities', async () => {
    const jsonData = [{ Id: '312313', Foo: 'bar', Bar: 1, 'dddd': 13 }, { Id: '312313', Foo: 'bar', Bar: 1, 'dddd': 13 }];
    const e = await DeserializeToObject<ExampleEntity>(ExampleEntity, jsonData, true, true) as ExampleEntity[];

    expect(e).toHaveLength(2);

    for (const exampleEntity of e) {
      expect(exampleEntity.foo).toEqual('bar');
      expect(exampleEntity.id).toEqual('312313');
      expect(exampleEntity.bar).toEqual(1);
    }
  });

  it('should throw error', async () => {
    const jsonData = { Id: '312313', Foo: 'bar', Bar: '1', 'dddd': 13 };
    const fn = async () => {
      await DeserializeToObject<ExampleEntity>(ExampleEntity, jsonData, true);
    };

    await expect(fn()).rejects.toThrow(ValidatorError);
  });
});
