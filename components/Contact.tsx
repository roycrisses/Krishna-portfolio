import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { CONTACT_INFO } from '../constants';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-reveal", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                },
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;

        setLoading(true);
        setStatus({ type: null, message: '' });

        // These IDs should come from your .env file
        // Service ID, Template ID, Public Key
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                setLoading(false);
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                if (formRef.current) formRef.current.reset();

                // Clear success message after 5 seconds
                setTimeout(() => setStatus({ type: null, message: '' }), 5000);
            }, (error) => {
                setLoading(false);
                setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
                console.error(error.text);
            });
    };

    return (
        <section id="contact" ref={containerRef} className="py-20 md:py-40 bg-dark-bg border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-20">

                    {/* Left - Heading */}
                    <div className="lg:w-1/2">
                        <span className="contact-reveal block text-xs font-medium tracking-[0.25em] uppercase text-gray-500 mb-8">
                            (05) — Contact
                        </span>
                        <h2 className="contact-reveal text-6xl md:text-8xl font-bold font-display text-white uppercase leading-[0.9] tracking-tight mb-12">
                            Let's <br /> <span className="text-neon">Create</span> <br /> Future.
                        </h2>

                        <div className="contact-reveal space-y-2 mt-20">
                            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Contact Details</p>
                            <a href={`mailto:${CONTACT_INFO.email}`} className="block text-2xl text-white hover:text-neon transition-colors">
                                {CONTACT_INFO.email}
                            </a>
                            <a href={`tel:${CONTACT_INFO.phone1}`} className="block text-2xl text-white hover:text-neon transition-colors">
                                {CONTACT_INFO.phone1}
                            </a>
                            <p className="text-gray-400 mt-4">{CONTACT_INFO.location}</p>
                        </div>
                    </div>

                    {/* Right - Minimal Form */}
                    <div className="lg:w-1/2 pt-10">
                        <form ref={formRef} className="space-y-12" onSubmit={sendEmail}>
                            <div className="contact-reveal group relative">
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-neon transition-colors placeholder-transparent peer"
                                    placeholder="Name"
                                    id="name"
                                    required
                                />
                                <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 text-xl transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 -top-6 text-xs">
                                    Your Name
                                </label>
                            </div>

                            <div className="contact-reveal group relative">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-neon transition-colors placeholder-transparent peer"
                                    placeholder="Email"
                                    id="email"
                                    required
                                />
                                <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 text-xl transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 -top-6 text-xs">
                                    Email Address
                                </label>
                            </div>

                            <div className="contact-reveal group relative">
                                <textarea
                                    name="message"
                                    rows={3}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-neon transition-colors placeholder-transparent peer resize-none"
                                    placeholder="Message"
                                    id="message"
                                    required
                                ></textarea>
                                <label htmlFor="message" className="absolute left-0 top-4 text-gray-500 text-xl transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 -top-6 text-xs">
                                    Tell me about your project
                                </label>
                            </div>

                            <div className="contact-reveal">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex items-center gap-4 text-xl font-bold text-white uppercase tracking-widest hover:text-neon transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                    <span className="p-3 rounded-full border border-white/20 group-hover:bg-neon group-hover:border-neon group-hover:text-black transition-all">
                                        <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                    </span>
                                </button>

                                {status.message && (
                                    <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {status.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-32 pt-8 border-t border-white/5 flex justify-between items-center text-xs uppercase tracking-widest text-gray-600">
                    <p>2025 © Krishna Karki</p>
                    <p>Designed & Built in Nepal</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;