/*
    obj: 目标对象
    prop: 需要操作的目标对象的属性名
    descriptor: 描述符

    return value 传入对象
*/
// Object.defineProperty(obj, prop, descriptor)

function cb (val) {
    //这里会做一些操作
    console.log('已经做了一些操作')
}
function defindReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,       /* 属性可枚举 */
        configurable: true,     /* 属性可被修改或删除 */
        get: function reactiveGetter () {
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) { return }
            cb(newVal)
        }
    })
}
function observer (value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    Object.keys(value).forEach((key) => {
        defindReactive(value, key, value[key]);
    })
}
