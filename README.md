## Installation
npm install

# Development
npm run start:dev

# Production
docker-compose build
docker-compose up -d

## Test
npm run test


API:

GET - http://13.201.69.55:8000/users

POST - http://13.201.69.55:8000/users
Body:
{
    "email": "suresh@gmail.com"
}