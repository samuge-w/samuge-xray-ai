# Multi-stage build for Node.js + Python MONAI app
FROM node:18-slim

# Install Python 3.12 and system dependencies
RUN apt-get update && apt-get install -y \
    python3.12 \
    python3.12-pip \
    python3.12-dev \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Create symlinks for python and pip
RUN ln -s /usr/bin/python3.12 /usr/bin/python && \
    ln -s /usr/bin/python3.12 /usr/bin/python3

# Set working directory
WORKDIR /app

# Copy package files and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy Python requirements and install Python dependencies
COPY api/requirements.txt ./api/
RUN pip install --upgrade pip && \
    pip install -r api/requirements.txt

# Copy application code
COPY . .

# Build React frontend
RUN npm run build

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"]

