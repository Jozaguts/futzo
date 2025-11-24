import type {ProductPrices} from '~/types'

export function useProductPrices() {
    const productPrices = useState<ProductPrices | null>('productPrices', () => null)
    const loading       = useState<boolean>('productPrices:loading', () => false)
    const error         = useState<any>('productPrices:error', () => null)

    const priceMode = useState<'annually_price' | 'monthly_price'>(
        'productPrices:mode',
        () => 'annually_price'
    )
    const isAnnuallyPrice = computed(() => priceMode.value === 'annually_price')
    const kickoffPlan = computed(() => productPrices.value?.kickoff)
    const proPlayPlan = computed(() => productPrices.value?.pro_play)
    const eliteLeaguePlan = computed(() => productPrices.value?.elite_league)

    const _inFlight = useState<Promise<void> | null |string>('productPrices:inflight', () => null)
    async function load(force = false) {
        // Guard against duplicate calls and allow optional force refresh
        if (!force && productPrices.value) return
        if (_inFlight.value && !force) return _inFlight.value

        const config = useRuntimeConfig()
        const requestFetch = useRequestFetch() // SSR-safe fetch

        loading.value = true
        error.value = null

        const p = (async () => {
            try {
                // NOTE: Do not type as Promise<ProductPrices>; $fetch already resolves to the type.
                productPrices.value = await requestFetch<ProductPrices>(`${config.public.apiBase}/public/products/prices`,{
                    headers:{
                        accept: 'application/json',
                        contentType: 'application/json',
                    }
                })
            } catch (e) {
                error.value = e
                productPrices.value = null
            } finally {
                loading.value = false
                _inFlight.value = null
            }
        })()
        _inFlight.value = p
        return p
    }
    function setPriceMode(mode: 'annually_price' | 'monthly_price') {
        // Keep this minimal; add validation if the mode can come de inputs externos.
        priceMode.value = mode
    }

    async function refresh() {
        // Force a refetch ignoring cache
        await load(true)
    }
    return {
        // state
        productPrices,
        priceMode,
        loading,
        error,


        // derived
        isAnnuallyPrice,
        kickoffPlan,
        proPlayPlan,
        eliteLeaguePlan,

        // actions
        load,
        refresh,
        setPriceMode,
    }
}