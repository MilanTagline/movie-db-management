import { NextResponse } from "next/server";

const response = (flag, statusCode, message, data = null) => {
  const responseBody = data ? { message, data } : { message };

  return NextResponse.json(responseBody, { status: statusCode });
};

export default response;
