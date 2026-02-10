---
name: nuxt-google-signin
description: Integrate nuxt-vue3-google-signin in Nuxt 3/Vue 3 apps. Use when adding GoogleSignInButton, One Tap login, or custom Google OAuth flows, handling credential responses, and sending tokens to a backend.
---

# Nuxt Google Sign-In (nuxt-vue3-google-signin)

## Use GoogleSignInButton (recommended)

- Import `GoogleSignInButton` from `vue3-google-signin` for IDE support.
- Use the Google-rendered button to comply with branding.
- Handle `@success` and `@error` events.
- Optionally set `text`, `shape`, `size`, `width`, and `locale` props.
- If a weird white box appears, wrap the button with `style="color-scheme: auto"`.

Example:

```vue
<script setup lang="ts">
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'

const handleSuccess = (response: CredentialResponse) => {
  const { credential } = response
  // send credential to backend
}

const handleError = () => {
  // show error state
}
</script>

<template>
  <div style="color-scheme: auto;">
    <GoogleSignInButton
      text="signin_with"
      shape="pill"
      size="large"
      :width="420"
      locale="en"
      @success="handleSuccess"
      @error="handleError"
    />
  </div>
</template>
```

## One Tap login (optional)

- Use `useOneTap` for automatic or manual one-tap flow.
- To disable auto prompt, set `disableAutomaticPrompt: true` and call `login()` manually.
- Note: Google enforces cooldowns after dismissing the prompt.

## Backend exchange

- Send the `credential` (ID token) to your backend endpoint (e.g., `POST /api/auth/google`).
- Store `{ token, user }` in Pinia + localStorage after success.
- Do not use cookies for Sanctum-style token auth unless required.

## Custom flows (advanced)

- Use `useTokenClient` or `useCodeClient` for custom buttons and OAuth flows.
- Use `isReady` to disable buttons until the Google API is ready.
```
