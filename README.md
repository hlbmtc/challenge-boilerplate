# Django Backend Project Setup

This project is a Django application using Poetry for dependency management.

## Prerequisites

- Python 3.12+
- [Poetry >=2.0.0](https://python-poetry.org/docs/#installation)

## Setup Instructions

1. **Clone the repository and navigate into the project directory**

   ```bash
   git clone git@github.com:Metaculus/prism-challenge.git
   cd prism-challenge
   ```

2. **Install dependencies**

   ```bash
   poetry install
   ```

4. **Apply database migrations**

   ```bash
   poetry run python manage.py migrate
   ```

5. **Run the development server**

   ```bash
   poetry run python manage.py runserver
   ```

6. **Access the API**

   Open your browser and go to [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Run tests

```bash
poetry run pytest
```

## Project Structure

- `prism/`: Main Django project configuration
- `questions/`: Django app for handling question-related logic
- `utils/`: reusable utility functions

## Running frontend

1. **Install dependencies**

   ```bash
   npm run i
   ```
   
2. Create `.env` file in `front_end` directory (see `.env.example` for reference)

3. Run the app in dev mode

   ```bash
   npm run dev
   ```
