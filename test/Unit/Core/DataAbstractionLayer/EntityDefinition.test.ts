import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import { BaseEntitySchema } from '#src/Core/DataAbstractionLayer/BaseEntitySchema';

class TestEntityDefinition extends EntityDefinition {
  public getType(): string {
      return 'TestEntity'
  }
  public getEntityName(): string {
    return 'TestEntity';
  }

  public getEntityApiListKey(): string {
    return 'TestEntityList';
  }

  public getEntityClass(): any {
    return class TestEntity {};
  }

  public getCollectionClass(): any {
    return class TestCollection {}; // A dummy class for testing purposes
  }

  public defineFields(): any {
    return {
      ...{
        type: {
          type: 'string',
          value: 'Example',
        },
        PK: {
          type: 'string',
          value: 'Example~${Id}',
        },
        // Sort key will be used for the GET (List) API call so choose wisely because SK is a reversed secondary index
        SK: {
          type: 'string',
          value: '${type}-${CreatedAt}',
        },
        // Key to use for the list api get method call
        LK: {
          type: 'string',
          value: '${type}',
        },
        Id: {
          type: 'string',
          required: true,
        },
        Foo: {
          type: 'string',
          required: true,
        },
        Bar: {
          type: 'number',
          required: true,
        },
      },
      ...BaseEntitySchema,
    };
  }
}

describe('EntityDefinition', () => {
  let testEntityDefinition: TestEntityDefinition;

  beforeEach(() => {
    testEntityDefinition = new TestEntityDefinition();
  });

  it('should return entity name', () => {
    expect(testEntityDefinition.getEntityName()).toBe('TestEntity');
  });

  it('should return entity name', () => {
    expect(testEntityDefinition.getType()).toBe('TestEntity');
  });

  it('should return entity API list key', () => {
    expect(testEntityDefinition.getEntityApiListKey()).toBe('TestEntityList');
  });

  it('should return entity class', () => {
    expect(testEntityDefinition.getEntityClass()).toBeDefined();
  });

  it('should return collection class', () => {
    expect(testEntityDefinition.getCollectionClass()).toBeDefined();
  });

  it('should define fields', () => {
    const fields = testEntityDefinition.defineFields();
    
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
