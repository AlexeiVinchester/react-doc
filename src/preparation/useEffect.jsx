import { useEffect, useState } from "react";

const createConnection = (roomId, url) => {
    return {
        connect() {
            console.log(`Create connection to url ${url}, chat: ${roomId}`);
        },
        disconnect() {
            console.log(`Disconnet from: ${roomId}`);
        }
    }
}

const ChatRoom = ({ roomId }) => {
    console.log("new render")
    useEffect(() => {
        const connection = createConnection(roomId, 'https://localhost:3001')
        connection.connect();
        return () => {
            connection.disconnect()
        }
    }, [roomId]);
    return (
        <h1>Welcome to {roomId} room</h1>
    );
};

const ChatContainer = () => {
    const [show, setShow] = useState(false);
    const [room, setRoom] = useState('general');
    return (
        <label>
            <select onChange={(e) => setRoom(e.target.value)}>
                <option value="general">General</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
            </select>
            <button onClick={() => setShow(!show)}>
                {
                    show ? 'close' : 'open'
                }
            </button>
            {show && <br />}
            {show && <ChatRoom roomId={room} />}
        </label>
    );
};

const Child = () => {
    useEffect(() => {
        console.log('Child effect');
        return () => {
            console.log('Child cleanUp func');
        }
    })
    return <p>Hello, I am child</p>
}

const Parent = () => {
    useEffect(() => {
        console.log('Parent effect');
        return () => {
            console.log('Parent cleanUp func')
        }
    })

    return (
        <>
            <p>Hello, I am Parent</p>
            <Child />
        </>

    );

}

const GrandParent = () => {
    useEffect(() => {
        console.log('GrandParent effect');
        return () => {
            console.log('GrandParent cleanup func')
        }
    })
    return (
        <>
            <p>Hello, I am GrandParent</p>
            <Parent />
        </>

    )
}

const TestUseEffect = () => {
    const [isShow, setIsShow] = useState(false);
    const handleClick = () => {
        setIsShow(!isShow);
    }
    return (
        <>
            <button onClick={handleClick}>
                {isShow ? 'Close' : 'Open'}
            </button>
            {isShow && <GrandParent />}
        </>
    );
}




export { ChatContainer, TestUseEffect };