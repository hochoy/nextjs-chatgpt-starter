"use client";
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
  return (
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
      <OutboundMessage
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        mins_ago="2"
      />
      <InboundMessage
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod."
        mins_ago="2"
      />
      <InboundMessage
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod."
        mins_ago="2"
      />
    </div>
  );
}

// https://nextjs.org/docs/guides/building-forms
function TypeBox() {
  return (
    <div className="bg-gray-300 p-4">
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
    <CenteredBackground>
      <ChatRoom />
    </CenteredBackground>
  );
}
