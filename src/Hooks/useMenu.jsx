import { useQuery } from "@tanstack/react-query"

const useMenu = () => {
    const { data: menu = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/menus`)

            return response.json()
        },
    })

    return [menu, loading, refetch]


}

export default useMenu;
