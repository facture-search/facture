import { APIGatewayProxyResult } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import sharp from "sharp";

import { getExtension } from "@facture/helpers";

export async function handleResize(
    fileName: string,
    key: string,
    dimensions: { width: number; height: number },
    coldBucket: string,
    resizedBucket: string,
    s3: S3
): Promise<APIGatewayProxyResult> {
    const fileExtension = getExtension(fileName);

    const uploaded = await s3.getObject({ Bucket: coldBucket, Key: fileName }).promise();

    const image = await sharp(uploaded.Body as Buffer)
        .resize(dimensions.width, dimensions.height)
        .toBuffer();

    await s3.upload({ Body: image, Bucket: resizedBucket, Key: key }).promise();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/" + fileExtension, "Content-Disposition": `attachment; filename=${key}` },
        body: image.toString("base64"),
        isBase64Encoded: true,
    };
}

export default handleResize;
