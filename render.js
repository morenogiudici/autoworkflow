function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}  

docReady(function() {
    const version = document.getElementById('version');
    const notification = document.getElementById('notification');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');


    /*
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      version.innerText = 'Version ' + arg.version;
    });*/

    window.api.receive("fromMain", (data) => {
        console.log(`*******RECIVED ${data} from main process`);
        version.innerText = 'Version ' + data.version;
    });
    window.api.receive("update_available", (data) => {
        //ipcRenderer.removeAllListeners('update_downloaded');
        message.innerText = 'A new update is available. Downloading now...';
        notification.classList.remove('hidden');
    });
    window.api.receive("update_available", (data) => {
        //ipcRenderer.removeAllListeners('update_available');
        message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
        restartButton.classList.remove('hidden');
        notification.classList.remove('hidden');
    });

    //window.api.send("toMain", "some data");
    window.api.send("toMain", "app_version");
    //window.api.send("findFolder", "some data");
    function closeNotification() {
        notification.classList.add('hidden');
      }
    function restartApp() {
        window.api.send("restart_app");
    }
});