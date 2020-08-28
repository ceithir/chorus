import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";
import i18n from "../../i18n";
import { CETO } from "../../characters";

test("it lists some interesting facts", () => {
  i18n.changeLanguage("fr");

  const { getByText } = render(<Profile character={CETO} />);

  expect(getByText(/Venin/)).toBeInTheDocument();
});
