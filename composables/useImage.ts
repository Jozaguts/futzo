import type { ImageForm } from "~/models/player";

const imageForm = ref<ImageForm>({
  file: null,
  name: "",
  size: 0,
});
const dragDropImageRef = ref<{ loadImage: Function }>();
const saveImage = (file: File) => {
  imageForm.value.file = file;
  imageForm.value.name = file.name;
  imageForm.value.size = file.size;
};
const removeImage = () => {
  imageForm.value.file = null;
  imageForm.value.name = "";
  imageForm.value.size = 0;
};

export { imageForm, dragDropImageRef, saveImage, removeImage };
