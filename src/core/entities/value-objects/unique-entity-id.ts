import { ObjectId } from 'bson';

export class UniqueEntityId {
  private readonly _id: ObjectId;

  public constructor(id?: ObjectId) {
    this._id = id ?? new ObjectId();
  }

  public toValue(): ObjectId {
    return this._id;
  }

  public toString(): string {
    return this._id.toHexString();
  }
}
