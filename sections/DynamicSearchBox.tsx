
import type { HTMLWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @title HTMX Script
   * @description The HTMX script to be included in the component
   * @format code
   * @language javascript
   */
  htmxScript?: string;

  /**
   * @title Search Placeholder
   * @description Placeholder text for the search input
   */
  searchPlaceholder?: string;

  /**
   * @title Search Endpoint
   * @description The endpoint for HTMX to interact with for search
   */
  searchEndpoint?: string;

  /**
   * @title Results Container
   * @description HTML content for the initial state of the results container
   */
  resultsContainer?: HTMLWidget;

  /**
   * @title Background Color
   * @description Background color of the component
   * @format color-input
   */
  backgroundColor?: string;
}

export default function DynamicSearchBox({
  htmxScript = "https://unpkg.com/htmx.org@1.9.2",
  searchPlaceholder = "Search...",
  searchEndpoint = "/api/search",
  resultsContainer = "<div>Search results will appear here</div>",
  backgroundColor = "#f0f0f0",
}: Props) {
  return (
    <div style={{ backgroundColor }} className="p-4 rounded-lg">
      <script src={htmxScript}></script>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="input input-bordered w-full"
          hx-post={searchEndpoint}
          hx-trigger="keyup changed delay:500ms"
          hx-target="#search-results"
          hx-indicator="#search-indicator"
        />
        <div id="search-indicator" className="htmx-indicator">
          <div className="loading loading-spinner loading-md"></div>
        </div>
        <div
          id="search-results"
          className="bg-white p-4 rounded-lg shadow"
          dangerouslySetInnerHTML={{ __html: resultsContainer }}
        ></div>
      </div>
    </div>
  );
}