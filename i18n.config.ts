export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'es',
    defaultLocale: 'es',
    messages: {
        es: {
            forms:{
                required: 'Campo es requerido',
            },
            tournament_min: 'El nombre del torneo debe tener al menos 6 caracteres',
            league_min: 'El nombre de la liga debe tener al menos 6 caracteres',
            fields:{
                email: 'Correo electrónico',
                name: 'Nombre',
            }
        },
    }
}));