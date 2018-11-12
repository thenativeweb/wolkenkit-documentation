# Updating an application

To update an application to the current version of wolkenkit follow the steps given below.


TODO: Problem mit `--port` und `--shared-key` ansprechen, wolkenkit export and import verlinken


## package.json

**Previous version (2.0.0)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "2.0.0"
  },
  "environments": {
    "default": {
      "api": {
        "...": "..."
      }
    }
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
  "environments": {
    "default": {
      "api": {
        "...": "..."
      },
      "fileStorage": {
        "allowAccessFrom": "*"
      }
    }
  },
  "...": "..."
}
```

## Storing large files

**Previous version (2.0.0)**

```javascript
// ...
```

**Current version (<%= current.version %>)**

```javascript
// ...
```

For details see [storing large files](../../../reference/storing-large-files/accessing-file-storage/).
