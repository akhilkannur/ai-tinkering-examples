#!/bin/bash
echo "Rendering Wes Anderson Style AIGymTrainer..."
cd video && npx remotion render index.tsx AIGymTrainerWes out/AIGymTrainerWes.mp4 --gl=angle
