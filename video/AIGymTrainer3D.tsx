import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Canvas } from '@react-three/fiber';
import { Text3D, Environment, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/web';
import { useMotion } from '@remotion/motion';
import { AIAudioEffects } from './AIAudioEffects';

// 3D Paper receipt component
const PaperReceipt3D: React.FC<{
	text: string;
	price: string;
	frame: number;
	index: number;
}> = ({ text, price, frame, index }) => {
	const receiptFrame = frame - index * 5;
	const positionY = interpolate(receiptFrame, [0, 30], [-100, 100]);
	const rotationZ = Math.sin(index) * 5;
	
	return (
		<mesh position={[index * 2 - 3, positionY / 50, 0]} rotation={[0, 0, rotationZ * Math.PI / 180]}>
			<boxGeometry args={[3, 1.5, 0.1]} />
			<meshStandardMaterial color="#F0F0F0" />
			<Text3D
				font="/fonts/helvetiker_regular.typeface.json" // This would need to be added to public/fonts/
				scale={0.2}
				position={[0, 0.3, 0.06]}
			>
				{text}
				<meshStandardMaterial color="#000" />
			</Text3D>
			<Text3D
				font="/fonts/helvetiker_regular.typeface.json"
				scale={0.15}
				position={[0, -0.2, 0.06]}
			>
				{price}
				<meshStandardMaterial color="#D32F2F" />
			</Text3D>
		</mesh>
	);
};

// 3D Logo component for sleeping giants scene
const SleepingLogo3D: React.FC<{
	logoName: string;
	frame: number;
	index: number;
}> = ({ logoName, frame, index }) => {
	const logoFrame = frame - index * 10;
	const opacity = interpolate(Math.max(0, logoFrame), [0, 20], [0, 1]);
	const scale = interpolate(Math.max(0, logoFrame), [0, 20], [0.5, 1]);
	
	return (
		<mesh position={[index * 4 - 2, 0, 0]} scale={[scale, scale, scale]}>
			<sphereGeometry args={[1.5, 32, 32]} />
			<meshStandardMaterial color="#E0E0E0" />
			<Text3D
				font="/fonts/helvetiker_regular.typeface.json"
				scale={0.4}
				position={[0, 0, 0.8]}
			>
				{logoName}
				<meshStandardMaterial color="#000" />
			</Text3D>
			
			{/* Sleep bubble */}
			{opacity > 0.5 && (
				<mesh position={[0, -1.8, 0]}>
					<cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
					<meshStandardMaterial color="#FFFFFF" />
					<Text3D
						font="/fonts/helvetiker_regular.typeface.json"
						scale={0.2}
						position={[0, 0, 0.2]}
					>
						Zzz...
						<meshStandardMaterial color="#000" />
					</Text3D>
				</mesh>
			)}
		</mesh>
	);
};

// 3D Dollar bill component
const DollarBill3D: React.FC<{
	frame: number;
	index: number;
}> = ({ frame, index }) => {
	const billFrame = frame - 20 - index * 5;
	const positionY = interpolate(Math.max(0, billFrame), [0, 20], [3, -1]);
	const rotationZ = interpolate(Math.max(0, billFrame), [0, 20], [0, -10]);
	
	return (
		<mesh 
			position={[index * 2 - 4, positionY, 0]} 
			rotation={[0, 0, rotationZ * Math.PI / 180]}
		>
			<boxGeometry args={[1, 0.5, 0.05]} />
			<meshStandardMaterial color="#4CAF50" />
			<Text3D
				font="/fonts/helvetiker_regular.typeface.json"
				scale={0.2}
				position={[0, 0, 0.03]}
			>
				${20}
				<meshStandardMaterial color="#FFFFFF" />
			</Text3D>
		</mesh>
	);
};

// 3D Stamp component
const Stamp3D: React.FC<{
	frame: number;
	showFrame: number;
}> = ({ frame, showFrame }) => {
	const stampFrame = frame - showFrame;
	const opacity = interpolate(Math.max(0, stampFrame), [0, 15], [0, 1]);
	const scale = interpolate(Math.max(0, stampFrame), [0, 15], [0, 1]);
	const rotation = interpolate(Math.max(0, stampFrame), [0, 15], [15, 0]);
	
	return (
		<mesh 
			position={[0, 0, 0]} 
			rotation={[0, 0, rotation * Math.PI / 180]}
			scale={[scale, scale, scale]}
		>
			<cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
			<meshStandardMaterial color="#D32F2F" />
			<Text3D
				font="/fonts/helvetiker_regular.typeface.json"
				scale={0.3}
				position={[0, 0, 0.11]}
			>
				SHIPPED
				<meshStandardMaterial color="#FFFFFF" />
			</Text3D>
		</mesh>
	);
};

// 3D Build Club patch component
const BuildClubPatch3D: React.FC<{
	frame: number;
}> = ({ frame }) => {
	const patchFrame = frame - 54; // Start at 18s (54 frames at 30fps)
	const opacity = interpolate(Math.max(0, patchFrame), [0, 30], [0, 1]);
	const scale = interpolate(Math.max(0, patchFrame), [0, 30], [0, 1]);
	
	return (
		<mesh 
			position={[0, 0, 0]} 
			scale={[scale, scale, scale]}
		>
			<dodecahedronGeometry args={[1.5, 0]} />
			<meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
			<Text3D
				font="/fonts/helvetiker_regular.typeface.json"
				scale={0.4}
				position={[0, 0.5, 1.6]}
			>
				BUILD
				<meshStandardMaterial color="#FFD700" />
			</Text3D>
			<Text3D
				font="/fonts/helvetiker_regular.typeface.json"
				scale={0.4}
				position={[0, -0.5, 1.6]}
			>
				CLUB
				<meshStandardMaterial color="#FFD700" />
			</Text3D>
		</mesh>
	);
};

// Animated 3D Scene component
const AIGymTrainerScene3D: React.FC<{
	frame: number;
	scene: number;
}> = ({ frame, scene }) => {
	const { fps } = useVideoConfig();
	
	// Scene timing (based on 30fps)
	const scene1End = 150; // 5s
	const scene2Start = 150; // 5s
	const scene2End = 300; // 10s
	const scene3Start = 300; // 10s
	const scene3End = 540; // 18s
	const scene4Start = 540; // 18s
	
	// Calculate effective frame for each scene
	const scene1Frame = frame;
	const scene2Frame = frame - scene2Start;
	const scene3Frame = frame - scene3Start;
	const scene4Frame = frame - scene4Start;
	
	return (
		<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} intensity={1} />
			<pointLight position={[-10, -10, -10]} intensity={0.5} />
			
			{/* Scene 1: The Donation (0-5s) */}
			{frame < scene1End && (
				<>
					<PaperReceipt3D text="OpenAI API" price="-$50" frame={scene1Frame} index={0} />
					<PaperReceipt3D text="Claude Code" price="-$20" frame={scene1Frame} index={1} />
					<PaperReceipt3D text="Moltbot" price="-$20" frame={scene1Frame} index={2} />
				</>
			)}
			
			{/* Scene 2: The Sleeping Giants (5-10s) */}
			{(frame >= scene2Start && frame < scene2End) && (
				<>
					<SleepingLogo3D logoName="OpenAI" frame={scene2Frame} index={0} />
					<SleepingLogo3D logoName="Claude" frame={scene2Frame} index={1} />
					
					<DollarBill3D frame={scene2Frame} index={0} />
					<DollarBill3D frame={scene2Frame} index={1} />
					<DollarBill3D frame={scene2Frame} index={2} />
				</>
			)}
			
			{/* Scene 3: The Coach (10-18s) */}
			{(frame >= scene3Start && frame < scene3End) && (
				<>
					{/* Coach's whistle */}
					<mesh position={[-3, 2, 0]} rotation={[0, 0, Math.sin(scene3Frame * 0.2) * 5 * Math.PI / 180]}>
						<boxGeometry args={[0.8, 0.3, 0.1]} />
						<meshStandardMaterial color="#FFD700" />
					</mesh>
					
					{/* Clipboard */}
					<mesh position={[3, 1, 0]}>
						<boxGeometry args={[1, 1.4, 0.1]} />
						<meshStandardMaterial color="#FFFFFF" />
						<mesh position={[0, 0.5, 0.06]}>
							<boxGeometry args={[0.8, 0.1, 0.01]} />
							<meshStandardMaterial color="#888" />
						</mesh>
						<mesh position={[0, 0.2, 0.06]}>
							<boxGeometry args={[0.7, 0.08, 0.01]} />
							<meshStandardMaterial color="#DDD" />
						</mesh>
						<mesh position={[0, -0.1, 0.06]}>
							<boxGeometry args={[0.7, 0.08, 0.01]} />
							<meshStandardMaterial color="#DDD" />
						</mesh>
					</mesh>
					
					{/* Cross over "WATCH TUTORIAL" */}
					{scene3Frame > 30 && (
						<mesh position={[0, -1, 0]}>
							<planeGeometry args={[2, 0.5]} />
							<meshStandardMaterial color="#D32F2F" transparent opacity={interpolate(Math.max(0, scene3Frame - 30), [0, 20], [0, 1])} />
							<Text3D
								font="/fonts/helvetiker_regular.typeface.json"
								scale={0.3}
								position={[0, 0, 0.01]}
							>
								WATCH TUTORIAL
								<meshStandardMaterial color="#FFFFFF" />
							</Text3D>
						</mesh>
					)}
					
					{/* Stamp */}
					<Stamp3D frame={scene3Frame} showFrame={50} />
				</>
			)}
			
			{/* Scene 4: The Outro (18-25s) */}
			{(frame >= scene4Start) && (
				<>
					<BuildClubPatch3D frame={frame} />
				</>
			)}
			
			<Environment preset="city" />
		</Canvas>
	);
};

// 2D Overlay Text Component
const OverlayText: React.FC<{
	text: string;
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
	fontSize?: number;
	color?: string;
	frame?: number;
	startFrame?: number;
}> = ({ 
	text, 
	top, 
	bottom, 
	left = '50%', 
	right, 
	fontSize = 36, 
	color = '#FFFFFF', 
	frame = 0,
	startFrame = 0
}) => {
	const opacity = frame >= startFrame ? interpolate(Math.max(0, frame - startFrame), [0, 20], [0, 1]) : 1;
	
	const style: React.CSSProperties = {
		position: 'absolute',
		fontFamily: `'Impact', 'Arial Black', sans-serif`,
		fontSize,
		color,
		fontWeight: 'bold',
		textAlign: 'center',
		textShadow: '2px 2px 0 #000',
		opacity,
		transform: 'translateX(-50%)',
		...(top && { top }),
		...(bottom && { bottom }),
		...(left && { left }),
		...(right && { right }),
	};
	
	return <div style={style}>{text}</div>;
};

export const AIGymTrainer3D: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Scene timing (based on 30fps)
	const scene1End = 150; // 5s
	const scene2Start = 150; // 5s
	const scene2End = 300; // 10s
	const scene3Start = 300; // 10s
	const scene3End = 540; // 18s
	const scene4Start = 540; // 18s

	// Scene 1: The Donation (0-5s)
	const scene1Active = frame < scene1End;
	
	// Scene 2: The Sleeping Giants (5-10s)
	const scene2Active = frame >= scene2Start && frame < scene2End;
	
	// Scene 3: The Coach (10-18s)
	const scene3Active = frame >= scene3Start && frame < scene3End;
	
	// Scene 4: The Outro (18-25s)
	const scene4Active = frame >= scene4Start;

	// Calculate effective frame for each scene
	const scene1Frame = frame;
	const scene2Frame = frame - scene2Start;
	const scene3Frame = frame - scene3Start;
	const scene4Frame = frame - scene4Start;

	return (
		<AbsoluteFill style={{ backgroundColor: '#F5F5DC' }}>
			<AIGymTrainerScene3D frame={frame} scene={1} />

			{/* Scene 1 Overlay */}
			{scene1Active && (
				<OverlayText
					text="CONGRATULATIONS. YOU ARE A DONOR."
					top="10%"
					color="#D32F2F"
					fontSize={40}
				/>
			)}

			{/* Scene 2 Overlay */}
			{scene2Active && (
				<OverlayText
					text="FEEDING THE BEAST... FOR NOTHING?"
					top="10%"
					color="#555"
					fontSize={32}
				/>
			)}

			{/* Scene 3 Overlay */}
			{scene3Active && (
				<OverlayText
					text="WE FORCE YOU TO SHIP."
					bottom="20%"
					color="#1976D2"
					fontSize={48}
					frame={scene3Frame}
					startFrame={70}
				/>
			)}

			{/* Scene 4 Overlays */}
			{scene4Active && (
				<>
					<OverlayText
						text="THE BUILD CLUB. EARN YOUR STRIPES."
						top="20%"
						color="#FFD700"
						fontSize={40}
					/>
					<OverlayText
						text="GET TO WORK."
						bottom="20%"
						color="#FFD700"
						fontSize={56}
					/>
				</>
			)}

			{/* Audio Effects */}
			<AIAudioEffects frame={frame} />
		</AbsoluteFill>
	);
};