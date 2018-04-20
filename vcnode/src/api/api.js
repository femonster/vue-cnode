import axios from 'axios'

const root = 'https://cnodejs.org/api/v1';

// tab: ask share job good
// 获取列表
function getList(page, limit, tab) {
    const url = root + '/topics';
    let data = {
        page: page,
        limit: limit,
        tab: tab
    }
    return axios.get(url, { params: data }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取文章
function getArticle(aid) {
    const url = root + '/topics/' + aid;
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}


export {
    getList,
    getArticle
}