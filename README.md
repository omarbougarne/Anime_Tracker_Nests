🛠️ Tech Stack
Backend: NestJS (TypeScript)
Database: MongoDB
Frontend: React
Containerization: Docker
Development Tools: pnpm, ESLint, Prettier
🚀 Getting Started
Prerequisites
Docker
Node.js (v16+)
pnpm
Setup with Docker (Recommended)
This project is configured to run entirely in Docker containers, making setup quick and consistent:

```bash
# Clone the repository
git clone https://github.com/yourusername/Anime_Tracker-nestJS-reactJS-.git
cd Anime_Tracker-nestJS-reactJS-

# Start development environment
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.dev.yml logs -f
```

Manual Setup

```bash
# Install dependencies
pnpm install

# Create .env file
echo "MongoDB_URI=mongodb://localhost:27017/anime_tracker" > .env

# Start MongoDB (if installed locally)
# Then start the application
pnpm run start:dev
```


📊 Features
User authentication and profiles
Anime tracking and watchlists
Rating and review system
Recommendations based on watch history
Search and filter functionality

🗂️ Project Structure
```bash
/
├── src/                      # Backend source code
│   ├── user/                 # User module
│   ├── anime/                # Anime module (planned)
│   └── common/               # Shared utilities and types
├── client/                   # Frontend React application (planned)
├── docker-compose.yml        # Production Docker configuration
├── docker-compose.dev.yml    # Development Docker configuration
└── Dockerfile                # Backend Docker configuration
```
```bash
# Start development environment
docker compose -f docker-compose.dev.yml up -d

# Stop development environment
docker compose -f docker-compose.dev.yml down

# Run tests
pnpm run test

# Lint code
pnpm run lint
```

🚢 Deployment
Production Docker Deployment
```bash
# Build and start production containers
docker compose up -d

# View production logs
docker compose logs -f
```

👤 Author
Omar Bougarne - [My Profile](https://github.com/omarbougarne)