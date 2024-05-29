import { useState, useMemo, memo } from "react";

const values = [12,12,13,14,13,14,15,16,15];

const multiply = (value) => {
    console.log('calculating new value');
    return Math.pow(value, 5);
}

export default function UseMemoApp() {
    const [value, setValue] = useState(values[0]);

    return (
        <div>
            <select onChange={(e) => setValue(e.target.value)}>
                {
                    values.map((value, index) => (
                        <option key={index}>{value}</option>
                    ))
                }
            </select>
            <ShowResult initialValue={value} />
        </div>
    );
}

const Test = memo(function Test({obj}){
    console.log('New rendering of Test')
    return <div>{obj.name} {obj.surname} {obj.result}</div>
});

function ShowResult({initialValue}) {
    const result = useMemo(() => multiply(initialValue), [initialValue]);
    const user = useMemo(() => {
        return {
            name: 'Alexei',
            surname: 'Vinnichek',
            result: result
        }
    }, [result]);
    return (
        <>
            <div>Result of function: {result}</div>
            <Test obj={user} />
        </>
    )
}

