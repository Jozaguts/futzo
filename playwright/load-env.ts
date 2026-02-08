import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const loadEnvFile = (fileName: string) => {
  const envPath = path.resolve(process.cwd(), fileName);
  if (!fs.existsSync(envPath)) {
    return {};
  }
  try {
    return dotenv.parse(fs.readFileSync(envPath));
  } catch {
    return {};
  }
};

export const ensurePlaywrightEnv = () => {
  const parsed = {
    ...loadEnvFile('.env'),
    ...loadEnvFile('.env.local'),
    ...loadEnvFile('.env.test'),
    ...loadEnvFile('.env.testing'),
  };

  const ensure = (key: string) => {
    if (process.env[key]) {
      return;
    }
    const value = parsed[key];
    if (value) {
      process.env[key] = value;
    }
  };

  ensure('PW_E2E_EMAIL');
  ensure('PW_E2E_PASSWORD');
  ensure('NUXT_PUBLIC_URL_BACKEND');
  ensure('NUXT_PUBLIC_BACKEND_PREFIX');
  ensure('PW_BASE_URL');
  ensure('NUXT_PORT');
  ensure('NUXT_HOST');
};
