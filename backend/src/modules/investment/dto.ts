import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import type { PlanId, RateType } from './schemas/planConfig.schema';

export class CreateInvestmentDto {
  @ApiProperty({ example: 'basic', description: 'Identifier of the investment plan' })
  @IsString()
  planId!: string;

  @ApiProperty({ example: 100, description: 'Amount to invest' })
  @IsNumber()
  @Min(1)
  amount!: number;
}

export class UpsertPlanConfigDto {
  @ApiProperty({ enum: ['starter', 'premium', 'elite'] })
  @IsEnum(['starter', 'premium', 'elite'] as unknown as PlanId[])
  planId!: PlanId;

  @ApiProperty({ enum: ['daily', 'weekly', 'monthly'] })
  @IsEnum(['daily', 'weekly', 'monthly'] as unknown as RateType[])
  rate!: RateType;

  @ApiProperty({ example: 2.5, description: 'Percent profit per period' })
  @IsNumber()
  @Min(0)
  percent!: number;
}



