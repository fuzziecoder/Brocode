import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoGallery = ({ photos, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([...photos]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const maxPhotos = 6;

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = maxPhotos - selectedPhotos.length;
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhotos(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          caption: ''
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoDelete = (photoId) => {
    setSelectedPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newPhotos = [...selectedPhotos];
    const draggedPhoto = newPhotos[draggedIndex];
    newPhotos.splice(draggedIndex, 1);
    newPhotos.splice(dropIndex, 0, draggedPhoto);

    setSelectedPhotos(newPhotos);
    setDraggedIndex(null);
  };

  const handleSave = () => {
    onUpdate(selectedPhotos);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedPhotos([...photos]);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Photo Gallery</h2>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)} iconName="Edit">
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} iconName="Save">
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {selectedPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 border-border ${
              isEditing ? 'cursor-move' : ''
            }`}
            draggable={isEditing}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <Image
              src={photo.url}
              alt={`Gallery photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-standard">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePhotoDelete(photo.id)}
                    className="w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-standard"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                  <button className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-standard">
                    <Icon name="Move" size={16} />
                  </button>
                </div>
              </div>
            )}

            {index === 0 && (
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                Main
              </div>
            )}
          </div>
        ))}

        {/* Add Photo Slots */}
        {isEditing && selectedPhotos.length < maxPhotos && (
          <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-standard">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <Icon name="Plus" size={24} className="text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground text-center">
              Add Photo<br />
              <span className="text-xs">({selectedPhotos.length}/{maxPhotos})</span>
            </span>
          </label>
        )}
      </div>

      {/* Photo Guidelines */}
      {isEditing && (
        <div className="border-t border-border pt-6">
          <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Photo Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Upload up to {maxPhotos} photos to showcase your personality</li>
                <li>• First photo will be your main profile picture</li>
                <li>• Drag and drop to reorder photos</li>
                <li>• Use clear, recent photos that represent you well</li>
                <li>• Avoid group photos where you're hard to identify</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isEditing && selectedPhotos.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No photos yet</h3>
          <p className="text-muted-foreground mb-4">
            Add some photos to help others get to know you better
          </p>
          <Button variant="outline" onClick={() => setIsEditing(true)} iconName="Plus">
            Add Photos
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;