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
  async adicionar(@Body() body: { itens: ItemRetirada[] }) {
    const resultado = await this.estoqueService.adicionarEmLote(body.itens);
    return {
      ...resultado,
      produtos: resultado.produtos.map(p => p.toJSON()),
    };
  }

  @Post('retirar')
  async retirar(@Body() body: { itens: ItemRetirada[] }) {
    const resultado = await this.estoqueService.retirarEmLote(body.itens);
    return {
      ...resultado,
      produtos: resultado.produtos.map(p => p.toJSON())
    };
  }

  @Get('historico')
  async obterHistorico() {
    const historico = await this.estoqueService.obterHistorico();
    return historico.map(h => h.toJSON());
  }
}
