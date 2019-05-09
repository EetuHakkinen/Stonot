// Hard-coded, replace with your public key
const publicVapidKey = 'BPX1GQyGMO9t0kYGqzlj1S6EcXIfLpuYC5HqnrcBGiGxHAgvAi46iOtHYqeg3Wy2tczoaFS_ZAaDhFNX5Y509vM';

if ('serviceWorker' in navigator) {
    console.log('Registering service worker');

    run().catch(error => console.error(error, 'code:', error.code, 'message:', error.message));
}

async function run() {
    console.log('Registering service worker');
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(async (registration) => {
            console.log(registration);
            console.log('Registered service worker');

            console.log('Registering push');
            const subscription = await registration.pushManager.
                subscribe({
                    userVisibleOnly: true,
                    // The `urlBase64ToUint8Array()` function is the same as in
                    // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });
            console.log('Registered push');

            console.log('Sending push');
            await fetch('/api/push/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'content-type': 'application/json'
                }
            });
            console.log('Sent push');
        }).catch(e => {
            console.warn('ERROR')
            console.error(e);
            console.error(e.code);
            console.error(e.message);
            console.error(e.name);
        });

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}