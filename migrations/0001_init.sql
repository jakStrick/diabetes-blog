-- Schema for The Daily Count blog: posts and comments

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  published_at TEXT NOT NULL, -- ISO date (YYYY-MM-DD), formatted for display in the app layer
  mood_label TEXT NOT NULL,
  mood_rating INTEGER NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL, -- JSON array of paragraph strings
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_posts_published_at ON posts(published_at);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL REFERENCES posts(id),
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_comments_post_id ON comments(post_id);

-- Placeholder seed posts (NOTE: sample content, replace with real entries)
INSERT INTO posts (id, published_at, mood_label, mood_rating, title, excerpt, body) VALUES ('3am-tired', '2026-10-14', 'low, and low', 8, 'The 3am kind of tired that sleep doesn''t fix', 'Some nights it''s not the number that gets me, it''s how alone the whole thing feels doing math with my own blood while everyone else sleeps.', '["Some nights it''s not the number that gets me, it''s how alone the whole thing feels doing math with my own blood while everyone else sleeps.","I woke up at 3am to a low that wouldn''t quit, juice box in hand, staring at the ceiling and waiting for the shakes to pass. Nothing about it is dramatic from the outside, just a quiet, small emergency that happens in the dark, alone, more often than anyone would guess.","By morning I was fine. Numbers were fine. But fine doesn''t erase the hour it took to get there, and I think that''s the part people don''t see."]');
INSERT INTO posts (id, published_at, mood_label, mood_rating, title, excerpt, body) VALUES ('pancreas-retirement', '2026-10-11', 'dark humor', 4, 'My pancreas filed for early retirement in 2009', 'Told the waiter my pancreas already ordered dessert without me. He did not laugh. My blood sugar did, at 240.', '["Told the waiter my pancreas already ordered dessert without me. He did not laugh. My blood sugar did, at 240.","Diagnosed in 2009, and somewhere along the way I decided the only way through this was to find it funny, at least some of the time. My pancreas gets a lot of blame in this house. It deserves most of it.","Today wasn''t a great day, numbers-wise. But it was a pretty funny one, and I''ll take that trade most days of the week."]');
INSERT INTO posts (id, published_at, mood_label, mood_rating, title, excerpt, body) VALUES ('flat-line', '2026-10-08', 'actually okay', 2, 'A flat line for the first time in weeks', 'Nothing dramatic. Just a quiet, boring, flat line all day, and that deserves a record too, not just the hard days.', '["Nothing dramatic. Just a quiet, boring, flat line all day, and that deserves a record too, not just the hard days.","No big lesson today, no near miss, nothing to write home about. Just a graph that stayed where it was supposed to stay, and a day where diabetes was background noise instead of the main event.","I want this journal to hold onto days like this one too, not just the hard ones. They''re rarer than the good story deserves."]');
