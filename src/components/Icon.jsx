import React from 'react';
import * as Icons from 'lucide-react';

export const Icon = ({ name, className = "w-4 h-4", ...props }) => {
  if (!name) return null;
  const pascalName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const Component = Icons[pascalName] || Icons[name] || Icons.Sparkles;
  return <Component className={className} {...props} />;
};
