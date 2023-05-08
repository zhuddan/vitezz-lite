// eg. element-plus

// import type { NotificationOptions } from 'element-plus';
// import { ElNotification } from 'element-plus';
// type CreateMessageOpt = Partial<Omit<NotificationOptions, 'type' | 'message'>>;
// export function createNotification(type: NotificationOptions['type']) {
//   const defaultOptions: CreateMessageOpt = {
//     duration: 1200,
//     showClose: true,
//   };
//   return (message: string, title = '提示', opt: CreateMessageOpt = {}) => {
//     return ElNotification({
//       type,
//       title,
//       message,
//       ...defaultOptions,
//       ...opt,
//     });
//   };
// }

export function createNotification() {
  return (message: string) => {
    return alert(message);
  };
}