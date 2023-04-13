# https://noend-for-learning.github.io/projects

## Available Scripts

In the project directory, you can run:

### `node >= 12.22.0`

### `#1 npm install`

### `#2 npm audit fix`

### `#3 npm start`
```text
http://localhost:3000/projects
```

### `#4 npm run json-server`
```text
 Resources
  http://localhost:4000/users
  http://localhost:4000/projects

  Home
  http://localhost:4000
```

### `npm test`

### `npm run build`


# jira

# prettier: https://www.prettier.cn/docs//install.html
```shell script
npm install --dev --exact prettier

echo {}> .prettierrc.json

npm install --save-dev husky lint-staged

"lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
```

### json-server: https://github.com/typicode/json-server
```javascript
window.fetch('http://localhost:3000/users').then(r => r.json()).then(console.log);

GET /tickets // 列表
GET /tickets/12 // 详情
POST /tickets  // 增加
PUT /tickets/12 // 替换
PATCH /tickets/12 // 修改
DELETE /tickets/12 // 删除

```

# 安装 jira-dev-tool
```javascript
// 1. yarn add jira-dev-tool@1.5.1
// 2. npx msw init public
// 3. 如果本地不需要，可以删除json-server 的相关内容，因为jira-dev-tool插件已经集成了
```

## bug fix
```text
基于 "jira-dev-tool": "1.5.1", 由于有antd 样式引入的warning, 因此做了优化：

import 'antd/dist/antd.css';
改为
import 'antd/dist/antd.min.css';

然后项目引入改为：
"jira-dev-tool": "file:__jira-dev-tool__"
其中，__jira-dev-tool__ 为copy 1.5.1 版本的代码，并修改了样式引入，重新npm install 生成的依赖包
(参考：https://developer.aliyun.com/article/970973)
```

## 类型别名
```typescript
// interface 在这种情况下，没法替代type
type FavoriteNumber = string | number;
```
## Utility type
```typescript
type Person = {
    id: number,
    name: string,
    age: number,
}
const xiaoMing: Partial<Person> = {};
const xiaoHong: Omit<Person, 'name' | 'age'> = {id: 12};
```

## Partial 实现
```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

## Omit 实现
```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 拓展插件
```text
https://www.npmjs.com/package/react-error-boundary

https://www.npmjs.com/package/helmet

https://www.npmjs.com/package/why-did-you-render

https://www.npmjs.com/package/react-query

https://www.npmjs.com/package/swr


```

### 跨组件状态管理总结
```text
小场面：
·状态提升/组合组件

缓存状态：
·react-query / swr

客户端状态：
·url / redux / context
```
### 自动化测试
```text
- 目的: 让我们对自己写的代码更有信心，防止对出现“新代码破坏旧代码” 的无限循环；

- 分类
.单元测试：传统的单元测试，组件测试，hook测试
.集成测试
.e2e 测试（end2end）
```