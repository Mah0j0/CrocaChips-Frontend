import React from "react";
import {Skeleton} from "../../../shared/ui/skeleton";

 export const InfoCard = ({
                        icon,
                        title,
                        value,
                        isLoading
                    }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    isLoading: boolean;
}) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {isLoading ? <Skeleton className="w-16 h-6" /> :icon}
        </div>

        <div className="mt-5">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        { isLoading ? <Skeleton className="w-16 h-6" /> : title}
      </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90 min-h-[28px] flex items-center">
                {isLoading ? <Skeleton className="w-16 h-6" /> : value}
            </h4>
        </div>
    </div>
);