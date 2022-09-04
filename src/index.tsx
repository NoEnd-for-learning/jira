import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import { AppProviders } from 'context';
import reportWebVitals from 'reportWebVitals';
import { loadDevTools } from 'jira-dev-tool';
import 'antd/dist/antd.less'; // 务必在jira-dev-tool 之后引入，实现覆盖

// 初始化的render 写法
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// 使用jira-dev-tool 包装的写法
loadDevTools(() => {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    // AppProviders 注入组件，使组件可以全局获取用户登录信息/方法
    root.render(<AppProviders><App /></AppProviders>);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
