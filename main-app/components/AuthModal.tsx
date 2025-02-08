"use client "

import useAuthModel from '@/hooks/useAuthModal';

import Modal from './Modal'
import SignIn from './auth/sign-in';
import SignUp from './auth/sign-up';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AudioLines } from 'lucide-react';

const AuthModal = () => {
    const { isOpen, onClose } = useAuthModel();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title=''
            description=''
        >
            <Tabs defaultValue="account" className="max-w-md mx-auto">
                <TabsContent value="login">
                    <h1 className="text-3xl flex items-center gap-2 font-bold">
                        <AudioLines
                            className='text-[#34b27b]'
                            size={30}
                        />
                        Harmonic
                    </h1>
                    <h2 className="text-3xl">Login</h2>
                </TabsContent>
                <TabsContent value="register">
                    <h1 className="text-3xl flex items-center gap-2 font-bold">
                        <AudioLines
                            className='text-[#34b27b]'
                            size={30}
                        />
                        Harmonic
                    </h1>
                    <h2 className="text-3xl">Create your account</h2>
                </TabsContent>
                <TabsList className="grid bg-[#1E1E1E] w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <SignIn />
                </TabsContent>
                <TabsContent value="register">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </Modal>
    )
}

export default AuthModal
