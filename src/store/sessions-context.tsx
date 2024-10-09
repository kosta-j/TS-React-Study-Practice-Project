import { createContext, ReactNode, useContext, useReducer } from 'react';

export type SessionType = {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  image: string;
  duration: number;
};

type SessionStateType = {
  upcomingSessions: SessionType[];
};

type SessionContextValueType = SessionStateType & {
  bookSession: (session: SessionType) => void;
  cancelSession: (sessionId: string) => void;
};

type BookSessionActionType = {
  type: 'BOOK_SESSION';
  session: SessionType;
};

type CancelSessionActionType = {
  type: 'CANCEL_SESSION';
  sessionId: string;
};

type SessionsActionType = BookSessionActionType | CancelSessionActionType;

const SessionsContext = createContext<SessionContextValueType | null>(null);

export function useSessionsContext() {
  const context = useContext(SessionsContext);
  if (!context) {
    throw new Error(
      'useSessionsContext must be used within a SessionsContextProvider'
    );
  }
  return context;
}

function sessionsReducer(state: SessionStateType, action: SessionsActionType) {
  if (action.type === 'BOOK_SESSION') {
    if (
      state.upcomingSessions.some((session) => session.id === action.session.id)
    ) {
      return state;
    }
    return {
      upcomingSessions: state.upcomingSessions.concat(action.session),
    };
  }

  if (action.type === 'CANCEL_SESSION') {
    return {
      upcomingSessions: state.upcomingSessions.filter(
        (session) => session.id !== action.sessionId
      ),
    };
  }
  return state;
}

export default function SessionsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sessionsState, dispatch] = useReducer(sessionsReducer, {
    upcomingSessions: [],
  });

  function bookSession(session: SessionType) {
    dispatch({ type: 'BOOK_SESSION', session });
  }

  function cancelSession(sessionId: string) {
    dispatch({ type: 'CANCEL_SESSION', sessionId });
  }

  const ctxValue = {
    upcomingSessions: sessionsState.upcomingSessions,
    bookSession,
    cancelSession,
  };

  return (
    <SessionsContext.Provider value={ctxValue}>
      {children}
    </SessionsContext.Provider>
  );
}
