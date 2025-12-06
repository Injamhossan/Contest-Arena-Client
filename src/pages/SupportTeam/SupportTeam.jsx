import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Clock, HelpCircle, Send, CheckCircle } from 'lucide-react';

const SupportTeam = () => {
    const supportOptions = [
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Get instant help from our support team',
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            action: 'Start Chat'
        },
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Send us an email and we\'ll respond within 24 hours',
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            action: 'Send Email'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Call us for urgent matters',
            color: 'text-green-500',
            bg: 'bg-green-50',
            action: 'Call Now'
        },
        {
            icon: HelpCircle,
            title: 'FAQ',
            description: 'Find answers to common questions',
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            action: 'Browse FAQ'
        }
    ];

    const faqs = [
        {
            question: 'How do I participate in a contest?',
            answer: 'Simply browse our contests, find one that interests you, and click "Participate". You\'ll need to create an account if you haven\'t already.'
        },
        {
            question: 'How are winners selected?',
            answer: 'Winners are selected through a fair judging process by our expert panel. Criteria vary by contest type and are clearly stated in each contest description.'
        },
        {
            question: 'When will I receive my prize?',
            answer: 'Prizes are typically distributed within 7-14 business days after the contest ends and winners are announced.'
        },
        {
            question: 'Can I host my own contest?',
            answer: 'Yes! Premium members can host their own contests. Contact our support team to learn more about hosting options.'
        }
    ];

    const teamMembers = [
        {
            name: 'Sarah Johnson',
            role: 'Support Lead',
            email: 'sarah@contestarena.com',
            avatar: 'SJ'
        },
        {
            name: 'Michael Chen',
            role: 'Technical Support',
            email: 'michael@contestarena.com',
            avatar: 'MC'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Community Manager',
            email: 'emily@contestarena.com',
            avatar: 'ER'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 font-urbanist"
                        >
                            <span className="text-gray-900">Support </span>
                            <span className="bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] bg-clip-text text-transparent">
                                Team
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        >
                            We're here to help! Our support team is available 24/7 to assist you with any questions or issues.
                        </motion.p>
                    </motion.div>

                    {/* Support Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {supportOptions.map((option, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                            >
                                <div className={`w-14 h-14 ${option.bg} rounded-2xl flex items-center justify-center ${option.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <option.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                                <button className="text-sm font-medium text-[#4a37d8] hover:text-[#6928d9] transition-colors">
                                    {option.action} →
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-urbanist">
                            <span className="text-gray-900">Get in </span>
                            <span className="bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
                                Touch
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Fill out the form below and we'll get back to you as soon as possible
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-lg"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all"
                                    placeholder="What can we help you with?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a37d8] focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell us more about your question or issue..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-urbanist">
                            <span className="text-gray-900">Frequently Asked </span>
                            <span className="bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h2>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-urbanist">
                            <span className="text-gray-900">Meet Our </span>
                            <span className="bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
                                Team
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Our dedicated support team is here to help you succeed
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-linear-to-r from-[#4a37d8] to-[#6928d9] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    {member.avatar}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-gray-600 mb-4">{member.role}</p>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="text-sm text-[#4a37d8] hover:text-[#6928d9] transition-colors"
                                >
                                    {member.email}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Response Time Info */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 text-center"
                    >
                        <div className="flex items-center gap-3">
                            <Clock className="text-[#4a37d8]" size={24} />
                            <div>
                                <div className="font-bold text-gray-900">Response Time</div>
                                <div className="text-sm text-gray-600">Within 24 hours</div>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-gray-300" />
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={24} />
                            <div>
                                <div className="font-bold text-gray-900">Availability</div>
                                <div className="text-sm text-gray-600">24/7 Support</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SupportTeam;
