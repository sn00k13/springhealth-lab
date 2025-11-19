'use client'

import { Button } from '@/components/ui/Button';
import { FaHandsHelping } from 'react-icons/fa';

export default function BloodBankPage() {
  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-[600px] flex items-center justify-center text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/blood-bank.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Overlay is now part of the background-image gradient */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Trusted Blood Banking Solutions</h1>
          <div className="prose prose-lg text-blue-100 max-w-3xl mx-auto text-left space-y-6">
            <p>
              SpringQuest Health Management Limited is dedicated to ensuring that safe, well-screened, and readily available blood products reach the patients who need them most. Our blood banking service combines advanced technology with strict quality control to guarantee reliable transfusion support for emergencies, surgeries, and ongoing medical care.
            </p>
            <p>
              We maintain a robust donor network, carry out comprehensive testing on every unit collected, and store blood under optimal conditions to preserve its integrity. Our team works around the clock to supply healthcare facilities with timely, life-saving blood products.
            </p>
            <p>
              At SpringQuest, we believe that access to safe blood is essential to quality healthcare. Through our commitment to excellence and community partnership, we help save lives—one donation at a time.
            </p>
          </div>
          <div className="mt-12">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = 'tel:+234-803-334-2918'}
            >
              <FaHandsHelping className="mr-2" /> Become a Blood Donor Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
