import { BrowserServices } from "../../models/interfaces";
import { ServerResponse } from "../../../server/models/types";
import { ActionType, ActionTypeMapName } from "../../pages/Notifications/constant";
import { ILronConfig } from "../../pages/Notifications/interface";
import { CoreStart } from "opensearch-dashboards/public";

export const GetLronConfig = async (props: {
  services: BrowserServices;
  actionType: ActionType;
}): Promise<
  ServerResponse<{
    lron_configs: {
      lron_config: ILronConfig;
    }[];
    total_number: number;
  }>
> => {
  return props.services.commonService.apiCaller<{
    lron_configs: {
      lron_config: ILronConfig;
    }[];
    total_number: number;
  }>({
    endpoint: "transport.request",
    data: {
      method: "GET",
      path: `/_plugins/_im/lron/${encodeURIComponent(`LRON:${ActionTypeMapName[props.actionType]}`)}`,
    },
  });
};

export const associateWithTask = async (props: {
  services: BrowserServices;
  coreServices: CoreStart;
  taskId: string;
  lronConfig: ILronConfig;
}) => {
  const result = await props.services.commonService.consoleProxyCaller({
    endpoint: "transport.request",
    data: {
      method: "PUT",
      path: `/_plugins/_im/lron/${encodeURIComponent(`LRON:${props.taskId}`)}`,
      body: {
        lron_config: {
          ...props.lronConfig,
          task_id: props.taskId,
        } as ILronConfig,
      },
    },
  });
  if (!result.ok) {
    props.coreServices.notifications.toasts.addDanger(result.error);
  }

  return result.ok;
};
