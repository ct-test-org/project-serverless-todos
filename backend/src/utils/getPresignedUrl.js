// a code snippet that shows how to
// generate a presigned url for an image upload process

const s3 = new AWS.S3({
  signatureVersion: "v4", // Use Sigv4 algorithm
});

const presignedUrl = s3.getSignedUrl("putObject", {
  // The URL will allow to perform the PUT operation
  Bucket: "s3-bucket-name", // Name of an S3 bucket
  Key: "object-id", // id of an object this URL allows access to
  Expires: "300", // A URL is only valid for 5 minutes
});
