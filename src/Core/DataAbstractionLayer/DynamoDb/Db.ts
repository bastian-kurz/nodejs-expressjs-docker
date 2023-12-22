import { DbConnectionInterface } from '#src/Core/DataAbstractionLayer/DbInterface';
import { DynamoDB, DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import Dynamo from 'dynamodb-onetable/Dynamo';
import { AnyEntity, OneParams, Paged, Table } from 'dynamodb-onetable';
import Schema from '#src/App/DataAbstractionLayer/DynamoDb/Schema/Schema';
import OnCreateError from '#src/Core/DataAbstractionLayer/DynamoDb/Error/OnCreateError';
import ConnectError from '#src/Core/DataAbstractionLayer/DynamoDb/Error/ConnectError';
import { TableSchema } from '#src/Core/DataAbstractionLayer/DynamoDb/TableSchema';
import ResourceNotFoundError from '#src/Core/Framework/Error/ResourceNotFoundError';
import ResourceCreationError from '#src/Core/Framework/Error/ResourceCreationError';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import _ from 'lodash';

export default class Db implements DbConnectionInterface {
  private static _instance: Db | null = null;
  private _table: Table | null = null;
  private readonly _ddb: DynamoDB | null;
  private readonly _tableSchema: TableSchema;

  public constructor(config: DynamoDBClientConfig) {
    this._tableSchema = new TableSchema();
    this.connect<DynamoDBClientConfig>(config);
    this._ddb = new DynamoDB(config);
  }

  public connect<T extends Object>(config: T): void {
    const client: Dynamo = new Dynamo({ client: new DynamoDBClient(config) });

    this._table = new Table({
      client,
      name: process.env.DYNAMODB_TABLE_NAME,
      schema: Schema,
      hidden: false,
      partial: false,
      isoDates: true,
      typeField: 'type',
      logger: Boolean(process.env.DYNAMODB_LOGGER),
    });
  }

  public get table(): Table | null {
    return this._table;
  }

  public async insert(
    entityCollection: EntityCollection<Entity>, 
    entityDefinition: EntityDefinition, 
    params: OneParams = {},
  ): Promise<string> {
    await this.init();

    const entity: Entity = entityCollection.first()!;
    const item: AnyEntity | undefined = await this._table?.create(
      entityDefinition.getEntityName(), 
      entity.getUppercaseProperties(), 
      params,
    );

    if (!item) {
      throw new ResourceCreationError(entity.getUppercaseProperties());
    }

    if (!entity.id) {
      throw new Error('Something went wrong while writing a new resource, generated id is missing.');
    }

    return entity.id;
  }

  public async update(
    entityCollection: EntityCollection<Entity>,
    entityDefinition: EntityDefinition,
    params: OneParams = {},
  ): Promise<void> {
    await this.init();

    /**
     * Update with unique items uses transactions and cannot return the updated item.Use params {return: 'none'}
     * to squelch this warning. Use {return: 'get'} to do a non-transactional get of the item after the update.
     */
    const queryParams: OneParams = _.merge(params, { return: 'none' });

    const entity: Entity = entityCollection.first()!;
    await this._table?.update(
      entityDefinition.getEntityName(),
      entity.getUppercaseProperties(),
      queryParams,
    );
  }
  
  public async delete(
    entityDefinition: EntityDefinition,
    entitySearchResult: EntitySearchResult,
    params: OneParams = {},
  ): Promise<void> {
    await this.init();

    const entity: Entity = entitySearchResult.getEntities().first()!;
    return this._table?.remove(
      entityDefinition.getEntityName(),
      {
        PK: `${entityDefinition.getEntityName()}~${entity.id}`,
        SK: entity.getSortKey(),
      },
      params,
    );
  }

  public async fetchOne(
    id: string,
    entityDefinition: EntityDefinition,
    params: OneParams = {},
  ): Promise<AnyEntity> {
    await this.init();

    const item: AnyEntity | undefined =
      await this._table?.get(
        entityDefinition.getEntityName(),
        {
          PK: `${entityDefinition.getEntityName()}~${id}`,
          Type: `${entityDefinition.getType()}`,
        },
        params,
      );

    if (!item) {
      throw new ResourceNotFoundError(id);
    }
    
    return item;
  }

  public async fetchAll(apiListKey: string, params: OneParams = {}): Promise<Paged<AnyEntity> | undefined> {
    await this.init();

    return this._table?.queryItems({ LK: apiListKey }, params);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public static instance(): Db | null {
    if (!this._instance) {
      const configuration: DynamoDBClientConfig = {
        apiVersion: process.env.DYNAMODB_API_VERSION!,
        endpoint: process.env.DYNAMODB_URL,
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY ?? '',
        },
      };

      this._instance = new Db(configuration);
    }

    return this._instance;
  }

  public shutdown(): void {
    this._ddb?.destroy();
  }

  private async init(): Promise<void> {
    if (!await this._table?.exists()) {
      try {
        await this._ddb?.createTable(this._tableSchema.tableSchema);
      } catch (err) {
        if (err instanceof Error) {
          throw new OnCreateError(
            `Error while creating DynamoDb - Table ${process.env.DYNAMODB_TABLE_NAME}\n\r ${err.message}`,
          );
        }
      }
    }

    if (!this._table || !await this._table?.exists()) {
      throw new ConnectError('Could not establish DynamoDb connection');
    }
  }
}
