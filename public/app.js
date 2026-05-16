const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("room") || "test-room";
const userName = urlParams.get("name") || "Guest";

// ZEGOCLOUD Credentials
const appID = 1307399520;
const serverSecret = "a2cd27569f745c5f7f8eb65f9b4bbef1";

// Generate a unique User ID based on the entered name
const userID = userName.toLowerCase().replace(/\s+/g, "_") + "_" + Math.floor(Math.random() * 10000);

// Generate the Kit Token
const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    userID,
    userName
);

// Initialize ZegoCloud
const zp = ZegoUIKitPrebuilt.create(kitToken);

// Join the Room and attach UI to the #root div
zp.joinRoom({
    container: document.querySelector("#root"),
    sharedLinks: [
      {
        name: 'Copy Room Link',
        url: window.location.href,
      },
    ],
    scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
    },
    showScreenSharingButton: true,
    showUserList: true,
    showRoomDetailsButton: true,
    showPreJoinView: true
});
