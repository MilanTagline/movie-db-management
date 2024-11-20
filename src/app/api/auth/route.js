import dbConnect from "@/lib/dbConnect";
import users from "@/models/user";
import response from "@/utils/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   await dbConnect();
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       const movies = await Movies.find({});
//       res.status(200).json(movies);
//       break;
//     case "POST":
//       const { title, publishingYear, poster } = req.body;
//       const movie = await Movies.create({ title, publishingYear, poster });
//       res.status(201).json(movie);
//       break;
//     case "PUT":
//       const { id } = req.query;
//       const updatedMovie = await Movies.findByIdAndUpdate(id, req.body, {
//         new: true,
//       });
//       res.status(200).json(updatedMovie);
//       break;
//     case "DELETE":
//       await Movies.findByIdAndDelete(req.query.id);
//       res.status(200).json({ message: "Movie deleted" });
//       break;
//     default:
//       res.status(405).json({ message: "Method not allowed" });
//   }
// }

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("\n >>>>>>> abc >>>>>>> ", email, password, hashedPassword);

    if (!email || !password) {
      return response(false, 400, "Email and password are required");
    }

    const user = await users.findOne({ email });
    if (!user) {
      return response(false, 404, "User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
      return response(false, 401, "Incorrect password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return response(true, 200, "Login successful", {
      token,
    });

    // return response(true, 200, "success");
  } catch (error) {
    console.log(">>>>>> user signIn >>>>>>", error);
    return response(false, 500, ">>>>>> user signIn >>>>>>", error);
  }
}
