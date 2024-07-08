export  { IApiInstance } from "~/interfaces/api";
import { FetchOptions, FetchRequest } from 'ofetch'

export {};
declare global {
  interface Window {
    FB: any;
  }
}
export interface Auth {
  user: User | null
  loggedIn: boolean
  token: string | null
}
export interface User {
  id: number
  name: string
  email: string
  roles: string[]
}

export type ApiFetch = <T>(
  endpoint: FetchRequest,
  options?: FetchOptions
) => Promise<T>

export type Csrf = Promise<void>

export type Callback = (response: any) => void

export interface SanctumAuthPlugin {
  login: (data: any, callback?: Callback | undefined) => Promise<void>
  logout: (callback?: Callback | undefined) => Promise<void>
  getUser<T>(): Promise<T | undefined>
}

// @ts-ignore
declare module 'vue/types/vue' {
  interface Vue {
    $sanctumAuth: SanctumAuthPlugin
  }
}

interface PluginInjection {
  $sanctumAuth: SanctumAuthPlugin
  $apiFetch: ApiFetch
  $csrf: Csrf
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection {}
}
export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}
export interface Permission {
  id: number,
  name: string
}
export interface AutocompletePrediction {
  description:           string;
  matched_substrings:    MatchedSubstring[];
  place_id:              string;
  reference:             string;
  structured_formatting: StructuredFormatting;
  terms:                 Term[];
  types:                 string[];
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text:                    string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text:               string;
}

export interface Term {
  offset: number;
  value:  string;
}
