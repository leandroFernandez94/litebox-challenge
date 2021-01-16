// Load the AWS SDK for Node.js
import aws from 'aws-sdk'

export default async function getPresignedUrl(req, res) {
  aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Expires: 60,
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
    Fields: {
      key: req.query.file,
    },
  });

  res.status(200).json(post);
}