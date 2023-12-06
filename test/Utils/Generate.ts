import { EntityAwareInterface } from '#src/Core/EntityAwareInterface';

export default class PseudoEntity implements EntityAwareInterface {
  public readonly isPseudo: boolean = true;
}
