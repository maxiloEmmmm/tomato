import maxiloVue from 'maxilo-vue'
const has = function(
    obj, 
    path, 
    returnValue = false, 
    endValue = false,
    failBack = null){
    let pathInfo = path.split('.')
    let x = []
    let tmp = {}
    pathInfo.forEach(v => {
      if(/\[/.test(v)) {
        //find [a]b[c] | b[a]c | [a][b]c => a.b.c
        let arrayPathInfo = v.match(/(\[([^\[\]]+?)\]|[^\[\]]+)+?/g)
        if(arrayPathInfo !== null) {
          arrayPathInfo.forEach(q => {
            x.push(q.replace('[', '').replace(']', ''))
          })
        }
      }else {
        x.push(v)
      }
    })
    let x_len = x.length
    for (let i = 0; i < x_len; i++) {
      let v = x[i]
      if (!['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(obj)) 
      || !(v in obj)) {
        if(failBack !== null) {
          failBack(obj, x.slice(i))
        }
        return endValue
      }
      tmp = obj
      obj = obj[v]
    }
    if (failBack !== null) {
      failBack(tmp, [x[x_len-1]])
    }
    return returnValue ? obj : true
}
  
const get = function(obj, path, d = undefined){
    let value = has(obj, path, true, undefined)
    return value === undefined ? d : value
}
  
const set = function (obj, path, d){
    has(obj, path, false, false, function(obj, pathInfo){
      let p_len = pathInfo.length
      for(let i = 0; i < p_len; i++) {
        let v = pathInfo[i]
        if(i+1 < p_len) {
          let tmp = {}
          obj = obj[v] = tmp
        }else {
          obj[v] = d
        }
      }
    })
}

const _pick = function(obj, keys, back = false){
  if(!Array.isArray(keys)) keys = [keys]
  let tmp = {}
  Object.keys(obj).forEach(v => {
    if(keys.includes(v)) {
      if(!back) tmp[v] = obj[v]
    }else {
      if(back) tmp[v] = obj[v]
    }
  })
  return tmp
}

const pick = function(obj, keys){
  return _pick(obj, keys, false)
}

const omit = function(obj, keys){
  return _pick(obj, keys, true)
}

const utils = maxiloVue.make("utils")
utils.add('tool.pick', pick)
utils.add('tool.omit', omit)
utils.add('tool.set', set)
utils.add('tool.get', get)
utils.add('tool.has', has)