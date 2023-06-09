import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Loading() {
  return (
    <div style={{backgroundColor:'#000000',margin:'0px', padding:'100px' ,borderRadius:'0',width:"100%", minHeight:"100vh" ,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} className="message--content">
    <div className="loading-spinner-wrapper" >
      <FontAwesomeIcon className="loading-spinner" icon='fa fa-spinner' />
    </div>
    <p style={{textAlign:'cetner'}}>invest this time to think of your future</p>
  </div>
  )
}

export default Loading