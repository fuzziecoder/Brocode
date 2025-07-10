import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Marcus Thompson',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      text: `BroCode helped me find my tribe when I moved to Seattle. The guys I met through basketball meetups became my closest friends. It's more than an app - it's a brotherhood.`,
      rating: 5,
      badge: 'Verified Member'
    },
    {
      id: 2,
      name: 'Ryan Martinez',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      text: `As an introvert, making friends was always tough. BroCode's interest-based matching connected me with like-minded guys who share my passion for gaming and tech.`,
      rating: 5,
      badge: 'Community Leader'
    },
    {
      id: 3,
      name: 'Kevin Park',location: 'Denver, CO',avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',text: `The hiking group I joined through BroCode has become my weekend family. We've conquered 15 peaks together and built friendships that will last a lifetime.`,
      rating: 5,
      badge: 'Event Organizer'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTest = testimonials[currentTestimonial];

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">What Bros Are Saying</h3>
        <p className="text-sm text-muted-foreground">Real stories from our community</p>
      </div>

      <div className="relative">
        <div className="text-center mb-6">
          <Image
            src={currentTest.avatar}
            alt={currentTest.name}
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
          />
          
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(currentTest.rating)].map((_, i) => (
              <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
            ))}
          </div>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="font-medium text-foreground">{currentTest.name}</span>
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-full">
              <Icon name="Shield" size={12} className="text-primary" />
              <span className="text-xs text-primary font-medium">{currentTest.badge}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-1 mb-4">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{currentTest.location}</span>
          </div>
        </div>

        <blockquote className="text-sm text-muted-foreground text-center italic leading-relaxed mb-6">
          "{currentTest.text}"
        </blockquote>

        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-standard ${
                index === currentTestimonial ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/10">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">98% Member Satisfaction Rate</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;