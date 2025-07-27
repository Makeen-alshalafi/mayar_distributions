import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ images, productName, currentLanguage }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-surface rounded-lg overflow-hidden">
        <div className="aspect-square relative group">
          <Image
            src={images[selectedImageIndex]}
            alt={`${productName} - ${currentLanguage === 'en' ? 'Image' : 'صورة'} ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-elevated"
              >
                <Icon name="ChevronLeft" size={20} className="text-foreground" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-elevated"
              >
                <Icon name="ChevronRight" size={20} className="text-foreground" />
              </button>
            </>
          )}

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 bg-background/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} className="text-foreground" />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-background/80 rounded-full px-3 py-1 text-sm font-medium text-foreground">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-primary shadow-subtle'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} ${currentLanguage === 'en' ? 'thumbnail' : 'مصغرة'} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;