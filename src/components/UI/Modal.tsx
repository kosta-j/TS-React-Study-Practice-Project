import { ComponentPropsWithoutRef } from 'react';

type ModalPropsType = ComponentPropsWithoutRef<'dialog'>;

export default function Modal(props: ModalPropsType) {
  return <dialog {...props}></dialog>;
}

// A custom Modal component that exposes an open() method which,
// inside the Modal component, then triggers the built -in showModal() method
// on the built -in <dialog> element - in addition, the <dialog> element
// should be "teleported" into the <div id="modal-root"> element

// The custom Modal component should then be used for the "Book a Session" and
// "Upcoming Sessions" components - these components should trigger
// Modal's exposed open() method whenever they are added to the DOM
// (i.e., the "Book a Session" and "Upcoming Sessions" components
// should be rendered conditionally by other components)
