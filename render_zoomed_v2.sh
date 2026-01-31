#!/bin/bash

# Define inputs
DOOR="video/new project/VID-20260128-WA0008.mp4"
MEETING="video/new project/VID-20260128-WA0006.mp4"
WORK="video/new project/VID-20260128-WA0007.mp4"
LOGO="video/new project/logo.png"
OUTPUT="video/new project/final_edit_zoomed_fresh.mp4"
FONT="/usr/share/fonts/chromeos/noto/NotoSans-Regular.ttf"

# FFmpeg Command
# Strategy:
# 1. Door Clip Part 1 (The Book/Intro): 0s to 3.5s (Short, familiar intro)
# 2. Door Clip Part 2 (The Entry/Action): 9s to 16s (The "Fresh" frames)
# 3. Meeting Clip: 8s to 18s (Middle section)
# 4. Work Clip: 4s to 14s (Active section)
# 5. All zoomed to fill 1920x1080 (Center crop using correct syntax (iw-ow)/2:(ih-oh)/2)

ffmpeg -y \
-i "$DOOR" \
-i "$MEETING" \
-i "$WORK" \
-i "$LOGO" \
-filter_complex "
    [0:v]trim=0:3.5,setpts=PTS-STARTPTS,scale=1920:-2,crop=1920:1080:(iw-ow)/2:(ih-oh)/2,eq=saturation=1.1[v0a];
    [0:v]trim=9:16,setpts=PTS-STARTPTS,scale=1920:-2,crop=1920:1080:(iw-ow)/2:(ih-oh)/2,eq=saturation=1.1[v0b];
    [1:v]trim=8:18,setpts=PTS-STARTPTS,scale=1920:-2,crop=1920:1080:(iw-ow)/2:(ih-oh)/2,eq=saturation=1.1[v1];
    [2:v]trim=4:14,setpts=PTS-STARTPTS,scale=1920:-2,crop=1920:1080:(iw-ow)/2:(ih-oh)/2,eq=saturation=1.1[v2];

    [v0a][v0b]xfade=transition=fade:duration=0.5:offset=3[x1];
    [x1][v1]xfade=transition=fade:duration=1:offset=9.5[x2];
    [x2][v2]xfade=transition=fade:duration=1:offset=18.5[x3];

    [x3]drawtext=fontfile='$FONT':text='Welcome to Altacit Global':fontcolor=white:fontsize=90:x=(w-text_w)/2:y=(h-text_h)/2:shadowcolor=black:shadowx=4:shadowy=4:enable='between(t,0.5,4)'[txt];

    [3:v]scale=200:-1[logo];
    [txt][logo]overlay=W-w-50:50[final]
" \
-map "[final]" \
-c:v libx264 -pix_fmt yuv420p -preset medium -crf 23 \
"$OUTPUT"