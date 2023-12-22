import { ExampleDefinition } from '#src/App/Entity/Example/ExampleDefinition';

export default {
  version: '0.1.0',
  format: 'onetable:1.0.0',
  indexes: {
    primary: {
      hash: 'PK',
      sort: 'SK',
    },
    ['GSI1']: {
      hash: 'GSI1PK',
      sort: 'GSI1SK',
    },
    ['LSI1']: {
      sort: 'GSI1SK',
      type: 'local',
    },
    ['ApiListRequest']: {
      hash: 'LK',
      sort: 'SK',
    },
  },
  models: {
    Example: new ExampleDefinition().defineFields(),
  },
  params: {
    typeField: 'type',
  },
  queries: {},
};
