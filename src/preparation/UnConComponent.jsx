import { useRef, useState } from "react"

// using of uncontrolled component input


const UncontrolledInput = () => {
    console.log('new render')
    const ref = useRef(null);
    const handleClick = (e) => {
        console.log(ref.current.value)
        e.preventDefault();
    }
    return (
        <form>
            <input ref={ref} placeholder="enter value" />
            <button onClick={handleClick} >Show</button>
        </form>
    );
}

const ControlledInput = () => {
    console.log('new render')
    const [value, setValue] = useState('');
    const handleChange = (e) => setValue(e.target.value);
    const handleClick = (e) => {
        console.log(value)
        e.preventDefault();
    }
    return (
        <form>
            <input value={value} onChange={handleChange} placeholder="enter value" />
            <button onClick={handleClick} >Show</button>
        </form>
    );
} 

export { UncontrolledInput, ControlledInput }