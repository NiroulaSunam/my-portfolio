// .png icons import for links 
import { FaLinkedin, FaGithub } from "react-icons/fa";  // From FontAwesone Brands
import { IoMail } from 'react-icons/io5';  //Ionicons for Mail

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F4] text-[#262626] p-8 md:p-24">
      {/* */}

      {/* Header and Navigation */}
      <nav className="flex justify-between items-center mb-24">
        <h1 className="text-xl font-bold tracking-tighter">SUNAM.DEV</h1>
        <div className="flex gap-6">
          <FaGithub className="w-5 h-5 curosor-pointer hover:text-orange-600 transition" />
          <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-orange-600 transition" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-2xl">
        <h2 className="text-lg text-stone-600 mb-8 leading-relaxed">
          Building software with <span className="text-orange-600">precision. </span>
        </h2>
        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
          I bridge the gap between complex project management and modern full-stack code. 
          Formerly a Document COntroller, now a Full Stack Developer focused on clean architecture and user-centric products. 
        </p>
      </section>
    </main>
  );
}
