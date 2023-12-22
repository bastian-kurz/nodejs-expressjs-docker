export interface DbConnectionInterface {
  connect<T extends Object>(config: T): any;
}
