#!/bin/bash

echo "🚀 Setting up BlockLearn Environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created!"
else
    echo "📝 .env file already exists"
fi

echo ""
echo "⚙️  Please update your .env file with the following:"
echo "   - DB_PASSWORD: Set your PostgreSQL password"
echo "   - JWT_SECRET: Generate a secure secret key"
echo "   - OPENAI_API_KEY: Add your OpenAI API key (optional for basic features)"
echo ""
echo "📋 Required Setup Steps:"
echo "   1. Install and start PostgreSQL"
echo "   2. Create database: 'skill_swap_db'"
echo "   3. Run the schema: psql -d skill_swap_db -f models/schema.sql"
echo "   4. Update .env with correct database credentials"
echo ""
echo "🎯 Quick Start Commands:"
echo "   npm run dev          # Start backend with auto-reload"
echo "   npm run build        # Build for production"
echo ""
echo "🔧 Database Setup:"
echo "   sudo systemctl start postgresql    # Start PostgreSQL"
echo "   createdb skill_swap_db             # Create database"
echo "   psql -d skill_swap_db -f models/schema.sql  # Run schema"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:5000/api"
echo ""
echo "✅ Setup complete! Check the steps above and start developing!"
