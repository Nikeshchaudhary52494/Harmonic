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
}

export const MyUserContextProvider = (props: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        const { user, success } = await getUser();
        if (success) {
            setUser(user!);
        } else {
            setUser(null);
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