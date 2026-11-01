# Hermes runtime and library maintenance
Runtime root: /Users/mac/Documents/Codex/2026-10-02/referenced-chatgpt-conversation-this-is-an/hermes-local
Node: runtime/node-26.7.0-darwin-arm64/bin/node under that root. FFmpeg: runtime/ffmpeg-9.0.1-darwin-arm64/ffmpeg. Inspect availability; use project-local locked dependencies. Do not run multiple renderers writing the same bundle.
Hermes profile: data/profiles/motion-studio under that root. Do not modify other profiles or global credentials.
The pinned upstream repository lives in remotion-shotcraft/assets/vendor/video-shotcraft relative to the profile skills directory. Read SOURCE.json in remotion-shotcraft for the exact commit. Preserve Apache-2.0 LICENSE and upstream notices when copying source. Music, SFX, example assets and Remotion have separate license terms; code licensing does not grant rights to all media.
No npm installation, Workbench launch, video generation or audio generation is part of skill installation. For later dependency installation inspect package scripts and compatibility first; preserve the project lockfile deliberately. Do not silently update the pinned upstream. Back up custom guides before future updates.
Historical shot-plan-v5.md remains available for history. It is not a required template or active-version declaration.

## Approved V12 rendering on this Mac
Use project scripts/render-v12.mjs and chrome-cpu-render.sh as the proven baseline. CPU raster/compositing, concurrency1, SVG remount and frame-ready wait addressed intermittent missing elements. SwiftShader/ANGLE produced strip artifacts. Retain these settings when deriving a new version until a faster alternative passes moving-frame checks. Update version-specific tests with the actual new source and output; do not claim old QA covers new work. See approved-v12.md for evidence and script names.
