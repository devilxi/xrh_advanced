function Sign(option) {
    this.token = option.token;
    this.secretKey = option.secretKey;
}
Sign.prototype.pars=function (param, key, encode) {
  if (param == null) return '';
  var arr = [];
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
      arr.push(key + '=' + ((encode == null || encode) ? encodeURIComponent(param) :
          param));
  } else {
      for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' +
              i);
          arr.push(this.pars(param[i], k, encode));
      }
  }
  return arr.join("&");
},
Sign.prototype.sign = function (requestType, params) {
    var token = this.token;
    var secretKey = this.secretKey;
    var time = new Date().getTime().toString();
    let d = '';
    let paramsStr = '';
    if (requestType == 'POSTJSON') {
        d = params ? JSON.stringify(params) : '';
    } else {
        paramsStr = params ? this.pars(this.objKeySort(params)) : '';
    }
    let bodyMd5 = md5(d).toString();
    let sign = md5(token + secretKey + time + paramsStr + bodyMd5).toString();
    var header;
    switch (requestType) {
        case "GET":
            header = {
                "Accept": "application/json",
                token: token,
                time: time,
                r: sign
            };
            break;
        case "POSTFORM":
            header = {
                // Accept: "application/json",
                // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                token: token,
                time: time,
                r: sign
            };
            break;
        case "POSTJSON":
            header = {
                "Content-Type": "application/json; charset=utf-8",
                token: token,
                time: time,
                r: sign
            }
            break;
    }
    return header;
}
Sign.prototype.objKeySort = function (arys) {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    let newkey = Object.keys(arys).sort();
    let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (let i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]];
        //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
}