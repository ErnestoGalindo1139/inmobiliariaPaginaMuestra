import { LucideIcon } from 'lucide-react';

export const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-3
      border-b-2
      font-medium transition
      ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }
    `}
  >
    <Icon size={18} />
    {label}
  </button>
);
