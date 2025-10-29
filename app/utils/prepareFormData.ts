import { isProxy } from '@vue/reactivity';
import type { ExportType } from '~/models/tournament';

const TRUE_LITERALS = ['true', '1', 'on'];
const FALSE_LITERALS = ['false', '0', 'off'];

const coerceBoolean = (value: unknown): boolean | null => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    if (value === 1) return true;
    if (value === 0) return false;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (TRUE_LITERALS.includes(normalized)) return true;
    if (FALSE_LITERALS.includes(normalized)) return false;
  }

  return null;
};

const prepareForm = (requestData: Ref): FormData => {
  const form = new FormData();
  const appendData = (prefix: string, data: any) => {
    for (const key in data) {
      const maybeBoolean = coerceBoolean(data[key]);
      if (maybeBoolean !== null) {
        form.append(`${prefix}[${key}]`, maybeBoolean ? '1' : '0');
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
