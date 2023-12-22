import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import PseudoEntity from '#test/Utils/Generate';

describe('EntityCollection class', () => {
  let entityCollection: EntityCollection<Entity>;

  beforeEach(() => {
    entityCollection = new EntityCollection<Entity>();
  });

  it('should add elements to the collection', () => {
    const entity = new PseudoEntity;
    entity.generateUuidWithoutHyphens();
    entityCollection.add(entity);
    expect(entityCollection.get(entity.getId()!)).toBe(entity);
  });

  it('should throw an error when adding invalid element', () => {
    const invalidEntity: any = { name: 'Invalid Entity' };
    expect(() => entityCollection.add(invalidEntity)).toThrow(
      'Parameter element should be of Type Entity',
    );
  });

  it('should throw an error when adding an Entity with missing ID', () => {
    const entity = new PseudoEntity();
    expect(() => entityCollection.add(entity)).toThrow(
      'Could not add element to Collection Entity-ID is missing',
    );
  });

  it('should fill the collection with entities', () => {
    const e1 = new PseudoEntity();
    const e2 = new PseudoEntity();
    const e3 = new PseudoEntity();

    e1.generateUuidWithoutHyphens();
    e2.generateUuidWithoutHyphens();
    e3.generateUuidWithoutHyphens();


    const entities = [e1, e2, e3];

    entityCollection.fill(entities);
    expect(entityCollection.count()).toBe(entities.length);
  });
});
