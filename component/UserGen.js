"use client";
import { useState, useEffect} from 'react';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const App = (props) => {
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const nameURI = props.session.user.name;
const userId = nameURI.replace(/\s+/g, '');
const userToken = props.token.token || props.token;
const userName = props.session.user.name || `User ${userId}`;

const user = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

  const [channel, setChannel] = useState();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

useEffect(() => {
  if (!client) return;

  const setupChannel = async () => {
    const chatChannel = client.channel('livestream', props.name, {
      image: 'https://getstream.io/random_png/?name=react',
      name: `${props.name} Forum`,
    });

    await chatChannel.watch(); 
    setChannel(chatChannel);
  };

  setupChannel();
}, [client]);

  if (!client) return <div>Setting up client & connection...</div>;


  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;