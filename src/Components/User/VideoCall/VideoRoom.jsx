import { useEffect, useState } from "react";
import { LocalVideoview } from "../VideoCallComponents/LocalVideoView/LocalVideoview";
import { Actions } from "../VideoCallComponents/Actions/Actions";
import { ScreenShareView } from "../VideoCallComponents/ScreenShare/ScreenShareView";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRef } from "react";

export const VideoRoom = () => {
    let { socket } = useSelector((state) => state.socket);
    const params = useParams();
    const [localStream, setLocalStream] = useState(null);
    const [mute, setMute] = useState(false);
    const [video, setVideo] = useState(false);
    const [screen, setScreen] = useState(null);
    const RTCconnection = useRef()

    const defaultConfigurations = {
        video: true,
        audio: true,
    };

    // for muting and unmuting the audio stream
    const muteAndUnmute = () => {
        if (mute) {
            const audioTracks = localStream.getAudioTracks();
            setMute(false);
            audioTracks.forEach((track) => {
                track.enabled = true;
            });
        } else {
            const audioTracks = localStream.getAudioTracks();
            setMute(true);
            audioTracks.forEach((track) => {
                track.enabled = false;
            });
        }
    };

    // for camera on and off
    const videoOnOff = () => {
        if (video) {
            const videoTracks = localStream.getVideoTracks();
            setVideo(false);
            videoTracks.forEach((track) => {
                track.enabled = true;
            });
            console.log(videoTracks);
        } else {
            const videoTracks = localStream.getVideoTracks();
            setVideo(true);
            videoTracks.forEach((track) => {
                track.enabled = false;
            });
        }
    };

    // make webrtc connection
    const makeWEBRTCConnection = () => {
        RTCconnection.current = new RTCPeerConnection()
        console.log(localStream.getTracks())
        console.log(RTCconnection.current)
    }

    // for screen share
    const startCapture = () => {
        navigator.mediaDevices
            .getDisplayMedia({ video: true, audio: true })
            .then((stream) => setScreen(stream))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        socket.on("new:user:joined",() => {
            console.log("new user joined")
        })
    }, [socket])

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia(defaultConfigurations)
            .then((stream) => setLocalStream(stream));
        socket.emit("join:room", params.roomId);
        makeWEBRTCConnection()
    }, []);

    return (
        <div className="h-full w-full relative">
            <LocalVideoview localStream={localStream} />
            {screen && <ScreenShareView screen={screen} />}
            <Actions
                muteAndUnmute={muteAndUnmute}
                mute={mute}
                videoOnOff={videoOnOff}
                video={video}
                startCapture={startCapture}
            />
        </div>
    );
};
