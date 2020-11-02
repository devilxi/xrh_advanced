import request from "../request/index"
import countryConfig from "../until/configuration";
let countryList = [];
const UG_COUNTRY_CONFIG = countryConfig['ug'];
let NG_COUNTRY_CONFIG = countryConfig['ng'];
let KE_COUNTRY_CONFIG = countryConfig['ke'];

//选择国家容器的DOM
let countryItemContainerDOM = document.getElementById('country-item-container');
//显示国家图标的DOM
let switchCountryIconDom = document.getElementById('switch-country-icon');
//显示国家名称的DOM
let switchCountryNameDom = document.getElementById('switch-country-name');
//区号
let phoneLabelDom = document.getElementById('phoneLabel');
let phoneInputDom = document.getElementById('phoneInput');
// 初始化国家
function  initCountry() {
    for (let item in countryConfig){
        console.log(item);
    }
    //自动光标定位
    phoneInputDom.focus();
    let country = window.localStorage['country'];
    if(country == 1){
        switchCountryIconDom.src = UG_COUNTRY_CONFIG.img;
        switchCountryNameDom.textContent = UG_COUNTRY_CONFIG.name;
        phoneLabelDom.textContent = "+" + UG_COUNTRY_CONFIG.areaCode;
    }else if(country == 2){
        switchCountryIconDom.src = NG_COUNTRY_CONFIG.img;
        switchCountryNameDom.textContent = NG_COUNTRY_CONFIG.name;
        phoneLabelDom.textContent = "+" + NG_COUNTRY_CONFIG.areaCode;
    }else {
        switchCountryIconDom.src = KE_COUNTRY_CONFIG.img;
        switchCountryNameDom.textContent = KE_COUNTRY_CONFIG.name;
        phoneLabelDom.textContent = "+" + KE_COUNTRY_CONFIG.areaCode;
    }
    processingCountry();
};
//处理选择国家的DOM
function processingCountry(){
    for (let key in countryConfig){
        let item = countryConfig[key];
        //创建div
        let countryBox = document.createElement('div');
        countryBox.className = 'country-item'
        countryBox.id = 'country-item-' + item.name;
        countryItemContainerDOM.append(countryBox);
        let countryItemDom = document.getElementById('country-item-' + item.name);
        //创建图片
        let countryImg = document.createElement('img');
        countryImg.id = 'country-item-img-' + item.name;
        countryImg.src=item.img;
        countryItemDom.append(countryImg);
        //创建span
        let countrySpan = document.createElement('span');
        countrySpan.className = 'country-item-title';
        countrySpan.id = 'country-item-img-title-' + item.name;
        countrySpan.textContent =item.name;
        countryItemDom.append(countrySpan);
    }
    //给按钮添加绑定事件
    countryItemContainerDOM.addEventListener('click',function (e){
        let id = e.target.id;
        console.log(id)
        if(id === 'country-item-Uganda' || id === 'country-item-img-Uganda' || id === 'country-item-img-title-Uganda'){
            //乌干达
            window.localStorage['country'] = 1;

        }else if(id === 'country-item-Nigeria' || id === 'country-item-img-Nigeria' || id === 'country-item-img-title-Nigeria'){
            //尼日利亚
            window.localStorage['country'] = 2;
        }else {
            //肯尼亚
            window.localStorage['country'] = 0;
        }
        location.reload();
        let countryDialogDom = document.getElementById('country-dialog');
        countryDialogDom.style.display = 'none';
    })
};


export default initCountry;