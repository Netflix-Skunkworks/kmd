#!/usr/bin/env kmd
exec lsappinfo list
split \n\n
  save info
  extract "([^"]+)
  save name

  load info
  extract =\s?([\d]{4}\/[\d]{2}\/[\d]{2}\s[\d]{2}:[\d]{2}:[\d]{2})
  parseDate YYYY/MM/DD hh:mm:ss
  save lastOpened
  # print lastOpened
  # print name

  load info
  extract bundleID="([^"]+)
  save bundle

  remove info
save apps
