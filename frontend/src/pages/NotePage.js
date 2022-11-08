import React, { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let [note, setNote] = useState([]);
  let { id } = useParams();

  const navigate = useNavigate();

  
  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === 'new') return
    let response = await fetch(`/api/notes/${ id }/`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate('/');
  }

  let updateNote = async () => {
    await fetch(`/api/notes/${ id }/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    await fetch(`/api/notes/${ id }/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate('/');
  }


  let handleSubmit = () => {
    console.log('NOTE:', note)
      if (id !== "new" && !note.body) {
        console.log("delete")
        deleteNote()
    } else if (id !== "new") {
        console.log("update")
        updateNote()
    } else if (id === 'new' && note !== null) {
        console.log("create")
        createNote()
    }
    navigate('/');
  }

  let handleChange = (value) => {
    setNote(note => ({ ...note, 'body': value }))
    console.log('Handle Change:', note)
}
  return (
    
    <div className='note'>
      <div className='note-header'>
        <h3>
           <ArrowLeft onClick={handleSubmit}/>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
        <textarea onChange={(e) => {handleChange(e.target.value)}} value={note.body}></textarea>
    </div>
  )
}

export default NotePage

