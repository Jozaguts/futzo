import {defineStore} from "pinia";
import type {Schedule} from "~/models/Schedule";


export const useScheduleStore = defineStore('scheduleStore', () => {
    const schedules = ref<Schedule[]>([]);
    const scheduleParams = ref<{leagueId: number, tournamentId: number}>({leagueId: null as number, tournamentId: null as number});
    const daysToPlay = ref([
            {value: 'all-days', text: 'Lun Mar Mie Jue Vie Sab Dom'},
            {value: 'weekend-days', text: 'Vie Sab Dom'},
            {value: 'weekend', text: 'Sab Dom'},
            {value: 'sunday', text: 'Dom'},
            {value: 'other', text: 'Otro',},
        ]);
    const daysToPlaySelected = ref('all-days');
    const daysToPlaySelectedText = computed(() => {
        if (daysToPlaySelected.value === 'other'){
            return customDaysSelected.value.join(' | ');
        }else {
            return daysToPlay.value.find((d) => d.value === daysToPlaySelected.value)?.text;
        }
    });
    const customDaysSelected = ref<string[]>([])

    const fetchSchedules = async () => {
        const client = useSanctumClient()
        schedules.value = await client('/api/v1/admin/schedules');
    };
    const generateSchedule = async (params : {leagueId: number, tournamentId: number}) => {
        const client = useSanctumClient()
        await client('/api/v1/admin/schedules', {
            method: 'POST',
            body: JSON.stringify(params)
        });
    };
    return {
        schedules,
        daysToPlay,
        scheduleParams,
        daysToPlaySelected,
        daysToPlaySelectedText,
        customDaysSelected,
        fetchSchedules,
        generateSchedule,
    };
});