
import { useReducer, useEffect } from 'react';
import axios from 'axios';
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
}
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { ...state, loading: true, jobs: [] };
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs };
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.eror, jobs: [] };
        default:
            return state;
    }
}
const BASE_URL = 'https://jobs.github.com/positions.json';
export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source();
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params },

        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
        }).catch(e => {
            if (axios.isCancel(e))
                return;
            dispatch({ type: ACTIONS.ERROR, payload: { jobs: e } });
        })
        return () => {
            cancelToken1.cancel()
        }
    }, [params, page])
    return {
        ...state
    }
}