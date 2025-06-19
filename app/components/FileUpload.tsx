"use client";
import { upload } from "@imagekit/next";
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
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) {
            return;
        }
        setUploading(true);
        setError(null);

        try {
            const authRes = await fetch("/api/auth/imagekit-auth");
            const auth = await authRes.json();

            const response = await upload({
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                signature: auth.signature,
                expire: auth.expire,
                token: auth.token,

                onProgress: (event) => {
                    if (event.lengthComputable && setProgress) {
                        const persent = (event.loaded / event.total) * 100;

                        onProgress(Math.round(persent));
                    }
                },
                abortSignal: abortController.signal,
            });
            onSuccess(response);
        } catch (error) {
            console.error("Upload failed:", error);
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
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
