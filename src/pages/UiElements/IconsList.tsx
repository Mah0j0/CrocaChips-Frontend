import React from "react";
import * as Icons from "../../icons";

const IconsList: React.FC = () => {
    return (
        <div className="grid grid-cols-4 gap-6">
            {Object.entries(Icons).map(([iconName, IconComponent]) => (
                <div
                    key={iconName}
                    className="flex flex-col items-center justify-center space-y-2"
                >
                    <IconComponent className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
            {iconName}
          </span>
                </div>
            ))}
        </div>
    );
};

export default IconsList;