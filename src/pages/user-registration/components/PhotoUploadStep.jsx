import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoUploadStep = ({ 
  formData, 
  setFormData, 
  errors, 
  onNext, 
  onBack, 
  isLoading 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          profilePhoto: e.target.result,
          photoFile: file 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ 
      ...prev, 
      profilePhoto: null,
      photoFile: null 
    }));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    // Mock camera functionality
    console.log('Camera access requested');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Add Your Photo</h2>
        <p className="text-muted-foreground">A profile photo helps others recognize you (optional)</p>
      </div>

      <div className="space-y-4">
        {formData.profilePhoto ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Image
                src={formData.profilePhoto}
                alt="Profile preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-border"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-standard"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <Button
              variant="outline"
              onClick={openFileDialog}
              iconName="Camera"
              iconPosition="left"
            >
              Change Photo
            </Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-standard ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Icon name="Camera" size={24} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-foreground font-medium mb-1">Drop your photo here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={openFileDialog}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Choose File
                </Button>
                <Button
                  variant="outline"
                  onClick={openCamera}
                  iconName="Camera"
                  iconPosition="left"
                  className="sm:hidden"
                >
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {errors.profilePhoto && (
          <p className="text-sm text-destructive text-center">{errors.profilePhoto}</p>
        )}
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Photo Guidelines:</p>
            <ul className="space-y-1">
              <li>• Use a clear, recent photo of yourself</li>
              <li>• Face should be clearly visible</li>
              <li>• No group photos or inappropriate content</li>
              <li>• Maximum file size: 5MB</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          variant="default"
          onClick={onNext}
          loading={isLoading}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadStep;