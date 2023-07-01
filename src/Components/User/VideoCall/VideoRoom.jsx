import { useEffect, useState } from "react";
import { Actions } from "../VideoCallComponents/Actions/Actions";
import { ScreenShareView } from "../VideoCallComponents/ScreenShare/ScreenShareView";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { useCallback } from "react";

export const VideoRoom = () => {
    let { socket } = useSelector((state) => state.socket);
    const [localStream, setLocalStream] = useState();
    let [remoteStream, setRemoteStream] = useState(null);
    const [mute, setMute] = useState(false);
    const [video, setVideo] = useState(false);
    const [screen, setScreen] = useState(null);

    const [remoteSocketId, setRemoteSocketId] = useState(null);

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
        } else {
            const videoTracks = localStream.getVideoTracks();
            setVideo(true);
            videoTracks.forEach((track) => {
                track.enabled = false;
            });
        }
    };

    // for screen share
    const startCapture = () => {
        navigator.mediaDevices
            .getDisplayMedia({ video: true, audio: true })
            .then((stream) => setScreen(stream))
            .catch((err) => console.log(err));
    };

    const handleJoinedUser = useCallback(({ userId }) => {
        console.log("another user joind", userId);
    },[]);

    useEffect(() => {
        socket.on("user:joined", handleJoinedUser);
        return () => {
            socket.off("user:joined", handleJoinedUser);
        }
    }, [socket, handleUserJoined]);

    useEffect(() => {
        const init = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                setLocalStream(stream);
            } catch (error) {
                console.error("Error accessing media devices:", error);
            }
        };

        init();
    }, []);

    return (
        <div className="h-full w-full relative ">
            <div className="absolute right-5 top-5 z-10">
                {localStream && (
                    <ReactPlayer
                        playing
                        muted
                        width="300px"
                        height="200px"
                        url={localStream}
                    />
                )}
            </div>
            <div className="absolute h-full bg-black">
                {remoteStream && (
                    <ReactPlayer
                        playing
                        muted
                        width="100%"
                        height="100%"
                        url={remoteStream}
                    />
                )}
            </div>
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
