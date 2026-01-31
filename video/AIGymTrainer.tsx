import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random, interpolate, Audio } from 'remotion';
import { Interpolate, interpolateOpacityByFrame } from 'remotion';
import { AIAudioEffects } from './AIAudioEffects';

// Using system fonts instead of Google Fonts to avoid import issues
const impactFont = `'Impact', 'Arial Black', sans-serif`;
const interFont = `'Inter', 'Helvetica Neue', 'Arial', sans-serif`;

// Paper texture background component
const PaperTexture: React.FC<{ opacity?: number }> = ({ opacity = 0.1 }) => {
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: `
					radial-gradient(circle at 10px 10px, rgba(0,0,0,0.05) 1px, transparent 1px),
					radial-gradient(circle at 20px 20px, rgba(0,0,0,0.03) 1px, transparent 1px)
				`,
				backgroundSize: '30px 30px',
				opacity,
			}}
		/>
	);
};

// Thermal receipt component
const ThermalReceipt: React.FC<{
	text: string;
	price: string;
	frame: number;
	index: number;
}> = ({ text, price, frame, index }) => {
	const receiptFrame = frame - index * 5; // Stagger the receipts
	const opacity = interpolate(receiptFrame, [0, 15], [0, 1]);
	const translateY = interpolate(receiptFrame, [0, 30], [-100, 100]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: `${20 + index * 15}%`,
				left: `${30 + (index % 3) * 15}%`,
				width: 200,
				padding: '10px',
				background: '#F0F0F0',
				border: '2px dashed #888',
				transform: `translateY(${translateY}px) rotate(${Math.sin(index) * 5}deg)`,
				opacity,
				boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
			}}
		>
			<div style={{ fontFamily: interFont, fontSize: 16, fontWeight: 'bold' }}>{text}</div>
			<div style={{ fontFamily: interFont, fontSize: 14, color: '#D32F2F' }}>{price}</div>
		</div>
	);
};

// Logo component for sleeping giants scene
const SleepingLogo: React.FC<{
	logoName: string;
	frame: number;
	index: number;
}> = ({ logoName, frame, index }) => {
	const logoFrame = frame - index * 10;
	const opacity = interpolate(Math.max(0, logoFrame), [0, 20], [0, 1]);
	const scale = interpolate(Math.max(0, logoFrame), [0, 20], [0.5, 1]);
	const sleepOpacity = interpolate(Math.max(0, logoFrame - 10), [0, 20], [0, 1]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: `${30 + index * 15}%`,
				left: `${40 - index * 5}%`,
				width: 150,
				height: 150,
				background: '#E0E0E0',
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				transform: `scale(${scale})`,
				opacity,
				boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
			}}
		>
			<span style={{ fontFamily: interFont, fontSize: 24, fontWeight: 'bold' }}>{logoName}</span>
			
			{/* Sleep bubble */}
			{sleepOpacity > 0 && (
				<div
					style={{
						position: 'absolute',
						bottom: -30,
						background: 'rgba(255,255,255,0.8)',
						borderRadius: '20px',
						padding: '5px 10px',
						fontSize: 16,
						opacity: sleepOpacity,
					}}
				>
					Zzz...
				</div>
			)}
		</div>
	);
};

// Dollar bill component
const DollarBill: React.FC<{
	frame: number;
	index: number;
}> = ({ frame, index }) => {
	const billFrame = frame - 20 - index * 5;
	const opacity = interpolate(Math.max(0, billFrame), [0, 15], [0, 1]);
	const translateY = interpolate(Math.max(0, billFrame), [0, 20], [200, -50]);
	const rotate = interpolate(Math.max(0, billFrame), [0, 20], [0, -10]);
	
	return (
		<div
			style={{
				position: 'absolute',
				bottom: `${10 + index * 5}%`,
				left: `${30 + index * 10}%`,
				width: 60,
				height: 30,
				background: '#4CAF50',
				border: '2px solid #2E7D32',
				borderRadius: 5,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
				opacity,
				boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
			}}
		>
			<span style={{ fontFamily: interFont, fontSize: 16, fontWeight: 'bold', color: 'white' }}>${20}</span>
		</div>
	);
};

// Stamp component
const Stamp: React.FC<{
	frame: number;
	showFrame: number;
}> = ({ frame, showFrame }) => {
	const stampFrame = frame - showFrame;
	const opacity = interpolate(Math.max(0, stampFrame), [0, 15], [0, 1]);
	const scale = interpolate(Math.max(0, stampFrame), [0, 15], [0, 1]);
	const rotate = interpolate(Math.max(0, stampFrame), [0, 15], [15, 0]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: '40%',
				left: '50%',
				transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
				width: 200,
				height: 200,
				border: '8px solid #D32F2F',
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				background: 'rgba(211, 47, 47, 0.1)',
			}}
		>
			<span style={{ 
				fontFamily: impactFont, 
				fontSize: 24, 
				color: '#D32F2F', 
				fontWeight: 'bold',
				transform: 'rotate(-10deg)',
				textAlign: 'center'
			}}>
				SHIPPED
			</span>
		</div>
	);
};

// Build Club patch component
const BuildClubPatch: React.FC<{
	frame: number;
}> = ({ frame }) => {
	const patchFrame = frame - 54; // Start at 18s (54 frames at 30fps)
	const opacity = interpolate(Math.max(0, patchFrame), [0, 30], [0, 1]);
	const scale = interpolate(Math.max(0, patchFrame), [0, 30], [0, 1]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: `translate(-50%, -50%) scale(${scale})`,
				width: 250,
				height: 250,
				background: 'linear-gradient(135deg, #1a1a1a, #333)',
				border: '8px solid #FFD700',
				borderRadius: '50%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
			}}
		>
			<div style={{ 
				fontFamily: impactFont, 
				fontSize: 28, 
				color: '#FFD700', 
				fontWeight: 'bold',
				marginBottom: 10,
				textAlign: 'center'
			}}>
				BUILD
			</div>
			<div style={{ 
				fontFamily: impactFont, 
				fontSize: 28, 
				color: '#FFD700', 
				fontWeight: 'bold',
				textAlign: 'center'
			}}>
				CLUB
			</div>
		</div>
	);
};

export const AIGymTrainer: React.FC = () => {
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
		<AbsoluteFill style={{ backgroundColor: '#F5F5DC' }}> {/* Off-white paper-like background */}
			<PaperTexture opacity={0.15} />

			{/* Scene 1: The Donation */}
			{scene1Active && (
				<>
					{/* Thermal receipts */}
					<ThermalReceipt text="OpenAI API" price="-$50" frame={scene1Frame} index={0} />
					<ThermalReceipt text="Claude Code" price="-$20" frame={scene1Frame} index={1} />
					<ThermalReceipt text="Clawdbot" price="-$20" frame={scene1Frame} index={2} />

					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							top: '10%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: impactFont,
							fontSize: 48,
							color: '#D32F2F',
							fontWeight: 'bold',
							textAlign: 'center',
							textShadow: '2px 2px 0 #000',
							zIndex: 10,
						}}
					>
						CONGRATULATIONS. YOU ARE A DONOR.
					</div>
				</>
			)}

			{/* Scene 2: The Sleeping Giants */}
			{scene2Active && (
				<>
					<SleepingLogo logoName="OpenAI" frame={scene2Frame} index={0} />
					<SleepingLogo logoName="Claude" frame={scene2Frame} index={1} />

					<DollarBill frame={scene2Frame} index={0} />
					<DollarBill frame={scene2Frame} index={1} />
					<DollarBill frame={scene2Frame} index={2} />

					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							top: '10%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: interFont,
							fontSize: 36,
							color: '#555',
							fontWeight: 'bold',
							textAlign: 'center',
							zIndex: 10,
						}}
					>
						FEEDING THE BEAST... FOR NOTHING?
					</div>
				</>
			)}

			{/* Scene 3: The Coach */}
			{scene3Active && (
				<>
					{/* Coach's whistle */}
					<div
						style={{
							position: 'absolute',
							top: '20%',
							left: '15%',
							width: 80,
							height: 30,
							background: '#FFD700',
							border: '3px solid #DAA520',
							borderRadius: 15,
							transform: `rotate(${Math.sin(scene3Frame * 0.2) * 5}deg)`,
							opacity: interpolate(Math.max(0, scene3Frame - 10), [0, 20], [0, 1]),
						}}
					/>

					{/* Clipboard */}
					<div
						style={{
							position: 'absolute',
							top: '30%',
							right: '15%',
							width: 100,
							height: 140,
							background: 'white',
							border: '3px solid #888',
							borderRadius: 10,
							padding: 10,
							boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
							opacity: interpolate(Math.max(0, scene3Frame - 20), [0, 20], [0, 1]),
						}}
					>
						<div style={{
							height: 20,
							background: '#888',
							marginBottom: 10,
							borderRadius: 3
						}} />
						<div style={{
							height: 15,
							background: '#DDD',
							margin: 5,
							borderRadius: 2
						}} />
						<div style={{
							height: 15,
							background: '#DDD',
							margin: 5,
							borderRadius: 2
						}} />
					</div>

					{/* Cross over "WATCH TUTORIAL" */}
					{scene3Frame > 30 && (
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								fontFamily: interFont,
								fontSize: 32,
								color: '#D32F2F',
								fontWeight: 'bold',
								textAlign: 'center',
								textDecoration: 'line-through',
								opacity: interpolate(Math.max(0, scene3Frame - 30), [0, 20], [0, 1]),
							}}
						>
							WATCH TUTORIAL
						</div>
					)}

					{/* Stamp */}
					<Stamp frame={scene3Frame} showFrame={50} />

					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							bottom: '20%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: impactFont,
							fontSize: 48,
							color: '#1976D2',
							fontWeight: 'bold',
							textAlign: 'center',
							textShadow: '2px 2px 0 #000',
							opacity: interpolate(Math.max(0, scene3Frame - 70), [0, 20], [0, 1]),
						}}
					>
						WE FORCE YOU TO SHIP.
					</div>
				</>
			)}

			{/* Scene 4: The Outro */}
			{scene4Active && (
				<>
					{/* Dark denim/bomber jacket texture */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: 'linear-gradient(45deg, #2c3e50, #34495e, #2c3e50)',
							opacity: 0.9,
						}}
					/>

					<BuildClubPatch frame={frame} />

					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							top: '20%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: impactFont,
							fontSize: 40,
							color: '#FFD700',
							fontWeight: 'bold',
							textAlign: 'center',
							textShadow: '2px 2px 0 #000',
						}}
					>
						THE BUILD CLUB. EARN YOUR STRIPES.
					</div>

					{/* Call to Action */}
					<div
						style={{
							position: 'absolute',
							bottom: '20%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: impactFont,
							fontSize: 56,
							color: '#FFD700',
							fontWeight: 'bold',
							textAlign: 'center',
							textShadow: '3px 3px 0 #000',
						}}
					>
						GET TO WORK.
					</div>
				</>
			)}

			{/* Audio Effects */}
			<AIAudioEffects frame={frame} />
		</AbsoluteFill>
	);
};