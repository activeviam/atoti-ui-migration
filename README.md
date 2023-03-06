# ActiveUI Migration

A command line interface to migrate content that was saved in older versions of ActiveUI to be compatible with newer versions.

You need [NodeJS](https://nodejs.org/en/download/) to run it.

## Usage

Create a folder in your workspace. Here, we call it _"migration"_.
Navigate to it.

```bash
mkdir migration
cd migration
```

`activeui-migration` requires two JSON files:

- _content.json_: the original content to migrate
- _servers.json_: the ActivePivot server's information

Let's create these files.

### Download the original content

The content to migrate can be downloaded as a JSON file from the atoti+ [Admin UI](https://activeviam.com/activepivot/6.0.0/docs/content_server/cs_overview/#admin-ui). If you are used to accessing ActiveUI at `https://my-server.com/ui/index.html`, then you should be able to access the Admin UI at `https://my-server.com/admin/ui/index.html`.

:warning: Make sure to connect as a user with access to all the content that must be migrated. We recommend connecting as a user with the role `ROLE_CS_ROOT`.

Right-click at the root of the file tree, and click **Export**. This will download a file called _content.json_. Move this file into your `migration` folder.

![](/documentation/download-content.gif)

:warning: Importing/exporting at the root of the file tree is available in atoti+ Admin UI version 5.1.0 and higher.
If you don't see these actions in the context menu, it means that you are using an older Admin UI version and will have to upgrade.
If you are embedding Admin UI in your server like it is done on the ActivePivot sandbox, you can do so by simply bumping the dependency version in the `pom.xml`.

:bulb: You can also import/export programatically. See the [dedicated documentation](https://activeviam.com/activepivot/6.0.0/docs/content_server/cs_overview/#import-and-export) for more details.

### Download the servers information

Create a file called `servers.json`.

Copy and paste the snippet below into this file. It is not a valid JSON object. This is intended: we must replace a few things.

```json
{
  "my-server": {
    "url": "https://my-server.com",
    "dataModel": {}
  }
}
```

:bulb: If you use ActiveUI to connect to several ActivePivot servers, then add an entry for each of them.

Replace `"https://my-server.com"` by the URL of your ActivePivot server.

Choose a key to identify this server and replace `"my-server"` by it. See [the ActiveUI tutorial](https://activeviam.com/activeui/documentation/5.1.0/docs/tutorial/runningAQuery#serverkey) for more details about server keys.

Download the data model from your ActivePivot server. The URL of the relevant REST service ends with _"discovery"_. You can find the documentation for this REST service [here](https://artifacts.activeviam.com/documentation/rest/6.0.0/activepivot.html#cube_discovery_get).

For instance, considering the ActivePivot server you used while going through the tutorial:

- it is deployed at https://activeui-tutorial-server.activeviam.com:9090/pivot
- its `discovery` service is accessible at https://activeui-tutorial-server.activeviam.com:9090/pivot/rest/v5/cube/discovery

The server response looks like this:

```json
{
  "status": "success",
  "data": {
    "catalogs": [...],
    "contextValues": [...]
  }
}
```

Copy the `catalogs` and `contextValues` and paste them into `dataModel` in the `servers.json` file. The rest of the response does not matter.

As an example, this would be the [servers.json](/documentation/servers-example.json) file if we were migrating the ActiveUI tutorial server. You can refer to it in order to make sure that your own `servers.json` has the correct structure, but do not use this example file to run your migration: it would not work.

### Run the CLI

At this stage, your `migration` folder looks like this:

```
- content.json
- servers.json
```

Open a terminal in it and run the command below after adapting the `--from-version` and `--to-version` arguments as needed:

```
npx -- activeui-migration migrate -i content.json -o migrated-content.json -s servers.json --from-version 4.3 --to-version 5.1
```

This command generates a file named `migrated-content.json` in the same folder. It contains the migrated content, ready to be used in the target version of ActiveUI.

#### Options

The CLI offers several options.
You can see them all by running:

```
npx -- activeui-migration migrate --help
```

In particular:

- The `--debug` and `--stack` respectively allow for an error report generation and the stack of those errors. This is useful to understand and address any error that may occur the migration.
- The `--remove-widgets` option to remove all widgets with the given keys during the migration.
  For example, suppose you have 200 ActiveUI 4 bookmarks in which you use Page Filters and/or Page Context Values.
  These plugins are no longer supported in ActiveUI 5 as it was deemed a better user experience to remove them altogether.
  If you want to follow this UX and remove these widgets programmatically, you can run the migration CLI with the extra option:

```
npx -- activeui-migration migrate -i content.json -o migrated-content.json -s servers.json --from-version 4.3 --to-version 5.1 --remove-widgets "filters" "context-values"
```

### Test the migrated content

Use the Admin UI again, this time to import the migrated content.

:warning: You should create a backup folder to make sure you do not lose the original content.

![](/documentation/upload-content.gif)

Then follow the steps to [run ActiveUI](https://activeviam.com/activeui/documentation/5.1.0/docs/getting-started#run-activeui).

Finally open your dashboards, widgets, filters, ... Make sure they work as expected.

## Next steps

If you are migrating a project with custom ActiveUI extensions, then you must also update the code of these extensions.
Learn how in our dedicated documentation pages:

- Migrating from [ActiveUI 4 to 5](https://activeviam.com/activeui/documentation/5.1.0/docs/migrate-from-activeui-4-to-5).
- Migrating from [ActiveUI 5.0 to 5.1](https://activeviam.com/activeui/documentation/5.1.0/docs/migrate-from-activeui-5.0-to-5.1).

## Customizing the migration

This paragraph will help you if you maintain an ActiveUI extension, decided to change the state it relies on and are looking to migrate some saved content so that it works with the new version of your extension.

`activeui-migration` is an open source repository.
If you need to add/change migration logic, you can clone the repository and adapt the code as you please.

To run the CLI with your custom code, you must install and build the package yourself first.
Since it depends on private `@activeviam` packages, you must login to ActiveViam's Artifactory registry:

```bash
npm login --scope=@activeviam --registry=https://activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/ --auth-type=legacy
npm install
npm run build
```
