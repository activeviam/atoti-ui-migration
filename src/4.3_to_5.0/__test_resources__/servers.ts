import { dataModelsForTests } from "@activeviam/data-model";

/**
 * A datamodel and URL, useful to unit test the migration scripts.
 */
export const servers = {
  "my-server": {
    dataModel: dataModelsForTests.sandbox,
    url: "http://localhost:9090",
  },
};
