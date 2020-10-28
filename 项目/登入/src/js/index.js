import  "../css/base.css";
import "../css/index.scss";
import "../assets/icon/iconfont.css"
import "./main"
import request from "../request/index"
import initCountry from "./country"
import countryConfig from '../until/configuration'
let userStatistics = {
    data: {
        buttonAvailable: false,
    },
    init: function () {
        //获取基础配置
        this.getConfig();
        //绑定事件
        this.bind();
    },
    getConfig(){
        //初始化国家信息
        initCountry();
        //获取配置信息
        let country = window.localStorage['country'] == 0 ?'ke' : 'ng';
        request("POST", 'JSON', 'https://bet-api.gbank.team/api/bet/message/list', JSON.stringify({
            country: country,
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
        if(countryCode == 2){
            return 'ng';
        }else if(countryCode == 1){
            return 'ug';
        }else {
            return 'ke';
        }
    },
    bind: function () {
        let that = this;
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
        // let otpDialogDom = document.getElementById('otp-dialog');
        //显示国家图标的DOM
        let switchCountryIconDom = document.getElementById('switch-country-icon');
        //显示国家名称的DOM
        let switchCountryNameDom = document.getElementById('switch-country-name');
        //手机号输入DOM
        let phoneInputDom = document.getElementById('phoneInput');
        //提交按钮DOM
        let formSubmitDOM = document.getElementById('formSubmit');
        //输入手机的input
        let subFormDom = document.getElementById('sub-form');
        //用户已经注册提示
        let registeredErrorDom = document.getElementById('registered-error');
        //OTP弹层的DOM
        let otpIframeDom = document.getElementById('otpIframe');
        let otpIframeDomSrc = document.getElementById('otpIframeDom');
        //添加监听事件
        switchCountryDom.addEventListener('click',function (e){
            let countryCode =  window.localStorage.getItem('country');
            let countryItemDom_Uganda = document.getElementById('country-item-Uganda');
            let countryItemDom_Nigeria = document.getElementById('country-item-Nigeria');
            let countryItemDom_Kenya = document.getElementById('country-item-Kenya');
            let countryItemId = 'country-item';
            if(countryCode == 1){
                //乌干达
                countryItemDom_Uganda.className = 'country-item-select';
                countryItemDom_Kenya.className = 'country-item';
                countryItemDom_Nigeria.className = 'country-item';
            }else if(countryCode == 2){
                //尼日利亚
                countryItemDom_Nigeria.className = 'country-item-select';
                countryItemDom_Kenya.className = 'country-item';
                countryItemDom_Uganda.className = 'country-item';
            }else {
                //肯尼亚
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
        });
        phoneInputDom.addEventListener('input',function (val){
            let inputLen = phoneInputDom.value.length;
            console.log(inputLen);
            //控制按钮颜色
            if(inputLen > 8){
                //讲按钮改变为可操作性状态
                formSubmitDOM.className = 'available-button';
            }
            if(inputLen < 9){
                //讲按钮改为不可操作状态
                formSubmitDOM.className = 'form_btn'
            }
            //控制输入手机号位数
            if(inputLen > 10 ) {
                return this.value = this.value.slice(0,10);
            }
            if(inputLen < 10 ){
                registeredErrorDom.style.display = 'none';
            }
        });
        formSubmitDOM.addEventListener('click',function (){
            //提交验证 1、验证格式是否正确 2、验证用户是否已经注册
            let formatVerification = that.validatePhone(phoneInputDom.value);
            const countryData = countryConfig[that.getCountry()];
            let  originalPhone = phoneInputDom.value;
            let phoneInput = originalPhone;
            if(phoneInput.slice(0,1) == 0){
                phoneInput = phoneInput.slice(1,phoneInput.length);
            }
            let phone = countryData.areaCode + phoneInput;
            var params = new FormData(subFormDom);
            params.append('phone',phone);
            if(formatVerification){
                request("POST",'POSTJSON', 'https://bet-api.gbank.team/api/bet/user/checkUserIsExist', params, 30000, function (res){
                    //判断用户是否已经注册
                    if(res.result === 1){
                        otpIframeDomSrc.src = '../otp/index.html?phone=' + originalPhone + '&country=' + that.getCountry();
                        //打开验证码的弹窗
                        otpIframeDom.style.display = 'block';
                    }else {
                        //用户已经注册
                        registeredErrorDom.style.display = 'block';
                    }
                });
            }
        })
    },
    validatePhone(phone) {
        let keReg = /(^\d{9,10}$)/;
        let ngReg = /(^07\d{9}$)|(^7\d{9}$)|(^08\d{9}$)|(^8\d{9}$)|(^09\d{9}$)|(^9\d{9}$)/;
        let ghReg = /[0-9]{9,10}/;
        // var {data: {country}} = this;
        switch ('ke') {
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
    //验证手机号
}

window.onload = function(){
    userStatistics.init();
}