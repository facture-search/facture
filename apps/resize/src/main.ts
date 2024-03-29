import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";

import { handleExisting, handleResize } from "./lib";

const s3 = new S3({ apiVersion: "2006-03-01" });

const COLD_BUCKET = process.env.COLD_BUCKET as string;
const RESIZED_BUCKET = process.env.RESIZED_BUCKET as string;
const ALLOWED_DIMENSIONS = new Set();

if (process.env.ALLOWED_DIMENSIONS) {
    const dimensions = process.env.ALLOWED_DIMENSIONS.split(",");
    dimensions.forEach((dimension) => ALLOWED_DIMENSIONS.add(dimension));
}

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const fileName = event.pathParameters?.file;
    const size = event.queryStringParameters?.size;

    if (!fileName) throw Error("No file name provided");
    if (!size) return await handleExisting(fileName, COLD_BUCKET, s3);

    if (ALLOWED_DIMENSIONS.size > 0 && !ALLOWED_DIMENSIONS.has(size)) return { statusCode: 403, headers: {}, body: "" };

    const resizedKey = size + "." + fileName;

    try {
        return await handleExisting(resizedKey, RESIZED_BUCKET, s3);
    } catch {
        const split = size.split("x");

        return await handleResize(fileName, resizedKey, { width: parseInt(split[0]), height: parseInt(split[1]) }, COLD_BUCKET, RESIZED_BUCKET, s3);
    }
};
