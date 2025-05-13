---

title: "Vue学习日记1"
description: "学习Vue的笔记"
pubDatetime: 2025-04-19
tags: ["Vue", "前端", "笔记"]

---

## 

### 1. 什么是 Vue.js？
- 一个用于构建用户界面的渐进式框架
- 轻量、简单、灵活，易学易用
- 核心思想：**数据驱动** + **组件化开发**

---

### 2. 安装 Vue

**通过 CDN 引入：**
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```
可以直接在网页中使用。

**通过 npm 安装：**
```bash
npm install vue@next
```
适用于在 Node.js 环境中开发。

---

### 3. Vue 实例

HTML:
```html
<div id="app">{{ message }}</div>
```

JavaScript:
```javascript
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})

app.mount('#app')
```

- `Vue.createApp` 创建一个 Vue 应用实例
- `data` 返回一个对象，包含应用的数据
- `app.mount` 挂载 Vue 实例到指定的 DOM 元素上

---

### 4. 模板语法

- **插值语法**：`{{ }}` 用于输出数据
- **指令**：以 `v-` 开头，用于绑定数据和事件
  - 示例：
    ```html
    <p v-if="isVisible">这是一个条件渲染的段落</p>
    <button v-on:click="handleClick">点击我</button>
    ```

---

### 5. 计算属性和侦听器

**计算属性：**
- 用于基于已有数据计算新的值，具有缓存功能。
- 示例：
  ```javascript
  const app = Vue.createApp({
    data() {
      return {
        firstName: '张',
        lastName: '三'
      }
    },
    computed: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  });
  ```

**侦听器：**
- 用于监听数据的变化并执行特定逻辑。
- 示例：
  ```javascript
  const app = Vue.createApp({
    data() {
      return {
        count: 0
      }
    },
    watch: {
      count(newVal, oldVal) {
        console.log(`count 从 ${oldVal} 变为 ${newVal}`);
      }
    }
  });
  ```

---

### 6. 事件处理

- 使用 `v-on` 或简写 `@` 绑定事件。
- 示例：
  ```html
  <button @click="increment">增加</button>
  ```

  ```javascript
  const app = Vue.createApp({
    data() {
      return {
        count: 0
      }
    },
    methods: {
      increment() {
        this.count++;
      }
    }
  });
  ```

---

### 7. 条件渲染和列表渲染

**条件渲染：**
- 使用 `v-if`、`v-else-if` 和 `v-else`。
- 示例：
  ```html
  <p v-if="isLoggedIn">欢迎回来！</p>
  <p v-else>请登录。</p>
  ```

**列表渲染：**
- 使用 `v-for` 渲染数组或对象。
- 示例：
  ```html
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
  ```

---

### 8. 组件化开发

- 组件是 Vue 的核心概念，用于封装可复用的 UI 片段。
- 示例：
  ```javascript
  app.component('my-component', {
    template: `<p>这是一个自定义组件</p>`
  });
  ```

  ```html
  <my-component></my-component>
  ```

---

### 9. Vue 生命周期钩子

- Vue 实例在不同阶段会触发特定的生命周期钩子。
- 常用钩子：
  - `created`：实例创建完成后调用。
  - `mounted`：实例挂载到 DOM 后调用。
  - `updated`：数据更新后调用。
  - `destroyed`：实例销毁后调用。
- 示例：
  ```javascript
  const app = Vue.createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    },
    created() {
      console.log('实例已创建');
    },
    mounted() {
      console.log('实例已挂载');
    }
  });
  ```

---

### 10. Vue Router 和 Vuex

**Vue Router：**
- 用于实现单页面应用的路由功能。
- 示例：
  ```javascript
  const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ];

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
  });

  const app = Vue.createApp({});
  app.use(router);
  app.mount('#app');
  ```

**Vuex：**
- 用于管理全局状态。
- 示例：
  ```javascript
  const store = Vuex.createStore({
    state() {
      return {
        count: 0
      }
    },
    mutations: {
      increment(state) {
        state.count++;
      }
    }
  });

  const app = Vue.createApp({});
  app.use(store);
  app.mount('#app');
  ```

---

### 11. 总结

 Vue.js可以快速构建现代化的前端应用。它的渐进式设计使得我们可以从简单的项目开始，逐步引入更复杂的功能，如组件化开发、路由和状态管理。未来大概会学 Vue 的响应式原理、性能优化以及工具集成之类的吧。