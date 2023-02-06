// https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context
import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useReducer } from "react";

const MessagesContext = createContext(null);
const MessagesDispatchContext = createContext(null);

const initialMessages = [
  {
    messageId: "1" + uuidv4(),
    messageText: "Hello from ChatGPT simulator",
    messageType: "inbound",
  },
];

export function MessagesProvider({ children }) {
  const [messages, dispatch] = useReducer(messagesReducer, initialMessages);

  return (
    <MessagesContext.Provider value={messages}>
      <MessagesDispatchContext.Provider value={dispatch}>
        {children}
      </MessagesDispatchContext.Provider>
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessagesContext);
}

export function useMessagesDispatch() {
  return useContext(MessagesDispatchContext);
}

function messagesReducer(messages, action) {
  switch (action.type) {
    case "add": {
      return [
        ...messages,
        {
          messageId: action.messageId,
          messageText: action.messageText,
          messageType: action.messageType,
        },
      ];
    }
    case "delete": {
      return messages.filter((m) => m.messageId !== action.messageId);
    }
    default: {
      throw Error("Unknown dispatch action for MessagesReducer " + action.type);
    }
  }
}
