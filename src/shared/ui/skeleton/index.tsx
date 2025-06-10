import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
    <div className={`bg-gray-200 rounded-md animate-pulse dark:bg-gray-700 ${className}`} />
);