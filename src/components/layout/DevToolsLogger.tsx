"use client";

import { useEffect } from "react";

export default function DevToolsLogger() {
  useEffect(() => {
    // Only log once per session
    if (sessionStorage.getItem("hasLoggedDevTools")) return;
    
    console.log(
      "%cYou looked closer.\nWelcome.",
      "font-family: monospace; font-size: 14px; color: #a1a1aa;"
    );
    
    sessionStorage.setItem("hasLoggedDevTools", "true");
  }, []);

  return null;
}
