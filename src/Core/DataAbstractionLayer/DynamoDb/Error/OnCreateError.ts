export default class OnCreateError extends Error {
  public constructor(msg: string) {
    super(msg);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
