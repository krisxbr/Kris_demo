<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study360 Redesign</title>
    <script src="https://cdn.tailwindcss.com"></script>
  <script type="importmap">
{
  "imports": {
    "react": "https://aistudiocdn.com/react@^19.1.1",
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.1.1/",
    "react/": "https://aistudiocdn.com/react@^19.1.1/"
  }
}
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBR1_P1PL5R5CN3mUuNn_R_ZDzHTTAQfu4&libraries=marker"></script>
<script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>
<style>
/* Improved animations */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes drift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-drift {
  animation: drift 10s ease-in-out infinite;
}

@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out forwards;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
      <SearchAutocomplete
        value={query}
        onChange={setQuery}
        placeholder="Search lessons, tags, authors..."
        suggestions={suggestions}
        className="w-full"
      />
    </div>
  );