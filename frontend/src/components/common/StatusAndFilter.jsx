import { FilterType } from '@/lib/data';
import { Filter } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const StatusAndFilter = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="gradient"
            size="sm"
            className="capitalize flex items-center gap-2"
          >
            <Filter className="size-4" />
            {FilterType[filter]}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          {Object.keys(FilterType).map((type) => (
            <DropdownMenuItem
              key={type}
              onClick={() => setFilter(type)}
              className={`capitalize cursor-pointer ${
                filter === type ? "bg-primary/10 font-medium" : ""
              }`}
            >
              <Filter className="size-4 mr-2" />
              {FilterType[type]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
