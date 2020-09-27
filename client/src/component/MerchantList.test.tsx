import { render } from "@testing-library/react";
import React from "react";
import { createMerchant } from "../../test/factory/Merchant";
import { MerchantList } from "./MerchantList";

describe("MerchantList", () => {
  test("No result found text is shown if list is empty", () => {
    const { getByText } = render(
      <MerchantList merchants={[]} onDelete={jest.fn} onEdit={jest.fn} />
    );
    expect(getByText("No Results Found")).toBeInTheDocument();
  });

  test("No result found text is not shown if list is not empty", () => {
    const { queryByText } = render(
      <MerchantList
        merchants={[createMerchant()]}
        onDelete={jest.fn}
        onEdit={jest.fn}
      />
    );
    expect(queryByText("No Results Found")).toBeNull();
  });

  test("number of rows is the number of merchants", () => {
    const { getAllByTestId } = render(
      <MerchantList
        merchants={[createMerchant(), createMerchant()]}
        onDelete={jest.fn}
        onEdit={jest.fn}
      />
    );
    expect(getAllByTestId("merchant-list-item")).toHaveLength(2);
  });
});
