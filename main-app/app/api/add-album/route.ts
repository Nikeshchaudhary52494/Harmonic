import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '@/lib/db';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
    try {
        console.log("Processing request to create a new song");
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const imageFile = formData.get('imageFile') as File | null;
        const artist = formData.get('artist') as string;
        const releaseYear = formData.get('releaseYear') as string;

        if (!imageFile) {
            return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
        }

        const imageUrl = await uploadToCloudinary(imageFile);

        const newSong = await db.album.create({
            data: {
                title,
                imageFile: imageUrl,
                artist,
                releaseYear: parseInt(releaseYear),
            },
        });

        return NextResponse.json({ message: "Album created successfully", newSong });
    } catch (error) {
        console.error("Error creating song:", error);
        return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
    }
}

interface CloudinaryUploadResult {
    secure_url: string,
    [key: string]: any
}

const uploadToCloudinary = async (file: File) => {
    try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve) => {
            cloudinary.uploader.upload_stream(
                { folder: "Harmonic", resource_type: 'auto' },
                (error, uploadResult) => {
                    return resolve(uploadResult as CloudinaryUploadResult);
                }).end(buffer);
        });
        return uploadResult.secure_url;
    } catch (error) {
        console.error("Error in uploadToCloudinary:", error);
        throw new Error("Error uploading to Cloudinary");
    }
}