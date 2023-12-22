import { Request } from 'express';
import EntityWriter from '#src/Core/DataAbstractionLayer/Write/EntityWriter';
import EntityReader from '#src/Core/DataAbstractionLayer/Read/EntityReader';
import { EntityRepositoryInterface } from '#src/Core/DataAbstractionLayer/EntityRepositoryInterface';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';
import { PaginationResponseParams } from '#src/Core/DataAbstractionLayer/Search/Paginator';

export default class EntityRepository implements EntityRepositoryInterface {
  public constructor(
    private readonly _entityDefinition: EntityDefinition,
    private readonly _writer: EntityWriter = new EntityWriter(),
    private readonly _reader: EntityReader = new EntityReader(),
  ) {};

  public async create(req: Request): Promise<EntitySearchResult> {
    let criteria: Criteria = new Criteria();
    criteria.id = await this._writer.insert(this._entityDefinition, req.body);

    return this.findById(criteria);
  }

  public async update(
    criteria: Criteria,
    payload: object,
  ): Promise<EntitySearchResult> {
    const existingEntitySearchResult: EntitySearchResult = await this.findById(criteria);
    await this._writer.update(this._entityDefinition, existingEntitySearchResult, payload);

    return this.findById(criteria);
  }

  public async delete(criteria: Criteria): Promise<void> {
    const entitySearchResult: EntitySearchResult = await this.findById(criteria);
    await this._writer.delete(this._entityDefinition, entitySearchResult);
  }

  public async findById(criteria: Criteria): Promise<EntitySearchResult> {
    return this._reader.findById(this._entityDefinition, criteria);
  }

  public async findAll(criteria: Criteria): Promise<[EntitySearchResult, PaginationResponseParams]> {
    return this._reader.findAll(this._entityDefinition, criteria);
  }
}
