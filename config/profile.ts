/** ============================================================
 * Profile Information — Component Configuration
 * ============================================================
 * This file pulls data from identity.ts and organizes it for 
 * use in frontend components (Hero, Profile, Contact).
 * ============================================================
 */

import { identity } from "./identity";

export const profile = {
  /** Root identity data */
  ...identity,
  
  /** Profile picture path */
  profileImage: identity.profileImage,

  /** Profile text for logo */
  logoText: identity.logoText,

  /** One-liner tagline */
  tagline: identity.tagline,

  /** Short bio for hero section */
  bio: identity.bio,

  /** Job title for JSON-LD structured data */
  jobTitle: identity.jobTitle,
};
