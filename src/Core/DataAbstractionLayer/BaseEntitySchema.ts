import { OneModel } from 'dynamodb-onetable';

export const BaseEntitySchema: OneModel = {
  CreatedAt: {
    type: 'string',
    required: true,
  },
  UpdatedAt: {
    type: 'string',
    required: true,
  },
};
