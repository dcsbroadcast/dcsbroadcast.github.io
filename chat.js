$(document).ready(function() {

    setup_jwplayer = function(wrapper, ip, meeting, stream) {
        var url = "rtmp://" + ip + "/live";

        jwplayer("content").setup({
            flashplayer: 'jw-player/player.swf',
            id: 'playerID',
            width: "100%",
            height: "100%",
            file: stream,   // ex: '320x2401-1328884730718'
            streamer: url,  // ex: 'rtmp://192.160.0.100/video/183f0bf3a0982a127bdb8161e0c44eb696b3e75c-1328884719358'
            autostart: 'true',
            provider: 'rtmp',
            duration: '0',
            bufferlength: '1',  // it's not working
            //start: '0',
            //live: 'true',
            //repeat: 'none',
        });
    };

    setup_jwplayer("#wrapper", "mikedev.xyz:443", "broadcast", "broadcast");
});
