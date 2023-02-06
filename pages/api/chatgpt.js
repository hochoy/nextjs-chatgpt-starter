export default async function handler(req, res) {
  // request validation
  if (!req.body.message) {
    console.error(
      "pages/api/chatgpt: Please provide a message field in the body"
    );
    return res.status(400).json({ data: "Message not provided" });
  }

  // Option 1: Import ChatGPT Client Class, and send requests directly from this Next.js server
  // See instructions at github.com/hochoy/node-chatgpt-starter.git

  // Option 2: connect to ChatGPT API starter at localhost:4000
  const body = {
    message: req.body.message,
    conversationId: req.body.conversationId,
  };

  if (req.body.parentMessageId) {
    body.parentMessageId = req.body.parentMessageId;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const endpoint = "http://localhost:4000/conversation";
  console.log(
    `pages/api/chatgpt: forwarding to ${endpoint}: \n ${JSON.stringify(body)}`
  );
  const response = await fetch(endpoint, options);
  const result = await response.json();

  // return successful response
  console.log(`pages/api/chatgpt: returning: \n ${Object.keys(result)}`);
  res.status(200).json(result);
}
