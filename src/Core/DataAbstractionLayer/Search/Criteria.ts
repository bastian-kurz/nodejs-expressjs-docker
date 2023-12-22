export default class Criteria {
  public DEFAULT_LIMIT: number = 25;

  private _limit: number = this.DEFAULT_LIMIT;

  private readonly _maxLimit: number = 50;

  private _id?: string;

  private _nextKey?: object;

  private _prevKey?: object;

  public set limit(limit: number) {
    this._limit = limit;
  }

  public get limit(): number {
    return this._limit;
  }

  public get maxLimit(): number {
    return this._maxLimit;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id(): string|undefined {
    return this._id;
  }

  public set nextKey(key: object) {
    this._nextKey = key;
  }

  public get nextKey(): object|undefined {
    return this._nextKey;
  }

  public set prevKey(key: object) {
    this._prevKey = key;
  }

  public get prevKey(): object|undefined {
    return this._prevKey;
  }
}
