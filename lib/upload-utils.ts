import { upload } from "@imagekit/next";

const ROOT_FOLDER = "/my-portfolio";
const DEFAULT_FOLDER = ROOT_FOLDER + "/general";

/**
 * Authenticates and retrieves the necessary upload credentials from the server.
 */
export const imageKitAuthenticator = async () => {
  try {
    const response = await fetch("/api/admin/upload");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("ImageKit Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

/**
 * Uploads a file to ImageKit and returns the URL.
 * @param file The file to upload.
 * @returns The URL of the uploaded file.
 */
export const uploadFile = async (file: File, folder?: string): Promise<string> => {
  try {
    const authParams = await imageKitAuthenticator();
    const { signature, expire, token, publicKey } = authParams;

    const uploadResponse = await upload({
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name,
      folder: folder ? `${ROOT_FOLDER}/${folder}` : DEFAULT_FOLDER,
    });

    return uploadResponse.url || "";
  } catch (error) {
    console.error("ImageKit Upload error:", error);
    throw error;
  }
};
