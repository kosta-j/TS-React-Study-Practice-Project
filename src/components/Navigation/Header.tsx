import {useState} from "react";
import {NavLink} from "react-router-dom";
import Button from "../UI/Button.tsx";

export default function Header() {
    const [upcommingSessionsVisible, setUpcommingSessionsVisible] = useState(false)

    function showUpcomingSessions() {
        setUpcommingSessionsVisible(true);
    }

    // function hideUpcomingSessions() {
    //     setUpcommingSessionsVisible(false);
    // }

    return (
        <>
            <header id="main-header">
                <h1>React Mentoring</h1>
                <nav>
                    <ul>
                        <li><NavLink to="/">Our Mission</NavLink></li>
                        <li><NavLink to="/sessions">Browse Sessions</NavLink></li>
                        <li><Button onClick={showUpcomingSessions}>Upcoming Sessions</Button></li>
                    </ul>
                </nav>
            </header>
        </>)
}