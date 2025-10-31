'use client';

import { useState } from 'react';
import Image from 'next/image';

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
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      width={400}
      height={400}
      priority
    />
  );
}
