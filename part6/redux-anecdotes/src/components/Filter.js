import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const style = {
        marginBottom: 10
      }

    const handleChange = (event) => {
        const filter = event.target.value
        dispatch(setFilter(filter))
    }
    
    return (
        <div style={style}>filter anecdotes
            <input onChange={handleChange} name='filter'/>
        </div>
    )
}

export default Filter