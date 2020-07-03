import maxiloVue from 'maxilo-vue';

import "assets/sass/index.scss"

console.log('Some components are used antd, at: https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/.');
import {
    Button,
    ConfigProvider,
    Card,
    Input,
    InputNumber,
    Spin,
    Table,
    Modal,
    Select,
    Tree,
    Icon,
    Divider,
    Message,
    Tabs,
    Notification,
    Popover,
    Tag,
    DatePicker,
    Descriptions,
    Switch,
    Result,
    Tooltip,
    Pagination,
    PageHeader,
    Breadcrumb,
    Badge,
    Radio,
    Skeleton,
    Drawer,
    Checkbox,
    Progress,
    Alert,
    Rate
} from 'ant-design-vue'
//Config-provider
maxiloVue.vue.use(Button)
maxiloVue.vue.use(ConfigProvider)
maxiloVue.vue.use(Card)
maxiloVue.vue.use(Input)
maxiloVue.vue.use(InputNumber)
maxiloVue.vue.use(Spin)
maxiloVue.vue.use(Table)
maxiloVue.vue.use(Modal)
maxiloVue.vue.use(Select)
maxiloVue.vue.use(Tree)
maxiloVue.vue.use(Icon)
maxiloVue.vue.use(Divider)
maxiloVue.vue.use(Tabs)
maxiloVue.vue.use(Popover)
maxiloVue.vue.use(Tag)
maxiloVue.vue.use(DatePicker)
maxiloVue.vue.use(Descriptions)
maxiloVue.vue.use(Switch)
maxiloVue.vue.use(Result)
maxiloVue.vue.use(Tooltip)
maxiloVue.vue.use(Pagination)
maxiloVue.vue.use(PageHeader)
maxiloVue.vue.use(Breadcrumb)
maxiloVue.vue.use(Badge)
maxiloVue.vue.use(Radio)
maxiloVue.vue.use(Rate)
maxiloVue.vue.use(Skeleton)
maxiloVue.vue.use(Drawer)
maxiloVue.vue.use(Alert)
maxiloVue.vue.use(Checkbox)
maxiloVue.vue.use(Progress)
maxiloVue.vue.use(function(Vue){
    Vue.prototype.$message = Message
    Vue.prototype.$notification = Notification
    Vue.prototype.$info = Modal.info
    Vue.prototype.$success = Modal.success
    Vue.prototype.$error = Modal.error
    Vue.prototype.$warning = Modal.warning
    Vue.prototype.$warn = Modal.warn
    Vue.prototype.$confirm = Modal.confirm
})



import mvyu from "maxilo-vue-ysz-ui"
import "maxilo-vue-ysz-ui/lib/ysz-ui.css"
maxiloVue.vue.use(mvyu)

console.log('Some icon are used iconfont, at: https://www.iconfont.cn.');
import 'assets/fonts/iconfont/iconfont.js';
//example for dep

// maxiloVue.vue.depComponent({
//     testOne, 
//     a: b, 
//     a1: [b2,b3,b4], 
//     c: {
//         d1,
//         d2,
//         d3,
//         d4: d5
//     }
// });

//like this
// maxiloVue.vue.component('testOne', testOne);
// maxiloVue.vue.component('a', b);
// maxiloVue.vue.component(b2.name, b2);
// maxiloVue.vue.component(b3.name, b3);
// maxiloVue.vue.component(b4.name, b4);
// maxiloVue.vue.component(d1, d1);
// maxiloVue.vue.component(d2, d2);
// maxiloVue.vue.component(d3, d3);
// maxiloVue.vue.component(d4, d5);