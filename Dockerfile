# Multi-stage build for Node.js + Python MONAI app
FROM node:18-slim

# Install system Python 3 and dependencies (uses existing Python 3.11.2 from base image)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    python3-venv \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Create symlinks for convenience
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Set working directory
WORKDIR /app

# Copy package files and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Create Python virtual environment and install dependencies
COPY api/requirements.txt ./api/
RUN python3 -m venv /app/venv && \
    /app/venv/bin/python -m pip install --upgrade pip && \
    /app/venv/bin/python -m pip install -r api/requirements.txt

# Set environment variables for virtual environment
ENV PATH="/app/venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Copy application code
COPY . .

# Fix permissions for node_modules binaries
RUN chmod +x node_modules/.bin/*

# Build React frontend
RUN npm run build

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"]


