/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplyPolicyModal from "./DeleteAliasModal";
import { httpClientMock } from "../../../../../test/mocks";

describe("<DeleteAliasModal /> spec", () => {
  it("renders the component", async () => {
    httpClientMock.post = jest.fn().mockResolvedValue({ ok: true, response: { policies: [{ policy: "some_policy", id: "some_id" }] } });
    render(<ApplyPolicyModal selectedItems={[]} visible onConfirm={() => {}} onClose={() => {}} />);

    expect(document.body.children).toMatchSnapshot();
  });

  it("Delete button should be disabled unless a 'delete' was input", async () => {
    const { getByPlaceholderText } = render(<ApplyPolicyModal selectedItems={[]} visible onConfirm={() => {}} onClose={() => {}} />);
    expect(document.querySelector(".euiButton--danger")).toHaveAttribute("disabled");
    userEvent.type(getByPlaceholderText("delete"), "delete");
    expect(document.querySelector(".euiButton--danger")).not.toHaveAttribute("disabled");
  });
});