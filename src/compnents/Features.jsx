import React from 'react'
import { Link } from 'react-router-dom'
import Feature from '../ui/Feature'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Features() {
  return (
    <section id="features">
        <div className="features-container">
            <div className='features'>
            <div className="features--intro">
                <h2 className="section-title features-title"> <span className="purple">Maximize</span> Your ROI: Discover Our <span className="purple">High-Value</span> Services</h2>
                <ul className="feature--list">
                  <li className="feature--list__item">
                    <p><FontAwesomeIcon className='purple' icon='fa fa-arrow-right' /> Make better trades with <b className="purple">accuracy</b></p>
                  </li>
                  <li className="feature--list__item">
                    <p><FontAwesomeIcon className='purple' icon='fa fa-arrow-right' /> <b className="purple">save time</b> analyzing data</p>
                  </li>
                  <li className="feature--list__item">
                    <p><FontAwesomeIcon className='purple' icon='fa fa-arrow-right' /> take the <b className="purple">guesswork out</b> of trading</p>
                  </li>
                  <li className="feature--list__item">
                    <p><FontAwesomeIcon className='purple' icon='fa fa-arrow-right' /> <b className="purple">gain</b> an edge in the market</p>
                  </li>
                </ul>
                <Link to='/products'><button className='features__btn'>Buy Now</button></Link>
            </div>
            <div className="features-wrapper">
            <Feature typeIsAccurate={true} />
            <Feature typeIsAccurate={false} />
            </div>
            </div>
            <figure className="feature--img">
              <img src="https://cdn.discordapp.com/attachments/1088531111942037534/1093574216592408676/IMG_1457_1.png"/>
            </figure>
        </div>
    </section>
  )
}

export default Features