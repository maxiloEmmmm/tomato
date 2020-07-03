import maxiloVue from 'maxilo-vue'
import msg from 'ant-design-vue/lib/message';
import notification from 'ant-design-vue/lib/notification';
const utils = maxiloVue.make("utils")
utils.add('msg', msg)
utils.add('notification', notification)