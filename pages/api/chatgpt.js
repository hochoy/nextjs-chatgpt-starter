export default async function handler(req, res) {
  // extract body
  const body = req.body;
  console.log("pages/api/chatgpt: Received http request with body: \n", body);

  // request validation
  if (!body.message) {
    console.error(
      "pages/api/chatgpt: Please provide a message field in the body"
    );
    return res.status(400).json({ data: "Message not provided" });
  }

  // Option 1: Import ChatGPT Client Class, and send requests directly from this Next.js server
  // See instructions at github.com/hochoy/node-chatgpt-starter.git

  // Option 2: connect to ChatGPT API starter at localhost:4000
  const bodyJSON = JSON.stringify({
    message: body.message,
    conversationId: body.conversationId,
    // parentMessageId: body.parentMessageId,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJSON,
  };

  const endpoint = "http://localhost:4000/conversation";
  const response = await fetch(endpoint, options);
  const result = await response.json();

  // return successful response
  console.log(`pages/api/chatgpt returning: \n ${Object.keys(result)}`);
  res.status(200).json(result);
}
