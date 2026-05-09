export default async function handler(req, res) {
  // This could be a secondary endpoint for quick recommendations
  res.status(200).json({ message: "Secondary recommendations endpoint" });
}
