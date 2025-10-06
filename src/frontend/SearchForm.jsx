import React, { useState, useRef } from 'react';
import { ArrowUpIcon } from "lucide-react";
import { IconPlus } from "@tabler/icons-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const SearchForm = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('Auto');
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form ref={formRef} className="mb-8" onSubmit={handleSubmit}>
      <InputGroup>
        <InputGroupTextarea
          placeholder="Ask, Search or Chat..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            type="button"
            variant="outline"
            className="rounded-full"
            size="icon-xs"
            onClick={() => setQuery((q) => q)}
          >
            <IconPlus />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" className="h-7 px-2 text-xs">{mode}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="[--radius:0.95rem]">
              <DropdownMenuItem onSelect={() => setMode('Auto')}>Auto</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setMode('Agent')}>Agent</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setMode('Manual')}>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <Separator orientation="vertical" className="!h-4" />
          <InputGroupButton
            type="button"
            onClick={() => formRef.current?.requestSubmit()}
            variant="default"
            className="rounded-full"
            size="icon-xs"
            aria-label="Send"
            disabled={loading || !query.trim()}
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default SearchForm;
