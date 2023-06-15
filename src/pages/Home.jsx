import React from 'react'
import Buy from '../compnents/Buy'
import Faq from '../compnents/Faq'
import Features from '../compnents/Features'
import Header from '../compnents/Header'
import Testimonials from '../compnents/Testimonials'
import Trusted from '../compnents/Trusted'
import Unlock from '../compnents/Unlock'
import ChatSignals from '../compnents/ChatSignals'
import SignalsSection from './SignalsSection'


function Home({testimonials , faqs , products , user}) {
  return (
    <>
        <Header products={products} />
        <main>
            <Trusted />
            <Testimonials testimonials={testimonials} user={user} />
            <ChatSignals isChat={true} />
            <Features  />
            <Unlock />
            <SignalsSection />
            <Buy/>
            <Faq faqs={faqs} />
        </main>
    </>
  )
}

export default Home