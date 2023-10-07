import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', () => {
  const visible: Ref<boolean> = ref(false);
  const message: Ref<string> = ref('');
  const type: Ref<string> = ref('');

  const showToast = (msg: string, t: string) => {
    visible.value = true;
    message.value = msg;
    type.value = t;
    setTimeout(() => {
      visible.value = false;
      message.value = '';
      type.value = '';
    }, 3000);
  };

  return { visible, message, type, showToast };
});
