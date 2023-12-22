import { validateOrReject, ValidationError } from 'class-validator';
import ValidatorError from '#src/Core/Framework/Error/ValidatorError';
import { Entity } from '#src/Core/DataAbstractionLayer/Entity';

export async function DeserializeToObject<T extends Entity>(
  c: { new(...args: any[]): T }, json: any | any[], validateObject?: boolean, toLowerCaseFirstChar?: boolean,
): Promise<T | T[]> {
  if (Array.isArray(json)) {
    const instances: T[] = [];

    for (const jsonObject of json) {
      const instance = await DeserializeToObject(c, jsonObject, validateObject, toLowerCaseFirstChar);
      // @ts-ignore
      instances.push(instance);
    }

    return instances;
  }

  const instance: T = new c();

  for (let jsonKey in json) {
    let key: string = jsonKey;

    if (toLowerCaseFirstChar) {
      key = key.charAt(0).toLowerCase() + key.slice(1);
    }

    if (!Object.prototype.hasOwnProperty.call(json, jsonKey) || !(key in instance)) {
      continue;
    }
    // Use type assertion to inform TypeScript that the key exists in 'instance'
    (instance as any)[key] = json[jsonKey];
  }

  if (validateObject) {
    const validationErrors: void | ValidationError[] = await validateOrReject(instance).catch((errors): ValidationError[] => {
      return errors;
    });

    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      throw new ValidatorError(validationErrors);
    }
  }

  return instance;
}
