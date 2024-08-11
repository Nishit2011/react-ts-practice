import axios from "axios"

import {ActionType} from '../action-types'
import {Action} from "../actions"
import {Dispatch} from 'redux'


export const searchRepositories = (searchTerm: string) => {
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
          //  console.log(data)
            const name = data.objects.map((result:any)=>{
               // console.log(result.package.name)
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