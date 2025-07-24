"use client";

import React, { useState } from 'react';
import { ContactProperties } from '../../types/builder';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  properties: ContactProperties;
  isSelected: boolean;
  onClick: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ properties, isSelected, onClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add logic to send the message
    console.log('New message:', formData);
    alert('Your message has been sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section
      className={`relative cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ 
        backgroundColor: properties.backgroundColor, 
        color: properties.textColor,
        height: properties.height || '600px',
        minHeight: properties.height || '600px',
      }}
      onClick={onClick}
    >
      <div className="container mx-auto px-4 w-full h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{properties.title}</h2>
            <p className="text-lg opacity-80">{properties.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="opacity-80">{properties.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="opacity-80">{properties.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="opacity-80">{properties.address}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {properties.showContactForm && (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      />
                    </div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                    <Textarea
                      name="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 resize-none"
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}
    </section>
  );
};

export default ContactSection; 