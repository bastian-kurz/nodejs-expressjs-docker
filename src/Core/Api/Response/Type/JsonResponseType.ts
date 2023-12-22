import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import { PaginationResponseParams } from '#src/Core/DataAbstractionLayer/Search/Paginator';

export interface DetailResponse{
  data?: Entity|null|string;
}

export interface ListResponse{
  next: string|null;
  prev: string|null;
  data: Entity[];
}

export const CreateDetailResponse = (entity: EntitySearchResult): DetailResponse => {
  return { data: entity.getEntities().first() };
};

export const CreateListResponse = (entities: EntitySearchResult, pagination?: PaginationResponseParams): ListResponse => {
  return {
    next: pagination?.next ?? null,
    prev: pagination?.prev ?? null,
    data: entities.getEntities().getElements(),
  };
};

export const CreateSimpleResponse = (msg: string): DetailResponse => {
  return {
    data: msg,
  };
};
