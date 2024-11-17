'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/input';
import { useState } from 'react';
import { BorderButton } from './ui/tailwindcss-buttons';

export default function SubmitProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    website: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://api.hsforms.com/submissions/v3/integration/submit/145076170/fb941f0f-22c0-4db3-8916-c11363b53c02',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              {
                name: 'firstname',
                value: formData.firstname,
              },
              {
                name: 'lastname',
                value: formData.lastname,
              },
              {
                name: 'email',
                value: formData.email,
              },
              {
                name: 'company',
                value: formData.company,
              },
              {
                name: 'website',
                value: formData.website,
              },
              {
                name: 'message',
                value: formData.message,
              },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        website: '',
        message: '',
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstname">First name</Label>
          <Input
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastname">Last name</Label>
          <Input
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          placeholder="Enter your company name"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          placeholder="Enter your website URL"
          value={formData.website}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <BorderButton
        type="submit"
        label={isSubmitting ? 'Submitting...' : 'Submit'}
        onClick={(e) => {
          if (isSubmitting) {
            e.preventDefault();
          }
        }}
      />
    </form>
  );
}
