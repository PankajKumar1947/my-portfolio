/** ============================================================
 * Site Configuration — SEO and Metadata
 * ============================================================
 * This file pulls data from ./config/site.json and adds dynamic
 * values like the production URL.
 * ============================================================
 */

import { env } from "./env";
import { identity } from "./identity";
import siteData from "../data/site.json";

export const siteConfig = {
  /** Production URL (no trailing slash). Used for canonical URLs, OG, sitemap. */
  url: env.NEXT_PUBLIC_SITE_URL,

  /** Site name shown in metadata and Open Graph (pulls from identity.json) */
  name: `${identity.name} | Full Stack Developer`,

  /** All other static configuration from site.json */
  ...siteData,
};
