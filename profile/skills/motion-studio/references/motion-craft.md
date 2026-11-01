# World, camera and action

Read ../../../CREATIVE-BRIEF.md for the current contract. Build a master world per location/time with persistent scene clocks across many camera beats. Position actors, landmarks and props in coherent world coordinates; overlays remain screen-space. More depth than a purely flat stage is preferred, while keeping flat character identity.

Carry actual camera position/zoom across beat boundaries, including drift or unfinished interpolation. Guard empty beat lists, timeline gaps and end-of-timeline behavior; do not fall back to the first beat at an uncovered frame. Use composition width/height for viewport center. Keep focal point and action continuity across intentional cuts; scene changes follow story.

Kamera kira-kira 70% bereaksi/30% mengamati sebagai arahan, bukan quota. Pan, whip-pan, tracking, zoom, close-up, slide/mask and parallax are optional storytelling tools. Choose easing/spring per action, not one mandatory spring preset. Ambient motion can run continuously in scene time where appropriate; purposeful holds are allowed. Do not replace repeated static scenes with repeated decorative loops.

Use anticipation and clear reactions. Inspect hand grip, footsteps, anatomical joints, layers and carried-prop transforms. Preserve time of day and scene state. Reuse components, not completed scene choreography for subsequent events. Even repeated events need a different visualization.

Subtitles are left-only (top/middle/bottom), left aligned and screen-space, placed around important objects without reserving a permanent blank left column. Keep legible phrases and restrained emphasis. Review transition boundaries in moving proofs and sample actual final export frames; preserve proven CPU/frame-ready rendering until alternatives pass checks.
