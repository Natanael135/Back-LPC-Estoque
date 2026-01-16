import { Injectable } from '@nestjs/common';

export interface Produto {
  id: string;
  nome: string;
  quantidade: number;
}

export interface ItemRetirada {
  produtoId: string;
  quantidade: number;
}

@Injectable()
export class EstoqueService {
  private produtos: Produto[] = [
    { id: '1', nome: 'Coxinha de Frango', quantidade: 0 },
    { id: '2', nome: 'Coxinha de Frango com Bacon', quantidade: 0 },
    { id: '3', nome: 'Coxinha de Queijo', quantidade: 0 },
    { id: '4', nome: 'Coxinha de Calabresa', quantidade: 0 },
    { id: '5', nome: 'Coxinha de Pizza', quantidade: 0 },
    { id: '6', nome: 'Coxinha de Carne do Sol', quantidade: 0 },
    { id: '7', nome: 'Kibi', quantidade: 0 },
    { id: '8', nome: 'Churritos', quantidade: 0 },
    { id: '9', nome: 'Baby Churros de Chocolate', quantidade: 0 },
    { id: '10', nome: 'Baby Churros de Doce de Leite', quantidade: 0 },
  ];

  obterTodos(): Produto[] {
    return this.produtos;
  }

  adicionarEstoque(produtoId: string, quantidade: number): Produto {
    const produto = this.produtos.find(p => p.id === produtoId);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    produto.quantidade += quantidade;
    return produto;
  }

  retirarEmLote(itens: ItemRetirada[]): { sucesso: boolean; mensagem: string; produtos: Produto[] } {
    // Validar se todos os produtos existem e têm estoque suficiente
    for (const item of itens) {
      const produto = this.produtos.find(p => p.id === item.produtoId);
      if (!produto) {
        return {
          sucesso: false,
          mensagem: `Produto com ID ${item.produtoId} não encontrado`,
          produtos: this.produtos,
        };
      }
      if (produto.quantidade < item.quantidade) {
        return {
          sucesso: false,
          mensagem: `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidade}, Solicitado: ${item.quantidade}`,
          produtos: this.produtos,
        };
      }
    }

    // Se passou na validação, efetuar as retiradas
    for (const item of itens) {
      const produto = this.produtos.find(p => p.id === item.produtoId);
      produto.quantidade -= item.quantidade;
    }

    return {
      sucesso: true,
      mensagem: 'Retirada realizada com sucesso',
      produtos: this.produtos,
    };
  }
}
