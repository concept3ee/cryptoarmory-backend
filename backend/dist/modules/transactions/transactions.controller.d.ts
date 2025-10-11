import { JwtService } from '@nestjs/jwt';
import { WithdrawDto } from './dto';
import { Model } from 'mongoose';
import { Withdrawal, WithdrawalDocument } from './withdrawal.schema';
export declare class TransactionsController {
    private jwt;
    private model;
    constructor(jwt: JwtService, model: Model<WithdrawalDocument>);
    withdraw(req: any, body: WithdrawDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Withdrawal, {}, {}> & Withdrawal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Withdrawal, {}, {}> & Withdrawal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    list(req: any): import("mongoose").Query<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Withdrawal, {}, {}> & Withdrawal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Withdrawal, {}, {}> & Withdrawal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Withdrawal, {}, {}> & Withdrawal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Withdrawal, {}, {}> & Withdrawal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "find", {}>;
}
