import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import PseudoEntity from '#test/Utils/Generate';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';

describe('EntitySearchResult', () => {
  let entities: EntityCollection<PseudoEntity>;
  let entitySearchResult: EntitySearchResult;

  beforeEach(() => {
    entities = new EntityCollection([['foo', new PseudoEntity()]]);
    entitySearchResult = new EntitySearchResult(entities);
  });

  it('should return correct entities', () => {
    expect(entitySearchResult.getEntities()).toBe(entities);
  });

  it('should allow modification of entities after creation', () => {
    const newEntities = new EntityCollection<Entity>();
    entitySearchResult = new EntitySearchResult(newEntities);
    expect(entitySearchResult.getEntities()).toBe(newEntities);
  });

  it('should return a different entities collection instance', () => {
    const newEntities = new EntityCollection();
    expect(entitySearchResult.getEntities()).not.toBe(newEntities);
  });
});
