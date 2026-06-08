'use client';

import { useEffect } from 'react';

export default function InitLoader() {
  useEffect(() => {
    // This code runs only once when the component mounts in the browser
    console.log("Application initialized.");
    
    // Perform your initialization logic here
    // (e.g., API calls, setting up event listeners, SDK configuration)
    
  }, []); // The empty array ensures this only runs on mount

  // This component doesn't render anything visible
  return null;
}
