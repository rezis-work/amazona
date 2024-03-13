import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  public _id!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public slug!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true })
  public brand!: string;

  @prop({ required: true })
  public category!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public countInStock!: number;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public numReviews!: number;
}

export const ProductModel = getModelForClass(Product);
