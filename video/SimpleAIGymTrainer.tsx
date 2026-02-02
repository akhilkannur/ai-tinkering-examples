import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { AIAudioEffects } from './AIAudioEffects';

// Simplified paper receipt component
const SimpleReceipt: React.FC<{
	text: string;
	price: string;
	frame: number;
	index: number;
}> = ({ text, price, frame, index }) => {
	const receiptFrame = frame - index * 5;
	const opacity = interpolate(receiptFrame, [0, 15], [0, 1]);
	const translateY = interpolate(receiptFrame, [0, 30], [-100, 100]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: `${20 + index * 15}%`,
				left: `${30 + (index % 3) * 15}%`,
				width: 180,
				padding: '8px',
				background: '#F0F0F0',
				border: '1px solid #888',
				transform: `translateY(${translateY}px) rotate(${Math.sin(index) * 3}deg)`,
				opacity,
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
			}}
		>
			<div style={{ fontFamily: 'sans-serif', fontSize: 14, fontWeight: 'bold' }}>{text}</div>
			<div style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#D32F2F' }}>{price}</div>
		</div>
	);
};

// Simplified logo component
const SimpleLogo: React.FC<{
	logoName: string;
	frame: number;
	index: number;
}> = ({ logoName, frame, index }) => {
	const logoFrame = frame - index * 10;
	const opacity = interpolate(Math.max(0, logoFrame), [0, 20], [0, 1]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: `${30 + index * 15}%`,
				left: `${40 - index * 5}%`,
				width: 120,
				height: 120,
				background: '#E0E0E0',
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
			}}
		>
			<span style={{ fontFamily: 'sans-serif', fontSize: 20, fontWeight: 'bold' }}>{logoName}</span>
		</div>
	);
};

// Simplified dollar bill component
const SimpleBill: React.FC<{
	frame: number;
	index: number;
}> = ({ frame, index }) => {
	const billFrame = frame - 20 - index * 5;
	const opacity = interpolate(Math.max(0, billFrame), [0, 15], [0, 1]);
	const translateY = interpolate(Math.max(0, billFrame), [0, 20], [200, -50]);
	
	return (
		<div
			style={{
				position: 'absolute',
				bottom: `${10 + index * 5}%`,
				left: `${30 + index * 10}%`,
				width: 50,
				height: 25,
				background: '#4CAF50',
				border: '1px solid #2E7D32',
				borderRadius: 3,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				transform: `translateY(${translateY}px)`,
				opacity,
				boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
			}}
		>
			<span style={{ fontFamily: 'sans-serif', fontSize: 14, fontWeight: 'bold', color: 'white' }}>${20}</span>
		</div>
	);
};

// Simplified stamp component
const SimpleStamp: React.FC<{
	frame: number;
	showFrame: number;
}> = ({ frame, showFrame }) => {
	const stampFrame = frame - showFrame;
	const opacity = interpolate(Math.max(0, stampFrame), [0, 15], [0, 1]);
	const scale = interpolate(Math.max(0, stampFrame), [0, 15], [0, 1]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: '40%',
				left: '50%',
				transform: `translate(-50%, -50%) scale(${scale})`,
				width: 160,
				height: 160,
				border: '6px solid #D32F2F',
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				background: 'rgba(211, 47, 47, 0.1)',
			}}
		>
			<span style={{ 
				fontFamily: 'Impact, sans-serif', 
				fontSize: 20, 
				color: '#D32F2F', 
				fontWeight: 'bold',
				textAlign: 'center'
			}}>
				SHIPPED
			</span>
		</div>
	);
};

// Simplified Build Club patch component
const SimplePatch: React.FC<{
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
				width: 200,
				height: 200,
				background: 'linear-gradient(135deg, #1a1a1a, #333)',
				border: '6px solid #FFD700',
				borderRadius: '50%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
			}}
		>
			<div style={{ 
				fontFamily: 'Impact, sans-serif', 
				fontSize: 24, 
				color: '#FFD700', 
				fontWeight: 'bold',
				marginBottom: 8,
				textAlign: 'center'
			}}>
				BUILD
			</div>
			<div style={{ 
				fontFamily: 'Impact, sans-serif', 
				fontSize: 24, 
				color: '#FFD700', 
				fontWeight: 'bold',
				textAlign: 'center'
			}}>
				CLUB
			</div>
		</div>
	);
};

export const SimpleAIGymTrainer: React.FC = () => {
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
			{/* Scene 1: The Donation */}
			{scene1Active && (
				<>
					{/* Thermal receipts */}
					<SimpleReceipt text="OpenAI API" price="-$50" frame={scene1Frame} index={0} />
					<SimpleReceipt text="Claude Code" price="-$20" frame={scene1Frame} index={1} />
					<SimpleReceipt text="Moltbot" price="-$20" frame={scene1Frame} index={2} />
					
					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							top: '10%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: 'Impact, sans-serif',
							fontSize: 40,
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
					<SimpleLogo logoName="OpenAI" frame={scene2Frame} index={0} />
					<SimpleLogo logoName="Claude" frame={scene2Frame} index={1} />
					
					<SimpleBill frame={scene2Frame} index={0} />
					<SimpleBill frame={scene2Frame} index={1} />
					<SimpleBill frame={scene2Frame} index={2} />
					
					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							top: '10%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: 'sans-serif',
							fontSize: 32,
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
							width: 60,
							height: 20,
							background: '#FFD700',
							border: '2px solid #DAA520',
							borderRadius: 10,
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
							width: 80,
							height: 100,
							background: 'white',
							border: '2px solid #888',
							borderRadius: 8,
							padding: 8,
							boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
							opacity: interpolate(Math.max(0, scene3Frame - 20), [0, 20], [0, 1]),
						}}
					>
						<div style={{ 
							height: 15, 
							background: '#888', 
							marginBottom: 8,
							borderRadius: 2 
						}} />
						<div style={{ 
							height: 12, 
							background: '#DDD', 
							margin: 4,
							borderRadius: 1 
						}} />
						<div style={{ 
							height: 12, 
							background: '#DDD', 
							margin: 4,
							borderRadius: 1 
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
								fontFamily: 'sans-serif',
								fontSize: 28,
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
					<SimpleStamp frame={scene3Frame} showFrame={50} />
					
					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							bottom: '20%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: 'Impact, sans-serif',
							fontSize: 40,
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
					
					<SimplePatch frame={frame} />
					
					{/* Overlay text */}
					<div
						style={{
							position: 'absolute',
							top: '20%',
							left: '50%',
							transform: 'translateX(-50%)',
							fontFamily: 'Impact, sans-serif',
							fontSize: 36,
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
							fontFamily: 'Impact, sans-serif',
							fontSize: 48,
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