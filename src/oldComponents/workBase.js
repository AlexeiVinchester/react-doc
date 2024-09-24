import { useState } from "react"

export default function TestBase(){
    const [counter, setCounter] = useState({counter: 0});
    console.log('New render');
    return (
        <>
            <button onClick={() => {
                setCounter({
                    ...counter,
                    counter: counter.counter + 1
                });
            }}>+1</button>
            Counter: {counter.counter}
        </>
    );
}