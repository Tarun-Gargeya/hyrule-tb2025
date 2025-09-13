
import React from 'react';
import { useNavigate } from "react-router-dom";
// import LandingNavbar from '../components/layout/LandingNavbar';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  Star,
  TrendingUp,
  Award,
  Globe,
  Smartphone,
  
} from 'lucide-react';
const Homesmt = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Shield,
      title: 'Fake Job Offers',
      description: 'Students often post jobs or internships that don’t exist, creating confusion and false hope.'
    },
    {
      icon: Zap,
      title: 'No Easy Verification',
      description: 'There’s no simple way to check if an offer letter, internship, or freelance project is genuine.'
    },
    {
      icon: Users,
      title: 'Exaggerated Achievements',
      description: 'Some students exaggerate roles or inflate project experiences, making competition unfair.'
    },
    {
      icon: TrendingUp,
      title: 'Lost Trust in Communities',
      description: 'Fake claims harm credibility on LinkedIn, campus groups, and student networks.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Verified Opportunities' },
    { number: '100+', label: 'Partner Companies' },
    { number: '99%', label: 'Verification Accuracy' },
    { number: '50K+', label: 'Student Achievements' }
  ];

  const testimonials = [
    {
      name: 'Aarav Mehta',
      role: 'Engineering Student',
      content: 'OfferCred gave me a verified badge for my internship. Recruiters now trust my profile more than ever!',
      rating: 5
    },
    {
      name: 'Priya Singh',
      role: 'Campus Ambassador',
      content: 'No more fake claims in our student group. OfferCred makes it easy to see who really got the offer.',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Recruiter',
      content: 'I can finally filter genuine candidates with verified badges. This is a game changer for hiring.',
      rating: 5
    } 
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <div className="mb-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight drop-shadow-sm">
              <span className="block">Show the World</span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-4xl md:text-6xl font-black mt-2">You’re Verified.</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto font-medium">
              Get real, trusted badges for your offers and internships. No more fake claims—just proof.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-16 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-14 h-14 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Stats Section */}

  <section id="stats" className="py-16 bg-white border-t border-gray-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fact 1 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-lg text-gray-800 font-semibold mb-2">
              A HirePro survey in India found <span className="text-blue-700 font-bold">85%</span> of job seekers have made false claims on their resumes, using templates, professional resume writers, AI tools, etc.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-500">ABP Live</span>
            <span className="bg-blue-200 text-blue-800 text-xs font-semibold rounded px-2 py-0.5">+2</span>
            <span className="text-xs text-gray-500">Moneycontrol</span>
            <span className="bg-blue-200 text-blue-800 text-xs font-semibold rounded px-2 py-0.5">+2</span>
          </div>
        </div>
        {/* Fact 2 */}
        <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-lg text-gray-800 font-semibold mb-2">
              Another study found that <span className="text-indigo-700 font-bold">70%</span> of workers admit to lying on their resumes, including exaggerating job responsibilities, dates, and roles.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-500">Forbes</span>
          </div>
        </div>
        {/* Fact 3 */}
        <div className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-6 shadow-sm flex flex-col justify-between md:col-span-2">
          <div>
            <p className="text-lg text-gray-800 font-semibold mb-2">
              In India, a KPMG report said that across all levels, up to <span className="text-purple-700 font-bold">two-thirds</span> of applicants had discrepancies in their employment history.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-500">The Economic Times</span>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Features Section */}
  <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why OfferCred?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make student achievements trustworthy, transparent, and verifiable for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
  <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your achievements verified and visible in three simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Claim Your Opportunity
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Submit your job offer, internship, or freelance project for verification. No more fake claims—just real achievements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get Verified
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our system checks with companies and partners to verify your claim. Only genuine opportunities get the badge.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Show Off Your Badge
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Display your verified badge on your profile. Recruiters and peers can instantly see your real, validated achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students and recruiters who trust OfferCred for real, verified opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Verified?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students and recruiters building a culture of trust with OfferCred. It's free, fast, and secure.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg mr-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">OfferCred</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The trusted platform for verifying student opportunities. We help you prove your achievements and build real credibility.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Smartphone className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 OfferCred. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homesmt;
