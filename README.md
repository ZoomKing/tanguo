# React app with typescript

目录：<br>
1.[启动](#启动)<br>

2.[规范](#规范)<br>
2.1 [git commit 消息格式规范](#git-commit-消息格式规范)<br>
2.2 [prettier 应用](#prettier-应用)<br>
2.3 [样式变量提取](#样式变量提取)<br>
2.4 [router 路由](#router-路由)<br>
***

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

[React documentation](https://reactjs.org/).

***

## 启动

``` bash
# install dependencies
# 安装依赖
npm install --registry=http://registry.npm.taobao.org --sass_binary_path=http://npm.taobao.org/mirrors/node-sass

# setup config
# 建立配置文件
cp src/config/config.js.sample src/config/config.js

# serve with hot reload at localhost:3000
# 热重载开发，http://localhost:3000
npm start

# build static file for production with minification
# 生产环境打包
npm run build

# serve build static file at localhost:8080
# 本地启动打包文件的 web 服务，开发和打包之后的表现会有不一样
npm run serve
```

***

## 规范

项目目录结构：

```bash
-- build-overrides                          webpack, jest 配置
-- public                                   静态文件目录
-- src                                      编译目录
  -- api                                    XHR 数据请求接口管理目录
  -- common                                 公共目录
    -- components                           公共组件/视图目录
    -- css                                  公共样式变量，函数，mixins 的目录
    -- imgs                                 公共图片目录
    -- services                             公共服务目录
    -- svg-sprite                           svg 雪碧图文件存放目录
    -- utils                                公共工具目录
  -- config                                 项目基础配置目录
  -- router                                 路由管理目录
  -- store                                  react-redux, react-saga 应用目录
    -- models                               model 文件目录
  -- views                                  视图组件目录，每个组件使用到的非公共静态文件或者资源（工具、图片，子组件）尽量与自身放同一目录
```

### Git commit 消息格式规范
[重要](#git-commit-消息格式规范): 提交的 commit 信息按照此规范来。推荐使用 `npm run commit`

> 提交消息的结构
```bash
<类型>[(可选的作用域)]: <描述>

[可选的正文]

[可选的脚注]
```

#### 类型

| 类型值 | 含义 |
| --- | --- |
| feat | 表示新增了一个功能 |
| fix | 表示修复了一个 bug |
| docs | 表示只修改了文档 |
| style | 表示修改格式、书写错误、空格等不影响代码逻辑的操作 |
| refactor | 表示修改的代码不是新增功能也不是修改 bug，比如代码重构 |
| perf | 表示修改了提升性能的代码 |
| test | 表示修改了测试代码 |
| build | 表示修改了编译配置文件 |
| chore | 无 src 或 test 的操作 |
| revert | 回滚操作 |

#### 可选的作用域
是为了描述 此次 commit 影响的范围，比如: route, component, utils, build, api, website, docs, App.tsx(具体的文件)

#### 描述
此次提交的简短描述

#### 可选的正文
此次提交的详细描述，描述为什么修改，做了什么样的修改，以及开发的思路等等，输入 \n 换行

#### 可选的脚注
主要写下面2种

| 类型 | 含义 |
| --- | --- |
| Breaking changes | 在可选的正文或脚注的起始位置带有 BREAKING CHANGE: 的提交，表示引入了破坏性变更（这和语义化版本中的 MAJOR 相对应）。 |
| Closed issues | 罗列此次提交修复的 bug，如 fixes issue #110 |

***

### prettier 应用

项目使用了 prettier 规范代码，会在提交时自动 fix 代码风格

***

### 样式变量提取
[重要](#样式变量提取)：将多处使用到的同类变量提取出来。如果要兼容低版本 IE(<=9)，请不要使用 flex 布局和其它一些 css3 新特性

项目已提取出一些基础的变量在 `src/common/css/common-variable.scss`，并且提供了一些公共函数和 mixins 以供使用，可依据项目实际情况进行修改

另外，`src/common/css/common-variable.scss` 文件已在 loader 层面（webpack）全局引入，在开发时不需要在 scss 单独引入了

#### 说明：

1. 每个项目都有各自的设计规范

2. 但是一旦项目设计定稿，一些相关的信息，比如主色调，辅助色，背景色，边框色，元素间距，字体字号，header 高度，footer 高度，表单元素高度/边框...等等基本就会确定下来

3. 对于设计规范的前端实现，有两种：（两者可以结合实现）<br>
   a. 开发规范组件<br>
   b. 使用 sass/less/postcss 等预/后 css 处理器将样式变量提取到一个公共文件中，然后在各个地方引用<br>

***

### router 路由
请看 `src/router` 源码，代码不多

***
