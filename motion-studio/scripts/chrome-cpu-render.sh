#!/bin/sh
# Force CPU rasterization/compositing for stable frame captures on this Mac.
exec '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --disable-gpu --disable-gpu-rasterization --disable-gpu-compositing "$@"
