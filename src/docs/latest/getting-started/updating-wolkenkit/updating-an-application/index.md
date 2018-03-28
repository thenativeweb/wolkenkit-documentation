# Updating an application

To update an application to the current version of wolkenkit follow the steps given below.

## package.json

**Previous version (1.2.0)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "1.2.0"
  },
  "...": "..."
}
```

**Current version (<%= current.version %>)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "<%= current.version %>"
  },
  "...": "..."
}
```

## Write model, defining commands

**Previous version (1.2.0)**

```javascript
const commands = {
  send (message, command, mark) {
    if (...) {
      return mark.asRejected('Failed to send message.');
    }

    // ...

    mark.asDone();
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const commands = {
  async send (message, command) {
    if (...) {
      return command.reject('Failed to send message.');
    }

    // ...
  }
};
```

Please note that you can omit the `async` keyword if you don't use asynchronous code in your command.

## Write model, using services

**Previous version (1.2.0)**

```javascript
const commands = {
  send (message, command, services, mark) {
    const app = services.get('app');

    // ...

    mark.asDone();
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const commands = {
  async send (message, command, { app }) {
    // ...
  }
};
```

## Read model, handling events

**Previous version (1.2.0)**

```javascript
const when = {
  'communication.message.sent' (messages, event, mark) {
    // ...

    mark.asDone();
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const when = {
  async 'communication.message.sent' (messages, event) {
    // ...
  }
};
```

Please note that you can omit the `async` keyword if you don't use asynchronous code in your handler.

## Read model, using services

**Previous version (1.2.0)**

```javascript
const when = {
  'communication.message.sent' (messages, event, services, mark) {
    const app = services.get('app');

    // ...

    mark.asDone();
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const when = {
  'communication.message.sent' (messages, event, { app }) {
    // ...
  }
};
```

## Stateless flows, handling events

**Previous version (1.2.0)**

```javascript
const when = {
  'communication.message.sent' (event, mark) {
    // ...

    mark.asDone();
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const when = {
  async 'communication.message.sent' (event) {
    // ...
  }
};
```

Please note that you can omit the `async` keyword if you don't use asynchronous code in your reaction.

## Stateless flows, using services

**Previous version (1.2.0)**

```javascript
const when = {
  'communication.message.sent' (event, services, mark) {
    const app = services.get('app');

    // ...

    mark.asDone();
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const when = {
  'communication.message.sent' (event, { app }) {
    // ...
  }
};
```

## Stateful flows, handling events

**Previous version (1.2.0)**

```javascript
const when = {
  pristine: {
    'communication.message.sent' (flow, event, mark) {
      // ...

      mark.asDone();
    }    
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const when = {
  pristine: {
    async 'communication.message.sent' (flow, event) {
      // ...
    }    
  }
};
```

Please note that you can omit the `async` keyword if you don't use asynchronous code in your reaction.

## Stateful flows, using services

**Previous version (1.2.0)**

```javascript
const when = {
  pristine: {
    'communication.message.sent' (flow, event, services, mark) {
      const app = services.get('app');

      // ...

      mark.asDone();
    }    
  }
};
```

**Current version (<%= current.version %>)**

```javascript
const when = {
  pristine: {
    'communication.message.sent' (flow, event, { app }) {
      // ...
    }    
  }
};
```
