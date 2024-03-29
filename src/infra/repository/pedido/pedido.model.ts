import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import ClienteModel from '../cliente/cliente.model';
import ItemDoPedidoModel from './item-do-pedido.model';

@Table({
  tableName: 'pedidos',
  timestamps: false,
})
export default class PedidoModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ClienteModel)
  @Column({ allowNull: false })
  declare idCliente: string;

  @BelongsTo(() => ClienteModel)
  declare cliente: ClienteModel;

  @HasMany(() => ItemDoPedidoModel)
  declare itens: ItemDoPedidoModel[];

  @Column({ allowNull: false })
  declare total: number;
}