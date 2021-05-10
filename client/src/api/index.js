import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})
export const insertMovie = payload => api.post(`/Bisectionfx`, payload)
export const getAllMovies = () => api.get(`/Bisectionfxs`)
export const updateMovieById = (id, payload) => api.put(`/Bisectionfx/${id}`, payload)
export const deleteMovieById = id => api.delete(`/Bisectionfx/${id}`)
export const getMovieById = id => api.get(`/Bisectionfx/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis
