'use client'
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Page(){
    const videoRef = useRef<HTMLVideoElement>(null);
    const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
    const [videoId, setVideoId] = useState("test");

    useEffect(() => {
        socket.on("signal", async (data) => {
            const { from, signal } = data;

            if (signal.type === "offer") {
                const pc = createPeerConnection(from);
                await pc.setRemoteDescription(new RTCSessionDescription(signal));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                socket.emit("signal", { to: from, signal: answer });
            }
        });
    }, []);

    const createPeerConnection = (id: string): RTCPeerConnection => {
        const pc = new RTCPeerConnection();
        setPeerConnections((prev) => new Map(prev).set(id, pc));

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("signal", { to: id, signal: event.candidate });
            }
        };

        pc.ontrack = (event) => {
            if (videoRef.current) {
                videoRef.current.srcObject = event.streams[0];
            }
        };

        return pc;
    };


    const startStream = async () => {
        if (!videoId) {
            alert("Please enter a Video ID");
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;

        // Notify the server about the new stream
        socket.emit("start-stream", { videoId });

        stream.getTracks().forEach((track) => {
            const pc = new RTCPeerConnection();
            pc.addTrack(track, stream);
        });

        console.log(`Stream started with Video ID: ${videoId}`);
    };

    return (
        <div>
            <h1>Admin Live Stream</h1>
            <video ref={videoRef} autoPlay playsInline />
            <button onClick={startStream}>Start Stream</button>
        </div>
    );
}