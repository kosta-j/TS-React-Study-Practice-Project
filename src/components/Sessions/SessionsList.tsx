import SessionItem from "./SessionItem.tsx";

type SessionsListPropsType = {
    sessions: {
        id: string;
        title: string;
        summary: string;
        image: string;
    }[]
}

export default function SessionsList({sessions}: SessionsListPropsType) {
    return (
        <ul id="sessions-list">
            {sessions.map((session) => (
                <li key={session.id}>
                    <SessionItem {...session}/>
                </li>
            ))}
        </ul>
    )
}