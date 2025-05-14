import React, { useState } from 'react';

// --- Optional: SVG Icon ---
// You can replace this with an icon from a library like Heroicons or Font Awesome
const ExclamationTriangleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        // Adjust size and color as needed within the parent component's styling
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
    </svg>
);

// --- Component Props Interface ---
interface ErrorDisplayProps {
    /** The main error message to display to the user. */
    message: string;
    /** Optional: A title for the error box (e.g., "Authentication Failed"). */
    title?: string;
    /** Optional: The raw error object (e.g., from a catch block or API response) for technical details. */
    error?: any; // Can be Error object, string, or custom error structure
    /** Optional: Additional Tailwind classes for positioning or custom styling. */
    className?: string;
}

// --- ErrorDisplay Component ---
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
                                                       message,
                                                       title,
                                                       error,
                                                       className = '',
                                                   }) => {
    const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility

    // Helper function to format the error details for display
    const formatErrorDetails = (err: any): string => {
        if (!err) return 'No additional details provided.';
        if (err instanceof Error) {
            // Standard JavaScript Error object
            return `Type: ${err.name}\nMessage: ${err.message}\nStack:\n${
                err.stack ?? 'Not available' // Optional chaining for stack
            }`;
        }
        if (typeof err === 'object') {
            // Try to pretty-print JSON objects (like API error responses)
            try {
                // Check for common properties like status, data, etc.
                let details = '';
                if (err.status) details += `Status: ${err.status}\n`;
                if (err.statusText) details += `Status Text: ${err.statusText}\n`;
                // Show response data if available (might be large)
                if (err.data) details += `Data: ${JSON.stringify(err.data, null, 2)}\n`;
                // Fallback to stringifying the whole object if specific keys aren't found
                if (!details) details = JSON.stringify(err, null, 2);
                return details.trim();
            } catch (e) {
                return 'Could not stringify the error object.';
            }
        }
        // Fallback for strings or other primitives
        return String(err);
    };

    const hasDetails = error !== undefined && error !== null;

    return (
        // Use role="alert" for accessibility - screen readers will announce it
        <div
            role="alert"
            className={`border rounded-md p-4 ${className} border-red-400 bg-red-50 text-red-800`}
        >
            <div className="flex items-start">
                {/* Icon Container */}
                <div className="flex-shrink-0 text-red-500">
                    <ExclamationTriangleIcon />
                </div>

                {/* Message Container */}
                <div className="ml-3">
                    {title && (
                        <h3 className="text-sm font-semibold leading-5 ">{title}</h3>
                    )}
                    <div className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</div>

                    {/* Details Toggle Button (only if error details exist) */}
                    {hasDetails && (
                        <div className="mt-3">
                            <button
                                type="button"
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-xs font-medium text-red-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50 rounded"
                            >
                                {showDetails ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Expandable Details Section */}
            {hasDetails && showDetails && (
                <div className="mt-3 ml-9 pl-1"> {/* Aligned roughly with message text */}
                    <pre className="whitespace-pre-wrap break-words bg-red-100 p-3 rounded text-xs text-red-900 border border-red-200 font-mono">
            {formatErrorDetails(error)}
          </pre>
                </div>
            )}
        </div>
    );
};

export default ErrorDisplay;