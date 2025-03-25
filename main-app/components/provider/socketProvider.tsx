"use client";

import { useSocketEvents } from '@/hooks/useSocketEvents';
import { useUser } from '@/hooks/useUser';
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
    isConnected: boolean;
    messages: Messages[];
    setMessages: (messages: Messages[]) => void;
    currentRoom: string | null;
    setCurrentRoom: Dispatch<SetStateAction<string | null>>;
}

export interface Messages {
    userId: string;
    username: string;
    message: string;
    timestamp: Date;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<Messages[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);


    const { user } = useUser();

    useEffect(() => {
        if (user) {
            const socketInstance = io(
                process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000',
                {
                    path: "/socket.io",
                    query: {
                        userId: user.id,
                    },
                    transports: ['websocket'],
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 1000,
                    autoConnect: true,
                }
            );

            setSocket(socketInstance);

            socketInstance.on("connect", () => {
                setIsConnected(true);
            });

            socketInstance.on("disconnect", () => {
                setIsConnected(false);
            });

            return () => {
                socketInstance.disconnect();
                setSocket(null);
            };
        }
    }, [user]);

    const value = {
        socket,
        isConnected,
        messages,
        setMessages,
        currentRoom,
        setCurrentRoom,
    };

    useSocketEvents(
        socket,
        isConnected,
        setMessages,
    )

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within a SocketProvider');
    }
    return context;
};