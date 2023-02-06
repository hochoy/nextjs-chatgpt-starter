"use client";
import { v4 as uuidv4 } from "uuid";
import {
  MessagesProvider,
  useMessages,
  useMessagesDispatch,
} from "../context/messagesContext.js";

function ChatRoom() {
  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      <Title text="Demo of Chat GPT (Tailwind CSS)" />
      <MessageHistory />
      <TypeBox />
    </div>
  );
}

function OutboundMessage({ text, mins_ago }) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {mins_ago} min ago
        </span>
      </div>
    </div>
  );
}

function InboundMessage({ text, mins_ago }) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {mins_ago} min ago
        </span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
  );
}

function MessageHistory() {
  const messageHistory = useMessages();
  const mins_ago = 2;
  return (
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
      {messageHistory.map((message) => {
        return message.messageType == "inbound" ? (
          <InboundMessage
            id={message.messageId}
            key={message.messageId}
            text={message.messageText}
            mins_ago={mins_ago}
          />
        ) : (
          <OutboundMessage
            id={message.messageId}
            key={message.messageId}
            text={message.messageText}
            mins_ago={mins_ago}
          />
        );
      })}
    </div>
  );
}

async function sendGPTrequest(message, conversationId) {
  const bodyJSON = JSON.stringify({
    message,
    conversationId,
    // parentMessageId: "placeholder-parent-message-id",
  });
  console.log(`You sent: \n${bodyJSON}`);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJSON,
  };
  // this sends the requests to our local Next.js server at /pages/api/chatgpt
  const endpoint = "/api/chatgpt";
  const response = await fetch(endpoint, options);
  const result = await response.json();
  const data = result.data;
  console.log(`You received: \n${data}`);
}

// https://nextjs.org/docs/guides/building-forms
function TypeBox() {
  const messageDispatch = useMessagesDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const messageText = event.target.message.value;
    const messageId = uuidv4();

    // update message context to update the ChatRoom
    messageDispatch({
      type: "add",
      messageId: messageId,
      messageText: messageText,
      messageType: "outbound",
    });

    // send a request to ChatGPT API
    const gptReply = await sendGPTrequest(
      messageText,
      "placeholder-conversation-id"
    );
  };

  return (
    <div className="bg-gray-300 p-4">
      <form onSubmit={handleSubmit}>
        <input
          className="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          id="message"
          name="message"
          required
          minLength="5"
          maxLength="200"
          placeholder="Type your message…"
        />
      </form>
    </div>
  );
}

function CenteredBackground({ children }) {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      {children}
    </div>
  );
}

function Title({ text }) {
  return (
    <div className="bg-gray-300 p-4 rounded">
      <h1 className="flex text-md px-3 justify-center">{text}</h1>
    </div>
  );
}

export default function Page() {
  return (
    <MessagesProvider>
      <CenteredBackground>
        <ChatRoom />
      </CenteredBackground>
    </MessagesProvider>
  );
}
