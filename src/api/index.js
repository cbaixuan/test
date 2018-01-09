const _baseUrl = 'http://musicapi.duapp.com/api.php'    // 60-10- 无效
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'

export default {
  //歌单
  getPlayListByWhere (cat, order, offset, total, limit) {
    return _baseUrl + '?type=topPlayList&cat=' + cat + '&offset=' + offset + '&limit=' + limit
  },
  //歌词
  getLrc (id) {
    return _baseUrl2 + '?type=lyric&id=' + id
  },
  //歌曲
  getSong (id) {
    return _baseUrl + '?type=url&id=' + id
  },
  getPlayListDetail (id) {
    return _baseUrl2 + '?type=playlist&id=' + id
  },
  getMv (id) {
    return _baseUrl2 + '?type=mv&id=' + id
  },
  search (words) {
    return _baseUrl2 + '?type=search&s=' + words
  },
  getHot(){
    return _baseUrl2 + '?type=playlist&id=3778678'
  },
  
}
