import  "../css/base.css";
import "../css/index.scss";
import "../assets/icon/iconfont.css"
import "./main"
import request from "../request/index"
import initCountry from "./country"
import countryConfig from '../until/configuration'
//挽留弹窗配置
const RETENTION_CONFIG = {
    'ke':{
        'title':'Abandon KARIBU BONUS?',
    },
    'ng':{
        'title':'Abandon WELCOME BONUS?',
    },
    'ug':{
        'title':'Abandon WELCOME BONUS?',
    },
}
const API_CONFIG ={
    // base:'https://bet-api.gbank.team/api',
    // game:'https://casino-api.gbank.team/api',
    // href:'https://www.gbank.team'
    base:'https://bet-apic.bangbet.com/api',
    game:'https://casino-apic.bangbet.com/api',
    href:'https://www.bangbet.com'
};
//设置渠道标
function setChannelMark(){
    //1、地址栏获取
};
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
        let countryStorage = window.localStorage['country'];
        let country = '';
        if(countryStorage == 0){
            country = 'ke';
        }else if(countryStorage == 1){
            country = 'ug';
        }else {
            country = 'ng';
        }
        let params = new FormData();
        params.append('platform','h5');
        params.append('showPosition','retain');
        params.append('country',country);
        //获取挽留弹窗的提示数据 https://bet-api.gbank.team/api/bet/activity/list
        request("POST", 'POSTJSON', API_CONFIG.base + '/bet/activity/list', params, 30000, function (res){
            let keepTitleDom = document.getElementById('keep-title');
            let keepSubTitleDom = document.getElementById('keep-sub-title')
            keepTitleDom.textContent = RETENTION_CONFIG[country].title;
            if(res && res.result == 1){
                keepSubTitleDom.textContent = res.data[0].subject;
            }
        });
        request("POST", 'JSON', API_CONFIG.base + '/bet/message/list', JSON.stringify({
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
        let keepContinueDom = document.getElementById('keep-continue');
        let tipsUssdKeDom = document.getElementById('tips-ussd-ke');
        let tipsUssdNgDom = document.getElementById('tips-ussd-ng');
        let tipsUssdUgDom = document.getElementById('tips-ussd-ug');
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
            window.location.href = API_CONFIG.href;
        });
        keepContinueDom.addEventListener('click',function (){
            keepDialogDom.style.display= 'none';
        })
        let phoneMaxlength = 10;
        //判断号码的长度
        if( this.getCountry() == 'ke'){
            tipsUssdKeDom.style.display = 'block'
            tipsUssdNgDom.style.display = 'none'
            tipsUssdUgDom.style.display = 'none'
            phoneMaxlength = 10;
        }else if(this.getCountry() == 'ng'){
            tipsUssdKeDom.style.display = 'none'
            tipsUssdNgDom.style.display = 'block'
            tipsUssdUgDom.style.display = 'none'
            phoneMaxlength = 11;
        }else {
            tipsUssdKeDom.style.display = 'none'
            tipsUssdNgDom.style.display = 'none'
            tipsUssdUgDom.style.display = 'block'
            phoneMaxlength = 10;
        }
        phoneInputDom.addEventListener('input',function (val){
            let inputLen = phoneInputDom.value.length;
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
            if(inputLen > phoneMaxlength ) {
                return this.value = this.value.slice(0,phoneMaxlength);
            }
            if(inputLen < phoneMaxlength ){
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
                request("POST",'POSTJSON', API_CONFIG.base + '/bet/user/checkUserIsExist', params, 30000, function (res){
                    //判断用户是否已经注册
                    if(res.result === 1){
                        let viewParams = new FormData();
                        viewParams.append('username',phone);
                        viewParams.append('event','RegisterPage');
                        //数据进行上报
                        request("POST",'POSTJSON', API_CONFIG.base + '/bet/view/event',viewParams, 30000, function (res){
                        });
                        otpIframeDomSrc.src = './otp/index.html?phone=' + originalPhone + '&country=' + that.getCountry();
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
        var country = this.getCountry();
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
    //验证手机号
}

window.onload = function(){
    userStatistics.init();
}