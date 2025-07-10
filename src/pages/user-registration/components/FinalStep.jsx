import React from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FinalStep = ({ 
  formData, 
  setFormData, 
  errors, 
  onSubmit, 
  onBack, 
  isLoading 
}) => {
  const handleTermsChange = (checked) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }));
  };

  const handleNewsletterChange = (checked) => {
    setFormData(prev => ({ ...prev, newsletter: checked }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Almost There!</h2>
        <p className="text-muted-foreground">Review your information and complete registration</p>
      </div>

      {/* Registration Summary */}
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-foreground mb-4">Registration Summary:</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Email:</span>
            <p className="font-medium text-foreground">{formData.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Display Name:</span>
            <p className="font-medium text-foreground">{formData.displayName}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Age:</span>
            <p className="font-medium text-foreground">{formData.age}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Location:</span>
            <p className="font-medium text-foreground">{formData.location}</p>
          </div>
        </div>

        {formData.interests && formData.interests.length > 0 && (
          <div>
            <span className="text-muted-foreground text-sm">Interests:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {formData.interests.slice(0, 5).map((interest, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                >
                  {interest}
                </span>
              ))}
              {formData.interests.length > 5 && (
                <span className="text-muted-foreground text-xs">
                  +{formData.interests.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By checking this box, you agree to our community guidelines and data usage policies"
          checked={formData.acceptTerms || false}
          onChange={(e) => handleTermsChange(e.target.checked)}
          error={errors.acceptTerms}
          required
        />

        <Checkbox
          label="Send me updates about new features and community events"
          description="Optional: Stay informed about BroCode updates and local events"
          checked={formData.newsletter || false}
          onChange={(e) => handleNewsletterChange(e.target.checked)}
        />
      </div>

      {/* Security Notice */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-success mb-1">Secure Registration</p>
            <p className="text-success/80">
              Your information is encrypted and protected. We'll send a verification email to confirm your account.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
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
          onClick={onSubmit}
          loading={isLoading}
          className="flex-1"
          disabled={!formData.acceptTerms}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>
      </div>

      {/* Login Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={() => window.location.href = '/user-login'}
            className="text-primary hover:text-primary/80 font-medium transition-standard"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default FinalStep;