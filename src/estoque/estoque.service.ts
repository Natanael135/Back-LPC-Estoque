import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto } from './produto.schema';

export interface ItemRetirada {
  produtoId: string;
  quantidade: number;
}

@Injectable()
export class EstoqueService implements OnModuleInit {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) {}

  async onModuleInit() {
    // Inicializar produtos se o banco estiver vazio
    const count = await this.produtoModel.countDocuments();
    if (count === 0) {
      await this.produtoModel.insertMany([
        { nome: 'Coxinha de Frango', quantidade: 210 },
        { nome: 'Coxinha de Frango com Bacon', quantidade: 150 },
        { nome: 'Coxinha de Queijo', quantidade: 180 },
        { nome: 'Coxinha de Calabresa', quantidade: 150 },
        { nome: 'Coxinha de Pizza', quantidade: 120 },
        { nome: 'Coxinha de Carne do Sol', quantidade: 180 },
        { nome: 'Kibi', quantidade: 15 },
        { nome: 'Churritos', quantidade: 20 },
        { nome: 'Baby Churros de Chocolate', quantidade: 30 },
        { nome: 'Baby Churros de Doce de Leite', quantidade: 60 },
      ]);
    }
  }

  async obterTodos(): Promise<Produto[]> {
    return this.produtoModel.find().exec();
  }

  async adicionarEstoque(produtoId: string, quantidade: number): Promise<Produto> {
    const produto = await this.produtoModel.findById(produtoId);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    produto.quantidade += quantidade;
    return produto.save();
  }

  async retirarEmLote(itens: ItemRetirada[]): Promise<{ sucesso: boolean; mensagem: string; produtos: Produto[] }> {
    // Validar se todos os produtos existem e têm estoque suficiente
    for (const item of itens) {
      const produto = await this.produtoModel.findById(item.produtoId);
      if (!produto) {
        return {
          sucesso: false,
          mensagem: `Produto com ID ${item.produtoId} não encontrado`,
          produtos: await this.produtoModel.find().exec(),
        };
      }
      if (produto.quantidade < item.quantidade) {
        return {
          sucesso: false,
          mensagem: `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidade}, Solicitado: ${item.quantidade}`,
          produtos: await this.produtoModel.find().exec(),
        };
      }
    }

    // Se passou na validação, efetuar as retiradas
    for (const item of itens) {
      await this.produtoModel.findByIdAndUpdate(
        item.produtoId,
        { $inc: { quantidade: -item.quantidade } },
      );
    }

    return {
      sucesso: true,
      mensagem: 'Retirada realizada com sucesso',
      produtos: await this.produtoModel.find().exec(),
    };
  }
}
