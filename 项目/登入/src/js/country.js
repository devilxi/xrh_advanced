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
    let count = 1 ;
    countryList.forEach((item)=>{
        //创建div
        let countryBox = document.createElement('div');
        countryBox.className = 'country-item'
        countryBox.id = 'country-item-' + count;
        countryItemContainerDOM.append(countryBox);
        let countryItemDom = document.getElementById('country-item-' + count);
        //创建图片
        let countryImg = document.createElement('img');
        countryImg.src=item.avatar;
        countryItemDom.append(countryImg);
        //创建span
        let countrySpan = document.createElement('span');
        countrySpan.className = 'country-item-title';
        countrySpan.textContent =item.alias;
        countryItemDom.append(countrySpan);
        count++;
    })
};

export default initCountry;