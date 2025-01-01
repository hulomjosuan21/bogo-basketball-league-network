'use server'

import {createClient} from "@/utils/supabase/server";

export const uploadVideo = async (videoBlob: Blob) => {
    const supabase = await createClient()

    const { data, error } = await supabase.storage
        .from('videos')
        .upload(`video-${Date.now()}.mp4`, videoBlob);

    if (error) {
        throw new Error(`Error uploading video: ${error.message}`);
    }

    return data;
};

export const saveVideoIdToDatabase = async (videoId: string) => {
    const supabase = await createClient()

    const { error } = await supabase
        .from('Match')
        .insert({ videoId });

    if (error) {
        throw new Error(`Error saving video ID to database: ${error.message}`);
    }
};