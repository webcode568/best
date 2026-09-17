(function() {
    function forceFullScreen() {
        let elem = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { 
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) { 
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) { 
                elem.msRequestFullscreen();
            }
        }
    }

    function blockExitKeys(event) {
        let blockedKeys = ["Escape", "F5", "F11", "F12", "Control", "Shift", "Tab"];
        if (blockedKeys.includes(event.key) || (event.ctrlKey && event.key === "w")) {
            event.preventDefault();
            event.stopPropagation();
            forceFullScreen(); // Re-enable fullscreen if attempted exit
        }
    }

    document.addEventListener("keydown", blockExitKeys);
    document.addEventListener("keyup", blockExitKeys);

    setInterval(forceFullScreen, 100); // Check fullscreen mode every 100ms

    window.addEventListener("beforeunload", function(event) {
        event.preventDefault();
        event.returnValue = "Are you sure you want to leave?";
    });

    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            forceFullScreen();
        }
    });

    document.addEventListener("DOMContentLoaded", forceFullScreen);
})();