# ActiveUI Migration

A command line to migrate content that was saved in ActiveUI 4.3, in order to be able to use it in ActiveUI 5.0.

## Installation

Create a folder in your workspace. Here, we call it _"migration"_.
Navigate to it.
Initialize it as an NPM module.
Finally, install `activeui-migration` as a dependency.

```shell
mkdir migration
cd migration
npm init
npm install activeui-migration
```

:pencil: To run this, you need [NodeJS](https://nodejs.org/en/download/), which comes with `npm`.

## Usage

`activeui-migration` requires two JSON files:

- _content of ui.json_: the original content to migrate
- _servers.json_: the ActivePivot server's information

and a third optional file:

- _content of pivot.json_: the content from the pivot folder on the content server.

Let's create these files.

### Download the original content

The content to migrate can be downloaded as a JSON file from the atoti+ Admin UI. If you are used to accessing ActiveUI at `https://my-server.com/ui/index.html`, then you should be able to access the Admin UI at `https://my-server.com/admin/ui/index.html`.

:warning: Make sure to connect as a user with access to all the content that must be migrated. We recommend connecting as a user with the role `ROLE_CS_ROOT`.

Right-click the folder named **ui** and click **Export**. This will download a file called _content of ui.json_. Move this file into your `migration` folder.

![](/documentation/download-content.gif)

### Optional: Download the content of the pivot folder

:warning: If there are calculated measures to be migrated from ActiveUI-4 to the ActiveUI-5 content servers, this file is required. If this is not the case, this file can be disregarded.

Right-click the folder named **pivot** and click **Export**. This will download a file called _content of pivot.json_. Move this file into your `migration` folder.

### Download the servers information

Create a file in the `migration` folder and name it `servers.json`.

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

Choose a key to identify this server and replace `"my-server"` by it. See [the ActiveUI tutorial](https://activeviam.com/activeui/documentation/5.0.0/docs/tutorial/runningAQuery#serverkey) for more details about server keys.

Download the data model from your ActivePivot server. The URL of the relevant service ends with _"discovery"_. You will find its full URL in the documentation under `/webservices`.

For instance, considering the ActivePivot server you used while going through the tutorial:

- it is deployed at https://activeui-tutorial-server.activeviam.com:9090/pivot
- its `webservices` documentation is accessible at https://activeui-tutorial-server.activeviam.com:9090/pivot/webservices
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
> node_modules
- package.json
- content of ui.json
- servers.json
```

Open a terminal in it and run:

```
npx migrate -i "content of ui.json" -o migrated-content.json -s servers.json -p "content of pivot.json"
```

**Note**: The `-p` flag is not required unless calculated measures must also be migrated.

This command generates a file named `migrated-content.json` in the same folder. It contains the migrated content, ready to be used in ActiveUI 5.

Optionally, you can pass an extra `--remove-widgets` option to remove all ActiveUI 4 widgets with the given keys during the migration.
For example, suppose you have 200 ActiveUI 4 bookmarks in which you use Page Filters and/or Page Context Values.
These plugins are not supported anymore in ActiveUI 5 as it was deemed a better user experience to remove them altogether.
If you want to follow this UX and remove these widgets programmatically, you can run the migration CLI with the extra option:

```
npx migrate -i "content of ui.json" -o migrated-content.json -s servers.json --remove-widgets "filters" "context-values"
```

There are two other optional flags that can help you during the migration process:

- `--debug`: writes all errors in a `report.json` file, organized by folders and type of entity.
- `--stack`: used with `--debug`, adds a stacktrace to each error reported in the `report.json` file.

### Test the migrated content

Use the Content Manager again, this time to import this migrated content.

:warning: You should create a backup folder to make sure you do not lose the original content.

![](/documentation/upload-content.gif)

Then follow the steps to [run ActiveUI](https://activeviam.com/activeui/documentation/5.0.6/docs/getting-started#run-activeui).

Finally open your dashboards, widgets, filters, ... Make sure they work as expected.

## Next steps

If you are migrating a project with custom ActiveUI extensions, then you must also update the code of these extensions. Learn how in our [Migrating from ActiveUI 4 to 5 documentation page](https://activeviam.com/activeui/documentation/5.0.6/docs/migrate-from-activeui-4-to-5).
