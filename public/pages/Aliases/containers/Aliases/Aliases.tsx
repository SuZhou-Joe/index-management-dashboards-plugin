/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, useContext, useState } from "react";
import _ from "lodash";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";
import {
  EuiHorizontalRule,
  EuiBasicTable,
  Criteria,
  EuiTableSortingType,
  Direction,
  Pagination,
  EuiTableSelectionType,
  EuiButtonEmpty,
  EuiButton,
} from "@elastic/eui";
import { ContentPanel, ContentPanelActions } from "../../../../components/ContentPanel";
import { DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_QUERY_PARAMS } from "../../utils/constants";
import CommonService from "../../../../services/CommonService";
import { IAlias } from "../../interface";
import { BREADCRUMBS } from "../../../../utils/constants";
import { CoreServicesContext } from "../../../../components/core_services";
import { ServicesContext } from "../../../../services";
import IndexControls from "../../components/IndexControls";
import CreateAlias from "../CreateAlias";
import AliasesActions from "../AliasActions";

interface AliasesProps extends RouteComponentProps {
  commonService: CommonService;
}

interface AliasesState {
  totalAliases: number;
  from: string;
  size: string;
  search: string;
  sortField: keyof IAlias;
  sortDirection: Direction;
  selectedItems: IAlias[];
  aliases: IAlias[];
  loading: boolean;
  aliasCreateFlyoutVisible: boolean;
}

function IndexNameDisplay(props: { indices: string[] }) {
  const [hide, setHide] = useState(true);
  const finalIndices = hide ? props.indices.slice(0, 3) : props.indices;

  return (
    <>
      <span>{finalIndices.join(",")}</span>
      {props.indices.length < 3 ? null : (
        <EuiButtonEmpty onClick={() => setHide(!hide)}>{hide ? `${props.indices.length - 3} more` : "hide"}</EuiButtonEmpty>
      )}
    </>
  );
}

class Aliases extends Component<AliasesProps, AliasesState> {
  static contextType = CoreServicesContext;
  constructor(props: AliasesProps) {
    super(props);
    const {
      from = DEFAULT_QUERY_PARAMS.from,
      size = DEFAULT_QUERY_PARAMS.size,
      search = DEFAULT_QUERY_PARAMS.search,
      sortField = DEFAULT_QUERY_PARAMS.sortField,
      sortDirection = DEFAULT_QUERY_PARAMS.sortDirection,
    } = queryString.parse(location.search) as {
      from: string;
      size: string;
      search: string;
      sortField: keyof IAlias;
      sortDirection: Direction;
    };
    this.state = {
      totalAliases: 0,
      from,
      size,
      search,
      sortField,
      sortDirection,
      selectedItems: [],
      aliases: [],
      loading: false,
      aliasCreateFlyoutVisible: false,
    };

    this.getAliases = _.debounce(this.getAliases, 500, { leading: true });
  }

  componentDidMount() {
    this.context.chrome.setBreadcrumbs([BREADCRUMBS.INDEX_MANAGEMENT, BREADCRUMBS.INDICES]);
    this.getAliases();
  }

  getQueryState = (state: AliasesState) => {
    return Object.keys(DEFAULT_QUERY_PARAMS).reduce((total, key) => {
      return {
        ...total,
        [key]: state[key as keyof typeof DEFAULT_QUERY_PARAMS],
      };
    }, {} as AliasesState);
  };

  groupResponse = (array: IAlias[]) => {
    const groupedMap: Record<string, IAlias & { order: number }> = {};
    array.forEach((item, index) => {
      groupedMap[item.alias] = groupedMap[item.alias] || {
        ...item,
        order: index,
        indexArray: [],
      };
      groupedMap[item.alias].indexArray.push(item.index);
    });
    const result = Object.values(groupedMap);
    result.sort((a, b) => a.order - b.order);
    return Object.values(groupedMap).sort();
  };

  getAliases = async (): Promise<void> => {
    this.setState({ loading: true });
    const { from, size } = this.state;
    const fromNumber = Number(from);
    const sizeNumber = Number(size);
    const { history, commonService } = this.props;
    const queryObject = this.getQueryState(this.state);
    const queryParamsString = queryString.stringify(queryObject);
    history.replace({ ...this.props.location, search: queryParamsString });

    const getIndicesResponse = await commonService.apiCaller<IAlias[]>({
      endpoint: "cat.aliases",
      data: {
        format: "json",
        name: `${queryObject.search}*`,
        s: `${queryObject.sortField}:${queryObject.sortDirection}`,
      },
    });

    if (getIndicesResponse.ok) {
      // group by alias name
      const responseGroupByAliasName: IAlias[] = this.groupResponse(getIndicesResponse.response);
      const totalAliases = responseGroupByAliasName.length;
      const payload = {
        aliases: responseGroupByAliasName.slice(fromNumber * sizeNumber, (fromNumber + 1) * sizeNumber),
        totalAliases,
        selectedItems: this.state.selectedItems
          .map((item) => responseGroupByAliasName.find((remoteItem) => remoteItem.index === item.index))
          .filter((item) => item),
      } as AliasesState;
      this.setState(payload);
    } else {
      this.context.notifications.toasts.addDanger(getIndicesResponse.error);
    }

    // Avoiding flicker by showing/hiding the "Data stream" column only after the results are loaded.
    this.setState({ loading: false });
  };

  onTableChange = ({ page: tablePage, sort }: Criteria<IAlias>): void => {
    const { index: page, size } = tablePage || {};
    const { field: sortField, direction: sortDirection } = sort || {};
    this.setState(
      {
        from: "" + page,
        size: "" + size,
        sortField: sortField || DEFAULT_QUERY_PARAMS.sortField,
        sortDirection: sortDirection as Direction,
      },
      () => this.getAliases()
    );
  };

  onSelectionChange = (selectedItems: IAlias[]): void => {
    this.setState({ selectedItems });
  };

  onSearchChange = ({ query }: { query: { text: string } }): void => {
    this.setState({ from: "0", search: query.text }, () => this.getAliases());
  };

  render() {
    const { totalAliases, from, size, sortField, sortDirection, aliases } = this.state;

    const pagination: Pagination = {
      pageIndex: Number(from),
      pageSize: Number(size),
      pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
      totalItemCount: Number(totalAliases),
    };

    const sorting: EuiTableSortingType<IAlias> = {
      sort: {
        direction: sortDirection,
        field: sortField,
      },
    };

    const selection: EuiTableSelectionType<IAlias> = {
      onSelectionChange: this.onSelectionChange,
    };
    return (
      <ContentPanel
        actions={
          <ContentPanelActions
            actions={[
              {
                text: "",
                children: <AliasesActions selectedItems={this.state.selectedItems} onDelete={this.getAliases} />,
              },
              {
                text: "Create Alias",
                buttonProps: {
                  fill: true,
                  onClick: () => {
                    this.setState({
                      aliasCreateFlyoutVisible: true,
                    });
                  },
                },
              },
            ]}
          />
        }
        bodyStyles={{ padding: "initial" }}
        title="Aliases"
      >
        <IndexControls search={this.state.search} onSearchChange={this.onSearchChange} />
        <EuiHorizontalRule margin="xs" />

        <EuiBasicTable
          columns={[
            {
              field: "alias",
              name: "Alias Name",
              sortable: true,
            },
            {
              field: "indexArray",
              name: "Index Name",
              render: (value: string[]) => {
                return <IndexNameDisplay indices={value} />;
              },
            },
          ]}
          isSelectable={true}
          itemId="alias"
          items={aliases}
          onChange={this.onTableChange}
          pagination={pagination}
          selection={selection}
          sorting={sorting}
          noItemsMessage={
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h4>You have no aliases.</h4>
              <EuiButton
                fill
                color="primary"
                style={{
                  marginTop: 20,
                }}
                onClick={() => {
                  this.setState({
                    aliasCreateFlyoutVisible: true,
                  });
                }}
              >
                Create alias
              </EuiButton>
            </div>
          }
        />
        <CreateAlias
          visible={this.state.aliasCreateFlyoutVisible}
          onSuccess={() => {
            this.getAliases();
            this.setState({ aliasCreateFlyoutVisible: false });
          }}
          onClose={() => this.setState({ aliasCreateFlyoutVisible: false })}
        />
      </ContentPanel>
    );
  }
}

export default function AliasContainer(props: Omit<AliasesProps, "commonService">) {
  const context = useContext(ServicesContext);
  return <Aliases {...props} commonService={context?.commonService as CommonService} />;
}