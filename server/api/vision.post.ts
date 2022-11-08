import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { imageUri } = body;
  if (!imageUri) throw new Error("Missing 'imageUri' in body");
  
  const [res] = await client.annotateImage({
    image: {
      source: {
        imageUri: imageUri,
      },
    },
    features: [
      {
        type: "LABEL_DETECTION",
        maxResults: 10,
      },
    ],
  });
  return res;
});
