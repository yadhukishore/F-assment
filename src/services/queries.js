import useSWR from "swr";


export function useUser(){
    return useSWR("/users")
}

export function useUSerDetail(id){
    return useSWR(`/users/${id}`);
}