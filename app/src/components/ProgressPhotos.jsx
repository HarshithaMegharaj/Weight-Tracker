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
      <div className="px-5 pt-6 space-y-5">
        <div className="animate-fade-in-up">
          <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Gallery</p>
          <h1 className="text-[28px] font-extrabold mt-1">Progress Photos</h1>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[50vh] glass-card p-8 text-center animate-fade-in-up stagger-1">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-purple-500/15 to-indigo-500/10 flex items-center justify-center mb-4 border border-purple-500/15">
            <Camera size={28} className="text-purple-400" />
          </div>
          <h3 className="text-[17px] font-extrabold mb-2">No Photos Yet</h3>
          <p className="text-[13px] text-[var(--text-dim)] leading-relaxed max-w-[260px]">
            Upload progress photos when logging your weight to see your transformation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Gallery</p>
        <h1 className="text-[28px] font-extrabold mt-1">Progress Photos</h1>
        <p className="text-[12px] text-[var(--text-dim)] mt-1">{photosEntries.length} photo{photosEntries.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {photosEntries.map((entry, i) => (
          <div key={i} onClick={() => setLightbox(i)}
            className={`glass-card overflow-hidden cursor-pointer active:scale-[0.97] transition-transform animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}>
            <div className="relative">
              <img src={entry.image} alt={`Progress ${format(new Date(entry.date), 'MMM dd')}`}
                className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3">
                <p className="text-white font-extrabold text-[15px]">{entry.weight} <span className="text-[11px] font-semibold text-white/70">kg</span></p>
                <p className="text-white/60 text-[10px] flex items-center gap-1 mt-0.5 font-semibold">
                  <Calendar size={9} /> {format(new Date(entry.date), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in"
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform z-10"
            aria-label="Close">
            <X size={18} />
          </button>

          <div className="flex items-center w-full px-2" onClick={e => e.stopPropagation()}>
            {lightbox > 0 && (
              <button onClick={() => navigateLightbox(-1)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform shrink-0"
                aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
            )}
            <div className="flex-1 px-2">
              <img src={photosEntries[lightbox].image} alt="Progress"
                className="max-h-[65vh] object-contain rounded-2xl mx-auto" />
            </div>
            {lightbox < photosEntries.length - 1 && (
              <button onClick={() => navigateLightbox(1)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform shrink-0"
                aria-label="Next">
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <div className="text-center mt-4" onClick={e => e.stopPropagation()}>
            <p className="text-white text-xl font-extrabold">{photosEntries[lightbox].weight} kg</p>
            <p className="text-white/50 text-[12px] font-semibold mt-1">{format(new Date(photosEntries[lightbox].date), 'MMMM dd, yyyy')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
