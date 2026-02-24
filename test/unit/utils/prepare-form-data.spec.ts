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

  it('keeps basic.name and serializes arrays/booleans correctly', () => {
    const payload = ref({
      basic: {
        name: 'Copa Futzo',
        min_max: [8, 16],
      },
      details: {
        penalty_draw_enabled: false,
        location_ids: [1, 2],
      },
    }) as any

    const form = prepareForm(payload)

    expect(form.get('basic[name]')).toBe('Copa Futzo')
    expect(form.get('basic[min_max]')).toBe('[8,16]')
    expect(form.get('details[penalty_draw_enabled]')).toBe('0')
    expect(form.get('details[location_ids]')).toBe('[1,2]')
  })

  it('does not mutate source object when skipping empty fields', () => {
    const payload = ref({
      basic: {
        name: 'Apertura',
        prize: '',
      },
    }) as any

    const form = prepareForm(payload)

    expect(form.get('basic[name]')).toBe('Apertura')
    expect(form.get('basic[prize]')).toBeNull()
    expect(payload.value.basic).toHaveProperty('prize', '')
  })
})
