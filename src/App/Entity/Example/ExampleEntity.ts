import { Entity } from '#src/Core/DataAbstractionLayer/Entity';
import { IsInt, IsString } from 'class-validator';

export class ExampleEntity extends Entity {

  @IsString()
  public readonly foo: string|undefined;

  @IsInt()
  public readonly bar: number|undefined;

  public getFoo(): string | undefined {
    return this.foo;
  }

  public getBar(): number | undefined {
    return this.bar;
  }

  public getSortKey(): string|number {
    return `Example-${this.getCreatedAt()}`;
  }
}
