import React from 'react';
import Navbar from '@/Components/Navbar';

const AboutPage = () => {
  return (
    <>
      <Navbar pos="" wi="100%" />
      <section className="min-h-screen bg-black text-white py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 border-b-2 border-gray-700 pb-2">🧑‍🎓 About SDMS</h1>
          <p className="text-lg text-gray-300 mb-8">
            Welcome to the <strong>Student Database Management System (SDMS)</strong> — your all-in-one solution for efficiently managing student records, attendance, and academic data.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-green-400">🔍 What We Offer</h2>
          <ul className="list-disc pl-6 text-gray-300 mb-8">
            <li><strong>Student Record Management:</strong> Add, update, and delete student details like Roll Number, Name, and Branch in real-time.</li>
            <li><strong>Student Grades Management:</strong> Update Grades of Student in real-time.</li>
            <li><strong>Attendance Tracking:</strong> Mark attendance daily and view attendance history by date or student.</li>
            <li><strong>Performance Insights:</strong> View attendance percentages for each student.</li>
            <li><strong>Clean & Intuitive Interface:</strong> Fast and simple UI for all users.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-green-400">🚀 Why Choose SDMS?</h2>
          <ul className="list-disc pl-6 text-gray-300 mb-8">
            <li>Built with modern tech like <strong>Next.js, React, MongoDB</strong>, and <strong>Tailwind CSS</strong></li>
            <li>Fast And responsive</li>
            <li>Secure database operations</li>
            <li>Scalable and customizable for any institution</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-green-400">🛠️ Tech Stack</h2>
          <ul className="list-disc pl-6 text-gray-300 mb-8">
            <li><strong>Frontend:</strong> React.js + Next.js</li>
            <li><strong>Backend:</strong> Node.js + Next.js API Routes</li>
            <li><strong>Database:</strong> MongoDB with Mongoose</li>
            <li><strong>Styling:</strong> Tailwind CSS</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-green-400">📬 Contact Us</h2>
          <p className="text-gray-300">
            Have feedback or suggestions? We'd love to hear from you!<br/>
            Email us at <a href="mailto:support@sdms.com" className="text-blue-400">support@sdms.com</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;