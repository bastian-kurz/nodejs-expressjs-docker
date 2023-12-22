import { SearchRequestException } from '#src/Core/DataAbstractionLayer/Error/SearchRequestException';

export default class InvalidPaginationCountError extends SearchRequestException {
  private readonly _msg: string;

  public constructor() {
    super();
    this._msg = 'Only nextKey or prevKey allowed at the same time as query parameter.';
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public get message(): string {
    return this._msg;
  }
}
