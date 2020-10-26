//HTTP请求
export  default  function httpAjax(method, url, params, timeout, callback, errback) {
    timeout = 30000;
    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            switch (xhr.status) {
                case 200: {
                    window.signUesrAction = null;
                    var xhrRlt = xhr.response;
                    if (typeof xhrRlt == 'string') xhrRlt = JSON.parse(xhrRlt);
                    callback(xhrRlt);
                }
                    ;
                    break;
                default: {
                    //如果链接执行错误，重新执行三次
                    if (!window.signUesrAction) {
                        window.signUesrAction = 0;
                    }
                    window.signUesrAction++;
                    if (window.signUesrAction <= 3) {
                        setTimeout(function () {
                            httpAjax(method, url, params, timeout, callback, errback);
                        }, 500);
                    } else {
                        errback(this._obj, xhr.response);
                    }
                    break;
                }
            }
        }
    }.bind(this);
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(params);
}