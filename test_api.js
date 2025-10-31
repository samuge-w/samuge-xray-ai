#!/usr/bin/env node
/**
 * Test script to debug API issues
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🧪 Testing API components...');

// Test 1: Check if Python script exists and is executable
const pythonScript = path.join(__dirname, 'api', 'medical_ai_pipeline.py');
console.log('📁 Python script path:', pythonScript);
console.log('📁 Script exists:', fs.existsSync(pythonScript));

// Test 2: Test Python script directly
console.log('\n🐍 Testing Python script...');

const testImagePath = path.join(__dirname, 'test_image.jpg');
// Create a dummy test image
const dummyImage = Buffer.from('dummy image data');
fs.writeFileSync(testImagePath, dummyImage);

const pythonProcess = spawn('python', [
  pythonScript,
  testImagePath,
  'chest',
  '{"name": "Test Patient"}'
]);

let output = '';
let error = '';

pythonProcess.stdout.on('data', (data) => {
  output += data.toString();
});

pythonProcess.stderr.on('data', (data) => {
  error += data.toString();
});

pythonProcess.on('close', (code) => {
  console.log('🐍 Python exit code:', code);
  console.log('📤 Python output:', output);
  console.log('❌ Python error:', error);
  
  // Clean up
  try {
    fs.unlinkSync(testImagePath);
  } catch (e) {
    console.log('Could not delete test image:', e.message);
  }
  
  // Test 3: Check if we can parse the output
  if (output) {
    try {
      const result = JSON.parse(output);
      console.log('✅ JSON parsing successful:', result);
    } catch (parseError) {
      console.log('❌ JSON parsing failed:', parseError.message);
    }
  }
});

// Test 4: Check Python dependencies
console.log('\n📦 Testing Python dependencies...');
const pipProcess = spawn('python', ['-c', 'import sys; print("Python version:", sys.version)']);

pipProcess.stdout.on('data', (data) => {
  console.log('🐍 Python version:', data.toString().trim());
});

pipProcess.stderr.on('data', (data) => {
  console.log('❌ Python error:', data.toString());
});

pipProcess.on('close', (code) => {
  console.log('🐍 Python version check exit code:', code);
});





