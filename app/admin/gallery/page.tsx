"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, UploadCloud, Trash2, Copy, Check, HardDrive } from "lucide-react";
import { ClinicPhoto } from "@/types/supabase";
import {
  deleteGalleryPhoto,
  listGalleryPhotos,
  uploadGalleryPhoto,
} from "@/lib/supabase/data";

export default function StorageGalleryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUploadCategory, setSelectedUploadCategory] = useState<"treatment" | "equipment" | "amenities">("treatment");
  const [photos, setPhotos] = useState<ClinicPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadPhotos = async () => {
      try {
        const nextPhotos = await listGalleryPhotos();
        if (isMounted) {
          setPhotos(nextPhotos);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load clinic photos.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadPhotos();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyUrl = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setErrorMessage("The image URL could not be copied. Please copy it manually.");
    }
  };

  const handleDelete = async (photo: ClinicPhoto) => {
    if (!window.confirm(`Delete ${photo.name}? This cannot be undone.`)) return;

    try {
      await deleteGalleryPhoto(photo.id);
      setPhotos((prev) => prev.filter((currentPhoto) => currentPhoto.id !== photo.id));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete the clinic photo.");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    e.target.value = "";

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("Only JPEG, PNG, and WEBP images are supported.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Images must be 10 MB or smaller.");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    try {
      const newPhoto = await uploadGalleryPhoto(file, selectedUploadCategory);
      setPhotos((currentPhotos) => [newPhoto, ...currentPhotos]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to upload the clinic photo.");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {errorMessage && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FCF8F2] p-6 rounded-3xl border border-[#064E3B]/15 shadow-sm">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#032D22]">
            Supabase Storage Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5D56] mt-1">
            Bucket: <code className="bg-[#064E3B]/10 text-[#064E3B] px-2 py-0.5 rounded font-mono font-bold">clinic-gallery</code> — Upload, manage, and retrieve public asset URLs.
          </p>
        </div>

        <Badge variant="gold" className="self-start sm:self-center font-bold">
          <HardDrive className="h-3.5 w-3.5" />
          Bucket Active
        </Badge>
      </div>

      {/* Drag and Drop Upload Card */}
      <Card className="bg-[#FCF8F2] border-2 border-dashed border-[#064E3B]/30 p-8 text-center hover:border-[#064E3B] transition-colors">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="h-14 w-14 rounded-full bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center">
            <UploadCloud className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#032D22]">
              Upload New Clinic Photo to Supabase Storage
            </h3>
          <p className="text-xs text-[#4A5D56] mt-1">
              Supports PNG, JPG, WEBP up to 10MB per file.
            </p>
          </div>
          <select
            value={selectedUploadCategory}
            onChange={(e) => setSelectedUploadCategory(e.target.value as typeof selectedUploadCategory)}
            className="h-10 rounded-full border border-[#064E3B]/20 bg-white px-4 text-xs font-bold text-[#032D22] focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
            aria-label="Clinic photo category"
          >
            <option value="treatment">Treatment</option>
            <option value="equipment">Equipment</option>
            <option value="amenities">Amenities</option>
          </select>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
            <Button
              type="button"
              asChild
              className="bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-xs rounded-full px-6 py-2.5 shadow-sm pointer-events-none"
            >
              <span>{isUploading ? "Uploading..." : "Select File from Computer"}</span>
            </Button>
          </label>
        </div>
      </Card>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {["all", "treatment", "equipment", "amenities"].map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-bold capitalize rounded-full px-4 h-8 ${
              selectedCategory === cat
                ? "bg-[#064E3B] text-white"
                : "text-[#064E3B] border-[#064E3B]/20"
            }`}
          >
            {cat === "all" ? "All Photos" : cat}
          </Button>
        ))}
      </div>

      {/* Storage Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {!isLoading && filteredPhotos.length === 0 && (
          <Card className="sm:col-span-2 lg:col-span-4 bg-[#FCF8F2] border border-[#064E3B]/10 p-10 text-center">
            <ImageIcon className="mx-auto h-8 w-8 text-[#8A9D96]" />
            <p className="mt-3 text-sm font-bold text-[#032D22]">No clinic photos found</p>
            <p className="mt-1 text-xs text-[#4A5D56]">Upload the first image for this category.</p>
          </Card>
        )}
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="bg-[#FCF8F2] border border-[#064E3B]/15 overflow-hidden group">
            <div className="relative h-44 w-full overflow-hidden bg-black/5">
              <img
                src={photo.url}
                alt={photo.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-[#064E3B] text-white px-2.5 py-0.5 rounded-full shadow">
                {photo.category}
              </span>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h4 className="font-bold text-xs text-[#032D22] truncate">{photo.name}</h4>
                <div className="flex items-center justify-between text-[10px] text-[#4A5D56] mt-1">
                  <span>Size: {photo.size_bytes ? `${(photo.size_bytes / (1024 * 1024)).toFixed(1)} MB` : "Unknown"}</span>
                  <span>{new Date(photo.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#064E3B]/10">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopyUrl(photo.id, photo.url)}
                  className="flex-1 text-[11px] font-bold text-[#064E3B] border-[#064E3B]/20 h-8 rounded-full gap-1"
                >
                  {copiedId === photo.id ? (
                    <>
                      <Check className="h-3 w-3 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy URL
                    </>
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => void handleDelete(photo)}
                  aria-label={`Delete ${photo.name}`}
                  title={`Delete ${photo.name}`}
                  className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
