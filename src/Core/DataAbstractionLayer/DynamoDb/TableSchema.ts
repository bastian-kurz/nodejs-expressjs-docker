import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

export class TableSchema {
  private _tableSchema: CreateTableCommandInput = {
    Tags: [
      {
        Key: 'environment',
        Value: process.env.APP_ENV ?? 'dev',
      },
      {
        Key: 'app_name',
        Value: process.env.APP_NAME,
      },
    ],
    TableName: process.env.DYNAMODB_TABLE_NAME,
    AttributeDefinitions: [
      {
        AttributeName: 'PK',
        AttributeType: 'S',
      },
      {
        AttributeName: 'SK',
        AttributeType: 'S',
      },
      {
        AttributeName: 'GSI1PK',
        AttributeType: 'S',
      },
      {
        AttributeName: 'GSI1SK',
        AttributeType: 'S',
      },
      {
        AttributeName: 'LK',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'PK',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'SK',
        KeyType: 'RANGE',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    StreamSpecification: {
      StreamEnabled: true,
      StreamViewType: 'KEYS_ONLY',
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'ApiListRequest',
        Projection: {
          ProjectionType: 'ALL',
        },
        KeySchema: [
          {
            AttributeName: 'LK', //List key,
            KeyType: 'HASH',
          },
          {
            AttributeName: 'SK',
            KeyType: 'RANGE',
          },
        ],
      },
      {
        IndexName: 'Reverse',
        Projection: {
          ProjectionType: 'ALL',
        },
        KeySchema: [
          {
            AttributeName: 'SK',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'PK',
            KeyType: 'RANGE',
          },
        ],
      },
      {
        IndexName: 'GSI1',
        Projection: {
          ProjectionType: 'ALL',
        },
        KeySchema: [
          {
            AttributeName: 'GSI1PK',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'GSI1SK',
            KeyType: 'RANGE',
          },
        ],
      },
    ],
    LocalSecondaryIndexes: [
      {
        IndexName: 'LSI1',
        Projection: {
          ProjectionType: 'ALL',
        },
        KeySchema: [
          {
            AttributeName: 'PK',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'GSI1SK',
            KeyType: 'RANGE',
          },
        ],
      },
    ],
  };

  public get tableSchema(): CreateTableCommandInput {
    return this._tableSchema;
  }
}
