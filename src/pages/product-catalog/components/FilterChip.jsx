import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChip = ({ label, count, onRemove, isActive = true }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth ${
      isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted text-muted-foreground'
    }`}>
      <span>{label}</span>
      {count && (
        <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {count}
        </span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-white/20 rounded-full p-0.5 transition-smooth"
          aria-label="Remove filter"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
};

export default FilterChip;