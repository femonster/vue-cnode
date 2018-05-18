function dateFormat(time, fmt) {
    let _this = new Date(time);
    var o = {
        "M+": _this.getMonth() + 1, //月份 
        "d+": _this.getDate(), //日 
        "h+": _this.getHours(), //小时 
        "m+": _this.getMinutes(), //分 
        "s+": _this.getSeconds(), //秒 
        "q+": Math.floor((_this.getMonth() + 3) / 3), //季度 
        "S": _this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 改造返回的数据（time，tab，content）
function changeData(data) {
    var oTab = {
        "ask": "问答",
        "share": "分享",
        "job": "招聘",
        "good": "精华"
    }
    for (var i = 0; i < data.length; i++) {
        data[i].create_at = dateFormat(data[i].create_at, "yyyy-MM-dd hh:mm:ss");
        if (!!data[i].tab) {
            data[i].tab = oTab[data[i].tab];
        }
        let dc = data[i].content;
        if (dc.length > 120) {
            data[i].content = dc.slice(0, 120) + "...";
        }
    }
    return data;
}

function getRect(el) {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}

const ease = {
    // easeOutQuint
    swipe: {
        style: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fn: function(t) {
            return 1 + (--t * t * t * t * t)
        }
    },
    // easeOutQuard
    swipeBounce: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function(t) {
            return t * (2 - t)
        }
    },
    // easeOutQuart
    bounce: {
        style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fn: function(t) {
            return 1 - (--t * t * t * t)
        }
    }
}

// toast
var toast = {
    sCls: "zgktoast",
    toastTime: null,
    init: function(text, delay) {
        console.log(this.sCls);
        var _this = this;
        _this.toastTime && clearTimeout(_this.toastTime);
        var selector = document.querySelector("." + _this.sCls);
        if (!selector) {
            var domdiv = document.createElement('div');
            _this.sCls = 'toast' + Math.random().toString(36).substring(2);
            domdiv.className = _this.sCls;
            domdiv.innerText = text;
            domdiv.style.cssText = "position: fixed;width: auto;max-width: 140px;top:50%;left: 50%;-webkit-transform:translate3d(-50%,-50%,0);padding:10px 12px;background-color: #000;opacity:0.8;border-radius: 12px;z-index: 10001;font-size: 14px;color: #fff;text-align: center;transition:opacity 0.3s ease-in;-webkit-transition:opacity 0.3s ease-in;";
            document.getElementsByTagName("body")[0].appendChild(domdiv);
        }
        _this.toastTime = setTimeout(function() {
            var selector = document.querySelector("." + _this.sCls);
            if (!selector) return;
            selector.style.opacity = '0';
            setTimeout(function() {
                selector.parentNode.removeChild(selector);
            }, 300);
        }, delay || 2000);
    }
}


/**
 * @param {cookie名}
 * @param {cookie值}
 * @param {设置cookie域}
 * @param {过期时间（天）} [varname]
 */
function setCookie(name, value, domain, day) {
    var date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * day);
    document.cookie = name + '=' + value + ';expires=' + date + ';domain=' + domain + ';path=/';
}

/**
 * 获取cookie
 * @return {[type]} [description]
 */
function getCookie() {
    var data = document.cookie.split(';'),
        param = {};
    for (var i = 0; i < data.length; i++) {
        param[data[i].split('=')[0].replace(/\s/, '')] = data[i].split('=')[1];
    }
    return param;
}

/**
 * 删除cookie
 * name: 删除cookie名
 * domain: 所在的域
 */
function delCookie(name, domain) {
    document.cookie = name + '=' + getCookie(name) + ';expires=' + (new Date(1)) + ';domain=' + domain + ';path=/';
}


export {
    dateFormat,
    changeData,
    getRect,
    ease,
    toast,
    setCookie,
    getCookie,
    delCookie
}