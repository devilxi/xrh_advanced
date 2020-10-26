import request from "../request/index"
let countryList = [];
// 初始化国家
function  initCountry() {
    request("GET", 'https://bet-api.gbank.team/api/bet/system/info?channel=h5', JSON.stringify({channel:'h5'}), 30000, function (res){
        if(res && res.result == 1){
            countryList = res.data;
            //处理国家DOM选择元素
            processingCountry();
        }
    });
};
//处理选择国家的DOM
function processingCountry(){
    let countryItemContainerDOM = document.getElementById('country-item-container');
    countryList.forEach((item)=>{
        //创建div
        let countryBox = document.createElement('div');
        countryBox.className = 'country-item'
        countryBox.id = 'country-item-' + item.alias;
        countryItemContainerDOM.append(countryBox);
        let countryItemDom = document.getElementById('country-item-' + item.alias);
        //创建图片
        let countryImg = document.createElement('img');
        countryImg.src=item.avatar;
        countryItemDom.append(countryImg);
        //创建span
        let countrySpan = document.createElement('span');
        countrySpan.className = 'country-item-title';
        countrySpan.textContent =item.alias;
        countryItemDom.append(countrySpan);
    })
    countryItemContainerDOM.addEventListener('click',function (e){
        let id = e.target.id;
        console.log(id)
        if(id === 'country-item-Kenya'){
            //肯尼亚
            window.localStorage['country'] = 0;
        }else if(id === 'country-item-Nigeria'){
            //尼日利亚
            window.localStorage['country'] = 2;
        }else {
            //乌干达
            window.localStorage['country'] = 1;
        }
        let countryDialogDom = document.getElementById('country-dialog');
        countryDialogDom.style.display = 'none';
    })
};


export default initCountry;