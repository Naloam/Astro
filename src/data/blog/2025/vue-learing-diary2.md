---

title: "vue学习日记2"
description: "第一次用 vue 尝试写东西"
pubDatetime: 2025-05-30T21:57:12Z
tags: 
    - Vue
    - 前端
    - 开发
author: "che1sy"
slug: vue-learing-diary2
featured: false
draft: false

---

> 第一次尝试用 vue 开发一个小应用，记录一下。

代码地址：https://github.com/Naloam/vue-markdown

---

## 1. 项目结构

- **技术栈**：Vue3 + Vite + TypeScript
- **目录结构**：
  - `src/`：Vue3 源码，所有核心组件、样式、工具函数
  - `components/`：编辑器、工具栏、侧边栏、字数统计等 UI 组件
  - `electron/`：Electron 主进程代码（本来想用 electron 打包成 exe，但是好像页面配置没有写好，就暂时搁置了）
  - `public/`：静态资源
  - `index.html`：入口页面

---

## 2. 组件 + 功能

### 2.1 MarkdownEditor.vue
- **编辑区+预览区**
  ```vue
  <textarea v-model="markdownText" class="editor" ... ></textarea>
  <div class="preview" v-html="renderedMarkdown"></div>
  ```
- **菜单栏/工具栏**
  ```vue
  <div class="menubar">
    <div class="menu-item" v-for="menu in menus" :key="menu.label">
      ...
    </div>
  </div>
  <FormatToolbar textareaSelector=".editor" />
  ```
- **主题切换**
  ```ts
  const currentTheme = ref('light');
  // 切换主题
  currentTheme.value = 'dark';
  ```
- **快捷键支持**
  ```ts
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
  });
  function handleKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      handleToolbarFormat('bold');
    }
  }
  ```
- **文件操作**
  ```ts
  const handleSaveFile = () => {
    const blob = new Blob([markdownText.value], { type: 'text/markdown' });
    ...
  };
  ```
- **字数统计**
  ```vue
  <WordCount :content="markdownText" :is-visible="showWordCount" />
  ```
- **侧边栏**
  ```vue
  <Sidebar :is-visible="showSidebar" :markdown-content="markdownText" />
  ```
- **Vue3 语法点**
  - `ref`/`reactive`
    ```ts
    const markdownText = ref('');
    ```
  - `computed`
    ```ts
    const renderedMarkdown = useMarkdownRender(markdownText);
    ```
  - `v-model`
    ```vue
    <textarea v-model="markdownText" ... />
    ```
  - `v-for`/`v-if`
    ```vue
    <div v-for="menu in menus" v-if="menu.children" ... >...</div>
    ```
  - `onMounted`/`onUnmounted`
    ```ts
    onMounted(() => { ... });
    onUnmounted(() => { ... });
    ```
  - `defineProps`/`defineEmits`
    ```ts
    const props = defineProps<{ isVisible: boolean }>();
    const emit = defineEmits(['close']);
    ```
  - `watchEffect`/`watch`
    ```ts
    watchEffect(() => setStyle(currentHighlightStyle.value));
    ```
  - `script setup` + TypeScript
    ```ts
    <script setup lang="ts">
    ...
    </script>
    ```
  - `scoped style` + CSS 变量
    ```css
    .dark .editor { background: #1a1a1a; color: #e6edf3; }
    ```
  - 事件修饰符
    ```vue
    <textarea @keydown.prevent ... />
    ```

### 2.2 FormatToolbar.vue
- **一键插入格式**
  ```vue
  <button v-for="item in formatList" :key="item.type" @click="() => handleFormat(item.type)">
    <span v-html="item.icon"></span>
  </button>
  ```
- **插入逻辑**
  ```ts
  function handleFormat(type: string) {
    const textarea = document.querySelector(props.textareaSelector || '.editor') as HTMLTextAreaElement;
    ...
    if (type === 'bold') {
      insert = selected ? `**${selected}**` : '**加粗**';
      ...
    }
    ...
  }
  ```
- **表格风格**
  ```ts
  case 'table-adv':
    let table = `\n<!--table-style:${style}-->\n|`;
    ...
  ```
- **Vue3 语法点**
  - `defineProps`
    ```ts
    const props = defineProps<{ textareaSelector?: string }>();
    ```
  - `defineExpose`
    ```ts
    defineExpose({ handleFormat });
    ```
  - `v-for` 渲染按钮
  - 事件绑定 @click

### 2.3 useMarkdownRender.ts
- **marked 配置**
  ```ts
  marked.setOptions({
    highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
    langPrefix: 'hljs language-',
    ...
  });
  ```
- **highlight.js 注册多语言**
  ```ts
  hljs.registerLanguage('javascript', javascript);
  ...
  ```
- **katex 数学公式**
  ```ts
  import katex from 'katex';
  // 渲染 $$公式$$
  ```
- **Vue3 语法点**
  - `computed`
    ```ts
    return computed(() => marked.parse(markdownText.value));
    ```

### 2.4 useHighlightStyle.ts & MarkdownStyleSwitcher.vue
- **代码高亮主题切换**
  ```ts
  export function useHighlightStyle(defaultStyle = 'github') {
    const currentStyle = ref(defaultStyle);
    watchEffect(() => {
      import(`highlight.js/styles/${currentStyle.value}.css`);
    });
    ...
  }
  ```
- **Vue3 语法点**
  - `ref` 管理当前主题
  - `watchEffect` 动态切换样式
  - `defineEmits` 组件事件

### 2.5 Sidebar.vue & 子组件
- **大纲**
  ```ts
  const headings = computed(() => {
    const lines = props.markdownContent.split('\n');
    ...
  });
  ```
- **文档列表/文件树**
  ```ts
  const documents = ref([{ id: 1, name: '文档1.md' }, ...]);
  const fileTree = ref([{ id: 1, name: '项目文档', files: [...] }, ...]);
  ```
- **Vue3 语法点**
  - `defineProps`/`defineEmits`
  - `ref`/`computed`
  - `v-for`/`v-if`
  - 事件绑定 @click

### 2.6 WordCount.vue
- **实时统计**
  ```ts
  const charCount = computed(() => props.content.length);
  const wordCount = computed(() => {
    const words = props.content.match(/\b\w+\b/g);
    return words ? words.length : 0;
  });
  ```
- **Vue3 语法点**
  - `defineProps` 接收内容
  - `computed` 统计各项数据
  - `defineEmits` 关闭事件

---

## 3. 重要 Vue3 语法与实践详解（含代码片段）

- `ref`：
  ```ts
  const count = ref(0);
  count.value++;
  ```
- `reactive`：
  ```ts
  const state = reactive({ visible: false, text: '' });
  ```
- `computed`：
  ```ts
  const double = computed(() => count.value * 2);
  ```
- `watch`/`watchEffect`：
  ```ts
  watch(() => state.text, (val) => { ... });
  watchEffect(() => { ... });
  ```
- `v-model`：
  ```vue
  <input v-model="state.text" />
  ```
- `v-for`：
  ```vue
  <li v-for="item in list" :key="item.id">{{ item.name }}</li>
  ```
- `v-if`/`v-show`：
  ```vue
  <div v-if="visible">显示</div>
  <div v-show="visible">显示</div>
  ```
- `defineProps`/`defineEmits`：
  ```ts
  const props = defineProps<{ content: string }>();
  const emit = defineEmits(['close']);
  ```
- `defineExpose`：
  ```ts
  defineExpose({ handleFormat });
  ```
- `onMounted`/`onUnmounted`：
  ```ts
  onMounted(() => { ... });
  onUnmounted(() => { ... });
  ```
- `provide`/`inject`：
  ```ts
  provide('theme', currentTheme);
  const theme = inject('theme');
  ```
- `script setup`：
  ```ts
  <script setup lang="ts">
  ...
  </script>
  ```
- `scoped style`：
  ```css
  <style scoped>
  .editor { ... }
  </style>
  ```
- CSS 变量：
  ```css
  :root { --bg: #fff; }
  .dark { --bg: #1a1a1a; }
  ```
- 事件修饰符：
  ```vue
  <button @click.stop="...">按钮</button>
  <input @keydown.prevent="..." />
  ```
- 组合式 API：
  所有逻辑都用组合式 API 组织，便于复用和类型推断。
- TypeScript 类型声明：
  ```ts
  const props = defineProps<{ content: string }>();
  const count = ref<number>(0);
  ```

---

## 4. 编写思路与实现细节

- **UI 设计**：模仿 Typora，菜单栏+工具栏+分栏布局，主题色用 CSS 变量统一管理。
  ```css
  .dark .editor { background: #1a1a1a; color: #e6edf3; }
  .light .editor { background: #fff; color: #222; }
  ```
- **编辑/预览同步滚动**
  ```ts
  const handleEditorScroll = (e: Event) => {
    ...
    const editorScrollPercent = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    const previewScrollTop = editorScrollPercent * (preview.scrollHeight - preview.clientHeight);
    preview.scrollTop = previewScrollTop;
  };
  ```
- **格式插入**
  ```ts
  function handleToolbarFormat(type: string) {
    // 触发 FormatToolbar 的 handleFormat
    ...
  }
  ```
- **代码高亮**
  ```ts
  marked.setOptions({
    highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
    langPrefix: 'hljs language-',
    ...
  });
  ```
- **数学公式**
  ```ts
  import katex from 'katex';
  // 渲染 $$公式$$
  ```
- **表格风格**
  ```ts
  case 'table-adv':
    let table = `\n<!--table-style:${style}-->\n|`;
    ...
  ```
- **Electron 打包**
  ```ts
  // vite.config.ts
  export default defineConfig({ base: './', ... });
  // electron/main.js
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  ```
- **快捷键**
  ```ts
  document.addEventListener('keydown', handleKeyDown);
  ```
- **多语言支持**
  ```ts
  import { useI18n } from './useI18n';
  const { t } = useI18n();
  ```
- **自定义主题**
  ```ts
  const currentTheme = ref('light');
  // 切换主题
  currentTheme.value = 'dark';
  ```

---

## 5. 遇到的错误与解决方案

- **代码高亮无效**：
  - 需注册所有用到的语言包，langPrefix 必须为 'hljs language-'，渲染器要加 hljs class。
  ```ts
  hljs.registerLanguage('javascript', javascript);
  marked.setOptions({ langPrefix: 'hljs language-' });
  ```
- **斜体/删除线插入异常**：
  - 工具栏插入逻辑需区分有无选区，修正插入位置和包裹方式。
  ```ts
  if (type === 'italic') {
    insert = selected ? `*${selected}*` : '*斜体*';
  }
  ```
- **分组/分块插入不生效**：
  - 插入 `<div class="group">...</div>`，渲染时用 CSS 区分。
  ```ts
  insert = '<div class="group">' + (selected || '') + '</div>';
  ```
- **打包后页面空白**：
  - vite.config.ts base 必须为 './'，Electron main.js 需用相对路径加载 dist/index.html。
  ```ts
  // vite.config.ts
  export default defineConfig({ base: './', ... });
  // electron/main.js
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  ```
- **菜单栏/工具栏样式错乱**：
  - 用 CSS 变量和 scoped style，主题切换时动态切换 class。
  ```css
  .dark .format-toolbar { ... }
  .light .format-toolbar { ... }
  ```
- **同步滚动卡顿**：
  - 用 setTimeout 限流，避免死循环。
  ```ts
  setTimeout(() => { isScrolling = false; }, 50);
  ```
- **表格风格丢失**：
  - 插入时用注释标记风格，渲染时解析注释。
  ```md
  <!--table-style:striped-->
  | 表头1 | 表头2 |
  | --- | --- |
  | 内容1 | 内容2 |
  ```
- **Git push/pull 报错**：
  - 处理 non-fast-forward、unrelated histories，需先 pull --rebase 或合并。
- **TypeScript 类型报错**：
  - 组件 props、emit、ref、组合式函数都要加类型声明。
  ```ts
  const props = defineProps<{ content: string }>();
  ```
- **事件冒泡/修饰符遗漏**：
  - 需加 @click.stop/@keydown.prevent 等，避免父子冲突。
  ```vue
  <button @click.stop="...">按钮</button>
  ```
- **响应式丢失**：
  - ref/props/emit 用法不当会导致视图不更新，需严格用组合式 API。

---

## 6. 总结

- 熟悉了 Vue3 组合式 API、组件拆分、响应式原理。
- 尝试了 markdown 渲染、代码高亮、数学公式、主题切换等常见富文本编辑器实现，熟练了 markdown 的编写。
- 第一次前端工程化开发，学习了 Vite 、TypeScript 等。。

---

> 好像还有挺多 bug 的，以后有时间再优化一下。
