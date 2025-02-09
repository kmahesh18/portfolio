import { useState, useEffect, useRef } from "react";
import Filter from "bad-words";
import toast, { Toaster } from "react-hot-toast";
import Fade from "react-reveal/Fade";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import emailjs from '@emailjs/browser';
import styles from "./Contact.module.scss";
import { MENULINKS } from "../../constants";

const filter = new Filter();
filter.removeWords("hell", "god", "shit");

const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
    fontFamily: "sans-serif",
  },
};

const empty = () =>
  toast.error("Please fill the required fields", {
    id: "error",
  });

const error = () =>
  toast.error("Error sending your message", {
    id: "error",
  });

const success = () =>
  toast.success("Message sent successfully", {
    id: "success",
  });

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value) {
      setFormData(prev => ({
        ...prev,
        [id]: filter.clean(value.trim())
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!e.target.name.value || !e.target.email.value || !e.target.message.value) {
      empty();
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: e.target.name.value,
          reply_to: e.target.email.value,
          message: e.target.message.value
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        success();
        setFormData({ name: "", email: "", message: "" });
      } else {
        error();
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      error();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="w-full relative select-none"
      id={MENULINKS[4].ref}
      ref={sectionRef}
    >
      <div className="section-container py-16 flex flex-col justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center mb-4"
                style={{
                  background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "shine 5s linear infinite",
                }}>
              Get in Touch
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mb-8"></div>
          </div>

          <Fade bottom>
            <form className="mt-9 flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="relative mt-14 w-full max-w-xl">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Name</label>
              </div>

              <div className="relative mt-14 w-full max-w-xl">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="relative mt-14 w-full max-w-xl">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="message">Message</label>
              </div>

              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className={`${styles.button} mt-12 w-auto`}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send →'}
                </span>
              </button>
            </form>
          </Fade>
        </div>
      </div>
      <Toaster position="bottom-center" />

      <style jsx>{`
        input, textarea {
          width: 100%;
          background: transparent;
          border: 2px solid #7000ff;
          border-radius: 10px;
          padding: 1rem;
          font-size: 1.1rem;
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
        }

        textarea {
          min-height: 150px;
          resize: vertical;
        }

        label {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: all 0.3s ease;
          color: #888;
          font-size: 1.1rem;
        }

        textarea + label {
          top: 1rem;
          transform: none;
        }

        input:focus + label,
        input:valid + label {
          top: 0;
          transform: translateY(-50%) scale(0.9);
          background: #000;
          padding: 0 0.5rem;
          color: #7000ff;
        }

        textarea:focus + label,
        textarea:valid + label {
          top: -0.5rem;
          transform: scale(0.9);
          background: #000;
          padding: 0 0.5rem;
          color: #7000ff;
        }

        input:hover,
        textarea:hover {
          box-shadow: 0 0 0.3rem #7000ff;
        }

        input:focus,
        textarea:focus {
          border-color: #7000ff;
          box-shadow: 0 0 0.5rem #7000ff;
        }

        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
