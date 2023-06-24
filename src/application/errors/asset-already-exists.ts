export class AssetAlreadyExistsError extends Error {
  public constructor() {
    super('Asset already exists.');
  }
}
