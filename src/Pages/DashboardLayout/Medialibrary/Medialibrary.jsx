import { useState, useMemo } from "react";
import { MdDelete, MdSearch,  MdImage, MdDownload,  MdFileCopy, MdFileDownload } from "react-icons/md";
import Image1 from '../../../assets/grocery_product_img_1.webp'
import Image2 from '../../../assets/grocery_product_img_2.webp'
import Image3 from '../../../assets/grocery_product_img_3.webp'
import Image4 from '../../../assets/grocery_product_img_4.webp'
import Image5 from '../../../assets/grocery_product_img_5.webp'
import Image6 from '../../../assets/grocery_product_img_6.webp'

const MediaLibrary = () => {
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      name: "organic-rice-01.jpg",
      type: "image/jpeg",
      size: 2048576,
      uploadDate: "2024-06-15",
      url: Image1,
      category: "Products",
    },
    {
      id: 2,
      name: "basmati-rice.png",
      type: "image/png",
      size: 1524288,
      uploadDate: "2024-06-14",
      url: Image2,
      category: "Products",
    },
    {
      id: 3,
      name: "flour-package.jpg",
      type: "image/jpeg",
      size: 1835008,
      uploadDate: "2024-06-13",
      url: Image3,
      category: "Products",
    },
    {
      id: 4,
      name: "spices-mix.jpg",
      type: "image/jpeg",
      size: 3145728,
      uploadDate: "2024-06-12",
      url: Image4,
      category: "Products",
    },
    {
      id: 5,
      name: "dairy-products.png",
      type: "image/png",
      size: 2621440,
      uploadDate: "2024-06-11",
      url: Image5,
      category: "Products",
    },
    {
      id: 6,
      name: "promotional-banner.jpg",
      type: "image/jpeg",
      size: 4194304,
      uploadDate: "2024-06-10",
      url: Image6,
      category: "Banners",
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Get unique categories
  const categories = ["all", ...new Set(mediaItems.map((item) => item.category))];

  // Filter media items
  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchSearch = item.name 
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [mediaItems, searchValue, selectedCategory]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalSize = mediaItems.reduce((sum, item) => sum + item.size, 0);
    const totalCount = mediaItems.length;
    const imageCount = mediaItems.filter((item) => item.type.startsWith("image/")).length;

    return {
      totalSize,
      totalCount,
      imageCount,
      fileCount: totalCount - imageCount,
    };
  }, [mediaItems]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      setMediaItems(mediaItems.filter((item) => item.id !== id));
      if (selectedMedia?.id === id) {
        setSelectedMedia(null);
      }
      alert("Media deleted successfully!");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const addMediaFiles = (files) => {
    const fileArray = Array.from(files).slice(0, 5);
    if (fileArray.length === 0) return;

    setMediaItems((prevItems) => {
      const nextId = Math.max(...prevItems.map((m) => m.id), 0);
      const newMediaItems = fileArray.map((file, index) => ({
        id: nextId + index + 1,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        url: URL.createObjectURL(file),
        category: "Products",
      }));
      return [...prevItems, ...newMediaItems];
    });

    alert("Files uploaded successfully!");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    addMediaFiles(files);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    addMediaFiles(files);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const isImage = (type) => type.startsWith("image/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
          <p className="text-slate-400">Upload and manage your product images and files</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Items</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalCount}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Images</p>
            <p className="text-3xl font-bold text-purple-500 mt-2">{stats.imageCount}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Files</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{stats.fileCount}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Size</p>
            <p className="text-3xl font-bold text-amber-500 mt-2">
              {formatFileSize(stats.totalSize)}
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center transition-all ${
            dragActive
              ? "border-amber-500 bg-amber-500/10"
              : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
          }`}
        >
          <MdFileDownload className="mx-auto text-4xl text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Drag & drop your files here
          </h3>
          <p className="text-slate-400 mb-4">or</p>
          <label className="inline-block">
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer">
              Browse Files
            </button>
          </label>
          <p className="text-slate-500 text-sm mt-4">
            Supported: JPG, PNG, GIF, PDF, DOC (Max 5 files at a time)
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Search</label>
              <div className="relative">
                <MdSearch className="absolute left-4 top-3 text-slate-500 text-lg" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search media files..."
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg pl-12 pr-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {filteredMedia.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMedia.map((media) => (
              <div
                key={media.id}
                onClick={() => setSelectedMedia(media)}
                className={`bg-slate-800 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedMedia?.id === media.id
                    ? "border-amber-500 ring-2 ring-amber-500"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative h-32 bg-slate-900 flex items-center justify-center">
                  {isImage(media.type) ? (
                    <img
                      src={media.url}
                      alt={media.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MdFileCopy className="text-4xl text-slate-500" />
                  )}
                  <span className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-xs font-semibold text-slate-200">
                    {media.type.split("/")[1]?.toUpperCase() || "FILE"}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-white font-semibold text-sm truncate mb-2">
                    {media.name}
                  </p>
                  <div className="text-xs text-slate-400 space-y-1 mb-4">
                    <p>Size: {formatFileSize(media.size)}</p>
                    <p>Date: {media.uploadDate}</p>
                    <p className="text-amber-400">{media.category}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const link = document.createElement("a");
                        link.href = media.url;
                        link.download = media.name;
                        link.click();
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded flex items-center justify-center gap-1 text-xs font-semibold transition-colors"
                    >
                      <MdDownload size={14} /> Download
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(media.id);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded flex items-center justify-center gap-1 text-xs font-semibold transition-colors"
                    >
                      <MdDelete size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <MdImage className="mx-auto text-5xl text-slate-500 mb-4" />
            <p className="text-slate-400 text-lg">No media files found</p>
            <p className="text-slate-500 text-sm mt-2">
              Upload some images or files to get started
            </p>
          </div>
        )}

        {/* Selected Media Preview */}
        {selectedMedia && (
          <div className="fixed bottom-0 right-0 w-full md:w-80 bg-slate-800 border-t border-l border-slate-700 p-6 rounded-tl-xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Preview</h3>
              <button
                onClick={() => setSelectedMedia(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {isImage(selectedMedia.type) && (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <span className="font-semibold">Name:</span> {selectedMedia.name}
              </p>
              <p>
                <span className="font-semibold">Size:</span> {formatFileSize(selectedMedia.size)}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {selectedMedia.type}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {selectedMedia.uploadDate}
              </p>
              <p>
                <span className="font-semibold">Category:</span> {selectedMedia.category}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;