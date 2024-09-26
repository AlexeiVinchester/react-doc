
import React, { useState, useEffect, useLayoutEffect } from "react";

function sleep(duration) {
    const start = Date.now();
    let end = start;
    while (end < start + duration) {
        end = Date.now();
    }
}

const Component = () => {
    const [value, setValue] = useState(0);

    useLayoutEffect(() => {
        sleep(2000)
        if (value === 0) {
            setValue(Math.random() * 99 + 99);
        }


    }, [value]);

    console.log("render", value);
    return <div onClick={() => setValue(0)}>value: {value}</div>;
};

export { Component }