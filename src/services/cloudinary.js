/**
 * Cloudinary Upload Helper Service
 * User Email: Sanaullaa19@gmail.com
 * Allows direct photo & video uploads from mobile phone camera/gallery or desktop file picker.
 */

// Cloudinary configuration (reads from import.meta.env, localStorage, or fallback)
export const CLOUDINARY_CONFIG = {
  cloudName:
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ||
    localStorage.getItem('shrirk_cloudinary_cloud_name') ||
    'shrirk-fashions',
  uploadPreset:
    import.meta.env.VITE_CLOUDINARY_PRESET ||
    localStorage.getItem('shrirk_cloudinary_preset') ||
    'shrirk_unsigned'
};

/**
 * Uploads a file (image or video) directly to Cloudinary or returns local DataURL fallback
 * @param {File} file - File object selected from file input or camera
 * @param {Function} onProgress - Progress callback function (0 - 100%)
 * @returns {Promise<{ url: string, type: string, public_id: string }>}
 */
export async function uploadMediaToCloudinary(file, onProgress = () => {}) {
  if (!file) throw new Error("No file selected.");

  const isVideo = file.type.startsWith('video/');
  const mediaType = isVideo ? 'video' : 'image';

  // Check active Cloudinary configuration
  const cloudName =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ||
    localStorage.getItem('shrirk_cloudinary_cloud_name') ||
    CLOUDINARY_CONFIG.cloudName;
  const uploadPreset =
    import.meta.env.VITE_CLOUDINARY_PRESET ||
    localStorage.getItem('shrirk_cloudinary_preset') ||
    CLOUDINARY_CONFIG.uploadPreset;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${mediaType}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    onProgress(15);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      onProgress(85);
      const data = await response.json();
      onProgress(100);
      return {
        url: data.secure_url || data.url,
        type: mediaType,
        public_id: data.public_id
      };
    } else {
      console.warn("Cloudinary upload response not OK. Falling back to local device file reader preview.");
    }
  } catch (err) {
    console.warn("Cloudinary direct network upload failed or unconfigured, using instant device data preview.", err);
  }

  // Fallback: Read local file as DataURL so phone camera/gallery selection works instantly offline
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    reader.onload = () => {
      onProgress(100);
      resolve({
        url: reader.result,
        type: mediaType,
        public_id: `local_${Date.now()}`
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
