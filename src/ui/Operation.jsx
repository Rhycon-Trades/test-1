import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'

function Operation({success , message , setOperation}) {
  useEffect(() => {
    setTimeout(() => {
      setOperation(false)
    },5000)
  },[])
  return (
    <div className='operation'>
        <FontAwesomeIcon className={`operation--logo ${!success && "failed-operation"}`} icon={success ? "fa fa-check" : "fa fa-xmark"} />
        <div className="operation--info">
          <h4 className="operation__header">{success ? "Operation was succesful" : "Operation failed"}</h4>
          <p className="operation__message">{message}</p>
        </div>
        <button onClick={() => setOperation(false)} className='operation-close'><FontAwesomeIcon icon='fa fa-xmark' /></button>
    </div>
  )
}

export default Operation