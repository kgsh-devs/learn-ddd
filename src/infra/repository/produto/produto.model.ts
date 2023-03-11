import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';

@Table({
  tableName: 'produtos',
  timestamps: false,
})
export default class ProdutoModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare nome: string;

  @Column({ allowNull: false })
  declare preco: number;
}