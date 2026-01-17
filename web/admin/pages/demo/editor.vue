<template>
  <div class="editor-demo">
    <div class="page-header">
      <h1>代码编辑器演示</h1>
      <p>功能丰富的Monaco代码编辑器组件</p>
    </div>

    <div class="demo-content">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-card title="JavaScript 编辑器" class="demo-card">
            <MonacoEditor
              v-model="jsCode"
              language="javascript"
              :height="400"
              title="JavaScript 示例"
              @ready="onEditorReady"
              @change="onCodeChange"
            />
          </a-card>
        </a-col>

        <a-col :span="12">
          <a-card title="JSON 配置编辑器" class="demo-card">
            <MonacoEditor
              v-model="jsonCode"
              language="json"
              theme="vs"
              :height="400"
              title="配置文件"
              :minimap="false"
              @change="onJsonChange"
            />
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="24" style="margin-top: 24px;">
        <a-col :span="12">
          <a-card title="CSS 样式编辑器" class="demo-card">
            <MonacoEditor
              v-model="cssCode"
              language="css"
              :height="350"
              title="样式代码"
              :word-wrap="'on'"
            />
          </a-card>
        </a-col>

        <a-col :span="12">
          <a-card title="只读编辑器" class="demo-card">
            <MonacoEditor
              v-model="readOnlyCode"
              language="typescript"
              :height="350"
              title="TypeScript 代码"
              :readonly="true"
              theme="vs-dark"
            />
          </a-card>
        </a-col>
      </a-row>

      <a-card title="配置选项" class="demo-card" style="margin-top: 24px;">
        <a-form layout="vertical">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item label="主题">
                <a-select v-model="currentTheme" @change="changeTheme">
                  <a-option value="vs">浅色</a-option>
                  <a-option value="vs-dark">深色</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="字体大小">
                <a-input-number 
                  v-model="fontSize" 
                  :min="10" 
                  :max="24" 
                  @change="changeFontSize"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="显示行号">
                <a-switch v-model="showLineNumbers" @change="toggleLineNumbers" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="显示小地图">
                <a-switch v-model="showMinimap" @change="toggleMinimap" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

const jsCode = ref(`// JavaScript 示例代码
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 计算斐波那契数列
const result = fibonacci(10);
console.log('Fibonacci(10) =', result);

// 数组方法示例
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log('Doubled:', doubled);

// 异步示例
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`)

const jsonCode = ref(`{
  "name": "monaco-editor-demo",
  "version": "1.0.0",
  "description": "功能丰富的代码编辑器",
  "main": "index.js",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview"
  },
  "dependencies": {
    "vue": "^3.5.16",
    "nuxt": "^3.17.5",
    "@arco-design/web-vue": "^2.57.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "sass": "^1.89.2"
  },
  "features": {
    "syntaxHighlighting": true,
    "codeCompletion": true,
    "errorChecking": true,
    "codeFormatting": true
  }
}`)

const cssCode = ref(`/* CSS 样式示例 */
.editor-container {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.editor-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px;
  font-weight: 600;
}

.editor-content {
  flex: 1;
  min-height: 400px;
  background: #1e1e1e;
  position: relative;
}

.editor-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #667eea, transparent);
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

.loading {
  animation: pulse 2s infinite;
}`)

const readOnlyCode = ref(`// 这是一个只读的TypeScript编辑器示例
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

class UserService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    // 模拟从API加载用户数据
    this.users = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' }
    ];
  }

  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public getAllUsers(): readonly User[] {
    return this.users;
  }
}

// 使用示例
const userService = new UserService();
const user = userService.getUserById(1);

if (user) {
  console.log(\`用户名: \${user.name}\`);
}`)

const currentTheme = ref('vs-dark')
const fontSize = ref(14)
const showLineNumbers = ref(true)
const showMinimap = ref(true)

const editorInstance = ref(null)

const onEditorReady = (editor) => {
  editorInstance.value = editor
  console.log('编辑器已准备就绪:', editor)
}

const onCodeChange = (value) => {
  console.log('代码已更改:', value.length, '字符')
}

const onJsonChange = (value) => {
  try {
    JSON.parse(value)
    console.log('JSON格式正确')
  } catch (error) {
    console.log('JSON格式错误:', error.message)
  }
}

const changeTheme = (theme) => {
  Message.info(`主题已切换为: ${theme === 'vs' ? '浅色' : '深色'}`)
}

const changeFontSize = (size) => {
  Message.info(`字体大小已更改为: ${size}px`)
}

const toggleLineNumbers = (show) => {
  Message.info(`行号显示已${show ? '开启' : '关闭'}`)
}

const toggleMinimap = (show) => {
  Message.info(`小地图已${show ? '开启' : '关闭'}`)
}
</script>

<style lang="scss" scoped>
.editor-demo {
  padding: 24px;
  min-height: 100vh;
  background-color: var(--color-bg-2);
}

.page-header {
  margin-bottom: 32px;
  text-align: center;

  h1 {
    margin: 0 0 12px 0;
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: 0;
    color: var(--color-text-3);
    font-size: 16px;
  }
}

.demo-content {
  max-width: 1400px;
  margin: 0 auto;
}

.demo-card {
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  :deep(.arco-card-header) {
    background: linear-gradient(135deg, var(--color-bg-3) 0%, var(--color-bg-2) 100%);
    border-bottom: 2px solid var(--color-primary-light-3);

    .arco-card-header-title {
      font-weight: 600;
      font-size: 16px;
    }
  }

  :deep(.arco-card-body) {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .editor-demo {
    padding: 16px;
  }

  .page-header {
    h1 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }

  .demo-content {
    :deep(.arco-col) {
      margin-bottom: 16px;
    }
  }
}
</style>