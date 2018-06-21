# Updating an application

To update an application to the current version of wolkenkit follow the steps given below.

## package.json

**Previous version (2.0.0)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "2.0.0"
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