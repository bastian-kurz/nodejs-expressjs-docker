// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

export abstract class Entity {

  public id?: string;

  public createdAt?: string;

  public updatedAt?: string;

  public abstract getSortKey(): string|number;

  public getUppercaseProperties(): Record<string, any> {
    const keys = Object.keys(this) as (keyof this)[];
    const uppercaseObj: Record<string, any> = {};

    for (const key of keys) {
      const value = (this[key] as any);
      if (typeof value !== 'function') {
        const capitalizedKey: string = String(key).charAt(0).toUpperCase() + String(key).slice(1);
        uppercaseObj[capitalizedKey] = value;
      }
    }

    return uppercaseObj;
  }

  public generateUuidWithoutHyphens(): void {
    this.id = uuidv4().replace(/-/g, '');
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getCreatedAt(): string | undefined {
    return this.createdAt;
  }

  public setCreatedAt(date?: string): void {
    this.createdAt = date ?? new Date().toISOString();
  }

  public getUpdatedAt(): string | undefined {
    return this.updatedAt;
  }

  public setUpdatedAt(date?: string): void {
    this.updatedAt = date ?? new Date().toISOString();
  }
}
