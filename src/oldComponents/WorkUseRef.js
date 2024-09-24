import { useState, useRef, forwardRef } from "react";

export function Timer(){
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const timerRef = useRef(null);

    function handleStart() {
        setStartTime(Date.now());
        setNow(Date.now());
        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => setNow(Date.now()), 1000);
    }

    function handleFinish() {
        clearInterval(timerRef.current);
    }
    let secondPassed = 0;
    if(startTime !== null && now !== null){
        secondPassed = (now - startTime)/1000;
    }

    return (
        <>
            Seconds passsed: {secondPassed.toFixed(3)}
            <button onClick={handleStart}>Start</button>
            <button onClick={handleFinish}>Finish</button>
        </>
    );

}


export function Test(){
    const ref = useRef(null);

    function handleClick() {
        ref.current.focus();
    }

    return (
        <>  
            <MyInput placeholder="Focus on me< please" ref={ref}/>
            <button onClick={handleClick}>Focus input</button>
        </>
        
        
        );
}

const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />
})