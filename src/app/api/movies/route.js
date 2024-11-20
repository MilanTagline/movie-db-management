import dbConnect from "@/lib/dbConnect";
import Movies from "@/models/movie";
import response from "@/utils/common";
import jwt from "jsonwebtoken";
import users from "@/models/user";
import formidable from "formidable";
import cloudinary from "cloudinary";
import { Readable } from "stream";

// Disable bodyParser for Next.js API routes to handle `formidable`
export const config = {
  api: {
    bodyParser: false,
  },
};

// Common function to verify token and return userId or error message
async function verifyToken(token) {
  try {
    if (!token) {
      return { success: false, message: "Authorization token is required" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return { success: false, message: "Invalid token" };
    }

    // Verify that the user exists in the database
    const user = await users.findById(decoded?.id);

    if (!user) {
      return response(false, 401, "Unauthorized user");
    }

    return { success: true, userId: decoded?.id };
  } catch (error) {
    console.log("\n >>>> error >>>> ", error);
    return { success: false, message: "Invalid token", error };
  }
}

export async function GET(request) {
  try {
    await dbConnect();

    const token = request.headers.get("Authorization")?.split(" ")[1];

    const tokenResponse = await verifyToken(token);
    if (!tokenResponse.success) {
      return response(false, 401, tokenResponse.message);
    }

    const { searchParams } = new URL(request?.url);
    const id = searchParams?.get("id");
    const page = parseInt(searchParams?.get("page")) || 1; // Default page is 1
    const limit = parseInt(searchParams?.get("limit")) || 8; // Default limit is 8

    let movies;
    if (id) {
      movies = await Movies.findById(id);
    } else {
      const skip = (page - 1) * limit;
      movies = await Movies.find().skip(skip).limit(limit);
    }
    if (!movies || (Array.isArray(movies) && movies.length === 0)) {
      return response(false, 404, "No Movie Found");
    }

    return response(true, 200, "Success", movies);
  } catch (error) {
    console.log("\n >>>> error >>>> ", error);
    return response(false, 500, "Error fetching movies", error);
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const readableStream = new Readable();
    readableStream._read = () => {};
    const arrayBuffer = await request.arrayBuffer();
    readableStream.push(Buffer.from(arrayBuffer));
    readableStream.push(null);

    readableStream.headers = {
      ...Object.fromEntries(request.headers.entries()),
    };

    const form = formidable({ multiples: false });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(readableStream, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const token = request.headers.get("Authorization")?.split(" ")[1];
    const tokenResponse = await verifyToken(token);
    if (!tokenResponse.success) {
      return response(false, 401, tokenResponse.message);
    }

    const { title, publishingYear } = fields;
    const [poster] = files.poster;

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

    const readableStream = new Readable();
    readableStream._read = () => {};
    const arrayBuffer = await request.arrayBuffer();
    readableStream.push(Buffer.from(arrayBuffer));
    readableStream.push(null);

    readableStream.headers = {
      ...Object.fromEntries(request.headers.entries()),
    };

    const form = formidable({ multiples: false });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(readableStream, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const token = request.headers.get("Authorization")?.split(" ")[1];
    const tokenResponse = await verifyToken(token);
    if (!tokenResponse.success) {
      return response(false, 401, tokenResponse.message);
    }

    const { id, title, publishingYear } = fields;
    const [poster] = files.poster;

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
    const movieOldData = await Movies.findById(id);
    if (!movieOldData) return response(true, 400, "No movie found");

    let updateData = {};
    if (title[0]) updateData.title = title[0];
    if (publishingYear[0]) updateData.publishingYear = publishingYear[0];
    if (posterUrl) updateData.poster = posterUrl;

    const updatedMovie = await Movies.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedMovie) {
      return response(true, 404, "Movie not found");
    }

    const publicId = movieOldData?.poster
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    await cloudinary.uploader.destroy(publicId, function (result) {});

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

    const token = request.headers.get("Authorization")?.split(" ")[1];
    const tokenResponse = await verifyToken(token);
    if (!tokenResponse.success) {
      return response(false, 401, tokenResponse.message);
    }

    const { searchParams } = new URL(request?.url);
    const id = searchParams?.get("id");
    if (!id) {
      return response(true, 400, "Movie ID is required");
    }
    const deletedMovie = await Movies.findByIdAndDelete(id);
    if (!deletedMovie) {
      return response(true, 404, "Movie not found");
    }

    const publicId = deletedMovie?.poster
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    await cloudinary.uploader.destroy(publicId, function (result) {});

    return response(true, 201, "Movie deleted successfully");
  } catch (error) {
    console.log("\n >>>> error >>>> ", error);
    return response(true, 500, "Error deleting movie", error);
  }
}
