import { Request } from 'express';
import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';
import { PaginationResponseParams } from '#src/Core/DataAbstractionLayer/Search/Paginator';

export interface EntityRepositoryInterface {
  create(req: Request): Promise<EntitySearchResult>;

  update(criteria: Criteria, payload: object): Promise<EntitySearchResult>;

  delete(criteria: Criteria): Promise<void>;

  findById(criteria: Criteria): Promise<EntitySearchResult>;

  findAll(criteria: Criteria): Promise<[EntitySearchResult, PaginationResponseParams]>;
}
