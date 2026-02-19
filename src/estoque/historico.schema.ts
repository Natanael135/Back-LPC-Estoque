import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class ItemHistorico {
  @Prop({ required: true })
  produtoNome: string;

  @Prop({ required: true })
  quantidade: number;
}

@Schema({
  toJSON: {
    transform: (_doc: any, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Historico extends Document {
  @Prop({ required: true, enum: ['retirada', 'adicao'] })
  tipo: string;

  @Prop({ required: true, type: [{ produtoNome: String, quantidade: Number }] })
  itens: ItemHistorico[];

  @Prop({ required: true, default: () => new Date() })
  data: Date;
}

export const HistoricoSchema = SchemaFactory.createForClass(Historico);
