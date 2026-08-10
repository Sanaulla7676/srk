import React, { useState, useRef } from 'react';
import { uploadMediaToCloudinary } from '../services/cloudinary';

export default function MediaUploader({
  onMediaUploaded,
  allowedTypes = 'image/*',
  label = 'Upload Image/Video from Device (Phone/PC)'
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(10);

    try {
      const result = await uploadMediaToCloudinary(file, (pct) => setProgress(pct));
      setPreviewUrl(result.url);
      setMediaType(result.type);
      setIsUploading(false);
      onMediaUploaded(result.url, result.type);
    } catch (err) {
      alert("Error processing file upload: " + err.message);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-[11px] font-extrabold uppercase text-gray-700 dark:text-gray-300">
        <i className="fa-solid fa-cloud-arrow-up text-brandPink mr-1.5"></i>
        {label}
      </label>

      {/* Dropzone & Device Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          previewUrl
            ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-brandPink bg-gray-50 dark:bg-gray-800/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes}
          onChange={handleFileChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-2 py-2">
            <i className="fa-solid fa-spinner animate-spin text-brandPink text-2xl"></i>
            <p className="text-xs font-bold text-gray-600 dark:text-gray-300">
              Uploading to Cloudinary... ({progress}%)
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="bg-brandPink h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : previewUrl ? (
          <div className="flex flex-col items-center gap-2">
            {mediaType === 'video' ? (
              <video src={previewUrl} controls className="h-28 rounded object-cover shadow" />
            ) : (
              <img src={previewUrl} alt="Preview" className="h-28 rounded object-cover shadow" />
            )}
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <i className="fa-solid fa-circle-check"></i>
              <span>File Uploaded & Attached!</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewUrl('');
                onMediaUploaded('', 'image');
              }}
              className="text-[10px] text-red-500 hover:underline font-bold"
            >
              Remove & Choose Another
            </button>
          </div>
        ) : (
          <div className="py-3 space-y-1">
            <i className="fa-solid fa-mobile-screen-button text-2xl text-brandPink mb-1"></i>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Tap to Take Photo/Video or Choose from Phone Gallery
            </p>
            <p className="text-[10px] text-gray-400">Supports JPG, PNG, WEBP, MP4, MOV</p>
          </div>
        )}
      </div>
    </div>
  );
}
