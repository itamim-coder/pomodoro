import axios from "axios";

export async function uploadImageToImageBB(data: any) {
  try {
    console.log(data, "function");
    const formData = new FormData();
    formData.append("key", "ffdc074540247ca01d6acae5f46f1258"); // Replace with your actual ImageBB API key
    formData.append("image", data.image[0]);

    const imageBBResponse = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );

    // Get the image URL from the ImageBB response
    const imageURL = imageBBResponse.data.data.url;

    return imageURL;
  } catch (error) {
    // Handle any errors that occurred during the image upload
    console.error("Error uploading image to ImageBB:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
