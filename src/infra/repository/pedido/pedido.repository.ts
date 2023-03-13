import Pedido from '../../../domain/pedido/entity/pedido';
import PedidoModel from './pedido.model';
import ItemModel from './item-do-pedido.model';

export default class PedidoRepository {
  async create(entity: Pedido): Promise<void> {
    await PedidoModel.create(
      {
        id: entity.id,
        idCliente: entity.idCliente,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          idProduto: item.idProduto,
          quantidade: item.quantidade,
        })),
      },
      {
        include: [{ model: ItemModel }],
      }
    );
  }
}