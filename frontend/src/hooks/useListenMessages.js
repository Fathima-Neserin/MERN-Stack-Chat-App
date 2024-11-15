import { useEffect } from "react";
import {useSocketContext} from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) =>{
            const sound = new Audio("/sounds/notification.mp3");
            sound.play();
            setMessages([...messages,newMessage]);
        })

        return () => socket?.off("newMessage"); 
    }, [socket,messages,setMessages])
}

export default useListenMessages;
