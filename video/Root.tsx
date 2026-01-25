import { Composition } from 'remotion';
import { BlueprintPromo } from './BlueprintPromo';
import { PromoRealAI } from './PromoRealAI';
import { TikTokPOV } from './TikTokPOV';
import { TikTokMuted } from './TikTokMuted';
import { VideoGlitch } from './VideoGlitch';
import { InstaCover } from './InstaCover';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InstaCover"
        component={InstaCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="BlueprintPromo"
        component={BlueprintPromo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "CHURN DETECTIVE",
          tagline: "Predict at-risk customers across 500 accounts.",
          category: "Sales Ops"
        }}
      />
      <Composition
        id="PromoRealAI"
        component={PromoRealAI}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TikTokPOV"
        component={TikTokPOV}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TikTokMuted"
        component={TikTokMuted}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VideoGlitch"
        component={VideoGlitch}
        durationInFrames={600} // 20 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
