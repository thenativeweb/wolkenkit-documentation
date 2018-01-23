# Setting environment variables

It may be necessary to set custom environment variables to make your code work as intended. For that, open the application's `package.json` file and set the `wolkenkit/environments/default/environmentVariables` object with key-value pairs that you want to use.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to set environment variables, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "environmentVariables": {
        "foo": 42,
        "bar": "baz",
        "fooBar": 3.1415
      }
    }
  }  
}
```

:::hint-warning
> **Accessing environment variables inside the application**
>
> If you want to access an environment variable inside the application, make sure that each
environment variable is prefixed with `WOLKENKIT_` and in snake and upper cased format.
:::

Finally to access environment variables, use the following code:

```javascript
process.env.WOLKENKIT_FOO
// => 42

process.env.WOLKENKIT_BAR
// => "baz"

process.env.WOLKENKIT_FOO_BAR
// => 3.1415
```
