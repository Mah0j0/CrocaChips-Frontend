import React, { useState } from 'react';
import Input from "../../form/input/InputField.tsx";

interface CopyButtonProps {
    textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset después de 2 segundos
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="flex flex-row gap-10">
            <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                {copied ? '¡Copiado!' : 'Copiar'}
            </button>
            <Input
                placeholder="Buscar por nombre, apellido o usuario..."
                type="text"
                value={textToCopy}
                className="pl-[62px]"
            />
        </div>
    );
};

export default CopyButton;
