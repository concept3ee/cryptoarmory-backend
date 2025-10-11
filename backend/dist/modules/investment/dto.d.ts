import type { PlanId, RateType } from './schemas/planConfig.schema';
export declare class CreateInvestmentDto {
    planId: string;
    amount: number;
}
export declare class UpsertPlanConfigDto {
    planId: PlanId;
    rate: RateType;
    percent: number;
}
