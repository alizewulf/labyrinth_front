
"use client";

import { useEffect, useRef, useState } from "react";
import { API } from "@/shared/api/axios";

interface DoctorAvatarFormProps {
  avatarUrl: string | null;
  onUploaded: (avatarUrl: string | null) => void;
}

export default function DoctorAvatarForm({
  avatarUrl,
  onUploaded,
}: DoctorAvatarFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleFileChange(selectedFile: File | undefined) {
    setError(null);
    setSuccess(null);

    if (!selectedFile) return;

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type)
    ) {
      setFile(null);
      setPreview(null);
      setError("Please select a JPEG, PNG, or WebP image.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);
      setPreview(null);
      setError("Image size must not exceed 5 MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await API.patch("/doctors/me/avatar", formData);

      onUploaded(response.data.avatar_url ?? null);
      setFile(null);
      setPreview(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      setSuccess("Profile photo updated successfully.");
    } catch {
      setError("Failed to upload photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {preview || avatarUrl ? (
          <img
            src={preview ?? avatarUrl ?? ""}
            alt="Doctor profile"
            className="h-24 w-24 rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border text-sm text-gray-500">
            No photo
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="avatar"
            className="block text-sm font-medium"
          >
            Profile Photo
          </label>

          <input
            ref={inputRef}
            id="avatar"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) =>
              handleFileChange(event.currentTarget.files?.[0])
            }
            className="block max-w-full text-sm"
          />

          <p className="text-xs text-gray-500">
            JPEG, PNG, or WebP. Maximum size: 5 MB.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-sm text-green-700">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={!file || isUploading}
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-50"
      >
        {isUploading ? "Uploading..." : "Upload Photo"}
      </button>
    </form>
  );
}
