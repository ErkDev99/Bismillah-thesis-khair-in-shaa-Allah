import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy /voice/* browser requests to the voice-actor FastAPI service
  // running on localhost:8001 (run it with: `python voice_service.py` or
  // `python main.py` from the voice-actor/ folder). This keeps the browser
  // calling same-origin relative URLs (no CORS) and matches the old Vite /
  // nginx proxy behaviour from the source project.
  async rewrites() {
    return [
      {
        source: "/voice/:path*",
        destination: "http://localhost:8001/:path*",
      },
    ];
  },
};

export default nextConfig;
