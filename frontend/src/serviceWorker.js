var isSubscribed = false;
var swRegisteration = null;
var appKey = 'BPoO-AvPYIs5yUy98MqLmuPd7mNtcf9FL2i-xxUpQu-ZFQw9irJiW2RtvDeMAdajbDrQLXegsgDswtdv9hVWLbM';

function urlB64ToUnit8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('sw.js')
        .then((swReg) => {
            swRegisteration = swReg;
            swRegisteration.pushManager.getSubscription()
                .then((sub) => {
                    isSubscribed = !(sub === null);

                    if (isSubscribed) {
                        console.log('subscribed!');
                    } else {
                        swRegisteration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlB64ToUnit8Array(appKey)
                        })
                        .then((subsc) => {
                            saveSubscription(subsc);
                            isSubscribed = true;
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                    }
                });
        })
        .catch(e => {
            console.error(e);
        });
} else {
    console.warn('Push messaging is not supported');
}

function saveSubscription(sub) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/api/push/subscribe");
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState != 4) return;
        if (xmlHttp.status !== 200 && xmlHttp.status != 304) {
            console.error('HTTP error ' + xmlHttp.status, null);
        } else {
            console.log('subscribed');
        }
    };
    xmlHttp.send(JSON.stringify(sub));
}