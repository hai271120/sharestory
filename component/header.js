const style =`
*{
    margin: 0;
    padding: 0;
}
.container{
    font-family: font-family: 'Roboto', sans-serif;
    background-color: #FF8400;
    display: flex;
    align-items: center;
    height: 64px;
    justify-content: space-between;
    padding: 0 20px;
    
}
.logo,.user-info{
    display: flex;
    align-items: center;
}
.branch{
    font-size: 1.5rem;
    color: #544a4a;
    margin-left: 10px;
}
.user-info i{
    font-size: 1.8rem;
    color: #544a4a;
}
.avatar{
    margin-right: 20px;
}
#btn{
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}
`

import {redirect} from '../index.js'


class StoryHeader extends HTMLElement{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this._shadowDom.innerHTML= `
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Padauk:wght@700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <style>
            ${style} 
        </style>
        <div class="container">
        <div class='logo'>
        <img src="./screen/anh/ecological.png" width="40px" height="40px" alt="">
            <div class="branch">Share Story</div>
        </div>
        <div class="user-info">
            <div class="avatar"> <i class="fa fa-user-circle" aria-hidden="true"></i> </div>
            <button id='btn'> <i class="fa fa-sign-out" aria-hidden="true"></i> </button>
        </div>
    </div>
        `
        this._shadowDom.getElementById('btn').addEventListener('click', () => {
            // xoa du lieu 
            window.localStorage.removeItem('currentUser');
            redirect('login')

        })
    }

    

}

window.customElements.define('story-header', StoryHeader)
