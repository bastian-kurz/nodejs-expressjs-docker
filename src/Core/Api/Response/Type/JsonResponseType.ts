import { EntityAwareInterface } from '#src/Core/EntityAwareInterface';

export interface DetailResponse{
  data?: EntityAwareInterface|string;
}

export interface ListResponse{
  total: number;
  page: number;
  data: EntityAwareInterface[];
}

export const CreateDetailResponse = (entity: EntityAwareInterface): DetailResponse => {
  return { data: entity };
};

// this is just a dummy implementation should be implemented correct if other parts are created
export const CreateListResponse = (entity: EntityAwareInterface[]): ListResponse => {
  return {
    total: 1, // @ToDo implement correct totalCount calculation
    page: 1, // @ToDo implement correct pagination
    data: entity,
  };
};

export const CreateSimpleResponse = (msg: string): DetailResponse => {
  return {
    data: msg,
  };
};
