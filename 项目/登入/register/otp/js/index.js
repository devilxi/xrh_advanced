(function (doc, win) {
    var docEle = doc.documentElement,
        dpr = Math.min(win.devicePixelRatio, 3), //视网膜宽度
        scale = 1 / dpr,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var metaEle = doc.createElement('meta');
    metaEle.name = 'viewport';
    // metaEle.content = 'initial-scale=' + scale + ',maximum-scale=' + scale;
    metaEle.content = 'initial-scale=' + "1" + ',maximum-scale=' + "2,user-scalable=0";
    docEle.firstElementChild.appendChild(metaEle);

    var recalCulate = function () {
        var width = docEle.clientWidth;
        docEle.style.fontSize = 100 * (width / 750) + 'px';
    };
    if (!/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(navigator.userAgent.toLowerCase())) {
        doc.body.style.width = '750px';
        doc.body.style.margin = '0 auto';
        doc.body.style.display = "flex";
        docEle.style.fontSize = 100 + 'px';
        return
    }
    if (!doc.addEventListener) return;
    recalCulate();
    win.addEventListener(resizeEvent, recalCulate, false); //PC端
})(document, window);