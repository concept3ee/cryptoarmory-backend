import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private model: Model<NotificationDocument>) {}

  create(userId: string, title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') {
    return this.model.create({ userId, title, message, type });
  }

  list(userId: string) {
    return this.model.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  unreadCount(userId: string) {
    return this.model.countDocuments({ userId, read: false });
  }

  markRead(userId: string, id: string) {
    return this.model.updateOne({ _id: id, userId }, { $set: { read: true } });
  }

  markAllRead(userId: string) {
    return this.model.updateMany({ userId }, { $set: { read: true } });
  }
}



