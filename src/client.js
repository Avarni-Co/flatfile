import { initializeFlatfile } from "@flatfile/javascript";
import api from "@flatfile/api";
import { FlatfileListener } from "@flatfile/listener";
import { recordHook } from "@flatfile/plugin-record-hook";

import { sheetEnergy } from './sheets/sheetEnergy'
import { sheetFuel } from './sheets/sheetFuel'
import { sheetSpend } from './sheets/sheetSpend'
import { sheetTravel } from './sheets/sheetTravel'



const listener = FlatfileListener.create((listener) => {
listener.on("**", (event) => {
  console.log("Event =>", event.topic);
});

// listener.use(
//   recordHook("contacts", (record) => {
//     const firstName = record.get("firstName");
//     console.log({ firstName });
//     record.set("lastName", "Rock");
//     return record;
//   })
// );



listener.on(
  "job:ready",
  { job: "workbook:submitActionFg" },
  async ({ context: { jobId } }) => {
    try {
      await api.jobs.ack(jobId, {
        info: "Getting started.",
        progress: 10,
      });

      // Make changes after cells in a Sheet have been updated
      console.log("Make changes here when an action is clicked");

      await api.jobs.complete(jobId, {
        outcome: {
          acknowledge: true,
          message: "This is now complete.",
          next: {
            type: "wait",
          },
        },
      });
    } catch (error) {
      console.error("Error:", error.stack);

      await api.jobs.fail(jobId, {
        outcome: {
          message: "This job encountered an error.",
        },
      });
    }
  }
);
});




window.openFlatfileEnergy = ({ publishableKey, environmentId }) => {
  if (!publishableKey && !environmentId) {
    throw new Error(
      "You must provide a publishable key and an environment ID - pass through in index.html"
    );
  }

  const workbook = sheetEnergy;

  const flatfileOptions = {
    name: "Embedded Space",
    publishableKey,
    environmentId,
    workbook,
    listener,
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
    sidebarConfig: {
      showSidebar: false,
    },
    themeConfig: {
      root: {
        primaryColor: "red",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
      },
    },
    // Additional props...
  };

  initializeFlatfile(flatfileOptions);
};



window.openFlatfileFuel = ({ publishableKey, environmentId }) => {
  if (!publishableKey && !environmentId) {
    throw new Error(
      "You must provide a publishable key and an environment ID - pass through in index.html"
    );
  }

  const workbook = sheetFuel;

  const flatfileOptions = {
    name: "Embedded Space",
    publishableKey,
    environmentId,
    workbook,
    listener,
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
    sidebarConfig: {
      showSidebar: false,
    },
    themeConfig: {
      root: {
        primaryColor: "red",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
      },
    },
    // Additional props...
  };

  initializeFlatfile(flatfileOptions);
};




window.openFlatfileSpend = ({ publishableKey, environmentId }) => {
  if (!publishableKey && !environmentId) {
    throw new Error(
      "You must provide a publishable key and an environment ID - pass through in index.html"
    );
  }

  const workbook = sheetSpend;

  const flatfileOptions = {
    name: "Embedded Space",
    publishableKey,
    environmentId,
    workbook,
    listener,
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
    sidebarConfig: {
      showSidebar: false,
    },
    themeConfig: {
      root: {
        primaryColor: "red",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
      },
    },
    // Additional props...
  };

  initializeFlatfile(flatfileOptions);
};




window.openFlatfileTravel = ({ publishableKey, environmentId }) => {
  if (!publishableKey && !environmentId) {
    throw new Error(
      "You must provide a publishable key and an environment ID - pass through in index.html"
    );
  }

  const workbook = sheetTravel;

  const flatfileOptions = {
    name: "Embedded Space",
    publishableKey,
    environmentId,
    workbook,
    listener,
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
    sidebarConfig: {
      showSidebar: false,
    },
    themeConfig: {
      root: {
        primaryColor: "red",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
      },
    },
    // Additional props...
  };

  initializeFlatfile(flatfileOptions);
};