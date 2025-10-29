import { isProxy } from '@vue/reactivity';
import type { ExportType } from '~/models/tournament';

const prepareForm = (requestData: Ref): FormData => {
  const form = new FormData();
  const appendData = (prefix: string, data: any) => {
    for (const key in data) {
      if (typeof data[key] === 'boolean') {
        form.append(`${prefix}[${key}]`, data[key] ? '1' : '0');
      } else if (data[key] instanceof File && data[key]) {
        form.append(`${prefix}[${key}]`, data[key]);
      } else if (data[key] instanceof Date && data[key]) {
        const date = data[key].toISOString().split('T')[0];
        form.append(`${prefix}[${key}]`, date as string);
      } else if (isProxy(data[key])) {
        form.append(`${prefix}[${key}]`, JSON.stringify(data[key]));
      } else {
        form.append(`${prefix}[${key}]`, data[key]);
      }
    }
  };

  for (const key in requestData.value) {
    const data = requestData.value[key];
    for (const idx in data) {
      const value = data[idx];
      if (value === undefined || value === null || value === '') {
        delete data[idx];
      }
    }
    appendData(key, data);
  }

  return form;
};
export default prepareForm;
export const parseBlobResponse = (blob: Blob, filename: string, type: ExportType) => {
  if (blob instanceof Blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${type === 'img' ? 'jpg' : 'xls'}`; // nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};
