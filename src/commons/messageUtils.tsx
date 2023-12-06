import type {ToastShowParams} from 'react-native-toast-message';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const MessageUtils = {
  showSuccessMessageWithTimeout(message: string, duration: number = 500) {
    setTimeout(() => {
      this.showSuccessMessage(message);
    }, duration);
  },
  showErrorMessageWithTimeout(message: string, duration: number = 500) {
    setTimeout(() => {
      this.showErrorMessage(message);
    }, duration);
  },
  showSuccessMessage(message: string) {
    this.show({
      type: 'tomatoToast',
      props: {status: 'success', uuid: message},
    });
  },
  showErrorMessage(message: string) {
    this.show({
      type: 'tomatoToast',
      props: {status: 'error', uuid: message ?? ''},
    });
  },

  show(params: ToastShowParams) {
    Toast.show(params);
  },

  showWarningMessage(message: string) {
    this.show({
      type: 'tomatoToast',
      props: {status: 'warning', uuid: message ?? ''},
    });
  },
  showEditNotification(status: 'error' | 'success', message?: string) {
    Toast.show({
      type: 'tomatoToast',
      props: {status, uuid: message},
    });
  },
};
