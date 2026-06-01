-- Supabase table schema for Listeners waitlist app

-- Waitlist submissions
CREATE TABLE IF NOT EXISTS waitlist (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  country text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Listener applications
CREATE TABLE IF NOT EXISTS listener_applications (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  country text NOT NULL,
  linkedin text,
  motivation text NOT NULL,
  experience text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
