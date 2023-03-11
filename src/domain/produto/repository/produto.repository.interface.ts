import RepositoryInterface from '../../@shared/repository/repository.interface';
import Produto from '../entity/produto';

export default interface ProdutoRepositoryInterface
  extends RepositoryInterface<Produto> {}