import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

function ContactSection() {
  return (
    <div className="bg-black py-20">
      <div className="text-center mb-16">
        <h2 className="text-white text-4xl font-bold font-josefin">Visit</h2>
        <p className="text-[#FFA13B] text-4xl font-bold font-josefin">
          Our Gym
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
        <div className="bg-gray-900 rounded-xl p-8">
          <h3 className="text-[#FFA13B] text-2xl font-josefin font-bold mb-4">
            Contact Info
          </h3>
          <div className="space-y-4">
            <p className="text-white font-josefin flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-[#FFA13B]" />
              123 Fitness St, Workout City
            </p>
            <p className="text-white font-josefin flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2 text-[#FFA13B]" />
              (555) 123-4567
            </p>
            <p className="text-white font-josefin flex items-center">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-[#FFA13B]" />
              info@ultrafitness.com
            </p>
            <p className="text-white font-josefin flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-[#FFA13B]" />
              Mon-Fri: 5AM - 11PM | Sat-Sun: 7AM - 9PM
            </p>
          </div>
        </div>

        <div className="h-96 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.6581455644023!2d72.66417227561065!3d22.99959507918994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8739a65ca44f%3A0xe017b3d46d241fa3!2sTHE%20ULTRA%20FITNESS%20GYM!5e0!3m2!1sen!2sin!4v1743709034167!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ultra Fitness Gym Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
