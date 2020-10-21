import Header from "./common/header";
import imgSrc from './images/download.jpg'
import './css/index.css'
import './css/1.scss'
new Header()

let root = document.getElementById('root');
let imgDom = document.createElement('img');
imgDom.src=imgSrc;
console.log(imgDom);
root.append(imgDom)
consol.log('2');