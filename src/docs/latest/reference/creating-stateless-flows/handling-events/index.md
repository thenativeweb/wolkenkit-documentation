# Handling events

To handle an event, add the fully-qualified name of the event to the `when` object and provide a function to handle the event. This function takes a single parameter, the event.

Inside of the function, add code that reacts to the event.

E.g., to handle the `issued` event of an invoice, use the following code:

```javascript
const when = {
  'accounting.invoice.issued' (event) {
    // ...
  }
};
```

Some event handlers require asynchronous code. Therefore, you can use the keywords `async` and `await`. To be able do this, define the handler using the `async` keyword:

```javascript
const when = {
  async 'accounting.invoice.issued' (event) {
    // ...
  }
};
```
