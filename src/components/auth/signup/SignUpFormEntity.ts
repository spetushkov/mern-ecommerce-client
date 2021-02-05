import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../../user/type/User';
import { SignUpFormUtils } from './SignUpFormUtils';

export class SignUpFormEntity implements User {
  @Exclude()
  id = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email = '';

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Should not be empty' })
  @MinLength(6, { message: SignUpFormUtils.passwordMinLength('$constraint1') })
  password = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword = '';
}
