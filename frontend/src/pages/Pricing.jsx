import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ArrowRight, 
  Users, 
  Shield, 
  Zap, 
  Star,
  Building2,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Pricing = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
  {
    name: 'Free Tier',
    icon: User,
    price: '₹0',
    period: 'forever',
    description: 'Perfect for students just getting started with verified opportunities',
    popular: false,
    features: [
      { text: 'Unlimited free verification requests', included: true },
      { text: 'Basic profile + badges', included: true },
      { text: 'Public verified resume link', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Priority verification', included: false },
      { text: 'Badge customization', included: false },
    ],
    buttonText: 'Get Started Free',
    buttonStyle: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  },
  {
    name: 'Pro Student',
    icon: Zap,
    price: '₹399',
    period: 'per month',
    description: 'For ambitious students who want faster verification and more visibility',
    popular: true,
    features: [
      { text: 'Priority verification queue', included: true },
      { text: 'Custom badge designs', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'Email & chat support', included: true },
      { text: 'Enhanced profile features', included: true }
    ],
    buttonText: 'Start Free Trial',
    buttonStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
  },
  {
    name: 'Company Plan',
    icon: Building2,
    price: '₹2,999',
    period: 'per month',
    description: 'For startups and companies hiring interns or freshers',
    popular: false,
    features: [
      { text: 'Verify applicant claims instantly', included: true },
      { text: 'Bulk candidate verification requests', included: true },
      { text: 'Access verified talent pool', included: true },
      { text: 'Company dashboard for hiring', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access for HR tools', included: true }
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'border-2 border-green-600 text-green-600 hover:bg-green-50'
  },
  {
    name: 'Institution Plan',
    icon: Building2,
    price: '₹1,499',
    period: 'per month',
    description: 'Designed for colleges, training institutes, and universities',
    popular: false,
    features: [
      { text: 'Bulk student verification', included: true },
      { text: 'Institution-level dashboard', included: true },
      { text: 'API access for integrations', included: true },
      { text: 'Dedicated account support', included: true },
      { text: 'White-label & branding options', included: true },
      { text: 'Custom analytics & reports', included: true }
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
  }
];

  

  const faqs = [
    {
      question: 'Do students always have a free option?',
      answer: 'Yes! We believe in making credential verification accessible to all students. Our free plan includes 3 verification requests and basic profile features, which is perfect for most students getting started.'
    },
    {
      question: 'How does OfferCred ensure documents are safe?',
      answer: 'We use bank-level encryption and security measures to protect all documents. Your data is encrypted both in transit and at rest, and we never share your personal information with third parties without your explicit consent.'
    },
    {
      question: 'Can my college partner with OfferCred?',
      answer: 'Absolutely! We work with educational institutions to streamline the verification process for their students. Our Institution Plan includes bulk verification tools, API access, and dedicated support to make integration seamless.'
    },
    {
      question: 'What happens if I exceed my free plan limits?',
      answer: 'If you need more than 3 verifications, you can easily upgrade to our Starter Plan for unlimited verifications and additional features. You can also purchase individual verifications if you prefer not to subscribe.'
    },
    {
      question: 'Is there a student discount available?',
      answer: 'Our pricing is already student-friendly! Plus, we offer special discounts for students from partner institutions. Contact us with your .edu email to learn about available discounts.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your account will remain active until the end of your current billing period.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Simple, transparent pricing for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              students & institutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start for free, upgrade when you need more verifications and features. 
            No hidden fees, no surprises.
          </p>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular 
                    ? 'border-blue-500 ring-4 ring-blue-100' 
                    : 'border-gray-200 hover:border-gray-300'
                } w-full mx-auto px-10 py-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                        : 'bg-gray-100'
                    }`}>
                      <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onNavigate('auth')}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about OfferCred pricing and features.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to verify your credentials?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who trust OfferCred to showcase their achievements. 
            Start with our free plan today.
          </p>
          <button
            onClick={() => onNavigate('auth')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;