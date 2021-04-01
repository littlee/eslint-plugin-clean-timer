# eslint-plugin-clean-timer

强制实施 `setTimeout` 与 `setInterval` 的最佳实践

## 创作背景

我们经常容易忘记由 `setTimeout` 或 `setInterval` 创建的定时器，这会引发一些难以排查的错误

设想一个具有 `onMount` 和 `onUnmount` 生命周期的组件，在以下代码中，如果组件挂载并在 1000 毫秒内被卸载，定时器还是会触发

```js
class App {
  onMout() {
    setTimout(() => {}, 1000);
  }
}
```

最佳实践是再不需要定时器的时候及时清理

```js
class App {
  onMout() {
    this.timer = setTimout(() => {}, 1000);
  }
  onUnmount() {
    clearTimeout(this.timer);
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
