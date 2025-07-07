"use client";

import BlogPostLayout from '../components/BlogPostLayout';

// Define metadata statically to avoid client/server mismatch
const metadata = {
  title: "Getting Started with AxylOS Development",
  author: "John Developer",
  date: "2024-01-10",
  readTime: "8 min read",
  category: "Development"
};

export default function BlogPostPage() {
  return (
    <BlogPostLayout
      title={metadata.title}
      author={metadata.author}
      date={metadata.date}
      readTime={metadata.readTime}
      category={metadata.category}
    >
      <h2>Why Contribute to AxylOS?</h2>
      <ul>
        <li>Be part of a vibrant, friendly community</li>
        <li>Help shape the future of a beautiful Arch-based Linux distribution</li>
        <li>Learn and grow your skills with real-world projects</li>
      </ul>

      <h2>Prerequisites</h2>
      <p>Before you begin contributing to AxylOS, make sure you have:</p>
      <ul>
        <li>Basic familiarity with Linux and Git</li>
        <li>A GitHub account</li>
        <li>Enthusiasm to learn and collaborate!</li>
      </ul>

      <h2>Setting Up Your Development Environment</h2>
      <p>
        To get started with AxylOS development, you&apos;ll need to set up your environment properly.
        Follow these steps to prepare your system:
      </p>

      <h3>1. Install Required Tools</h3>
      <p>
        First, ensure you have the following tools installed on your system:
      </p>
      <pre><code>
sudo pacman -S base-devel git vim
      </code></pre>

      <h3>2. Clone the Repository</h3>
      <p>
        Clone the AxylOS repository to your local machine:
      </p>
      <pre><code>
git clone https://github.com/axyl-os/axyl-iso.git
cd axyl-iso
      </code></pre>

      <h3>3. Build Environment Setup</h3>
      <p>
        Set up your build environment by running the initialization script:
      </p>
      <pre><code>
./setup.sh
      </code></pre>

      <h2>Making Your First Contribution</h2>
      <p>
        Ready to make your first contribution? Here&apos;s how to get started:
      </p>

      <ol>
        <li>Fork the repository on GitHub</li>
        <li>Create a new branch for your feature or bug fix</li>
        <li>Make your changes and commit them with descriptive messages</li>
        <li>Push your changes to your fork</li>
        <li>Submit a pull request to the main repository</li>
      </ol>

      <p className="text-center font-medium mt-8">
        Join us on <a href="https://discord.axyl.org">Discord</a> for more help and to connect with other contributors!
      </p>
    </BlogPostLayout>
  );
}
