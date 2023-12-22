import { Collection } from '#src/Core/Framework/Structure/Collection';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';

export default class EntityCollection<T> extends Collection<T> {
  public constructor(elements: Iterable<[string | number, T]> = []) {
    super(elements);
  }

  public add(element: T): void {
    if (!(element instanceof Entity)) {
      throw new Error('Parameter element should be of Type Entity');
    }

    if (!element.id) {
      throw new Error('Could not add element to Collection Entity-ID is missing');
    }

    this.set(element.id, element);
  }
  
  public fill(entities: Entity[]): void {
    for (const entity of entities) {
      this.add(entity as unknown as T);
    }
  }
}
