import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BasicInfoStep = ({ 
  formData, 
  setFormData, 
  errors, 
  onNext, 
  isLoading 
}) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
        <p className="text-muted-foreground">Join the brotherhood and connect with like-minded men</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          description="Must be at least 8 characters with numbers and letters"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />
      </div>

      <Button
        variant="default"
        fullWidth
        onClick={onNext}
        loading={isLoading}
        className="mt-8"
      >
        Continue
      </Button>
    </div>
  );
};

export default BasicInfoStep;