'use client'
import React, { useRef, useState } from 'react';
import {saveVideoIdToDatabase, uploadVideo} from "@/app/(admin)/barangayAdmin/page/game/actions";
import AppToolkit from "@/lib/app-toolkit";

const LiveVideo: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [recording, setRecording] = useState<boolean>(false);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

    const startRecording = async () => {
        if (!navigator.mediaDevices || !videoRef.current) return;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setRecording(true);
    };

    const stopRecording = async () => {
        if (!videoRef.current || !videoRef.current.srcObject) return;

        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setRecording(false);

        // Simulate saving a Blob (implement your recording logic here)
        const mockBlob = new Blob(['video content'], { type: 'video/mp4' });
        setVideoBlob(mockBlob);

        if (mockBlob) {
            try {
                const data = await uploadVideo(mockBlob);
                await saveVideoIdToDatabase(data.path);
            } catch (error) {
                console.error(AppToolkit.getErrorMessage(error));
            }
        }
    };

    return (
        <div>
            <video ref={videoRef} controls={false} />
            <button onClick={startRecording} disabled={recording}>
                Start
            </button>
            <button onClick={stopRecording} disabled={!recording}>
                Stop
            </button>
        </div>
    );
};

export default LiveVideo;