import { useEffect, useState } from 'react'
import './App.css'
import { FormEvent } from 'react';
import { createRef } from 'react';

interface Movie {
  id: number,
  name: string
}

function App() {
  const [movies, setMovies] = useState<Array<Movie> | undefined>(undefined)
  const movieNameInputRef = createRef<HTMLInputElement>();
  const [isCreating, setIsCreating] = useState<boolean>(false)

  function loadMovies() {
    setMovies(undefined)
    return fetch('/api/movies')
      .then(res => res.json())
      .then(movies => setMovies(movies))
  }

  useEffect(() => {
    loadMovies()
  }, []);

  if (movies === undefined) {
    return <div>Loading...</div>
  }

  function addMovie(ev: FormEvent) {
    ev.preventDefault()

    const body = {
      name: movieNameInputRef.current?.value
    }

    setIsCreating(true)
    fetch('/api/movies', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        console.log('DONE')
        
        setIsCreating(false)

        loadMovies()
      })

    return false
  }

  return (
    <div className="App">
      <form onSubmit={addMovie}>
        <input type="string" ref={movieNameInputRef} />
        <button type="submit" disabled={isCreating}>Submit</button>
      </form>
      {
        movies.length ?   
        <ul>
          {
            movies.map(m => {
              return <li key={m.id}>{m.name}</li>
            })
          }
        </ul> : 'Empty list'
      }
    </div>
  )
}

export default App
