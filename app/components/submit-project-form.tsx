'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/input';
import { useState } from 'react';
import { BorderButton } from './ui/tailwindcss-buttons';

export interface SubmitProjectFormProps {
  onClose?: () => void;
}

export default function SubmitProjectForm({ onClose }: SubmitProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    company: '',
    project_objectives: '',
    timeline: '',
    project_budget: '',
    monthly_revenue: '',
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
        'https://api.hsforms.com/submissions/v3/integration/submit/5be8fe3d-547c-4ce6-b2ad-c157aa7b021d',
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
                objectId: 'field-firstname',
                key: 'firstname',
              },
              {
                name: 'lastname',
                value: formData.lastname,
                objectId: 'field-lastname',
                key: 'lastname',
              },
              {
                name: 'phone',
                value: formData.phone,
                objectId: 'field-phone',
                key: 'phone',
              },
              {
                name: 'email',
                value: formData.email,
                objectId: 'field-email',
                key: 'email',
              },
              {
                name: 'company',
                value: formData.company,
                objectId: 'field-company',
                key: 'company',
              },
              {
                name: 'project_objectives',
                value: formData.project_objectives,
                objectId: 'field-project',
                key: 'project_objectives',
              },
              {
                name: '0-2/timeline',
                value: formData.timeline,
                objectId: 'field-timeline',
                key: 'timeline',
              },
              {
                name: '0-2/project_budget',
                value: formData.project_budget,
                objectId: 'field-budget',
                key: 'project_budget',
              },
              {
                name: '0-2/monthly_revenue',
                value: formData.monthly_revenue,
                objectId: 'field-revenue',
                key: 'monthly_revenue',
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setIsSubmitted(true);
      onClose?.();
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
            <Label htmlFor="firstname">First Name *</Label>
            <Input
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last Name *</Label>
            <Input
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company name *</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project_objectives">Project Overview *</Label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Describe your business and use case for an AI voice assistant.
            Please be as detailed as possible. (The more detail, the better to
            get the most out of our call)
          </p>
          <Textarea
            id="project_objectives"
            name="project_objectives"
            value={formData.project_objectives}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="timeline">
            What is your ideal timeline for implementing your Voice Agent? *
          </Label>
          <Input
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project_budget">Budget *</Label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            What is your budget for this project?
          </p>
          <Input
            id="project_budget"
            name="project_budget"
            value={formData.project_budget}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="monthly_revenue">Monthly Revenue *</Label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            How much monthly revenue is your team generating?
          </p>
          <Input
            id="monthly_revenue"
            name="monthly_revenue"
            value={formData.monthly_revenue}
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
