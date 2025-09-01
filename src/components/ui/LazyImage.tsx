import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { SkeletonLoader } from './SkeletonLoader';
import { classNames } from '../../utils/classNames';
import { FALLBACK_SVG } from '../../constants';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: string;
  showSkeleton?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  aspectRatio = 'aspect-[3/2]',
  showSkeleton = true,
  ...rest
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  React.useEffect(() => {
    if (isIntersecting && !currentSrc) {
      setCurrentSrc(src);
    }
  }, [isIntersecting, src, currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setCurrentSrc(fallbackSrc || FALLBACK_SVG);
  };

  return (
    <div ref={ref} className={classNames("relative overflow-hidden", aspectRatio, className)}>
      {showSkeleton && !isLoaded && (
        <SkeletonLoader className="absolute inset-0" />
      )}
      
      {currentSrc && (
        <motion.img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={classNames(
            "absolute inset-0 h-full w-full object-cover",
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading="lazy"
          {...rest}
        />
      )}
      
      {hasError && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-500">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-xs">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};