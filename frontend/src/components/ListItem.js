import React from 'react'
import { Link } from 'react-router-dom'


let getDate = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

let getTitle = (note) => {
    const title = note.body.split('\n')[0]
    return title.length > 20 ? title.substring(0, 20) + '...' : title
}


const ListItem = ({note}) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className='notes-list-item'>
            <h3>{getTitle(note)}</h3>  
            <p><span>{getDate(note)}</span></p>
            </div>  
        </Link>
    )
}

export default ListItem