import { getUser } from '@/actions/user/getUser';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface UserContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export type Props = {
    [propName: string]: any;
}

type User = {
    name: string;
    id: string;
    email: string;
    likedSongs: {
        id: string;
        title: string;
        imageFile: string;
        artist: string
    }[];
}

export const MyUserContextProvider = (props: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        console.log("fetching user again")
        setLoading(true);
        try {
            const { user, success } = await getUser();
            if (success) {
                setUser(user!);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }} {...props} />
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context;
};