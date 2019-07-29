import React from "react";
import { raceBlocks, genderBlocks } from "../../../schemaBlocks";

import PhoneNumberWidget from "@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget";
import PhoneNumberReviewWidget from "@cityofaustin/us-forms-system/lib/js/review/PhoneNumberWidget";
import { phoneConfig } from "@cityofaustin/us-forms-system/lib/js/definitions/phone";

// we need to override this for labels, but need to make deep copys hence the JSON stuff
let yourRace = JSON.parse(JSON.stringify(raceBlocks.ui));
let yourGender = JSON.parse(JSON.stringify(genderBlocks.ui));

yourRace.race["ui:title"] = "Your race (Optional)";
yourGender.gender["ui:title"] = "Your gender (Optional)";

const demographicInfoChapter = {
  title: "Demographic information",
  pages: {
    demographicInfo: {
      path: "demographic-information",
      title: "Demographic information",
      schema: {
        type: "object",
        properties: {
          "view:infoObject": {
            type: "object",
            properties: {}
          },
          ...genderBlocks.schema,
          ...raceBlocks.schema,
          zipCode: {
            type: "number"
          }
        }
      },
      uiSchema: {
        "ui:title": "Demographic information",
        "view:infoObject": {
          "ui:description": () => (
            <div className="usa-alert  usa-alert-info">
              <div className="usa-alert-body">
                <p className="usa-alert-text">
                  This information helps us recognize trends across the City
                  that lead to policy and training recommendations.
                </p>
              </div>
            </div>
          )
        },
        ...yourGender,
        ...yourRace,
        zipCode: {
          "ui:title": "Your zip code (Optional)",
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        }
      }
    }
  }
};

export default demographicInfoChapter;
