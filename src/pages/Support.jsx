import React, { useState } from 'react';

const Support = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, error } = await usePost('/user/support', { subject, message });
        if (success) {
            setSubmitted(true);
            setSubject('');
            setMessage('');
        } else {
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Support</h1>
            {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Your message has been sent. We'll get back to you soon.
                </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="subject" className="block mb-2">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block mb-2">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-600">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Support;