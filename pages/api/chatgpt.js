export default function handler(req, res) {
  // extract body
  const body = req.body;
  console.log("body: ", body);

  // request validation
  if (!body.message) {
    return res.status(400).json({ data: "Message not provided" });
  }

  // do stuff

  // return successful response
  const result = "hello there";
  res.status(200).json({ data: `${result}` });
}
