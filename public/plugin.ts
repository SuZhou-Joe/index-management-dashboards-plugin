/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { i18n } from "@osd/i18n";
import { IndexManagementPluginStart, IndexManagementPluginSetup } from ".";
import {
  AppCategory,
  AppMountParameters,
  CoreSetup,
  CoreStart,
  Plugin,
  PluginInitializerContext,
  DEFAULT_GROUPS,
} from "../../../src/core/public";
import { actionRepoSingleton } from "./pages/VisualCreatePolicy/utils/helpers";
import { ROUTES } from "./utils/constants";
import { JobHandlerRegister } from "./JobHandler";
import { ManagementOverViewPluginSetup } from "../../../src/plugins/management_overview/public";
import { DataSourceManagementPluginSetup } from "../../../src/plugins/data_source_management/public";

interface IndexManagementSetupDeps {
  managementOverview?: ManagementOverViewPluginSetup;
  dataSourceManagement?: DataSourceManagementPluginSetup;
}

const ISM_category: Record<string, AppCategory & { group?: AppCategory }> = {
  indexes: {
    id: "indexes",
    label: i18n.translate("core.ui.indexesNavList.label", {
      defaultMessage: "Indexes",
    }),
    order: 9000,
    euiIconType: "managementApp",
  },
  backup: {
    id: "backup",
    label: i18n.translate("core.ui.backupNavList.label", {
      defaultMessage: "Index backup and recovery",
    }),
    order: 9010,
    euiIconType: "managementApp",
  },
};

export class IndexManagementPlugin implements Plugin<IndexManagementPluginSetup, IndexManagementPluginStart, IndexManagementSetupDeps> {
  constructor(private readonly initializerContext: PluginInitializerContext) {
    // can retrieve config from initializerContext
  }

  public setup(core: CoreSetup, { managementOverview, dataSourceManagement }: IndexManagementSetupDeps): IndexManagementPluginSetup {
    JobHandlerRegister(core);

    if (managementOverview) {
      managementOverview.register({
        id: "opensearch_index_management_dashboards",
        title: "Index Management",
        order: 9010,
        description: i18n.translate("indexManagement.description", {
          defaultMessage: "Manage your indexes with state polices, templates and aliases. You can also roll up or transform your indexes.",
        }),
      });
      managementOverview.register({
        id: "opensearch_snapshot_management_dashboards",
        title: "Snapshot Management",
        order: 9020,
        description: i18n.translate("snapshotManagement.description", {
          defaultMessage:
            "Back up and restore your cluster's indexes and state. Setup a policy to automate snapshot creation and deletion.",
        }),
      });
    }

    const mountWrapper = async (params: AppMountParameters, defaultRoutes: string) => {
      const { renderApp } = await import("./index_management_app");
      const [coreStart, depsStart] = await core.getStartServices();
      return renderApp(coreStart, depsStart, params, defaultRoutes, dataSourceManagement);
    };

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.INDEX_POLICIES)}`,
      title: "Indexes",
      order: 8040,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.INDICES);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.DATA_STREAMS)}`,
      title: "Data streams",
      order: 8050,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.DATA_STREAMS);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.ALIASES)}`,
      title: "Index alias",
      order: 8060,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.ALIASES);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards`,
      title: "Index state management policies",
      order: 9010,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.INDEX_POLICIES);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.TEMPLATES)}`,
      title: "Index templates",
      order: 9011,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.TEMPLATES);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.NOTIFICATIONS)}`,
      title: "Index notification settings",
      order: 9012,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.NOTIFICATIONS);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.ROLLUPS)}`,
      title: "Rollup jobs",
      order: 9013,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.ROLLUPS);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.TRANSFORMS)}`,
      title: "Transform jobs",
      order: 9014,
      category: ISM_category.indexes,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.TRANSFORMS);
      },
    });

    core.application.register({
      id: "opensearch_snapshot_management_dashboards",
      title: "Index snapshots",
      order: 9020,
      category: ISM_category.backup,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.SNAPSHOT_POLICIES);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.SNAPSHOT_POLICIES)}`,
      title: "Index snapshot policies",
      order: 9030,
      category: ISM_category.backup,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.SNAPSHOT_POLICIES);
      },
    });

    core.application.register({
      id: `opensearch_index_management_dashboards_${encodeURIComponent(ROUTES.REPOSITORIES)}`,
      title: "Index snapshot repositories",
      order: 9040,
      category: ISM_category.backup,
      group: DEFAULT_GROUPS.dataAdministration,
      mount: async (params: AppMountParameters) => {
        return mountWrapper(params, ROUTES.REPOSITORIES);
      },
    });

    return {
      registerAction: (actionType, uiActionCtor, defaultAction) => {
        actionRepoSingleton.registerAction(actionType, uiActionCtor, defaultAction);
      },
    };
  }

  public start(core: CoreStart): IndexManagementPluginStart {
    Object.freeze(actionRepoSingleton.repository);
    // After this point, calling registerAction will throw error because "Object is not extensible"
    return {};
  }
}
