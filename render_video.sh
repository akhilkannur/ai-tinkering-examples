#!/bin/bash

# Define inputs
DOOR="video/new project/VID-20260128-WA0008.mp4"
MEETING="video/new project/VID-20260128-WA0006.mp4"
WORK="video/new project/VID-20260128-WA0007.mp4"
LOGO="video/new project/logo.png"
OUTPUT="video/new project/final_edit_option1.mp4"
FONT="/usr/share/fonts/chromeos/noto/NotoSans-Regular.ttf"

# FFmpeg Command
# 1. Process each video: Split -> [Background (Blur + Darken)] + [Foreground (Scale + Brighten)] -> Overlay
# 2. Trim clips to desired lengths: Door (6s), Meeting (12s), Work (12s)
# 3. Apply Xfade transitions
# 4. Add Text
# 5. Add Logo

ffmpeg -y \
-i "$DOOR" \
-i "$MEETING" \
-i "$WORK" \
-i "$LOGO" \
-filter_complex "
    [0:v]split=2[bg0][fg0];
    [bg0]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=luma_radius=40:luma_power=2,eq=brightness=-0.2[bg0_blur];
    [fg0]scale=-1:1080,eq=brightness=0.05[fg0_clean];
    [bg0_blur][fg0_clean]overlay=(W-w)/2:(H-h)/2,trim=0:6,setpts=PTS-STARTPTS[v0];

    [1:v]split=2[bg1][fg1];
    [bg1]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=luma_radius=40:luma_power=2,eq=brightness=-0.2[bg1_blur];
    [fg1]scale=-1:1080,eq=brightness=0.05[fg1_clean];
    [bg1_blur][fg1_clean]overlay=(W-w)/2:(H-h)/2,trim=0:12,setpts=PTS-STARTPTS[v1];

    [2:v]split=2[bg2][fg2];
    [bg2]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=luma_radius=40:luma_power=2,eq=brightness=-0.2[bg2_blur];
    [fg2]scale=-1:1080,eq=brightness=0.05[fg2_clean];
    [bg2_blur][fg2_clean]overlay=(W-w)/2:(H-h)/2,trim=0:12,setpts=PTS-STARTPTS[v2];

    [v0][v1]xfade=transition=fade:duration=1:offset=5[x1];
    [x1][v2]xfade=transition=fade:duration=1:offset=16[x2];

    [x2]drawtext=fontfile='$FONT':text='Welcome to Altacit Global':fontcolor=white:fontsize=90:x=(w-text_w)/2:y=(h-text_h)/2:shadowcolor=black:shadowx=4:shadowy=4:enable='between(t,1,5)'[txt];

    [3:v]scale=200:-1[logo];
    [txt][logo]overlay=W-w-50:50[final]
" \
-map "[final]" \
-c:v libx264 -pix_fmt yuv420p -preset medium -crf 23 \
"$OUTPUT"
