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

Please note that you can omit the `async` keyword if you don't use asynchronous code in your command. For details see [defining commands](../../../reference/creating-the-write-model/defining-commands/).

## Write model, using command middleware

**Previous version (1.2.0)**

```javascript
const commands = {
  send: [
    (message, command, mark) => {
      if (...) {
        return mark.asRejected('Failed to validate message.');
      }

      // ...

      mark.asReadyForNext();
    },

    (message, command, mark) => {
     if (...) {
       return mark.asRejected('Failed to send message.');
     }

     // ...

     mark.asDone();
   }
  ]
};
```

**Current version (<%= current.version %>)**

```javascript
const commands = {
  send: [
    async (message, command) => {
      if (...) {
        return command.reject('Failed to validate message.');
      }

      // ...
    },

    async (message, command) => {
     if (...) {
       return command.reject('Failed to send message.');
     }

     // ...
   }
  ]
};
```

Please note that you can omit the `async` keyword if you don't use asynchronous code in your middleware. For details see [using command middleware](../../../reference/creating-the-write-model/using-command-middleware/).

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

For details see [using command services](../../../reference/creating-the-write-model/using-command-services/).

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

Please note that you can omit the `async` keyword if you don't use asynchronous code in your handler. For details see [handling events](../../../reference/creating-the-read-model/handling-events/).

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

For details see [using services](../../../reference/creating-the-read-model/using-services/).

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

Please note that you can omit the `async` keyword if you don't use asynchronous code in your reaction. For details see [handling events](../../../reference/creating-stateless-flows/handling-events/).

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

For details see [using services](../../../reference/creating-stateless-flows/using-services/).

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

Please note that you can omit the `async` keyword if you don't use asynchronous code in your reaction. For details see [handling events](../../../reference/creating-stateful-flows/handling-events/).

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

For details see [using services](../../../reference/creating-stateful-flows/using-services/).
