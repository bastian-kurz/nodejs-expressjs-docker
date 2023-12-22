export default class ResourceNotFoundError extends Error {
  private readonly _msg: string;


  public constructor(id: string) {
    super();
    this._msg = `Unable to find resource by given id: ${id}`;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public get message(): string {
    return this._msg;
  }
}
