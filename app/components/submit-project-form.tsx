'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/input';
import { useState } from 'react';
import { BorderButton } from './ui/tailwindcss-buttons';

export default function SubmitProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    company: '',
    project_overview: '',
    timeline_budget: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              { name: 'firstname', value: formData.firstname, objectId: 'field-firstname' },
              { name: 'lastname', value: formData.lastname, objectId: 'field-lastname' },
              { name: 'phone', value: formData.phone, objectId: 'field-phone' },
              { name: 'email', value: formData.email, objectId: 'field-email' },
              { name: 'company', value: formData.company, objectId: 'field-company' },
              { name: 'project_objectives', value: formData.project_overview, objectId: 'field-project' },
              { name: 'timeline_and_budget', value: formData.timeline_budget, objectId: 'field-timeline' },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16 space-y-4">
        <h3 className="text-2xl font-semibold">
          Thanks for submitting your project idea.
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300">
          Alejo and Paige will get back to you within the next 48 hours. We look
          forward to exploring the possibility of collaboration with you!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-neutral-600 dark:text-neutral-300">
        Please provide as much detail about your use case and/or project idea.
        Once your submit, we&apos;ll reach out to you within 1 business day to
        schedule a follow up call and assess the viability of your project.
      </p>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First Name*</Label>
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
            <Label htmlFor="lastname">Last Name*</Label>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number*</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email*</Label>
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
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company name*</Label>
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
          <Label htmlFor="project_overview">PROJECT OVERVIEW:*</Label>
          <Textarea
            id="project_overview"
            name="project_overview"
            placeholder="What are the main reasons you are considering a voice agent?
What are the most important functions the Voice Agent would do to help your business?"
            value={formData.project_overview}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="timeline_budget">TIMELINE AND BUDGET:*</Label>
          <Textarea
            id="timeline_budget"
            name="timeline_budget"
            placeholder="When would you like to start the implementation of the AI voice assistant?
What is your budget for setting up the AI voice assistant?"
            value={formData.timeline_budget}
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
    </div>
  );
}
