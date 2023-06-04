import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/init";
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider , getRedirectResult, signInWithRedirect } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Operation from "../../ui/Operation";

function SignIn({ setUser }) {

  const [operation , setOperation] = useState(false)
  const [operationState , setOperationState] = useState(true)
  const [message , setMessage] = useState('')

  function displayOperation(message , state){
    setOperationState(state)
    setMessage(message)
    setOperation(true)
  }

  useEffect(() => {
    if(operation){
      setTimeout(() => {
        setOperation(false)
      },5000)
    }
  }, [operation])

  let provider 

  async function signIn(providerType) {
    if(providerType === "google"){
      provider = new GoogleAuthProvider()
    }else if(providerType === "apple"){
      provider = new OAuthProvider('apple.com')
    }else if(providerType === 'facebook'){
      provider= new FacebookAuthProvider()
    }

    await signInWithRedirect(auth, provider)
  };

  useEffect(() => {
    getRedirectResult(auth)
        .then((userCredential) => {
          setUser(userCredential.user)
          displayOperation("you are now signed in" , true)
          setTimeout(() => {
            window.location.pathname = '/'
          },2000)
        })
        .catch(() => {

        })
  },[])

  return (
    <div className="auth-container">
      <div className="modal">
        <figure className="modal--block modal--figure">
          <img
            className="modal--block__img"
            src="https://cdn.discordapp.com/attachments/1088531111942037534/1106309210200866956/RhyconTrades_the_real_world_with_a_portal_that_leads_to_a_room__c462b3a0-3e94-4e17-8674-ecf3e0f17ae3.png"
          />
        </figure>
        <div className="modal--block modal--content">
          <p className="block--note">hey there !</p>
          <h3 className="block--header">Welcome to rhycon</h3>
            <div className="block--providers">
              <button onClick={() => signIn('google')} className="block__provider"><FontAwesomeIcon className="block__provider--logo google" icon='fa-brands fa-google'/> Continue with Google</button>
              <button onClick={() => signIn('apple')} className="block__provider"><FontAwesomeIcon className="block__provider--logo apple" icon='fa-brands fa-apple'/> Continue with Apple</button>
              <button onClick={() => signIn('facebook')} className="block__provider"><FontAwesomeIcon className="block__provider--logo facebook" icon='fa-brands fa-facebook'/> Continue with Facebook</button>
            </div>
        </div>
      </div>
      {
        operation && <Operation success={operationState} message={message} setOperation={setOperation} />
      }
    </div>
  );
}

export default SignIn;
