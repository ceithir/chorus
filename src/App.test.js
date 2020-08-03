import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";
import "./i18n";
import userEvent from "@testing-library/user-event";

test("it handles translation well", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Good morning/)).toBeInTheDocument();
  expect(document.title).toBe("Chorus");

  userEvent.click(getByText("FR"));
  expect(getByText(/Bonjour/)).toBeInTheDocument();
  expect(document.title).toBe("Fanfare");
});
