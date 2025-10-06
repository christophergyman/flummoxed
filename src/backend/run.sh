#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}🚀 Flummoxed Backend Build & Run Script${NC}"
echo "=================================="

# Function to clean up old binaries
cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up old binaries...${NC}"
    rm -f main
    echo -e "${GREEN}✅ Cleanup complete${NC}"
}

# Function to build the Go application
build() {
    echo -e "${YELLOW}🔨 Building Go application...${NC}"
    
    if go build -o main .; then
        echo -e "${GREEN}✅ Build successful${NC}"
        return 0
    else
        echo -e "${RED}❌ Build failed${NC}"
        return 1
    fi
}

# Function to run the application
run() {
    echo -e "${YELLOW}🏃 Running application...${NC}"
    echo "=================================="
    
    if [ -f "./main" ]; then
        ./main
    else
        echo -e "${RED}❌ Binary not found. Run build first.${NC}"
        return 1
    fi
}

# Function to show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -b, --build     Build only"
    echo "  -r, --run       Run only (requires existing binary)"
    echo "  -c, --clean     Clean build artifacts"
    echo "  -h, --help      Show this help message"
    echo ""
    echo "Default behavior: clean, build, and run"
}

# Parse command line arguments
BUILD_ONLY=false
RUN_ONLY=false
CLEAN_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -b|--build)
            BUILD_ONLY=true
            shift
            ;;
        -r|--run)
            RUN_ONLY=true
            shift
            ;;
        -c|--clean)
            CLEAN_ONLY=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# Execute based on options
if [ "$CLEAN_ONLY" = true ]; then
    cleanup
elif [ "$BUILD_ONLY" = true ]; then
    cleanup
    build
elif [ "$RUN_ONLY" = true ]; then
    run
else
    # Default: clean, build, and run
    cleanup
    if build; then
        echo ""
        run
    else
        echo -e "${RED}❌ Build failed, not running${NC}"
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}🎉 Script completed successfully!${NC}"
