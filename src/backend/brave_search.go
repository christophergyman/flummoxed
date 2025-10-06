package main

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

// sendBraveSearchRequest sends a GET request to Brave Search API and returns status code and response body.
func sendBraveSearchRequest(query, apiKey string) (int, []byte, error) {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Debug: log the user's query
	fmt.Printf("BraveSearch debug - query: %q\n", query)

	escapedQuery := url.QueryEscape(query)
	fullURL := fmt.Sprintf("https://api.search.brave.com/res/v1/web/search?q=%s", escapedQuery)

	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		return 0, nil, fmt.Errorf("create request: %w", err)
	}

	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", "Flummoxed-Backend/1.0")
	req.Header.Set("X-Subscription-Token", apiKey)

	resp, err := client.Do(req)
	if err != nil {
		return 0, nil, fmt.Errorf("send request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, nil, fmt.Errorf("read response: %w", err)
	}

	return resp.StatusCode, body, nil
}
