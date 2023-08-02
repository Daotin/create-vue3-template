import { ref, defineExpose } from 'vue';
import type { ElForm } from 'element-plus';

type ElFormInstance = InstanceType<typeof ElForm>


/**
 * 通用弹框操作
 * @param options 
 * @returns 
 */
const useOption = () => {
  const visible = ref(false);
  const formRef = ref<ElFormInstance>(); // 表单
  // 取消操作
  const handleCancel = () => {
    visible.value = false;
  };
  // 关闭弹框之后触发
  const handleClosed = () => {
    formRef.value?.resetFields();
  };

  return { visible, formRef, handleCancel, handleClosed }
}

export default useOption;