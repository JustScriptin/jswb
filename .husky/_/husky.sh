#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "true" ] && echo "husky (debug) - $*"
  }
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  if [ "$HUSKY" = "skip" ]; then
    debug "HUSKY is set to skip, skipping hook"
    exit 0
  fi
  if [ -n "$CI" ]; then
    debug "CI detected, skipping hook"
    exit 0
  fi
fi

export PATH="./node_modules/.bin:$PATH"

if [ -f ~/.huskyrc ]; then
  . ~/.huskyrc
fi

exec "$@"
