import { useState } from "react";

const values = [11, 12, 13, 14, 13, 12, 11];

const calculator = (value) => {
    return {
        result: Math.pow(value, 6)
    }
};

let ResultValue = ({initialValue}) => {
    console.log('new render of resultValue')
    const result = calculator(initialValue);
    return <div>Result: {result.result}</div>
}



const UseMemoApp = () => {
    const [value, setValue] = useState(values[0]);

    return (
        <div>
            <select onChange={(e) => setValue(e.target.value)}>
                {
                    values.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))
                }
            </select>
            <ResultValue initialValue={value} />
        </div>
    );
}

export { UseMemoApp };

