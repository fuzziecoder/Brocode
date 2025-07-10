import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import SocialProof from './components/SocialProof';
import BasicInfoStep from './components/BasicInfoStep';
import ProfileInfoStep from './components/ProfileInfoStep';
import InterestsStep from './components/InterestsStep';
import PhotoUploadStep from './components/PhotoUploadStep';
import FinalStep from './components/FinalStep';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    age: '',
    location: '',
    interests: [],
    customInterest: '',
    profilePhoto: null,
    photoFile: null,
    acceptTerms: false,
    newsletter: false
  });

  const totalSteps = 5;

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo(0, 0);
  }, [currentStep]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
          newErrors.password = 'Password must contain both letters and numbers';
        }

        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 2:
        if (!formData.displayName) {
          newErrors.displayName = 'Display name is required';
        } else if (formData.displayName.length < 2) {
          newErrors.displayName = 'Display name must be at least 2 characters';
        }

        if (!formData.age) {
          newErrors.age = 'Age is required';
        } else if (parseInt(formData.age) < 18) {
          newErrors.age = 'You must be at least 18 years old';
        } else if (parseInt(formData.age) > 100) {
          newErrors.age = 'Please enter a valid age';
        }

        if (!formData.location) {
          newErrors.location = 'Location is required';
        }
        break;

      case 3:
        if (!formData.interests || formData.interests.length === 0) {
          newErrors.interests = 'Please select at least one interest';
        }
        break;

      case 4:
        // Photo is optional, no validation needed
        break;

      case 5:
        if (!formData.acceptTerms) {
          newErrors.acceptTerms = 'You must accept the terms and conditions';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsLoading(true);
      
      try {
        // Simulate registration API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock successful registration
        console.log('Registration successful:', formData);
        
        // Redirect to login with success message
        navigate('/user-login', { 
          state: { 
            message: 'Registration successful! Please check your email for verification.',
            email: formData.email 
          }
        });
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <ProfileInfoStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <InterestsStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      case 4:
        return (
          <PhotoUploadStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      case 5:
        return (
          <FinalStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Main Registration Form */}
              <div className="order-2 lg:order-1">
                <div className="max-w-md mx-auto lg:mx-0">
                  {renderStep()}
                </div>
              </div>

              {/* Social Proof Sidebar */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-24">
                  <SocialProof />
                  
                  {/* Desktop Welcome Message */}
                  <div className="hidden lg:block mt-8 bg-card rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-3">Welcome to BroCode</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p>Connect with genuine men seeking meaningful friendships</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p>Join local events and activities in your area</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p>Build a supportive brotherhood community</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p>Safe and verified platform with community guidelines</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;