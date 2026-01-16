import { Controller, Get, Post, Body } from '@nestjs/common';
import { EstoqueService, ItemRetirada } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  async obterTodos() {
    const produtos = await this.estoqueService.obterTodos();
    return produtos.map(p => p.toJSON());
  }

  @Post('adicionar')
  async adicionar(@Body() body: { produtoId: string; quantidade: number }) {
    const produto = await this.estoqueService.adicionarEstoque(body.produtoId, body.quantidade);
    return produto.toJSON();
  }

  @Post('retirar')
  async retirar(@Body() body: { itens: ItemRetirada[] }) {
    const resultado = await this.estoqueService.retirarEmLote(body.itens);
    return {
      ...resultado,
      produtos: resultado.produtos.map(p => p.toJSON())
    };
  }
}
