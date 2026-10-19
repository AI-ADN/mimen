#!/usr/bin/env bash
# Encodes source clips in media-src/ into scrub-friendly web videos + posters in public/media/.
# Short GOP (keyframe every 4 frames, no B-frames) keeps scroll-driven seeking smooth.
# Usage: scripts/encode-media.sh            (all clips)
#        scripts/encode-media.sh running    (one clip)
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=media-src
OUT=public/media
mkdir -p "$OUT"

X264=(-c:v libx264 -preset slow -pix_fmt yuv420p -g 4 -keyint_min 4 -bf 0 -sc_threshold 0 -an -movflags +faststart)

# Sources are 1912×1080 with the athlete in the right third; mobile keeps a 4:5 crop around the athlete.
# name | mobile crop | desktop crf | mobile crf | start second (empty = 0) | seconds to keep (empty = to the end)
# swimming: before 3.1 s the swimmer turns her face up out of the water to breathe.
CLIPS=(
  "running|crop=864:1080:1000:0|24|25||"
  "cycling|crop=864:1080:940:0|24|25||"
  "swimming|crop=864:1080:1000:0|29|30|3.1|"
  "gym|crop=864:1080:1040:0|24|25||"
)

for entry in "${CLIPS[@]}"; do
  IFS='|' read -r name mobile crf_d crf_m start keep <<<"$entry"
  if [[ $# -gt 0 && "$1" != "$name" ]]; then continue; fi
  echo "→ $name"
  trim=()
  [[ -n "$start" ]] && trim+=(-ss "$start")
  [[ -n "$keep" ]] && trim+=(-t "$keep")
  ffmpeg -v error -y -i "$SRC/$name.mp4" ${trim[@]+"${trim[@]}"} -vf "scale=1600:900:flags=lanczos" "${X264[@]}" -crf "$crf_d" "$OUT/$name.mp4"
  ffmpeg -v error -y -i "$SRC/$name.mp4" ${trim[@]+"${trim[@]}"} -vf "$mobile,scale=720:900:flags=lanczos" "${X264[@]}" -crf "$crf_m" "$OUT/$name-m.mp4"
  for v in "$OUT/$name.mp4" "$OUT/$name-m.mp4"; do
    ffmpeg -v error -y -i "$v" -frames:v 1 -q:v 4 "${v%.mp4}.jpg"
  done
done

ls -la "$OUT"
