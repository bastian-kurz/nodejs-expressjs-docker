import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';
import RequestCriteriaBuilder from '#src/Core/DataAbstractionLayer/Search/RequestCriteriaBuilder';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import { OneModel } from 'dynamodb-onetable';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import InvalidLimitRequestError from '#src/Core/DataAbstractionLayer/Error/InvalidLimitRequestError';
import ResponseLimitExceedError from '#src/Core/DataAbstractionLayer/Error/ResponseLimitExceedError';
import IdLengthError from '#src/Core/DataAbstractionLayer/Error/IdLengthError';

class MockEntityDefinition extends EntityDefinition {
  defineFields(): OneModel {
    return {};
  }

  getCollectionClass(): typeof EntityCollection {
    return EntityCollection;
  }

  getEntityApiListKey(): string {
    return '';
  }

  getEntityClass(): any {
  }

  getEntityName(): string {
    return '';
  }

  getType(): string {
    return '';
  }
}

describe('RequestCriteriaBuilder Class', () => {
  let requestCriteriaBuilder: RequestCriteriaBuilder;
  let criteria: Criteria;

  beforeEach(() => {
    requestCriteriaBuilder = new RequestCriteriaBuilder();
    criteria = new Criteria();
  });

  it('should update criteria for GET method', () => {
    const requestMock: any = { method: 'GET', query: { limit: '30' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    const updatedCriteria = requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());

    expect(updatedCriteria.limit).toBe(30);
    expect(updatedCriteria.id).toBe('3741279e60e64f2fb73ee36de147d840');
  });

  it('should update criteria for PATCH method', () => {
    const requestMock: any = { method: 'PATCH', query: { limit: '40' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    const updatedCriteria = requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());

    expect(updatedCriteria.limit).toBe(40);
    expect(updatedCriteria.id).toBe('3741279e60e64f2fb73ee36de147d840');
  });

  it('should update criteria for DELETE method', () => {
    const requestMock: any = { method: 'DELETE', query: { limit: '50' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    const updatedCriteria = requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());

    expect(updatedCriteria.limit).toBe(50);
    expect(updatedCriteria.id).toBe('3741279e60e64f2fb73ee36de147d840');
  });

  it('should not update criteria for POST method', () => {
    const requestMock: any = { method: 'POST', query: { limit: '60' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    const updatedCriteria = requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());

    expect(updatedCriteria.limit).toBe(criteria.DEFAULT_LIMIT);
    expect(updatedCriteria.id).toBeUndefined();
  });

  it('should throw IdLengthError for invalid ID length', () => {
    const invalidId = 'invalidId';
    const requestMock: any = { method: 'GET', params: { id: invalidId } };
    expect(() => {
      requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());
    }).toThrow(IdLengthError);
  });

  it('should throw InvalidLimitRequestError for non-numeric limit', () => {
    const requestMock: any = { method: 'GET', query: { limit: 'abc' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    expect(() => {
      requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());
    }).toThrow(InvalidLimitRequestError);
  });

  it('should throw InvalidLimitRequestError for negative limit', () => {
    const requestMock: any = { method: 'GET', query: { limit: '-10' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    expect(() => {
      requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());
    }).toThrow(InvalidLimitRequestError);
  });

  it('should throw ResponseLimitExceedError for exceeding max limit', () => {
    const requestMock: any = { method: 'GET', query: { limit: '60' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    expect(() => {
      requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());
    }).toThrow(ResponseLimitExceedError);
  });

  it('should not throw error for valid limit', () => {
    const requestMock: any = { method: 'GET', query: { limit: '20' }, params: { id: '3741279e60e64f2fb73ee36de147d840' } };
    expect(() => {
      requestCriteriaBuilder.handleRequest(requestMock, criteria, new MockEntityDefinition());
    }).not.toThrow();
  });
});
