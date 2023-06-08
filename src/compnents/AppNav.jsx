import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function AppNav({ }) {
  const channel = window.location.pathname
  return (
    <ul className='sidebar-nav'>
        <li className="sidebar-nav--item">
          <Link to='/' className="sidebar-nav--item__btn">
            <button>
              <FontAwesomeIcon icon='fa fa-house' />
            </button>
          </Link>
        </li>
        <li className="sidebar-nav--item">
          <Link to='/app/intro' className={`sidebar-nav--item__btn ${channel.includes('app') && 'sidebar-nav--item__btn-checked'}`}>
            <button>
              <FontAwesomeIcon icon='fa fa-message' />
            </button>
          </Link>
        </li>
        <li className="sidebar-nav--item">
          <Link to='/marketing' className={`sidebar-nav--item__btn ${channel.includes('marketing') && 'sidebar-nav--item__btn-checked'}`}>
            <button>
              <FontAwesomeIcon icon='fa fa-bullhorn' />
            </button>
          </Link>
        </li>
                <li className="sidebar-nav--item">
          <Link to='/marketing' className={`sidebar-nav--item__btn ${channel.includes('marketing') && 'sidebar-nav--item__btn-checked'}`}>
            <button>
              <FontAwesomeIcon icon='fa fa-chart-line' />
            </button>
          </Link>
        </li>
        <li className="sidebar-nav--item">
          <Link to='/learn' className={`sidebar-nav--item__btn ${channel.includes('learn') && 'sidebar-nav--item__btn-checked'}`}>
            <button>
              <FontAwesomeIcon icon='fa fa-book-open' />
            </button>
          </Link>
        </li>
    </ul>
  )
}

export default AppNav