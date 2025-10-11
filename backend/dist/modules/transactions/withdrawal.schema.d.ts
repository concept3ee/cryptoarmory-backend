import { HydratedDocument } from 'mongoose';
export type WithdrawalDocument = HydratedDocument<Withdrawal>;
export declare class Withdrawal {
    userId: string;
    amount: number;
    accountNumber: string;
    bankName: string;
    recipientName: string;
    walletAddress?: string;
    status: string;
}
export declare const WithdrawalSchema: import("mongoose").Schema<Withdrawal, import("mongoose").Model<Withdrawal, any, any, any, import("mongoose").Document<unknown, any, Withdrawal, any, {}> & Withdrawal & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Withdrawal, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Withdrawal>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Withdrawal> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
