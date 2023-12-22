import { Request } from 'express';
import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import qs from 'qs';
import { ParamsDictionary } from 'express-serve-static-core';
import IdLengthError from '#src/Core/DataAbstractionLayer/Error/IdLengthError';
import InvalidLimitRequestError from '#src/Core/DataAbstractionLayer/Error/InvalidLimitRequestError';
import ResponseLimitExceedError from '#src/Core/DataAbstractionLayer/Error/ResponseLimitExceedError';
import InvalidPaginationCountError from '#src/Core/DataAbstractionLayer/Error/InvalidPaginationCountError';
import Paginator from '#src/Core/DataAbstractionLayer/Search/Paginator';

export default class RequestCriteriaBuilder {
  public constructor(private readonly _paginator: Paginator = new Paginator()) {}
  
  public handleRequest(r: Request, criteria: Criteria, entityDefinition: EntityDefinition): Criteria {
    if (r.method === 'GET' || r.method === 'PATCH' || r.method === 'DELETE') {
      criteria = this.fromUrlParams(r.query, r.params, criteria, entityDefinition);
    }

    return criteria;
  }

  private fromUrlParams(
    query: qs.ParsedQs,
    params: ParamsDictionary,
    criteria: Criteria,
    _entityDefinition: EntityDefinition,
  ): Criteria {
    if (params.id) {
      this.addId(criteria, params.id);
    }

    if (query.limit) {
      this.addLimit(criteria, query.limit);
    }

    if (query.nextKey || query.prevKey) {
      this.addPagination(criteria, query.nextKey as string, query.prevKey as string);
    }

    return criteria;
  }

  private addPagination(criteria: Criteria, nextKey?: string, prevKey?: string): void {
    if (nextKey && prevKey) {
      throw new InvalidPaginationCountError();
    }

    if (nextKey) {
      criteria.nextKey = this._paginator.decrypt(nextKey);
    }

    if (prevKey) {
      criteria.prevKey = this._paginator.decrypt(prevKey);
    }
  }

  private addId(criteria: Criteria, id: string): void {
    if (id.length !== 32) {
      throw new IdLengthError();
    }

    criteria.id = id;
  }

  private addLimit(criteria: Criteria, limit: string | string[] | qs.ParsedQs | qs.ParsedQs[]): void {
    if (limit === '') {
      throw new InvalidLimitRequestError(limit);
    }
    
    if (typeof limit !== 'string') {
      // use default limit
      return;
    }

    const parsedLimit: number = parseInt(limit);

    if (isNaN(parsedLimit)) {
      throw new InvalidLimitRequestError(limit);
    }

    if (parsedLimit <= 0) {
      throw new InvalidLimitRequestError(parsedLimit);
    }

    if (parsedLimit > criteria.maxLimit) {
      throw new ResponseLimitExceedError(criteria.maxLimit, parsedLimit);
    }

    criteria.limit = parsedLimit;
  }
}
