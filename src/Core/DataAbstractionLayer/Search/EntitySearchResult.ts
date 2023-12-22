import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';

export default class EntitySearchResult {
  public constructor(
    private readonly _entities: EntityCollection<Entity>,
  ) {
  }

  public getEntities(): EntityCollection<Entity> {
    return this._entities;
  }
}
