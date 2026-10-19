import { useEffect, useRef, useState } from 'react'

const CustomSelect = ({
    options = [],
    value,
    onValueChange,
    placeholder = 'Chọn nhu cầu...',
    variant = 'default',
    rounded = 'default',
    disabled = false,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Tự động đóng dropdown khi click ra ngoài (Click Outside)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const selectedOption = options.find((opt) => String(opt.value) === String(value));
    const isOutline = variant === 'outline';
    const radiusClass = rounded === 'full' ? 'rounded-pill' : 'rounded-3';
    return (
        <div className={`position-relative w-100 ${className}`} ref={dropdownRef}>
            {/* Nút bấm hiển thị (Trigger Button) */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                className={`w-100 d-flex align-items-center justify-content-between px-3 py-2 border text-start ${radiusClass} ${isOutline
                        ? 'bg-transparent text-white border-white-50'
                        : 'bg-white text-dark border-secondary-subtle shadow-sm'
                    } ${disabled ? 'disabled opacity-50' : ''}`}
                style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
                <span
                    className={`text-truncate small ${!selectedOption
                            ? isOutline
                                ? 'text-white-50'
                                : 'text-muted'
                            : 'fw-medium'
                        }`}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                {/* Icon mũi tên (Tự động xoay khi mở) */}
                <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    className={`ms-2 flex-shrink-0 ${isOutline ? 'text-white-50' : 'text-secondary'}`}
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {/* Menu xổ xuống (Dropdown Menu Popup) */}
            {isOpen && (
                <div
                    className={`position-absolute start-0 end-0 mt-1 p-1 bg-white border border-light-subtle shadow-lg ${radiusClass} overflow-auto`}
                    style={{
                        zIndex: 1050,
                        maxHeight: '220px'
                    }}
                >
                    {options.length === 0 ? (
                        <div className="p-2 text-center text-muted small">Không có lựa chọn nào</div>
                    ) : (
                        options.map((opt) => {
                            const isSelected = String(opt.value) === String(value);
                            return (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        if (!disabled) {
                                            onValueChange?.(opt.value);
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={`d-flex align-items-center justify-content-between px-3 py-2 my-1 rounded-2 small ${isSelected
                                            ? 'bg-primary-subtle text-primary fw-bold'
                                            : 'text-dark'
                                        }`}
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) e.currentTarget.classList.add('bg-light');
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) e.currentTarget.classList.remove('bg-light');
                                    }}
                                >
                                    <span className="text-truncate">{opt.label}</span>
                                    {/* Icon Checkmark khi được chọn */}
                                    {isSelected && (
                                        <svg
                                            width="16"
                                            height="16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                            className="text-primary flex-shrink-0 ms-2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    )
}

export default CustomSelect
