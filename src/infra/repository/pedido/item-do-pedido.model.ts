import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  Index,
  IsUUID,
} from 'sequelize-typescript';
import ProdutoModel from '../produto/produto.model';
import PedidoModel from './pedido.model';

@Table({
  tableName: 'itens_pedido',
  timestamps: false,
})
export default class ItemDoPedidoModel extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare id: string;

  @Index({
    name: 'unique-index',
    unique: true,
  })
  @ForeignKey(() => ProdutoModel)
  @Column({ allowNull: false })
  declare idProduto: string;

  @BelongsTo(() => ProdutoModel)
  declare produto: ProdutoModel;

  @Index({
    name: 'unique-index',
    unique: true,
  })
  @ForeignKey(() => PedidoModel)
  @Column({ allowNull: false })
  declare idPedido: string;

  // @BelongsTo(() => PedidoModel)
  // declare pedido: PedidoModel;

  @Column({ allowNull: false })
  declare quantidade: number;

  @Column({ allowNull: false })
  declare nome: string;

  @Column({ allowNull: false })
  declare preco: number;
}