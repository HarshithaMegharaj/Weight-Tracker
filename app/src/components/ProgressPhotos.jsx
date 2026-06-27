import { useMemo } from 'react';
import { Camera, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ProgressPhotos({ weightEntries }) {
  const photosEntries = useMemo(() =>
    weightEntries
      .filter(e => e.image)
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [weightEntries]
  );

  if (photosEntries.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Progress Photos</h2>
          <p className="text-gray-400 text-sm">Visual proof of your transformation</p>
        </div>
        <div className="flex flex-col items-center justify-center h-72 glass p-10 text-center">
          <Camera size={48} className="text-purple-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Photos Yet</h3>
          <p className="text-gray-400 text-sm max-w-sm">
            Upload progress photos when logging your weight to see your visual transformation over time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Progress Photos</h2>
        <p className="text-gray-400 text-sm">{photosEntries.length} photos documenting your journey</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photosEntries.map((entry, i) => (
          <div key={i} className="glass overflow-hidden group">
            <div className="relative">
              <img
                src={entry.image}
                alt={`Progress on ${format(new Date(entry.date), 'MMM dd, yyyy')}`}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-bold text-lg">{entry.weight} kg</p>
                <p className="text-gray-300 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {format(new Date(entry.date), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
            {entry.note && (
              <div className="p-3">
                <p className="text-sm text-gray-400">{entry.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
