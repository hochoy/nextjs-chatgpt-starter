export default function handler(req, res) {
  // extract body
  const body = req.body;
  console.log("/api/chatgpt received: ", body);

  // request validation
  if (!body.message) {
    console.error("/api/chatgpt failed to receive body.message");
    return res.status(400).json({ data: "Message not provided" });
  }

  // do stuff

  // return successful response
  const result = "ChatGPT result";
  console.log("/api/chatgpt returning ChatGPT response");
  res.status(200).json({ data: `${result}` });
}
