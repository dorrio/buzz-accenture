/**
 * Feature flags for the Accenture Connect fork.
 */

/**
 * Hosted communities (Builderlab).
 *
 * Builderlab (`https://app.builderlab.xyz`) is Block's account and
 * relay-hosting service. An Accenture Connect deployment does not host its
 * communities on Block infrastructure, so the hosted-community onboarding and
 * the "Hosted communities" settings panel are hidden. Users can still connect
 * to their own relay (Join / reconnect flows) — only the Builderlab-backed
 * hosting path is gated off.
 *
 * Flip to `true` to restore the Builderlab flow. Backend lives in
 * `desktop/src-tauri/src/builderlab.rs`.
 */
export const HOSTED_COMMUNITIES_ENABLED = false;
