import { useEffect, useRef } from "react";

const SyntheticEventComponent = () => {
    const ref = useRef();

    const handleClick = (e) => {
        console.log(`Synthetic event: `, e);
    };

    useEffect(() => {
        const {current: element} = ref;
        if(!element) return;
        const handler = (e) => {
            console.log(`Native event: `, e);
        };

        element.addEventListener('click', handler);

        return () => {
            element.removeEventListener('click', handler);
        }
    }, []);

    return (
        <button ref={ref} onClick={handleClick}>Click</button>
    );
};

export { SyntheticEventComponent };