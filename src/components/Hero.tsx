import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/herobg.jpg";
import {
  FiArrowRight,
  FiChevronDown,
  FiStar,
  FiThumbsUp,
  FiMail,
  FiPhone,
  FiUser,
  FiHome,
  FiDollarSign,
  FiBriefcase,
  FiSend,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiMessageSquare,
  FiSmartphone,
} from "react-icons/fi";
import { RiBuildingLine, RiShieldCheckLine } from "react-icons/ri";
import completeData from "../src/data/completeData.json";

gsap.registerPlugin(ScrollTrigger);

// Modern Professional Form Component with fixed height
const InquiryForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    inquiryType: "buying",
    inquiryDetails: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  // Measure content height for smooth transitions
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [step, isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        inquiryType: "buying",
        inquiryDetails: "",
        email: "",
        phone: "",
      });
    }, 3000);
  };

  const inquiryOptions = [
    {
      value: "buying",
      label: "Buying a property",
      icon: FiHome,
      desc: "Find your dream home",
    },
    {
      value: "selling",
      label: "Selling a property",
      icon: FiDollarSign,
      desc: "Get maximum value",
    },
    {
      value: "investing",
      label: "Real estate investment",
      icon: FiBriefcase,
      desc: "Grow your portfolio",
    },
    {
      value: "consultation",
      label: "Free consultation",
      icon: FiUsers,
      desc: "Expert advice",
    },
  ];

  const stepIcons = [FiUserCheck, FiMessageSquare, FiSmartphone];

  // Get current selected option icon
  const SelectedIcon =
    inquiryOptions.find((opt) => opt.value === formData.inquiryType)?.icon ||
    FiHome;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Form Header with Gradient */}
        <div className="relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
          <div className="relative px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FiHome className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Schedule a Consultation
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                  Fill the form & get expert advice within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Height Container */}
        <div
          className="relative transition-all duration-300"
          style={{
            height: "auto",
            minHeight: "440px",
          }}
        >
          {/* Content wrapper with smooth height transition */}
          <div
            ref={contentRef}
            style={{
              minHeight: contentHeight ? `${contentHeight}px` : "auto",
              transition: "min-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="w-full"
          >
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8"
              >
                {/* Modern Step Indicators - Responsive */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  {[1, 2, 3].map((s) => {
                    const StepIcon = stepIcons[s - 1];
                    return (
                      <div key={s} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              step >= s
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {step > s ? (
                              <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            ) : (
                              <StepIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            )}
                          </div>
                          <span
                            className={`text-[9px] sm:text-[10px] md:text-xs mt-1 font-medium ${
                              step >= s ? "text-primary" : "text-gray-400"
                            }`}
                          >
                            {s === 1
                              ? "Details"
                              : s === 2
                                ? "Inquiry"
                                : "Contact"}
                          </span>
                        </div>
                        {s < 3 && (
                          <div
                            className={`w-6 sm:w-8 md:w-12 h-0.5 mx-1 sm:mx-2 md:mx-3 transition-all duration-300 ${
                              step > s ? "bg-primary" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Step Content Container with smooth transitions */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Name */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="space-y-3 sm:space-y-4"
                      >
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                            First name
                          </label>
                          <div className="relative group">
                            <FiUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm" />
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full border-2 border-gray-100 rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-11 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                              placeholder="John"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                            Last name
                          </label>
                          <div className="relative group">
                            <FiUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm" />
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full border-2 border-gray-100 rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-11 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.firstName || !formData.lastName}
                          className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-xl font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group text-sm"
                        >
                          Continue
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: Inquiry */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="space-y-3 sm:space-y-4"
                      >
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                            I'm interested in
                          </label>
                          <div className="relative">
                            <select
                              name="inquiryType"
                              value={formData.inquiryType}
                              onChange={handleChange}
                              className="w-full border-2 border-gray-100 rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-12 pr-8 text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer bg-white text-sm"
                            >
                              {inquiryOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <SelectedIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 pointer-events-none" />
                            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                            Additional details{" "}
                            <span className="text-gray-400 font-normal text-xs">
                              (optional)
                            </span>
                          </label>
                          <textarea
                            name="inquiryDetails"
                            value={formData.inquiryDetails}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border-2 border-gray-100 rounded-xl py-2 sm:py-2.5 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none text-sm"
                            placeholder="Tell us about your budget, preferred location, timeline..."
                          />
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 border-2 border-gray-200 text-gray-700 py-2 sm:py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="flex-1 bg-primary text-white py-2 sm:py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group text-sm"
                          >
                            Continue
                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Contact */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="space-y-3 sm:space-y-4"
                      >
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                            Email address
                          </label>
                          <div className="relative group">
                            <FiMail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full border-2 border-gray-100 rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-11 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                              placeholder="hello@example.com"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                            Phone number
                          </label>
                          <div className="relative group">
                            <FiPhone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full border-2 border-gray-100 rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-11 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                              placeholder="+1 (555) 000-0000"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 border-2 border-gray-200 text-gray-700 py-2 sm:py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={
                              isSubmitting || !formData.email || !formData.phone
                            }
                            className="flex-1 bg-primary text-white py-2 sm:py-2.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group text-sm"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin h-4 w-4"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Inquiry
                                <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 sm:p-8 text-center flex flex-col items-center justify-center"
                style={{ minHeight: "380px" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FiCheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  One of our experts will reach out within 24 hours.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { badge, headlines, description, buttons, stats, promoBadge } =
    completeData.hero;

  useEffect(() => {
    if (!sectionRef.current) return;
    const img = sectionRef.current.querySelector(".hero-parallax-img");
    if (img) {
      gsap.to(img, {
        y: 80,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) * 0.01,
        y: (clientY - innerHeight / 2) * 0.01,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const iconComponents = {
    FiArrowRight: FiArrowRight,
    RiBuildingLine: RiBuildingLine,
    FiStar: FiStar,
    FiThumbsUp: FiThumbsUp,
    RiShieldCheckLine: RiShieldCheckLine,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-background isolate"
    >
      {/* Background with all original effects */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={heroBg}
          alt=""
          className="hero-parallax-img w-full h-[130%] object-cover absolute -top-[15%] will-change-transform"
          style={{
            x: mousePosition.x,
            y: mousePosition.y - 20,
          }}
          transition={{ type: "spring", mass: 0.8, stiffness: 40, damping: 25 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-br z-1 opacity-70 from-primary/90 via-primary/70 to-primary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,0,0,0.4)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,0,0,0.3)_0%,_transparent_70%)]" />

        <motion.div
          className="absolute top-[20%] right-[15%] w-[40rem] h-[40rem] bg-foreground/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[10%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x * -0.2,
            y: mousePosition.y * -0.2,
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="modernGrid"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#modernGrid)" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[20%] right-[12%] w-40 h-40 border border-foreground/10 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.8 }}
          style={{
            x: mousePosition.x * 0.4,
            y: mousePosition.y * 0.4,
          }}
        />
        <motion.div
          className="absolute top-[12%] right-[5%] w-72 h-72 border border-foreground/5 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 1.0 }}
          style={{
            x: mousePosition.x * 0.25,
            y: mousePosition.y * 0.25,
          }}
        />
        <motion.div
          className="absolute bottom-[25%] left-[8%] w-56 h-56 border border-foreground/5 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 1.2 }}
          style={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-foreground/20 rounded-full blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center py-6 sm:py-8 md:py-10">
        <div className="section-padding w-full px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start lg:items-center">
            {/* Left Column - Content with centered text on small screens */}
            <div className="text-center lg:text-left">
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-2 mb-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-8 h-px bg-white/60 md:w-16 hidden lg:block" />
                <span className="font-body text-white text-xs md:text-sm uppercase tracking-[0.3em] font-normal">
                  {badge}
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-[1.2] sm:leading-[1.1] tracking-tight">
                {headlines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block overflow-hidden"
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3 + 0.2 * i,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-4 sm:mb-6 leading-relaxed font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {description}
              </motion.p>

              {promoBadge && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                  className="mb-4 sm:mb-6 flex justify-center lg:justify-start"
                >
                  <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/20 border border-primary/40 rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2">
                    <FiStar className="text-primary text-xs sm:text-sm" />
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {promoBadge.text}
                    </span>
                    <a
                      href="#contact"
                      className="text-primary text-xs sm:text-sm font-bold hover:underline"
                    >
                      {promoBadge.cta}
                    </a>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                {buttons.map((button, idx) => {
                  const Icon =
                    iconComponents[button.icon as keyof typeof iconComponents];
                  return button.primary ? (
                    <motion.a
                      key={idx}
                      href={button.href}
                      className="group bg-primary text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-medium text-sm sm:text-base md:text-lg inline-flex items-center justify-center gap-2 sm:gap-3 rounded-md hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {button.text}
                      {Icon && (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      )}
                    </motion.a>
                  ) : (
                    <motion.a
                      key={idx}
                      href={button.href}
                      className="group backdrop-blur-sm bg-white/10 border border-white/30 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-medium text-sm sm:text-base md:text-lg inline-flex items-center justify-center gap-2 sm:gap-3 rounded-md hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {button.text}
                    </motion.a>
                  );
                })}
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-20 mt-6 sm:mt-8 md:mt-10 lg:mt-12 pt-4 sm:pt-5 md:pt-6 border-t border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
              >
                {stats.map((stat, idx) => {
                  const StatIcon =
                    iconComponents[stat.icon as keyof typeof iconComponents];
                  return (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-2 sm:gap-3 md:gap-4"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {StatIcon && (
                        <StatIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white/80" />
                      )}
                      <div>
                        <span className="block font-heading text-white text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-tight">
                          {stat.value}
                        </span>
                        <span className="font-body text-white/60 text-[10px] sm:text-xs uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute hidden sm:flex bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 sm:gap-3 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-white/40 text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-light">
          Discover
        </span>
        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
