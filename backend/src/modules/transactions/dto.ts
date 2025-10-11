import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({ example: 250, description: 'Withdrawal amount' })
  @IsNumber()
  @Min(1)
  amount!: number;

  @ApiProperty({ example: '1234567890', description: 'Destination account number / wallet' })
  @IsString()
  accountNumber!: string;

  @ApiProperty({ example: 'First National Bank', description: 'Receiving bank name' })
  @IsString()
  bankName!: string;

  @ApiProperty({ example: 'John Doe', description: 'Recipient full name' })
  @IsString()
  recipientName!: string;

  @ApiPropertyOptional({ example: '0xabc... or TRC20 address', description: 'Recipient crypto wallet address (optional)' })
  @IsOptional()
  @IsString()
  walletAddress?: string;
}


