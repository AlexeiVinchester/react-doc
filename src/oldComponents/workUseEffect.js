import { useRef, useEffect, useState } from "react";


export function VideoPlayerApp(){
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {
                    isPlaying ? 'Stop' : 'Play'
                }
            </button>
            <VideoPlayer 
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                isPlaying={isPlaying}
            />
        </>
    );
}

function VideoPlayer({isPlaying, src}) {
    const ref = useRef(null);
    useEffect(() => {
        if(isPlaying){
            ref.current.play();
        } else {
            ref.current.pause();
        }
    })
    
    return <video src={src} ref={ref} loop playsInline />
}

const serverUrl = 'https://localhost:3000';

function createConnection(serverUrl, roomId) {
    return {
        connect() {
            console.log(`✅ Connecting to ${roomId} at server ${serverUrl}`)
        },
        disconnect() {
            console.log(`❌ Disconnecting from ${roomId} at server ${serverUrl}`)
        }
    }
}

export function ChatApp(){
    const [isShow, setIsShow] = useState(false);
    const [roomId, setRoomId] = useState('general');

    return (
        <>
            At first, you should choose roomId: {''}
            <select onChange={(e) => setRoomId(e.target.value)}>
                <option>general</option>
                <option>public</option>
                <option>private</option>
            </select>
            <button onClick={() => setIsShow(!isShow)}>
                {isShow ? 'Close Chat' : 'Open Chat'}
            </button>
            {isShow && <hr></hr>}
            {isShow && <ChatRoom roomId={roomId} />}
        </>
    )
}

function ChatRoom({roomId}) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => {
            connection.disconnect()
        }
    }, [roomId]);
    return (
        <h1>Welcome to {roomId} room!</h1>
    );
}