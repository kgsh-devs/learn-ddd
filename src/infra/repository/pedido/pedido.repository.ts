import Pedido from '../../../domain/pedido/entity/pedido';
import PedidoModel from './pedido.model';
import ItemDoPedidoModel from './item-do-pedido.model';
import PedidoRepositoryInterface from '../../../domain/pedido/repository/pedido.repository.interface';
import ItemDoPedido from '../../../domain/pedido/entity/item-do-pedido';

export default class PedidoRepository implements PedidoRepositoryInterface {
  async create(entity: Pedido): Promise<void> {
    await PedidoModel.create(
      {
        id: entity.id,
        idCliente: entity.idCliente,
        total: entity.total(),
        itens: entity.itens.map((item) => ({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          idProduto: item.idProduto,
          quantidade: item.quantidade,
        })),
      },
      {
        include: [{ model: ItemDoPedidoModel }],
      }
    );
  }

  async get(id: string): Promise<Pedido> {
    let pedidoModel;
    try {
      pedidoModel = await PedidoModel.findOne({
        where: {
          id,
        },
        include: [{ model: ItemDoPedidoModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Pedido não encontrado');
    }

    const itens = this.modelToObject(pedidoModel.itens);
    const pedido = new Pedido(pedidoModel.id, pedidoModel.idCliente, itens) ;
    return pedido;
  }
  
  async getAll(): Promise<Pedido[]> {
    const pedidosModel = await PedidoModel.findAll({
      include: [{ model: ItemDoPedidoModel }],
    });

    return pedidosModel.map((pedido) =>
      new Pedido(pedido.id, pedido.idCliente, this.modelToObject(pedido.itens))
    );
  }
  
  private modelToObject(itensModel: ItemDoPedidoModel[]): ItemDoPedido[] {
    const itens: ItemDoPedido[] = [];
    itensModel.forEach((itemModel) => {
      const item = new ItemDoPedido(
        itemModel.id,
        itemModel.nome,
        itemModel.preco,
        itemModel.idProduto,
        itemModel.quantidade
      );
      itens.push(item);
    });
    return itens
  }

  update(entity: Pedido): Promise<void> {
    throw new Error('Method not implemented.');
  }
}