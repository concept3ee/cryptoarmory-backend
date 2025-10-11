import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreditWalletDto {
  @ApiProperty({ example: '661234abcd...', description: 'Target user id' })
  @IsString()
  userId!: string;

  @ApiProperty({ example: 100, description: 'Amount to credit' })
  @IsNumber()
  @Min(1)
  amount!: number;
}

export class AssignRoleDto {
  @ApiProperty({ example: '661234abcd...', description: 'Target user id' })
  @IsString()
  userId!: string;

  @ApiProperty({ enum: ['admin', 'user'] })
  @IsEnum(['admin', 'user'])
  role!: 'admin' | 'user';
}

export class SetDepositWalletDto {
  @ApiProperty({ example: 'USDT-TRC20: TABC...XYZ', description: 'Wallet/address text to display for deposits' })
  @IsString()
  walletText!: string;
}


