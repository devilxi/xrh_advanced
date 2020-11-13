/* 注册相关操作 */
function sendRegister(self, action, label) {
    // console.log("sendRegister:" + self.$store.state.channel);
    //提交手机信息
    let channel = self.$store.getters["channel/sysytemChannel"];
    let cacheInitial=storage.getLocal("system_initial");
    if (label) {
        channel = label;
    }
    isToday(cacheInitial)?channel=`${restore(channel)}/today/`:channel=restore(channel);
    isPwa()?channel=`${channel}/pwa/`:"";
    console.log("渠道注的>>>>",channel);
    gtag('event', action, {
        'event_category': "register",
        'event_label': channel
    });
}

/* faceBook上报 */
function facebookAppear() {
    let storageChannel = storage.getLocal('channel');
    //FACEBOOK ADD
    let relation = {
        KSWVVFBZ: "2181949638765303",
        KSWVVFBF: "535630900465725",
        NSWVVFBF: "544438569561695",
        NSWVVFBZ: "2181949638765303"
    };
    let fbId =  relation[storageChannel];
    if (fbId&&fbq) {
        if(!window.currFacebookId || window.currFacebookId != fbId){
            window.currFacebookId = fbId;
            fbq("init", fbId);
        }
        fbq('track', 'CompleteRegistration');
    }
    //TABOOLA ADD
    let taboolCns = {
        KSWVVTB:1245025,
        NSWVVTB:1245025
    };
    // 运营使用的渠道是 KSWVVTB+任意数字, 需要做相似匹配
    let taboolaId = null;
    if(storageChannel){
        for(let cn in taboolCns){
            if(storageChannel.indexOf(cn) != -1) {
                taboolaId = taboolCns[cn];
                break;
            }
        }
    }

    if(taboolaId){
        //taboola 资源加载
        if(!window._tfa){
            window._tfa = window._tfa || [];
            !(function (t, f, a, x) {
                if (!document.getElementById(x)) {
                    t.async = 1;
                    t.src = a;
                    t.id = x;
                    f.parentNode.insertBefore(t, f);
                }
            })(
                document.createElement("script"),
                document.getElementsByTagName("script")[0],
                "//cdn.taboola.com/libtrc/unip/1245025/tfa.js",
                "tb_tfa_script"
            );
        }
        _tfa.push({notify: 'event', name: 'complete_registration', id: taboolaId});
    }

    //GOOGLE ADD
    if(window.isGoogleGa&&gtag){
        gtag('event', 'conversion', {
            'send_to': 'AW-679492208/WzwTCJTCwskBEPD0gMQC',
            'event_callback': function(){
                console.log("gtag-end");
            }
        });
    }
}

/* webView 上报 */
function webviewLog(self,type,userId=""){
    const {device}=self.$store.state.sidebar;
    const userInfo =self.$store.getters['user/userInfo'];
    let userAgent=window.navigator.userAgent;
    // let channel=self.$store.getters["channel/sysytemChannel"];
    let channel=storage.getLocal(CHANNEL);
    let platform=isPwa()?13:3;
    let cacheInfo=storage.getLocal(`log.Today${type}`);
    let cacheToday=cacheInfo&&cacheInfo.split("_")[0];
    let cacheTodayNum=cacheInfo&&cacheInfo.split("_")[1];
    let date = new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    let toDay=`${year}${month}${day}`;
    let cacheInitial = storage.getLocal("system_initial");
    let clientTag =!cacheInitial||isToday(cacheInitial) ? 1 : 0;
    let country=self.$store.getters["country/countryState"];
    country=country*1?(country*1==1?"ug":"ng"):"ke";
    let option={
        userId:userInfo&&userInfo.userId||userId||"",
        userAgent:userAgent,
        channel:channel,
        platform:platform,
        deviceUid:device&&device.udid,
        type:type,
        ext:toDay,
        clientTag:clientTag,
        country:country||"ug"
    }
    switch(type*1){
        case 0:
            if(!cacheToday||cacheToday!=toDay){
                webViewLog(option).then(()=>{
                    storage.setLocal(`log.Today${type}`,`${toDay}_0`);
                }).catch()
            }
            break;
        default :
            if(!cacheToday){
                webViewLog(option).then(()=>{
                    storage.setLocal(`log.Today${type}`,`${toDay}_0`);
                }).catch()
            }else if(cacheToday!=toDay||cacheTodayNum*1<20){
                cacheTodayNum=cacheToday!=toDay?0:++cacheTodayNum*1;
                webViewLog(option).then(()=>{
                    storage.setLocal(`log.Today${type}`,`${toDay}_${cacheTodayNum}`);
                }).catch()
            }
            break;
    }

}

/* 处理 FireBase上报 */
function upLoadPwaFireBase(self){
    if(!isPwa())return;
    const {device}=self.$store.state.sidebar;
    const userInfo =self.$store.getters['user/userInfo'];
    if(!window.getSubscription)return;
    window.getSubscription((token)=>{
        console.log("token","aaaaa",token);
        if(token){
            console.log("val--->>",typeof token,token);
            let option={
                userId: userInfo&&userInfo.userId||userId||"",
                platform: 13,
                h5PushCode: JSON.stringify(token),
                deviceUid: device&&device.udid,
                country: self.$store.getters["country/requestCountryStr"],
                channel: self.$store.getters["channel/sysytemChannel"]
            }

            upLoadPwaFireBase(option).then((res)=>{
                console.log(JSON.stringify(res));
            }).catch((e)=>{
                console.log(e);
            })
        }else{
            console.log("token","bbbbbb",window.subscribeUser);
            window.subscribeUser((token)=>{
                console.log("token","bbbbbb",token);
                let option={
                    userId: userInfo&&userInfo.userId||userId||"",
                    platform: 13,
                    h5PushCode: JSON.stringify(token),
                    deviceUid: device&&device.udid,
                    country: self.$store.getters["country/requestCountryStr"],
                    channel: self.$store.getters["channel/sysytemChannel"]
                }
                upLoadPwaFireBase(option).then((res)=>{
                    console.log(JSON.stringify(res));
                }).catch((e)=>{
                    console.log(e);
                })
            })
        }

    })

}