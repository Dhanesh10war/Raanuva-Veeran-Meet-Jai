const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("room") || "test-room";

// ZEGOCLOUD Credentials
const appID = 1307399520;
const serverSecret = "a2cd27569f745c5f7f8eb65f9b4bbef1";

// Generate a random User ID and Name
const userID = "user_" + Math.floor(Math.random() * 10000);
const userName = "Participant_" + userID.split("_")[1];

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
    showPreJoinView: false // jump straight in to save time
});
