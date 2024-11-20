import dbConnect from "@/lib/dbConnect";
import Movies from "@/models/movie";
import response from "@/utils/common";
import jwt from "jsonwebtoken";
import users from "@/models/user";
import formidable from "formidable";
import cloudinary from "cloudinary";
// import { getRequest } from "next/dist/server/node-http";
import { Readable } from "stream";

// export default async function handler(request ) {
//   await dbConnect();
//   console.log(">>>> request :>>>> ", request);

//   const { method } = request;

//   switch (method) {
//     case "GET":
//       console.log("\n\n >>>> GET :>>>> \n\n");

//       const movies = await Movies.find({});
//       res.status(200).json(movies);
//       break;

//     case "POST":
//       const { title, publishingYear, poster } = request.body;
//       const movie = await Movies.create({ title, publishingYear, poster });
//       res.status(201).json(movie);
//       break;
//     case "PUT":
//       const { id } = request.query;
//       const updatedMovie = await Movies.findByIdAndUpdate(id, request.body, {
//         new: true,
//       });
//       res.status(200).json(updatedMovie);
//       break;
//     case "DELETE":
//       await Movies.findByIdAndDelete(request.query.id);
//       res.status(200).json({ message: "Movie deleted" });
//       break;
//     default:
//       res.status(405).json({ message: "Method not allowed" });
//   }
// }

// export async function handler(request ) {
//   await dbConnect();
//   console.log(">>>> request :>>>> ", request);
//   const { method } = request;

//   switch (method) {
//     case "GET":
//       return handleGet(request );
//     case "POST":
//       return handlePost(request );
//     case "PUT":
//       return handlePut(request );
//     case "DELETE":
//       return handleDelete(request );
//     default:
//       return res.status(405).json({ message: "Method not allowed" });
//   }
// }

// Handle GET request

// Disable bodyParser for Next.js API routes to handle `formidable`
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(request) {
  try {
    await dbConnect();
    // Get the token from the Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1]; // 'Bearer <token>'
    // console.log("\n\n >>>>>> token >>>>>>\n\n", token);

    if (!token) {
      return response(false, 401, "Authorization token is required");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret
    // console.log("\n\n >>>>>> decoded >>>>>>\n\n", decoded);

    if (!decoded) {
      return response(false, 401, "Invalid token");
    }
    // Extract user ID from decoded token
    const userId = decoded.id;

    // Verify that the user exists in the database
    const user = await users.findById(userId);
    // console.log("\n\n >>>>>> user >>>>>>\n", user);

    if (!user) {
      return response(false, 401, "Unauthorized user");
    }

    const { searchParams } = new URL(request?.url);
    const id = searchParams?.get("id");

    let movies;
    if (id) {
      movies = await Movies.findById(id);
    } else {
      movies = await Movies.find();
    }
    if (!movies) {
      return response(false, 401, "No Movie Found");
    }

    return response(true, 200, "Success", movies);
  } catch (error) {
    console.log("\n >>>> error >>>> ", error);
    return response(true, 500, "Error fetching movies", error);
  }
}

// Handle POST request
export async function POST(request) {
  try {
    await dbConnect();

    // Convert the request body to a readable stream for formidable
    const readableStream = new Readable();
    readableStream._read = () => {};
    const arrayBuffer = await request.arrayBuffer();
    readableStream.push(Buffer.from(arrayBuffer)); // Convert ArrayBuffer to Buffer
    readableStream.push(null);

    // Add headers to the readable stream for Formidable
    readableStream.headers = {
      ...Object.fromEntries(request.headers.entries()),
    };

    // Parse form-data using formidable
    const form = formidable({ multiples: false });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(readableStream, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Get the token from the Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1]; // 'Bearer <token>'
    console.log("\n\n >>>>>> token >>>>>>\n\n", token);

    if (!token) {
      return response(false, 401, "Authorization token is required");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret
    console.log("\n\n >>>>>> decoded >>>>>>\n\n", decoded);

    if (!decoded) {
      return response(false, 401, "Invalid token");
    }
    // Extract user ID from decoded token
    const userId = decoded.id;

    // Verify that the user exists in the database
    const user = await users.findById(userId);
    console.log("\n\n >>>>>> user >>>>>>\n", user);

    if (!user) {
      return response(false, 401, "Unauthorized user");
    }
    console.log("\n\n >>>>>> After user >>>>>>\n");

    // const { [title], publishingYear, poster } = await request.json();
    const { title, publishingYear } = fields;
    // const poster = files.poster ? files.poster[0] : null;
    const [poster] = files.poster;

    // console.log(
    //   "\n\n >>>>>> poster() >>>>>>\n\n",
    //   title,
    //   publishingYear,
    //   poster
    // );
    if (!title[0] || !publishingYear[0]) {
      return response(false, 400, "All fields are required");
    }

    let posterUrl = null;

    if (poster && poster.filepath) {
      try {
        const cloudinaryUpload = await cloudinary.v2.uploader.upload(
          poster.filepath,
          {
            folder: "movies",
          }
        );
        posterUrl = cloudinaryUpload.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return response(false, 500, "Error uploading poster to Cloudinary");
      }
    }

    console.log("\n >>>>> posterUrl >>>>> ", posterUrl);
    const movie = await Movies.create({
      title: title[0],
      publishingYear: publishingYear[0],
      poster: posterUrl,
    });
    return response(true, 201, "Success", movie);
  } catch (error) {
    console.log("error :>> ", error);
    return response(true, 500, "Error creating movie", error);
  }
}

// Handle PUT request
export async function PUT(request) {
  try {
    await dbConnect();
    // Convert the request body to a readable stream for formidable
    const readableStream = new Readable();
    readableStream._read = () => {};
    const arrayBuffer = await request.arrayBuffer();
    readableStream.push(Buffer.from(arrayBuffer)); // Convert ArrayBuffer to Buffer
    readableStream.push(null);

    // Add headers to the readable stream for Formidable
    readableStream.headers = {
      ...Object.fromEntries(request.headers.entries()),
    };

    // Parse form-data using formidable
    const form = formidable({ multiples: false });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(readableStream, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
    console.log("\n >>>> fields :>>>>>> ", fields);
    // console.log("\n >>>> fields :>>>>>> ", files);
    // Get the token from the Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1]; // 'Bearer <token>'
    // console.log("\n\n >>>>>> token >>>>>>\n\n", token);

    if (!token) {
      return response(false, 401, "Authorization token is required");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret
    // console.log("\n\n >>>>>> decoded >>>>>>\n\n", decoded);

    if (!decoded) {
      return response(false, 401, "Invalid token");
    }
    // Extract user ID from decoded token
    const userId = decoded.id;

    // Verify that the user exists in the database
    const user = await users.findById(userId);
    // console.log("\n\n >>>>>> user >>>>>>\n", user);

    if (!user) {
      return response(false, 401, "Unauthorized user");
    }
    // console.log("\n\n >>>>>> After user >>>>>>\n");

    // const { [title], publishingYear, poster } = await request.json();
    const { id, title, publishingYear } = fields;
    // const poster = files.poster ? files.poster[0] : null;
    const [poster] = files.poster;

    console.log(
      "\n\n >>>>>> request >>>>>>\n",
      id[0],
      title[0],
      publishingYear[0]
      // poster
    );
    if (!id[0]) {
      return response(false, 400, "Id is required");
    }

    let posterUrl = null;

    if (poster && poster.filepath) {
      try {
        const cloudinaryUpload = await cloudinary.v2.uploader.upload(
          poster.filepath,
          {
            folder: "movies",
          }
        );
        posterUrl = cloudinaryUpload.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return response(false, 500, "Error uploading poster to Cloudinary");
      }
    }

    if (!id) {
      return response(true, 400, "Movie ID is required");
    }
    let updateData = {};
    if (title[0]) updateData.title = title[0];
    if (publishingYear[0]) updateData.publishingYear = publishingYear[0];
    if (posterUrl) updateData.poster = posterUrl;
    // console.log("\n\n >>>> updateData :>> \n", updateData);

    const updatedMovie = await Movies.findByIdAndUpdate(id, updateData, {
      new: false,
    });
    if (!updatedMovie) {
      return response(true, 404, "Movie not found");
    }
    // console.log("\n\n >>>> old updateData :>> \n", updatedMovie);

    const publicId = updatedMovie?.poster
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    console.log("publicId :>> ", publicId);

    // // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(publicId, function (result) {
      console.log("Old image deleted from Cloudinary:", result);
    });

    return response(true, 201, "Success", updatedMovie);
  } catch (error) {
    console.log("error :>> ", error);
    return response(true, 500, "Error modifying movie", error);
  }
}

// Handle DELETE request
export async function DELETE(request) {
  try {
    await dbConnect();
    const token = request.headers.get("Authorization")?.split(" ")[1]; // 'Bearer <token>'
    // console.log("\n\n >>>>>> token >>>>>>\n\n", token);

    if (!token) {
      return response(false, 401, "Authorization token is required");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret
    // console.log("\n\n >>>>>> decoded >>>>>>\n\n", decoded);

    if (!decoded) {
      return response(false, 401, "Invalid token");
    }
    // Extract user ID from decoded token
    const userId = decoded.id;

    // Verify that the user exists in the database
    const user = await users.findById(userId);
    // console.log("\n\n >>>>>> user >>>>>>\n", user);

    if (!user) {
      return response(false, 401, "Unauthorized user");
    }

    const { searchParams } = new URL(request?.url);
    const id = searchParams?.get("id");
    console.log("\n >>>> object >>>> ", id);
    if (!id) {
      return response(true, 400, "Movie ID is required");
    }
    const deletedMovie = await Movies.findByIdAndDelete(id);
    console.log("deletedMovie :>> ", deletedMovie);
    if (!deletedMovie) {
      return response(true, 404, "Movie not found");
    }

    const publicId = deletedMovie?.poster
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    console.log("publicId :>> ", publicId);

    // // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(publicId, function (result) {
      console.log(" Movie image is deleted from Cloudinary:", result);
    });

    return response(true, 201, "Movie deleted successfully");
  } catch (error) {
    return response(true, 500, "Error deleting movie", error);
  }
}
