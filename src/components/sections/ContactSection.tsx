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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [formLoadedAt, setFormLoadedAt] = useState<number>(() => Date.now());

  const isConditionalVisible =
    formData.service === "Multiple Services" || formData.service === "Not Sure Yet";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, phone: value }));
    if (phoneError) setPhoneError("");
    if (submitError) setSubmitError("");
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
    if (submitError) setSubmitError("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePhone(formData.phone, formData.countryCode)) {
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          service: formData.service,
          conditionalServiceDetails: formData.conditionalServiceDetails,
          message: formData.message,
          company_url: (formData as { company_url?: string }).company_url || "",
          form_loaded_at: formLoadedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmittedReference(data.reference);
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        service: "",
        conditionalServiceDetails: "",
        message: "",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again or email us directly at axy.techh@gmail.com.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedReference(null);
    setSubmitError("");
    setFormLoadedAt(Date.now());
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
        {submittedReference ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="contact-form text-center py-12 px-6 flex flex-col items-center justify-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#3563f520] border border-[#3563f540] text-[#76a1ff] flex items-center justify-center text-2xl mb-4 font-bold">
              ✓
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-2">
              Enquiry Received
            </h3>
            <p className="text-sm text-[#9cb0d8] max-w-md mx-auto mb-6 leading-relaxed">
              Thank you for reaching out to AXY Technologies. Our team has received your details
              and will review your project requirements promptly.
            </p>

            <div className="bg-[#090f1f] border border-[#ffffff15] px-4 py-3 rounded-xl mb-6 inline-flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-[#8290ac] tracking-wider mb-1">
                Your Enquiry Reference
              </span>
              <span className="font-mono text-base font-bold text-[#82a5ff]">
                {submittedReference}
              </span>
            </div>

            <Button variant="ghost" onClick={handleReset} type="button">
              Submit another enquiry
            </Button>
          </motion.div>
        ) : (
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate={false}>
            {/* Honeypot spam protection (hidden from human visitors) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                value={(formData as { company_url?: string }).company_url || ""}
                onChange={handleChange}
              />
            </div>

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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>

            {/* Row 6: Submit Button */}
            <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Button
                variant="primary"
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending enquiry…" : "Prepare enquiry"}
              </Button>
            </div>

            {submitError && (
              <div
                className="p-3 mt-3 rounded-lg bg-[#3b1219] border border-[#ff7b7240] text-[#ff9b9b] text-xs font-medium"
                role="alert"
              >
                {submitError}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
};
