import { useQuery } from '@tanstack/react-query'

export function useYieldsData(chains?: string[]) {
	const queryParams =
		chains && chains.length > 0 ? `?${chains.map((chain) => `chains=${encodeURIComponent(chain)}`).join('&')}` : ''
	const sortedChains = chains ? [...chains].sort() : []

	return useQuery({
		queryKey: ['yields-overview', sortedChains.join(',')],
		queryFn: () => fetch(`/api/datasets/yields${queryParams}`).then((res) => res.json()),
		staleTime: 5 * 60 * 1000,
		refetchInterval: 5 * 60 * 1000,
		enabled: true
	})
}
