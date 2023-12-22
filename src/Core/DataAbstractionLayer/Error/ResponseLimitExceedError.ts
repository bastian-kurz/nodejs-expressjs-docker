import { SearchRequestException } from '#src/Core/DataAbstractionLayer/Error/SearchRequestException';

export default class ResponseLimitExceedError extends SearchRequestException {
  private readonly _msg: string;

  public constructor(maxLimit: number, limit: number) {
    super();
    this._msg = `The limit must be lower than or equal to MAX_LIMIT=${maxLimit}. Given: ${limit}`;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public get message(): string {
    return this._msg;
  }
}
