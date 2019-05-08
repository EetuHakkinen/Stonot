var notificationUrl = '';

self.addEventListener('push', e => {
    var _data = e.data ? JSON.parse(e.data.text()) : {};
    notificationUrl = _data.url;
    e.waitUntil(
        self.registration.showNotification(_data.title, {
            body: _data.message,
            icon: _data.icon,
            tag: _data.tag
        })
    );
})

self.addEventListener('notificationclick', e => {
    e.notification.close();

    e.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(clientList => {
            if (clients.openWindow) {
                return clients.openWindow(notificationUrl);
            }
        })
    );
});