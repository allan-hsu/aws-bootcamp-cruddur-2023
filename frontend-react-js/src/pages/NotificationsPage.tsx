import { useEffect, useState } from "react";
import DesktopNavigation from "../components/DesktopNavigation";
import DesktopSidebar from "../components/DesktopSidebar";
import MessageItem from "../components/MessageItem";
import { useAuth } from "../store/authentication";
export const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [popped, setPopped] = useState(true);
    const { user } = useAuth();

    const loadNotificationsData = async () => {
        try {
            const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/message_groups`
            const res = await fetch(backend_url, {
                method: "GET"
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setNotifications(resJson)
            } else {
                console.log(res)
            }
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        loadNotificationsData();
    }, []);


    return (<article>
        <DesktopNavigation user={user} active={'home'} setPopped={setPopped} />
        <div className='content messages'>
            {notifications.map((notification: any) => <MessageItem key={notification.uuid} message={notification} />)}
        </div>
        <DesktopSidebar user={user} />
    </article>);
};