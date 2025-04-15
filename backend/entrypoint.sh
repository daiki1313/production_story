#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /api/tmp/pids/server.pid

# # production環境の場合のみ
# if [ "$RAILS_ENV" = "production" ]; then

#   # bundle exec rails db:create
  
#   # # マイグレーション処理
#   # bundle exec rails db:migrate
# fi

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
