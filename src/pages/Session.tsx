import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BookSessions from '../components/Sessions/BookSessions.tsx';
import Button from '../components/UI/Button.tsx';
import { SESSIONS } from '../dummy-sessions.ts';

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const sessionId = params.id;
  const [isBooking, setIsBooking] = useState(false);
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  function handleOpenBooking() {
    setIsBooking(true);
  }
  function handleCloseBooking() {
    setIsBooking(false);
  }

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }
  return (
    <main id="session-page">
      {isBooking && (
        <BookSessions session={loadedSession} onDone={handleCloseBooking} />
      )}
      <article>
        <header>
          <img src={loadedSession.image} alt={loadedSession.title} />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <p className="action">
              <Button onClick={handleOpenBooking}>Book session</Button>
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
