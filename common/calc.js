/**
 * initCalc，
 * 用来，排序数组
 * @param {Array} arr [需要处理数组]
 * @param {String} type [min或者max来排序数组]
 * @param {Boolean} hisType [是否返回数组排序过之后，每个数组再原数组中的位置，为true的时候会返回{arr:[],index:[]}]
 */
var initCalc = function(arr, sortType, hisType) {
  if (!arr || typeof arr !== 'object') {
    console.error(arr + 'is not Array')
    return
  }
  var ahList = Object.assign([], arr)
  sortType = sortType || 'max'
  hisType = hisType || false
  ahList.sort(function(a, b) {
    return sortType === 'min' ? a - b : b - a
  })
  if (hisType && typeof hisType === 'boolean') {
    var _ob = Object.create({}),
      _arr = Object.assign([], arr)
    _index = []
    remNum = []
    _arr.forEach(function(i, index) {
      if (typeof _ob[i] !== 'undefined') {
        if (_ob[i].length) {
          _ob[i].push(index)
        } else {
          _ob[i] = [_ob[i]]
          _ob[i].push(index)
        }
      } else {
        _ob[i] = index
      }
    })
    ahList.forEach(function(arr) {
      if (_ob[arr].length) {
        if (remNum.indexOf(arr) === -1) {
          remNum.push(arr)
          _index = _index.concat(_ob[arr])
        }
      } else {
        _index.push(_arr.indexOf(arr))
      }
    })
    return Object.assign(
      {},
      {
        arr: ahList,
        index: _index
      }
    )
  }
  return ahList
}

/**
 * probar
 * 返回数组中每个元素占总数组的比例
 * @param {Array} arr [需要处理数组]
 * @param {Number} fixed [需要保留百分比后几位小数]
 */
var probar = function(arr, fixed) {
  if (!arr || typeof arr !== 'object') {
    console.error(arr + 'is not Array')
    return
  }
  fixed = fixed || 2
  var probarArr = Object.assign([], arr)
  probarAll = 0
  probarItem = []
  probarArr.forEach(function(item) {
    probarAll += item
  })
  probarArr.forEach(function(item) {
    probarItem.push(parseFloat(((item / probarAll) * 100).toFixed(fixed)))
  })
  return probarItem
}
/**
 * dateCalc [时间计算，返回一个有天，小时，分钟，秒的obj]
 * @param {*} time [时间格式]
 */
var dateCalc = function(time) {
  var leftTime = time || ''
  if (!leftTime) return
  leftTime = new Date(leftTime)
  var date = {
    d: Math.floor(leftTime / 1000 / 60 / 60 / 24),
    h: Math.floor((leftTime / 1000 / 60 / 60) % 24),
    m: Math.floor((leftTime / 1000 / 60) % 60),
    s: Math.floor((leftTime / 1000) % 60)
  }
  return date
}
