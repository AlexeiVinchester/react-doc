import { forwardRef, useEffect, useRef, useState } from "react";

const useRefCustom = (initialValue) => {
    const [ref] = useState({ current: initialValue });
    return ref;
};

const TimerContainer = () => {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const timerIdRef = useRefCustom(0);

    const handleStart = () => {
        setStartTime(Date.now());
        setNow(Date.now());
        clearTimeout(timerIdRef.current);

        timerIdRef.current = setTimeout(function tick() {
            setNow(Date.now());
            timerIdRef.current = setTimeout(tick, 100);
        }, 100)
    }

    const handleStop = () => {
        clearTimeout(timerIdRef.current);
    }

    let passedSeconds = 0;
    if (startTime !== null && now !== null) {
        passedSeconds = (now - startTime) / 1000;
    }

    return (
        <>
            <p>Passed time: {passedSeconds.toFixed(2)}</p>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </>
    );
};

const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref}></input>
});


const InputContainer = () => {
    const ref = useRef(null);
    const handleClick = () => {
        ref.current.focus();
    }
    return (
        <>
            <MyInput ref={ref} placeholder="focus on me" />
            <button onClick={handleClick}>Focus input</button>
        </>
    );
}

const VideoPlayer = ({ isPlaying, src }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    });

    return <video ref={ref} src={src} loop playsInline></video>
}

const VideoContainer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }
    return (
        <>
            <button onClick={handleClick}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <VideoPlayer 
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" 
                isPlaying={isPlaying} 
            />
        </>
    );
}

export { TimerContainer, InputContainer, VideoContainer };


