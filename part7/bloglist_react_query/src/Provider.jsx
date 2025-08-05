import { NotificationContextProvider } from "./reducers/NotificationContext";
import { UserContextProvider } from "./reducers/UserContext";

export default function Provider(props) {
  return (
    <NotificationContextProvider>
      <UserContextProvider>
        {props.children}
      </UserContextProvider>
    </NotificationContextProvider>
  )
}