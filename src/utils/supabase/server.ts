'use server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import AppToolkit from "@/lib/app-toolkit";
import UserDataType from "@/types/userDataType";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if(!supabaseUrl && !supabaseAnonKey){
    throw new Error('Supabase missing env variables!')
}

export async function getUser(){
    const cookieStore = await cookies()

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )

    const {
        error: userError,
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { user, userData: null, errorMessage: AppToolkit.getErrorMessage(userError)};
    }

    const { error: userDataError, data } = await supabase
        .from("usersData")
        .select()
        .eq('userId', user?.id)
        .single();

    if (!data) {
        return { user, userData: null, errorMessage: AppToolkit.getErrorMessage(userDataError)};
    }

    const userData: UserDataType = {
        ...data
    }

    return { user, userData, isSignedIn: !!user, errorMessage: null };
}

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )
}

type UploadProps = {
    file: File;
    bucket: string;
    folder?: string;
};

export async function getStorage() {
    const { storage } = await createClient();
    return storage;
}

export const uploadImage = async ({ file, bucket, folder }: UploadProps) => {
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    const path = `${folder ? folder + "/" : ""}${AppToolkit.generateUid()}.${fileExtension}`;

    const storage = await getStorage();

    const { data, error } = await storage.from(bucket).upload(path, file);

    if (error) {
        return { imageUrl: null, errorMessage: "Image upload failed" };
    }

    const imageUrl = `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
        data?.path
    }`;

    return { imageUrl, errorMessage: null };
};

export const deleteImage = async (imageUrl: string) => {
    const bucketAndPathString = imageUrl.split("/storage/v1/object/public/")[1];
    const firstSlashIndex = bucketAndPathString.indexOf("/");

    const bucket = bucketAndPathString.slice(0, firstSlashIndex);
    const path = bucketAndPathString.slice(firstSlashIndex + 1);

    const storage = await getStorage();

    const { data, error } = await storage.from(bucket).remove([path]);

    return { data, error };
};

export async function getAllImageUrls(bucketName: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from(bucketName).list();

    if (error) {
        console.error('Error listing files:', error);
        return [];
    }

    return  data.map(file => {
        return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${file.name}`;
    });
}