'use client';

import React from 'react';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BorderButton } from '@/components/ui/tailwindcss-buttons';

interface SubmitProjectFormProps {
  onClose?: () => void;
}

const SubmitProjectForm = ({ onClose }: SubmitProjectFormProps) => {
  return (
    <form
      className="my-8 space-y-6"
      action="https://formspree.io/f/{your-form-id}"
      method="POST"
    >
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="firstname">First Name*</Label>
          <Input
            id="firstname"
            name="firstname"
            placeholder="First Name"
            type="text"
            required
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="lastname">Last Name*</Label>
          <Input
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            type="text"
            required
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="phone">Phone Number*</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Phone Number"
            type="tel"
            required
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company Name*</Label>
        <Input
          id="company"
          name="company"
          placeholder="Company Name"
          type="text"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-overview">Project Overview*</Label>
        <Textarea
          id="project-overview"
          name="project-overview"
          placeholder="What are the main reasons you are considering a voice agent? What are the most important functions the Voice Agent would do to help your business?"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline-budget">Timeline and Budget*</Label>
        <Textarea
          id="timeline-budget"
          name="timeline-budget"
          placeholder="When would you like to start the implementation of the AI voice assistant? What is your budget for setting up the AI voice assistant?"
          required
        />
      </div>

      <div className="flex justify-center">
        <BorderButton label="Submit" type="submit" />
      </div>
    </form>
  );
};

export default SubmitProjectForm;
