import ApiService from "./ApiService"

export async function apiGetKonfigurasiPks() {
    return ApiService.fetchData({
        url: '/konfigurasi/pks',
        method: 'get',
    })
}
