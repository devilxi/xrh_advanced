import  "../css/base.css";
import "../css/index.scss";
import "../assets/icon/iconfont.css"
import "./main"
import request from "../request/index"
import initCountry from "./country"

let userStatistics = {
    data: {
        isShowPhone: true,
        country: 'ke',
        regionNumberList: {
            ke: '254',
            ug: '256',
            ng: '234',
            gh: '233'
        },
        validateResult: true,
        countryList:[]
    },
    init: function () {
        this.getConfig();
        initCountry();
        this.bind();
    },
    getConfig(){
        request("POST", 'https://bet-api.gbank.team/api/bet/message/list', JSON.stringify({
            country: "ke",
            type: "register"
        }), 30000, function (res){
            let contentAdvertisingSpaceDom = document.getElementById('content-advertising-space');
            let registerButtonBubbleDom = document.getElementById('register-button-bubble');
            if(res && res.result == 1){
                if(res.data.messages.RegisterAdpicture){
                    let contentAdvertisingSpaceImgDom = document.createElement('img');
                    contentAdvertisingSpaceImgDom.src = res.data.messages.RegisterAdpicture;
                    contentAdvertisingSpaceDom.append(contentAdvertisingSpaceImgDom);
                    contentAdvertisingSpaceDom.style.display = 'block';
                }
                if(res.data.messages.RegisterButtonBubble){
                    registerButtonBubbleDom.src = res.data.messages.RegisterButtonBubble;
                    registerButtonBubbleDom.style.display = 'block';
                }
            }else {
                contentAdvertisingSpaceDom.style.display = 'none';
                registerButtonBubbleDom.style.display = 'none';
            }
        });
    },
    getCountry(){
        //获取缓存中的国家数值
        let countryCode =  window.localStorage.getItem('country');

    },
    bind: function () {
        //切换国家按钮DOM
        let switchCountryDom = document.getElementById('switch-country');
        //选择国家弹框DOM
        let countryDialogDom = document.getElementById('country-dialog');
        //关闭国家弹窗按钮的DOM
        let closeCountryItemDom = document.getElementById('close-country-item');
        //挽留弹窗的DOM
        let keepDialogDom = document.getElementById('keep-dialog');
        //返回按钮的DOM
        let headerBackDom = document.getElementById('header-back');
        //关闭挽留弹窗按钮DOM
        let closeKeepDom =  document.getElementById('close-keep');
        // opt弹窗的DOM
        let otpDialogDom = document.getElementById('otp-dialog');
        // otp关闭按钮DOM
        let closeOtpDom = document.getElementById('close-otp');
        //添加监听事件
        switchCountryDom.addEventListener('click',function (e){
            let countryCode =  window.localStorage.getItem('country');
            let countryItemDom_Uganda = document.getElementById('country-item-Uganda');
            let countryItemDom_Nigeria = document.getElementById('country-item-Nigeria');
            let countryItemDom_Kenya = document.getElementById('country-item-Kenya');
            let countryItemId = 'country-item';
            if(countryCode == 1){
                countryItemDom_Uganda.className = 'country-item-select';
                countryItemDom_Kenya.className = 'country-item';
                countryItemDom_Nigeria.className = 'country-item';
            }else if(countryCode == 2){
                countryItemDom_Nigeria.className = 'country-item-select';
                countryItemDom_Kenya.className = 'country-item';
                countryItemDom_Uganda.className = 'country-item';
            }else {
                countryItemDom_Kenya.className = 'country-item-select';
                countryItemDom_Uganda.className = 'country-item';
                countryItemDom_Nigeria.className = 'country-item';
            }
            countryDialogDom.style.display = 'block';
        });
        closeCountryItemDom.addEventListener('click',function (){
            countryDialogDom.style.display = 'none';
        });
        headerBackDom.addEventListener('click',function (){
            keepDialogDom.style.display= 'block';
        });
        closeKeepDom.addEventListener('click',function (){
            keepDialogDom.style.display= 'none';
        })
        closeOtpDom.addEventListener('click',function (){
            otpDialogDom.style.display = 'none';
        })
        return ;
    },
    validatePhone(phone) {
        var keReg = /(^\d{9,10}$)/;
        var ngReg = /(^07\d{9}$)|(^7\d{9}$)|(^08\d{9}$)|(^8\d{9}$)|(^09\d{9}$)|(^9\d{9}$)/;
        var ghReg = /[0-9]{9,10}/;
        var {data: {country}} = this;
        switch (country) {
            case 'ke':
                return keReg.test(phone);
            case 'ug':
                return keReg.test(phone);
            case 'ng':
                return ngReg.test(phone);
            case 'gh':
                return ghReg.test(phone);
        }
    },
    submitInfo(type, value) {
        let region, params = {};
        let {country, regionNumberList} = this.data;
        if (type === 'phone') {
            region = regionNumberList[country];
            if (value.startsWith('0')) value = value.substring(1);
            params.username = region + value;
        } else {
            params.email = value;
            params.country = country;
        }
        $.post('https://bet-apic.bangbet.com/api/bet/comingSoon', params, (res) => {
            if (res && res.result === 1) {
                $('#dialog').show();
            }
        });
    },
}

window.onload = function(){
    userStatistics.init();
}