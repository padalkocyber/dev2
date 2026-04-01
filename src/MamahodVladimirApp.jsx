import React, { useMemo, useState } from 'react';
import { CalendarDays, Clock3, MapPin, RussianRuble, Send, Users, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

/**
 * Mamahod Vladimir MVP
 * - Mobile-first, minimalist "techno-craft" aesthetic via Tailwind utility classes
 * - Uses EmailJS for sending booking emails to and1994pad@yandex.ru
 *
 * Required env vars (Vite / CRA style):
 * - VITE_EMAILJS_SERVICE_ID
 * - VITE_EMAILJS_TEMPLATE_ID
 * - VITE_EMAILJS_PUBLIC_KEY
 */
export default function MamahodVladimirApp() {
  const events = useMemo(
    () => [
      {
        id: 'sobornaya-morning',
        title: 'Morning Walk at Sobornaya Square',
        date: 'Saturday, 10:00',
        duration: '1.5 hours',
        price: '500 ₽',
        location: 'Sobornaya Square, Vladimir',
        image:
          'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
        alt: 'Historic architecture near Sobornaya Square in Vladimir with open promenade space for stroller walks',
      },
      {
        id: 'pushkin-park-day',
        title: 'Pushkin Park Social Stroll',
        date: 'Sunday, 12:00',
        duration: '2 hours',
        price: 'Free',
        location: 'Pushkin Park, Vladimir',
        image:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tree-lined walking path in a city park ideal for mothers with strollers and casual conversations',
      },
      {
        id: 'lybidskaya-evening',
        title: 'Lybidskaya Highway View Route',
        date: 'Wednesday, 17:30',
        duration: '1 hour',
        price: '350 ₽',
        location: 'Lybidskaya Highway viewpoints, Vladimir',
        image:
          'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Panoramic urban views and modern city roads around Vladimir suitable for organized evening walks',
      },
      {
        id: 'patriarchal-garden',
        title: 'Patriarchal Garden Slow Walk',
        date: 'Friday, 11:00',
        duration: '1.5 hours',
        price: '600 ₽',
        location: 'Patriarchal Garden, Vladimir',
        image:
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        alt: 'Landscaped terraced garden with pathways and flowers in Vladimir, perfect for stroller-friendly relaxation',
      },
    ],
    [],
  );

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    social: '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setStatus({ type: 'idle', message: '' });
    setFormState({ name: '', phone: '', social: '' });
  };

  const handleCloseModal = () => setSelectedEvent(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent) return;

    setStatus({ type: 'loading', message: 'Sending your booking...' });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: 'and1994pad@yandex.ru',
          subject: 'New Booking: Mamahod Vladimir',
          from_name: formState.name,
          phone: formState.phone,
          social: formState.social,
          event_name: selectedEvent.title,
          event_date: selectedEvent.date,
          event_location: selectedEvent.location,
          message: `New booking request from ${formState.name}.`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus({
        type: 'success',
        message: 'Thank you! Your booking request has been sent. We will contact you soon.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Could not send booking right now. Please try again in a moment.',
      });
      // eslint-disable-next-line no-console
      console.error('EmailJS booking error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F3ED] text-[#23332D]">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#9AAF88]/30 bg-gradient-to-br from-[#E8EEDC] via-[#F7F3ED] to-[#D8C2A5]/25 p-8 shadow-sm md:p-12">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#9AAF88]/40 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#4A5E50]">
            <Users size={14} /> Organized strolls for moms
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
            Mamahod Vladimir — friendly stroller walks around the city
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[#4C5A53] md:text-base">
            Join welcoming weekly walks, meet other mothers, enjoy Vladimir's beautiful landmarks, and spend quality time outdoors with your child.
          </p>
          <a
            href="#events"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#8FAF7A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#7EA169]"
          >
            View upcoming walks <Send size={16} />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold md:text-3xl">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            'Choose a walk by date and location.',
            'Register in 30 seconds via simple form.',
            'Meet at the location and enjoy a calm group walk.',
          ].map((step, idx) => (
            <div key={step} className="rounded-2xl border border-[#9AAF88]/25 bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6A7D70]">Step {idx + 1}</p>
              <p className="mt-2 text-sm text-[#314039]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="events" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold md:text-3xl">Upcoming events in Vladimir</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {events.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-3xl border border-[#9AAF88]/25 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img src={event.image} alt={event.alt} className="h-44 w-full object-cover" loading="lazy" />

              <div className="space-y-3 p-4">
                <h3 className="text-base font-semibold leading-tight">{event.title}</h3>

                <div className="space-y-1 text-sm text-[#45544C]">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={15} /> {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 size={15} /> {event.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <RussianRuble size={15} /> {event.price}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} /> {event.location}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(event)}
                  className="w-full rounded-xl bg-[#7E5D45] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6E513D]"
                >
                  Register
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">Register for walk</h3>
                <p className="text-sm text-[#516158]">{selectedEvent.title}</p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-full p-1 text-[#4D5F55] transition hover:bg-[#F0EEE9]"
                aria-label="Close registration modal"
              >
                <X size={18} />
              </button>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <label className="block text-sm">
                Name
                <input
                  className="mt-1 w-full rounded-xl border border-[#9AAF88]/35 px-3 py-2 outline-none ring-[#8FAF7A] focus:ring"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="block text-sm">
                Phone
                <input
                  className="mt-1 w-full rounded-xl border border-[#9AAF88]/35 px-3 py-2 outline-none ring-[#8FAF7A] focus:ring"
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="+7 (...) ...-..-.."
                  required
                />
              </label>

              <label className="block text-sm">
                Instagram / Telegram
                <input
                  className="mt-1 w-full rounded-xl border border-[#9AAF88]/35 px-3 py-2 outline-none ring-[#8FAF7A] focus:ring"
                  type="text"
                  name="social"
                  value={formState.social}
                  onChange={handleChange}
                  placeholder="@username"
                />
              </label>

              <label className="block text-sm">
                Event name
                <input
                  className="mt-1 w-full rounded-xl border border-[#9AAF88]/35 bg-[#F7F3ED] px-3 py-2 text-[#5A6A61]"
                  type="text"
                  value={selectedEvent.title}
                  readOnly
                />
              </label>

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="mt-2 w-full rounded-xl bg-[#8FAF7A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7EA169] disabled:cursor-not-allowed disabled:opacity-75"
              >
                {status.type === 'loading' ? 'Sending...' : 'Submit booking'}
              </button>
            </form>

            {status.type !== 'idle' && (
              <p
                className={`mt-3 text-sm ${
                  status.type === 'success'
                    ? 'text-green-700'
                    : status.type === 'error'
                      ? 'text-red-600'
                      : 'text-[#4A5E50]'
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
