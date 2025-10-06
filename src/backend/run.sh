#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p output

# Compile the C program with useful flags
echo "Compiling main.c..."
clang -Wall -Wextra -Werror -std=c99 -O2 -g -fsanitize=address main.c -o output/main.out

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "Compilation successful!"
    echo "Running main.out..."
    echo "----------------------------------------"
    ./output/main.out
else
    echo "Compilation failed!"
    exit 1
fi
