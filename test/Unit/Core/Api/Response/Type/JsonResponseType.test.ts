import PseudoEntity from '#test/Utils/Generate';
import {
  CreateDetailResponse, CreateListResponse, CreateSimpleResponse,
  DetailResponse, ListResponse,
} from '#src/Core/Api/Response/Type/JsonResponseType';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';

describe('JsonResponseType', () => {
  describe('CreateDetailResponse', () => {
    it('Should return DetailResponse interface', async () => {
      const pseudoEntity: PseudoEntity = new PseudoEntity();
      pseudoEntity.generateUuidWithoutHyphens();
      const entityCollection: EntityCollection<Entity> = new EntityCollection();
      entityCollection.fill([pseudoEntity]);

      const entitySearchResult: EntitySearchResult = new EntitySearchResult(entityCollection);

      const result: DetailResponse = CreateDetailResponse(entitySearchResult);
      expect(result.data).toEqual(pseudoEntity);
    });
  });

  describe('CreateSimpleResponse', () => {
    it('Should return DetailResponse interface', async () => {
      const result: DetailResponse = CreateSimpleResponse('Hello World');
      expect(result).toEqual({ data: 'Hello World' });
    });
  });

  describe('CreateListResponse', () => {
    it('Should return ListResponse interface', async () => {
      const pEntity1: PseudoEntity = new PseudoEntity();
      const pEntity2: PseudoEntity = new PseudoEntity();
      const pEntity3: PseudoEntity = new PseudoEntity();

      pEntity1.generateUuidWithoutHyphens();
      pEntity2.generateUuidWithoutHyphens();
      pEntity3.generateUuidWithoutHyphens();

      const entityCollection: EntityCollection<Entity> = new EntityCollection();
      entityCollection.fill([pEntity1, pEntity2, pEntity3]);

      const arr: EntitySearchResult = new EntitySearchResult(entityCollection);
      const result: ListResponse = CreateListResponse(arr);
      expect(result.data).toEqual(arr.getEntities().getElements());
    });
  });
});
