# demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 执行步骤
执行package.json中的build后，直接打开dist下的index.html查看效果

### 实现步骤
1. 监听打包完成的事件
2. 当webpack编译完成后，启动node服务，让无头浏览器去访问这个地址
3. 通过注入script脚本，进行对页面dom的操作，获取操作后的dom结构
4. 将操作后的dom结构替换到root中的占位符
5. 用户访问的时候首先呈现的是骨架屏页面
6. js加载完后会重新render掉root