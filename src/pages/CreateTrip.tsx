import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Eye, Lightbulb, Calendar as CalendarIcon, Save } from 'lucide-react';
import { useTrips } from '../context/TripContext';

export const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrips();

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('2024-07-12');
  const [endDate, setEndDate] = useState('2024-07-26');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(3500);
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  );

  const sampleImages = [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrip = createTrip({
      title: title || 'Summer in Kyoto',
      startDate,
      endDate,
      description: description || 'A relaxing exploration of historic temples and traditional tea houses.',
      budget,
      coverImage,
    });
    navigate(`/trips/${newTrip.id}/plan`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface">
          Plan a New Trip
        </h1>
        <p className="text-outline text-sm mt-1">Craft your next adventure with precision and style.</p>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 glass-card-elevated rounded-3xl p-6 md:p-8 shadow-xl border border-outline-variant/30">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Trip Name */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                Trip Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Summer in Kyoto"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                required
              />
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                  Start Date
                </label>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                  End Date
                </label>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                Description / Notes
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="What's the vibe? Who are you going with? Key places to see..."
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            {/* Estimated Budget Input */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                Target Budget ($)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Cover Image Upload & Select Dropzone */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-outline-variant rounded-2xl p-6 text-center bg-surface-container-lowest hover:border-primary transition-colors cursor-pointer group">
                <UploadCloud className="w-10 h-10 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-xs text-on-surface">Click to upload or drag and drop</p>
                <p className="text-[11px] text-outline mt-0.5">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>

              {/* Sample Cover Image Picker */}
              <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-1">
                <span className="text-[11px] font-semibold text-outline">Quick Pick:</span>
                {sampleImages.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt="sample"
                    onClick={() => setCoverImage(imgUrl)}
                    className={`w-12 h-10 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                      coverImage === imgUrl ? 'border-primary scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-outline-variant/40">
              <button
                type="button"
                onClick={() => navigate('/trips')}
                className="px-5 py-2.5 rounded-xl border border-outline-variant text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim hover:shadow-lg transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Trip</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Preview & Inspiration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* LIVE PREVIEW CARD */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-outline">
                LIVE PREVIEW
              </span>
            </div>

            <div className="glass-card rounded-3xl overflow-hidden shadow-lg border border-outline-variant/40">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={coverImage}
                  alt="preview"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-headline font-bold text-lg text-white drop-shadow">
                    {title || 'Summer in Kyoto'}
                  </h3>
                  <p className="text-xs text-white/90 flex items-center gap-1 mt-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-white/80" />
                    <span>Jul 12 - Jul 26, 2024</span>
                  </p>
                </div>
              </div>

              <div className="p-5 bg-surface-container-lowest space-y-4">
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {description ||
                    'A relaxing two-week exploration of historic temples, bamboo forests, and traditional tea houses in the heart of Japan. Planning itinerary...'}
                </p>

                <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/40">
                  <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-semibold text-[11px]">
                    Planning Stage
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-semibold text-[11px]">
                    14 Days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* INSPIRATION WIDGET */}
          <div className="glass-card rounded-3xl p-5 border border-outline-variant/40 space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-outline">
                INSPIRATION
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80"
                  alt="tea houses"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-[11px] font-bold text-white drop-shadow">
                  Hidden Tea Houses
                </span>
              </div>

              <div className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80"
                  alt="arashiyama"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-[11px] font-bold text-white drop-shadow">
                  Arashiyama Guide
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
