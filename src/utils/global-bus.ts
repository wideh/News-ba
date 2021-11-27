/**
 * 全局通信总线
 * 作用：可以让任何组件之间通信
 */
// vue2
// import { Vue } from 'vue'
// new Vue()
// a 组件要向 b 组件发送数据
// b 注册通信的事件
// import globalBus from "@/utils/global-bus.ts"
// globalBus.$on('自定义事件', (data) => {})
// globalBus.$emit('自定义事件', 123)

// vue3已取消new Vue，要自己写
class Bus {
	list: { [key: string]: Array<Function> };
	constructor() {
		// 收集订阅信息,调度中心
		this.list = {};
	}

	// 订阅
	$on(name: string, fn: Function) {
		this.list[name] = this.list[name] || [];
		this.list[name].push(fn);
	}

	// 发布
	$emit(name: string, data?: any) {
		if (this.list[name]) {
      		this.list[name].forEach((fn: Function) => {
        	fn(data);
      });
    }
	}

	// 取消订阅
	$off(name: string) {
		if (this.list[name]) {
			delete this.list[name];
		}
	}
}
export default new Bus();