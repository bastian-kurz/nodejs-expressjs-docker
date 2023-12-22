export interface EntityAwareInterface {
  /**
   * Is implemented in the abstract entity class
   * @see Entity
   */
  getUppercaseProperties(): Record<string, any>;

  // Generates a new uuid for a given entity
  generateUuidWithoutHyphens(): void;
}
