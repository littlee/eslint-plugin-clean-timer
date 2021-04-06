[中文文档](https://github.com/littlee/eslint-plugin-clean-timer/blob/master/README.zh-cn.md)

# eslint-plugin-clean-timer

Enforce best practice with `setTimeout` and `setInterval`

## Motivation

It is always **easy** to forget to clear the timers set up by `setTimeout` or `setInterval`, which can cause bugs that are **uneasy** to find out.

Image a component with onMount and onUnmount life cycles, in the code below, if the component is mounted and unmounted within 1000ms, the timer will still fire

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

The best practice is to clear the timer whenever we don't need it any more.

This ESLint plugin can warn you when you are setting up any timers need to be cleared.

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

## Installation

```bash
npm install eslint-plugin-clean-timer --save-dev
```

## Usage

Add `clean-timer` to your eslint configuration file

```json
{
  "plugins": ["clean-timer"],
  "rules": {
    "clean-timer/assign-timer-id": 2
  }
}
```

## Examples

timer need to be cleared

```js
setTimeout(() => {}, 1000);
setInterval(() => {}, 1000);
setInterval(() => {}, 0);
setInterval(() => {});
```

timer **not** need to be cleared

```js
setTimeout(() => {}, 0);
setTimeout(() => {});
```

## License

MIT License
