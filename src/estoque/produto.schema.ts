import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class Produto extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, default: 0 })
  quantidade: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
