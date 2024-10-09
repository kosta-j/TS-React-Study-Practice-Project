import { useEffect, useRef } from 'react';
import { useSessionsContext } from '../../store/sessions-context';
import Button from '../UI/Button';
import Modal, { ModalHandle } from '../UI/Modal';
import UpcomingSession from './UpcomingSession';

type UpcomingSessionsProps = {
  onClose: () => void;
};

export default function UpcomingSessions({ onClose }: UpcomingSessionsProps) {
  const modal = useRef<ModalHandle>(null);
  const state = useSessionsContext();
  const hasSessions = state.upcomingSessions.length > 0;
  function handleCancelSession(sessionId: string) {
    state.cancelSession(sessionId);
  }

  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);
  return (
    <Modal ref={modal} onClose={onClose}>
      <h2>Upcoming sessions</h2>
      {hasSessions && (
        <ul>
          {state.upcomingSessions.map((session) => (
            <li key={session.id}>
              <UpcomingSession
                session={session}
                onCancel={() => handleCancelSession(session.id)}
              />
            </li>
          ))}
        </ul>
      )}
      {!hasSessions && <p>No upcoming sessions...</p>}
      <p className="actions">
        <Button onClick={onClose}>Close</Button>
      </p>
    </Modal>
  );
}
