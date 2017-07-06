# Changelog

Read what has changed in wolkenkit.

## <%= current.version %>

The following significant changes have been made since wolkenkit `1.0.1`:

- **Fixed** invalid read query handling in HTTP-API
  - We've spotted a bug that allowed invalid read queries to bring down the HTTP-API. With wolkenkit-broker 1.0.2 we've hardened our API.
  - Contributions: [tailwind](https://github.com/thenativeweb/tailwind/commit/f8c3b9c), [wolkenkit-broker](https://github.com/thenativeweb/wolkenkit-broker/commit/834e0d6)


For details on how to update to version `<%= current.version %>` see [updating the CLI](../../../../<%= current.version %>/getting-started/updating-wolkenkit/updating-the-cli/) and [updating an application](../../../../<%= current.version %>/getting-started/updating-wolkenkit/updating-an-application/).


## 1.0.1

The following significant changes have been made since wolkenkit `1.0.0`:

- **Fixed** compatibility with Docker <%= current.versions.docker %>
  - With wolkenkit-cli 1.0.1, wolkenkit is compatible with Docker backends running on the latest Docker version.
  - [Discussion](https://github.com/thenativeweb/wolkenkit/issues/5)

For details on how to update to version `1.0.1` see [updating the CLI](../../../../<%= current.version %>/getting-started/updating-wolkenkit/updating-the-cli/).
