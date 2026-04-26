'use client';
import { startPolling } from "@/utils/poll";
import { useEffect } from "react";
import { apiRequest } from "@/utils/api";

export default function BackgroundPoller() {
  useEffect(() => {
    let stopPolling = null;

    const syncPollingState = () => {
      const isOnline = localStorage.getItem('online') === 'true';
			const userID = localStorage.getItem('userId')
      if (isOnline && !stopPolling) {
        console.log("Polling started...");
        stopPolling = startPolling(async () => {
          await apiRequest('/poll-this', 'post', {"id": userID}) 
        }, 10000);
      } 
      else if (!isOnline && stopPolling) {
        console.log("Polling stopped.");
        stopPolling();
        stopPolling = null;
      }
    };

    syncPollingState();

    window.addEventListener('storage', syncPollingState);

    const interval = setInterval(syncPollingState, 2000);

    return () => {
      if (stopPolling) stopPolling();
      window.removeEventListener('storage', syncPollingState);
      clearInterval(interval);
    };
  }, []);

  return null;
}

