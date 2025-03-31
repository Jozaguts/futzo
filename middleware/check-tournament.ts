import {useTournamentStore} from "~/store";

export default defineNuxtRouteMiddleware(() => {
    const tournamentStore = useTournamentStore();
    if (!import.meta.server && !tournamentStore.tournamentId) {
        return navigateTo({name: 'torneos'});
    }
});
