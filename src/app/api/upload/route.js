import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { file } = req.body; // Base64 encoded image
  const response = await cloudinary.uploader.upload(file, {
    folder: "movies",
  });
  res.status(200).json({ url: response.secure_url });
}
