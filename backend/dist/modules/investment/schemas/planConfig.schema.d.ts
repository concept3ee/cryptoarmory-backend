import { HydratedDocument } from 'mongoose';
export type PlanConfigDocument = HydratedDocument<PlanConfig>;
export type PlanId = 'starter' | 'premium' | 'elite';
export type RateType = 'daily' | 'weekly' | 'monthly';
export declare class PlanConfig {
    planId: PlanId;
    rate: RateType;
    percent: number;
}
export declare const PlanConfigSchema: import("mongoose").Schema<PlanConfig, import("mongoose").Model<PlanConfig, any, any, any, import("mongoose").Document<unknown, any, PlanConfig, any, {}> & PlanConfig & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PlanConfig, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PlanConfig>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PlanConfig> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
