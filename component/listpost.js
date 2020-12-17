import {getDataFromDocs,getDataFromDoc} from "../utils.js"
const style =`
.list-post{
    width: 60%;
    margin: auto;
    margin-top: 15px;
}
`

class listpost extends HTMLElement{
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode: 'open'})
    }
 async  connectedCallback(){
        const res =
         await firebase
         .firestore()
         .collection('post')
         .where('isShow','==',true)
         .get()
         this.listenCollectionChange()
        const listPost = getDataFromDocs(res)
        let html = ''
        listPost.forEach(element => {
            html+=`
            <post-item time='${element.createAt}' author='${element.authorName}' content = "${element.content}"> </post-item>`
        })
        console.log(listPost);
        this._shadowDom.innerHTML=
        `
        <style>
        ${style}
        </style>
        <div class = 'list-post'>
        ${html}
        </div>`
    }
    listenCollectionChange(){
        let firstrun = true// khi khoi tao in ra sau khi 
        firebase
        .firestore()
        .collection('post')
        .where('isShow','==',true)
        .onSnapshot((snapshot)=>{
            if(firstrun){
                firstrun= false
                return
            }
           const docChange = snapshot.docChanges()
           for(const oneChange of docChange){
               if(oneChange.type ==='added'){
                   this.appendPostItem(getDataFromDoc(oneChange.doc))
               }
           }
        })
    }
    appendPostItem(data){//them len trang wed 
        const postItem = document.createElement("post-item")// tao the post-item
        postItem.setAttribute('time',data.createAt)
        postItem.setAttribute('author',data.authorName)
        postItem.setAttribute("content",data.content)
        const parent= this._shadowDom.querySelector('.list-post')
        parent.insertBefore(postItem,parent.firstChild)
    }
}
window.customElements.define('list-post',listpost)