// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $GuestSearch from "./islands/GuestSearch.tsx";
import * as $HeaderNav from "./islands/HeaderNav.tsx";
import * as $HeroSidedIsland from "./islands/HeroSidedIsland.tsx";
import * as $InfoItems from "./islands/InfoItems.tsx";
import * as $Modal from "./islands/Modal.tsx";
import * as $PixModal from "./islands/PixModal.tsx";
import * as $RegressiveCountIsland from "./islands/RegressiveCountIsland.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
  },
  islands: {
    "./islands/GuestSearch.tsx": $GuestSearch,
    "./islands/HeaderNav.tsx": $HeaderNav,
    "./islands/HeroSidedIsland.tsx": $HeroSidedIsland,
    "./islands/InfoItems.tsx": $InfoItems,
    "./islands/Modal.tsx": $Modal,
    "./islands/PixModal.tsx": $PixModal,
    "./islands/RegressiveCountIsland.tsx": $RegressiveCountIsland,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
