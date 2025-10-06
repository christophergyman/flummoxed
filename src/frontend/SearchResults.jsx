import React from 'react';
import DOMPurify from 'dompurify';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

// Component to display individual search result
const SearchResult = ({ result }) => {
  return (
    <div className="p-6">
      <h3 className="mb-2">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black no-underline text-lg font-medium leading-snug hover:underline"
        >
          {result.title}
        </a>
      </h3>
      <p className="text-neutral-500 text-sm mb-2 break-all">{result.url}</p>
      {result.description && (
        <p
          className="text-neutral-700 leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.description) }}
        />
      )}
      {result.age && (
        <span className="text-neutral-500 text-xs italic">{result.age}</span>
      )}
    </div>
  );
};

// Loading component with centered overlay
const SpinnerEmpty = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Empty className="w-full max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

// Main component to display all search results
const SearchResults = ({ results, loading, error }) => {
  if (loading) {
    return <SpinnerEmpty />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-black">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-neutral-500">
          <p>No results found. Try a different search term.</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white text-black border border-neutral-200">
      <CardHeader className="bg-neutral-50 border-b border-neutral-200">
        <CardTitle className="text-neutral-900 text-lg">Search Results ({results.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {results.map((result, index) => (
          <div key={index}>
            <SearchResult result={result} />
            {index < results.length - 1 && <Separator className="bg-neutral-200" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SearchResults;
