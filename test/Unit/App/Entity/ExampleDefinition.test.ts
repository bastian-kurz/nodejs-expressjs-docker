import { ExampleDefinition } from '#src/App/Entity/Example/ExampleDefinition';
import { ExampleEntity } from '#src/App/Entity/Example/ExampleEntity';
import ExampleCollection from '#src/App/Entity/Example/ExampleCollection';

describe('ExampleDefinition', () => {
  let exampleDefinition: ExampleDefinition;

  beforeEach(() => {
    exampleDefinition = new ExampleDefinition();
  });

  it('should return correct entity name', () => {
    expect(exampleDefinition.getEntityName()).toBe('Example');
  });

  it('should return correct api list key', () => {
    expect(exampleDefinition.getEntityApiListKey()).toBe('Example');
  });

  it('should return correct entity class', () => {
    expect(exampleDefinition.getEntityClass()).toBe(ExampleEntity);
  });

  it('should return correct collection class', () => {
    expect(exampleDefinition.getCollectionClass()).toBe(ExampleCollection);
  });

  it('should define fields correctly', () => {
    const fields = exampleDefinition.defineFields();
    expect(fields).toEqual({
      type: { type: 'string', value: 'Example' },
      PK: { type: 'string', value: 'Example~${Id}' },
      SK: { type: 'string', value: '${type}-${CreatedAt}' },
      LK: { type: 'string', value: '${type}' },
      Id: { type: 'string', required: true },
      Foo: { type: 'string', required: true },
      Bar: { type: 'number', required: true },
      CreatedAt: { type: 'string', required: true },
      UpdatedAt: { type: 'string', required: true },
    });
  });
});
