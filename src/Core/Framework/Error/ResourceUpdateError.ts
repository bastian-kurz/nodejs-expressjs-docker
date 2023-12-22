export default class ResourceUpdateError extends Error {
  private readonly _msg: string;

  public constructor(data: {}) {
    super();
    this._msg = `Unable to update Resource with given data: ${JSON.stringify(data)}`;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public get message(): string {
    return this._msg;
  }
}
