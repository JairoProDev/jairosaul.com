'use client';

import { useState } from 'react';

interface ProfileImageProps {
  className?: string;
  alt?: string;
}

export default function ProfileImage({ className = "", alt = "Profile" }: ProfileImageProps) {
  const [imageSrc, setImageSrc] = useState('/images/profile.webp');
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImageSrc('/images/profile-optimized.jpg');
      setHasError(true);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
