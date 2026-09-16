'use client';
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";

// 🔥 FIXED FEATURE: Text Input with Inline Color Picker (Now shows BOTH text and color inputs)
 const ColorText = ({ label, textValue, colorValue, onTextChange, onColorChange, isTextArea = false }: any) => {
  // Strictly enforce HEX only. Rejects any attempt to type rgba or hsl.
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Regex allows only '#' followed by 0 to 6 hex characters (0-9, A-F)
    if (/^#?[0-9A-Fa-f]{0,6}$/.test(val)) {
      // Auto-add the '#' if the user starts typing without it
      if (val.length > 0 && !val.startsWith('#')) {
        val = '#' + val;
      }
      onColorChange(val);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-medium text-gray-500">{label}</label>

      {/* 1. TEXT CONTENT INPUT (Restored) */}
      {onTextChange && (
        isTextArea ? (
          <textarea value={textValue || ""} onChange={(e) => onTextChange(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded text-sm min-h-[80px] outline-none focus:border-black resize-y mb-1" />
        ) : (
          <input type="text" value={textValue || ""} onChange={(e) => onTextChange(e.target.value)} className="w-full h-9 bg-gray-50 border border-gray-200 px-3 rounded text-sm outline-none focus:border-black mb-1" />
        )
      )}

      {/* 2. STRICT HEX COLOR PICKER */}
      <div className="flex items-center gap-2">
        {/* Color Pencil / Picker */}
        <div
          className="relative w-8 h-8 rounded border border-gray-300 shrink-0 overflow-hidden shadow-sm"
          style={{ backgroundColor: colorValue || '#000000' }}
        >
          <input
            type="color"
            value={colorValue || "#000000"}
            onChange={e => onColorChange(e.target.value)}
            className="opacity-0 w-full h-full cursor-pointer absolute inset-0"
            title="Change Color"
          />
        </div>

        {/* Text Input (Strictly Hex Only) */}
        <input
          type="text"
          value={colorValue || ""}
          onChange={handleHexInputChange}
          placeholder="#000000"
          maxLength={7}
          className="w-24 h-8 bg-white border border-gray-200 px-2 rounded text-xs font-mono uppercase outline-none focus:border-black"
        />
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Color</span>
      </div>
    </div>
  );
};

// 🔥 NEW FEATURE: Button Configuration (Text, Link, Bg Color, Text Color)
 const ButtonConfig = ({ label, textVal, hrefVal, bgCol, textCol, onText, onHref, onBg, onCol }: any) => {

  // Reusable strict HEX validator. Rejects rgba/hsl and allows only valid hex codes.
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (val: string) => void) => {
    let val = e.target.value;
    if (/^#?[0-9A-Fa-f]{0,6}$/.test(val)) {
      if (val.length > 0 && !val.startsWith('#')) {
        val = '#' + val;
      }
      callback(val);
    }
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</label>

      {/* Top Row: Text and Link Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Button Text" value={textVal || ""} onChange={e => onText(e.target.value)} className="w-full h-9 px-3 border border-gray-200 rounded text-sm outline-none focus:border-black" />
        <input type="text" placeholder="Link (URL)" value={hrefVal || ""} onChange={e => onHref(e.target.value)} className="w-full h-9 px-3 border border-gray-200 rounded text-sm outline-none focus:border-black" />
      </div>

      {/* Bottom Row: Color Configs */}
      <div className="grid grid-cols-2 gap-3">

        {/* Background Color */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Background</span>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded border border-gray-300 overflow-hidden shrink-0" style={{ backgroundColor: bgCol || '#000000' }}>
              <input type="color" value={bgCol || "#000000"} onChange={e => onBg(e.target.value)} className="opacity-0 w-full h-full cursor-pointer absolute inset-0" title="Change Background Color" />
            </div>
            <input
              type="text"
              value={bgCol || ""}
              onChange={e => handleHexChange(e, onBg)}
              placeholder="#000000"
              maxLength={7}
              className="w-full h-8 px-2 bg-white border border-gray-200 rounded text-xs font-mono uppercase outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Text Color */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Text</span>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded border border-gray-300 overflow-hidden shrink-0" style={{ backgroundColor: textCol || '#ffffff' }}>
              <input type="color" value={textCol || "#ffffff"} onChange={e => onCol(e.target.value)} className="opacity-0 w-full h-full cursor-pointer absolute inset-0" title="Change Text Color" />
            </div>
            <input
              type="text"
              value={textCol || ""}
              onChange={e => handleHexChange(e, onCol)}
              placeholder="#FFFFFF"
              maxLength={7}
              className="w-full h-8 px-2 bg-white border border-gray-200 rounded text-xs font-mono uppercase outline-none focus:border-black"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const ImageUploader = ({ label, src, isUploading, onUpload }: { label: string, src: string, isUploading: boolean, onUpload: (e: React.ChangeEvent<HTMLInputElement> | any) => void }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Mocks the React ChangeEvent so your existing handleImageUpload function works instantly
      const mockEvent = {
        target: { files: e.dataTransfer.files }
      };
      onUpload(mockEvent);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-medium text-gray-500">{label}</label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${isDragOver
          ? "border-blue-500 bg-blue-50/50 border-dashed scale-[1.02]"
          : "border-gray-200 bg-gray-50/50 border-solid"
          }`}
      >
        {src && (
          <img
            src={src}
            alt="Preview"
            // pointer-events-none stops the image from interrupting the drag area
            className="w-full h-24 object-contain rounded mb-3 border border-gray-200 bg-white shadow-sm pointer-events-none"
          />
        )}

        <label className={`flex items-center justify-center gap-2 w-full p-2 bg-white border border-gray-200 rounded cursor-pointer text-xs font-medium text-gray-700 transition-colors ${isDragOver ? "ring-2 ring-blue-500/20 text-blue-600" : "hover:bg-gray-50"
          }`}>
          {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}

          {isUploading
            ? "Optimizing & Uploading..."
            : isDragOver
              ? "Drop image here!"
              : "Click or Drag Image"
          }

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
};


const Input = ({ label, value, onChange, isTextArea = false, placeholder = "" }: { label: string, value: string, onChange: (val: string) => void, isTextArea?: boolean, placeholder?: string }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-medium text-gray-500">{label}</label>
    {isTextArea ? (
      <textarea value={value || ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded text-sm min-h-[80px] outline-none focus:border-black resize-y" />
    ) : (
      <input type="text" value={value || ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded text-sm outline-none focus:border-black" />
    )}
  </div>
);

export { ImageUploader , ColorText, ButtonConfig, Input };