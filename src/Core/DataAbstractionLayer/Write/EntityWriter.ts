import { OneParams } from 'dynamodb-onetable';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import Db from '#src/Core/DataAbstractionLayer/DynamoDb/Db';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import { DeserializeToObject } from '#src/Core/Framework/Serializer/JsonDeserializer';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import _ from 'lodash';
import { validateOrReject, ValidationError } from 'class-validator';
import ValidatorError from '#src/Core/Framework/Error/ValidatorError';

export default class EntityWriter {

  public async insert(entityDefinition: EntityDefinition, payload: any, params: OneParams = {}): Promise<string> {
    const decodedEntity: Entity = await DeserializeToObject<Entity>(
      entityDefinition.getEntityClass(),
      payload,
      true,
    ) as Entity;

    decodedEntity.generateUuidWithoutHyphens();
    decodedEntity.setCreatedAt();
    decodedEntity.setUpdatedAt(decodedEntity.getCreatedAt());

    const collection: EntityCollection<Entity> = this.createCollection(decodedEntity, entityDefinition);
    
    return Db.instance()!.insert(collection, entityDefinition, params);
  }
  
  public async update(
    entityDefinition: EntityDefinition,
    existingEntitySearchResult: EntitySearchResult,
    payload: object,
  ): Promise<void> {
    const existingEntity: Entity|null = existingEntitySearchResult.getEntities().first();
    const existingProperties:Partial<Entity> = _.pick(payload, _.keys(existingEntity));
    const updatedEntity: Entity & Partial<Entity> = _.merge(existingEntity, existingProperties);
    updatedEntity.setUpdatedAt();

    const validationErrors: void | ValidationError[] = 
      await validateOrReject(updatedEntity).catch((errors): ValidationError[] => {
        return errors;
      });

    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      throw new ValidatorError(validationErrors);
    }

    const collection: EntityCollection<Entity> = this.createCollection(updatedEntity, entityDefinition);

    await Db.instance()!.update(collection, entityDefinition);
  }

  public async delete(entityDefinition: EntityDefinition, entitySearchResult: EntitySearchResult, params: OneParams = {}): Promise<void> {
    return Db.instance()!.delete(entityDefinition, entitySearchResult, params);
  }

  private createCollection(entity: Entity, entityDefinition: EntityDefinition): EntityCollection<Entity> {
    const collectionClass = entityDefinition.getCollectionClass();
    const collection: EntityCollection<Entity> = new collectionClass();
    collection.fill([entity]);

    return collection;
  }
}
