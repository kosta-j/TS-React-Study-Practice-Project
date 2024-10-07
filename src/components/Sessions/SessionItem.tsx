import Button from "../UI/Button.tsx";

type SessionPropsType = {
    id: string;
    title: string;
    summary: string;
    image: string;
}

export default function SessionItem({id, title, summary, image}: SessionPropsType) {
    return (
        <article className="session-item">
            <img src={image} alt={`image for session ${title}`}></img>
            <div className="session-data">
                <div>
                    <h3>{title}</h3>
                    <p>{summary}</p>
                </div>
                <p className="actions">
                    <Button to={id}>Learn More</Button>
                </p>
            </div>
        </article>
    )
}