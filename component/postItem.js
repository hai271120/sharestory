const style =` 
.post-item{
    border: 1px solid #dbdbdb;
    padding: 20px;
    border-radius: 10px;
    margin-bottom:10px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
}
.author-name{
    font-weight: 600;
    margin-bottom: 10px;
}
.time{
    font-size: 12px;
}
`
import {covertDate} from "../utils.js"
class postitem extends HTMLElement{
    constructor(){
        super()
        this._shadowDom= this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.author = this.getAttribute('author')
        this.time =covertDate(this.getAttribute('time'))
        this.content = this.getAttribute('content')
        this._shadowDom.innerHTML=`
        <style>
        ${style}
        </style>
        <div class="post-item">
              <div class="author-name"> ${this.author} </div>
              <div class="time"> ${this.time}</div>
              <div class="content">
                  ${this.content}
              </div>
          </div>
        `
    }
}
window.customElements.define('post-item',postitem)