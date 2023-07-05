import { useEffect, useRef } from "react";
import io from "socket.io-client";
const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const useSocketConnection = () => {
    const socketRef = useRef(null);
    useEffect(() => {
        // Creating a socket connection
        socketRef.current = io(baseURL);
        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);
    return socketRef.current;
};

export default useSocketConnection;
