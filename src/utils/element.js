import Vue from "vue";

// 将‘消息提示组件’引入并挂载在‘vue的原型对象’上的自定义‘ $message ’
import { Message } from 'element-ui';
// 将‘弹框组件’引入并挂载在‘vue的原型对象’上
import { MessageBox } from 'element-ui'

import { 
  Button,
  Input,
  Row,
  Col,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  Dialog,
  Upload,
  Backtop
} from "element-ui";
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

Vue.use(Button)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Backtop)
