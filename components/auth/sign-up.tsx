"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterUserInput, registerUserSchema } from "@/lib/validationSchemas";
import { toast } from "@/hooks/use-toast";
import { registerUser } from "@/actions/user/registerUser";
import useAuthModel from "@/hooks/useAuthModal";

export default function SignUp() {

    const form = useForm({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const [isPending, startTransition] = useTransition();
    const { onClose } = useAuthModel();

    const onSubmit = (data: RegisterUserInput) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);

            const result = await registerUser(formData);

            if (result.success) {
                toast({
                    description: "User registered succesfully",
                })
                onClose();
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                })
            }
        });
    };

    return (
        <div className="w-full space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                <FormDescription>
                                    Your password must be at least 6 characters.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="bg-[#34b27b] p-6 w-full font-bold"
                        type="submit"
                        disabled={isPending}>
                        {isPending ? "Signing up..." : "Sign up"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}