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


export {
    dateFormat,
    changeData,
    getRect,
    ease
}