#!/bin/bash

# Install gnuplot if not installed
if ! [ -x "$(command -v gnuplot)" ]; then
  sudo apt-get install gnuplot
fi

# Check if Node.js is installed
if ! [ -x "$(command -v node)" ]; then
  echo "Error: Node.js is not installed." >&2
  exit 1
fi

gnuplot plot_script.gp
