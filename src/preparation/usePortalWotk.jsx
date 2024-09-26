import usePortal from "react-useportal";

const ModalWindow = () => {
    const { openPortal, closePortal, isOpen, Portal } = usePortal();

    return (
        <>
            <button onClick={openPortal}>Open window</button>
            {
                isOpen && (
                    <Portal>
                        <p>
                            This Portal handles its own state.{' '}
                            <button onClick={closePortal}>Close me!</button>, hit ESC or
                            click outside of me.
                        </p>
                    </Portal>
                )
            }
        </>
    );
}

export { ModalWindow }