import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, route, color = "primary" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-standard cursor-pointer" onClick={handleClick}>
      <div className="flex items-center space-x-3 mb-3">
        <div className={`w-10 h-10 bg-${color} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="w-full">
        <Icon name="ArrowRight" size={16} className="ml-2" />
      </Button>
    </div>
  );
};

export default QuickActionCard;