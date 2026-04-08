import { getResponse } from '../Services/home.api'
import { useDispatch } from 'react-redux'
import { setResponse, setLoading, setError } from '../home.slice'
export const useHome = () => {
    const dispatch = useDispatch()
    const handleGetresposne = async (problem, noofmodels, model1, model2, model3) => {
        dispatch(setLoading(true))
        try {
            const response = await getResponse(problem, noofmodels, model1, model2, model3);
            dispatch(setResponse(response.data))
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setError(error.response?.data?.error || error.message))
            dispatch(setLoading(false))
        }
    }
    return {
        handleGetresposne
    }
}