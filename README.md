[中文文档](https://github.com/littlee/eslint-plugin-clean-timer/blob/master/README.zh-cn.md)

# eslint-plugin-clean-timer

Enforce best practice with `setTimeout` and `setInterval`

## Motivation

It is always easy to forget to clear the timers set up by `setTimeout` or `setInterval`, which can cause bugs that are uneasy to find out.

Image a component with onMount and onUnmount life cycle, in the code below, if the component is mounted and unmounted within 1000ms, the timer will still fire.

```js
class App {
  onMout() {
    setTimout(() => {}, 1000);
  }
}
```

The best practice is to clear the timer whenever we do need it any more

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
