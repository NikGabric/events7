# Events7 by Nik Gabric

This is a monorepo of a fullstack app using Nestjs for the backend and VueJS 3 for the frontend application.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Environment Variables](#2-environment-variables)
  - [3. Build Docker Images](#3-build-docker-images)
  - [4. Start the Docker Containers](#4-start-the-docker-containers)
- [Usage](#usage)
- [Some Explanations](#some-explanations)

## Overview

Events7 is a Fullstack application for defining and editing events we want to track. This is my solution to the Fullstack Web Developer Expertise Test by Outfit7.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install)
- [Git](https://git-scm.com) (for repo cloning purposes only)

## Getting Started

Here are the step-by-step instructions to pull, build and deploy the application with docker.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/NikGabric/events7
```

```bash
cd ./events7
```

### 2. Set the Environment Variables

Set the environment variables for the backend and frontend apps:

#### Backend:

- Copy the backend .env.example:
  ```bash
  cp ./backend/.env.example ./backend/.env.prod
  ```
- Fill the missing env variables:
  - DB_USER=postgres
  - DB_PASS=postgres
  - DB_NAME=events7
  - TEST_DB_USER=postgres
  - TEST_DB_PASS=postgres
  - TEST_DB_NAME=events7_test
- For docker deploy, change these env variables:
  - DB_HOST=db

#### Frontend:

- Copy the backend .env.example:
  ```bash
  cp ./frontend/.env.example ./frontend/.env
  ```

### 3. Start the Docker Containers

```bash
docker compose up -d --build
```

## Usage

The dashboard app is available at http://localhost:8080

The backend app is awailable at http://localhost:3000

## Some Explanations

For the Event table in the database, I was contemplating putting a unique constraint to the name field, but ultimately decided to leave it, since to my understanding, there might be some events with the same names. For the Event entity I also added some constraints: String lengths (name between 3 and 20 chars, description between 3 and 240 chars), event type enum, and the id of the event is automatically generated.
