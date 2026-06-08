import requests
import time
import json
import sys

API_KEY = "key_6a1806ca5fbd85d7af334c5e905b8b16aa9f0389d89f2b0e54f1067ae35e73b67c36b880e8563c76e58f56d87d6209497a4f33e97b8cc04bbb41af74b9c20284"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "X-Runway-Version": "2024-11-06",
    "Content-Type": "application/json"
}

def generate_video(prompt):
    url = "https://api.dev.runwayml.com/v1/text_to_video"
    payload = {
        "model": "gen4.5",
        "promptText": prompt,
        "ratio": "1280:720",
        "duration": 5
    }
    
    response = requests.post(url, headers=HEADERS, json=payload)
    if response.status_code not in [200, 201]:
        print(f"Error starting task: {response.status_code}")
        print(response.text)
        return None
    
    task_id = response.json().get("id")
    print(f"Task started. ID: {task_id}")
    return task_id

def poll_task(task_id):
    url = f"https://api.dev.runwayml.com/v1/tasks/{task_id}"
    while True:
        response = requests.get(url, headers=HEADERS)
        if response.status_code != 200:
            print(f"Error polling task: {response.status_code}")
            return None
        
        data = response.json()
        status = data.get("status")
        print(f"Status: {status}")
        
        if status == "SUCCEEDED":
            return data.get("output")[0]
        elif status == "FAILED":
            print(f"Task failed: {data.get('failure')}")
            return None
        
        time.sleep(10)

if __name__ == "__main__":
    prompt = "Cinematic, minimalist home office with a single high-end laptop on a clean wooden desk. A steaming cup of coffee next to it. Soft natural sunlight streaming from a large window. Highly realistic, photorealistic, 4k, no text, no sci-fi elements."
    task_id = generate_video(prompt)
    if task_id:
        video_url = poll_task(task_id)
        if video_url:
            print(f"\nSUCCESS! Video URL: {video_url}")
