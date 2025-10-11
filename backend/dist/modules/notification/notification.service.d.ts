import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
export declare class NotificationService {
    private model;
    constructor(model: Model<NotificationDocument>);
    create(userId: string, title: string, message: string, type?: 'success' | 'info' | 'warning'): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    list(userId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "find", {}>;
    unreadCount(userId: string): import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "countDocuments", {}>;
    markRead(userId: string, id: string): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "updateOne", {}>;
    markAllRead(userId: string): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "updateMany", {}>;
}
