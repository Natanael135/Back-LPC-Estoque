import { Controller, Get, Post, Body } from '@nestjs/common';
import { EstoqueService, ItemRetirada } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  obterTodos() {
    return this.estoqueService.obterTodos();
  }

  @Post('adicionar')
  adicionar(@Body() body: { produtoId: string; quantidade: number }) {
    return this.estoqueService.adicionarEstoque(body.produtoId, body.quantidade);
  }

  @Post('retirar')
  retirar(@Body() body: { itens: ItemRetirada[] }) {
    return this.estoqueService.retirarEmLote(body.itens);
  }
}
