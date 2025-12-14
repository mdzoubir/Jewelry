import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'disabled';
    fullWidth?: boolean;
    to?: string; // If provided, renders as Link
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    to,
    icon,
    disabled,
    ...props
}) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-sm text-sm font-bold transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    // Variants
    const variants = {
        primary: "bg-[#A89160] hover:bg-[#8C734B] text-white",
        secondary: "bg-[#5A5A5A] hover:bg-[#4A4A4A] text-white",
        outline: "border border-[#A89160] text-[#A89160] hover:bg-[#A89160] hover:text-white",
        success: "bg-green-700 text-white",
        disabled: "bg-gray-400 text-white cursor-not-allowed"
    };

    const widthClass = fullWidth ? "w-full" : "";
    const variantClass = disabled ? variants.disabled : variants[variant];

    const combinedClasses = `${baseStyles} ${variantClass} ${widthClass} ${className}`;

    if (to && !disabled) {
        return (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Link to={to} className={combinedClasses} {...(props as any)}>
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} disabled={disabled} {...props}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
