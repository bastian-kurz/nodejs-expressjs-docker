import { OneModel } from 'dynamodb-onetable';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';

export abstract class EntityDefinition {
  public abstract getEntityName(): string;
  public abstract getEntityApiListKey(): string;
  public abstract getType(): string;
  public abstract getEntityClass(): any;
  public abstract getCollectionClass(): typeof EntityCollection<any>;
  public abstract defineFields(): OneModel;
}
