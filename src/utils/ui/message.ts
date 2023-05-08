// eg. element-plus

// import type { MessageOptions } from 'element-plus';
// import { ElMessage } from 'element-plus';
// type CreateMessageOpt = Omit<MessageOptions, 'type' | 'message'>;
// export function createMessage(type: MessageOptions['type']) {
//   const defaultOptions: CreateMessageOpt = {
//     duration: 1200,
//     showClose: true,
//   };
//   return (message: string, opt: CreateMessageOpt = {}) => {
//     return ElMessage({
//       type,
//       message,
//       ...defaultOptions,
//       ...opt,
//     });
//   };
// }

export function createMessage() {
  return (message: string) => {
    return alert(message);
  };
}