"use client";

import { useEffect } from 'react';
import { apiRequest } from '@/utils/api';
import { getCookie } from '@/utils/customCookie';

export default function BackgroundPoller() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log("BackgroundPoller initialized successfully on the client.");

    const runPoll = async () => {
      try {
        const userId = getCookie('userId');
        
        if (!userId) {
          console.log("Polling skipped: No userId found in localStorage yet.");
          return;
        }

        console.log(`Firing poll request for ID: ${userId}...`);
        const data = await apiRequest('/poll', 'post', { userId: userId });
        console.log('Background poll data received:', data);

      } catch (error) {
        console.error('Polling network/runtime error:', error);
      }
    };

    runPoll();

    const pollInterval = setInterval(runPoll, 5000);

    return () => {
      console.log("BackgroundPoller cleaned up.");
      clearInterval(pollInterval);
    };
  }, []);

  return null;
}
