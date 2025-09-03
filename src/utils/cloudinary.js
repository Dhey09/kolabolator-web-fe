// src/utils/cloudinary.js
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload file ke Cloudinary dengan progress
 * @param {File} file
 * @param {String} folder
 * @param {Function} onProgress - callback percent
 * @returns {Promise<Object>} response Cloudinary
 */
export const uploadToCloudinary = (file, folder = "", onProgress) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    if (folder) formData.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = (event.loaded / event.total) * 100;
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data); // data.secure_url, data.public_id, dll
      } else {
        reject(new Error(`Upload gagal: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload gagal"));

    xhr.send(formData);
  });
};

/**
 * Generate URL Cloudinary dengan options
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  let url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;
  const transformations = Object.entries(options)
    .map(([key, value]) => `${key}_${value}`)
    .join(",");
  if (transformations) url += transformations + "/";
  url += publicId;
  return url;
};
