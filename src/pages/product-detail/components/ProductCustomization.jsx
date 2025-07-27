import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductCustomization = ({ product, currentLanguage, onCustomizationChange }) => {
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('arial');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const fontOptions = [
    { value: 'arial', label: 'Arial' },
    { value: 'helvetica', label: 'Helvetica' },
    { value: 'times', label: 'Times New Roman' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'verdana', label: 'Verdana' }
  ];

  const colorOptions = [
    { value: '#000000', label: currentLanguage === 'en' ? 'Black' : 'أسود' },
    { value: '#FFFFFF', label: currentLanguage === 'en' ? 'White' : 'أبيض' },
    { value: '#FF0000', label: currentLanguage === 'en' ? 'Red' : 'أحمر' },
    { value: '#0000FF', label: currentLanguage === 'en' ? 'Blue' : 'أزرق' },
    { value: '#008000', label: currentLanguage === 'en' ? 'Green' : 'أخضر' },
    { value: '#D4AF37', label: currentLanguage === 'en' ? 'Gold' : 'ذهبي' }
  ];

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCustomText(text);
    updateCustomization({ text, font: selectedFont, color: selectedColor, image: uploadedImage });
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    updateCustomization({ text: customText, font, color: selectedColor, image: uploadedImage });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    updateCustomization({ text: customText, font: selectedFont, color, image: uploadedImage });
  };

  const updateCustomization = (customization) => {
    if (onCustomizationChange) {
      onCustomizationChange(customization);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageUrl = e.target.result;
              setUploadedImage(imageUrl);
              updateCustomization({ text: customText, font: selectedFont, color: selectedColor, image: imageUrl });
            };
            reader.readAsDataURL(file);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setUploadProgress(0);
    updateCustomization({ text: customText, font: selectedFont, color: selectedColor, image: null });
  };

  if (!product.customizable) {
    return null;
  }

  return (
    <div className="bg-surface rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Icon name="Palette" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {currentLanguage === 'en' ? 'Customize Your Product' : 'خصص منتجك'}
        </h3>
      </div>

      {/* Custom Text Input */}
      <div className="space-y-3">
        <Input
          label={currentLanguage === 'en' ? 'Custom Text' : 'النص المخصص'}
          type="text"
          placeholder={currentLanguage === 'en' ? 'Enter your custom text...' : 'أدخل النص المخصص...'}
          value={customText}
          onChange={handleTextChange}
          description={currentLanguage === 'en' ? 'Maximum 50 characters' : 'الحد الأقصى 50 حرف'}
          maxLength={50}
        />
        <div className="text-xs text-text-secondary text-right rtl:text-left">
          {customText.length}/50
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-3">
        <Select
          label={currentLanguage === 'en' ? 'Font Style' : 'نمط الخط'}
          options={fontOptions}
          value={selectedFont}
          onChange={handleFontChange}
        />
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <Select
          label={currentLanguage === 'en' ? 'Text Color' : 'لون النص'}
          options={colorOptions}
          value={selectedColor}
          onChange={handleColorChange}
        />
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div 
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: selectedColor }}
          ></div>
          <span className="text-sm text-text-secondary">
            {currentLanguage === 'en' ? 'Selected Color' : 'اللون المحدد'}
          </span>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          {currentLanguage === 'en' ? 'Upload Image' : 'رفع صورة'}
        </label>
        
        {!uploadedImage ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              isDragging 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary mb-2">
              {currentLanguage === 'en' ?'Drag and drop an image here, or click to select' :'اسحب وأفلت صورة هنا، أو انقر للاختيار'
              }
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              id="image-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('image-upload').click()}
            >
              {currentLanguage === 'en' ? 'Select Image' : 'اختر صورة'}
            </Button>
            <p className="text-xs text-text-secondary mt-2">
              {currentLanguage === 'en' ?'Supported formats: JPG, PNG, GIF (Max 5MB)' :'الصيغ المدعومة: JPG, PNG, GIF (الحد الأقصى 5 ميجابايت)'
              }
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="border border-border rounded-lg p-4 bg-background">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded customization" 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {currentLanguage === 'en' ? 'Image uploaded successfully' : 'تم رفع الصورة بنجاح'}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {currentLanguage === 'en' ? 'Ready for customization' : 'جاهز للتخصيص'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeUploadedImage}
                  iconName="X"
                />
              </div>
            </div>
          </div>
        )}

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">
                {currentLanguage === 'en' ? 'Uploading...' : 'جاري الرفع...'}
              </span>
              <span className="text-text-secondary">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      {(customText || uploadedImage) && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            {currentLanguage === 'en' ? 'Preview:' : 'معاينة:'}
          </h4>
          <div className="border border-border rounded-lg p-4 bg-background min-h-[100px] flex items-center justify-center">
            <div className="text-center space-y-2">
              {uploadedImage && (
                <img 
                  src={uploadedImage} 
                  alt="Preview" 
                  className="max-w-[80px] max-h-[80px] object-contain mx-auto"
                />
              )}
              {customText && (
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: selectedFont,
                    color: selectedColor 
                  }}
                >
                  {customText}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCustomization;