import { HydratedDocument } from 'mongoose';
export type InvestmentDocument = HydratedDocument<Investment>;
export declare class Investment {
    userId: string;
    planId: string;
    amount: number;
    status: string;
    confirmedAt?: Date;
    walletUrl?: string;
    proofUrl?: string;
    manualProfit?: number;
}
export declare const InvestmentSchema: import("mongoose").Schema<Investment, import("mongoose").Model<Investment, any, any, any, import("mongoose").Document<unknown, any, Investment, any, {}> & Investment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Investment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Investment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Investment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
