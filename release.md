## Releasing a new version

To perform a new release, perform the following steps:

- Bump the version number: for example 5.0.8-SNAPSHOT to 5.0.8
- Run `yarn && yarn build` to generate the bundle that will be published
- Commit the version change and tag it
- Run `npm publish`
- On success, add another commit to bump to the next snapshot version, i.e. 5.0.8 to 5.0.9-SNAPSHOT
- Publish the two commits and the tag on the remote repository on GitHub

## Versioning

`activeui-migration` major and minor version numbers should be aligned on `activeui-sdk`, but the patch versions are independent.
Examples:

1. `activeui-migration` and `activeui-sdk` are currently both on 5.0.7, but an internal bugfix is needed on `activeui-migration` => `activeui-migration` 5.0.8 can be released while staying on `activeui-sdk` 5.0.7.
2. Same as 1. but vice-versa.
3. `activeui-sdk` 5.1.0 is about to be released. It comes with breaking changes (follows romantic versioning).
To migrate from `activeui-sdk` 5.0.x to `activeui-sdk` 5.1.0, `activeui-migration` 5.1.0 should be released. 