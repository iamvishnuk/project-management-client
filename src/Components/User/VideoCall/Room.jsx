import React, { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import peer from "../../../webrtc/peer";

export const Room = () => {
    let { socket } = useSelector((state) => state.socket);
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const handleUserJoined = useCallback(({ id }) => {
        console.log("another user join", id);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        // for calling the user
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            console.log("incomming call from", from, offer);
            const answer = await peer.getAnswer(offer);
            socket.emit("call:accepted", { to: from, answer });
        },
        [socket]
    );

    const sendStream = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);
    // for answering the call
    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peer.setLocalDescription(ans);
            console.log("call accepted");
            sendStream();
        },
        [sendStream]
    );

    const handleNegotiationneeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:negotiationneeded", {
            offer,
            to: remoteSocketId,
        });
    }, [remoteSocketId,socket]);

    useEffect(() => {
        peer.peer.addEventListener(
            "negotiationneeded",
            handleNegotiationneeded
        );
        return () => {
            peer.peer.removeEventListener(
                "negotiationneeded",
                handleNegotiationneeded
            );
        };
    }, [handleNegotiationneeded]);

    const handleIncommingNegotiation = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
    }, [socket]);

    const handleNegotiationFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("got TRacks");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:negotiationneeded", handleIncommingNegotiation);
        socket.on("peer:nego:final", handleNegotiationFinal);
        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incomming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:negotiationneeded", handleIncommingNegotiation);
            socket.off("peer:nego:final", handleNegotiationFinal);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleIncommingNegotiation,
        handleNegotiationFinal,
    ]);

    return (
        <div>
            <h1>Room</h1>
            <h1>{remoteSocketId ? "connect" : "no one in room"}</h1>
            {myStream && <button onClick={sendStream}>Send Stream</button>}
            <button onClick={handleCallUser}>call</button>
            {myStream && (
                <>
                    <h1>my Stream</h1>
                    <ReactPlayer
                        playing
                        muted
                        width="300px"
                        height="200px"
                        url={myStream}
                    />
                </>
            )}
            {remoteStream && (
                <>
                    <h1>Remote Stream</h1>
                    <ReactPlayer
                        playing
                        muted
                        width="300px"
                        height="200px"
                        url={myStream}
                    />
                </>
            )}
        </div>
    );
};
