-- Add indexes for better query performance
-- Run this after creating the initial schema

-- Index on users email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Index on email_verifications for OTP lookups
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON email_verifications(email);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON email_verifications(expires_at);

-- Index on user_profiles for user_id lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Index on user_skills for faster skill matching
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill_id ON user_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill_type ON user_skills(skill_type);

-- Index on skills name for searching
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_user_skills_user_type ON user_skills(user_id, skill_type);

ANALYZE users;
ANALYZE email_verifications;
ANALYZE user_profiles;
ANALYZE skills;
ANALYZE user_skills;
