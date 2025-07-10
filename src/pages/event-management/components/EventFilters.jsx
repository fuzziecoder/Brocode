import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventFilters = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'outdoor', label: 'Outdoor Adventures' },
    { value: 'food', label: 'Food & Drinks' },
    { value: 'tech', label: 'Technology' },
    { value: 'music', label: 'Music & Arts' },
    { value: 'business', label: 'Business & Networking' },
    { value: 'social', label: 'Social Hangouts' }
  ];

  const distanceOptions = [
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
    { value: '50', label: 'Within 50 miles' },
    { value: 'any', label: 'Any distance' }
  ];

  const groupSizeOptions = [
    { value: 'all', label: 'Any size' },
    { value: 'small', label: 'Small (2-10 people)' },
    { value: 'medium', label: 'Medium (11-25 people)' },
    { value: 'large', label: 'Large (26+ people)' }
  ];

  const timeOptions = [
    { value: 'all', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this_week', label: 'This week' },
    { value: 'this_weekend', label: 'This weekend' },
    { value: 'next_week', label: 'Next week' },
    { value: 'custom', label: 'Custom date range' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: '',
      category: 'all',
      distance: 'any',
      groupSize: 'all',
      time: 'all',
      dateFrom: '',
      dateTo: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border shadow-elevation-3 lg:relative lg:w-80 lg:shadow-elevation-1 lg:rounded-lg lg:border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Filters</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
          {/* Search */}
          <div>
            <Input
              label="Search events"
              type="search"
              placeholder="Event name, description..."
              value={localFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <Select
              label="Category"
              options={categoryOptions}
              value={localFilters.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
          </div>

          {/* Distance */}
          <div>
            <Select
              label="Distance"
              options={distanceOptions}
              value={localFilters.distance}
              onChange={(value) => handleFilterChange('distance', value)}
            />
          </div>

          {/* Group Size */}
          <div>
            <Select
              label="Group size"
              options={groupSizeOptions}
              value={localFilters.groupSize}
              onChange={(value) => handleFilterChange('groupSize', value)}
            />
          </div>

          {/* Time */}
          <div>
            <Select
              label="When"
              options={timeOptions}
              value={localFilters.time}
              onChange={(value) => handleFilterChange('time', value)}
            />
          </div>

          {/* Custom Date Range */}
          {localFilters.time === 'custom' && (
            <div className="space-y-4">
              <Input
                label="From date"
                type="date"
                value={localFilters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
              <Input
                label="To date"
                type="date"
                value={localFilters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;