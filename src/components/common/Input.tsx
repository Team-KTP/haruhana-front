import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, inputSize = 'md', className = '', ...props }, ref) => {
    const sizeClass = inputSize === 'sm' ? 'input-sm' : inputSize === 'lg' ? 'input-lg' : '';
    const errorClass = error ? 'input-error' : '';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        )}
        <input
          ref={ref}
          className={`input-field ${sizeClass} ${errorClass} ${className}`.trim()}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
