import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

/**
 * Socket Connection Test Script
 * Usage: node src/scripts/testSocket.js
 * 
 * This script tests WebSocket connection without authentication
 * to verify the server is accepting connections.
 */

const SOCKET_URL = process.env.FRONTEND_URL?.replace("/api", "") || "http://localhost:5000";

console.log(`\n🧪 Testing Socket.IO connection to ${SOCKET_URL}\n`);

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  reconnection: false,
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
  console.log("✅ Transport:", socket.io.engine.transport.name);
});

socket.on("connect_error", (error) => {
  console.error("❌ Connection error:", error.message);
  if (error.message.includes("Authentication")) {
    console.log("ℹ️  This is expected - authentication middleware is working");
    console.log("ℹ️  Real clients will authenticate via session cookie");
  }
  process.exit(1);
});

socket.on("disconnect", (reason) => {
  console.log("🔌 Disconnected:", reason);
  process.exit(0);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.log("\n⏱️  Test timeout - no response from server");
  socket.close();
  process.exit(1);
}, 10000);
