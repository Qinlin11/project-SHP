//vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function (vue, options){
    Vue.directive(options.name, (element, b) => {
        element.innerHTML = params.value.toUpperCase();
    })

}

export default myPlugins;