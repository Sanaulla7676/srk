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
 * Downscales an image file to a max dimension and re-encodes it as a
 * compressed JPEG data URL. Phone camera photos are routinely 3-8MB;
 * stored raw as base64 that blows past the ~5-10MB per-origin
 * localStorage quota after just one or two uploads. This keeps the
 * fallback path (used whenever Cloudinary isn't configured) safely
 * small, typically under 200KB.
 */
function compressImageToDataUrl(file, maxDimension = 1000, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read the selected image.'));
    };
    img.src = objectUrl;
  });
}

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

  // Fallback: images are downscaled + compressed to stay well under the
  // localStorage quota; videos (which can't be canvas-compressed) fall
  // back to a raw DataURL read so phone camera/gallery selection still
  // works instantly offline.
  if (!isVideo) {
    onProgress(50);
    const dataUrl = await compressImageToDataUrl(file);
    onProgress(100);
    return { url: dataUrl, type: mediaType, public_id: `local_${Date.now()}` };
  }

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
