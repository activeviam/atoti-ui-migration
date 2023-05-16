## SCB: Installation without Artifactory
First, run `npm install` in a PC which has access to Artifactory. It will populate `node_modules` folder with dependent packages.
Look into the `node_modules\@activeviam` which we need to prepare for offline installation.

Run below script to generate tarball files for each of the package under `@activeviam` scope into the folder `vendor`.

```bash
PROJECT_DIR=$(pwd)
for f in node_modules/@activeviam/*; do
    if [ -d "$f" ]; then
        cd $f
        #echo "$PWD"
        npm pack --pack-destination $PROJECT_DIR/vendor/
        cd $PROJECT_DIR
    fi
done
```

Update `package.json` for `@activeviam` dependencies with tarball files.
Finally, It will be ready to `npm install` without artifactory access.