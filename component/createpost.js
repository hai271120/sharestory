import {getitemlocalStorage} from '../utils.js'

class CreatePost extends HTMLElement{
    constructor() {
      super();
      this._shadowDom = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
      this._shadowDom.innerHTML =`
      <style>
          ${style}
      </style>
      <form id='create-post'>
          <textarea id='content' rows='6'></textarea>
          <button class = 'post'>Post</button>
      </form>
      `
      const postFrom = this._shadowDom.getElementById('create-post')
      postFrom.addEventListener('submit',e=>{
          e.preventDefault()
          const content = postFrom.content.value
          if(content.trim()===''){
              alert("nhap noi dung vao")
          }
          const user = getitemlocalStorage('currentUser')
          const data = {
              createBy:user.id,
              createAt:new Date().toISOString() ,
              content: content,
              comments: [],
              authorName:user.fullName,
              isShow:true,
          }
          firebase.firestore().collection('post').add(data)
          postFrom.content.value= ''
      })      
      
  }
}

const style = `
#create-post{
    width: 60%;
    margin: auto;
    margin-top: 20px;
}
#create-post textarea{
    width: 100%;
    border: 1px solid #dbdbdb;
    border-radius:10px;
    outline: none;
}
.post{
    background-color: #1976D1;
    color:#fff;
    padding: 10px 15px;
    border-radius: 10px;
}
`
window.customElements.define('create-post', CreatePost)
  