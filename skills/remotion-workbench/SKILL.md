---
name: remotion-workbench
description: Prepare or integrate the Video Shotcraft browser timeline with an existing Remotion project when editable shots, captions, transitions and audio tracks are requested.
---

# Remotion Workbench integration
Read ../motion-studio/SKILL.md. Bundled Workbench source is ../remotion-shotcraft/assets/vendor/video-shotcraft/workbench/. Read upstream references/workbench.md, workbench/README.md if present, and actual scripts/open.mjs before setup. The library being installed does not mean the active video is integrated.

Inspect the actual manifest contract and module exports in the pinned source; do not invent schema fields. For an authorized project integration, preserve the working composition and implement a separate adapter/version. Derive src/workbench.ts shot, transition, caption and SFX tracks from the same timing data as the rendered composition. Preserve narration offsets, audio duration and screen-space overlays. Expose useful copy, colors and size props with defaults matching the original render. Do not promise every monolithic scene is automatically editable.

Components must render deterministically from frame and props. Account for Sequence-local frames, trim, overlap and freeze behavior. Do not allow visual clip retiming to silently stretch narration or desynchronize Indonesian captions. Validate unchanged import against the original composition with representative frames and moving proof when rendering is authorized. Then verify a copy/color edit, trim behavior, audio sync and export using the installed version's supported operations.

Before running open.mjs inspect its dependency installation, symlinks, output paths and port usage. Use a writable installation copy when needed. Keep service local; report the actual address and process. Do not start a background server, npm installation or project adapter during a skill-only request. Publishing/export to JianYing remains a separate task requiring the relevant request.
