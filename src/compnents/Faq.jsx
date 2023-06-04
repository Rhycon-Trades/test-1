import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Question from '../ui/Question'

function Faq({faqs}) {
  return (
    <section id='faq'>
        <h1 className="section-title faq-title">Have a&nbsp;<span className="purple">question ?</span></h1>
        <ul className="questions">
            {
              faqs != null &&
              (
                faqs.slice(0 , 4).map((faq) => <Question faq={faq} key={faq.id} />)
              )
            }
        </ul>
    </section>
  )
}

export default Faq