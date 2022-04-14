import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";


const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height:  100vh;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;


const Chat = (props) => {  // the "props" object was defined in the SIDE-SERVER Function at the ed of the file.
    const [user] = useAuthState(auth);

    return (
        <Container>
            <Head>
                <title> Chat with {getRecipientEmail(props.chat.users, user)} </title> 
            </Head>
            <Sidebar />
            <ChatContainer> 
                <ChatScreen chat={props.chat} messages={props.messages}/>
            </ChatContainer>
        </Container>
    );
}

export default Chat;

//SERVER SIDE RENDERING
export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);

    //prep the messages on the server
    const messagesRes= await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

    const messages = messagesRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime()
        }))
    ;

    // prep the chatsSnapshot
    const chatRef = await ref.get();
    const chat = {
        id: chatRef.id,
        ...chatRef.data()
    }
    // Return "props" object that contains an array of messages and "chat"
    // object that contains the id of the doc and the users array- [the other person's emsil, the users' email].
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}

