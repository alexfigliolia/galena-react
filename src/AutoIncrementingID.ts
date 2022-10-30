export class AutoIncrementingID {
  private incrementor = 0;

  public get nextID(): string {
    return (this.incrementor++).toString();
  }

  public destroy() {
    this.incrementor = 0;
  }
}
