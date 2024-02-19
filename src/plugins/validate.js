//vee-validate插件：表单验证区域
import Vue from "vue";
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate);

//表单验证
VeeValidate.Validator.localize("zh_CN", {
    messages: {   // 自定义错误信息提示 field 即为需要检验的属性，${field} 获取属性对应的值（attributes 中的值）
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
        regex: (field) => `${field} 格式错误`
    },
    attributes: {   // 需要检验的属性
        phone: "手机号",
        code: "验证码",
        password: "密码",
        password1: "确认密码",
        agree:'协议'
    },
});

//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});