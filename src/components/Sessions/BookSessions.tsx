import { FormEvent, useEffect, useRef } from 'react';
import {
  useSessionsContext,
  type SessionType,
} from '../../store/sessions-context';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal, { ModalHandle } from '../UI/Modal';

type BookSessionsProps = {
  session: SessionType;
  onDone: () => void;
};

export default function BookSessions({ session, onDone }: BookSessionsProps) {
  const state = useSessionsContext();
  const modal = useRef<ModalHandle>(null);
  useEffect(() => {
    if (!modal.current) {
      return;
    }
    modal.current.open();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    state.bookSession(session);
    onDone();
  }

  return (
    <Modal ref={modal} onClose={onDone}>
      <h2>Book sessions</h2>
      <form onSubmit={handleSubmit} className="control">
        <Input label="Your name" id="name" name="name" type="text" />
        <Input label="Your email" id="email" name="email" type="email" />
        <p className="actions">
          <Button textOnly onClick={onDone}>
            Cancel
          </Button>
          <Button>Book session</Button>
        </p>
      </form>
    </Modal>
  );
}
