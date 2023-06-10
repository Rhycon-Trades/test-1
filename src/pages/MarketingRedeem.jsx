import React, { useState } from 'react'
import AppNav from '../compnents/AppNav'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Operation from '../ui/Operation'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/init'

function MarketingRedeem({ user , products }) {
    const [displayOperation , setDisplayOperation] = useState(false)
    const [success , setSuccess] = useState(true)
    const [operationMessage , setOperationMessage] = useState('')
    async function redeemProduct(product){
        if(user.credits < (product.salePrice || product.originalPrice)){
            setDisplayOperation(true)
            setSuccess(false)
            setOperationMessage("you don't have enaugh credits")
        }else{
            let userUpdate 

            if(product.nameInUrl === 'signals'){
                let today = new Date()
                today.setDate(today.getDate() + 7)
                userUpdate = {
                    [product.role]:true,
                    signals_duration:today,
                    credits:user.credits - (product.salePrice ||product.originalPrice)
                }
            }else{
                userUpdate = {
                    [product.role]:true,
                    credits:user.credits - (product.salePrice ||product.originalPrice)
                }
            }

            updateDoc(doc(db , 'users' , user.docId), userUpdate)
            setDisplayOperation(true)
            setSuccess(true)
            setOperationMessage("Product have been redeemed")
        }
    }

  return (
    <main className="room">
        <AppNav />
        {
            user.marketing ? (
                <div className='marketing'>
                <div className="marketing--nav">
                    <Link to='/marketing'>
                        <button style={{padding:'0'}} className='user--theme'><FontAwesomeIcon icon='fa fa-arrow-left' /></button>
                    </Link>
                    <p className='marketing--nav__text'>Balance: {user.credits.toFixed(2)}<sub>c</sub></p>
                </div>
                <ul className="marketing--store">
                    {products && products.map((product) =>
                    <div className="cart--table__column">
      <div className="table--column__info">
        <figure className="column--info__img">
          <img src={product.ImgUrl} />
        </figure>
        <div className="column--info__display">
          <h4 className="info--display__title">{product.title}</h4>
        </div>
      </div>
      <p className="table--column__price">{(product.salePrice || product.originalPrice).toFixed(2)}<sub>c</sub></p>
      {
        !!eval('user.' + product.role) ? <button className={`marketing--redeem__btn`}>Owned</button> : <button onClick={() => redeemProduct(product)} className={`marketing--redeem__btn`}>redeem</button>
      }

    </div>)}
                </ul>
                {
                    displayOperation && <Operation success={success} setOperation={setDisplayOperation} message={operationMessage} />
                }
                </div>
            ) : (
                <div style={{height:'100vh' , justifyContent:'center'}} className="marketing--application-wrapper">
                    <p style={{color:'#ffffff' , display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center'}}>You don't have permission to access this page <br/> <span>marketing role required</span></p>
                    <br/>
                    <Link to='/marketing'><button>
                        Get role
                        </button></Link>
                </div>
            )
        }
    </main>
  )
}

export default MarketingRedeem