import {useCredentialsErrors} from "~/composables/credentials/useCredentialsErrors";

export const useCredentialsForbidden = () => {
  const shown = useState<boolean>('credentials-forbidden-toast-shown', () => false)
  const { notifyForbidden } = useCredentialsErrors()

  const notifyOnce = () => {
    if (shown.value) return
    shown.value = true
    notifyForbidden()
  }

  return {
    notifyOnce,
  }
}
