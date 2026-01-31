import { Composition } from 'remotion';
import { StyleKinetic } from './modern-previews/StyleKinetic';
import { StyleRhythmic } from './modern-previews/StyleRhythmic';
import { StyleCollage } from './modern-previews/StyleCollage';
import { StyleFluid } from './modern-previews/StyleFluid';
import { AIGymTrainer } from './AIGymTrainer';
import { AIGymTrainer3D } from './AIGymTrainer3D';
import { SimpleAIGymTrainer } from './SimpleAIGymTrainer';
import { ToolGraveyard } from './ToolGraveyard';
import { ToolGraveyardV2 } from './ToolGraveyardV2';
import { ToolGraveyardCinematic } from './ToolGraveyardCinematic';
import { ToolGraveyardRhythmic } from './ToolGraveyardRhythmic';
import { AIGymTrainerWes } from './AIGymTrainerWes';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AIGymTrainerWes"
        component={AIGymTrainerWes}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ToolGraveyardRhythmic"
        component={ToolGraveyardRhythmic}
        durationInFrames={520}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ToolGraveyardCinematic"
        component={ToolGraveyardCinematic}
        durationInFrames={670}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ToolGraveyardV2"
        component={ToolGraveyardV2}
        durationInFrames={430}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ToolGraveyard"
        component={ToolGraveyard}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StyleKinetic"
        component={StyleKinetic}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StyleRhythmic"
        component={StyleRhythmic}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StyleCollage"
        component={StyleCollage}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StyleFluid"
        component={StyleFluid}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AIGymTrainer"
        component={AIGymTrainer}
        durationInFrames={750} // 25 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AIGymTrainer3D"
        component={AIGymTrainer3D}
        durationInFrames={750} // 25 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SimpleAIGymTrainer"
        component={SimpleAIGymTrainer}
        durationInFrames={750} // 25 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
