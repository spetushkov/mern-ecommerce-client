import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './type/User';

export class UserForm implements Partial<User> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';
}
