$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDM_U9XCd2Vn9MJ1b3RoP_WSJaSYdh3k1c",
        authDomain: "multiplayer-bcc90.firebaseapp.com",
        databaseURL: "https://multiplayer-bcc90.firebaseio.com",
        projectId: "multiplayer-bcc90",
        storageBucket: "",
        messagingSenderId: "1083355864831"
    };
    firebase.initializeApp(config);
    var chatroom = firebase.database().ref("chatroom"); //this is for chat 
    var game = firebase.database().ref("players");//this is for game 
    //this is for game 
    $("section").hide();
    var playerName = "";
    var playerChoice = null;
    var lose = 0;
    var win = 0;
    var isFirstPlayer = true;
    //this is for chat 
    $("#chat-box").hide();
    $("#start").on("click", function () {
        if ($("#user").val() !== "") {
            playerName = $("#user").val();
            localStorage.clear();
            localStorage.setItem("user", playerName);
            $("#chat-box").show();
        }
        $("#user").val("");
    })

    chatroom.on("child_added", function (snapshot) {
        updateChatBox(snapshot.val());
    })
    $("#send").on("click", function () {
        var messages = $("#text").val();
        chatroom.push({
            message: messages,
            name: localStorage.getItem("user")
        })
        $("#text").val("");
    })
    function updateChatBox(data) {
        var p = $("<p>");
        p.text(data.name + ":-" + data.message);
        $("#display").append(p);


    }
})