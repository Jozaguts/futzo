import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import es from 'dayjs/locale/es'

dayjs.extend(customParseFormat)


const customEs = {
    ...es,
    name: 'es',
    monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
}

dayjs.locale(customEs, null, true) // reemplaza locale original
dayjs.locale('es') // activa locale español

export default defineNuxtPlugin(() => {
    return {
        provide: {
            dayjs,
        },
    }
})
