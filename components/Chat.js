import styled from 'styled-components';
import {Avatar} from "@material-ui/core";
import getRecipientEmail from '../utils/getRecipientEmail';
import { auth, db} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import {useCollection} from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover {
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
  margin: 15px;
  margin-right: 15px;
`;

const Chat = ({id, users}) => {
    const [user] = useAuthState(auth);
    const router= useRouter();
    const recipientEmail = getRecipientEmail(users, user);  // getting the email of the person that the user chat with.
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(users, user))     
    );                                                      // create a new colection, that contains a document, that contains an array of the user email+ the email of the second person
    
    const recipient= recipientSnapshot?.docs?.[0]?.data();  // here we actually get the other person's data.
    
    const enteredChat = () => {      // when the user clicks on a specific chat-> go to another file in the writen pass.
        router.push(`/chat/${id}`);
    };

    return (
        <Container onClick={enteredChat}>
            { recipient ? (
                <UserAvatar src={recipient?.photoURL} /> 
            ) : (
                <UserAvatar> {recipientEmail[0]}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    );
}

export default Chat;