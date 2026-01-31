import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/JosefinSans';
import { AIAudioEffects } from './AIAudioEffects';

const { fontFamily } = loadFont();

// Colors: Muted, cinematic palette
const PALETTE = {
	bg: '#FDF498', // Muted Yellow
	text: '#4A2C2A', // Dark Brown
	red: '#C0392B', // Brick Red (Wes style)
	blue: '#3B4E59', // Slate Blue (Wes style)
	paper: '#FFFDE7', // Light Paper
	green: '#88A096', // Sage Green (Wes style)
};

// Title cards for chapter transitions
const TitleCard: React.FC<{ text: string; subtext?: string; opacity: number }> = ({ text, subtext, opacity }) => (
	<div
		style={{
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			opacity,
			backgroundColor: PALETTE.bg,
			zIndex: 100,
		}}
	>
		<div style={{
			border: `4px double ${PALETTE.text}`,
			padding: '40px 80px',
			textAlign: 'center',
			backgroundColor: 'rgba(255,255,255,0.5)',
		}}>
			<h1 style={{ fontFamily, fontSize: 60, color: PALETTE.text, margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>
				{text}
			</h1>
			{subtext && (
				<p style={{ fontFamily, fontSize: 32, color: PALETTE.red, margin: '20px 0 0', fontStyle: 'italic' }}>
					({subtext})
				</p>
			)}
		</div>
	</div>
);

// Receipt component for Part I
const Receipt: React.FC<{ text: string; amount: string; index: number; frame: number }> = ({ text, amount, index, frame }) => {
	const opacity = interpolate(frame - index * 20, [0, 10], [0, 1]);
	const translateY = interpolate(frame - index * 20, [0, 10], [50, 0]);

	return (
		<div
			style={{
				position: 'absolute',
				top: '40%',
				left: `${20 + index * 30}%`, 
				transform: `translate(-50%, -50%) translateY(${translateY}px)`,
				width: 250,
				height: 350,
				backgroundColor: '#fff',
				border: '1px solid #ccc',
				boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: 20,
				opacity,
				fontFamily,
			}}
		>
			<div style={{ width: '100%', borderBottom: '2px dashed #000', paddingBottom: 10, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' }}>
				RECEIPT #{1000 + index}
			</div>
			<div style={{ fontSize: 24, marginBottom: 10 }}>{text}</div>
			<div style={{ fontSize: 48, color: PALETTE.red, fontWeight: 'bold' }}>{amount}</div>
			<div style={{ marginTop: 'auto', fontSize: 12, color: '#888' }}>THANK YOU</div>
		</div>
	);
};

// Sleeping Giants for Part II
const SleepingGiant: React.FC<{ name: string; side: 'left' | 'right'; frame: number }> = ({ name, side, frame }) => {
	const opacity = interpolate(frame, [0, 15], [0, 1]);
	const scale = interpolate(frame, [0, 15], [0.8, 1]);

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				[side]: '15%',
				transform: `translate(0, -50%) scale(${scale})`,
				width: 300,
				height: 300,
				borderRadius: '50%',
				backgroundColor: side === 'left' ? '#E1F5FE' : '#F3E5F5',
				border: `4px solid ${PALETTE.text}`,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				opacity,
				zIndex: 1,
			}}
		>
			<div style={{ fontSize: 80 }}>🗿</div>
			<div style={{ fontFamily, fontSize: 32, fontWeight: 'bold', marginTop: 10 }}>{name}</div>
			<div style={{ position: 'absolute', top: -40, right: 0, fontSize: 40, opacity: Math.sin(frame / 10) }}>Zzz</div>
		</div>
	);
};

// Floating money for Part II
const MoneyStack: React.FC<{ frame: number }> = ({ frame }) => {
	const x = interpolate(frame, [0, 100], [400, 680], { extrapolateRight: 'clamp' });
	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: x,
				transform: 'translate(-50%, -50%)',
				fontSize: 60,
				zIndex: 2,
			}}
		>
			💸
		</div>
	);
};

// Drill sergeant whistle for Part III
const Whistle: React.FC<{ frame: number }> = ({ frame }) => {
	const y = interpolate(frame, [0, 20], [-200, 100], { extrapolateRight: 'clamp' });
	return (
		<div
			style={{
				position: 'absolute',
				top: y,
				left: '50%',
				transform: 'translateX(-50%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<div style={{ width: 4, height: 100, backgroundColor: PALETTE.text }} />
			<div style={{ fontSize: 80 }}>⚡️</div>
		</div>
	);
};

// Clipboard for Part III
const Clipboard: React.FC<{ frame: number }> = ({ frame }) => {
	const y = interpolate(frame, [20, 40], [1200, 600], { extrapolateRight: 'clamp' });
	return (
		<div
			style={{
				position: 'absolute',
				top: y,
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 500,
				height: 600,
				backgroundColor: '#8D6E63',
				borderRadius: 20,
				border: `4px solid ${PALETTE.text}`,
				display: 'flex',
				justifyContent: 'center',
				padding: 20,
			}}
		>
			<div style={{ width: '90%', height: '90%', backgroundColor: '#FFF', marginTop: 60, borderRadius: 5, padding: 30, fontFamily }}>
				<h2 style={{ textAlign: 'center', borderBottom: '2px solid #000' }}>ACTION PLAN</h2>
				<ul style={{ listStyle: 'none', padding: 0, fontSize: 28, lineHeight: 2 }}>
					<li style={{ textDecoration: 'line-through', color: '#888' }}>Watch Tutorials</li>
					<li style={{ textDecoration: 'line-through', color: '#888' }}>Read Docs</li>
					<li style={{ color: PALETTE.red, fontWeight: 'bold' }}>SHIP PROJECT</li>
				</ul>
			</div>
			<div style={{ position: 'absolute', top: -20, width: 200, height: 80, backgroundColor: 'silver', borderRadius: 10, border: '2px solid #555' }} />
		</div>
	);
};

// Stamp for Part III
const StampMark: React.FC<{ frame: number }> = ({ frame }) => {
	const scale = interpolate(frame, [0, 5], [2, 1], { extrapolateRight: 'clamp' });
	const opacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });
	
	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: `translate(-50%, -50%) scale(${scale}) rotate(-15deg)`,
				border: `10px solid ${PALETTE.red}`,
				borderRadius: 20,
				padding: '20px 60px',
				color: PALETTE.red,
				fontFamily,
				fontSize: 80,
				fontWeight: 'bold',
				opacity,
				zIndex: 50,
				backgroundColor: 'rgba(211, 47, 47, 0.1)',
			}}
		>
			SHIPPED
		</div>
	);
};

// The Contract / Membership Agreement for the Build Club (Scene 4)
const Contract: React.FC<{ frame: number }> = ({ frame }) => {
	const opacity = interpolate(frame, [0, 20], [0, 1]);
	const scale = interpolate(frame, [0, 20], [0.9, 1]);
	
	return (
		<div
			style={{
				position: 'absolute',
				top: '45%',
				left: '50%',
				transform: `translate(-50%, -50%) scale(${scale})`,
				width: 700,
				height: 900,
				backgroundColor: PALETTE.paper,
				border: `2px solid ${PALETTE.text}`,
				boxShadow: '20px 20px 0 rgba(0,0,0,0.1)',
				display: 'flex',
				flexDirection: 'column',
				padding: 60,
				fontFamily,
				opacity,
				zIndex: 10,
			}}
		>
			<div style={{ textAlign: 'center', borderBottom: `2px solid ${PALETTE.text}`, paddingBottom: 20, marginBottom: 40 }}>
				<h2 style={{ fontSize: 48, margin: 0, letterSpacing: 4 }}>MEMBERSHIP AGREEMENT</h2>
			</div>
			
			<div style={{ fontSize: 28, lineHeight: 1.6, color: PALETTE.text }}>
				<p>1. Participant agrees to ship one AI project per week.</p>
				<p>2. Weekly updates are mandatory.</p>
				<p style={{ color: PALETTE.red, fontWeight: 'bold', fontSize: 32, marginTop: 40 }}>
					3. MISS TWO WEEKS OF UPDATES = IMMEDIATE REMOVAL
				</p>
			</div>

			<div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
				<div>
					<div style={{ fontSize: 20, borderBottom: '1px solid #000', width: 250, marginBottom: 5 }}></div>
					<div style={{ fontSize: 16 }}>PARTICIPANT SIGNATURE</div>
				</div>
				<div style={{ textAlign: 'right' }}>
					<div style={{ fontSize: 48, fontWeight: 'bold' }}>$29/MO</div>
					<div style={{ fontSize: 16 }}>BETA ACCESS</div>
				</div>
			</div>
		</div>
	);
};

// Main Composition
export const AIGymTrainerWes: React.FC = () => {
	const frame = useCurrentFrame();

	// Timeline logic
	const opacity1 = interpolate(frame, [0, 10, 25, 30], [0, 1, 1, 0]); // Part I Title
	const opacity2 = interpolate(frame, [150, 160, 175, 180], [0, 1, 1, 0]); // Part II Title
	const opacity3 = interpolate(frame, [330, 340, 355, 360], [0, 1, 1, 0]); // Part III Title

	return (
		<AbsoluteFill style={{ backgroundColor: PALETTE.bg }}>
			{/* Film Grain Texture */}
			<div style={{
				position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', zIndex: 999,
				backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
			}} />

			{/* Chapter Headings */}
			{frame < 35 && <TitleCard text="Part I" subtext="The Donor" opacity={opacity1} />}
			{frame > 145 && frame < 185 && <TitleCard text="Part II" subtext="The Sleeping Giants" opacity={opacity2} />}
			{frame > 325 && frame < 365 && <TitleCard text="Part III" subtext="The Remedy" opacity={opacity3} />}

			{/* Scene 1: Financial Waste */}
			{frame >= 30 && frame < 150 && (
				<>
					<Receipt text="OpenAI API" amount="-$50.00" index={0} frame={frame - 30} />
					<Receipt text="Claude Code" amount="-$20.00" index={1} frame={frame - 30} />
					<Receipt text="Vercel" amount="-$20.00" index={2} frame={frame - 30} />
					<div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', fontFamily, fontSize: 40, color: PALETTE.text }}>
						"CONGRATULATIONS, YOU ARE A DONOR."
					</div>
				</>
			)}

			{/* Scene 2: Feeding the Beast */}
			{frame >= 180 && frame < 330 && (
				<>
					<SleepingGiant name="OpenAI" side="left" frame={frame - 180} />
					<SleepingGiant name="Claude" side="right" frame={frame - 180} />
					<MoneyStack frame={frame - 180} />
					<div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', fontFamily, fontSize: 40, color: PALETTE.text }}>
						"FEEDING THE BEAST."
					</div>
				</>
			)}

			{/* Scene 3: Accountability Intervention */}
			{frame >= 360 && frame < 510 && (
				<>
					<Whistle frame={frame - 360} />
					<Clipboard frame={frame - 360} />
					{frame - 360 > 60 && <StampMark frame={frame - 360 - 60} />}
					<div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', fontFamily, fontSize: 40, color: PALETTE.text }}>
						"WE FORCE YOU TO SHIP."
					</div>
				</>
			)}

			{/* Scene 4: The Build Club Membership Agreement */}
			{frame >= 510 && (
				<AbsoluteFill style={{ backgroundColor: PALETTE.blue }}>
					<Contract frame={frame - 510} />
					<div style={{ position: 'absolute', bottom: 70, width: '100%', textAlign: 'center', fontFamily, fontSize: 48, color: '#FFF', fontWeight: 'bold' }}>
						START SHIPPING AT
					</div>
					<div style={{ position: 'absolute', bottom: 40, width: '100%', textAlign: 'center', fontFamily, fontSize: 24, color: '#FFF', opacity: 0.8 }}>
						realaiexamples.com/build-club
					</div>
				</AbsoluteFill>
			)}

			<AIAudioEffects frame={frame} />
		</AbsoluteFill>
	);
};