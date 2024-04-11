import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://v1336-api-test.onrender.com/',
})

export const PointsApi = {
    getPoints(param:string) {
        return instance.get(`getPointsFast?points=${param}`);
    },
}

export const CardsAPI = {
    getBrigadesData() {
        return instance.get('getBrigadesData');
    },
    getDepartments() {
        return instance.get('getDepartments');
    },
    getConnectionState() {
        return instance.get('getConnectionState');
    },
   
}