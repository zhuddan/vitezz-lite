import { createAxios, createRuoyiAxiosTransform } from '@zdzz/shared';
import { getToken, removeToken } from '@/utils/cache';
import { useAppConfig } from '@/hooks/config/useAppConfig';
import { showSuccessMessage, showSuccessNotification } from './ui';
const { VITE_APP_API_URL } = useAppConfig();

const transform = createRuoyiAxiosTransform({
  removeToken,
  getToken,
  onSignout: () => {},
  onError: (mode, msg) => {
    if (mode == 'modal')
      showSuccessNotification(msg);
    else if (mode == 'message')
      showSuccessMessage(msg);
  },
});

export const defHttp = createAxios(VITE_APP_API_URL, { transform });
