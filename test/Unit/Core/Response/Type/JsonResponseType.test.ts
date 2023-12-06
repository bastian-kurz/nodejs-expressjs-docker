import PseudoEntity from '#test/Utils/Generate';
import {
  CreateDetailResponse,
  CreateListResponse,
  CreateSimpleResponse,
  DetailResponse, ListResponse,
} from '#src/Core/Api/Response/Type/JsonResponseType';

describe('JsonResponseType', () => {
  describe('CreateDetailResponse', () => {
    it('Should return DetailResponse interface', async () => {
      const pseudoEntity = new PseudoEntity();
      const result: DetailResponse = CreateDetailResponse(pseudoEntity);
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
    it('Should return ListResposne interface', async () => {
      const pEntity1: PseudoEntity = new PseudoEntity();
      const pEntity2: PseudoEntity = new PseudoEntity();
      const pEntity3: PseudoEntity = new PseudoEntity();
      
      const arr: PseudoEntity[] = [pEntity1, pEntity2, pEntity3];
      const result: ListResponse = CreateListResponse(arr);
      expect(result.data).toEqual(arr);
    });
  });
});
