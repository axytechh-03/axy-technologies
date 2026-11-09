"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Button } from "@/components/ui/Button";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: "",
    conditionalServiceDetails: "",
    message: "",
  });

  const [phoneError, setPhoneError] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>(
    "Prototype form: submitting opens a pre-filled email draft."
  );

  const isConditionalVisible =
    formData.service === "Multiple Services" || formData.service === "Not Sure Yet";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, phone: value }));
    if (phoneError) setPhoneError("");
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newService = e.target.value;
    setFormData((prev) => ({
      ...prev,
      service: newService,
      // Clear conditional details if switching away from Multiple Services / Not Sure Yet
      conditionalServiceDetails:
        newService === "Multiple Services" || newService === "Not Sure Yet"
          ? prev.conditionalServiceDetails
          : "",
    }));
  };

  const validatePhone = (phone: string, countryCode: string): boolean => {
    const clean = phone.trim().replace(/[\s\-().]/g, "");

    // Phone number is optional: if empty, valid!
    if (!clean) {
      setPhoneError("");
      return true;
    }

    if (countryCode === "+91") {
      // Indian mobile numbers: 10 digits starting with 6, 7, 8, 9
      const indiaRegex = /^[6-9]\d{9}$/;
      if (!indiaRegex.test(clean)) {
        setPhoneError("Please enter a valid 10-digit Indian phone number (e.g., 98765 43210).");
        return false;
      }
    } else {
      // International phone number validation (7 to 15 digits)
      const intlRegex = /^\d{7,15}$/;
      if (!intlRegex.test(clean)) {
        setPhoneError("Please enter a valid phone number (7 to 15 digits).");
        return false;
      }
    }

    setPhoneError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePhone(formData.phone, formData.countryCode)) {
      return;
    }

    const cleanPhone = formData.phone.trim().replace(/[\s\-().]/g, "");
    const fullPhone = cleanPhone ? `${formData.countryCode} ${cleanPhone}` : "Not provided";

    const subject = encodeURIComponent(
      `Project enquiry — AXY Technologies (${formData.name})`
    );

    let bodyText = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${fullPhone}\nService: ${formData.service}\n`;

    if (isConditionalVisible && formData.conditionalServiceDetails.trim()) {
      bodyText += `\nService Requirements:\n${formData.conditionalServiceDetails.trim()}\n`;
    }

    bodyText += `\nProject Details:\n${formData.message.trim()}`;

    const body = encodeURIComponent(bodyText);

    setFormMessage("Opening your email client with the enquiry details…");
    window.location.href = `mailto:axy.techh@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <span className="eyebrow">Have a project in mind?</span>
          <h2>Let&apos;s make your next move meaningful.</h2>
          <p className="contact-copy">
            Tell us a little about your business and what you&apos;re looking to achieve.
            We&apos;ll start with a conversation and help you find the right way forward.
          </p>

          <div className="contact-details">
            <div>
              <span aria-hidden="true">✉</span>{" "}
              <a
                href="mailto:axy.techh@gmail.com"
                className="hover:text-[#82a5ff] transition-colors underline-offset-4 hover:underline"
              >
                axy.techh@gmail.com
              </a>
            </div>

            <div>
              <span aria-hidden="true" className="inline-flex items-center justify-center align-middle mr-2.5">
                <InstagramIcon className="w-3.5 h-3.5 text-[#8290ac]" />
              </span>
              <a
                href="https://www.instagram.com/axy_technologies/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#82a5ff] transition-colors inline-flex items-center gap-1.5"
                aria-label="AXY Technologies on Instagram (opens in new tab)"
              >
                <span>@axy_technologies</span>
                <span className="arrow text-xs">↗</span>
              </a>
            </div>

            <div>
              <span aria-hidden="true">⌖</span> Coimbatore, Tamil Nadu, India
            </div>

            <div>
              <span aria-hidden="true">↗</span> Websites · Marketing · SEO · Creative
            </div>
          </div>
        </div>

        {/* Refined Contact Form Container */}
        <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate={false}>
          {/* Row 1: Your Name & Email Address */}
          <div className="form-row two-col">
            <div className="field">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Phone Number (Optional) */}
          <div className="field">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <div className="phone-input-row">
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                aria-label="Country Code"
                className="phone-code-select cursor-pointer"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="98765 43210"
                autoComplete="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="phone-number-input"
              />
            </div>
            {phoneError && (
              <span className="text-[11px] text-[#ff7b72] mt-1.5 block font-medium">
                {phoneError}
              </span>
            )}
          </div>

          {/* Row 3: What Do You Need? (Service Selection) */}
          <div className="field">
            <label htmlFor="service">What Do You Need?</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleServiceChange}
              required
              className="cursor-pointer"
            >
              <option value="">Choose a service</option>
              <option value="Website development">Website development</option>
              <option value="Digital marketing / Meta Ads">Digital marketing / Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="SEO optimization">SEO optimization</option>
              <option value="Branding and creative">Branding and creative</option>
              <option value="Multiple Services">Multiple Services</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
          </div>

          {/* Row 4: Conditional Requirements Textarea (When Applicable) */}
          <AnimatePresence>
            {isConditionalVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.2, 0.75, 0.25, 1] }}
                className="field overflow-hidden"
              >
                <label htmlFor="conditionalServiceDetails">
                  Tell us more about what you&apos;re looking for
                </label>
                <textarea
                  id="conditionalServiceDetails"
                  name="conditionalServiceDetails"
                  placeholder="Briefly describe your requirements, the services you're interested in, or what you would like us to help you with..."
                  value={formData.conditionalServiceDetails}
                  onChange={handleChange}
                  required={isConditionalVisible}
                  rows={3}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Row 5: Tell Us About Your Project */}
          <div className="field">
            <label htmlFor="message">Tell Us About Your Project</label>
            <textarea
              id="message"
              name="message"
              placeholder="A little about your business and goals..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          {/* Row 6: Submit Button */}
          <div className="pt-1">
            <Button variant="primary" type="submit" className="w-full sm:w-auto">
              Prepare enquiry
            </Button>
          </div>

          <div className="form-message" id="formMessage" aria-live="polite">
            {formMessage}
          </div>
        </form>
      </div>
    </section>
  );
};
