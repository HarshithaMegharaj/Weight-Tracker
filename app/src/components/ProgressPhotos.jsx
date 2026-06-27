import { useMemo, useState } from 'react';
import { Camera, Calendar, X, ChevronLeft, ChevronRight, GitCompareArrows, BarChart3 } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function ProgressPhotos({ weightEntries }) {
  const [lightbox, setLightbox] = useState(null);
  const [mode, setMode] = useState('gallery');
  const [compareIdx, setCompareIdx] = useState([0, null]);

  const photosEntries = useMemo(() =>
    weightEntries
      .filter(e => e.image)
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [weightEntries]
  );

  const monthlyGroups = useMemo(() => {
    const groups = {};
    photosEntries.forEach(e => {
      const key = format(new Date(e.date), 'yyyy-MM');
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [photosEntries]);

  const navigateLightbox = (dir) => {
    if (lightbox === null) return;
    const next = lightbox + dir;
    if (next >= 0 && next < photosEntries.length) setLightbox(next);
  };

  if (photosEntries.length === 0) {
    return (
      <div style={{ padding: "24px 20px 0" }} className="space-y-5">
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

  const firstPhoto = [...photosEntries].reverse()[0];
  const latestPhoto = photosEntries[0];
  const daysBetween = differenceInDays(new Date(latestPhoto.date), new Date(firstPhoto.date));
  const weightDiff = (firstPhoto.weight - latestPhoto.weight).toFixed(1);

  return (
    <div style={{ padding: "24px 20px 0" }} className="space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Gallery</p>
        <h1 className="text-[28px] font-extrabold mt-1">Progress Photos</h1>
        <p className="text-[12px] text-[var(--text-dim)] mt-1">{photosEntries.length} photo{photosEntries.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-2 animate-fade-in-up stagger-1">
        {[
          { id: 'gallery', l: 'Gallery', ic: Camera },
          { id: 'compare', l: 'Compare', ic: GitCompareArrows },
          { id: 'recap', l: 'Recap', ic: BarChart3 },
        ].map(t => (
          <button key={t.id} onClick={() => setMode(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[12px] font-bold cursor-pointer active:scale-[0.96] transition-all
              ${mode === t.id ? 'chip-active' : 'chip'}`}>
            <t.ic size={13} /> {t.l}
          </button>
        ))}
      </div>

      {mode === 'compare' && photosEntries.length >= 2 && (
        <div className="glass-card p-5 animate-fade-in-up stagger-2">
          <h3 className="text-[13px] font-bold mb-4">Before & After</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative rounded-[14px]" style={{ overflow: 'hidden' }}>
                <img src={firstPhoto.image} alt="Before" className="w-full h-44 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2.5 left-3">
                  <p className="text-white text-[13px] font-bold">{firstPhoto.weight} kg</p>
                  <p className="text-white/60 text-[10px]">{format(new Date(firstPhoto.date), 'MMM dd')}</p>
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-dim)] text-center mt-1.5 font-semibold uppercase">Before</p>
            </div>
            <div className="flex-1">
              <div className="relative rounded-[14px]" style={{ overflow: 'hidden' }}>
                <img src={latestPhoto.image} alt="After" className="w-full h-44 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2.5 left-3">
                  <p className="text-white text-[13px] font-bold">{latestPhoto.weight} kg</p>
                  <p className="text-white/60 text-[10px]">{format(new Date(latestPhoto.date), 'MMM dd')}</p>
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-dim)] text-center mt-1.5 font-semibold uppercase">Latest</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-[14px] bg-white/[0.03] border border-white/[0.05] text-center">
            <p className="text-[14px] font-extrabold">
              <span className={weightDiff > 0 ? 'text-emerald-400' : 'text-red-400'}>{weightDiff > 0 ? '-' : '+'}{Math.abs(weightDiff)} kg</span>
              <span className="text-[var(--text-dim)] text-[12px] ml-2">in {daysBetween} days</span>
            </p>
          </div>
        </div>
      )}

      {mode === 'recap' && (
        <div className="space-y-3 animate-fade-in-up stagger-2">
          {monthlyGroups.map(([month, entries]) => {
            const first = entries[entries.length - 1];
            const last = entries[0];
            const change = (first.weight - last.weight).toFixed(1);
            return (
              <div key={month} className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[14px] font-bold">{format(new Date(month + '-01'), 'MMMM yyyy')}</h3>
                  <span className={`text-[12px] font-bold ${parseFloat(change) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {parseFloat(change) >= 0 ? '-' : '+'}{Math.abs(change)} kg
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
                  {entries.slice(0, 4).map((e, i) => (
                    <div key={i} className="shrink-0 w-20">
                      <div className="rounded-[10px]" style={{ overflow: 'hidden' }}>
                        <img src={e.image} alt="" className="w-20 h-20 object-cover" />
                      </div>
                      <p className="text-[10px] text-[var(--text-dim)] text-center mt-1 font-semibold">{format(new Date(e.date), 'dd MMM')}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[var(--text-dim)] mt-2">{entries.length} photos this month</p>
              </div>
            );
          })}
        </div>
      )}

      {mode === 'gallery' && (
        <div className="grid grid-cols-2 gap-3">
          {photosEntries.map((entry, i) => (
            <div key={i} onClick={() => setLightbox(i)}
              className={`glass-card cursor-pointer active:scale-[0.97] transition-transform animate-fade-in-up stagger-${Math.min(i + 1, 6)}`} style={{ overflow: 'hidden' }}>
              <div className="relative">
                <img src={entry.image} alt={`Progress ${format(new Date(entry.date), 'MMM dd')}`}
                  className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3">
                  <p className="text-white font-extrabold text-[15px]">{entry.weight} <span className="text-[11px] font-semibold text-white/70">kg</span></p>
                  <p className="text-white/60 text-[10px] flex items-center gap-1 mt-0.5 font-semibold">
                    <Calendar size={9} /> {format(new Date(entry.date), 'MMM dd, yyyy')}
                  </p>
                  {entry.dayType && (
                    <span className="text-[9px] text-white/50 mt-0.5 block capitalize">{entry.dayType} day</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
