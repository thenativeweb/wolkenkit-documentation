# Changelog

Read what has changed in wolkenkit.

## <%= current.version %>

The following significant changes have been made since wolkenkit `1.0.1`:

- **Fixed** compatibility with Docker 17.05 and above
  - With CLI 1.0.2, wolkenkit is compatible with Docker backends running on Docker 17.05 and above.
  - See [thenativeweb/wolkenkit#5](https://github.com/thenativeweb/wolkenkit/issues/5) for details.
- **Fixed** invalid read query handling in HTTP API
  - There was a bug that caused invalid read queries to bring down the HTTP API. With wolkenkit <%= current.version %> this has been fixed.  
- **Contributions** by the community
  - [@coderbyheart](https://github.com/coderbyheart)
  - [@czosel](https://github.com/czosel)
  - [@revrng](https://github.com/revrng)

For details on how to update to version `<%= current.version %>` see [updating the CLI](../../../../<%= current.version %>/getting-started/updating-wolkenkit/updating-the-cli/) and [updating an application](../../../../<%= current.version %>/getting-started/updating-wolkenkit/updating-an-application/).

## 1.0.1

The following significant changes have been made since wolkenkit `1.0.0`:

- **Fixed** wolkenkit init
  - There was an error in the CLI that occured while initializing new wolkenkit applications. wolkenkit CLI 1.0.1 fixes this issue.
  - See [thenativeweb/wolkenkit#1](https://github.com/thenativeweb/wolkenkit/issues/1) for details.
- **Contributions** by the community
  - [@MuwuM](https://github.com/MuwuM)

For details on how to update to version `1.0.1` see [updating the CLI](../../../../1.0.1/getting-started/updating-wolkenkit/updating-the-cli/).
