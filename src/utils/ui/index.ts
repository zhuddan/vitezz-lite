import { createMessage } from './message';
import { createNotification } from './notification';

// message
export const showSuccessMessage = createMessage();
export const showErrorMessage = createMessage();
export const showWarningMessage = createMessage();
export const showInfoMessage = createMessage();

// notification
export const showSuccessNotification = createNotification();
export const showErrorNotification = createNotification();
export const showWarningNotification = createNotification();
export const showInfoNotification = createNotification();