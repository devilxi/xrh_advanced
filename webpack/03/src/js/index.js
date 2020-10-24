import  "../css/base.css";
import "../css/index.scss";
import "../assets/icon/iconfont.css"
import "./main"
import httpRequest from '../request/index'

let userStatistics = {
    data: {
        isShowPhone: true,
        country: 'ke',
        countryList: ['ke', 'ug', 'ng', 'gh'],
        regionNumberList: {
            ke: '254',
            ug: '256',
            ng: '234',
            gh: '233'
        },
        validateResult: true,
    },
    init: function () {
        this.bind();
        this.getCountry();
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

        //添加监听事件
        switchCountryDom.addEventListener('click',function (){
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


















        $('#formSubmit').on('click', () => {
            var {data: {isShowPhone}} = this;
            let validateResult, type, value;
            if (isShowPhone) {
                type = 'phone';
                value = $('#phoneInput').val().trim();
                validateResult = this.validatePhone(value);
            } else {
                type = 'email';
                value = $('#emailInput').val().trim();
                validateResult = this.validateEmail(value);
            }
            this.data.validateResult = validateResult;
            if (validateResult) {
                this.submitInfo(type, value);
            } else {
                $('#formRemind').show()
                    .text(type === 'phone' ? 'Please enter the valid mobile number.' : 'Please enter the valid email.');
            }
        });

        $('#dialogConfirm').on('click', () => {
            $('#dialog').hide();
            $('#phoneInput').val('');
            $('#emailInput').val('');
        });

        $('#dialogClose').on('click', () => {
            $('#dialog').hide();
        });

        $('#formChange').on('click', () => {
            $('#formRemind').hide();
            var {data: {isShowPhone}} = this;
            this.data.isShowPhone = !isShowPhone;
            var phoneCont = $('#phoneCont');
            var emailCont = $('#emailCont');
            var formChange = $('#formChange');
            if (this.data.isShowPhone) {
                phoneCont.show();
                emailCont.hide();
                formChange.text('Use email');
            } else {
                phoneCont.hide();
                emailCont.show();
                formChange.text('Use mobile number');
            }
        });

        $('#phoneInput').on('input', () => {
            if (this.data.validateResult) return;
            $('#formRemind').hide();
        });

        $('#emailInput').on('input', () => {
            if (this.data.validateResult) return;
            $('#formRemind').hide();
        });
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
    validateEmail(email) {
        var emailReg = /^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\\\.][A-Za-z]{2,3}([\\\\.][A-Za-z]{2})?$/;
        return emailReg.test(email);
    },
    getCountry() {
        $.get('https://bet-apic.bangbet.com/api/bet/country', (res) => {
            if (res && res.country) {
                var country = res.country.toLowerCase();
                // var country = 'ug';
                var {data: {regionNumberList, countryList}} = this;
                if (!countryList.includes(country)) return;
                var region = regionNumberList[country];
                $('#phoneLabel').text('+' + region);
                this.data.country = country;
            }
        }, 'json')
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
    }
}

window.onload = function(){
    userStatistics.init();
}