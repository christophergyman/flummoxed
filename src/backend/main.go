package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// Config represents the application configuration
type Config struct {
	BraveSearchApi string `json:"BraveSearchApi"`
}

// loadConfig reads and parses the config.json file
func loadConfig(configPath string) (*Config, error) {
	configData, err := os.ReadFile(configPath)
	if err != nil {
		return nil, fmt.Errorf("reading config file: %w", err)
	}

	var config Config
	if err := json.Unmarshal(configData, &config); err != nil {
		return nil, fmt.Errorf("parsing config JSON: %w", err)
	}

	return &config, nil
}

// searchHandler handles search API requests
func searchHandler(w http.ResponseWriter, r *http.Request) {
	// Minimal CORS for dev
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	query := r.URL.Query().Get("q")
	if query == "" {
		http.Error(w, "Missing query parameter 'q'", http.StatusBadRequest)
		return
	}

	// Load config
	config, err := loadConfig("../../config.json")
	if err != nil {
		http.Error(w, "Error loading config", http.StatusInternalServerError)
		return
	}

	// Make search request
	status, body, err := sendBraveSearchRequest(query, config.BraveSearchApi)
	if err != nil {
		http.Error(w, "Search request failed", http.StatusInternalServerError)
		return
	}

	// Return response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(body)
}

func main() {
	// Setup API routes
	http.HandleFunc("/api/search", searchHandler)

	// Start server
	fmt.Println("Server starting on :8080")
	fmt.Println("API endpoint: http://localhost:8080/api/search?q=your_query")
	http.ListenAndServe(":8080", nil)
}
