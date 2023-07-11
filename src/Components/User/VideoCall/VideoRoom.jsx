import { useEffect, useRef, useState } from "react";
import { Actions } from "../VideoCallComponents/Actions/Actions";
import { useNavigate, useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
import io from "socket.io-client";

export default function VideoRoom() {
    const [micActive, setMicActive] = useState(true);
    const [cameraActive, setCameraActive] = useState(true);
    const param = useParams();
    const navigate = useNavigate();
    const userVideoRef = useRef();
    const peerVideoRef = useRef();
    const rtcConnectionRef = useRef(null);
    const socketRef = useRef();
    const userStreamRef = useRef();
    const hostRef = useRef(false);

    // joined room id
    const roomName = param.roomId;

    useEffect(() => {
        socketRef.current = io(baseURL);
        // Firet we joint a room
        socketRef.current.emit("join", roomName);

        socketRef.current.on("created", handleRoomeCreated);

        socketRef.current.on("joined", handleRoomJoined);
        //if the room didn't exist, the server would emit the room was 'created'

        // Whenever the next person joined, the server emite 'ready'
        socketRef.current.on("ready", initiateCall);

        // Emitted when a peer leaves the room
        socketRef.current.on("leave", onPeerLeave);

        // IF the room is full, we show an alert
        socketRef.current.on("full", () => {
            navigate("/create-meeting");
        });

        // Events that are webRTC specific
        socketRef.current.on("offer", handleRececivedOffer);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on("ice-candidate", handleNewIceCandidateMsg);

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomName]);

    const handleRoomeCreated = () => {
        hostRef.current = true;
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: { width: 300, height: 200 },
            })
            .then((stream) => {
                // use the stream
                userStreamRef.current = stream;
                userVideoRef.current.srcObject = stream;
                userVideoRef.current.onloadmetadata = () => {
                    userVideoRef.current.play();
                };
            })
            .catch((error) => console.log(error));
    };

    const handleRoomJoined = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: { width: 300, height: 200 } })
            .then((stream) => {
                // use the stream
                userStreamRef.current = stream;
                userVideoRef.current.srcObject = stream;
                userVideoRef.current.onloadmetadata = () => {
                    userVideoRef.current.play();
                };
                socketRef.current.emit("ready", roomName);
            })
            .catch((error) => console.log(error));
    };

    const initiateCall = () => {
        if (hostRef.current) {
            rtcConnectionRef.current = createPeerConnection();
            rtcConnectionRef.current.addTrack(
                userStreamRef.current.getTracks()[0],
                userStreamRef.current
            );
            rtcConnectionRef.current.addTrack(
                userStreamRef.current.getTracks()[1],
                userStreamRef.current
            );
            rtcConnectionRef.current
                .createOffer()
                .then((offer) => {
                    rtcConnectionRef.current.setLocalDescription(offer);
                    socketRef.current.emit("offer", offer, roomName);
                })
                .catch((error) => console.log(error));
        }
    };

    const ICE_SERVERS = {
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478",
                ],
            },
        ],
    };

    const createPeerConnection = () => {
        // we create a RTC Peer Connection
        const connection = new RTCPeerConnection(ICE_SERVERS);

        // we implement our onicecandiate method for when we reaceved a ICE candidate from the STUN server
        connection.onicecandidate = handleICECandidateEvent;

        // We implement our onTrack method for when we receive tracks
        connection.ontrack = handleTrackEvent;
        return connection;
    };

    const handleRececivedOffer = (offer) => {
        if (!hostRef.current) {
            rtcConnectionRef.current = createPeerConnection();
            rtcConnectionRef.current.addTrack(
                userStreamRef.current.getTracks()[0],
                userStreamRef.current
            );
            rtcConnectionRef.current.addTrack(
                userStreamRef.current.getTracks()[1],
                userStreamRef.current
            );
            rtcConnectionRef.current.setRemoteDescription(offer);

            rtcConnectionRef.current
                .createAnswer()
                .then((answer) => {
                    rtcConnectionRef.current.setLocalDescription(answer);
                    socketRef.current.emit("answer", answer, roomName);
                })
                .catch((error) => console.log(error));
        }
    };

    const handleAnswer = (answer) => {
        rtcConnectionRef.current
            .setRemoteDescription(answer)
            .catch((error) => console.log(error));
    };

    const handleICECandidateEvent = (event) => {
        if (event.candidate) {
            socketRef.current.emit("ice-candidate", event.candidate, roomName);
        }
    };

    const handleNewIceCandidateMsg = (incomming) => {
        // we cast the incomming canidate to RTCIceCandidate
        const candidate = new RTCIceCandidate(incomming);
        rtcConnectionRef.current
            .addIceCandidate(candidate)
            .catch((error) => console.log(error));
    };

    const handleTrackEvent = (event) => {
        peerVideoRef.current.srcObject = event.streams[0];
    };

    const leaveRoom = () => {
        socketRef.current.emit("leave", roomName); // Let's the server know that user has left the room
        if (userVideoRef.current.srcObject) {
            userVideoRef.current.srcObject
                .getTracks()
                .forEach((track) => track.stop()); // stop receiving all track of user);
        }
        if (peerVideoRef.current.srcObject) {
            peerVideoRef.current.srcObject
                .getTracks()
                .forEach((track) => track.stop());
        }

        // Checks if there is peer on the other side and safely closes the existing connection established with the peer
        if (rtcConnectionRef.current) {
            rtcConnectionRef.current.ontrack = null;
            rtcConnectionRef.current.onicecandidate = null;
            rtcConnectionRef.current.close();
            rtcConnectionRef.current = null;
        }
        navigate("/create-meeting");
    };

    const onPeerLeave = () => {
        // This person is now the creator becasue they are the olny one in the room
        hostRef.current = true;
        if (peerVideoRef.current.srcObject) {
            peerVideoRef.current.srcObject
                .getTracks()
                .forEach((track) => track.stop()); // stop receiving all track of peer
        }
        // Safely closes the existing connection establshed with the peer who left
        if (rtcConnectionRef.current) {
            rtcConnectionRef.current.ontrack = null;
            rtcConnectionRef.current.onicecandidate = null;
            rtcConnectionRef.current.close();
            rtcConnectionRef.current = null;
        }
    };

    const toggleMediaStream = (type, state) => {
        userStreamRef.current.getTracks().forEach((track) => {
            if (track.kind === type) {
                track.enabled = !state;
            }
        });
    };

    const toggleMic = () => {
        toggleMediaStream("audio", micActive);
        setMicActive((prev) => !prev);
    };

    const toggleCamera = () => {
        toggleMediaStream("video", cameraActive);
        setCameraActive((prev) => !prev);
    };

    return (
        <div className="h-full w-full relative">
            <div className="absolute right-5 top-5 z-10">
                <video
                    className="rounded-md border-2 border-white shadow-lg"
                    autoPlay
                    ref={userVideoRef}
                    muted
                />
            </div>
            <div className="h-full">
                <video
                    className="h-full w-full"
                    autoPlay
                    ref={peerVideoRef}
                    width={2000}
                />
            </div>
            <div>
                <Actions
                    leave={leaveRoom}
                    toggleMic={toggleMic}
                    toggleCamera={toggleCamera}
                    micActive={micActive}
                    cameraActive={cameraActive}
                />
            </div>
        </div>
    );
}
