# eslint-plugin-clean-timer

强制实施 `setTimeout` 与 `setInterval` 的最佳实践

## 创作背景

我们经常容易忘记由 `setTimeout` 或 `setInterval` 创建的定时器，这会引发一些难以排查的错误

设想一个具有 `onMount` 和 `onUnmount` 生命周期的组件，在以下代码中，如果组件挂载并在 1000 毫秒内被卸载，定时器还是会触发

```js
class App {
  onMount() {
    /* timer id should assign to an identifier or member for cleaning up,
      `let timer = setInterval()` */
    setInterval(() => {}, 1000);
    /* ^^^^^^^^^^^^^^^^^^^^^^^^ */
  }
}
```

最佳实践是在不需要定时器的时候及时清理

这个 ESLint 插件可以在你设置需要被清除的定时器的时候发出警告

```js
class App {
  onMount() {
    this.timer = setInterval(() => {}, 1000);
  }
  onUnmount() {
    clearInterval(this.timer);
  }
}
```

## 安装

```bash
npm install eslint-plugin-clean-timer --save-dev
```

## 使用

添加 `clean-timer` 到 eslint 配置文件

```json
{
  "plugins": ["clean-timer"],
  "rules": {
    "clean-timer/assign-timer-id": 2
  }
}
```

## 实例

需要被清除的定时器

```js
setTimeout(() => {}, 1000);
setInterval(() => {}, 1000);
setInterval(() => {}, 0);
setInterval(() => {});
```

**不**需要被清除的定时器

```js
setTimeout(() => {}, 0);
setTimeout(() => {});
```

## 开源证书

MIT 许可
