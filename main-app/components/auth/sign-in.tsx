"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShieldQuestion } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SignInUserInput, signInUserSchema } from "@/lib/validationSchemas";
import { signInUser } from "@/actions/user/signInUser";
import useAuthModel from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

export default function SignIn() {
    const form = useForm({
        resolver: zodResolver(signInUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isPending, startTransition] = useTransition();
    const { onClose } = useAuthModel();
    const { refreshUser } = useUser();

    const onSubmit = (data: SignInUserInput) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            const result = await signInUser(formData);

            if (result.success) {
                refreshUser();
                toast({
                    description: "User signed in successfully",
                });
                onClose();
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    const handleGuestLogin = () => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", "guest@gmail.com");
            formData.append("password", "guestPassword123");

            const result = await signInUser(formData);

            if (result.success) {
                refreshUser();
                toast({
                    description: "Guest user signed in successfully",
                });
                onClose();
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    return (
        <div className="w-full space-y-4">
            <div
                className="flex w-full gap-2 p-4 font-bold text-white duration-200 bg-[#3E3E3E] rounded-lg cursor-pointer"
                onClick={handleGuestLogin}
            >
                <ShieldQuestion />
                <p>Guest Mode</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example@mail.com"
                                        type="email"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="••••••••"
                                        type="password"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="bg-[#34b27b] p-6 w-full font-bold"
                        type="submit"
                        disabled={isPending}>
                        {isPending ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}