export function toEvent(type: any,data: chrome.notifications.NotificationOptions){
    return {
        type,
        data
    }
}

