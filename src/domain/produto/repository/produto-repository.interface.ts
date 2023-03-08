import RepositoryInterface from '../../@shared/repository/repository-interface';
import Product from '../entity/produto';

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}