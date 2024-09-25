import { useId } from "react";
const TextField = ({ label, description }) => {
    const inputId = useId();
    const descriptionId = useId();
    return (
        <>
            <label htmlFor={inputId}>{label}</label>
            <input
                id={inputId}
                placeholder={`Enter ${label}`}
                aria-describedby={descriptionId}
            />
            <p id={descriptionId}>
                {description}
            </p>
        </>
    );
};

const TestUseId = () => {
    const formId = useId();
    return (
        <>
            <form id={formId}>
                <TextField label='First name' description='First name should have at least 2 symbols' />
                <TextField label='Second name' description='First name should have at least 2 symbols' />
                <TextField label='Age' description='First name should have at least 2 symbols' />
            </form>
            <button type="submit" form={formId}>Send</button>
        </>

    );
};

export {TestUseId};