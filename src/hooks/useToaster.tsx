import { useStyles } from '@/styles';
import {
  Toast,
  ToastIntent,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from '@fluentui/react-components';

export const useToaster = (toasterId: string, intent: ToastIntent = 'info') => {

  const { dispatchToast } = useToastController(toasterId);

  const styles = useStyles();

  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <span className={styles.cursorPointer}>Dismiss</span>
            </ToastTrigger>
          }
        >
          <ToastTrigger>
            <p> Just a simple mock menu that could also be a micro frontend</p>
          </ToastTrigger>
        </ToastTitle>
      </Toast>,
      {
        intent,
        position: 'top',
      }
    );
  };

  return { notify };
};
