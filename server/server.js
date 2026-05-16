require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/api/livekit-token", async (req, res) => {
  const roomName = req.query.room;
  const participantName = req.query.participant || `User_${Math.floor(Math.random() * 10000)}`;

  if (!roomName) {
    return res.status(400).json({ error: "Missing 'room' parameter" });
  }

  try {
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: participantName,
        name: participantName,
      }
    );

    at.addGrant({ 
      roomJoin: true, 
      room: roomName,
      canPublish: true,
      canSubscribe: true 
    });

    const token = await at.toJwt();
    res.json({ token, url: process.env.LIVEKIT_URL });
  } catch (error) {
    console.error("LiveKit token error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 RAANUVAVEERAN server running on http://localhost:${PORT}`);
});
