"use client";
import { useState } from "react";

// This component must be a client component
interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // optional Validation

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Invalid file type. Please upload a video file.");
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("File size exceeds 100MB limit.");
        }
        return true;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <input
                type="file"
                accept={"video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
            />
            {uploading && <p>Uploading...</p>}
        </>
    );
};

export default FileUpload;
