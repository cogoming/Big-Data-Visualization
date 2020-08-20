import {Switch, Table, TableColumn, Button, Pagination, Popconfirm, Option, Input, DatePicker, Message, MessageBox,Select} from 'element-ui'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(Option)
Vue.use(Select)
Vue.use(DatePicker)
Vue.component(Message.name, Message)


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;



