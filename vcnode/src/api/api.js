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

function checkAccess(accessToken) {
    const url = root + '/' + accessToken;
    return axios.post(url).then((res) => {
        return Promise.resolve(res.data);
    })
}


export {
    getList,
    getArticle,
    checkAccess
}