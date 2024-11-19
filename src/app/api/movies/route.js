import dbConnect from "@/lib/dbConnect";
import Movies from "@/models/movie";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      const movies = await Movies.find({});
      res.status(200).json(movies);
      break;

    case "POST":
      const { title, publishingYear, poster } = req.body;
      const movie = await Movies.create({ title, publishingYear, poster });
      res.status(201).json(movie);
      break;
    case "PUT":
      const { id } = req.query;
      const updatedMovie = await Movies.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedMovie);
      break;
    case "DELETE":
      await Movies.findByIdAndDelete(req.query.id);
      res.status(200).json({ message: "Movie deleted" });
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
