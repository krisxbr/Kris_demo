import React, { useState, useEffect } from 'react';
import { FALLBACK_SVG } from '../../constants';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className, fallbackSrc, ...rest }) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleError = () => {
    setCurrentSrc(fallbackSrc || FALLBACK_SVG);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
      {...rest}
    />
  );
};
