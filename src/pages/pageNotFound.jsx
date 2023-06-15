import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <main className='container-notfound'>
        <h2>Oops!</h2>
        <p className='notfound--bold'>404 - page not found</p>
        <p>the page you are looking for doesn't exist or have been removed</p>
        <Link to='/'>
            <button>Go To Homepage</button>
        </Link>
    </main>
  )
}

export default PageNotFound