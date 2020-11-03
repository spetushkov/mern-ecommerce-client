import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  @IsNotEmpty()
  @MinLength(6)
  password = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword = '';
}
