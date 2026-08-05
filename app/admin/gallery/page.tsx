"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, UploadCloud, Trash2, Copy, Check, ExternalLink, HardDrive } from "lucide-react";

export default function StorageGalleryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [photos, setPhotos] = useState([
    {
      id: "IMG-001",
      name: "Manual Therapy Plinth Suite",
      category: "treatment",
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      size: "1.4 MB",
      uploaded_at: "2026-08-01",
    },
    {
      id: "IMG-002",
      name: "Electrotherapy Pain Station",
      category: "equipment",
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      size: "2.1 MB",
      uploaded_at: "2026-08-02",
    },
    {
      id: "IMG-003",
      name: "Air-Conditioned Reception Lounge",
      category: "amenities",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      size: "1.8 MB",
      uploaded_at: "2026-08-03",
    },
    {
      id: "IMG-004",
      name: "Pediatric Motor Activity Zone",
      category: "treatment",
      url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      size: "1.9 MB",
      uploaded_at: "2026-08-04",
    },
  ]);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newAsset = {
      id: `IMG-${Date.now().toString().slice(-4)}`,
      name: file.name.replace(/\.[^/.]+$/, ""),
      category: "treatment",
      url: URL.createObjectURL(file),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploaded_at: "Just now",
    };

    setPhotos([newAsset, ...photos]);
  };

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
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
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSimulatedUpload}
            />
            <Button
              type="button"
              asChild
              className="bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-xs rounded-full px-6 py-2.5 shadow-sm pointer-events-none"
            >
              <span>Select File from Computer</span>
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
                  <span>Size: {photo.size}</span>
                  <span>{photo.uploaded_at}</span>
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
                  onClick={() => handleDelete(photo.id)}
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
