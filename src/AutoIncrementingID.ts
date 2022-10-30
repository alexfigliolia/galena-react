/**
 * AutoIncrementingID
 *
 * Postgres style auto incrementing ID's that support
 * hash-table indexing
 */
export class AutoIncrementingID {
  private incrementor = 0;

  /**
   * Next ID
   *
   * Returns the next incrementing ID
   */
  public get nextID(): string {
    return (this.incrementor++).toString();
  }

  /**
   * Destroy
   *
   * Resets the incrementor to 0
   */
  public destroy() {
    this.incrementor = 0;
  }
}
