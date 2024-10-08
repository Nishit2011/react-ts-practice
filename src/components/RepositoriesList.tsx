import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'


const RepositoriesList: React.FC= () => {

    const [term, setTerm] = useState('')
    const {searchRepositories} = useAction()
    const {data, error, loading} = useTypedSelector((state)=> state.repositories)
    const onSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       searchRepositories(term)
      

    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Enter the term" onChange={(e)=> setTerm(e.target.value)}/>
            <button>Find Term</button>
        </form>
        {error && <h3>{error}</h3>}
        {loading && <h3>Loading...</h3>}
        {!error && !loading && data.map(el=> <div key={el}>{el}</div>)}
    </div>
  )
}

export default RepositoriesList