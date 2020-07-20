#!/usr/bin/env kmd
exec ls -d /Applications/*.app
lines
  as app
  template {app}/Contents/Info.plist
  # some of these are (partially?) binary, so heads up
  cat
  save file

  extract <key>CFBundleName<\/key>\s+<string>([^<]+)<\/string>
  save name

  template lsappinfo info -app {name}
  exec
  extract =\s?([\d]{4}\/[\d]{2}\/[\d]{2}\s[\d]{2}:[\d]{2}:[\d]{2})
  parseDate YYYY/MM/DD HH:mm:ss
  save lastOpened

  load file
  extract <key>CFBundleDisplayName<\/key>\s+<string>([^<]+)<\/string>
  save displayName

  load file
  extract <key>CFBundleShortVersionString<\/key>\s+<string>([^<]+)<\/string>
  save version
  remove file

noEmpty
save apps
