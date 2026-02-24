import {isProxy} from '@vue/reactivity';
import type {ExportType} from '~/models/tournament';

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

const isFileLike = (value: unknown): value is File | Blob => {
  return typeof Blob !== 'undefined' && value instanceof Blob;
};

const prepareForm = (requestData: Ref): FormData => {
  const form = new FormData();

  const appendField = (fieldName: string, value: unknown) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    const maybeBoolean = coerceBoolean(value);
    if (maybeBoolean !== null) {
      form.append(fieldName, maybeBoolean ? '1' : '0');
      return;
    }

    if (isFileLike(value)) {
      if (value instanceof File) {
        form.append(fieldName, value);
        return;
      }
      form.append(fieldName, value, 'upload.bin');
      return;
    }

    if (value instanceof Date) {
      const date = value.toISOString().split('T')[0];
      form.append(fieldName, date as string);
      return;
    }

    if (Array.isArray(value)) {
      form.append(fieldName, JSON.stringify(value));
      return;
    }

    if (isProxy(value)) {
      form.append(fieldName, JSON.stringify(value));
      return;
    }

    form.append(fieldName, String(value));
  };

  const appendData = (prefix: string, data: Record<string, unknown>) => {
    for (const key in data) {
      const value = data[key];
      appendField(`${prefix}[${key}]`, value);
    }
  };

  const source = requestData?.value ?? {};
  for (const key in source) {
    const data = source[key];
    if (!data || typeof data !== 'object') {
      continue;
    }
    appendData(key, data as Record<string, unknown>);
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
