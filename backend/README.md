---
title: NavAI Guard Backend
emoji: 🚢
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
app_port: 7860
---

# Nav-AI Guard Backend

This repository is configured to deploy the **Nav-AI Guard Backend** to Hugging Face Spaces using Docker.

## Configuration

*   **SDK**: Docker
*   **App Port**: 7860
*   **Docker Path**: This repo contains the `Dockerfile` in the `backend/` directory.

## How to Deploy

1.  **Create a Space**: Select **Docker** SDK.
2.  **Connect Repo**: Point to this repository.
3.  **Context**: Ensure the Space build context is set to the `backend/` subdirectory if possible, OR if syncing only the backend folder, this `README.md` at the root will auto-configure it.
