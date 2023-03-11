import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import ProdutoModel from '../produto/produto.model';
import PedidoModel from './pedido.model';

@Table({
  tableName: 'itens_pedido',
  timestamps: false,
})
export default class PedidoItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProdutoModel)
  @Column({ allowNull: false })
  declare idProduto: string;

  @BelongsTo(() => ProdutoModel)
  declare produto: ProdutoModel;

  @ForeignKey(() => PedidoModel)
  @Column({ allowNull: false })
  declare idPedido: string;

  @BelongsTo(() => PedidoModel)
  declare pedido: ProdutoModel;

  @Column({ allowNull: false })
  declare quantidade: number;

  @Column({ allowNull: false })
  declare nome: string;

  @Column({ allowNull: false })
  declare preco: number;
}