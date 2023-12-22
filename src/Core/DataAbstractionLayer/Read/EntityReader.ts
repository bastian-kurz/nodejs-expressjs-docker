import { AnyEntity, OneParams, Paged } from 'dynamodb-onetable';
import Db from '#src/Core/DataAbstractionLayer/DynamoDb/Db';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import { DeserializeToObject } from '#src/Core/Framework/Serializer/JsonDeserializer';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';
import Paginator, { PaginationResponseParams, PaginationTypes } from '#src/Core/DataAbstractionLayer/Search/Paginator';

export default class EntityReader {
  
  public constructor(private readonly _paginator: Paginator = new Paginator()) {}
  
  public async findById(
    entityDefinition: EntityDefinition,
    criteria: Criteria,
  ): Promise<EntitySearchResult> {
    const item: AnyEntity = await Db.instance()!.fetchOne(criteria.id!, entityDefinition, {});
    const entity: Entity = await DeserializeToObject<Entity>(
      entityDefinition.getEntityClass(),
      item,
      true,
      true,
    ) as Entity;

    const collectionClass = entityDefinition.getCollectionClass();

    const collection: EntityCollection<Entity> = new collectionClass();
    collection.fill([entity]);

    return new EntitySearchResult(collection);
  }
  
  public async findAll(
    entityDefinition: EntityDefinition,
    criteria: Criteria,
  ): Promise<[EntitySearchResult, PaginationResponseParams]> {
    
    let requiredDynamoDbParams: OneParams = {
      maxPages: 1,
      limit: criteria.limit,
      index: 'ApiListRequest',
      parse: true,
      hidden: true,
      next: criteria.nextKey,
      prev: criteria.prevKey,
    };

    const pagedResult: Paged<AnyEntity> =
      await Db.instance()!.fetchAll(entityDefinition.getEntityApiListKey(), requiredDynamoDbParams) ?? [];

    const nextKey: string|null = this._paginator.encrypt(entityDefinition, criteria, pagedResult.next, PaginationTypes.NEXT_KEY);
    const prevKey: string|null = this._paginator.encrypt(entityDefinition, criteria, pagedResult.prev, PaginationTypes.PREV_KEY);


    const entities: Entity[] = await DeserializeToObject<Entity>(
      entityDefinition.getEntityClass(),
      pagedResult,
      true,
      true,
    ) as Entity[];

    const collectionClass = entityDefinition.getCollectionClass();

    const collection: EntityCollection<Entity> = new collectionClass();
    collection.fill(entities);

    return [new EntitySearchResult(collection), { next: nextKey, prev: prevKey }];
  }
}
