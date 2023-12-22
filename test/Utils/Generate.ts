import { EntityAwareInterface } from '#src/Core/DataAbstractionLayer/EntityAwareInterface';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';

export default class PseudoEntity extends Entity implements EntityAwareInterface {
  public readonly isPseudo: boolean = true;

  public constructor() {
    super();
  }

  getEntityName(): string {
    return 'PseudoEntity';
  }

  get entity(): any {
    return PseudoEntity;
  }

  get listKey(): string {
    return 'Foo';
  }

  get name(): string {
    return 'Pseudo';
  }

  getSortKey(): string | number {
    return '';
  }
}
