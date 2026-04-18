import { useEffect, useState, useCallback, useRef } from 'react';

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws/worker-status/";

/**
 * Hook to manage real-time WebSocket connection for worker updates
 */
export function useWorkerSocket() {
    const [lastUpdate, setLastUpdate] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    const connect = useCallback(() => {
        const token = localStorage.getItem("session_token");
        if (!token) return;

        const url = `${WS_BASE_URL}?token=${token}`;
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log("WebSocket Connected");
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("WebSocket Update Received:", data);
                setLastUpdate(data);
            } catch (err) {
                console.error("Failed to parse WebSocket message:", err);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket Disconnected");
            setIsConnected(false);
            // Reconnect logic after delay
            setTimeout(connect, 3000);
        };

        socket.onerror = (err) => {
            console.error("WebSocket Error:", err);
            socket.close();
        };

        socketRef.current = socket;
    }, []);

    useEffect(() => {
        connect();
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connect]);

    return { lastUpdate, isConnected };
}
