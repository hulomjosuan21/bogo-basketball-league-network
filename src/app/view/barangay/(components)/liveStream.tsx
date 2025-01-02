'use client'
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Viewer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoId, setVideoId] = useState("test");
    const [streamAvailable, setStreamAvailable] = useState(false);

    useEffect(() => {
        console.log("Component mounted");
        socket.on("stream-available", ({ adminSocketId }) => {
            console.log("Stream available");
            setStreamAvailable(true);
            startViewing(adminSocketId);
        });

        socket.on("stream-unavailable", ({ message }) => {
            console.log("Stream unavailable");
            alert(message);
        });

        return () => {
            socket.off("stream-available");
            socket.off("stream-unavailable");
        };
    }, []);

    const joinStream = () => {
        console.log("Join stream clicked");
        if (!videoId) {
            alert("Please enter a Video ID");
            return;
        }

        socket.emit("join-stream", { videoId });
    };

    const startViewing = (adminSocketId: string) => {
        console.log("Starting viewing");
        const pc = new RTCPeerConnection();

        pc.ontrack = (event) => {
            if (videoRef.current) {
                videoRef.current.srcObject = event.streams[0];
            }
        };

        socket.on("signal", async (data) => {
            const { signal } = data;
            if (signal.type === "offer") {
                await pc.setRemoteDescription(new RTCSessionDescription(signal));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket.emit("signal", { to: adminSocketId, signal: pc.localDescription });
            } else if (signal.candidate) {
                await pc.addIceCandidate(signal);
            }
        });
    };

    return (
        <div className={'w-full'}>
            <h1>Viewer Live Stream</h1>

            <button onClick={joinStream}>Join Stream</button>
            <video ref={videoRef} autoPlay playsInline className={'aspect-video'} />
        </div>
    );
}