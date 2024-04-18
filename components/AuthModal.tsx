"use client "

import {
    useSessionContext,
    useSupabaseClient
} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';

import useAuthModel from '@/hooks/useAuthModal';

import Modal from './Modal'

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { isOpen, onClose } = useAuthModel();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, onClose, router])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title='Welcome back'
            description='continue to your account'
        >
            <Auth
                theme='dark'
                magicLink
                providers={["github", 'google']}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa
                }}
                additionalData={{
                }}
                localization={{
                    variables: {
                        sign_in: {
                            email_input_placeholder: "test@gmail.com",
                            password_input_placeholder: "123456789",
                            email_label: "Email:test@gmail.com",
                            password_label: "Password:123456789"
                        },
                    },
                }}
            />
        </Modal>
    )
}

export default AuthModal
