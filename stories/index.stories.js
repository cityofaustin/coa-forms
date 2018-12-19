import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Form from "./USFSForm";

import { Button, Welcome } from "@storybook/react/demo";

import whatHappenedChapter from "../src/whatHappenedChapter";
import shareEvidenceChapter from "../src/shareEvidenceChapter";
import officerDetailsChapter from "../src/officerDetailsChapter";
import witnessDetailsChapter from "../src/witnessDetailsChapter";
import aboutYouChapter from "../src/aboutYouChapter";
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

storiesOf("Chapter: Share Evidence", module).add("Page: Share Evidence", () => {
  const currentLocation = {
    pathname: "/share-evidence"
  };

  return (
    <Form
      location={currentLocation}
      chapter={shareEvidenceChapter}
      page="shareEvidence"
    />
  );
});

storiesOf("Chapter: Officer Details", module).add(
  "Page: Officer Details",
  () => {
    const currentLocation = {
      pathname: "/officer-details"
    };

    return (
      <Form
        location={currentLocation}
        chapter={officerDetailsChapter}
        page="officerDetails"
      />
    );
  }
);

storiesOf("Chapter: Witness Details", module).add(
  "Page: Witness Details",
  () => {
    const currentLocation = {
      pathname: "/witness-details"
    };

    return (
      <Form
        location={currentLocation}
        chapter={witnessDetailsChapter}
        page="witnessDetails"
      />
    );
  }
);

storiesOf("Chapter: About you", module).add("Page: About you", () => {
  const currentLocation = {
    pathname: "/about-you"
  };

  return (
    <Form
      location={currentLocation}
      chapter={aboutYouChapter}
      page="aboutYou"
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
