import { SearchRequestException } from '#src/Core/DataAbstractionLayer/Error/SearchRequestException';

export default class InvalidLimitRequestError extends SearchRequestException {
  private readonly _msg: string;

  public constructor(limit: any) {
    super();
    this._msg = `The limit parameter must be a positive integer greater or equals than 1. Given: ${limit}`;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public get message(): string {
    return this._msg;
  }
}
