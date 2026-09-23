import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export { ROUTES, NOT_FOUND_META, DEFAULTS } from "./seo/meta";
export { CATEGORIES } from "./data/productos";
export { FAQ } from "./data/faq";
export { SITE, ZONE_LABEL } from "./config/site";

/** HTML de una ruta — lo usa scripts/prerender.mjs en el build. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}
