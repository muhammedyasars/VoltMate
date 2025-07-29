import Button from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'default' | 'danger';
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  icon?: string;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'default',
  isLoading = false,
  onConfirm,
  onCancel,
  icon = 'ri-question-line'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const confirmButtonClass = confirmVariant === 'danger' 
    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
        
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${
            confirmVariant === 'danger' ? 'bg-red-100' : 'bg-primary-100'
          } rounded-full flex items-center justify-center mx-auto mb-4`}>
            <i className={`${icon} text-3xl ${
              confirmVariant === 'danger' ? 'text-red-600' : 'text-primary-600'
            }`}></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{message}</p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 ${confirmButtonClass}`}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}