import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-6">
          <h1 className="text-white text-3xl font-bold">Terms of Service</h1>
          <p className="text-blue-100 mt-2">Last Updated: April 14, 2025</p>
        </div>

        <div className="p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Welcome to CarRental.com. These Terms of Service ("Terms") govern your use of our website, mobile 
              application, and services (collectively, the "Service"). By accessing or using our Service, you agree 
              to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.
            </p>
            <p className="text-gray-600">
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and 
              disclose information that results from your use of our web pages. Please read our{' '}
              <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Rental Requirements</h2>
            <p className="text-gray-600 mb-4">
              2.1. <span className="font-medium">Minimum Age:</span> You must be at least 21 years of age to rent a vehicle through our Service. 
              For certain premium or specialty vehicles, the minimum age requirement may be 25 years.
            </p>
            <p className="text-gray-600 mb-4">
              2.2. <span className="font-medium">Valid Driver's License:</span> You must possess a valid driver's license that has been in effect for at least 
              one year. International customers must provide a valid license from their country of residence along with a passport.
            </p>
            <p className="text-gray-600 mb-4">
              2.3. <span className="font-medium">Payment Methods:</span> A valid credit or debit card in the renter's name is required at the time of pickup. 
              The card must have sufficient available funds to cover the rental cost and security deposit.
            </p>
            <p className="text-gray-600">
              2.4. <span className="font-medium">Insurance:</span> Basic insurance coverage is included in your rental. Additional coverage options 
              are available for purchase. You may be held liable for damages not covered by the selected insurance plan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Reservations and Cancellations</h2>
            <p className="text-gray-600 mb-4">
              3.1. <span className="font-medium">Reservations:</span> All reservations are subject to vehicle availability. We reserve the right 
              to substitute a vehicle of similar or higher class if your selected vehicle is unavailable.
            </p>
            <p className="text-gray-600 mb-4">
              3.2. <span className="font-medium">Confirmation:</span> A confirmed reservation holds your vehicle for up to 2 hours after the 
              scheduled pickup time, after which we may rent the vehicle to another customer.
            </p>
            <p className="text-gray-600 mb-4">
              3.3. <span className="font-medium">Cancellation Policy:</span> Cancellations made at least 48 hours before the scheduled pickup time 
              will receive a full refund. Cancellations made between 24-48 hours before pickup will incur a fee of 25% of the total rental cost. 
              Cancellations made less than 24 hours before pickup or no-shows will be charged the full rental amount.
            </p>
            <p className="text-gray-600">
              3.4. <span className="font-medium">Modifications:</span> Reservation modifications are subject to availability and may result in 
              price adjustments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Vehicle Use</h2>
            <p className="text-gray-600 mb-4">
              4.1. <span className="font-medium">Authorized Drivers:</span> Only individuals listed on the rental agreement may operate the vehicle. 
              Additional drivers must be registered and meet our eligibility requirements.
            </p>
            <p className="text-gray-600 mb-4">
              4.2. <span className="font-medium">Restricted Uses:</span> Vehicles may not be used:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-600">
              <li>For any illegal purpose or to transport illegal substances</li>
              <li>To push or tow any vehicle or trailer</li>
              <li>For commercial purposes unless specifically authorized</li>
              <li>Off-road or on unpaved roads</li>
              <li>In drag races, speed tests, or competitions</li>
              <li>By drivers under the influence of alcohol, drugs, or other intoxicants</li>
              <li>Outside the geographical boundaries specified in your rental agreement</li>
            </ul>
            <p className="text-gray-600">
              4.3. <span className="font-medium">Mileage Limitations:</span> Your rental may include a limited number of miles/kilometers. 
              Additional charges will apply for exceeding this limit as specified in your rental agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Fuel Policy</h2>
            <p className="text-gray-600 mb-4">
              5.1. <span className="font-medium">Full-to-Full:</span> Unless otherwise specified, vehicles are provided with a full tank of fuel 
              and must be returned with a full tank. Failure to refill the tank will result in a refueling charge at our prevailing rate, 
              which exceeds standard market fuel prices.
            </p>
            <p className="text-gray-600">
              5.2. <span className="font-medium">Prepaid Fuel Option:</span> We offer a prepaid fuel option that allows you to pay for a full tank 
              of fuel at the time of rental. With this option, you may return the vehicle with any amount of fuel without incurring additional charges.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Returns and Extensions</h2>
            <p className="text-gray-600 mb-4">
              6.1. <span className="font-medium">Return Time:</span> Vehicles must be returned on the date and time specified in your rental agreement. 
              Late returns will incur additional charges equivalent to the daily rate plus a late fee.
            </p>
            <p className="text-gray-600 mb-4">
              6.2. <span className="font-medium">Early Returns:</span> No refunds are issued for vehicles returned earlier than the scheduled return date.
            </p>
            <p className="text-gray-600">
              6.3. <span className="font-medium">Extensions:</span> Rental extensions must be requested at least 24 hours before the scheduled return time 
              and are subject to availability and additional charges.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Damages and Liability</h2>
            <p className="text-gray-600 mb-4">
              7.1. <span className="font-medium">Vehicle Inspection:</span> You are responsible for inspecting the vehicle at pickup and reporting any 
              existing damage. Any damage not reported at pickup will be considered to have occurred during your rental period.
            </p>
            <p className="text-gray-600 mb-4">
              7.2. <span className="font-medium">Accidents:</span> In the event of an accident, you must:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-600">
              <li>Notify local authorities immediately</li>
              <li>Obtain a police report</li>
              <li>Inform our customer service within 24 hours</li>
              <li>Complete an accident report form</li>
              <li>Not admit fault or liability</li>
            </ul>
            <p className="text-gray-600">
              7.3. <span className="font-medium">Liability:</span> You are responsible for all damages to the vehicle during your rental period 
              to the extent not covered by insurance. This includes, but is not limited to, damages from accidents, theft, vandalism, 
              weather events, and improper use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Account Security</h2>
            <p className="text-gray-600 mb-4">
              8.1. <span className="font-medium">Account Creation:</span> When you create an account with us, you must provide accurate, 
              complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in 
              immediate termination of your account.
            </p>
            <p className="text-gray-600 mb-4">
              8.2. <span className="font-medium">Account Security:</span> You are responsible for safeguarding the password used to access 
              our Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
            </p>
            <p className="text-gray-600">
              8.3. <span className="font-medium">Unauthorized Use:</span> You must notify us immediately upon becoming aware of any breach 
              of security or unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Modifications to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the new Terms 
              on this page and updating the "Last Updated" date. Your continued use of the Service after such modifications will constitute 
              your acknowledgment and acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including 
              without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its 
              conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the 
              federal or state courts located in [Your City, State/Country].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-1">CarRental.com</p>
              <p className="text-gray-700 mb-1">123 Main Street</p>
              <p className="text-gray-700 mb-1">Anytown, CA 12345</p>
              <p className="text-gray-700 mb-1">Email: legal@carrental.com</p>
              <p className="text-gray-700">Phone: (555) 123-4567</p>
            </div>
          </section>

          <div className="mt-10 flex justify-center">
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;