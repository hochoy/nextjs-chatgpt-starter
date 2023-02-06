// https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context
import { createContext, useContext, useReducer } from "react";

const MessagesContext = createContext(null);
const MessagesDispatchContext = createContext(null);

const initialMessages = [
  { id: 0, text: "Hello from ChatGPT simulator", messageType: "inbound" },
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
    case "added": {
      return [
        ...messages,
        {
          id: action.id,
          text: action.text,
          messageType: action.messageType,
        },
      ];
    }
    case "deleted": {
      return messages.filter((m) => m.id !== action.id);
    }
    default: {
      throw Error("Unknown dispatch action for MessagesReducer " + action.type);
    }
  }
}
