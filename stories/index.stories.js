import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Form from "./USFSForm";

import { Button, Welcome } from "@storybook/react/demo";

import whatHappenedChapter from "../src/whatHappenedChapter";
import howYouFoundUsChapter from "../src/howYouFoundUsChapter";

storiesOf("Chapter: What happened?", module).add("Page: What happened?", () => {
  const currentLocation = {
    pathname: "/what-happened"
  };

  return (
    <Form
      location={currentLocation}
      chapter={whatHappenedChapter}
      page="whatHappened"
    />
  );
});

storiesOf("Chapter: How you found us", module).add(
  "Page: How you found us",
  () => {
    const currentLocation = {
      pathname: "/how-you-found-us"
    };

    return (
      <Form
        location={currentLocation}
        chapter={howYouFoundUsChapter}
        page="howYouFoundUs"
      />
    );
  }
);
