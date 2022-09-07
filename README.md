# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
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
https://github.com/bvaughn/react-error-boundary

https://www.npmjs.com/package/helmet


```
