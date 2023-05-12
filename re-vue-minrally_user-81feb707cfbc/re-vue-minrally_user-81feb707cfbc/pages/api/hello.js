export default function handler(NextApiRequest, res) {
  res.status(200).json({ name: "John Doe" });
}
