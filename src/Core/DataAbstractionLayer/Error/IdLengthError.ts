import { SearchRequestException } from '#src/Core/DataAbstractionLayer/Error/SearchRequestException';

export default class IdLengthError extends SearchRequestException {
  private readonly _msg: string;

  public constructor() {
    super();
    this._msg = 'Parameter :id should have a min/max length of 32 characters';
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public get message(): string {
    return this._msg;
  }
}
