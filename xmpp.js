$(document).ready(function() {
    
    var roomJid = "dcsbroadcast@conference.victorqhong.com";

    var connect = function(status, error) {
        console.debug("Status: " + status);
        console.debug("Error: " + error);

        if (status === Strophe.Status.CONNECTED) {
            sendPresence("available");
            sendMucPresence("available");
        }
    };

    var connection = new Strophe.Connection("https://victorqhong.com/http-bind/");
    connection.connect("victorqhong.com", "", connect);

    debug = true;
    if (debug) {
        connection.xmlInput = function (input) {
            console.debug("RECV:");
            console.debug(input);
        };
        connection.xmlOutput = function (output) {
            console.debug("SEND:");
            console.debug(output);
        };
    }

    $(window).on("unload", function () {
        if (connection) {
            connection.options.sync = true;
            connection.disconnect();
            connection.flush();
        }
    });

    var sendPresence = function(presence) {
        var pres = $pres();
        if (presence !== "available") {
            pres = pres.c("show", presence);
        }

        connection.send(pres);
    }

    var sendMucPresence = function(presence) {
        var pres = $pres({
            to: roomJid + "/" + Strophe.getResourceFromJid(connection.jid)
        });

        if (presence !== "available") {
            pres = pres.c("show", presence);
        }

        connection.send(pres);
    }

    var groupMessage = function(message) {
        console.log("Got message");
        console.log(message);

        var body = message.getElementsByTagName("body")[0];
        if (!body) {
            return true;
        }

        body = body.textContent;

        var from = message.getAttribute("from");
        if (!from) {
            return true;
        }

        from = Strophe.getResourceFromJid(from);

        $("#messageList").append("<li><strong>" + from + "</strong>: " + body + "</li>")

        return true;
    };

    connection.addHandler(groupMessage, null, 'message', 'groupchat');

    function sendMessage(message) {
        var request = $msg({
            to: roomJid,
            type: "groupchat"
        }).c("body", message);
        connection.send(request);
    }

    $("#messageInput").keyup(function(event) {
        if (event.which == 13 && !event.shiftKey) {
            var text = $(this).val();
            sendMessage(text);
            $(this).val("");
        }
    });
});
