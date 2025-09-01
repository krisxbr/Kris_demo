import Fuse from 'fuse.js';
import { Lesson, MapAsset } from '../types';

export interface SearchSuggestion {
  type: 'recent' | 'tag' | 'author' | 'location';
  value: string;
  label: string;
  count?: number;
}

export function createLessonSearchEngine(lessons: Lesson[]) {
  return new Fuse(lessons, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'author', weight: 0.2 },
      { name: 'tags', weight: 0.3 },
      { name: 'location.city', weight: 0.1 }
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true
  });
}

export function createAssetSearchEngine(assets: MapAsset[]) {
  return new Fuse(assets, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'author', weight: 0.2 },
      { name: 'tags', weight: 0.2 },
      { name: 'description', weight: 0.2 }
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true
  });
}

export function generateSearchSuggestions(
  lessons: Lesson[], 
  assets: MapAsset[], 
  query: string
): SearchSuggestion[] {
  if (!query.trim()) return [];

  const suggestions: SearchSuggestion[] = [];
  const lowercaseQuery = query.toLowerCase();

  // Extract unique values
  const allTags = new Set<string>();
  const allAuthors = new Set<string>();
  const allLocations = new Set<string>();

  [...lessons, ...assets].forEach(item => {
    if ('tags' in item) {
      item.tags.forEach(tag => allTags.add(tag));
    }
    allAuthors.add(item.author);
    
    if ('location' in item) {
      allLocations.add(item.location.city);
      allLocations.add(item.location.country);
    }
  });

  // Add matching tags
  Array.from(allTags)
    .filter(tag => tag.toLowerCase().includes(lowercaseQuery))
    .slice(0, 3)
    .forEach(tag => {
      const count = [...lessons, ...assets].filter(item => 
        'tags' in item && item.tags.includes(tag)
      ).length;
      suggestions.push({
        type: 'tag',
        value: tag,
        label: tag,
        count
      });
    });

  // Add matching authors
  Array.from(allAuthors)
    .filter(author => author.toLowerCase().includes(lowercaseQuery))
    .slice(0, 2)
    .forEach(author => {
      const count = [...lessons, ...assets].filter(item => item.author === author).length;
      suggestions.push({
        type: 'author',
        value: author,
        label: author,
        count
      });
    });

  // Add matching locations
  Array.from(allLocations)
    .filter(location => location.toLowerCase().includes(lowercaseQuery))
    .slice(0, 2)
    .forEach(location => {
      const count = lessons.filter(lesson => 
        lesson.location.city.toLowerCase().includes(location.toLowerCase()) ||
        lesson.location.country.toLowerCase().includes(location.toLowerCase())
      ).length;
      suggestions.push({
        type: 'location',
        value: location,
        label: location,
        count
      });
    });

  return suggestions.slice(0, 8);
}