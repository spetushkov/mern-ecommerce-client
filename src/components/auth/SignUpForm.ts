import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SignUpFormUtils } from './SignUpFormUtils';

export class SignUpForm {
  @Expose()
  @IsString()
  @IsNotEmpty()
  userName = '';

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
