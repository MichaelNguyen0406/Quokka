import { useState } from "react";
import axios from "axios";

const useImageUploader = (cloudName, uploadPreset) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const uploadImages = async (images) => {
    if (!images || images.length === 0) {
      throw new Error("No images provided for upload.");
    }

    setUploading(true);

    try {
      const uploadPromises = images.map((image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);

        return axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
      });

      const responses = await Promise.all(uploadPromises);
      const urls = responses.map((res) => res.data.secure_url);
      setUploadedUrls(urls);

      return urls; // Trả về danh sách URL đã upload
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadedUrls,
    uploadImages,
  };
};

export default useImageUploader;
