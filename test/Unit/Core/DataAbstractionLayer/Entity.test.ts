import { Entity } from '#src/Core/DataAbstractionLayer/Entity';

describe('Entity', () => {
  class TestEntity extends Entity {
    getSortKey(): string | number {
      return '';
    }

  }

  it('should generate UUID without hyphens for ID', () => {
    const testEntity = new TestEntity();
    testEntity.generateUuidWithoutHyphens();

    expect(testEntity.getId()).toMatch(/[a-f0-9]{32}/); // Assuming UUID v4 without hyphens
  });

  it('should set and get createdAt and updatedAt', () => {
    const testEntity = new TestEntity();
    const customDate = '2024-01-01T12:00:00.000Z';

    testEntity.setCreatedAt(customDate);
    expect(testEntity.getCreatedAt()).toBe(customDate);

    testEntity.setUpdatedAt();
    expect(testEntity.getUpdatedAt()).toBeDefined();
  });

  it('should return uppercase properties', () => {
    const testEntity = new TestEntity();
    testEntity.id = 'abc';
    testEntity.createdAt = '2024-01-01T12:00:00.000Z';
    testEntity.updatedAt = '2024-01-02T12:00:00.000Z';

    const uppercaseProps = testEntity.getUppercaseProperties();
    expect(uppercaseProps).toEqual({
      Id: 'abc',
      CreatedAt: '2024-01-01T12:00:00.000Z',
      UpdatedAt: '2024-01-02T12:00:00.000Z',
    });
  });
});
