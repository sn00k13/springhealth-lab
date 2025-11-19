'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const testOptions = [
  'Complete Blood Count (CBC)',
  'Basic Metabolic Panel',
  'Comprehensive Metabolic Panel',
  'Lipid Panel',
  'Thyroid Stimulating Hormone (TSH)',
  'Hemoglobin A1C',
  'Vitamin D, 25-Hydroxy',
  'Urinalysis',
  'Liver Function Test',
  'Kidney Function Test',
  'Electrolyte Panel',
  'Prothrombin Time (PT/INR)',
  'PSA (Prostate-Specific Antigen)',
  'Pregnancy Test',
  'STD Panel',
  'Allergy Testing',
  'Food Sensitivity Test',
  'Hormone Testing',
  'Toxicology Screen',
  'Other (please specify)'
];

export default function QuotePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceProvider: '',
    insuranceId: '',
    selectedTests: [] as string[],
    otherTest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      let selectedTests = [...prev.selectedTests];
      if (checked) {
        selectedTests.push(value);
      } else {
        selectedTests = selectedTests.filter(test => test !== value);
      }
      return {
        ...prev,
        selectedTests
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare email content
      const emailContent = `
        <h2>New Quote Request</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        
        <h3>Insurance Information</h3>
        <p><strong>Provider:</strong> ${formData.insuranceProvider || 'Not specified'}</p>
        <p><strong>Insurance ID:</strong> ${formData.insuranceId || 'Not provided'}</p>
        
        <h3>Requested Tests</h3>
        <ul>
          ${formData.selectedTests.map(test => `<li>${test}</li>`).join('')}
          ${formData.otherTest ? `<li>Other: ${formData.otherTest}</li>` : ''}
        </ul>
        
        ${formData.message ? `
        <h3>Additional Information</h3>
        <p>${formData.message}</p>
        ` : ''}
      `;

      // Send email using the email utility
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'ugo@bubblebarrel.dev',
          subject: `New Quote Request from ${formData.firstName} ${formData.lastName}`,
          html: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      // Show success message
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        insuranceProvider: '',
        insuranceId: '',
        selectedTests: [],
        otherTest: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const insuranceProviders = [
    'Aetna',
    'Blue Cross Blue Shield',
    'Cigna',
    'UnitedHealthcare',
    'Humana',
    'Kaiser Permanente',
    'Medicare',
    'Medicaid',
    'Tricare',
    'Other'
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-700 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/quote.jpg"
            alt="Laboratory equipment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/70" />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get a Quote
          </h1>
          <p className="mt-2 text-lg text-blue-100">
            Request a quote for our laboratory services
          </p>
        </div>
      </div>

      {/* Quote Form */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {isSuccess ? (
              <div className="rounded-md bg-green-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Request Submitted</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Thank you for your request. We&apos;ll review your information and get back to you with a quote shortly.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                {/* Personal Information */}
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Please provide your personal details so we can contact you with your quote.
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="h-10 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="h-10 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="h-10 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-10 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance Information */}
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Insurance Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Providing insurance information helps us give you a more accurate quote.
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700">
                        Insurance Provider
                      </label>
                      <div className="mt-1">
                        <select
                          id="insuranceProvider"
                          name="insuranceProvider"
                          value={formData.insuranceProvider}
                          onChange={handleChange}
                          className="h-10 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md bg-white"
                        >
                          <option value="">Select your insurance provider</option>
                          {insuranceProviders.map((provider) => (
                            <option key={provider} value={provider}>
                              {provider}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="insuranceId" className="block text-sm font-medium text-gray-700">
                        Insurance ID/Member Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="insuranceId"
                          id="insuranceId"
                          value={formData.insuranceId}
                          onChange={handleChange}
                          className="h-10 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Selection */}
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Select Tests</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select the tests you&apos;re interested in. You can select multiple tests.
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-y 4 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {testOptions.map((test, index) => (
                          <div key={index} className="relative flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id={`test-${index}`}
                                name="selectedTests"
                                type="checkbox"
                                value={test}
                                checked={formData.selectedTests.includes(test)}
                                onChange={handleCheckboxChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor={`test-${index}`} className="font-medium text-gray-700">
                                {test}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {formData.selectedTests.includes('Other (please specify)') && (
                        <div className="mt-4">
                          <label htmlFor="otherTest" className="block text-sm font-medium text-gray-700">
                            Please specify the test
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="otherTest"
                              id="otherTest"
                              value={formData.otherTest}
                              onChange={handleChange}
                              className="h-10 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Is there anything else we should know about your request?
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="space-y-4">
                      <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                              Message
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="h-24 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Any special requirements or additional information..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Request Quote'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 pt-10 border-t border-gray-200">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                  {[
                    {
                      question: 'How long does it take to receive a quote?',
                      answer: 'We typically respond to quote requests within 1-2 business days with a detailed estimate.'
                    },
                    {
                      question: 'Do you accept my insurance?',
                      answer: 'We work with most major insurance providers. Please provide your insurance details in the form, and we\'ll verify your coverage.'
                    },
                    {
                      question: 'What if I need a test that\'s not listed?',
                      answer: 'Select "Other" from the test list and specify the test you need. We offer a wide range of laboratory services and can accommodate most requests.'
                    },
                    {
                      question: 'Is there a cost for the quote?',
                      answer: 'No, our quotes are completely free with no obligation. We provide transparent pricing with no hidden fees.'
                    },
                    {
                      question: 'How accurate is the quote?',
                      answer: 'Our quotes are based on standard pricing. Final costs may vary based on your specific insurance coverage and any additional tests that may be required.'
                    },
                    {
                      question: 'What if I need to modify my request?',
                      answer: 'You can contact us at any time to modify your test request or ask questions about your quote.'
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
