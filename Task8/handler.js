import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3 = new S3Client({region: 'us-east-1'});
import dotenv from 'dotenv'
dotenv.config()

export const uploadFile = async (event) => {
    try{
        const body = JSON.parse(event.body);
        const file = body.file;

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: file,
            ContentType: "application/octet-stream"
        });

        const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return {
            statusCode: 200,
            body: JSON.stringify({ uploadURL }),
        };
    } catch(err) {
        console.error("Error ", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};