#!/bin/bash

# Define inputs
DOOR="video/new project/VID-20260128-WA0008.mp4"
MEETING="video/new project/VID-20260128-WA0006.mp4"
WORK="video/new project/VID-20260128-WA0007.mp4"
LOGO="video/new project/logo.png"
OUTPUT="video/new project/final_edit_pro.mp4"
FONT="/usr/share/fonts/chromeos/noto/NotoSans-Regular.ttf"

# FFmpeg "Pro" Script
# Fixed: Added extra escaping for the complex drawtext expressions to avoid parsing errors.

ffmpeg -y \
-i "$DOOR" \
-i "$MEETING" \
-i "$WORK" \
-i "$LOGO" \
-filter_complex "
    [0:v]trim=0:3.5,setpts=PTS-STARTPTS,
         eq=contrast=1.1:saturation=1.2:brightness=-0.05,
         scale=1920:-2,
         crop=w=1920:h=1080:x=0:y='(1-t/3.5)*(ih-oh)*0.6 + (t/3.5)*(ih-oh)*0.3' [c1];

    [0:v]trim=9:16,setpts=PTS-STARTPTS,
         eq=contrast=1.1:saturation=1.2:brightness=-0.05,
         scale=1920:-2,
         crop=w=1920:h=1080:x=0:y='(ih-oh)/2' [c2];

    [1:v]trim=8:18,setpts=PTS-STARTPTS,
         eq=contrast=1.1:saturation=1.2:brightness=-0.05,
         scale=1920:-2,
         crop=w=1920:h=1080:x=0:y='(ih-oh)*0.3 + (t/10)*(ih-oh)*0.1' [c3];

    [2:v]trim=4:14,setpts=PTS-STARTPTS,
         eq=contrast=1.1:saturation=1.2:brightness=-0.05,
         scale=1920:-2,
         crop=w=1920:h=1080:x=0:y='(ih-oh)/2 - (t/10)*(ih-oh)*0.05' [c4];

    [c1][c2]xfade=transition=fade:duration=0.5:offset=3[x1];
    [x1][c3]xfade=transition=fade:duration=1:offset=9.5[x2];
    [x2][c4]xfade=transition=fade:duration=1:offset=18.5[x3];

    [x3]drawbox=y=ih/2-100:color=black@0.5:width=iw:height=220:t=fill:enable='between(t,0.5,4.5)',
        drawtext=fontfile='$FONT':text='Welcome to Altacit Global':fontcolor=white:fontsize=90:x=(w-text_w)/2:y='(h/2-20)-(min(t-0.5,1)*20)':alpha='min((t-0.5)*2,1)':shadowcolor=black:shadowx=4:shadowy=4:enable='between(t,0.5,4.5)' [txt];

    [3:v]scale=200:-1[logo];
    [txt][logo]overlay=W-w-50:50[final]
" \
-map "[final]" \
-c:v libx264 -pix_fmt yuv420p -preset medium -crf 23 \
"$OUTPUT"