import React, { useState, useEffect } from 'react';

export default function PollData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const userId = localStorage.getItem('userId');
      
      if (userId) {
        try {
          const result = await apiRequest('/poll', 'post', { id: userId });
          setData(result);
        } catch (error) {
          console.error("Polling failed:", error);
        }
      }
    }, 5000); 

    return () => clearInterval(pollInterval); 
  }, []);

  return null; 
}
