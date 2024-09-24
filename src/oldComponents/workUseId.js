import { useId } from "react";

export default function TestUseId() {
    const formId = useId();
    return (
        <>
            <form id={formId}>
                <TextLabel label="FirstName" description="FirstName shoul contain your at least 2 letters"/>
                <TextLabel label="LastName" description="LastName shoul contain your at least 5 letters" />
                <TextLabel label="Number" description="Number shoul contain your at least 12 numbers" />
            </form>
            <button type="submit" form={formId}>Send data</button>
        </>
    );
}

function TextLabel({label, description}) {
    const inputId = useId();
    const hintId = useId();

    return (
        <>
            <label htmlFor={inputId}>{label}</label>
            <input name={label} id={inputId} placeholder={`Enter ${label}`} aria-describedby={hintId}/>
            <p id={hintId}>{description}</p>
        </>
    );
}

