export default function handler(req, res) {
  // extract body
  const body = req.body;
  console.log("pages/api/chatgpt received: \n", body);

  // request validation
  if (!body.message) {
    console.error("pages/api/chatgpt failed to receive body.message");
    return res.status(400).json({ data: "Message not provided" });
  }

  // do stuff

  // return successful response
  const result = "ChatGPT result";
  console.log(`pages/api/chatgpt returning: \n ${result}`);
  res.status(200).json({ data: `${result}` });
}
