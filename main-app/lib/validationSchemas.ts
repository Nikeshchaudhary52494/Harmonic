import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const signInUserSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const createSongSchema = z.object({
    title: z.string().min(1, "Title is required"),
    artist: z.string().min(1, "Artist name is required"),
    duration: z.string().min(1, "Duration must be at least 1 second"),
    albumId: z.string().optional(),
});

export type CreateSongInput = z.infer<typeof createSongSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type SignInUserInput = z.infer<typeof signInUserSchema>;