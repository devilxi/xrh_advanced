function Toast(msg,duration){
    let toastDivBox = document.getElementById('toast-div');
    if(toastDivBox) toastDivBox.remove();
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="max-width:80%;min-width: 1.5rem;padding:0.2rem 0.14rem;color: rgb(255, 255, 255);text-align: center;border-radius: 0.4rem;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 0.24rem;";
    m.id = 'toast-div';
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        let toastDivDom = document.getElementById('toast-div');
        console.log(toastDivDom,'toastDivDom')
        toastDivDom.style.display = 'none';
    }, duration);
}