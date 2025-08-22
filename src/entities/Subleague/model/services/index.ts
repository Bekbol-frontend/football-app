import API from "@/shared/api"


export const getSubleagues = async () => {
    return API.get("/api/v1/admin/subleagues")
}