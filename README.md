# Atoti UI Migration

A command line interface to migrate:

- content saved in an old version of Atoti UI, making it compatible with newer versions.
- Atoti Jupyter notebooks saved in an old version of Atoti, making them compatible with newer versions.

You need [NodeJS](https://nodejs.org/en/download/) to run it.

## General usage

Create a folder in your workspace. Here, we call it _"migration"_.
Navigate to it.

```bash
mkdir migration
cd migration
```

The migration CLI requires two files:

- the file to migrate: it can be the server content stored in a JSON file, _content.json_ or an Atoti Jupyter notebook, _notebook.ipynb_.
- a JSON file with the Atoti servers' information: _servers.json_

Let's create these files.

## Migrate a content server 

### Download the original content

The content to migrate can be downloaded as a JSON file from [Atoti Admin UI](https://docs.activeviam.com/products/atoti/server/6.0.0/docs/content_server/cs_overview/#admin-ui). If you are used to accessing Atoti UI at `https://my-server.com/ui/index.html`, then you should be able to access Atoti Admin UI at `https://my-server.com/admin/ui/index.html`.

:warning: Make sure to connect as a user with access to all the content that must be migrated. We recommend connecting as a user with the role `ROLE_CS_ROOT`.

Right-click at the root of the file tree, and click **Export**. This will download a file called _content.json_. Move this file into your `migration` folder.

![](/documentation/download-content.gif)

:warning: Importing/exporting at the root of the file tree is available in Atoti Admin UI version 5.1.0 and higher.
If you don't see these actions in the context menu, it means that you are using an older Atoti Admin UI version and will have to upgrade.
If you are embedding Atoti Admin UI in your server like it is done on the Atoti Server sandbox, you can do so by simply bumping the dependency version in the `pom.xml`.

:bulb: You can also import/export programatically. See the [dedicated documentation](https://docs.activeviam.com/products/atoti/server/6.0.0/docs/content_server/cs_overview/#import-and-export) for more details.

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

:bulb: If you use Atoti UI to connect to several Atoti servers, then add an entry for each of them.

Replace `"https://my-server.com"` by the URL of your Atoti server.

Choose a key to identify this server and replace `"my-server"` by it. See [the Atoti UI tutorial](https://docs.activeviam.com/products/atoti/ui/5.1/docs/tutorial/running-a-query/#serverkey) for more details about server keys.

Download the data model from your Atoti server. The URL of the relevant REST service ends with _"discovery"_. You can find the documentation for this REST service [here](https://artifacts.activeviam.com/documentation/rest/6.0.0/activepivot.html#cube_discovery_get).

For instance, considering the Atoti server you used while going through the tutorial:

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

As an example, this would be the [servers.json](/documentation/servers-example.json) file if we were migrating the Atoti UI tutorial server. You can refer to it in order to make sure that your own `servers.json` has the correct structure, but do not use this example file to run your migration: it would not work.

:warning: If the content you're migrating will be hosted on a content server using a version of Atoti Server lower than 5.11 (e.g 5.10.x), then calculated measures must be set in XML as opposed to JSON for more recent versions. In that case, you need to set the optional `"contentServerVersion"` attribute at the root of your `servers.json` file to that version:

```json
{
  "contentServerVersion": "5.10.12",
  "my-server": {
    "url": "https://my-server.com",
    "dataModel": {}
  }
}
```

### Run the CLI

At this stage, your `migration` folder looks like this:

```
- content.json
- servers.json
```

Open a terminal in it and run the command below after adapting the `--from-version` and `--to-version` arguments as needed:

```
npx -- activeui-migration -i content.json -o migrated-content.json -s servers.json --from-version 4.3 --to-version 5.1
```

This command generates a file named `migrated-content.json` in the same folder. It contains the migrated content, ready to be used in the target version of Atoti UI.

#### Options

The CLI offers several options.
You can see them all by running:

```
npx -- activeui-migration --help
```

In particular:

- The `--debug` and `--stack` respectively allow for an error report generation and the stack of those errors. This is useful to understand and address any errors that may occur during the migration.
- The `--remove-widgets` option to remove all widgets with the given keys during the migration.
  For example, suppose you have 200 Atoti UI 4 bookmarks in which you use Page Filters and/or Page Context Values.
  These plugins are no longer supported in Atoti UI 5 as it was deemed a better user experience to remove them altogether.
  If you want to follow this UX and remove these widgets programmatically, you can run the migration CLI with the extra option:

```
npx -- activeui-migration -i content.json -o migrated-content.json -s servers.json --from-version 4.3 --to-version 5.1 --remove-widgets "filters" "context-values"
```

### Test the migrated content

Use Atoti Admin UI again, this time to import the migrated content.

:warning: You should create a backup folder to make sure you do not lose the original content.

![](/documentation/upload-content.gif)

Then follow the steps to [run Atoti UI](https://docs.activeviam.com/products/atoti/ui/5.1/docs/getting-started/#run-atoti-ui).

Finally open your dashboards, widgets, filters, ... Make sure they work as expected.

## Migrate an Atoti Jupyter notebook

To migrate a Jupyter notebook, two files are necessary:

- _notebook.ipynb_, the notebook to migrate. This file must have the `.ipynb` extension.
- _servers.json_, the JSON file containing the server information.

To get the servers information, follow the [download the servers information section](#download-the-servers-information) instructions.

Now that your migration folder contains all the required files, you can run the following command:

```
npx -- activeui-migration -i notebook.ipynb -o migrated-notebook.ipynb -s servers.json --from-version 0.7 --to-version 0.8
```

This command generates a file named `migrated-notebook.json` in the same folder. It contains the migrated notebook with all its migrated widgets, ready to be used with the Atoti version you migrated to. You can see the [run the CLI section](#run-the-cli) to get more details about the command line and its options.

:warning: Saved calculated measures are not removed from the queries of the widgets in your notebook. If you migrate your Content Server on top of your notebook, then you have to remove these saved calculated measures from the queries in your notebook manually (if any).

## Next steps

If you are migrating a project with custom Atoti UI extensions, then you must also update the code of these extensions.
Learn how in our dedicated documentation pages:

- Migrating from [Atoti UI 4 to 5](https://docs.activeviam.com/products/atoti/ui/5.1/docs/migrate-from-atoti-ui-4-to-5/).
- Migrating from [Atoti UI 5.0 to 5.1](https://docs.activeviam.com/products/atoti/ui/5.1/docs/migrate-from-atoti-ui-5.0-to-5.1).

## Customizing the migration

This paragraph will help you if you maintain an Atoti UI extension, decided to change the state it relies on and are looking to migrate some saved content so that it works with the new version of your extension.

`atoti-ui-migration` is an open source repository.
If you need to add/change migration logic, you can clone the repository and adapt the code as you please.

To run the CLI with your custom code, you must install and build the package yourself first.
Since it depends on private `@activeviam` packages, you must login to ActiveViam's Artifactory registry.
To do so, run the following command where `{username}` and `{password}` must be replaced with your ActiveViam credentials:

```bash
curl -u '{username}:{password}' https://activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/auth/activeviam >> ~/.npmrc
```

With Windows cmd:

```cmd
curl -u "{username}:{password}" https://activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/auth/activeviam >> %USERPROFILE%\.npmrc
```

After running this command, your .npmrc file should include the following lines:

```
@activeviam:registry=https://activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/
//activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/:_password={base64_encoded_password}
//activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/:username={username}
//activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/:email={email}
//activeviam.jfrog.io/artifactory/api/npm/activeui-npm-release/:always-auth=true
```
