import { ValidationError } from 'class-validator/types/validation/ValidationError';

export default class ValidatorError extends Error {
  private readonly _validatorErrors: ValidationError[];
  
  public constructor(validatorErrors: ValidationError[]) {
    super();
    this._validatorErrors = validatorErrors;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
  
  public get validationErrors(): ValidationError[] {
    return this._validatorErrors;
  }
}
