import { isProxy } from "@vue/reactivity";

const prepareForm = (requestData: Ref): FormData => {
  const form = new FormData();
  const appendData = (prefix: string, data: any) => {
    for (const key in data) {
      if (data[key] instanceof File && data[key]) {
        form.append(`${prefix}[${key}]`, data[key]);
      } else if (data[key] instanceof Date && data[key]) {
        const date = data[key].toISOString().split("T")[0];
        form.append(`${prefix}[${key}]`, date);
      } else if (isProxy(data[key])) {
        form.append(`${prefix}[${key}]`, JSON.stringify(data[key]));
      } else {
        form.append(`${prefix}[${key}]`, data[key]);
      }
    }
  };

  for (const key in requestData.value) {
    const data = requestData.value[key];
    for (let idx in data) {
      if (!data[idx]) {
        delete data[idx];
      }
    }
    console.log(key)
    console.log(data)
    appendData(key, data);
  }

  return form;
};
export default prepareForm;
