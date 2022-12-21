/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { InitOption } from "../lib/field";
import { ComponentMapEnum } from "../components/FormGenerator";

export const PLUGIN_NAME = "opensearch_index_management_dashboards";

export const DEFAULT_EMPTY_DATA = "-";

export const DOCUMENTATION_URL = "https://opensearch.org/docs/im-plugin/ism/index/";
export const POLICY_DOCUMENTATION_URL = "https://opensearch.org/docs/im-plugin/ism/policies/";
export const ACTIONS_DOCUMENTATION_URL = "https://opensearch.org/docs/im-plugin/ism/policies/#actions";
export const STATES_DOCUMENTATION_URL = "https://opensearch.org/docs/im-plugin/ism/policies/#states";
export const ERROR_NOTIFICATION_DOCUMENTATION_URL = "https://opensearch.org/docs/im-plugin/ism/policies/#error-notifications";
export const TRANSITION_DOCUMENTATION_URL = "https://opensearch.org/docs/im-plugin/ism/policies/#transitions";

export const SNAPSHOT_MANAGEMENT_DOCUMENTATION_URL = "https://opensearch.org/docs/latest/opensearch/snapshots/snapshot-management/";
export const CRON_EXPRESSION_DOCUMENTATION_URL = "https://opensearch.org/docs/latest/monitoring-plugins/alerting/cron/";
export const RESTORE_SNAPSHOT_DOCUMENTATION_URL =
  "https://opensearch.org/docs/latest/opensearch/snapshots/snapshot-restore/#restore-snapshots";
export const REPOSITORY_DOCUMENTATION_URL = "https://opensearch.org/docs/latest/opensearch/snapshots/snapshot-restore/#register-repository";
export const FS_REPOSITORY_DOCUMENTATION_URL =
  "https://opensearch.org/docs/latest/opensearch/snapshots/snapshot-restore/#shared-file-system";
export const S3_REPOSITORY_DOCUMENTATION_URL = "https://opensearch.org/docs/latest/opensearch/snapshots/snapshot-restore/#amazon-s3";
export const SHRINK_DOCUMENTATION_URL = "https://opensearch.org/docs/latest/api-reference/index-apis/shrink-index";
export const INDEX_SETTINGS_URL = "https://opensearch.org/docs/latest/api-reference/index-apis/create-index#index-settings";

export const ROUTES = Object.freeze({
  CHANGE_POLICY: "/change-policy",
  CREATE_POLICY: "/create-policy",
  EDIT_POLICY: "/edit-policy",
  MANAGED_INDICES: "/managed-indices",
  INDEX_POLICIES: "/index-policies",
  POLICY_DETAILS: "/policy-details",
  INDICES: "/indices",
  ROLLUPS: "/rollups",
  CREATE_ROLLUP: "/create-rollup",
  EDIT_ROLLUP: "/edit-rollup",
  ROLLUP_DETAILS: "/rollup-details",
  TRANSFORMS: "/transforms",
  CREATE_TRANSFORM: "/create-transform",
  EDIT_TRANSFORM: "/edit-transform",
  TRANSFORM_DETAILS: "/transform-details",
  SNAPSHOT_POLICIES: "/snapshot-policies",
  SNAPSHOT_POLICY_DETAILS: "/snapshot-policy-details",
  CREATE_SNAPSHOT_POLICY: "/create-snapshot-policy",
  EDIT_SNAPSHOT_POLICY: "/edit-snapshot-policy",
  SNAPSHOTS: "/snapshots",
  CREATE_SNAPSHOT: "/create-snapshot",
  EDIT_SNAPSHOT: "/edit-snapshot",
  REPOSITORIES: "/repositories",
  CREATE_REPOSITORY: "/create-repository",
  EDIT_REPOSITORY: "/edit-repository",
  CREATE_INDEX: "/create-index",
  INDEX_DETAIL: "/index-detail",
  REINDEX: "/reindex",
  ALIASES: "/aliases",
  TEMPLATES: "/templates",
  CREATE_TEMPLATE: "/create-template",
  SPLIT_INDEX: "/split-index",
  SHRINK_INDEX: "/shrink-index",
});

export const BREADCRUMBS = Object.freeze({
  INDEX_MANAGEMENT: { text: "Index Management", href: "#/" },
  INDICES: { text: "Indices", href: `#${ROUTES.INDICES}` },
  INDEX_POLICIES: { text: "Index policies", href: `#${ROUTES.INDEX_POLICIES}` },
  MANAGED_INDICES: { text: "Managed indices", href: `#${ROUTES.MANAGED_INDICES}` },
  EDIT_POLICY: { text: "Edit policy" },
  CREATE_POLICY: { text: "Create policy" },
  CHANGE_POLICY: { text: "Change policy" },
  POLICY_DETAILS: { text: "Policy details" },
  ROLLUPS: { text: "Rollup jobs", href: `#${ROUTES.ROLLUPS}` },
  CREATE_ROLLUP: { text: "Create rollup job" },
  EDIT_ROLLUP: { text: "Edit rollup job" },
  ROLLUP_DETAILS: { text: "Rollup details" },
  TRANSFORMS: { text: "Transform jobs", href: `#${ROUTES.TRANSFORMS}` },
  CREATE_TRANSFORM: { text: "Create transform job" },
  EDIT_TRANSFORM: { text: "Edit transform job" },
  TRANSFORM_DETAILS: { text: "Transform details" },

  SNAPSHOT_MANAGEMENT: { text: "Snapshot Management", href: `#${ROUTES.SNAPSHOT_POLICIES}` },

  SNAPSHOT_POLICIES: { text: "Snapshot policies", href: `#${ROUTES.SNAPSHOT_POLICIES}` },
  SNAPSHOT_POLICY_DETAILS: { text: "Snapshot policy details" },
  CREATE_SNAPSHOT_POLICY: { text: "Create snapshot policy" },
  EDIT_SNAPSHOT_POLICY: { text: "Edit snapshot policy" },

  SNAPSHOTS: { text: "Snapshots", href: `#${ROUTES.SNAPSHOTS}` },
  CREATE_SNAPSHOT: { text: "Create repository", href: `#${ROUTES.CREATE_REPOSITORY}` },
  EDIT_SNAPSHOT: { text: "Edit repository", href: `#${ROUTES.EDIT_REPOSITORY}` },

  REPOSITORIES: { text: "Repositories", href: `#${ROUTES.REPOSITORIES}` },
  CREATE_REPOSITORY: { text: "Create repository", href: `#${ROUTES.CREATE_REPOSITORY}` },
  EDIT_REPOSITORY: { text: "Edit repository", href: `#${ROUTES.EDIT_REPOSITORY}` },
  CREATE_INDEX: { text: "Create index", href: `#${ROUTES.CREATE_INDEX}` },
  EDIT_INDEX: { text: "Edit Index", href: `#${ROUTES.CREATE_INDEX}` },
  INDEX_DETAIL: { text: "Index Detail", href: "#" },
  REINDEX: { text: "Reindex", href: `#${ROUTES.REINDEX}` },
  ALIASES: { text: "Aliases", href: `#${ROUTES.ALIASES}` },
  TEMPLATES: { text: "Templates", href: `#${ROUTES.TEMPLATES}` },
  CREATE_TEMPLATE: { text: "Create template", href: `#${ROUTES.CREATE_TEMPLATE}` },
  EDIT_TEMPLATE: { text: "Edit template", href: `#${ROUTES.CREATE_TEMPLATE}` },
  SPLIT_INDEX: { text: "Split Index", href: `#${ROUTES.SPLIT_INDEX}` },
  SHRINK_INDEX: { text: "Shrink index", href: `#${ROUTES.SHRINK_INDEX}` },
});

// TODO: EUI has a SortDirection already
export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export const FixedTimeunitOptions = [
  { value: "ms", text: "Millisecond(s)" },
  { value: "s", text: "Second(s)" },
  { value: "m", text: "Minute(s)" },
  { value: "h", text: "Hour(s)" },
  { value: "d", text: "Day(s)" },
];

export const CalendarTimeunitOptions = [
  { value: "m", text: "Minute" },
  { value: "h", text: "Hour" },
  { value: "d", text: "Day" },
  { value: "w", text: "Week" },
  { value: "M", text: "Month" },
  { value: "q", text: "Quarter" },
  { value: "y", text: "Year" },
];

export enum IntervalType {
  FIXED = "fixed",
  CALENDAR = "calendar",
}

export const INDEX_IMPORT_SETTINGS = ["index.number_of_replicas", "index.number_of_shards", "index.refresh_interval"];

export const INDEX_DYNAMIC_SETTINGS = [
  "index.number_of_replicas",
  "index.auto_expand_replicas",
  "index.search.idle.after",
  "index.refresh_interval",
  "index.max_result_window",
  "index.max_inner_result_window",
  "index.max_rescore_window",
  "index.max_docvalue_fields_search",
  "index.max_script_fields",
  "index.max_ngram_diff",
  "index.max_shingle_diff",
  "index.max_refresh_listeners",
  "index.analyze.max_token_count",
  "index.highlight.max_analyzed_offset",
  "index.max_terms_count",
  "index.max_regex_length",
  "index.query.default_field",
  "index.routing.allocation.enable",
  "index.gc_deletes",
  "index.default_pipeline",
  "index.final_pipeline",
  "index.hidden",
];

export const INDEX_MAPPING_TYPES: {
  label?: string;
  hasChildren?: boolean;
  options?: {
    fields?: (InitOption & { label: string; type: ComponentMapEnum; initValue?: any })[];
  };
}[] = [
  {
    label: "alias",
    options: {
      fields: [
        {
          label: "Path",
          name: "path",
          type: "Input",
          rules: [
            {
              required: true,
              message: "Path is required.",
            },
          ],
        },
      ],
    },
  },
  {
    label: "boolean",
  },
  {
    label: "binary",
  },
  {
    label: "completion",
  },
  {
    label: "date",
  },
  {
    label: "date_range",
  },
  {
    label: "double",
  },
  {
    label: "double_range",
  },
  {
    label: "float",
  },
  {
    label: "geo_point",
  },
  {
    label: "geo_shape",
  },
  {
    label: "half_float",
  },
  {
    label: "integer",
  },
  {
    label: "ip",
  },
  {
    label: "ip_range",
  },
  {
    label: "keyword",
  },
  {
    label: "long",
  },
  {
    label: "long_range",
  },
  {
    label: "object",
    hasChildren: true,
  },
  {
    label: "percolator",
  },
  {
    label: "rank_feature",
  },
  {
    label: "rank_features",
  },
  {
    label: "search_as_you_type",
  },
  {
    label: "text",
  },
  {
    label: "token_count",
    options: {
      fields: [
        {
          label: "Analyzer",
          name: "analyzer",
          initValue: "standard",
          type: "Input",
          rules: [
            {
              required: true,
              message: "Analyzer is required.",
            },
          ],
        },
      ],
    },
  },
];

export enum IndicesUpdateMode {
  mappings = "mappings",
  settings = "settings",
  alias = "alias",
}

export const INDEX_MAPPING_TYPES_WITH_CHILDREN = INDEX_MAPPING_TYPES.filter((item) => item.hasChildren).map((item) => item.label);

export const DEFAULT_LEGACY_ERROR_NOTIFICATION = {
  destination: {
    slack: {
      url: "<url>",
    },
  },
  message_template: {
    source: "The index {{ctx.index}} failed during policy execution.",
  },
};

export const ALIAS_STATUS_OPTIONS = ["open", "closed", "hidden", "none", "all"].map((item) => ({
  label: item,
  value: item,
}));

export const INDEX_NAMING_MESSAGE = `Must be in lowercase letters. Cannot begin with underscores or hyphens. Spaces, commas, and characters :, \", *, +, /, \, |, ?, #, > are not allowed.`;

export const REPLICA_NUMBER_MESSAGE = "Specify the number of replicas each primary shard should have. Default is 1.";

export const TEMPLATE_TYPE = {
  INDEX_TEMPLATE: "Indexes",
  DATA_STREAM: "Data streams",
};
