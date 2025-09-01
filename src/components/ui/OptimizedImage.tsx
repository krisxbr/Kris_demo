import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/classNames';
import { FALLBACK_SVG } from '../../constants';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  sizes,
  priority = false,
  onLoad,
  onError,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setCurrentSrc(fallbackSrc || FALLBACK_SVG);
    onError?.();
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('unsplash.com')) {
      return [
        `${baseSrc}&w=400 400w`,
        `${baseSrc}&w=800 800w`,
        `${baseSrc}&w=1200 1200w`,
        `${baseSrc}&w=1600 1600w`
      ].join(', ');
    }
    return undefined;
  };

  return (
    <motion.img
      src={currentSrc}
      srcSet={generateSrcSet(currentSrc)}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={classNames(
        'transition-opacity duration-300',
        className
      )}
      {...rest}
    />
  );
};