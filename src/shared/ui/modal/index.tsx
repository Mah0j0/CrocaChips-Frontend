import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    isFullscreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onClose,
                                                children,
                                                className,
                                                showCloseButton = true,
                                                isFullscreen = false,
                                            }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const contentClasses = isFullscreen
        ? "w-full h-full"
        : "relative w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-lg";

    // Define variants for the modal content
    const modalContentVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 }, // Start slightly transparent, smaller, and lower
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200, // Slightly more rigid spring
                damping: 20, // Less damping for a bit more bounce
                delay: 0.1, // Slight delay for the modal to appear after backdrop
            },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: -50, // Exit upwards for a more distinct departure
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        },
    };

    // Define variants for the backdrop
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    // We remove the direct animation props here, as they are handled by the children
                    // The parent's opacity/y animation was interfering with the inner modal's more specific animation.
                    // This div now just serves as the container for AnimatePresence to track the children.
                >
                    {/* Backdrop */}
                    {!isFullscreen && (
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                            variants={backdropVariants} // Use variants for cleaner backdrop animation
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        />
                    )}

                    {/* Modal Content */}
                    <motion.div
                        ref={modalRef}
                        className={`relative z-50 ${contentClasses} ${className}`} // Add z-50 to ensure it's above the backdrop
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        variants={modalContentVariants} // Use variants for cleaner modal content animation
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        )}
                        <div className="p-6">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};