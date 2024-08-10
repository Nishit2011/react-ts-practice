import axios from "axios"

import {ActionType} from '../action-types'
import {Action} from "../actions"
import {Dispatch} from 'redux'


const searchRepositories = (searchTerm: string) => {
    return async (dispatch:Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES
        });

        try {
            const {data} = await axios.get('https://registry.npmjs.org/-/v1/search', {
                params:{
                    text: searchTerm
                }
            }
            
            )
            const name = data.object.name.map((result:any)=>{
                return result.package.name
            })

            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: name
            })

        } catch (err) {
            if (err instanceof Error) {
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: err.message
            })
        }
    }
    }
}