# Multi-stage build for Node.js + Python MONAI app
FROM node:18-slim

# Install system Python 3 and dependencies (uses existing Python 3.11.2 from base image)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
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

# Copy Python requirements and install Python dependencies
COPY api/requirements.txt ./api/
RUN python3 -m pip install --upgrade pip && \
    python3 -m pip install -r api/requirements.txt

# Copy application code
COPY . .

# Build React frontend
RUN npm run build

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"]


