import {Injectable} from '@angular/core';

interface Notification {
    status: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private notifications: Notification[] = [];

    constructor() {
    }

    get notification(): Notification {
        return this.notifications[this.notifications.length - 1];
    }

    addNotification(notification: Notification): void {
        this.notifications.push(notification);
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    clear(): void {
        this.notifications = [];
    }
}
