import axios from 'axios'

const root = 'https://cnodejs.org/api/v1';

// tab: ask share job good
// 获取列表
function getList(page, limit, tab) {
    const url = root + '/topics';
    let data = {
        page: page,
        limit: limit,
        tab: tab,
        mdrender: false
    }
    return axios.get(url, { params: data }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取文章
function getArticle(aid) {
    const url = root + '/topic/' + aid;
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

function checkAccess(aToken) {
    const url = root + '/accessToken';
    let data = {
        accesstoken: aToken
    }
    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data);
    })
}

function getMeInfo(loginname) {
    const url = root + '/user/' + loginname;
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data);
    })
}


export {
    getList,
    getArticle,
    checkAccess,
    getMeInfo
}