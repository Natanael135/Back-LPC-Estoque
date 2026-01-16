import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { Produto, ProdutoSchema } from './produto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
  ],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
