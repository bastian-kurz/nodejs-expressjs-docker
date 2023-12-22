import Paginator, { PaginationTypes } from '#src/Core/DataAbstractionLayer/Search/Paginator';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import { OneModel } from 'dynamodb-onetable';
import EntityCollection from '#src/Core/DataAbstractionLayer/EntityCollection';
import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';

class MockEntityDefinition extends EntityDefinition {
  defineFields(): OneModel {
    return {};
  }

  getCollectionClass(): typeof EntityCollection {
    return EntityCollection;
  }

  getEntityApiListKey(): string {
    return '';
  }

  getEntityClass(): any {
  }

  getEntityName(): string {
    return 'Entity';
  }

  getType(): string {
    return '';
  }
}

describe('Paginator Class', () => {
  let paginator: Paginator;
  let entityDefinition: EntityDefinition;
  let criteria: Criteria;

  beforeEach(() => {
    paginator = new Paginator();
    entityDefinition = new MockEntityDefinition();
    criteria = new Criteria();
  });

  it('should encrypt and decrypt data for next key', () => {
    const data = { id: 1, value: 'Test' };
    const type = PaginationTypes.NEXT_KEY;

    const encryptedData = paginator.encrypt(entityDefinition, criteria, data, type);
    expect(encryptedData).toContain('nextKey=');

    const encodedString = extractEncodedString(encryptedData!, 'nextKey=');
    const decryptedData = paginator.decrypt(encodedString);
    expect(decryptedData).toEqual(data);
  });

  it('should encrypt and decrypt data for prev key', () => {
    const data = { id: 2, value: 'Previous' };
    const type = PaginationTypes.PREV_KEY;

    const encryptedData = paginator.encrypt(entityDefinition, criteria, data, type);
    expect(encryptedData).toContain('prevKey=');

    const encodedString = extractEncodedString(encryptedData!, 'prevKey=');
    const decryptedData = paginator.decrypt(encodedString);
    expect(decryptedData).toEqual(data);
  });
});

function extractEncodedString(encryptedData: string, keyPrefix: string): string {
  const keyIndex = encryptedData.indexOf(keyPrefix);
  if (keyIndex !== -1) {
    const encodedPart = encryptedData.substring(keyIndex + keyPrefix.length);
    return encodedPart.split('&')[0];
  }
  return '';
}
