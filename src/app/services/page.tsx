import { BeakerIcon, HeartIcon, UserGroupIcon, ShieldCheckIcon, DocumentTextIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

// Import the image with the correct path
const labTeamImage = '/images/our-services.jpg';

const services = [
  {
    name: 'Clinical Chemistry',
    description: 'Comprehensive testing of bodily fluids to assess health status, organ function, and disease states.',
    icon: BeakerIcon,
    tests: [
      'Basic Metabolic Panel',
      'Comprehensive Metabolic Panel',
      'Lipid Profile',
      'Liver Function Tests',
      'Kidney Function Tests',
      'Electrolyte Panel',
      'Thyroid Function Tests'
    ]
  },
  {
    name: 'Hematology',
    description: 'Analysis of blood and blood-forming tissues to diagnose and monitor diseases.',
    icon: HeartIcon,
    tests: [
      'Complete Blood Count (CBC)',
      'Coagulation Tests',
      'Hemoglobin A1C',
      'Erythrocyte Sedimentation Rate (ESR)',
      'Reticulocyte Count',
      'Peripheral Blood Smear'
    ]
  },
  {
    name: 'Microbiology',
    description: 'Identification of microorganisms causing infections and their antibiotic susceptibility.',
    icon: UserGroupIcon,
    tests: [
      'Bacterial Cultures',
      'Fungal Cultures',
      'Urine Cultures',
      'Blood Cultures',
      'Stool Testing',
      'Antibiotic Sensitivity Testing'
    ]
  },
  {
    name: 'Immunology',
    description: 'Evaluation of the immune system and diagnosis of immunological disorders.',
    icon: ShieldCheckIcon,
    tests: [
      'Autoimmune Disease Testing',
      'Allergy Testing',
      'Immunoglobulin Levels',
      'Rheumatoid Factor',
      'ANA Testing',
      'Celiac Disease Testing'
    ]
  },
  {
    name: 'Molecular Diagnostics',
    description: 'Advanced testing of DNA and RNA to diagnose diseases and genetic conditions.',
    icon: ShieldCheckIcon,
    tests: [
      'COVID-19 Testing (PCR)',
      'Genetic Testing',
      'Oncology Testing',
      'Infectious Disease Panels',
      'Pharmacogenomics',
      'Prenatal Genetic Testing'
    ]
  },
  {
    name: 'Pathology',
    description: 'Examination of tissues, cells, and bodily fluids to diagnose disease.',
    icon: DocumentTextIcon,
    tests: [
      'Biopsy Evaluation',
      'Cytology',
      'Surgical Pathology',
      'Hematopathology',
      'Dermatopathology',
      'Cytogenetics'
    ]
  },
  {
    name: 'Blood Banking',
    description: 'Comprehensive blood collection, testing, and distribution services to ensure safe blood supply.',
    icon: HeartIconSolid,
    tests: [
      'Whole Blood Donation',
      'Platelet Donation',
      'Emergency Blood Supply',
      'Blood Typing',
      'Crossmatching',
      'Antibody Screening'
    ],
    link: '/blood'
  }
];

const specialPrograms = [
  {
    name: 'Wellness Packages',
    description: 'Comprehensive health screening packages tailored to different age groups and risk factors.'
  },
  {
    name: 'Corporate Health Checks',
    description: 'Customized health screening programs for businesses to keep their workforce healthy.'
  },
  {
    name: 'Travel Medicine',
    description: 'Pre-travel consultations and vaccinations for international travelers.'
  },
  {
    name: 'At-Home Testing',
    description: 'Convenient testing options that can be done in the comfort of your home.'
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
<div className="relative bg-white">
  {/* Background Image */}
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <Image
      src={labTeamImage}
      alt="Professional laboratory team"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-blue-900/30" /> {/* Subtle overlay */}
  </div>
  
  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
        Our Services
      </h1>
      <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
        Comprehensive laboratory testing services for accurate diagnosis and better healthcare outcomes.
      </p>
    </div>
  </div>
</div>

      {/* Main Services */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Laboratory Testing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We offer a wide range of laboratory services using state-of-the-art technology and following the highest standards of quality.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.name} className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
                    <div>
                      <span className={`rounded-lg inline-flex p-3 ${service.name === 'Blood Banking' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'} ring-4 ring-white`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-4 flex-grow">
                      <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                      <p className="mt-2 text-base text-gray-500">{service.description}</p>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Common {service.name === 'Blood Banking' ? 'Services' : 'Tests'} Include:</h4>
                        <ul className="mt-2 space-y-1">
                          {service.tests.map((test, index) => (
                            <li key={index} className="text-sm text-gray-500">• {test}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {service.link && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Link 
                          href={service.link}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Learn more about Blood Donation <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Special Programs */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Programs</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Special Health Programs
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Beyond standard testing, we offer specialized programs to meet your unique healthcare needs.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
              {specialPrograms.map((program, index) => (
                <div key={program.name} className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <span className="text-lg font-medium">{index + 1}</span>
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900">{program.name}</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to book a test?</span>
            <span className="block text-blue-600">Contact us today to schedule an appointment.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/book"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Book Now
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">FAQs</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Find answers to common questions about our laboratory services.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
              {[
                {
                  question: 'How do I prepare for my lab test?',
                  answer: 'Preparation depends on the specific test. Some tests require fasting for 8-12 hours, while others have no special requirements. You\'ll receive specific instructions when you book your appointment.'
                },
                {
                  question: 'How long does it take to get test results?',
                  answer: 'Most routine test results are available within 24-48 hours. Some specialized tests may take longer. We\'ll notify you as soon as your results are ready through our secure patient portal.'
                },
                {
                  question: 'Do I need a doctor\'s referral for lab tests?',
                  answer: 'Some tests require a doctor\'s referral, while others are available for direct access testing. Contact us to check if you need a referral for your specific test.'
                },
                {
                  question: 'What safety measures are in place?',
                  answer: 'We follow strict safety protocols including regular sanitization, personal protective equipment for staff, social distancing measures, and rigorous infection control procedures.'
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept most major insurance plans, credit/debit cards, HSA/FSA cards, and cash. Please contact us to verify if we accept your insurance.'
                },
                {
                  question: 'Can I get my results online?',
                  answer: 'Yes, we offer a secure patient portal where you can access your test results, track your health history, and communicate with our staff.'
                }
              ].map((faq, index) => (
                <div key={index} className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="text-base text-gray-500">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
