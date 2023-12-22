import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';

export enum PaginationTypes {
  NEXT_KEY = 'nextKey',
  PREV_KEY = 'prevKey'
}

export type PaginationResponseParams = {
  next: string|null;
  prev: string|null;
}

export default class Paginator {
  public encrypt(
    entityDefinition: EntityDefinition, 
    criteria: Criteria,
    data: object|undefined,
    type: PaginationTypes,
  ): string|null {
    let encryptedData: string|null = null;


    if (data) {
      const encoded: string = btoa(JSON.stringify(data));
      encryptedData = `/${entityDefinition.getEntityName().toLowerCase()}?limit=${criteria.limit}&${type}=${encoded}`;
    }

    return encryptedData;
  }

  public decrypt(encryptedData: string): object {
    return JSON.parse(atob(encryptedData));
  }
}
