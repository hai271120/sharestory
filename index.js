import './screen/registers.js'
import './screen/login.js'
import "./component/inputwrapper.js"
import "./screen/story.js"
import "./component/header.js"
import{getitemlocalStorage} from './utils.js'
import './component/createpost.js'
import './component/postItem.js'
import './component/listpost.js'
checkAuthen()
 async function checkAuthen(){
   const user = getitemlocalStorage('currentUser')
   if(user){
    const res = await firebase.firestore()
    .collection('users')
    .where('email', '==', user.email)
    .where('password', '==',user.password)
    .get()
    if(res.empty) {
      redirect('login')
    } else {
      redirect('story')
    }
   }
   else{
     redirect('login')
   }
 }
export function redirect(screenName) {
  if(screenName === 'register') {
    document.getElementById('app').innerHTML = `
      <register-screen></register-screen>
    `
  } else if (screenName === 'login') {
    document.getElementById('app').innerHTML = `
      <login-screen></login-screen>
    `
  }
  else if(screenName === 'story'){
    document.getElementById("app").innerHTML =`
    <story-screen> </story-screen>
    `
  }
}