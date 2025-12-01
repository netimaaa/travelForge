#!/usr/bin/env node

/**
 * Simple script to test API endpoints
 * Usage: node test-api.js
 */

const BASE_URL = process.env.API_URL || 'http://localhost:5000'

const endpoints = [
  '/api/health',
  '/api/cities',
  '/api/currencies',
]

async function testEndpoint(url) {
  try {
    const response = await fetch(`${BASE_URL}${url}`)
    let data
    try {
      data = await response.json()
    } catch (jsonError) {
      const text = await response.text()
      data = { text }
    }
    
    console.log(`\n✅ ${url}`)
    console.log(`   Status: ${response.status}`)
    console.log(`   Response:`, JSON.stringify(data, null, 2).substring(0, 200))
    return { success: true, status: response.status, data }
  } catch (error) {
    console.log(`\n❌ ${url}`)
    console.log(`   Error:`, error.message)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  console.log(`Testing API endpoints at ${BASE_URL}\n`)
  console.log('='.repeat(50))
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint)
    await new Promise(resolve => setTimeout(resolve, 500)) // Small delay between requests
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('Tests completed!')
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.error('Error: fetch is not available. Please use Node.js 18+ or install node-fetch')
  process.exit(1)
}

runTests().catch(console.error)

