# Migration

Provides functions useful to migrate content saved with ActiveUI 4.3 in order to make it usable with ActiveUI 5.

These functions can be run through a [CLI](#cli-usage).

## Installation

With npm:

```shell
npm install @activeviam/activeui-migration
```

With yarn:

```shell
yarn add @activeviam/activeui-migration
```

## CLI Usage

```shell
yarn migrate -i <input-path> -o <output-path> -s <servers-path>
```

- `input-path` is the path to the JSON export of the ActiveUI 4 /ui folder to migrate.
- `output-path` is the path to the migrated file.
- `servers-path` is the path to the JSON file holding the servers information (see [servers](#servers)).

### servers

`servers` is a map of the following form:

```
{[serverKey]: {url, dataModel}}
```

It corresponds to the ActivePivot servers to which your ActiveUI 4 application was connected.

For each server:

- `url` is the server's URL
- [`dataModel`](https://activeviam.com/activeui/documentation/5.0.0/docs/api/types#datamodel) is, in ActivePivot terms, the server's discovery, which you can retrieve either by opening your ActiveUI 4 application and inspecting the network tab to retrieve the response of the `discovery` call, or by performing the [REST call](https://artifacts.activeviam.com/documentation/rest/5.10.1/activepivot.html#cube_discovery_get) yourself.
- `serverKey` is the unique key to use for that server in ActiveUI 5.

You should use the same server keys in `servers` as in the [`<ClientsProvider />`](https://activeviam.com/activeui/documentation/5.0.0/docs/api/contextProviders#clientsprovider) used in your ActiveUI 5 application.
