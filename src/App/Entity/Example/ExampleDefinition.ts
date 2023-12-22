import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import { ExampleEntity } from '#src/App/Entity/Example/ExampleEntity';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import ExampleCollection from '#src/App/Entity/Example/ExampleCollection';
import { OneModel } from 'dynamodb-onetable';
import { BaseEntitySchema } from '#src/Core/DataAbstractionLayer/BaseEntitySchema';

export class ExampleDefinition extends EntityDefinition {
  public ENTITY_NAME: string = 'Example';
  
  public getEntityName(): string {
    return this.ENTITY_NAME;
  }
  
  public getEntityApiListKey(): string {
    return 'Example';
  }

  public getType(): string {
    return 'Example';
  }

  public getEntityClass(): typeof Entity {
    return ExampleEntity;
  }

  public getCollectionClass(): typeof EntityCollection<ExampleEntity> {
    return ExampleCollection;
  }
  
  public defineFields(): OneModel {
    return {
      ...{
        type: {
          type: 'string',
          value: this.getType(),
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
