import {forwardRef, type ReactNode, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";

// This type is used with `forwardRef` to ensure that the `Modal` component can be used with `useImperativeHandle` to expose a `open` method
export type ModalHandle = {
    open: () => void;
};

type ModalProps = {
    children: ReactNode;
    onClose: () => void; // The onClose function prop is used to propagate the default "close" event that can be triggered by <dialog> (for example, when the ESC key is pressed)
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({children, onClose}, ref,) {
    const dialog = useRef<HTMLDialogElement>(null);

    // useImperativeHandle is used to expose the `open` method to other components
    useImperativeHandle(ref, () => {
        return {
            open: () => {
                if (dialog.current) {
                    dialog.current.showModal(); // showModal() is a built-in method available on the <dialog> element
                }
            }
        }
    })
    return createPortal(
        <dialog ref={dialog} onClose={onClose}>{children}</dialog>,
        document.getElementById('modal-root')!
    );
})

export default Modal;

// A custom Modal component that exposes an open() method which,
// inside the Modal component, then triggers the built -in showModal() method
// on the built -in <dialog> element - in addition, the <dialog> element
// should be "teleported" into the <div id="modal-root"> element

// The custom Modal component should then be used for the "Book a Session" and
// "Upcoming Sessions" components - these components should trigger
// Modal's exposed open() method whenever they are added to the DOM
// (i.e., the "Book a Session" and "Upcoming Sessions" components
// should be rendered conditionally by other components)
