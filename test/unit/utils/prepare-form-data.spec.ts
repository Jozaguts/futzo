import {describe, expect, it} from 'vitest'
import {ref} from 'vue'
import prepareForm from '../../../app/utils/prepareFormData'

describe('prepareFormData', () => {
  it('serializes File fields as multipart files', () => {
    const file = new File(['hello'], 'avatar.png', { type: 'image/png' })
    const payload = ref({
      basic: {
        name: 'Jugador',
        image: file,
      },
    }) as any

    const form = prepareForm(payload)
    const imageField = form.get('basic[image]')

    expect(imageField).toBeInstanceOf(File)
    expect((imageField as File).name).toBe('avatar.png')
  })

  it('serializes Blob fields without converting them to plain strings', () => {
    const blob = new Blob(['binary-content'], { type: 'image/png' })
    const payload = ref({
      basic: {
        image: blob,
      },
    }) as any

    const form = prepareForm(payload)
    const imageField = form.get('basic[image]')

    expect(imageField).toBeInstanceOf(Blob)
    expect(typeof imageField).not.toBe('string')
  })
})
