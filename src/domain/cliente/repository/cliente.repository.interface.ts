import RepositoryInterface from '../../@shared/repository/repository.interface';
import Cliente from '../entity/cliente';

export default interface ClienteRepositoryInterface
  extends RepositoryInterface<Cliente> {}
