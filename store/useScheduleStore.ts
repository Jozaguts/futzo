import {defineStore} from 'pinia';

export const useScheduleStore = defineStore('scheduleStore', () => {
    const scheduleDialog = ref(false);
    const scheduleParams = ref<{ leagueId: number; tournamentId: number }>();
    const daysToPlay = ref([
        {
            days: [
                'lunes',
                'martes',
                'miércoles',
                'jueves',
                'viernes',
                'sábado',
                'domingo',
            ],
            key: 'all-days',
            text: 'Toda la semana',
        },
        {
            days: ['viernes', 'sábado', 'domingo'],
            key: 'weekend-days',
            text: 'Viernes | Sábado | Domingo',
        },
        {days: ['sábado', 'domingo'], key: 'weekend', text: 'Sábado | Domingo'},
        {days: ['domingo'], key: 'sunday', text: 'Domingo'},
        {days: [], key: 'other', text: 'Otro'},
    ]);
    const daysToPlaySelected = ref();
    const daysToPlayCustomSelected = ref();


    return {
        scheduleDialog,
        daysToPlay,
        scheduleParams,
        daysToPlayCustomSelected,
        daysToPlaySelected,
    };
});
