import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { Produto, ProdutoSchema } from './produto.schema';
import { Historico, HistoricoSchema } from './historico.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Produto.name, schema: ProdutoSchema },
      { name: Historico.name, schema: HistoricoSchema },
    ]),
  ],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
