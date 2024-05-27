import toast from 'react-hot-toast';

interface Props {
    id?: string;
    icon?: number;
    message: string;
    duration?: number;
    position?:
        | 'top-left'
        | 'top-right'
        | 'top-center'
        | 'bottom-left'
        | 'bottom-right'
        | 'bottom-center';
}

export const notify = {
    custom: (props: Props) => toast.custom(props.message),
    info: (props: Props) => toast(props.message, { duration: 3000 }),
    error: (props: Props) => toast.error(props.message, { duration: 3000 }),
    success: (props: Props) => toast.success(props.message, { duration: 3000 }),
    loading: (props: Props) => toast.loading(props.message, { duration: 3000 }),
    //
    removeAll: () => toast.remove(),
    dismissAll: () => toast.dismiss(),
    remove: (toastId: string) => toast.remove(toastId),
    dismiss: (toastId: string) => toast.dismiss(toastId)
};
