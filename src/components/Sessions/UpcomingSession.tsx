import { SessionType } from '../../store/sessions-context';
import Button from '../UI/Button';

type UpcomingSessionType = {
  session: SessionType;
  onCancel: () => void;
};

export default function UpcomingSession({
  session,
  onCancel,
}: UpcomingSessionType) {
  return (
    <article className="upcoming-session">
      <div>
        <h3>{session.title}</h3>
        <p>{session.summary}</p>
      </div>
      <p className="actions">
        <Button textOnly onClick={onCancel}>
          Cancel
        </Button>
      </p>
    </article>
  );
}
