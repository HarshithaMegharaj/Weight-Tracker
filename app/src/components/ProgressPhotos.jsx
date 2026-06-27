import { useMemo, useState } from 'react';
import { Camera, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export default function ProgressPhotos({ weightEntries }) {
  const [lightbox, setLightbox] = useState(null);

  const photosEntries = useMemo(() =>
    weightEntries
      .filter(e => e.image)
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [weightEntries]
  );

  const navigateLightbox = (dir) => {
    if (lightbox === null) return;
    const next = lightbox + dir;
    if (next >= 0 && next < photosEntries.length) setLightbox(next);
  };

  if (photosEntries.length === 0) {
    return (
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Progress Photos</h2>
          <p className="text-gray-500 text-sm mt-1">Visual proof of your transformation</p>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[50vh] glass-card p-12 text-center animate-fade-in-up stagger-1">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/15 to-indigo-500/10 flex items-center justify-center mb-6 border border-purple-500/15">
            <Camera size={32} className="text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No Photos Yet</h3>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
            Upload progress photos when logging your weight to see your visual transformation over time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Progress Photos</h2>
        <p className="text-gray-500 text-sm mt-1">{photosEntries.length} photo{photosEntries.length !== 1 ? 's' : ''} documenting your journey</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photosEntries.map((entry, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            className={`glass-card overflow-hidden cursor-pointer group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
          >
            <div className="relative">
              <img
                src={entry.image}
                alt={`Progress on ${format(new Date(entry.date), 'MMM dd, yyyy')}`}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-xl">{entry.weight} <span className="text-sm font-normal text-gray-300">kg</span></p>
                <p className="text-gray-300 text-xs flex items-center gap-1.5 mt-1">
                  <Calendar size={11} /> {format(new Date(entry.date), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
            {entry.note && (
              <div className="p-4">
                <p className="text-sm text-gray-500 line-clamp-2">{entry.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center animate-fade-in" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer transition-colors" aria-label="Close">
            <X size={20} />
          </button>
          {lightbox > 0 && (
            <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="absolute left-4 p-3 rounded-2xl bg-white/10 hover:bg-white/20 cursor-pointer transition-colors" aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
          )}
          {lightbox < photosEntries.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="absolute right-4 p-3 rounded-2xl bg-white/10 hover:bg-white/20 cursor-pointer transition-colors" aria-label="Next">
              <ChevronRight size={24} />
            </button>
          )}
          <div className="max-w-4xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img src={photosEntries[lightbox].image} alt="Progress" className="max-h-[75vh] object-contain rounded-2xl mx-auto" />
            <div className="text-center mt-4">
              <p className="text-white text-xl font-bold">{photosEntries[lightbox].weight} kg</p>
              <p className="text-gray-400 text-sm mt-1">{format(new Date(photosEntries[lightbox].date), 'MMMM dd, yyyy')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
