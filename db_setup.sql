-- 1. Alter table
ALTER TABLE user_state 
ADD COLUMN IF NOT EXISTS total_xp INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;

-- 2. RLS: Disable direct insert/update/delete for users
-- Assume standard RLS exists, if not, create it:
ALTER TABLE user_state ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can only read their own state
DROP POLICY IF EXISTS "Users can read own state" ON user_state;
CREATE POLICY "Users can read own state" ON user_state
FOR SELECT USING (auth.uid() = user_id);

-- Policy: Only service_role (via RPC) can update state
DROP POLICY IF EXISTS "Users cannot update state directly" ON user_state;

-- 3. RPC Function (award_xp)
CREATE OR REPLACE FUNCTION award_xp(
  action_type TEXT,
  xp_amount INTEGER
)
RETURNS TABLE (new_total_xp INTEGER, new_level INTEGER) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  uid UUID := auth.uid();
  current_xp INTEGER;
BEGIN
  -- Basic security: check if user exists
  IF NOT EXISTS (SELECT 1 FROM user_state WHERE user_id = uid) THEN
    INSERT INTO user_state (user_id, total_xp, level) VALUES (uid, xp_amount, 1);
  ELSE
    UPDATE user_state
    SET total_xp = total_xp + xp_amount,
        updated_at = NOW()
    WHERE user_id = uid;
  END IF;

  SELECT total_xp, level INTO new_total_xp, new_level FROM user_state WHERE user_id = uid;
  RETURN QUERY SELECT new_total_xp, new_level;
END;
$$;
